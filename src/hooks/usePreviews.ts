import { useMemo } from "react";
import { analisarCoeficientes, criarComplexo } from "../lib/lgr/index";
import { complexoParaLatex, polinomioParaLatex } from "../components/Formula";
import type { Complex } from "../lib/lgr/index";

export function usePreviewFuncao(
  numTexto: string,
  denTexto: string,
  simbolo: string,
): string | null {
  return useMemo(() => {
    const pN = analisarCoeficientes(numTexto);
    const pD = analisarCoeficientes(denTexto);
    if (!pN || !pD) return null;
    return `${simbolo}(s) = \\frac{${polinomioParaLatex(pN)}}{${polinomioParaLatex(pD)}}`;
  }, [numTexto, denTexto, simbolo]);
}

export function usePreviewS0(
  srTexto: string,
  siTexto: string,
): { s0: Complex; latex: string } {
  return useMemo(() => {
    const s0 = criarComplexo(Number(srTexto) || 0, Number(siTexto) || 0);
    return { s0, latex: `s_0 = ${complexoParaLatex(s0)}` };
  }, [srTexto, siTexto]);
}
