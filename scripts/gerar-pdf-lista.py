"""Gera a resolução da lista a partir do núcleo TypeScript do app.

Uso: python scripts/gerar-pdf-lista.py
Requer Node e Python com matplotlib, numpy e scipy.
Grava PDF e dados completos em entregas/. Confere as curvas com SciPy.
"""
import json
from itertools import combinations
import subprocess
import textwrap
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.lines import Line2D
import numpy as np
from scipy.signal import step

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "entregas"
DEST.mkdir(exist_ok=True)
DATA = json.loads(subprocess.run(
    ["node", "scripts/exportar-lista.mjs"], cwd=ROOT,
    capture_output=True, text=True, check=True,
).stdout)
W, H = 595.276, 841.89
INK, MUTED, BLUE, LINE = "#0f172a", "#475569", "#175c8c", "#cbd5e1"
plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 10,
    "mathtext.fontset": "dejavusans", "pdf.fonttype": 42,
    "axes.spines.top": False, "axes.spines.right": False,
})


def number(value, decimals=6):
    return f"{value:.{decimals}f}".rstrip("0").rstrip(".")


def decimal(value, decimals=3):
    return f"{value:.{decimals}f}".replace(".", ",")


def complex_text(p):
    if abs(p["im"]) < 1e-8:
        return number(p["re"])
    return f'{number(p["re"])} {"+" if p["im"] > 0 else "−"} {number(abs(p["im"]))}j'


def polynomial(coefs):
    terms = []
    for i, c in enumerate(coefs):
        if abs(c) < 1e-10:
            continue
        power = len(coefs) - 1 - i
        coefficient = "" if power and abs(c - 1) < 1e-10 else number(abs(c))
        variable = "" if power == 0 else "s" if power == 1 else f"s^{{{power}}}"
        sign = "-" if c < 0 else "+" if terms else ""
        terms.append(sign + coefficient + variable)
    return "".join(terms) or "0"


def transfer(tf):
    return rf'\frac{{{polynomial(tf["num"])}}}{{{polynomial(tf["den"])}}}'


class Page:
    def __init__(self, question, part, page_number):
        self.fig = plt.figure(figsize=(W / 72, H / 72), facecolor="white")
        self.question = question
        self.text(43, "DCA-3701.0  ·  Projeto de sistemas de controle  ·  2026.2", size=10, color=MUTED)
        self.text(64, "1º Exercício da 2ª Unidade  ·  Eugenio Lopes", size=11, weight="bold")
        self.line(84)
        self.text(110, f'Questão {question}  ·  {DATA["questoes"][question - 1]["projeto"]["entrada"]["topologia"]}', size=19, weight="bold")
        self.text(142, part, size=10, color=MUTED)
        self.line(790)
        self.text(805, "Resolução com o aplicativo LGR e projeto de controladores", size=8, color=MUTED)
        self.fig.text((W - 43) / W, 1 - 805 / H, f"{page_number}/8", fontsize=8, ha="right", va="top", color=MUTED)

    def line(self, y):
        self.fig.add_artist(Line2D([43 / W, (W - 43) / W], [1 - y / H] * 2,
                                  transform=self.fig.transFigure, color=LINE, lw=.7))

    def text(self, y, value, size=10.5, color=INK, weight="normal", x=43):
        return self.fig.text(x / W, 1 - y / H, value, fontsize=size, color=color,
                             fontweight=weight, va="top", linespacing=1.45)

    def paragraph(self, y, value, width=82, size=10.5, color=INK):
        lines = textwrap.fill(value, width)
        self.text(y, lines, size=size, color=color)

    def formula(self, y, value, size=13.5):
        return self.text(y, "$" + value + "$", size=size)

    def heading(self, y, index, value):
        self.text(y, f"{index}. {value}", weight="bold", size=11.5)

    def table(self, y, rows):
        for i, (label, result) in enumerate(rows):
            self.text(y + i * 24, label, size=10)
            self.text(y + i * 24, result, x=314, size=10, weight="bold")
            self.line(y + i * 24 + 19)

    def finish(self, pdf):
        # Falha se alguma fórmula ou texto sair da área útil.
        self.fig.canvas.draw()
        renderer = self.fig.canvas.get_renderer()
        for artist in self.fig.texts:
            box = artist.get_window_extent(renderer)
            right = box.x1 / self.fig.dpi * 72
            bottom = box.y0 / self.fig.dpi * 72
            if right > W - 30 or bottom < 22:
                raise ValueError(f"Texto fora da página: {artist.get_text()}")
        for a, b in combinations(self.fig.texts, 2):
            if a.get_window_extent(renderer).overlaps(b.get_window_extent(renderer)):
                raise ValueError(f"Textos sobrepostos: {a.get_text()} / {b.get_text()}")
        pdf.savefig(self.fig)
        plt.close(self.fig)


