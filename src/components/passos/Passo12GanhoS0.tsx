import { useMemo } from "react";
import Formula, { complexoParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import { detalharGanhoS0, formatarComplexo } from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  s0: Complex;
  K: number;
  polos: Complex[];
  zeros: Complex[];
}

export default function Passo12GanhoS0({ s0, K, polos, zeros }: Props) {
  const det = useMemo(
    () => detalharGanhoS0(s0, zeros, polos),
    [s0, zeros, polos],
  );
  const prodP = useMemo(() => det.distPolos.reduce((a, d) => a * d, 1), [det]);
  const prodZ = useMemo(
    () => (det.distZeros.length ? det.distZeros.reduce((a, d) => a * d, 1) : 1),
    [det],
  );
  const pertence = useMemo(() => {
    if (!Number.isFinite(K)) return false;
    return true;
  }, [K]);
  const prodA = prodP;
  const prodB = prodZ;
  const kCalc = prodB > 1e-12 ? prodA / prodB : Infinity;
  return (
    <details open>
      <summary>Passo 12, valor de K na raiz s0={formatarComplexo(s0)}</summary>
      <p>
        <strong>Condição de módulo:</strong>
      </p>
      <Formula
        latex={
          "|KP(s)|_{s=s_i} = 1 \\Rightarrow K_i = \\frac{\\prod_{j=1}^{n_p}|(s+p_j)|}{\\prod_{k=1}^{n_z}|(s+z_k)|}|_{s=s_i}"
        }
        descricao="Formula do modulo do professor"
      />
      <Formula
        latex={`s_i = ${complexoParaLatex(s0)}`}
        descricao={`Ponto si ${formatarComplexo(s0)}`}
      />
      <hr />
      <p>
        <strong>Distâncias aos polos (A):</strong>
      </p>
      {polos.map((p, i) => {
        const dx = s0.re - p.re;
        const dy = s0.im - p.im;
        const d = Math.hypot(dx, dy);
        return (
          <Formula
            key={i}
            latex={`A_{${i + 1}} = \\sqrt{${Math.abs(dy).toFixed(2)}^{2} + ${Math.abs(dx).toFixed(2)}^{2}} = ${d.toFixed(2)}`}
            descricao={`A ${i + 1}: ${d.toFixed(2)}`}
          />
        );
      })}
      <hr />
      {zeros.length ? (
        <>
          <p>
            <strong>Distâncias aos zeros (B):</strong>
          </p>
          {zeros.map((z, i) => {
            const dx = s0.re - z.re;
            const dy = s0.im - z.im;
            const d = Math.hypot(dx, dy);
            return (
              <Formula
                key={i}
                latex={`B_{${i + 1}} = \\sqrt{${Math.abs(dy).toFixed(2)}^{2} + ${Math.abs(dx).toFixed(2)}^{2}} = ${d.toFixed(2)}`}
                descricao={`B ${i + 1}: ${d.toFixed(2)}`}
              />
            );
          })}
        </>
      ) : (
        <Formula latex={"\\prod B = 1"} descricao="Sem zeros, produto 1" />
      )}
      <hr />
      <p>
        <strong>Resultado:</strong>
      </p>
      {prodB > 1e-12 ? (
        <>
          <Formula
            latex={
              zeros.length
                ? `K = \\frac{${det.distPolos.map((_, i) => `A_{${i + 1}}`).join("")} }{${det.distZeros.map((_, i) => `B_{${i + 1}}`).join("")} } = \\frac{${prodA.toFixed(2)}}{${prodB.toFixed(2)}} = ${kCalc.toFixed(2)}`
                : `K = ${prodA.toFixed(2)}`
            }
            descricao={`K igual a ${kCalc.toFixed(2)}`}
          />
          {Number.isFinite(K) ? (
            <p className={pertence ? "badge-ok" : "badge-warn"}>
              K = {K.toFixed(2)} (K = {K.toFixed(6)})
            </p>
          ) : null}
        </>
      ) : (
        <p className="badge-warn">
          Não é possível calcular K: o ponto coincide com um zero.
        </p>
      )}
      <DicaProva dica="como o professor: Aᵢ=√(Im²+ΔRe²) até cada polo, Bⱼ até cada zero, K=A₁A₂…/B₁B₂…. Se não há zeros, divide por 1." />
    </details>
  );
}
