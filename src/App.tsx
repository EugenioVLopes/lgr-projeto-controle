import { useEffect, useMemo, useState } from "react";
import LgrPlot, { type Trace } from "./components/LgrPlot";
import DicaProva from "./components/DicaProva";
import Formula, {
  polinomioParaLatex,
  complexoParaLatex,
} from "./components/Formula";
import { EXEMPLOS } from "./lib/examples";
import {
  criarComplexo,
  encontrarPontosBreakaway,
  encontrarSegmentosEixoReal,
  calcularAnguloPartida,
  calcularAssintotas,
  calcularGanhoK,
  calcularRamosLgr,
  encontrarCruzamentosEixoImaginario,
  combinarMalhaAberta,
  formatarComplexo,
  ehNumeroReal,
  analisarCoeficientes,
  encontrarRaizes,
  montarTabelaRouth,
  detalharAnguloS0,
  detalharGanhoS0,
  detalharPartida,
  equacaoDerivadaBreakaway,
  avaliarPolinomioReal,
  testarCriterioAngulo,
} from "./lib/lgr/index";
import type {
  BreakPoint,
  Complex,
  Cruzamento,
  TesteAngulo,
} from "./lib/lgr/index";

function useValorComDebounce<T>(valor: T, atraso = 300): T {
  const [debounced, setDebounced] = useState(valor);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(valor), atraso);
    return () => clearTimeout(t);
  }, [valor, atraso]);
  return debounced;
}

type CalcErro = { error: string };
type CalcOk = {
  error: null;
  num: number[];
  den: number[];
  zeros: Complex[];
  polos: Complex[];
  segs: Array<[number, number]>;
  sigma: number | null;
  angs: number[];
  bk: BreakPoint[];
  cruzs: Cruzamento[];
  info: Record<string, number[]>;
  Ks: number[];
  ramos: Complex[][];
  s0: Complex;
  t: TesteAngulo;
  K: number;
  partidas: Array<{ p: Complex; ang: number }>;
  routh0: number[][];
};
type Calc = CalcErro | CalcOk;

