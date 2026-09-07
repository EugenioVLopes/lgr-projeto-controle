import { useMemo } from "react";
import { analisarCoeficientes, criarComplexo } from "../lib/lgr/index";
import { complexoParaLatex, polinomioParaLatex } from "../components/Formula";
import type { Complex } from "../lib/lgr/index";

export function usePreviewFuncao(
  numerador: string,
  denominador: string,
  simbolo: string,
): string | null {
  return useMemo(() => {
    const coeficientesNumerador = analisarCoeficientes(numerador);
    const coeficientesDenominador = analisarCoeficientes(denominador);
    if (!coeficientesNumerador || !coeficientesDenominador) return null;
    return `${simbolo}(s) = \\frac{${polinomioParaLatex(coeficientesNumerador)}}{${polinomioParaLatex(coeficientesDenominador)}}`;
  }, [numerador, denominador, simbolo]);
}

export function usePreviewS0(
  parteRealS0: string,
  parteImaginariaS0: string,
): { s0: Complex; latex: string } {
  return useMemo(() => {
    const s0 = criarComplexo(
      Number(parteRealS0) || 0,
      Number(parteImaginariaS0) || 0,
    );
    return { s0, latex: `s_0 = ${complexoParaLatex(s0)}` };
  }, [parteRealS0, parteImaginariaS0]);
}
