// Passo 4 — Segmentos do LGR sobre o eixo real (regra dos ímpares)
import type { Complex } from "./tipos";
import { ehNumeroReal } from "./complexos";

export function encontrarSegmentosEixoReal(zeros: readonly Complex[], polos: readonly Complex[]): Array<[number, number]> {
  const partesReais: number[] = [];
  for (const polo of polos) if (ehNumeroReal(polo, 1e-8)) partesReais.push(polo.re);
  for (const zero of zeros) if (ehNumeroReal(zero, 1e-8)) partesReais.push(zero.re);
  if (partesReais.length === 0) return [];
  const fronteiraOrdenada = [...new Set(partesReais.map((r) => Math.round(r * 1e8) / 1e8))].sort((a, b) => b - a);
  const segmentos: Array<[number, number]> = [];
  for (let i = 0; i < fronteiraOrdenada.length - 1; i++) {
    const pontoMedio = (fronteiraOrdenada[i] + fronteiraOrdenada[i + 1]) / 2;
    const contagemADireita = partesReais.filter((r) => r > pontoMedio + 1e-10).length;
    if (contagemADireita % 2 === 1) segmentos.push([fronteiraOrdenada[i + 1], fronteiraOrdenada[i]]);
  }
  if (partesReais.length % 2 === 1) segmentos.push([-Infinity, fronteiraOrdenada[fronteiraOrdenada.length - 1]]);
  return segmentos;
}
