import { useMemo } from "react";
import Formula, { polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";

export default function Passo01Equacao({
  num,
  den,
}: {
  num: number[];
  den: number[];
}) {
  const latexGH = useMemo(
    () =>
      `G(s)H(s) = K \\cdot \\frac{${polinomioParaLatex(num)}}{${polinomioParaLatex(den)}}`,
    [num, den],
  );
  const latexCaract = useMemo(
    () =>
      `1 + K \\cdot P(s) = 0 \\quad\\to\\quad ${polinomioParaLatex(den)} + K \\cdot (${polinomioParaLatex(num)}) = 0`,
    [num, den],
  );
  return (
    <details open>
      <summary>Passo 1, equação característica</summary>
      <Formula latex={latexGH} descricao="G H igual a K vezes N sobre D" />
      <Formula latex={latexCaract} descricao="Equação característica" />
      <DicaProva dica="multiplica G·H, separa o K do resto. O que sobra com K é N(s), o resto é D(s). A equação é sempre D(s) + K·N(s) = 0." />
    </details>
  );
}
