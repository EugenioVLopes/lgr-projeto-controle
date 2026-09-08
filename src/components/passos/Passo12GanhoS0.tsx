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
  return (
    <details open>
      <summary>Passo 12, cálculo de K</summary>
      <p>
        <strong>Fórmula do critério de módulo:</strong>
      </p>
      <Formula
        latex={"K = \\frac{\\prod_{i} |s_0 - p_i|}{\\prod_{j} |s_0 - z_j|}"}
        descricao="Formula do modulo"
      />
      <Formula
        latex={`s_0 = ${complexoParaLatex(s0)}`}
        descricao={`Ponto ${formatarComplexo(s0)}`}
      />
      <hr />
      <p>
        <strong>Distâncias dos polos:</strong>
      </p>
      {polos.map((p, i) => {
        const dx = s0.re - p.re;
        const dy = s0.im - p.im;
        const d = Math.hypot(dx, dy);
        const v = { re: dx, im: dy };
        return (
          <Formula
            key={i}
            latex={`|s_0 - p_{${i + 1}}| = |${complexoParaLatex(s0)} - (${complexoParaLatex(p)})| = |${complexoParaLatex(v)}| = ${d.toFixed(4)}`}
            descricao={`Distancia polo ${i + 1}: ${d.toFixed(4)}`}
          />
        );
      })}
      <p>Produto das distâncias dos polos:</p>
      <Formula
        latex={`\\prod |s_0 - p_i| = ${det.distPolos.map((d) => d.toFixed(4)).join(" \\cdot ")} = ${prodP.toFixed(4)}`}
        descricao="Produto polos"
      />
      <hr />
      {zeros.length ? (
        <>
          <p>
            <strong>Distâncias dos zeros:</strong>
          </p>
          {zeros.map((z, i) => {
            const dx = s0.re - z.re;
            const dy = s0.im - z.im;
            const d = Math.hypot(dx, dy);
            const v = { re: dx, im: dy };
            return (
              <Formula
                key={i}
                latex={`|s_0 - z_{${i + 1}}| = |${complexoParaLatex(s0)} - (${complexoParaLatex(z)})| = |${complexoParaLatex(v)}| = ${d.toFixed(4)}`}
                descricao={`Distancia zero ${i + 1}: ${d.toFixed(4)}`}
              />
            );
          })}
          <p>Produto das distâncias dos zeros:</p>
          <Formula
            latex={`\\prod |s_0 - z_j| = ${det.distZeros.map((d) => d.toFixed(4)).join(" \\cdot ")} = ${prodZ.toFixed(4)}`}
            descricao="Produto zeros"
          />
        </>
      ) : (
        <Formula
          latex={"\\prod |s_0 - z_j| = 1"}
          descricao="Sem zeros, produto 1"
        />
      )}
      <hr />
      <p>
        <strong>Resultado:</strong>
      </p>
      {prodZ > 1e-12 ? (
        <>
          <Formula
            latex={`K = \\frac{${prodP.toFixed(4)}}{${prodZ.toFixed(4)}} = ${(prodP / prodZ).toFixed(4)}`}
            descricao={`K igual a ${(prodP / prodZ).toFixed(4)}`}
          />
          {Number.isFinite(K) ? (
            <p className={pertence ? "badge-ok" : "badge-warn"}>
              K = {K.toFixed(6)}
            </p>
          ) : null}
        </>
      ) : (
        <p className="badge-warn">
          Não é possível calcular K: o ponto coincide com um zero.
        </p>
      )}
      <DicaProva dica="K = produto das distâncias de s0 aos polos dividido pelo produto das distâncias aos zeros. Distância = hypot(Re(s0−p), Im(s0−p)). Se s0 está em cima de um zero, K=0; se não há zeros, divide por 1." />
    </details>
  );
}
