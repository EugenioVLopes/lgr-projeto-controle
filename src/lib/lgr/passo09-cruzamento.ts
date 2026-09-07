// Passo 9a — Cruzamento com o eixo imaginário (s = jw)
// Passo 9b — Tabela de Routh numérica para K fixo (estabilidade)
import type { Cruzamento } from "./tipos";
import {
  multiplicarPolinomios,
  subtrairPolinomios,
  preencherZerosEsquerda,
  avaliarPolinomioReal,
} from "./polinomios";
import { encontrarRaizes } from "./raizes";

function separarParteRealImaginariaJw(coeficientes: readonly number[]): {
  parteReal: number[];
  parteImaginaria: number[];
} {
  const grau = coeficientes.length - 1;
  const mapaReal = new Map<number, number>();
  const mapaImag = new Map<number, number>();
  for (let k = 0; k < coeficientes.length; k++) {
    const potencia = grau - k;
    const coef = coeficientes[k];
    const resto = ((potencia % 4) + 4) % 4;
    if (resto === 0)
      mapaReal.set(potencia, (mapaReal.get(potencia) ?? 0) + coef);
    else if (resto === 1)
      mapaImag.set(potencia, (mapaImag.get(potencia) ?? 0) + coef);
    else if (resto === 2)
      mapaReal.set(potencia, (mapaReal.get(potencia) ?? 0) - coef);
    else mapaImag.set(potencia, (mapaImag.get(potencia) ?? 0) - coef);
  }
  const montar = (d: Map<number, number>): number[] => {
    if (d.size === 0) return [0];
    const maiorGrau = Math.max(...d.keys());
    const arr = new Array(maiorGrau + 1).fill(0);
    for (const [p, v] of d) arr[maiorGrau - p] = v;
    return arr;
  };
  return { parteReal: montar(mapaReal), parteImaginaria: montar(mapaImag) };
}

// ---------- Passo 9a ----------
export function encontrarCruzamentosEixoImaginario(
  denominador: readonly number[],
  numerador: readonly number[],
): { cruzs: Cruzamento[]; info: Record<string, number[]> } {
  const parteRealDenominador =
    separarParteRealImaginariaJw(denominador).parteReal;
  const parteImaginariaDenominador =
    separarParteRealImaginariaJw(denominador).parteImaginaria;
  const parteRealNumerador = separarParteRealImaginariaJw(numerador).parteReal;
  const parteImaginariaNumerador =
    separarParteRealImaginariaJw(numerador).parteImaginaria;
  const Re_D = parteRealDenominador;
  const Im_D = parteImaginariaDenominador;
  const Re_N = parteRealNumerador;
  const Im_N = parteImaginariaNumerador;
  let polinomioCruzamento = subtrairPolinomios(
    multiplicarPolinomios(Re_D, Im_N),
    multiplicarPolinomios(Im_D, Re_N),
  );
  while (
    polinomioCruzamento.length > 1 &&
    Math.abs(polinomioCruzamento[0]) < 1e-12
  )
    polinomioCruzamento = polinomioCruzamento.slice(1);
  const info = { Re_D, Im_D, Re_N, Im_N, cross: polinomioCruzamento };
  if (polinomioCruzamento.length <= 1) return { cruzs: [], info };
  const frequenciasCandidatas = encontrarRaizes(polinomioCruzamento);
  const saidas: Cruzamento[] = [];
  for (const candidata of frequenciasCandidatas) {
    if (Math.abs(candidata.im) > 1e-4 || candidata.re < 1e-8) continue;
    const omega = candidata.re;
    const imN = avaliarPolinomioReal(Im_N, omega);
    const imD = avaliarPolinomioReal(Im_D, omega);
    const reN = avaliarPolinomioReal(Re_N, omega);
    const reD = avaliarPolinomioReal(Re_D, omega);
    let ganhoK = NaN;
    if (Math.abs(imN) > 1e-12) ganhoK = -imD / imN;
    else if (Math.abs(reN) > 1e-12) ganhoK = -reD / reN;
    else continue;
    if (
      ganhoK > 1e-10 &&
      !saidas.some(
        (o) => Math.abs(o.K - ganhoK) < 1e-4 && Math.abs(o.w - omega) < 1e-4,
      )
    )
      saidas.push({ K: ganhoK, w: omega });
  }
  return { cruzs: saidas, info };
}

// ---------- Passo 9b ----------
export function montarTabelaRouth(
  denominador: readonly number[],
  numerador: readonly number[],
  ganhoK: number,
): number[][] {
  const tamanho = Math.max(denominador.length, numerador.length);
  const numeradorAlinhado = preencherZerosEsquerda(numerador, tamanho);
  const coefs = preencherZerosEsquerda(denominador, tamanho).map(
    (d, i) => d + ganhoK * numeradorAlinhado[i],
  );
  const grau = coefs.length - 1;
  const colunas = Math.floor((grau + 2) / 2);
  const tabela: number[][] = Array.from({ length: grau + 1 }, () =>
    new Array(colunas).fill(0),
  );
  for (let j = 0; j < colunas; j++) {
    if (2 * j < coefs.length) tabela[0][j] = coefs[2 * j];
    if (2 * j + 1 < coefs.length && tabela.length > 1)
      tabela[1][j] = coefs[2 * j + 1];
  }
  for (let i = 2; i <= grau; i++) {
    const pivo = tabela[i - 1][0];
    if (Math.abs(pivo) < 1e-12) break;
    for (let j = 0; j < colunas - 1; j++) {
      tabela[i][j] =
        (tabela[i - 1][0] * tabela[i - 2][j + 1] -
          tabela[i - 2][0] * tabela[i - 1][j + 1]) /
        pivo;
    }
  }
  return tabela;
}
