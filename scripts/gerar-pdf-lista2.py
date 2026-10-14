"""Gera a entrega da lista 2 com os resultados do app e conferência independente.

Uso: python scripts/gerar-pdf-lista2.py
Requer Node e Python com matplotlib, numpy, scipy e sympy.
O PID inicial é apresentado com os requisitos não atendidos, como no aplicativo.
"""
import importlib.util
import json
from pathlib import Path

import numpy as np
import sympy as sp
from matplotlib.backends.backend_pdf import PdfPages

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("pdf_lista", ROOT / "scripts/gerar-pdf-lista.py")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
n, decimal, transfer, polynomial = base.number, base.decimal, base.transfer, base.polynomial


def new_page(data, question, part, number):
    topology = "PID" if question == 1 else "a/(s+b)"
    return base.Page(question, part, number, titulo=f"Questão {question}  ·  {topology}",
                     unidade="2º", total=6, autor=data["autor"])


def pid_design(data, pdf):
    p = data["questoes"][0]["projeto"]
    page = new_page(data, 1, "Item a · Projeto contínuo por ângulo e módulo", 1)
    page.paragraph(165, "Projetar PID com z1 = z2 para Mp ≤ 10% e tempo de acomodação de 5% inferior a 3 s.")
    page.formula(209, r"G(s)=\frac{5(s+3)}{s(s+4)},\qquad H(s)=\frac{1}{s+1}")
    page.heading(261, 1, "Definir o polo de projeto")
    page.formula(287, rf"\zeta=\frac{{-\ln(10/100)}}{{\sqrt{{\pi^2+\ln^2(10/100)}}}}={n(p['zeta'])}")
    page.formula(331, rf"\omega_{{n,\min}}=\frac{{3}}{{\zeta\cdot 3}}={n(p['wnMin'])}\;\mathrm{{rad/s}}")
    page.formula(374, rf"s_d=-\zeta\omega_n+j\omega_n\sqrt{{1-\zeta^2}}=-1+j{n(p['sd']['im'])}", size=12)
    page.paragraph(412, "Usa-se o fator de frequência 1 do exemplo do app. A aproximação de segunda ordem orienta o polo; a resposta completa deverá confirmar Mp e acomodação.", size=10, width=91)
    page.heading(470, 2, "Aplicar o critério do ângulo")
    page.formula(495, r"G(s)H(s)=\frac{5(s+3)}{s(s+4)(s+1)},\qquad G_c(s)=K_c\frac{(s+z)^2}{s}", size=12)
    angulos, condicao, distancias, ganho = base.memoria_criterios(p)
    for j, formula in enumerate(angulos):
        page.formula(539 + 23 * j, formula, size=11)
    page.formula(588, condicao, size=11)
    page.heading(621, 3, "Calcular o zero duplo e o ganho pelas distâncias A e B")
    page.formula(649, rf"z=\frac{{\mathrm{{Im}}(s_d)}}{{\tan\alpha}}-\mathrm{{Re}}(s_d)={n(p['z'])}", size=12)
    for j, formula in enumerate(distancias):
        page.formula(687 + 23 * j, formula, size=11)
    page.formula(748, ganho, size=12)
    page.finish(pdf)


def step_chart(page, q, top, height, limit):
    p, response = q["projeto"], q["resposta"]
    ax = page.fig.add_axes([.117, (base.H - top - height) / base.H, .785, height / base.H])
    ax.plot(response["t"], response["y"], color=base.BLUE, lw=1.7, label="Saída ao degrau unitário")
    ax.axhline(response["yss"], color=base.MUTED, lw=.9, ls="--", label="Valor final")
    if p["entrada"]["especificacao"]["modo"] == "mpTs":
        band = p["entrada"]["especificacao"]["faixa"] / 100
        ss, ts = response["yss"], response["ts5"]
        ax.axhspan(ss - abs(ss) * band, ss + abs(ss) * band, color=base.BLUE, alpha=.1)
        if ts is not None:
            ax.axvline(ts, color=base.BLUE, lw=.9, ls=":")
    ax.scatter([0], [response["y0"]], color=base.BLUE, s=18, zorder=5)
    ax.set(xlim=(0, limit), xlabel="Tempo (s)", ylabel="Saída y(t)")
    ax.grid(alpha=.18, lw=.6)
    ax.tick_params(labelsize=8)
    ax.xaxis.label.set_size(9)
    ax.yaxis.label.set_size(9)
    ax.legend(fontsize=8, frameon=False, loc="upper right")


