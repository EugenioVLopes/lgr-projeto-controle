import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula from "../Formula";
import DicaProva from "../DicaProva";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  polos: Complex[];
  zeros: Complex[];
  segs: Array<[number, number]>;
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

export default function Passo04Segmentos({
  polos,
  zeros,
  segs,
  tema,
  corPolo,
  corZero,
}: Props) {
  const listaSegs = useMemo(
    () =>
      segs.map(([a, b]) => {
        const ea = !Number.isFinite(a) ? "-\\infty" : a.toFixed(4);
        const eb = !Number.isFinite(b) ? "+\\infty" : b.toFixed(4);
        return {
          latex: `\\left[${ea}\\;,\\; ${eb}\\right]`,
          desc: !Number.isFinite(a)
            ? `de menos infinito até ${b.toFixed(4)}`
            : `de ${a.toFixed(4)} até ${b.toFixed(4)}`,
        };
      }),
    [segs],
  );
  const traces = useMemo<Trace[]>(() => {
    const xs = [...polos, ...zeros].map((p) => p.re);
    const baseMin = xs.length ? Math.min(...xs) : 0;
    const baseMax = xs.length ? Math.max(...xs) : 0;
    const xMin = baseMin - 3;
    const xMax = baseMax + 3;
    const segTraces: Trace[] = segs.map(([a, b], i) => {
      const aPlot = Number.isFinite(a) ? a : xMin;
      const bPlot = Number.isFinite(b) ? b : xMax;
      return {
        x: [aPlot, bPlot],
        y: [0, 0],
        mode: "lines",
        name: i === 0 ? "segmento LGR" : undefined,
        line: { width: 6 },
      };
    });
    return [
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { symbol: "x", size: 10, color: corPolo },
      },
      {
        x: zeros.map((z) => z.re),
        y: zeros.map((z) => z.im),
        mode: "markers",
        name: "zeros",
        marker: { symbol: "circle-open", size: 9, color: corZero },
      },
      ...segTraces,
    ];
  }, [polos, zeros, segs, corPolo, corZero]);
  return (
    <details open>
      <summary>Passo 4, segmentos eixo real</summary>
      <LgrPlot
        title="Segmentos do eixo real"
        descritoPor="desc-segs"
        tema={tema}
        traces={traces}
        foco={[...polos, ...zeros]}
      />
      <div className="mono" id="desc-segs">
        {segs.length
          ? segs
              .map(([a, b]) =>
                !Number.isFinite(a)
                  ? `(-inf, ${b.toFixed(2)}]`
                  : `[${a.toFixed(2)}, ${b.toFixed(2)}]`,
              )
              .join("; ")
          : "sem segmentos no eixo real"}
      </div>
      <p>
        <strong>1) Regra:</strong> pertencem ao LGR os segmentos do eixo real à
        esquerda de um número ímpar de polos e zeros reais.
      </p>
      {segs.length ? (
        <>
          <p>
            <strong>2) Segmentos encontrados:</strong>
          </p>
          {listaSegs.map((s, i) => (
            <Formula
              key={i}
              latex={s.latex}
              descricao={`Segmento ${i + 1}: ${s.desc}`}
            />
          ))}
        </>
      ) : (
        <p>
          <em>Nenhum segmento no eixo real pertence ao LGR.</em>
        </p>
      )}
      <DicaProva dica="O LGR se situa à esquerda de um número ímpar de pólos e zeros: marca polos (x) e zeros (o) no eixo real e conta quantos há à direita do trecho." />
    </details>
  );
}
