import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula, { complexoParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import { formatarComplexo } from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  polos: Complex[];
  zeros: Complex[];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

export default function Passo03PolosZeros({
  polos,
  zeros,
  tema,
  corPolo,
  corZero,
}: Props) {
  const listaPolos = useMemo(
    () =>
      polos.map((p, i) => ({
        latex: `p_{${i + 1}} = ${complexoParaLatex(p)}`,
        desc: `Polo ${i + 1}: ${formatarComplexo(p)}`,
      })),
    [polos],
  );
  const listaZeros = useMemo(
    () =>
      zeros.map((z, i) => ({
        latex: `z_{${i + 1}} = ${complexoParaLatex(z)}`,
        desc: `Zero ${i + 1}: ${formatarComplexo(z)}`,
      })),
    [zeros],
  );
  const traces = useMemo<Trace[]>(
    () => [
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { symbol: "x", size: 11, color: corPolo },
      },
      {
        x: zeros.map((z) => z.re),
        y: zeros.map((z) => z.im),
        mode: "markers",
        name: "zeros",
        marker: { symbol: "circle-open", size: 10, color: corZero },
      },
    ],
    [polos, zeros, corPolo, corZero],
  );
  return (
    <details open>
      <summary>
        Passo 3, polos e zeros ({polos.length}p / {zeros.length}z)
      </summary>
      <LgrPlot
        title="Polos (x) e zeros (o)"
        descritoPor="desc-polos"
        tema={tema}
        traces={traces}
      />
      <p>
        <strong>Polos</strong> (n_p = {polos.length})
      </p>
      {listaPolos.map((p, i) => (
        <Formula
          key={i}
          id={i === 0 ? "desc-polos" : undefined}
          latex={p.latex}
          descricao={p.desc}
        />
      ))}
      <p>
        <strong>Zeros</strong> (n_z = {zeros.length})
      </p>
      {zeros.length ? (
        listaZeros.map((z, i) => (
          <Formula key={i} latex={z.latex} descricao={z.desc} />
        ))
      ) : (
        <p>
          <em>Nenhum zero finito</em>
        </p>
      )}
      <DicaProva dica="polos são onde o denominador zera (K=0 começa aqui), zeros onde o numerador zera (K→∞ termina aqui). Marca x e o no plano." />
    </details>
  );
}