def closed_loop(page, p, y):
    page.formula(y, r"T(s)=\frac{Y(s)}{R(s)}=\frac{G_c(s)G(s)}{1+G_c(s)G(s)H(s)}=\frac{N(s)}{D(s)}", size=12)
    page.formula(y + 47, "N(s)=" + polynomial(p["fechada"]["num"]), size=10.5)
    page.formula(y + 75, "D(s)=" + polynomial(p["fechada"]["den"]), size=10.5)
    page.paragraph(y + 105, "Polos: " + "; ".join(base.complex_text(x) for x in p["polos"]) + ".", width=95, size=9.6)


def pid_validation(data, pdf):
    q = data["questoes"][0]
    p, s = q["projeto"], q["resposta"]
    page = new_page(data, 1, "Item a · Ganhos, malha fechada e verificação do desempenho", 2)
    page.heading(165, 4, "Escrever os ganhos do PID")
    page.formula(192, rf"K_d={n(p['Kd'])},\quad K_p=2K_cz={n(p['Kp'])},\quad K_i=K_cz^2={n(p['Ki'])}", size=12)
    page.formula(220, "G_c(s)=" + transfer(p["Gc"]), size=12)
    page.heading(268, 5, "Fechar a malha e verificar todos os polos")
    closed_loop(page, p, 295)
    page.heading(438, 6, "Conferir os requisitos na saída completa")
    page.table(465, [
        ("Sobressinal ≤ 10%", f"{decimal(s['mp'])}% · não atende"),
        ("Acomodação de 5% < 3 s", f"{decimal(s['ts5'])} s · não atende"),
        ("Zeros reais e iguais", f"−{decimal(p['z'], 6)} · duplo"),
    ])
    step_chart(page, q, 550, 142, 8)
    page.paragraph(735, f"O PID calculado é estável, mas não atende ao item a. A saída salta para y(0+) = {decimal(s['y0'], 6)} e converge para 1. O salto é incluído no sobressinal. O par desejado não garante os limites da resposta completa.", width=98, size=9.3)
    page.finish(pdf)


