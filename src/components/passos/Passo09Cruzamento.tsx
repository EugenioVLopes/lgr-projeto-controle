import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula, { polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import {
  avaliarPolinomioReal,
  montarTabelaRouth,
  montarTabelaRouthSimbolica,
} from "../../lib/lgr/index";
import type { Complex, Cruzamento } from "../../lib/lgr/index";

interface Props {
  info: Record<string, number[]>;
  cruzs: Cruzamento[];
  den: number[];
  num: number[];
  polos: Complex[];
  zeros: Complex[];
  ramos: Complex[][];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

function fmt(n: number): string {
  if (Math.abs(n) < 1e-12) return "0";
  const r = Math.round(n);
  if (Math.abs(n - r) < 1e-9) return `${r}`;
  return `${+n.toFixed(4)}`;
}

export default function Passo09Cruzamento({
  info,
  cruzs,
  den,
  num,
  polos,
  zeros,
  ramos,
  tema,
  corPolo,
  corZero,
}: Props) {
  const reD = info.Re_D || [0];
  const imD = info.Im_D || [0];
  const reN = info.Re_N || [0];
  const imN = info.Im_N || [0];
  const cross = info.cross || [0];
  const simb = useMemo(() => montarTabelaRouthSimbolica(den, num), [den, num]);
  const tamanho = Math.max(den.length, num.length);
  const dPad = useMemo(
    () => [...new Array(tamanho - den.length).fill(0), ...den],
    [den, tamanho],
  );
  const nPad = useMemo(
    () => [...new Array(tamanho - num.length).fill(0), ...num],
    [num, tamanho],
  );
  const grau = tamanho - 1;
  const latexCarac = useMemo(() => {
    const termos = simb.coefs.map((c, i) => {
      const exp = grau - i;
      if (exp === 0) return c;
      if (exp === 1) return `${c}s`;
      return `${c}s^{${exp}}`;
    });
    return `${termos.join(" + ").replaceAll("+ -", "- ")} = 0`;
  }, [simb, grau]);
  const latexSimb = useMemo(() => {
    const linhas = simb.tab.map(
      (r, i) => `s^{${simb.grau - i}} & ${r.join(" & ")}`,
    );
    return `\\begin{array}{c|${"c".repeat(simb.cols)}} \\hline ${linhas.join(" \\\\ ")} \\\\ \\hline \\end{array}`;
  }, [simb]);
  const cubico = grau === 3 && dPad.length === 4 && nPad.length === 4;
  const dadosCubico = useMemo(() => {
    if (!cubico) return null;
    const [d0, d1, d2, d3] = dPad;
    const [n0, n1, n2, n3] = nPad;
    const q2 = n1 * n2 - n0 * n3;
    const q1 = d1 * n2 + n1 * d2 - d0 * n3 - n0 * d3;
    const q0 = d1 * d2 - d0 * d3;
    const a3 = `${fmt(d0)}${Math.abs(n0) < 1e-12 ? "" : n0 > 0 ? ` + ${fmt(Math.abs(n0))}K` : ` - ${fmt(Math.abs(n0))}K`}`;
    const a2 = `${fmt(d1)}${Math.abs(n1) < 1e-12 ? "" : n1 > 0 ? ` + ${fmt(n1)}K` : ` - ${fmt(Math.abs(n1))}K`}`;
    const a1 = `${fmt(d2)}${Math.abs(n2) < 1e-12 ? "" : n2 > 0 ? ` + ${fmt(n2)}K` : ` - ${fmt(Math.abs(n2))}K`}`;
    const a0 = `${fmt(d3)}${Math.abs(n3) < 1e-12 ? "" : n3 > 0 ? ` + ${fmt(n3)}K` : ` - ${fmt(Math.abs(n3))}K`}`;
    let kCrit: number[] = [];
    if (Math.abs(q2) > 1e-12) {
      const disc = q1 * q1 - 4 * q2 * q0;
      if (disc >= 0) {
        const r1 = (-q1 - Math.sqrt(disc)) / (2 * q2);
        const r2 = (-q1 + Math.sqrt(disc)) / (2 * q2);
        kCrit = [r1, r2].filter((k) => k > 1e-10).sort((a, b) => a - b);
      }
    } else if (Math.abs(q1) > 1e-12) {
      const r = -q0 / q1;
      if (r > 1e-10) kCrit = [r];
    }
    if (!kCrit.length) kCrit = cruzs.map((c) => c.K);
    return {
      d0,
      d1,
      d2,
      d3,
      n0,
      n1,
      n2,
      n3,
      q2,
      q1,
      q0,
      a3,
      a2,
      a1,
      a0,
      kCrit,
    };
  }, [cubico, dPad, nPad, cruzs]);
  const kCritGerais = useMemo(() => {
    if (dadosCubico) return dadosCubico.kCrit;
    return [...new Set(cruzs.map((c) => c.K))].sort((a, b) => a - b);
  }, [dadosCubico, cruzs]);
  const traces = useMemo<Trace[]>(() => {
    const base: Trace[] = [];
    for (let j = 0; j < polos.length; j++) {
      base.push({
        x: ramos
          .map((r) => r[j]?.re)
          .filter((v): v is number => Number.isFinite(v)),
        y: ramos
          .map((r) => r[j]?.im)
          .filter((v): v is number => Number.isFinite(v)),
        mode: "lines",
        name: j === 0 ? "LGR" : undefined,
        line: { color: "#9ca3af", width: 1.5 },
      });
    }
    base.push({
      x: polos.map((p) => p.re),
      y: polos.map((p) => p.im),
      mode: "markers",
      name: "polos",
      marker: { color: corPolo, symbol: "x", size: 10 },
    });
    if (zeros.length) {
      base.push({
        x: zeros.map((z) => z.re),
        y: zeros.map((z) => z.im),
        mode: "markers",
        name: "zeros",
        marker: { color: corZero, symbol: "circle-open", size: 9 },
      });
    }
    cruzs.forEach((c, i) => {
      base.push({
        x: [0],
        y: [c.w],
        mode: "markers",
        name:
          i === 0 ? `jω=${c.w.toFixed(2)} (K=${c.K.toFixed(2)})` : undefined,
        marker: { symbol: "square", size: 10 },
      });
      base.push({
        x: [0],
        y: [-c.w],
        mode: "markers",
        name: undefined,
        marker: { symbol: "square", size: 10 },
      });
    });
    return base;
  }, [ramos, polos, zeros, cruzs, corPolo, corZero]);
  return (
    <details open>
      <summary>Passo 9, cruzamento com o eixo imaginário</summary>
      <p>
        <strong>O polinômio característico é:</strong>
      </p>
      <p>A partir de D(s) + K ⋅ N(s) = 0:</p>
      <Formula
        display
        latex={latexCarac}
        descricao="Polinomio caracteristico"
      />
      <p>
        <strong>Logo (tabela de Routh):</strong>
      </p>
      <Formula
        display
        latex={latexSimb}
        descricao="Tabela de Routh simbolica com K"
      />
      {dadosCubico ? (
        <>
          <Formula
            latex={`b_1 = \\frac{(${dadosCubico.a2})(${dadosCubico.a1}) - (${dadosCubico.a3})(${dadosCubico.a0})}{${dadosCubico.a2}} = \\frac{${fmt(dadosCubico.q2)}K^2 ${dadosCubico.q1 >= 0 ? "+" : "-"} ${fmt(Math.abs(dadosCubico.q1))}K ${dadosCubico.q0 >= 0 ? "+" : "-"} ${fmt(Math.abs(dadosCubico.q0))}}{${dadosCubico.a2}} = 0`}
            descricao="b1 igual a zero"
          />
          <Formula
            latex={`K = \\begin{cases} ${dadosCubico.kCrit.map((k) => k.toFixed(4)).join(" \\\\\\\\ ")} \\end{cases}`}
            descricao="K criticos"
          />
          <p>
            <strong>Polinômio auxiliar para cada K</strong> (linha s²):
          </p>
          {dadosCubico.kCrit.map((k, i) => {
            const A2 = dadosCubico.d1 + k * dadosCubico.n1;
            const A0 = dadosCubico.d3 + k * dadosCubico.n3;
            const w = A2 > 1e-12 && A0 > 0 ? Math.sqrt(A0 / A2) : NaN;
            return (
              <Formula
                key={i}
                latex={`K = ${k.toFixed(4)} \\Rightarrow ${A2.toFixed(4)}s^2 + ${A0.toFixed(4)} = 0 \\Rightarrow s_{1,2} = \\pm${Number.isFinite(w) ? w.toFixed(4) : "?"}i`}
                descricao={`Auxiliar K ${k.toFixed(4)}`}
              />
            );
          })}
        </>
      ) : (
        <>
          <p>
            <strong>Condições de estabilidade</strong> (primeira coluna &gt; 0):
          </p>
          {simb.tab.map((r, i) => (
            <Formula
              key={i}
              latex={`s^{${simb.grau - i}}:\\quad ${r[0]} > 0`}
              descricao={`Condicao s${simb.grau - i}`}
            />
          ))}
          {kCritGerais.length > 0 && (
            <>
              <p>
                <strong>Valores críticos de K</strong> (1ª coluna = 0):
              </p>
              {kCritGerais.map((k, i) => {
                let aux = "";
                if (grau >= 2) {
                  const t = montarTabelaRouth(den, num, k);
                  const rowS2 = t[grau - 2];
                  if (rowS2)
                    aux = ` \\Rightarrow ${rowS2[0].toFixed(4)}s^2 + ${(rowS2[1] ?? 0).toFixed(4)} = 0`;
                }
                const cruz = cruzs.find((c) => Math.abs(c.K - k) < 1e-3);
                return (
                  <Formula
                    key={i}
                    latex={`K = ${k.toFixed(4)}${aux}${cruz ? ` \\Rightarrow s = \\pm ${cruz.w.toFixed(4)}i` : ""}`}
                    descricao={`K critico ${k.toFixed(4)}`}
                  />
                );
              })}
            </>
          )}
        </>
      )}
      <hr />
      <p>
        <strong>Conferência (s = jω):</strong> separando Re e Im:
      </p>
      <Formula
        latex={`\\text{Re}_D(\\omega) = ${polinomioParaLatex(reD, "\\omega")}`}
        descricao="Re D"
      />
      <Formula
        latex={`\\text{Im}_D(\\omega) = ${polinomioParaLatex(imD, "\\omega")}`}
        descricao="Im D"
      />
      <Formula
        latex={`\\text{Re}_N(\\omega) = ${polinomioParaLatex(reN, "\\omega")}`}
        descricao="Re N"
      />
      <Formula
        latex={`\\text{Im}_N(\\omega) = ${polinomioParaLatex(imN, "\\omega")}`}
        descricao="Im N"
      />
      <p>Eliminando K:</p>
      <Formula
        latex={
          "\\text{Re}_D \\cdot \\text{Im}_N - \\text{Im}_D \\cdot \\text{Re}_N = 0"
        }
        descricao="Condicao"
      />
      <Formula
        latex={`${polinomioParaLatex(cross, "\\omega")} = 0`}
        descricao="Cross"
      />
      {cruzs.length ? (
        <>
          {cruzs.map((c, i) => {
            const imNv = avaliarPolinomioReal(imN, c.w);
            const imDv = avaliarPolinomioReal(imD, c.w);
            const reNv = avaliarPolinomioReal(reN, c.w);
            const reDv = avaliarPolinomioReal(reD, c.w);
            const usaIm = Math.abs(imNv) > 1e-12;
            return (
              <div key={i}>
                <Formula
                  latex={
                    usaIm
                      ? `\\omega = ${c.w.toFixed(4)} \\;\\;\\Rightarrow\\;\\; K = -\\frac{\\text{Im}_D(${c.w.toFixed(4)})}{\\text{Im}_N(${c.w.toFixed(4)})} = -\\frac{${imDv.toFixed(4)}}{${imNv.toFixed(4)}} = ${c.K.toFixed(4)}`
                      : `\\omega = ${c.w.toFixed(4)} \\;\\;\\Rightarrow\\;\\; K = -\\frac{\\text{Re}_D(${c.w.toFixed(4)})}{\\text{Re}_N(${c.w.toFixed(4)})} = -\\frac{${reDv.toFixed(4)}}{${reNv.toFixed(4)}} = ${c.K.toFixed(4)}`
                  }
                  descricao={`Cruzamento ${i + 1}`}
                />
                <Formula
                  latex={`\\therefore \\quad s = \\pm\\, ${c.w.toFixed(4)}\\,j, \\quad K = ${c.K.toFixed(4)}`}
                  descricao="s"
                />
              </div>
            );
          })}
        </>
      ) : (
        <p>
          <em>O LGR não cruza o eixo imaginário para K &gt; 0.</em>
        </p>
      )}
      <hr />
      <p>
        <strong>Gráfico e resumo:</strong>
      </p>
      <LgrPlot
        title="LGR - Cruzamento com eixo imaginário"
        descritoPor="desc-cruz"
        tema={tema}
        traces={traces}
      />
      <div className="mono" id="desc-cruz">
        {cruzs.length
          ? cruzs
              .map((c) => `ω=${c.w.toFixed(4)}, K=${c.K.toFixed(4)}`)
              .join("; ")
          : "sem cruzamento"}
      </div>
      {cruzs.length > 0 && (
        <p className="badge-ok">
          {cruzs.length === 1
            ? "Cruzamento com o eixo imaginário encontrado."
            : `${cruzs.length} cruzamentos com o eixo imaginário encontrados.`}
        </p>
      )}
      <DicaProva dica="monta D+K·N=0, tabela de Routh, zera b₁ (1ª coluna) para K crítico e usa a linha s² como polinômio auxiliar A(s)=0 para achar s=±jω." />
    </details>
  );
}
