// Memórias de cálculo para o passo a passo: expõem as contas
// intermediárias com números substituídos.
import type { Complex } from "./tipos";
import { subtrairComplexos, anguloEmGraus } from "./complexos";
import {
  derivarPolinomio,
  multiplicarPolinomios,
  subtrairPolinomios,
} from "./polinomios";

export interface ParcelaAngulo {
  origem: string;
  vetorRe: number;
  vetorIm: number;
  ang: number;
}

export function detalharAnguloS0(
  s0: Complex,
  zeros: readonly Complex[],
  polos: readonly Complex[],
): { parcelasPolos: ParcelaAngulo[]; parcelasZeros: ParcelaAngulo[] } {
  const parcelasPolos = polos.map((p, i) => {
    const v = subtrairComplexos(s0, p);
    return {
      origem: `p${i + 1}`,
      vetorRe: v.re,
      vetorIm: v.im,
      ang: anguloEmGraus(v),
    };
  });
  const parcelasZeros = zeros.map((z, i) => {
    const v = subtrairComplexos(s0, z);
    return {
      origem: `z${i + 1}`,
      vetorRe: v.re,
      vetorIm: v.im,
      ang: anguloEmGraus(v),
    };
  });
  return { parcelasPolos, parcelasZeros };
}

export function detalharGanhoS0(
  s0: Complex,
  zeros: readonly Complex[],
  polos: readonly Complex[],
): { distPolos: number[]; distZeros: number[] } {
  const distPolos = polos.map((p) => Math.hypot(s0.re - p.re, s0.im - p.im));
  const distZeros = zeros.map((z) => Math.hypot(s0.re - z.re, s0.im - z.im));
  return { distPolos, distZeros };
}

export function detalharPartida(
  poloAlvo: Complex,
  polos: readonly Complex[],
  zeros: readonly Complex[],
): { parcelasPolos: ParcelaAngulo[]; parcelasZeros: ParcelaAngulo[] } {
  const parcelasPolos: ParcelaAngulo[] = [];
  polos.forEach((outro, i) => {
    if (Math.hypot(outro.re - poloAlvo.re, outro.im - poloAlvo.im) < 1e-10)
      return;
    const v = subtrairComplexos(poloAlvo, outro);
    parcelasPolos.push({
      origem: `p${i + 1}`,
      vetorRe: v.re,
      vetorIm: v.im,
      ang: anguloEmGraus(v),
    });
  });
  const parcelasZeros = zeros.map((z, i) => {
    const v = subtrairComplexos(poloAlvo, z);
    return {
      origem: `z${i + 1}`,
      vetorRe: v.re,
      vetorIm: v.im,
      ang: anguloEmGraus(v),
    };
  });
  return { parcelasPolos, parcelasZeros };
}

export function equacaoDerivadaBreakaway(
  num: readonly number[],
  den: readonly number[],
): { dNum: number[]; dDen: number[]; eq: number[] } {
  const dNum = derivarPolinomio(num);
  const dDen = derivarPolinomio(den);
  const eq = subtrairPolinomios(
    multiplicarPolinomios(num, dDen),
    multiplicarPolinomios(den, dNum),
  );
  return { dNum, dDen, eq };
}