def discretization_page(data, index, pdf):
    q = data["questoes"][index]
    d = q["discretizacao"]["calculo"]
    c, result = d["configuracao"], d["resultado"]
    page = new_page(data, index + 1, "Item b · Discretização e polos discretos", 3 if index == 0 else 6)
    page.heading(165, 7, "Aplicar a substituição pedida")
    if index == 0:
        page.paragraph(192, "Discretizar apenas o controlador Gc(s), pelo método de Tustin, com período de amostragem de 2,0 s.")
        page.formula(235, r"s=\frac{2}{T}\frac{z-1}{z+1}=\frac{z-1}{z+1},\qquad T=2\;\mathrm{s}")
        page.formula(283, "G_c(s)=" + transfer(d["continua"]), size=12)
        page.formula(334, rf"G_c(z)={n(q['projeto']['Kc'])}\frac{{[(z-1)+{n(q['projeto']['z'])}(z+1)]^2}}{{(z-1)(z+1)}}", size=12)
        page.paragraph(384, "Esta discretização usa o PID calculado no item a, cujo desempenho não atendeu aos limites pedidos. Alterações dos ganhos exigem uma nova discretização.", size=10, width=91)
    else:
        page.paragraph(192, "Discretizar a malha aberta completa L(s) = G(s)H(s)Gc(s), com T = 1 s. Adota-se Euler forward; o enunciado também apresenta a fórmula backward.")
        page.formula(249, r"s=\frac{z-1}{T}=z-1,\qquad T=1\;\mathrm{s}")
        page.formula(292, rf"L(s)=\frac{{{n(2*q['projeto']['a'])}(s+1)(s+3)}}{{(s+{n(q['projeto']['b'])})(s^2+2s+2)(s+5)}}", size=12)
        page.formula(342, rf"L(z)=\frac{{{n(2*q['projeto']['a'])}z(z+2)}}{{(z+{n(q['projeto']['b']-1)})(z^2+1)(z+4)}}", size=12)
        page.paragraph(390, "Substituímos s em toda a malha aberta, incluindo H e Gc. A função discretizada abaixo é L(z), e não a transferência contínua de malha fechada T(s).", width=91, size=10)
    page.heading(449, 8, "Normalizar a função em z")
    page.formula(476, ("G_c(z)=" if index == 0 else "L(z)=") + transfer(result, "z"), size=11)
    page.heading(541, 8, "Verificar os polos discretos")
    page.paragraph(572, "Polos: " + "; ".join(base.complex_text(x) for x in d["polos"]) + ".", width=95, size=10)
    note = ("Os polos +1 e −1 estão sobre o círculo unitário. O controlador discretizado não é assintoticamente estável isoladamente."
            if index == 0 else "Há polos fora do círculo unitário. A aproximação forward da malha aberta não é assintoticamente estável para este período.")
    page.paragraph(615, note + " Esta análise não fecha nem simula uma malha digital.", width=95, size=9.8)
    page.finish(pdf)


def first_order_design(data, pdf):
    q = data["questoes"][1]
    p = q["projeto"]
    page = new_page(data, 2, "Item a · Cálculo dos parâmetros reais a e b", 4)
    page.paragraph(165, "Encontrar a e b do controlador Gc(s) = a/(s+b) para que a malha fechada apresente polos em −2,5 ± 2j.")
    page.formula(209, r"G(s)=\frac{2(s+1)}{s^2+2s+2},\qquad H(s)=\frac{s+3}{s+5}")
    page.heading(266, 1, "Avaliar a malha no polo desejado")
    page.formula(294, r"s_d=-2.5+2j,\qquad G(s)H(s)=\frac{2(s+1)(s+3)}{(s^2+2s+2)(s+5)}", size=12)
    page.formula(345, rf"V=G(s_d)H(s_d)={n(p['valorGH']['re'])}-j{n(abs(p['valorGH']['im']))}", size=12)
    page.heading(395, 2, "Separar as partes imaginária e real")
    page.formula(423, r"1+\frac{aV}{s_d+b}=0\quad\Rightarrow\quad s_d+b+aV=0", size=12)
    page.formula(472, r"\mathrm{Im}(s_d)+a\,\mathrm{Im}(V)=0,\quad a=\frac{-\mathrm{Im}(s_d)}{\mathrm{Im}(V)}", size=12)
    page.formula(520, rf"a=\frac{{7995}}{{2104}}={n(p['a'])}")
    page.formula(571, r"\mathrm{Re}(s_d)+b+a\,\mathrm{Re}(V)=0", size=12)
    page.formula(610, rf"b=-\mathrm{{Re}}(s_d)-a\,\mathrm{{Re}}(V)=\frac{{738}}{{263}}={n(p['b'])}", size=12)
    page.heading(674, 3, "Escrever o controlador encontrado")
    page.formula(702, "G_c(s)=" + transfer(p["Gc"]), size=14)
    page.paragraph(750, "Os parâmetros são reais. O polo do controlador é −2,806084. A presença do par e dos demais polos será verificada na equação característica.", width=95, size=10)
    page.finish(pdf)


