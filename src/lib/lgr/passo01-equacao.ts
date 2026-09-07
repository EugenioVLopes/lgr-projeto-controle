// Passo 1 — Equação característica 1+G(s)H(s) = 1+K·P(s)
import { multiplicarPolinomios, preencherZerosEsquerda } from "./polinomios";

export interface EquacaoMalhaAberta {
  num: number[];
  den: number[];
}

export function combinarMalhaAberta(numeradorG: readonly number[], denominadorG: readonly number[], numeradorH: readonly number[], denominadorH: readonly number[]): EquacaoMalhaAberta {
  const numeradorMalhaAberta = multiplicarPolinomios(numeradorG, numeradorH);
  const denominadorMalhaAberta = multiplicarPolinomios(denominadorG, denominadorH);
  const tamanho = Math.max(numeradorMalhaAberta.length, denominadorMalhaAberta.length);
  return {
    num: preencherZerosEsquerda(numeradorMalhaAberta, tamanho),
    den: preencherZerosEsquerda(denominadorMalhaAberta, tamanho),
  };
}