PLANTS = [
    r"G(s)=\frac{4(s+4)}{s(s+2)^2},\qquad H(s)=1",
    r"G(s)=\frac{1}{10000(s^2-1.1772)},\qquad H(s)=1",
    r"G(s)=\frac{5(s+1)(s+4)}{(s+2)^2},\quad H(s)=\frac{0.2}{s+1}",
    r"G(s)=\frac{5}{s^3+12s^2+22s+20},\qquad H(s)=0.4",
]
REQUIREMENTS = [
    "Projetar PD para sobressinal Mp ≤ 10% e tempo de acomodação, na faixa de 5%, inferior a 4 s.",
    "Projetar PD para fator de amortecimento ζ = 0,7 e frequência natural ωn = 0,5 rad/s.",
    "Projetar PI para posicionar o par de polos de malha fechada em −4 ± 4j.",
    "Projetar PID com zeros reais e iguais para Mp ≤ 20% e tempo de acomodação, na faixa de 2%, inferior a 5 s.",
]
GH = [
    r"G(s)H(s)=\frac{4(s+4)}{s(s+2)^2}",
    r"G(s)H(s)=\frac{1}{10000(s^2-1.1772)}",
    r"G(s)H(s)=\frac{s+4}{(s+2)^2}",
    r"G(s)H(s)=\frac{2}{(s+10)(s^2+2s+2)}",
]
ANGLES = [
    r"\angle GH(s_d)=19.5206^\circ-126.2390^\circ-2(43.7702^\circ)",
    r"\angle GH(s_d)=-166.0267^\circ-25.9114^\circ",
    r"\angle GH(s_d)=90^\circ-2(116.5651^\circ)",
    r"\angle GH(s_d)=-9.6334^\circ-70.3974^\circ-85.5356^\circ",
]


def design_page(q, i, pdf):
    p = q["projeto"]
    page = Page(i + 1, "Enunciado, polo de projeto e cálculo do controlador", 2 * i + 1)
    page.paragraph(165, REQUIREMENTS[i])
    page.formula(209, PLANTS[i], size=14)
    page.heading(261, 1, "Definir o polo desejado")
    if i in (0, 3):
        mp = p["entrada"]["especificacao"]["mp"]
        page.formula(287, rf"\zeta=\frac{{-\ln({mp}/100)}}{{\sqrt{{\pi^2+\ln^2({mp}/100)}}}}={number(p['zeta'])}")
        c, ts = (3, 4) if i == 0 else (4, 5)
        page.formula(328, rf"\omega_{{n,\min}}=\frac{{{c}}}{{\zeta\cdot{ts}}}={number(p['wnMin'])}\;\mathrm{{rad/s}}")
        if i == 0:
            page.paragraph(372, "O projeto inicial resultou em ts(5%) = 4,135 s. Adota-se fator de frequência 1,10 para atender ao limite na resposta completa.", size=10, width=91)
            page.formula(412, rf"\omega_n=1.10\,\omega_{{n,\min}}={number(p['wn'])}\;\mathrm{{rad/s}}", size=12)
            page.formula(435, rf"s_d=-\zeta\omega_n+j\omega_n\sqrt{{1-\zeta^2}}={number(p['sd']['re'])}+j{number(p['sd']['im'])}", size=11.5)
        else:
            page.formula(374, rf"s_d=-\zeta\omega_n+j\omega_n\sqrt{{1-\zeta^2}}=-0.8+j{number(p['sd']['im'])}", size=12)
            page.paragraph(408, "Adota-se ωn = ωn,min. O limite de segunda ordem orienta o projeto. A resposta completa será usada para verificar as duas exigências.", size=10, width=90)
    elif i == 1:
        page.formula(290, r"s_d=-\zeta\omega_n+j\omega_n\sqrt{1-\zeta^2}")
        page.formula(327, rf"s_d=-0.35+j{number(p['sd']['im'])},\qquad \zeta=0.7,\quad\omega_n=0.5")
        page.paragraph(370, "Os polos originais são ±1,084988. O controlador deve estabilizar a planta e produzir o par complexo solicitado.", size=10, width=90)
    else:
        page.formula(290, r"s_d=-4+j4,\quad |s_d|=\sqrt{32},\quad\angle s_d=135^\circ")
        page.paragraph(329, "O PI acrescenta um polo na origem. O fator comum s + 1 de G(s)H(s) se cancela na análise do lugar das raízes.", size=10, width=90)
    page.heading(457, 2, "Avaliar a malha e aplicar o critério do ângulo")
    page.formula(483, GH[i], size=13)
    page.formula(529, ANGLES[i], size=11.5)
    phase = number(p["faseGH"], 4)
    modulus = number(p["moduloGH"], 9)
    page.formula(556, rf"\angle GH(s_d)\equiv {phase}^\circ,\qquad |GH(s_d)|={modulus}", size=12)
    if i < 2:
        angle = rf"\alpha=180^\circ-\angle GH(s_d)={number(p['alfa'],4)}^\circ"
    elif i == 2:
        angle = rf"\alpha\equiv180^\circ-\angle GH(s_d)+135^\circ\equiv{number(p['alfa'],4)}^\circ"
    else:
        angle = rf"2\alpha\equiv180^\circ-\angle GH(s_d)+{number(p['faseIntegral'],4)}^\circ"
    page.formula(584, angle, size=11.5)
    if i == 3:
        page.formula(612, rf"\alpha={number(p['alfa'],4)}^\circ\quad\mathrm{{por\ zero}}", size=11.5)
    page.heading(646, 3, "Calcular o zero real e o ganho")
    page.formula(674, rf"z=\frac{{\mathrm{{Im}}(s_d)}}{{\tan\alpha}}-\mathrm{{Re}}(s_d)={number(p['z'])}\quad\Rightarrow\quad s_z=-z", size=12)
    kc = (r"\frac{1}{|s_d+z|\,|GH(s_d)|}" if i < 2 else
          r"\frac{|s_d|}{|s_d+z|\,|GH(s_d)|}" if i == 2 else
          r"\frac{|s_d|}{|s_d+z|^2\,|GH(s_d)|}")
    page.formula(721, rf"K_c={kc}={number(p['Kc'])}", size=12)
    page.finish(pdf)