def first_order_validation(data, pdf):
    q = data["questoes"][1]
    p, s = q["projeto"], q["resposta"]
    page = new_page(data, 2, "Item a · Equação característica e validação dos polos", 5)
    page.heading(165, 4, "Verificar a equação característica")
    page.formula(195, r"(s+b)(s^2+2s+2)(s+5)+2a(s+1)(s+3)=0", size=12)
    page.paragraph(230, "Com os valores exatos de a e b, a fatoração da equação, a menos de uma constante multiplicativa, é:", width=91, size=10)
    page.formula(272, r"(4s^2+20s+41)(263s^2+1264s+1305)=0", size=12.5)
    page.formula(302, r"4s^2+20s+41=0\quad\Rightarrow\quad s=-2.5\pm2j", size=12)
    page.heading(351, 5, "Fechar a malha e listar todos os polos")
    closed_loop(page, p, 378)
    page.table(522, [("Par solicitado −2,5 ± 2j", "Presente · atende"),
                     ("Estabilidade contínua", "Todos os polos com Re < 0")])
    step_chart(page, q, 592, 119, 8)
    page.paragraph(751, f"O polo real −1,501580 é mais lento que o par solicitado. O valor final do degrau é {decimal(s['yss'], 6)}. O enunciado fixa a localização dos polos, sem exigir ganho unitário, Mp ou acomodação.", width=98, size=9.3)
    page.finish(pdf)


def verify_discrete(data):
    s, z = sp.symbols("s z")
    checks = []
    for q in data["questoes"]:
        d = q["discretizacao"]["calculo"]
        c, f, discrete = d["configuracao"], d["continua"], d["resultado"]
        expression = lambda coefs: sum(sp.Float(x, 17) * s ** (len(coefs) - i - 1) for i, x in enumerate(coefs))
        substitution = 2 / c["periodo"] * (z - 1) / (z + 1) if c["metodo"] == "tustin" else (z - 1) / c["periodo"]
        expected = sp.cancel((expression(f["num"]) / expression(f["den"])).subs(s, substitution))
        errors = []
        for zz in (1.3, 2.7, 3.5 + 2j):
            actual = np.polyval(discrete["num"], zz) / np.polyval(discrete["den"], zz)
            reference = complex(expected.subs(z, zz).evalf())
            error = abs(actual - reference)
            if error > 1e-10 * max(1, abs(reference)):
                raise ValueError(f"{q['id']}: discretização diverge de SymPy por {error}")
            errors.append(error)
        checks.append({"questao": q["id"], "erroMaximoDiscretizacaoSymPy": float(max(errors))})
    p = data["questoes"][1]["projeto"]
    assert abs(p["a"] - 7995 / 2104) < 1e-12 and abs(p["b"] - 738 / 263) < 1e-12
    gh = 2 * (s + 1) * (s + 3) / ((s**2 + 2*s + 2) * (s + 5))
    characteristic = sp.fraction(sp.cancel(1 + sp.Rational(7995, 2104) * gh / (s + sp.Rational(738, 263))))[0]
    assert sp.simplify(characteristic.subs(s, -sp.Rational(5, 2) + 2*sp.I)) == 0
    data["verificacaoDiscretizacao"] = checks
    return checks


if __name__ == "__main__":
    data = base.export_data("lista2")
    errors = base.verify(data)
    checks = verify_discrete(data)
    path = base.DEST / "lista2_2a_unidade_Eugenio_Santo.pdf"
    with PdfPages(path, metadata={
        "Title": "2º Exercício da 2ª Unidade · DCA-3701.0 · Resolução e verificação",
        "Author": data["autor"],
        "Subject": "PID, a/(s+b), Tustin e Euler forward; verificação dos requisitos",
        "Creator": "Núcleo TypeScript do aplicativo; Matplotlib",
    }) as pdf:
        pid_design(data, pdf)
        pid_validation(data, pdf)
        discretization_page(data, 0, pdf)
        first_order_design(data, pdf)
        first_order_validation(data, pdf)
        discretization_page(data, 1, pdf)
    (base.DEST / "lista2-2a-unidade.dados.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(path)
    print(json.dumps({"curvas": errors, "discretizacoes": checks}, ensure_ascii=False, indent=2))
