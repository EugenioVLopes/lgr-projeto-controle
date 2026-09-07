import { useMemo } from "react";
import Formula, { complexoParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import {
  detalharPartida,
  ehNumeroReal,
  formatarComplexo,
} from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  partidas: Array<{ p: Complex; ang: number }>;
  polos: Complex[];
  zeros: Complex[];
}

export default function Passo10Partida({ partidas, polos, zeros }: Props) {
  const latex = useMemo(() => {
    if (!partidas.length) return "";
    return partidas
      .map(
        (p) =>
          `p = ${complexoParaLatex(p.p)},\\; \\theta_d = ${p.ang.toFixed(2)}^{\\circ}`,
      )
      .join(",\\quad ");
  }, [partidas]);
  const memoria = useMemo(() => {
    if (!partidas.length) return "";
    return partidas
      .map(({ p, ang }) => {
        const det = detalharPartida(p, polos, zeros);
        const sp =
          det.parcelasPolos
            .map((x) => `${x.ang.toFixed(1)}°(${x.origem})`)
            .join(" + ") || "0";
        const sz =
          det.parcelasZeros
            .map((x) => `${x.ang.toFixed(1)}°(${x.origem})`)
            .join(" + ") || "0";
        return `p=${formatarComplexo(p)}: θ=180−(∑polos ${sp})+(∑zeros ${sz})=${ang.toFixed(2)}°`;
      })
      .join("\n");
  }, [partidas, polos, zeros]);
  const numComplexos = useMemo(
    () => polos.filter((p) => !ehNumeroReal(p)).length,
    [polos],
  );
  return (
    <details>
      <summary>Passo 10, ângulos partida/chegada</summary>
      {partidas.length ? (
        <Formula
          latex={latex}
          descricao="Ângulos de partida dos polos complexos"
        />
      ) : null}
      {partidas.length ? (
        <div className="memoria">
          <p className="memoria-titulo">Como cheguei aqui</p>
          <div className="mono">{memoria}</div>
        </div>
      ) : null}
      <DicaProva dica="no polo complexo, soma os ângulos até os outros polos, soma até os zeros, faz 180 − somaPolos + somaZeros. Esse é o ângulo que o ramo sai do polo." />
      {partidas.length ? null : (
        <p>sem polos complexos, não se aplica ({numComplexos} complexos)</p>
      )}
    </details>
  );
}
