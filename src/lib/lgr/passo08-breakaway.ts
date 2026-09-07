// Passo 8 — Pontos de breakaway/break-in (dK/ds = 0, K > 0 sobre o LGR)
import type { BreakPoint, Complex } from "./tipos";
import {
  criarComplexo,
  dividirComplexos,
  moduloComplexo,
  ehNumeroReal,
} from "./complexos";
import {
  multiplicarPolinomios,
  subtrairPolinomios,
  derivarPolinomio,
  avaliarPolinomioComplexo,
} from "./polinomios";
import { encontrarRaizes } from "./raizes";

export function encontrarPontosBreakaway(
  numerador: readonly number[],
  denominador: readonly number[],
  polos: readonly Complex[],
  zeros: readonly Complex[],
): BreakPoint[] {
  const derivadaNumerador = derivarPolinomio(numerador);
  const derivadaDenominador = derivarPolinomio(denominador);
  const equacaoDerivada = subtrairPolinomios(
    multiplicarPolinomios(numerador, derivadaDenominador),
    multiplicarPolinomios(denominador, derivadaNumerador),
  );
  const candidatas = encontrarRaizes(equacaoDerivada);
  const partesReaisPolosZeros = [...polos, ...zeros]
    .filter((p) => ehNumeroReal(p, 1e-8))
    .map((p) => p.re);
  const pontos: BreakPoint[] = [];
  for (const candidata of candidatas) {
    const valorNumerador = avaliarPolinomioComplexo(numerador, candidata);
    const valorDenominador = avaliarPolinomioComplexo(denominador, candidata);
    if (moduloComplexo(valorNumerador) < 1e-12) continue;
    const ganhoK = dividirComplexos(
      { re: -valorDenominador.re, im: -valorDenominador.im },
      valorNumerador,
    );
    if (Math.abs(candidata.im) < 1e-4) {
      const parteReal = candidata.re;
      const contagemADireita = partesReaisPolosZeros.filter(
        (x) => x > parteReal + 1e-10,
      ).length;
      if (
        contagemADireita % 2 === 1 &&
        ganhoK.re > 0 &&
        Math.abs(ganhoK.im) < 1e-3
      )
        pontos.push({ s: criarComplexo(parteReal, 0), K: ganhoK.re });
    } else if (Math.abs(ganhoK.im) < 1e-3 && ganhoK.re > 0) {
      pontos.push({ s: candidata, K: ganhoK.re });
    }
  }
  return pontos;
}
