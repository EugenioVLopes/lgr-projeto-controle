import { useMemo } from "react";
import LgrPlot from "../LgrPlot";
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
  const latexPolos = useMemo(
    () =>
      polos
        .map((p, i) => `p_{${i + 1}} = ${complexoParaLatex(p)}`)
        .join(",\\quad "),
    [polos],
  );
  const descPolos = useMemo(
    () => `Polos: ${polos.map(formatarComplexo).join("; ")}`,
    [polos],
  );
  const latexZeros = useMemo(
    () =>
      zeros
        .map((z, i) => `z_{${i + 1}} = ${complexoParaLatex(z)}`)
        .join(",\\quad "),
    [zeros],
  );
  const descZeros = useMemo(
    () => `Zeros: ${zeros.map(formatarComplexo).join("; ")}`,
    [zeros],
  );
  const traces = useMemo(
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
      <Formula id="desc-polos" latex={latexPolos} descricao={descPolos} />
      {zeros.length ? (
        <Formula latex={latexZeros} descricao={descZeros} />
      ) : (
        <p>nenhum finito</p>
      )}
      <DicaProva dica="polos são onde o denominador zera (K=0 começa aqui), zeros onde o numerador zera (K→∞ termina aqui). Marca x e o no plano." />
    </details>
  );
}
