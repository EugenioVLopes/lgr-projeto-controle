import { useMemo } from "react";
import Formula, {
  coeficienteLider,
  fatoresParaLatex,
  formatarNumLatex,
  polinomioParaLatex,
} from "../Formula";
import DicaProva from "../DicaProva";
import { formatarComplexo } from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

export default function Passo02FormaFatorada({
  num,
  den,
  zeros,
  polos,
}: {
  num: number[];
  den: number[];
  zeros: Complex[];
  polos: Complex[];
}) {
  const latex = useMemo(
    () =>
      `P(s) = \\frac{N(s)}{D(s)} = \\frac{${polinomioParaLatex(num)}}{${polinomioParaLatex(den)}}`,
    [num, den],
  );

  const { latexP, descP } = useMemo(() => {
    const cn = coeficienteLider(num);
    const cd = coeficienteLider(den);
    const fN = fatoresParaLatex(zeros);
    const fD = fatoresParaLatex(polos);

    let ganho = 1;
    if (Math.abs(cd) >= 1e-12) ganho = cn / cd;
    let prefixo = "";
    if (Math.abs(ganho - 1) >= 1e-9) {
      prefixo =
        Math.abs(ganho + 1) < 1e-9 ? "-" : `${formatarNumLatex(ganho)} \\cdot `;
    }
    let pFatorada: string;
    if (fN && fD) pFatorada = `${prefixo}\\frac{${fN}}{${fD}}`;
    else if (fN && !fD) pFatorada = `${prefixo}${fN}`;
    else if (!fN && fD)
      pFatorada = `${prefixo}\\frac{${formatarNumLatex(1)}}{${fD}}`;
    else pFatorada = `${formatarNumLatex(ganho)}`;

    const texto = (fatores: Complex[]) =>
      fatores.length
        ? fatores.map(formatarComplexo).join("; ")
        : "nenhuma raiz finita";
    return {
      latexP: `P(s) = ${pFatorada}`,
      descP: `P fatorada com zeros ${texto(zeros)} e polos ${texto(polos)}`,
    };
  }, [num, den, zeros, polos]);

  return (
    <details>
      <summary>Passo 2, forma fatorada</summary>
      <Formula latex={latex} descricao="P igual a N sobre D" />
      <Formula latex={latexP} descricao={descP} />
      <DicaProva dica="fatora N(s)=0 para achar zeros, D(s)=0 para achar polos. Grau de D é np, grau de N é nz. No final deixa N e D na forma fatorada em relação às suas raízes." />
    </details>
  );
}
