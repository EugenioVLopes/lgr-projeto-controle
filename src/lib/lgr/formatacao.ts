// Formatação para exibição (não faz parte dos 12 passos; só apresentação)
import type { Complex } from "./tipos";

export function formatarComplexo(z: Complex, decimais = 4): string {
  const parteReal = +z.re.toFixed(decimais);
  const parteImag = +z.im.toFixed(decimais);
  if (Math.abs(parteImag) < 1e-10) return `${parteReal}`;
  const sinal = parteImag >= 0 ? "+" : "-";
  return `${parteReal} ${sinal} ${Math.abs(parteImag)}j`;
}

export function polinomioParaTexto(coeficientes: readonly number[], variavel = "s"): string {
  const grau = coeficientes.length - 1;
  const partes: string[] = [];
  coeficientes.forEach((coef, k) => {
    const expoente = grau - k;
    if (Math.abs(coef) < 1e-12) return;
    const abs = Math.abs(coef);
    const coefStr = expoente === 0 ? `${+abs.toFixed(4)}` : Math.abs(abs - 1) < 1e-12 ? "" : `${+abs.toFixed(4)}`;
    const termo = expoente === 0 ? coefStr : expoente === 1 ? `${coefStr}${variavel}` : `${coefStr}${variavel}^${expoente}`;
    partes.push(partes.length === 0 ? (coef < 0 ? `-${termo}` : termo) : coef < 0 ? ` - ${termo}` : ` + ${termo}`);
  });
  return partes.join("") || "0";
}
