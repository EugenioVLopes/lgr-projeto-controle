// Passo 10 — Ângulos de partida/chegada (polos/zeros complexos)
// Passo 11 — Critério do ângulo em s0 (pertence ao LGR se |ângulo| ≈ 180°)
// Passo 12 — Ganho K em s0 pela condição de módulo
import type { Complex } from "./tipos";
import { subtrairComplexos, anguloEmGraus } from "./complexos";

export interface TesteAngulo {
  ang: number;
  norm: number;
  pertence: boolean;
  K: number | null;
}

// ---------- Passo 10 ----------
export function calcularAnguloPartida(poloAlvo: Complex, polos: readonly Complex[], zeros: readonly Complex[]): number {
  let somaPolos = 0;
  let somaZeros = 0;
  for (const outroPolo of polos)
    if (Math.hypot(outroPolo.re - poloAlvo.re, outroPolo.im - poloAlvo.im) > 1e-10)
      somaPolos += anguloEmGraus(subtrairComplexos(poloAlvo, outroPolo));
  for (const zero of zeros) somaZeros += anguloEmGraus(subtrairComplexos(poloAlvo, zero));
  let theta = 180 - somaPolos + somaZeros;
  theta = ((theta + 180) % 360 + 360) % 360 - 180;
  return theta;
}

// ---------- Passo 11 ----------
export function testarCriterioAngulo(pontoTeste: Complex, zeros: readonly Complex[], polos: readonly Complex[]): TesteAngulo {
  const somaPolos = polos.reduce((acc, p) => acc + anguloEmGraus(subtrairComplexos(pontoTeste, p)), 0);
  const somaZeros = zeros.reduce((acc, z) => acc + anguloEmGraus(subtrairComplexos(pontoTeste, z)), 0);
  const angulo = somaZeros - somaPolos;
  const normalizado = ((angulo + 180) % 360 + 360) % 360 - 180;
  const pertence = Math.abs(Math.abs(normalizado) - 180) < 5;
  let ganhoK: number | null = null;
  if (pertence) {
    const produtoPolos = polos.reduce((acc, p) => acc * Math.hypot(pontoTeste.re - p.re, pontoTeste.im - p.im), 1);
    const produtoZeros = zeros.length
      ? zeros.reduce((acc, z) => acc * Math.hypot(pontoTeste.re - z.re, pontoTeste.im - z.im), 1)
      : 1;
    ganhoK = produtoZeros > 1e-12 ? produtoPolos / produtoZeros : Infinity;
  }
  return { ang: angulo, norm: normalizado, pertence, K: ganhoK };
}

// ---------- Passo 12 ----------
export function calcularGanhoK(pontoTeste: Complex, zeros: readonly Complex[], polos: readonly Complex[]): number {
  const produtoPolos = polos.reduce((acc, p) => acc * Math.hypot(pontoTeste.re - p.re, pontoTeste.im - p.im), 1);
  const produtoZeros = zeros.length
    ? zeros.reduce((acc, z) => acc * Math.hypot(pontoTeste.re - z.re, pontoTeste.im - z.im), 1)
    : 1;
  return produtoZeros > 1e-12 ? produtoPolos / produtoZeros : Infinity;
}