def validation_page(q, i, pdf):
    p, s = q["projeto"], q["resposta"]
    page = Page(i + 1, "Controlador final, malha fechada e verificação do enunciado", 2 * i + 2)
    page.heading(165, 4, "Escrever o controlador final")
    if i < 2:
        gc = rf"G_c(s)=K_c(s+z)={number(p['Kd'])}s+{number(p['Kp'])}"
    elif i == 2:
        gc = r"G_c(s)=\frac{7(s+24/7)}{s}=7+\frac{24}{s}"
    else:
        gc = rf"G_c(s)=\frac{{{number(p['Kc'])}(s+{number(p['z'])})^2}}{{s}}"
    page.formula(192, gc, size=14)
    page.formula(238, rf"K_p={number(p['Kp'])},\qquad K_i={number(p['Ki'])},\qquad K_d={number(p['Kd'])}", size=12)
    page.heading(278, 5, "Fechar a malha e verificar os polos")
    page.formula(304, r"T(s)=\frac{Y(s)}{R(s)}=\frac{G_c(s)G(s)}{1+G_c(s)G(s)H(s)}", size=12)
    if i == 1:
        tf = {"num": [.7, 1.4272], "den": [1, .7, .25]}
        page.formula(349, "T(s)=" + transfer(tf), size=13)
    elif i == 2:
        page.formula(349, r"T(s)=\frac{5(7s+24)(s+1)(s+4)}{(s+3)(s^2+8s+32)}", size=13)
    else:
        page.formula(349, "T(s)=" + transfer(p["fechada"]), size=11.8)
    if i == 0:
        poles = "Polos: −0,825 ± 1,125610j e −2,590013. Todos têm parte real negativa."
    elif i == 1:
        poles = "Polos: −0,35 ± 0,357071j. Assim, ωn = 0,5 rad/s e ζ = 0,7."
    elif i == 2:
        poles = "Polos de T(s): −4 ± 4j e −3. O fator comum s + 1 se cancela."
    else:
        poles = "Polos: −0,8 ± 1,561585j; −0,900392; −9,499608. Malha estável."
    page.text(396, poles, size=9.7)
    page.heading(429, 6, "Conferir o que a questão pede")
    if i == 0:
        rows = [("Sobressinal ≤ 10%", f"{decimal(s['mp'])}%  ·  atende"),
                ("Acomodação de 5% < 4 s", f"{decimal(s['ts5'])} s  ·  atende")]
    elif i == 1:
        rows = [("Fator de amortecimento ζ = 0,7", "0,7  ·  atende"),
                ("Frequência natural ωn = 0,5 rad/s", "0,5 rad/s  ·  atende")]
    elif i == 2:
        rows = [("Par de polos −4 ± 4j", "−4 ± 4j  ·  atende"),
                ("Controlador PI", "Kp = 7; Ki = 24  ·  atende")]
    else:
        rows = [("Sobressinal ≤ 20%", f"{decimal(s['mp'])}%  ·  atende"),
                ("Acomodação de 2% < 5 s", f"{decimal(s['ts2'])} s  ·  atende"),
                ("Zeros reais e iguais", "−2,048997  ·  multiplicidade 2")]
    page.table(456, rows)
    top = 548 if i == 3 else 528
    chart_height = 144 if i == 3 else 161
    ax = page.fig.add_axes([.117, (H - (top + chart_height)) / H, .785, chart_height / H])
    t, y = np.array(s["t"]), np.array(s["y"])
    ax.plot(t, y, lw=1.7, color=BLUE, label="Saída ao degrau unitário")
    ax.axhline(s["yss"], lw=.9, color=MUTED, ls="--", label="Valor final")
    if i in (0, 3):
        tolerance = .05 if i == 0 else .02
        ax.axhspan(s["yss"] * (1 - tolerance), s["yss"] * (1 + tolerance), color=BLUE, alpha=.10)
        settling = s["ts5"] if i == 0 else s["ts2"]
        ax.axvline(settling, lw=.9, color=BLUE, ls=":")
    if i == 2:
        ax.scatter([0], [s["y0"]], s=18, color=BLUE, zorder=5)
    ax.set(xlim=(0, [10, 20, 3, 10][i]), xlabel="Tempo (s)", ylabel="Saída y(t)")
    ax.grid(alpha=.18, lw=.6)
    ax.tick_params(labelsize=8)
    ax.xaxis.label.set_size(9)
    ax.yaxis.label.set_size(9)
    ax.legend(fontsize=8, loc="upper right", frameon=False)
    notes_y = top + chart_height + 44
    if i == 0:
        notes = "Degrau unitário; valor final 1. A faixa sombreada é de ±5%. O ajuste de frequência de 1,10 mantém Mp abaixo de 10% e reduz ts para 3,680 s."
    elif i == 1:
        notes = "O ganho estático é T(0) = 5,7088. A questão fixa ζ e ωn, sem exigir ganho unitário nem tempo de acomodação. O zero do PD altera a forma da resposta."
    elif i == 2:
        notes = "A saída salta para y(0+) = 35 e converge para 5. O salto decorre do termo direto de T(s). O polo adicional −3 é mais lento que o par complexo solicitado."
    else:
        notes = "Degrau unitário; valor final 2,5 porque H = 0,4. A faixa sombreada é de ±2% desse valor. Os limites são verificados na resposta completa, com todos os polos."
    page.paragraph(notes_y, notes, size=9.3, width=98)
    page.text(776, "Simulação de 0 a 20 s; amostragem de 0,005 s. Valores exibidos com arredondamento.", size=8, color=MUTED)
    page.finish(pdf)


