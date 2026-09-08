import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula, { complexoParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import {
  detalharAnguloS0,
  formatarComplexo,
  subtrairComplexos,
} from "../../lib/lgr/index";
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
  const norm360 = ((t.norm % 360) + 360) % 360;
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
        <strong>Condição de pertinência ao LGR:</strong>
      </p>
      <Formula
        latex={
          "\\sum \\angle(s_0 - z_j) - \\sum \\angle(s_0 - p_i) = \\pm 180^{\\circ} (2q+1)"
        }
        descricao="Condicao de angulo"
      />
      <Formula
        latex={`s_0 = ${complexoParaLatex(s0)}`}
        descricao={`Ponto s0 ${formatarComplexo(s0)}`}
      />
      <hr />
      <p>
        <strong>Ângulos dos polos (θ):</strong>
      </p>
      {det.parcelasPolos.map((x, i) => {
        const p = polos[i];
        const v = subtrairComplexos(s0, p);
        return (
          <Formula
            key={i}
            latex={`\\theta_{${i + 1}} = \\angle(s_0 - p_{${i + 1}}) = \\angle(${complexoParaLatex(s0)} - (${complexoParaLatex(p)})) = \\angle(${complexoParaLatex(v)}) = ${x.ang.toFixed(2)}^{\\circ}`}
            descricao={`Theta ${i + 1}: ${x.ang.toFixed(2)} graus`}
          />
        );
      })}
      <Formula
        latex={`\\sum \\theta_i = ${somaP.toFixed(2)}^{\\circ}`}
        descricao="Soma thetas"
      />
      <hr />
      {zeros.length ? (
        <>
          <p>
            <strong>Ângulos dos zeros (φ):</strong>
          </p>
          {det.parcelasZeros.map((x, i) => {
            const z = zeros[i];
            const v = subtrairComplexos(s0, z);
            return (
              <Formula
                key={i}
                latex={`\\phi_{${i + 1}} = \\angle(s_0 - z_{${i + 1}}) = \\angle(${complexoParaLatex(s0)} - (${complexoParaLatex(z)})) = \\angle(${complexoParaLatex(v)}) = ${x.ang.toFixed(2)}^{\\circ}`}
                descricao={`Phi ${i + 1}: ${x.ang.toFixed(2)} graus`}
              />
            );
          })}
          <Formula
            latex={`\\sum \\phi_j = ${somaZ.toFixed(2)}^{\\circ}`}
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
        latex={`\\Delta\\theta = \\sum \\theta_i - \\sum \\phi_j = ${somaP.toFixed(2)}^{\\circ} - ${somaZ.toFixed(2)}^{\\circ} = ${delta.toFixed(2)}^{\\circ}`}
        descricao="Delta theta"
      />
      <Formula
        latex={`\\text{Ângulo normalizado: } ${norm360.toFixed(2)}^{\\circ}`}
        descricao="Normalizado"
      />
      <p className={t.pertence ? "badge-ok" : "badge-warn"}>
        {t.pertence
          ? `O ponto pertence ao LGR (Δθ = ${norm360.toFixed(2)}° ≈ 180°)`
          : `O ponto não pertence ao LGR (Δθ = ${norm360.toFixed(2)}° ≠ 180°)`}
      </p>
      <LgrPlot
        title="Critério de Ângulo"
        descritoPor="desc-s0"
        tema={tema}
        traces={traces}
      />
      <div className="mono" id="desc-s0">
        s0={formatarComplexo(s0)}, ângulo {t.norm.toFixed(2)}°
      </div>
      <DicaProva dica="para cada polo/zero calcula o vetor s0−p (diferença real e imag) e o ângulo com arctan2(Im,Re). Soma zeros menos soma polos. Normaliza para ±180°. Se der ±180° (±5°) pertence ao LGR." />
    </details>
  );
}
