import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula, { anguloParcelaParaLatex, complexoParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import { detalharAnguloS0, formatarComplexo } from "../../lib/lgr/index";
import type { Complex, TesteAngulo } from "../../lib/lgr/index";

interface Props {
  s0: Complex;
  t: TesteAngulo;
  polos: Complex[];
  zeros: Complex[];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

function latexAnguloATAN(
  simbolo: string,
  indice: number,
  vetorRe: number,
  vetorIm: number,
  ang: number,
): string {
  return anguloParcelaParaLatex(simbolo, indice, vetorRe, vetorIm, ang);
}

export default function Passo11AnguloS0({
  s0,
  t,
  polos,
  zeros,
  tema,
  corPolo,
  corZero,
}: Props) {
  const det = useMemo(
    () => detalharAnguloS0(s0, zeros, polos),
    [s0, zeros, polos],
  );
  const somaP = useMemo(
    () => det.parcelasPolos.reduce((a, x) => a + x.ang, 0),
    [det],
  );
  const somaZ = useMemo(
    () => det.parcelasZeros.reduce((a, x) => a + x.ang, 0),
    [det],
  );
  const delta = somaP - somaZ;
  const traces = useMemo<Trace[]>(() => {
    const base: Trace[] = [
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { color: corPolo, symbol: "x", size: 10 },
      },
      {
        x: zeros.map((z) => z.re),
        y: zeros.map((z) => z.im),
        mode: "markers",
        name: "zeros",
        marker: { color: corZero, symbol: "circle-open", size: 9 },
      },
      {
        x: [s0.re],
        y: [s0.im],
        mode: "markers",
        name: `s0 (${t.pertence ? "pertence" : "não pertence"})`,
        marker: {
          color: t.pertence ? corZero : corPolo,
          size: 13,
          symbol: "star",
        },
      },
    ];
    polos.forEach((p, i) => {
      base.push({
        x: [p.re, s0.re],
        y: [p.im, s0.im],
        mode: "lines",
        name: i === 0 ? "vetores polos" : undefined,
        line: { dash: "dot" },
      });
    });
    zeros.forEach((z, i) => {
      base.push({
        x: [z.re, s0.re],
        y: [z.im, s0.im],
        mode: "lines",
        name: i === 0 ? "vetores zeros" : undefined,
        line: { dash: "dot" },
      });
    });
    return base;
  }, [polos, zeros, s0, t.pertence, corPolo, corZero]);
  return (
    <details open>
      <summary>
        Passo 11, critério do ângulo em s0={formatarComplexo(s0)}
      </summary>
      <p>
        <strong>Critério do ângulo de fase:</strong>
      </p>
      <Formula
        latex={
          "\\angle P(s)|_{s=s_i} = \\left(\\sum_{n_p} \\theta_i - \\sum_{n_z} \\phi_j\\right)|_{s=s_i} \\Rightarrow \\angle P(s)|_{s=s_i} = 180^{\\circ} \\pm q360^{\\circ}"
        }
        descricao="Condicao de angulo"
      />
      <Formula
        latex={`s_i = ${complexoParaLatex(s0)}`}
        descricao={`Ponto si ${formatarComplexo(s0)}`}
      />
      <hr />
      <p>
        <strong>Ângulos dos polos (θ):</strong>
      </p>
      {det.parcelasPolos.map((x, i) => (
        <Formula
          key={i}
          latex={latexAnguloATAN("\\theta", i + 1, x.vetorRe, x.vetorIm, x.ang)}
          descricao={`Theta ${i + 1}: ${x.ang.toFixed(2)} graus`}
        />
      ))}
      <Formula
        latex={`\\sum \\theta = ${somaP.toFixed(2)}^{\\circ}`}
        descricao="Soma thetas"
      />
      <hr />
      {zeros.length ? (
        <>
          <p>
            <strong>Ângulos dos zeros (φ):</strong>
          </p>
          {det.parcelasZeros.map((x, i) => (
            <Formula
              key={i}
              latex={latexAnguloATAN(
                "\\phi",
                i + 1,
                x.vetorRe,
                x.vetorIm,
                x.ang,
              )}
              descricao={`Phi ${i + 1}: ${x.ang.toFixed(2)} graus`}
            />
          ))}
          <Formula
            latex={`\\sum \\phi = ${somaZ.toFixed(2)}^{\\circ}`}
            descricao="Soma phis"
          />
        </>
      ) : (
        <Formula latex={"\\sum \\phi_j = 0^{\\circ}"} descricao="Sem zeros" />
      )}
      <hr />
      <p>
        <strong>Avaliação:</strong>
      </p>
      <Formula
        latex={`\\left(\\sum \\theta_i - \\sum \\phi_j\\right)|_{s=s_i} = ${somaP.toFixed(2)}^{\\circ} - ${somaZ.toFixed(2)}^{\\circ} = ${delta.toFixed(2)}^{\\circ} \\cong 180^{\\circ}`}
        descricao="Diferenca soma theta menos soma phi"
      />
      <p className={t.pertence ? "badge-ok" : "badge-warn"}>
        {t.pertence
          ? `O ponto pertence ao LGR ((Σθ−Σφ) = ${delta.toFixed(2)}° ≅ 180°)`
          : `O ponto não pertence ao LGR ((Σθ−Σφ) = ${delta.toFixed(2)}° ≠ 180°)`}
      </p>
      <LgrPlot
        title="Critério de Ângulo"
        descritoPor="desc-s0"
        tema={tema}
        traces={traces}
        foco={[...polos, ...zeros, s0]}
      />
      <div className="mono" id="desc-s0">
        s0={formatarComplexo(s0)}, ângulo {t.norm.toFixed(2)}°
      </div>
      <DicaProva dica="θᵢ=ATAN(|Im|/|ΔRe|) do vetor sᵢ−p (se ΔRe<0, faz 180°−ATAN). Soma Σθ dos polos e Σφ dos zeros. Se (Σθ−Σφ)≅180° o ponto pertence ao LGR." />
    </details>
  );
}
