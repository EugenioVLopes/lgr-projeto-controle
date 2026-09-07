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
  s0: Complex;
  t: TesteAngulo;
  K: number;
  partidas: Array<{ p: Complex; ang: number }>;
  routh0: number[][];
};
export type Calc = CalcErro | CalcOk;

export function useCalculoLgr(
  numeradorG: string,
  denominadorG: string,
  numeradorH: string,
  denominadorH: string,
  parteRealS0: string,
  parteImaginariaS0: string,
): Calc {
  const numeradorGComDebounce = useValorComDebounce(numeradorG);
  const denominadorGComDebounce = useValorComDebounce(denominadorG);
  const numeradorHComDebounce = useValorComDebounce(numeradorH);
  const denominadorHComDebounce = useValorComDebounce(denominadorH);
  const parteRealS0ComDebounce = useValorComDebounce(parteRealS0);
  const parteImaginariaS0ComDebounce = useValorComDebounce(parteImaginariaS0);

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
    const s0 = criarComplexo(
      Number(parteRealS0ComDebounce) || 0,
      Number(parteImaginariaS0ComDebounce) || 0,
    );
    const t = testarCriterioAngulo(s0, zeros, polos);
    const K = calcularGanhoK(s0, zeros, polos);
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
      s0,
      t,
      K,
      partidas,
      routh0,
    };
  }, [
    numeradorGComDebounce,
    denominadorGComDebounce,
    numeradorHComDebounce,
    denominadorHComDebounce,
    parteRealS0ComDebounce,
    parteImaginariaS0ComDebounce,
  ]);
}
