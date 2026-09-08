import { useMemo } from "react";
import Formula, { polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";

export default function Passo01Equacao({
  numeradorG,
  denominadorG,
  numeradorH,
  denominadorH,
  num,
  den,
}: {
  numeradorG: number[];
  denominadorG: number[];
  numeradorH: number[];
  denominadorH: number[];
  num: number[];
  den: number[];
}) {
  const latexG = useMemo(
    () =>
      `G(s) = K \\cdot \\frac{${polinomioParaLatex(numeradorG)}}{${polinomioParaLatex(denominadorG)}}`,
    [numeradorG, denominadorG],
  );
  const latexH = useMemo(
    () =>
      `H(s) = \\frac{${polinomioParaLatex(numeradorH)}}{${polinomioParaLatex(denominadorH)}}`,
    [numeradorH, denominadorH],
  );
  const latexGH = useMemo(
    () =>
      `G(s)H(s) = K \\cdot \\frac{${polinomioParaLatex(num)}}{${polinomioParaLatex(den)}} = K \\cdot P(s)`,
    [num, den],
  );
  const latexCaract = useMemo(
    () =>
      `1 + G(s)H(s) = 0 \\quad\\to\\quad 1 + K \\cdot \\frac{${polinomioParaLatex(num)}}{${polinomioParaLatex(den)}} = 0`,
    [num, den],
  );
  const latexCaractFinal = useMemo(
    () =>
      `${polinomioParaLatex(den)} + K \\cdot (${polinomioParaLatex(num)}) = 0`,
    [num, den],
  );
  const latexP = useMemo(
    () =>
      `P(s) = \\frac{${polinomioParaLatex(num)}}{${polinomioParaLatex(den)}}`,
    [num, den],
  );
  return (
    <details open>
      <summary>Passo 1, equação característica</summary>
      <Formula
        latex={latexG}
        descricao="G(s) igual a K vezes numerador sobre denominador"
      />
      <Formula
        latex={latexH}
        descricao="H(s) igual numerador sobre denominador"
      />
      <hr />
      <p>Função de transferência de malha aberta:</p>
      <Formula latex={latexGH} descricao="G(s)H(s) multiplicação de G com H" />
      <p>Equação característica:</p>
      <Formula
        latex={latexCaract}
        descricao="Equação característica antes de multiplicar"
      />
      <Formula
        latex={latexCaractFinal}
        descricao="Equação característica final"
      />
      <Formula
        latex={latexP}
        descricao="P(s) igual numerador sobre denominador, sem o K"
      />
      <DicaProva dica="K é o ganho variável do LGR. P(s) é a função de transferência sem o K, ou seja, N(s)/D(s)." />
    </details>
  );
}
