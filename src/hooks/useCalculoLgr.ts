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
  nG: string,
  dG: string,
  nH: string,
  dH: string,
  sr: string,
  si: string,
): Calc {
  const nGd = useValorComDebounce(nG);
  const dGd = useValorComDebounce(dG);
  const nHd = useValorComDebounce(nH);
  const dHd = useValorComDebounce(dH);
  const srd = useValorComDebounce(sr);
  const sid = useValorComDebounce(si);

  return useMemo<Calc>(() => {
    const pNG = analisarCoeficientes(nGd);
    const pDG = analisarCoeficientes(dGd);
    const pNH = analisarCoeficientes(nHd);
    const pDH = analisarCoeficientes(dHd);
    if (!pNG || !pDG || !pNH || !pDH)
      return { error: 'Confere os coeficientes (use espaços: ex. "1 4 0")' };
    const { num, den } = combinarMalhaAberta(pNG, pDG, pNH, pDH);
    const zeros = encontrarRaizes(num);
    const polos = encontrarRaizes(den);
    const segs = encontrarSegmentosEixoReal(zeros, polos);
    const { sigma, angs } = calcularAssintotas(zeros, polos);
    const bk = encontrarPontosBreakaway(num, den, polos, zeros);
    const { cruzs, info } = encontrarCruzamentosEixoImaginario(den, num);
    const { Ks, ramos } = calcularRamosLgr(num, den);
    const s0 = criarComplexo(Number(srd) || 0, Number(sid) || 0);
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
  }, [nGd, dGd, nHd, dHd, srd, sid]);
}
