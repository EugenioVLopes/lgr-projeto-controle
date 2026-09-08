import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula, { polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import {
  avaliarPolinomioReal,
  montarTabelaRouthSimbolica,
} from "../../lib/lgr/index";
import type { Complex, Cruzamento } from "../../lib/lgr/index";

interface Props {
  info: Record<string, number[]>;
  cruzs: Cruzamento[];
  routh0: number[][];
  den: number[];
  num: number[];
  polos: Complex[];
  zeros: Complex[];
  ramos: Complex[][];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

export default function Passo09Cruzamento({
  info,
  cruzs,
  routh0,
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
  const latexSimb = useMemo(() => {
    const linhas = simb.tab.map(
      (r, i) => `s^{${simb.grau - i}} & ${r.join(" & ")}`,
    );
    return `\\begin{array}{c|${"c".repeat(simb.cols)}} \\hline ${linhas.join(" \\\\ ")} \\\\ \\hline \\end{array}`;
  }, [simb]);
  const latexRouthNum = useMemo(() => {
    if (!routh0.length) return "";
    const grau = routh0.length - 1;
    const cols = Math.max(...routh0.map((r) => r.length));
    const linhas = routh0.map((r, i) => {
      const cels = r.map((v) => v.toFixed(3));
      while (cels.length < cols) cels.push("");
      return `s^{${grau - i}} & ${cels.join(" & ")}`;
    });
    return `\\begin{array}{c|${"c".repeat(cols)}} \\hline ${linhas.join(" \\\\ ")} \\\\ \\hline \\end{array}`;
  }, [routh0]);
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
        <strong>Tabela de Routh-Hurwitz:</strong>
      </p>
      <p>A partir da equação característica D(s) + K ⋅ N(s) = 0:</p>
      <Formula
        display
        latex={latexSimb}
        descricao="Tabela de Routh simbolica com K"
      />
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
      {cruzs.length > 0 && (
        <>
          <p>
            <strong>Valores críticos de K</strong> (onde a primeira coluna se
            anula):
          </p>
          {[...new Set(cruzs.map((c) => c.K.toFixed(4)))].map((k, i) => (
            <Formula
              key={i}
              latex={`K_{\\text{crit}} = ${k}`}
              descricao={`K critico ${k}`}
            />
          ))}
        </>
      )}
      <p className="mono">
        Referência numérica (K=1): primeira coluna{" "}
        {routh0.map((r) => r[0].toFixed(3)).join(", ")}
      </p>
      {latexRouthNum && (
        <Formula display latex={latexRouthNum} descricao="Routh numerico K=1" />
      )}
      <hr />
      <p>
        <strong>Método alternativo:</strong> substituindo s = jω e separando
        partes real e imaginária:
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
          <p>
            <strong>Soluções válidas</strong> (ω &gt; 0, K &gt; 0):
          </p>
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
      <DicaProva dica="monta D+K·N=0, separa Re e Im com s=jω. Resolve cross(ω)=0, pega ω>0. Acha K. No Routh, zera a primeira coluna para K crítico." />
    </details>
  );
}
