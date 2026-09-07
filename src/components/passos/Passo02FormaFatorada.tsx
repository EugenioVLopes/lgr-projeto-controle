import { useMemo } from "react";
import Formula, { polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";

export default function Passo02FormaFatorada({
  num,
  den,
}: {
  num: number[];
  den: number[];
}) {
  const latex = useMemo(
    () =>
      `P(s) = \\frac{N(s)}{D(s)} = \\frac{${polinomioParaLatex(num)}}{${polinomioParaLatex(den)}}`,
    [num, den],
  );
  return (
    <details>
      <summary>Passo 2, forma fatorada</summary>
      <Formula latex={latex} descricao="P igual a N sobre D" />
      <DicaProva dica="fatora N(s)=0 para achar zeros, D(s)=0 para achar polos. Grau de D é np, grau de N é nz." />
    </details>
  );
}