export default function App() {
  const exemploInicial = EXEMPLOS.find((e) => e.id === "q1") ?? EXEMPLOS[0];
  const [exId, setExId] = useState(exemploInicial.id);
  const [nG, setNG] = useState(exemploInicial.nG);
  const [dG, setDG] = useState(exemploInicial.dG);
  const [nH, setNH] = useState(exemploInicial.nH);
  const [dH, setDH] = useState(exemploInicial.dH);
  const [sr, setSr] = useState(String(exemploInicial.sr));
  const [si, setSi] = useState(String(exemploInicial.si));
  const [tema, setTema] = useState<"light" | "dark">("light");
  const corPolo = tema === "dark" ? "#f87171" : "#dc2626";
  const corZero = tema === "dark" ? "#4ade80" : "#16a34a";

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  const pickEx = (id: string) => {
    const e = EXEMPLOS.find((x) => x.id === id) ?? EXEMPLOS[0];
    setExId(e.id);
    setNG(e.nG);
    setDG(e.dG);
    setNH(e.nH);
    setDH(e.dH);
    setSr(String(e.sr));
    setSi(String(e.si));
  };

  const nGd = useValorComDebounce(nG);
  const dGd = useValorComDebounce(dG);
  const nHd = useValorComDebounce(nH);
  const dHd = useValorComDebounce(dH);
  const srd = useValorComDebounce(sr);
  const sid = useValorComDebounce(si);

  const calc: Calc = useMemo(() => {
    const pNG = analisarCoeficientes(nGd);
    const pDG = analisarCoeficientes(dGd);
    const pNH = analisarCoeficientes(nHd);
    const pDH = analisarCoeficientes(dHd);
    if (!pNG || !pDG || !pNH || !pDH)
      return { error: 'Confere os coeficientes (use espaços: ex. "1 4 0")' };
    const { num, den } = combinarMalhaAberta(pNG, pDG, pNH, pDH);
    const zeros = encontrarRaizes(num);
    const polos = encontrarRaizes(den);
    const segs = encontrarSegmentosEixoReal(zeros, polos);
    const { sigma, angs } = calcularAssintotas(zeros, polos);
    const bk = encontrarPontosBreakaway(num, den, polos, zeros);
    const { cruzs, info } = encontrarCruzamentosEixoImaginario(den, num);
    const { Ks, ramos } = calcularRamosLgr(num, den);
    const s0 = criarComplexo(Number(srd) || 0, Number(sid) || 0);
    const t = testarCriterioAngulo(s0, zeros, polos);
    const K = calcularGanhoK(s0, zeros, polos);
    const cxP = polos.filter((p) => p.im > 1e-8);
    const partidas = cxP.map((p) => ({
      p,
      ang: calcularAnguloPartida(p, polos, zeros),
    }));
    const routh0 = montarTabelaRouth(den, num, 1);
    return {
      error: null,
      num,
      den,
      zeros,
      polos,
      segs,
      sigma,
      angs,
      bk,
      cruzs,
      info,
      Ks,
      ramos,
      s0,
      t,
      K,
      partidas,
      routh0,
    };
  }, [nGd, dGd, nHd, dHd, srd, sid]);

  const tracesRamos: Trace[] = useMemo(() => {
    if (calc.error !== null) return [];
    return [
      ...Array.from({ length: calc.polos.length }, (_, j) => ({
        x: calc.ramos
          .map((r) => r[j]?.re)
          .filter((v): v is number => Number.isFinite(v)),
        y: calc.ramos
          .map((r) => r[j]?.im)
          .filter((v): v is number => Number.isFinite(v)),
        mode: "lines",
        name: `ramo ${j + 1}`,
      })),
      {
        x: calc.polos.map((p) => p.re),
        y: calc.polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { color: corPolo, symbol: "x", size: 10 },
      },
    ];
  }, [calc, corPolo]);

  return (
    <>
      <header>
        <div className="header-row">
          <div>
            <h1>LGR 12 passos</h1>
            <p>DCA-3701 UFRN</p>
          </div>
          <button
            type="button"
            className="primary"
            style={{ width: "auto", marginTop: 0 }}
            onClick={() => setTema((t) => (t === "light" ? "dark" : "light"))}
            aria-pressed={tema === "dark"}
          >
            {tema === "light" ? "Modo escuro" : "Modo claro"}
          </button>
        </div>
      </header>
      <main>
        <div className="card">
          <label htmlFor="exemplo">Exemplo da lista</label>
          <select
            id="exemplo"
            value={exId}
            onChange={(e) => pickEx(e.target.value)}
          >
            {EXEMPLOS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
          </select>
          <div className="grid2">
            <fieldset>
              <legend>G(s), malha direta</legend>
              {(() => {
                const pNG = analisarCoeficientes(nG);
                const pDG = analisarCoeficientes(dG);
                if (!pNG || !pDG) return null;
                return (
                  <Formula
                    latex={`G(s) = \\frac{${polinomioParaLatex(pNG)}}{${polinomioParaLatex(pDG)}}`}
                    descricao="G de s"
                  />
                );
              })()}
              <div>
                <label htmlFor="num-g">Numerador G(s)</label>
                <input
                  id="num-g"
                  value={nG}
                  onChange={(e) => setNG(e.target.value)}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={calc.error !== null}
                  aria-describedby="erro-coefs ajuda-coefs"
                />
              </div>
              <div>
                <label htmlFor="den-g">Denominador G(s)</label>
                <input
                  id="den-g"
                  value={dG}
                  onChange={(e) => setDG(e.target.value)}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={calc.error !== null}
                  aria-describedby="erro-coefs ajuda-coefs"
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>H(s), realimentação</legend>
              {(() => {
                const pNH = analisarCoeficientes(nH);
                const pDH = analisarCoeficientes(dH);
                if (!pNH || !pDH) return null;
                return (
                  <Formula
                    latex={`H(s) = \\frac{${polinomioParaLatex(pNH)}}{${polinomioParaLatex(pDH)}}`}
                    descricao="H de s"
                  />
                );
              })()}
              <div>
                <label htmlFor="num-h">Numerador H(s)</label>
                <input
                  id="num-h"
                  value={nH}
                  onChange={(e) => setNH(e.target.value)}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={calc.error !== null}
                  aria-describedby="erro-coefs ajuda-coefs"
                />
              </div>
              <div>
                <label htmlFor="den-h">Denominador H(s)</label>
                <input
                  id="den-h"
                  value={dH}
                  onChange={(e) => setDH(e.target.value)}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={calc.error !== null}
                  aria-describedby="erro-coefs ajuda-coefs"
                />
              </div>
            </fieldset>
          </div>
          <fieldset>
            <legend>Ponto de teste s0</legend>
            {(() => {
              const s0 = criarComplexo(Number(sr) || 0, Number(si) || 0);
              const parte = complexoParaLatex(s0);
              return (
                <Formula
                  latex={`s_0 = ${parte}`}
                  descricao={`Ponto de teste s0 igual a ${parte}`}
                />
              );
            })()}
            <div className="grid2">
              <div>
                <label htmlFor="re-s0">Teste Re(s0)</label>
                <input
                  id="re-s0"
                  value={sr}
                  onChange={(e) => setSr(e.target.value)}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={calc.error !== null}
                  aria-describedby="erro-coefs ajuda-coefs"
                />
              </div>
              <div>
                <label htmlFor="im-s0">Teste Im(s0)</label>
                <input
                  id="im-s0"
                  value={si}
                  onChange={(e) => setSi(e.target.value)}
                  inputMode="decimal"
                  autoComplete="off"
                  aria-invalid={calc.error !== null}
                  aria-describedby="erro-coefs ajuda-coefs"
                />
              </div>
            </div>
          </fieldset>
          <p id="ajuda-coefs" className="ajuda">
            Coefs em ordem decrescente de s, separados por espaço. Ex.: s²+13s →
            "1 13 0".
          </p>
        </div>

        {calc.error !== null ? (
          <div id="erro-coefs" className="card badge-warn" role="alert">
            {calc.error}
          </div>
        ) : (
          <>
            <details open>
              <summary>Passo 1, equação característica</summary>
              <Formula
                latex={`G(s)H(s) = K \\cdot \\frac{${polinomioParaLatex(calc.num)}}{${polinomioParaLatex(calc.den)}}`}
                descricao={`G H igual a K vezes N sobre D`}
              />
              <Formula
                latex={`1 + K \\cdot P(s) = 0 \\quad\\to\\quad ${polinomioParaLatex(calc.den)} + K \\cdot (${polinomioParaLatex(calc.num)}) = 0`}
                descricao="Equação característica"
              />
              <DicaProva dica="multiplica G·H, separa o K do resto. O que sobra com K é N(s), o resto é D(s). A equação é sempre D(s) + K·N(s) = 0." />
            </details>
            <details>
              <summary>Passo 2, forma fatorada</summary>
              <Formula
                latex={`P(s) = \\frac{N(s)}{D(s)} = \\frac{${polinomioParaLatex(calc.num)}}{${polinomioParaLatex(calc.den)}}`}
                descricao="P igual a N sobre D"
              />
              <DicaProva dica="fatora N(s)=0 para achar zeros, D(s)=0 para achar polos. Grau de D é np, grau de N é nz." />
            </details>
            <details open>
              <summary>
                Passo 3, polos e zeros ({calc.polos.length}p /{" "}
                {calc.zeros.length}z)
              </summary>
              <LgrPlot
                title="Polos (x) e zeros (o)"
                descritoPor="desc-polos"
                tema={tema}
                traces={[
                  {
                    x: calc.polos.map((p) => p.re),
                    y: calc.polos.map((p) => p.im),
                    mode: "markers",
                    name: "polos",
                    marker: { symbol: "x", size: 11, color: corPolo },
                  },
                  {
                    x: calc.zeros.map((z) => z.re),
                    y: calc.zeros.map((z) => z.im),
                    mode: "markers",
                    name: "zeros",
                    marker: { symbol: "circle-open", size: 10, color: corZero },
                  },
                ]}
              />
              <Formula
                id="desc-polos"
                latex={calc.polos
                  .map((p, i) => `p_{${i + 1}} = ${complexoParaLatex(p)}`)
                  .join(",\\quad ")}
                descricao={`Polos: ${calc.polos.map(formatarComplexo).join("; ")}`}
              />
              {calc.zeros.length ? (
                <Formula
                  latex={calc.zeros
                    .map((z, i) => `z_{${i + 1}} = ${complexoParaLatex(z)}`)
                    .join(",\\quad ")}
                  descricao={`Zeros: ${calc.zeros.map(formatarComplexo).join("; ")}`}
                />
              ) : (
                <p>nenhum finito</p>
              )}
              <DicaProva dica="polos são onde o denominador zera (K=0 começa aqui), zeros onde o numerador zera (K→∞ termina aqui). Marca x e o no plano." />
            </details>
            <details>
              <summary>Passo 4, segmentos eixo real</summary>
              <div className="mono">
                {calc.segs.length
                  ? calc.segs
                      .map(
                        ([a, b]) =>
                          `[${a === -Infinity ? "-∞" : a.toFixed(4)}, ${b.toFixed(4)}]`,
                      )
                      .join("  ")
                  : "nenhum segmento"}
              </div>
              <div className="memoria">
                <p className="memoria-titulo">Como cheguei aqui</p>
                <div className="mono">
                  {(() => {
                    const reais = [
                      ...calc.polos.filter((p) => ehNumeroReal(p)),
                      ...calc.zeros.filter((z) => ehNumeroReal(z)),
                    ]
                      .map((z) => z.re)
                      .sort((a, b) => b - a);
                    if (!reais.length) return "sem polos/zeros reais";
                    return `reais ordenados: ${reais.map((r) => r.toFixed(4)).join(", ")} → testa ponto médio de cada intervalo e conta polos+zeros à direita (ímpar = pertence)`;
                  })()}
                </div>
              </div>
              <DicaProva dica="marca polos (x) e zeros (o) no eixo real, da direita para a esquerda conta quantos tem à direita do trecho. Ímpar = o trecho é LGR. Não precisa de conta, só contar." />
            </details>
            <details>
              <summary>Passo 5, lugares separados</summary>
              <Formula
                latex={`L_s = \\max(n_p,n_z) = \\max(${calc.polos.length},${calc.zeros.length}) = ${Math.max(calc.polos.length, calc.zeros.length)}`}
                descricao={`Número de lugares separados igual a ${Math.max(calc.polos.length, calc.zeros.length)}`}
              />
              <DicaProva dica="Ls é o número de ramos = número de polos (quase sempre maior que zeros). Cada polo sai um ramo." />
            </details>
            <details>
              <summary>Passo 6, simetria</summary>
              <p>Simétrico ao eixo real (pares conjugados).</p>
              <DicaProva dica="só fala que o desenho de cima espelha embaixo. Se achar um ponto complexo, o conjugado também é. Não tem conta." />
            </details>
            <details open>
              <summary>Passo 7, assíntotas</summary>
              {calc.sigma === null ? (
                <p>np ≤ nz → sem assíntotas.</p>
              ) : (
                (() => {
                  const sig: number = calc.sigma;
                  return (
                    <>
                      <Formula
                        id="desc-assintotas"
                        latex={`n_a = ${calc.polos.length - calc.zeros.length},\\quad \\sigma_a = ${sig.toFixed(4)},\\quad \\phi = ${calc.angs.map((a) => `${a.toFixed(1)}^{\\circ}`).join(",\\;")}`}
                        descricao={`Assíntotas com sigma a ${sig.toFixed(4)}`}
                      />
                      <div className="memoria">
                        <p className="memoria-titulo">Como cheguei aqui</p>
                        <Formula
                          latex={`\\sum p_i = ${calc.polos.map((p) => p.re.toFixed(2)).join(" + ") || "0"} = ${calc.polos.reduce((a, p) => a + p.re, 0).toFixed(4)},\\quad \\sum z_i = ${calc.zeros.length ? calc.zeros.map((z) => z.re.toFixed(2)).join(" + ") : "0"} = ${calc.zeros.reduce((a, z) => a + z.re, 0).toFixed(4)}`}
                          descricao="Somas das partes reais de polos e zeros"
                        />
                        <Formula
                          latex={`\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n_p - n_z} = \\frac{${calc.polos.reduce((a, p) => a + p.re, 0).toFixed(4)} - (${calc.zeros.reduce((a, z) => a + z.re, 0).toFixed(4)})}{${calc.polos.length - calc.zeros.length}} = ${sig.toFixed(4)}`}
                          descricao={`Centroide sigma a igual a ${sig.toFixed(4)}`}
                        />
                        <div className="mono">
                          {`phi(q) = (2q+1)*180/na → ${calc.angs.map((a, q) => `q=${q}: ${a.toFixed(1)}°`).join("; ")}`}
                        </div>
                      </div>
                      <DicaProva dica="sigma_a = (soma dos polos - soma dos zeros) / (np - nz), usando só a parte real. Depois os ângulos são (2q+1)*180/na para q = 0..na-1. Desenha as retas saindo do sigma_a." />
                      <LgrPlot
                        title="Assíntotas"
                        descritoPor="desc-assintotas"
                        tema={tema}
                        traces={[
                          {
                            x: calc.polos.map((p) => p.re),
                            y: calc.polos.map((p) => p.im),
                            mode: "markers",
                            name: "polos",
                            marker: { color: corPolo, symbol: "x", size: 10 },
                          },
                          ...calc.angs.map((a, i) => {
                            const r = (a * Math.PI) / 180;
                            const L = 20;
                            return {
                              x: [sig, sig + L * Math.cos(r)],
                              y: [0, L * Math.sin(r)],
                              mode: "lines",
                              name: i === 0 ? "assíntotas" : undefined,
                            };
                          }),
                        ]}
                      />
                    </>
                  );
                })()
              )}
            </details>
            <details>
              <summary>Passo 8, breakaway/break-in (dK/ds=0)</summary>
              {(() => {
                const det = equacaoDerivadaBreakaway(calc.num, calc.den);
                return (
                  <div className="memoria">
                    <p className="memoria-titulo">Como cheguei aqui</p>
                    <Formula
                      latex={`N(s) = ${polinomioParaLatex(calc.num)},\\quad D(s) = ${polinomioParaLatex(calc.den)}`}
                      descricao="Numerador e denominador da malha aberta"
                    />
                    <Formula
                      latex={`N'(s) = ${polinomioParaLatex(det.dNum)},\\quad D'(s) = ${polinomioParaLatex(det.dDen)}`}
                      descricao="Derivadas de N e D"
                    />
                    <Formula
                      latex={`N \\cdot D' - D \\cdot N' = ${polinomioParaLatex(det.eq)} = 0`}
                      descricao="Equação dK/ds igual a zero"
                    />
                  </div>
                );
              })()}
              {calc.bk.length ? (
                <Formula
                  latex={calc.bk
                    .map(
                      (b) =>
                        `s = ${complexoParaLatex(b.s)},\\; K = ${b.K.toFixed(4)}`,
                    )
                    .join(",\\quad ")}
                  descricao="Pontos de breakaway com ganho K"
                />
              ) : (
                <p>nenhum ponto válido com K&gt;0 no LGR</p>
              )}
              <DicaProva dica="K = -D(s)/N(s). Deriva dK/ds = 0 → resolve N·D' - D·N' = 0. Só vale raiz real em trecho do LGR (passo 4) com K > 0. Calcula K = -D(s)/N(s) em cada candidata e descarta K negativo." />
            </details>
            <details>
              <summary>
                Passo 9, cruzamento eixo imaginário (Routh + s=jω)
              </summary>
              <div className="memoria">
                <p className="memoria-titulo">Como cheguei aqui</p>
                <Formula
                  latex={`R_D=${polinomioParaLatex(calc.info.Re_D || [0], "\\omega")},\\; I_D=${polinomioParaLatex(calc.info.Im_D || [0], "\\omega")},\\; R_N=${polinomioParaLatex(calc.info.Re_N || [0], "\\omega")},\\; I_N=${polinomioParaLatex(calc.info.Im_N || [0], "\\omega")}`}
                  descricao="Partes real e imaginária de D(jw) e N(jw)"
                />
                <div className="mono">
                  {`s=jω → D(jω)=Re_D(ω)+j·Im_D(ω), N(jω)=Re_N(ω)+j·Im_N(ω). Condição Im[D/N]=0 → Re_D·Im_N − Im_D·Re_N = 0`}
                </div>
              </div>
              <Formula
                latex={`\\mathrm{cross}(\\omega) = ${polinomioParaLatex(calc.info.cross, "\\omega")} = 0`}
                descricao="Polinômio de cruzamento em ômega igual a zero"
              />
              {calc.cruzs.length ? (
                <div className="memoria">
                  <p className="memoria-titulo">Substituindo ω para achar K</p>
                  <div className="mono">
                    {calc.cruzs
                      .map((c) => {
                        const reD = avaliarPolinomioReal(
                          calc.info.Re_D || [0],
                          c.w,
                        );
                        const reN = avaliarPolinomioReal(
                          calc.info.Re_N || [0],
                          c.w,
                        );
                        const imD = avaliarPolinomioReal(
                          calc.info.Im_D || [0],
                          c.w,
                        );
                        const imN = avaliarPolinomioReal(
                          calc.info.Im_N || [0],
                          c.w,
                        );
                        return `ω=${c.w.toFixed(4)}: Re_D=${reD.toFixed(3)}, Im_D=${imD.toFixed(3)}, Re_N=${reN.toFixed(3)}, Im_N=${imN.toFixed(3)} → K=−Re_D/Re_N=${c.K.toFixed(4)}`;
                      })
                      .join("\n")}
                  </div>
                </div>
              ) : null}
              {calc.cruzs.length ? (
                <Formula
                  latex={calc.cruzs
                    .map(
                      (c) =>
                        `\\omega = ${c.w.toFixed(4)},\\; K = ${c.K.toFixed(4)},\\; s = \\pm ${c.w.toFixed(4)}j`,
                    )
                    .join(",\\quad ")}
                  descricao="Cruzamentos do eixo imaginário com ganho K"
                />
              ) : (
                <p>
                  não cruza para{" "}
                  <Formula inline latex="K > 0" descricao="K maior que zero" />
                </p>
              )}
              <Formula
                display
                latex={(() => {
                  const linhas = calc.routh0;
                  const cols = Math.max(...linhas.map((r) => r.length));
                  const corpo = linhas
                    .map((r) => {
                      const cels = r.map((v) => v.toFixed(3));
                      while (cels.length < cols) cels.push("");
                      return cels.join(" & ");
                    })
                    .join("\\\\");
                  return `\\begin{array}{${"c".repeat(cols)}}${corpo}\\end{array}`;
                })()}
                descricao={`Tabela de Routh para K igual a 1, primeira coluna: ${calc.routh0.map((r) => r[0].toFixed(3)).join(", ")}`}
              />
              <DicaProva dica="monta D+K·N=0, separa Re e Im com s=jω (j²=−1, j³=−j). Resolve cross(ω)=0, pega ω>0 real. Acha K=−Re_D/Re_N (ou −Im_D/Im_N). No Routh, zera a linha que dá K crítico e lê ω da linha auxiliar." />
            </details>
            <details>
              <summary>Passo 10, ângulos partida/chegada</summary>
              {calc.partidas.length ? (
                <Formula
                  latex={calc.partidas
                    .map(
                      (p) =>
                        `p = ${complexoParaLatex(p.p)},\\; \\theta_d = ${p.ang.toFixed(2)}^{\\circ}`,
                    )
                    .join(",\\quad ")}
                  descricao="Ângulos de partida dos polos complexos"
                />
              ) : null}
              {calc.partidas.length ? (
                <div className="memoria">
                  <p className="memoria-titulo">Como cheguei aqui</p>
                  <div className="mono">
                    {calc.partidas
                      .map(({ p, ang }) => {
                        const det = detalharPartida(p, calc.polos, calc.zeros);
                        const sp =
                          det.parcelasPolos
                            .map((x) => `${x.ang.toFixed(1)}°(${x.origem})`)
                            .join(" + ") || "0";
                        const sz =
                          det.parcelasZeros
                            .map((x) => `${x.ang.toFixed(1)}°(${x.origem})`)
                            .join(" + ") || "0";
                        return `p=${formatarComplexo(p)}: θ=180−(∑polos ${sp})+(∑zeros ${sz})=${ang.toFixed(2)}°`;
                      })
                      .join("\n")}
                  </div>
                </div>
              ) : null}
              <DicaProva dica="no polo complexo, soma os ângulos até os outros polos, soma até os zeros, faz 180 − somaPolos + somaZeros. Esse é o ângulo que o ramo sai do polo." />
              {calc.partidas.length ? null : (
                <p>
                  sem polos complexos, não se aplica (
                  {calc.polos.filter((p) => !ehNumeroReal(p)).length} complexos)
                </p>
              )}
            </details>
            <details open>
              <summary>
                Passo 11, critério do ângulo em s0={formatarComplexo(calc.s0)}
              </summary>
              <p className={calc.t.pertence ? "badge-ok" : "badge-warn"}>
                {calc.t.pertence ? "PERTENCE ao LGR" : "NÃO pertence"} (∠=
                {calc.t.norm.toFixed(2)}°, alvo ±180°)
              </p>
              <LgrPlot
                title="Teste s0"
                descritoPor="desc-s0"
                tema={tema}
                traces={[
                  {
                    x: calc.polos.map((p) => p.re),
                    y: calc.polos.map((p) => p.im),
                    mode: "markers",
                    name: "polos",
                    marker: { color: corPolo, symbol: "x", size: 10 },
                  },
                  {
                    x: [calc.s0.re],
                    y: [calc.s0.im],
                    mode: "markers",
                    name: "s0",
                    marker: {
                      color: calc.t.pertence ? corZero : corPolo,
                      size: 13,
                      symbol: "star",
                    },
                  },
                ]}
              />
              <div className="memoria">
                <p className="memoria-titulo">Como cheguei aqui</p>
                <div className="mono">
                  {(() => {
                    const det = detalharAnguloS0(
                      calc.s0,
                      calc.zeros,
                      calc.polos,
                    );
                    const lp = det.parcelasPolos
                      .map(
                        (x) =>
                          `∠(s0−${x.origem})=∠(${x.vetorRe.toFixed(2)}${x.vetorIm >= 0 ? "+" : ""}${x.vetorIm.toFixed(2)}j)=${x.ang.toFixed(1)}°`,
                      )
                      .join("\n");
                    const lz = det.parcelasZeros.length
                      ? det.parcelasZeros
                          .map(
                            (x) =>
                              `∠(s0−${x.origem})=∠(${x.vetorRe.toFixed(2)}${x.vetorIm >= 0 ? "+" : ""}${x.vetorIm.toFixed(2)}j)=${x.ang.toFixed(1)}°`,
                          )
                          .join("\n")
                      : "sem zeros finitos";
                    return `${lp}\n--- zeros ---\n${lz}\n∑polos=${det.parcelasPolos.reduce((a, x) => a + x.ang, 0).toFixed(2)}° ∑zeros=${det.parcelasZeros.reduce((a, x) => a + x.ang, 0).toFixed(2)}° → ∠=${calc.t.ang.toFixed(2)}° → norm ${calc.t.norm.toFixed(2)}°`;
                  })()}
                </div>
              </div>
              <Formula
                id="desc-s0"
                latex={`s_0 = ${complexoParaLatex(calc.s0)},\\quad \\angle P(s_0) = ${calc.t.norm.toFixed(2)}^{\\circ}`}
                descricao={`Ponto s0 com ângulo ${calc.t.norm.toFixed(2)} graus`}
              />
              <DicaProva dica="para cada polo/zero calcula o vetor s0−p (diferença real e imag) e o ângulo com arctan2(Im,Re). Soma zeros menos soma polos. Normaliza para ±180°. Se der ±180° (±5°) pertence ao LGR." />
            </details>
            <details open>
              <summary>Passo 12, K em s0</summary>
              <div className="memoria">
                <p className="memoria-titulo">Como cheguei aqui</p>
                <div className="mono">
                  {(() => {
                    const det = detalharGanhoS0(
                      calc.s0,
                      calc.zeros,
                      calc.polos,
                    );
                    const lp = det.distPolos
                      .map((d, i) => `|s0−p${i + 1}|=${d.toFixed(4)}`)
                      .join(" × ");
                    const lz = det.distZeros.length
                      ? det.distZeros
                          .map((d, i) => `|s0−z${i + 1}|=${d.toFixed(4)}`)
                          .join(" × ")
                      : "1 (sem zeros)";
                    const pp = det.distPolos.reduce((a, d) => a * d, 1);
                    const pz = det.distZeros.length
                      ? det.distZeros.reduce((a, d) => a * d, 1)
                      : 1;
                    return `${lp} = ${pp.toFixed(4)}\n${lz} = ${pz.toFixed(4)}\nK = ${pp.toFixed(4)} / ${pz.toFixed(4)} = ${Number.isFinite(calc.K) ? calc.K.toFixed(6) : "∞"}`;
                  })()}
                </div>
              </div>
              <Formula
                latex={`K = \\frac{\\prod|s_0-p_i|}{\\prod|s_0-z_i|} = ${Number.isFinite(calc.K) ? calc.K.toFixed(6) : "\\infty"}`}
                descricao={`Ganho K igual a ${Number.isFinite(calc.K) ? calc.K.toFixed(6) : "infinito"}`}
              />
              <DicaProva dica="K = produto das distâncias de s0 aos polos dividido pelo produto das distâncias aos zeros. Distância = hypot(Re(s0−p), Im(s0−p)). Se s0 está em cima de um zero, K=0; se não há zeros, divide por 1." />
            </details>
            <details open>
              <summary>LGR completo</summary>
              <LgrPlot
                title="Lugar Geométrico das Raízes"
                descritoPor="desc-lgr"
                tema={tema}
                traces={tracesRamos}
              />
              <div className="mono" id="desc-lgr">
                {calc.polos.length} ramos, K até{" "}
                {calc.Ks.length ? calc.Ks[calc.Ks.length - 1].toFixed(1) : "-"}
              </div>
            </details>
          </>
        )}
      </main>
    </>
  );
}
