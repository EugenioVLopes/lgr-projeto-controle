import { useMemo } from "react";
import Formula from "../Formula";
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
  const latex = useMemo(() => {
    if (!segs.length) return "";
    const partes = segs.map(([a, b]) =>
      a === -Infinity
        ? `(-\\infty, ${b.toFixed(4)}]`
        : `[${a.toFixed(4)}, ${b.toFixed(4)}]`,
    );
    return `S = ${partes.join(" \\cup ")}`;
  }, [segs]);
  const descricao = useMemo(() => {
    if (!segs.length) return "";
    const partes = segs.map(([a, b]) =>
      a === -Infinity
        ? `de menos infinito até ${b.toFixed(4)}`
        : `de ${a.toFixed(4)} até ${b.toFixed(4)}`,
    );
    return `Segmentos do LGR sobre o eixo real: ${partes.join("; ")}`;
  }, [segs]);
  const memoria = useMemo(() => {
    const reais = [
      ...polos.filter((p) => ehNumeroReal(p)),
      ...zeros.filter((z) => ehNumeroReal(z)),
    ]
      .map((z) => z.re)
      .sort((a, b) => b - a);
    if (!reais.length) return "sem polos/zeros reais";
    return `reais ordenados: ${reais.map((r) => r.toFixed(4)).join(", ")} → O LGR se situa à esquerda de um número ímpar de pólos e zeros (conta à direita: ímpar = pertence)`;
  }, [polos, zeros]);
  return (
    <details open>
      <summary>Passo 4, segmentos eixo real</summary>
      {!segs.length ? (
        <p>nenhum segmento do LGR sobre o eixo real.</p>
      ) : (
        <Formula latex={latex} descricao={descricao} />
      )}
      <div className="memoria">
        <div className="mono">{memoria}</div>
      </div>
      <DicaProva dica="O LGR se situa à esquerda de um número ímpar de pólos e zeros: marca polos (x) e zeros (o) no eixo real e conta quantos há à direita do trecho." />
    </details>
  );
}
