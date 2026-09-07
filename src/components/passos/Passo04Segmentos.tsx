import { useMemo } from "react";
import DicaProva from "../DicaProva";
import { ehNumeroReal } from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

export default function Passo04Segmentos({
  polos,
  zeros,
  segs,
}: {
  polos: Complex[];
  zeros: Complex[];
  segs: Array<[number, number]>;
}) {
  const textoSegs = useMemo(() => {
    if (!segs.length) return "nenhum segmento";
    return segs
      .map(
        ([a, b]) =>
          `[${a === -Infinity ? "-∞" : a.toFixed(4)}, ${b.toFixed(4)}]`,
      )
      .join("  ");
  }, [segs]);
  const memoria = useMemo(() => {
    const reais = [
      ...polos.filter((p) => ehNumeroReal(p)),
      ...zeros.filter((z) => ehNumeroReal(z)),
    ]
      .map((z) => z.re)
      .sort((a, b) => b - a);
    if (!reais.length) return "sem polos/zeros reais";
    return `reais ordenados: ${reais.map((r) => r.toFixed(4)).join(", ")} → testa ponto médio de cada intervalo e conta polos+zeros à direita (ímpar = pertence)`;
  }, [polos, zeros]);
  return (
    <details>
      <summary>Passo 4, segmentos eixo real</summary>
      <div className="mono">{textoSegs}</div>
      <div className="memoria">
        <p className="memoria-titulo">Como cheguei aqui</p>
        <div className="mono">{memoria}</div>
      </div>
      <DicaProva dica="marca polos (x) e zeros (o) no eixo real, da direita para a esquerda conta quantos tem à direita do trecho. Ímpar = o trecho é LGR. Não precisa de conta, só contar." />
    </details>
  );
}
