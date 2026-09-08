import { useMemo } from "react";
import Formula from "../Formula";
import DicaProva from "../DicaProva";
import { detalharGanhoS0 } from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

export default function Passo12GanhoS0({
  s0,
  K,
  polos,
  zeros,
}: {
  s0: Complex;
  K: number;
  polos: Complex[];
  zeros: Complex[];
}) {
  const memoria = useMemo(() => {
    const det = detalharGanhoS0(s0, zeros, polos);
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
    return `${lp} = ${pp.toFixed(4)}\n${lz} = ${pz.toFixed(4)}\nK = ${pp.toFixed(4)} / ${pz.toFixed(4)} = ${Number.isFinite(K) ? K.toFixed(6) : "∞"}`;
  }, [s0, zeros, polos, K]);
  const latex = useMemo(
    () =>
      `K = \\frac{\\prod|s_0-p_i|}{\\prod|s_0-z_i|} = ${Number.isFinite(K) ? K.toFixed(6) : "\\infty"}`,
    [K],
  );
  const desc = useMemo(
    () => `Ganho K igual a ${Number.isFinite(K) ? K.toFixed(6) : "infinito"}`,
    [K],
  );
  return (
    <details open>
      <summary>Passo 12, K em s0</summary>
      <div className="memoria">
        <div className="mono">{memoria}</div>
      </div>
      <Formula latex={latex} descricao={desc} />
      <DicaProva dica="K = produto das distâncias de s0 aos polos dividido pelo produto das distâncias aos zeros. Distância = hypot(Re(s0−p), Im(s0−p)). Se s0 está em cima de um zero, K=0; se não há zeros, divide por 1." />
    </details>
  );
}
