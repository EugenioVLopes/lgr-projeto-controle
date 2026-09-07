// Formatação para exibição (não faz parte dos 12 passos; só apresentação)
import type { Complex } from "./tipos";

export function formatarComplexo(z: Complex, decimais = 4): string {
  const parteReal = +z.re.toFixed(decimais);
  const parteImag = +z.im.toFixed(decimais);
  if (Math.abs(parteImag) < 1e-10) return `${parteReal}`;
  const sinal = parteImag >= 0 ? "+" : "-";
  return `${parteReal} ${sinal} ${Math.abs(parteImag)}j`;
}

export function coeficienteLider(coeficientes: readonly number[]): number {
  for (const c of coeficientes) {
    if (Math.abs(c) >= 1e-12) return c;
  }
  return 0;
}

export function complexoParaLatex(z: Complex, decimais = 4): string {
  const re = +z.re.toFixed(decimais);
  const im = +z.im.toFixed(decimais);
  if (Math.abs(im) < 1e-10) return `${re}`;
  if (Math.abs(re) < 1e-10) return `${im}j`;
  return im >= 0 ? `${re} + ${im}j` : `${re} - ${Math.abs(im)}j`;
}

export function formatarNumLatex(valor: number, decimais = 4): string {
  return `${+valor.toFixed(decimais)}`;
}

export function fatorLinearParaLatex(r: Complex, variavel = "s"): string {
  const re = +r.re.toFixed(4);
  const im = +r.im.toFixed(4);
  if (Math.abs(im) < 1e-9) {
    if (Math.abs(re) < 1e-9) return variavel;
    if (re < 0) return `(${variavel} + ${formatarNumLatex(Math.abs(re))})`;
    return `(${variavel} - ${formatarNumLatex(re)})`;
  }
  return `(${variavel} - (${complexoParaLatex(r)}))`;
}

export function fatoresParaLatex(
  raizes: readonly Complex[],
  variavel = "s",
): string {
  return raizes.map((r) => fatorLinearParaLatex(r, variavel)).join("");
}

export function polinomioFatoradoParaLatex(
  raizes: readonly Complex[],
  coefLider: number,
  variavel = "s",
): string {
  const fatores = fatoresParaLatex(raizes, variavel);
  if (!fatores) return formatarNumLatex(coefLider);
  if (Math.abs(coefLider - 1) < 1e-9) return fatores;
  if (Math.abs(coefLider + 1) < 1e-9) return `-${fatores}`;
  return `${formatarNumLatex(coefLider)} \\cdot ${fatores}`;
}

export function polinomioParaTexto(
  coeficientes: readonly number[],
  variavel = "s",
): string {
  const grau = coeficientes.length - 1;
  const partes: string[] = [];
  coeficientes.forEach((coef, k) => {
    const expoente = grau - k;
    if (Math.abs(coef) < 1e-12) return;
    const abs = Math.abs(coef);
    const coefStr =
      expoente === 0
        ? `${+abs.toFixed(4)}`
        : Math.abs(abs - 1) < 1e-12
          ? ""
          : `${+abs.toFixed(4)}`;
    const termo =
      expoente === 0
        ? coefStr
        : expoente === 1
          ? `${coefStr}${variavel}`
          : `${coefStr}${variavel}^${expoente}`;
    partes.push(
      partes.length === 0
        ? coef < 0
          ? `-${termo}`
          : termo
        : coef < 0
          ? ` - ${termo}`
          : ` + ${termo}`,
    );
  });
  return partes.join("") || "0";
}
