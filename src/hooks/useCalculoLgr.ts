import { useMemo } from "react";
import { useValorComDebounce } from "./useValorComDebounce.ts";
import {
  analisarCoeficientes,
  calcularAnguloPartida,
  calcularAssintotas,
  calcularGanhoK,
  calcularRamosLgr,
  combinarMalhaAberta,
  criarComplexo,
  encontrarCruzamentosEixoImaginario,
  encontrarPontosBreakaway,
  encontrarRaizes,
  encontrarSegmentosEixoReal,
  montarTabelaRouth,
  testarCriterioAngulo,
} from "../lib/lgr/index";
import type {
  BreakPoint,
  Complex,
  Cruzamento,
  TesteAngulo,
} from "../lib/lgr/index";

export interface PontoTesteEntrada {
  re: string;
  im: string;
}

export interface ResultadoPonto {
  s0: Complex;
  t: TesteAngulo;
  K: number;
}

export type CalcErro = { error: string };
export type CalcOk = {
  error: null;
  num: number[];
  den: number[];
  zeros: Complex[];
  polos: Complex[];
  segs: Array<[number, number]>;
  sigma: number | null;
  angs: number[];
  bk: BreakPoint[];
  cruzs: Cruzamento[];
  info: Record<string, number[]>;
  Ks: number[];
  ramos: Complex[][];
  testes: ResultadoPonto[];
  partidas: Array<{ p: Complex; ang: number }>;
  routh0: number[][];
};
export type Calc = CalcErro | CalcOk;

export function useCalculoLgr(
  numeradorG: string,
  denominadorG: string,
  numeradorH: string,
  denominadorH: string,
  pontos: PontoTesteEntrada[],
): Calc {
  const numeradorGComDebounce = useValorComDebounce(numeradorG);
  const denominadorGComDebounce = useValorComDebounce(denominadorG);
  const numeradorHComDebounce = useValorComDebounce(numeradorH);
  const denominadorHComDebounce = useValorComDebounce(denominadorH);
  const pontosComDebounce = useValorComDebounce(pontos);

  return useMemo<Calc>(() => {
    const coeficientesNumeradorG = analisarCoeficientes(numeradorGComDebounce);
    const coeficientesDenominadorG = analisarCoeficientes(
      denominadorGComDebounce,
    );
    const coeficientesNumeradorH = analisarCoeficientes(numeradorHComDebounce);
    const coeficientesDenominadorH = analisarCoeficientes(
      denominadorHComDebounce,
    );
    if (
      !coeficientesNumeradorG ||
      !coeficientesDenominadorG ||
      !coeficientesNumeradorH ||
      !coeficientesDenominadorH
    )
      return { error: 'Confere os coeficientes (use espaços: ex. "1 4 0")' };
    const { num, den } = combinarMalhaAberta(
      coeficientesNumeradorG,
      coeficientesDenominadorG,
      coeficientesNumeradorH,
      coeficientesDenominadorH,
    );
    const zeros = encontrarRaizes(num);
    const polos = encontrarRaizes(den);
    const segs = encontrarSegmentosEixoReal(zeros, polos);
    const { sigma, angs } = calcularAssintotas(zeros, polos);
    const bk = encontrarPontosBreakaway(num, den, polos, zeros);
    const { cruzs, info } = encontrarCruzamentosEixoImaginario(den, num);
    const { Ks, ramos } = calcularRamosLgr(num, den);
    const testes: ResultadoPonto[] = pontosComDebounce.map((p) => {
      const s0 = criarComplexo(Number(p.re) || 0, Number(p.im) || 0);
      const t = testarCriterioAngulo(s0, zeros, polos, num, den);
      const K = calcularGanhoK(s0, zeros, polos, num, den);
      return { s0, t, K };
    });
    const cxP = polos.filter((p) => p.im > 1e-8);
    const partidas = cxP.map((p) => ({
      p,
      ang: calcularAnguloPartida(p, polos, zeros),
    }));
    const routh0 = montarTabelaRouth(den, num, 1);
    return {
      error: null,
      num,
      den,
      zeros,
      polos,
      segs,
      sigma,
      angs,
      bk,
      cruzs,
      info,
      Ks,
      ramos,
      testes,
      partidas,
      routh0,
    };
  }, [
    numeradorGComDebounce,
    denominadorGComDebounce,
    numeradorHComDebounce,
    denominadorHComDebounce,
    pontosComDebounce,
  ]);
}
