import { useMemo } from "react";
import Formula, { complexoParaLatex, polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import { equacaoDerivadaBreakaway } from "../../lib/lgr/index";
import type { BreakPoint } from "../../lib/lgr/index";

export default function Passo08Breakaway({
  num,
  den,
  bk,
}: {
  num: number[];
  den: number[];
  bk: BreakPoint[];
}) {
  const det = useMemo(() => equacaoDerivadaBreakaway(num, den), [num, den]);
  const latexND = useMemo(
    () =>
      `N(s) = ${polinomioParaLatex(num)},\\quad D(s) = ${polinomioParaLatex(den)}`,
    [num, den],
  );
  const latexDeriv = useMemo(
    () =>
      `N'(s) = ${polinomioParaLatex(det.dNum)},\\quad D'(s) = ${polinomioParaLatex(det.dDen)}`,
    [det],
  );
  const latexEq = useMemo(
    () => `N \\cdot D' - D \\cdot N' = ${polinomioParaLatex(det.eq)} = 0`,
    [det],
  );
  const latexBk = useMemo(
    () =>
      bk
        .map((b) => `s = ${complexoParaLatex(b.s)},\\; K = ${b.K.toFixed(4)}`)
        .join(",\\quad "),
    [bk],
  );
  return (
    <details>
      <summary>Passo 8, breakaway/break-in (dK/ds=0)</summary>
      <div className="memoria">
        <Formula
          latex={latexND}
          descricao="Numerador e denominador da malha aberta"
        />
        <Formula latex={latexDeriv} descricao="Derivadas de N e D" />
        <Formula latex={latexEq} descricao="Equação dK/ds igual a zero" />
      </div>
      {bk.length ? (
        <Formula latex={latexBk} descricao="Pontos de breakaway com ganho K" />
      ) : (
        <p>nenhum ponto válido com K&gt;0 no LGR</p>
      )}
      <DicaProva dica="K = -D(s)/N(s). Deriva dK/ds = 0 → resolve N·D' - D·N' = 0. Só vale raiz real em trecho do LGR (passo 4) com K > 0. Calcula K = -D(s)/N(s) em cada candidata e descarta K negativo." />
    </details>
  );
}