def verify():
    errors = []
    for q in DATA["questoes"]:
        p, response = q["projeto"], q["resposta"]
        t = np.array(response["t"])
        _, independent = step((p["fechada"]["num"], p["fechada"]["den"]), T=t)
        error = float(np.max(np.abs(independent - response["y"])))
        if error > 1e-7:
            raise ValueError(f"{q['id']}: curva diverge do SciPy por {error}")
        assert p["erroPolo"] < 1e-7 and p["residuo"] < 1e-7
        yss = p["fechada"]["num"][-1] / p["fechada"]["den"][-1]
        mp = float(max(0, np.max(np.sign(yss) * (independent - yss))) / abs(yss) * 100)
        assert abs(mp - response["mp"]) < 1e-7
        for band in (2, 5):
            outside = np.flatnonzero(np.abs(independent - yss) > band / 100 * abs(yss))
            assert not len(outside) or outside[-1] < len(t) - 1
            ts = float(t[outside[-1] + 1]) if len(outside) else 0.
            assert ts == response[f"ts{band}"]
        if q["id"] == "q2":
            assert abs(p["zeta"] - .7) < 1e-12 and abs(p["wn"] - .5) < 1e-12
        if q["id"] == "q3":
            assert abs(p["sd"]["re"] + 4) < 1e-12 and abs(p["sd"]["im"] - 4) < 1e-12
        errors.append({"questao": q["id"], "erroMaximoCurvaSciPy": error})
    DATA["verificacaoIndependente"] = errors
    return errors


if __name__ == "__main__":
    errors = verify()
    path = DEST / "lista_2a_unidade_Eugenio_Santo.pdf"
    with PdfPages(path, metadata={
        "Title": "1º Exercício da 2ª Unidade · DCA-3701.0 · Resolução",
        "Author": DATA["autor"],
        "Subject": "Projeto de controladores PD, PI e PID pelo lugar das raízes",
        "Creator": "Núcleo do aplicativo LGR; Matplotlib",
    }) as pdf:
        for i, q in enumerate(DATA["questoes"]):
            design_page(q, i, pdf)
            validation_page(q, i, pdf)
    (DEST / "lista-2a-unidade-resolvida.dados.json").write_text(
        json.dumps(DATA, ensure_ascii=False, indent=2) + "\n"
    )
    print(path)
    print(json.dumps(errors, ensure_ascii=False, indent=2))
