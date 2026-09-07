// Passo 7 — Assíntotas: centroide sigma_a e ângulos phi_a
import type { Complex } from "./tipos";

export interface Assintotas {
  sigma: number | null;
  angs: number[];
}

export function calcularAssintotas(zeros: readonly Complex[], polos: readonly Complex[]): Assintotas {
  const quantidadeAssintotas = polos.length - zeros.length;
  if (quantidadeAssintotas <= 0) return { sigma: null, angs: [] };
  const somaPolos = polos.reduce((acc, p) => acc + p.re, 0);
  const somaZeros = zeros.reduce((acc, z) => acc + z.re, 0);
  const sigma = (somaPolos - somaZeros) / quantidadeAssintotas;
  const angs = Array.from({ length: quantidadeAssintotas }, (_, q) => ((2 * q + 1) * 180) / quantidadeAssintotas);
  return { sigma, angs };
}
