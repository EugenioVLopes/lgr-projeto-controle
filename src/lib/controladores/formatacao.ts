import type { FuncaoTransferencia } from "./index";
import type { MetodoDiscreto } from "./discretizacao";

export const numeroLatex = (x: number): string => {
  if (!Number.isFinite(x)) return "\\text{não definido}";
  if (x === 0) return "0";
  if (Math.abs(x) < 1e-4 || Math.abs(x) >= 1e6) {
    const [m, e] = x.toExponential(6).split("e");
    return `${Number(m)}\\cdot10^{${Number(e)}}`;
  }
  return String(Number(x.toPrecision(7)));
};
export const polinomioLatex = (coefs: number[], variavel = "s") =>
  coefs
    .flatMap((c, i) => {
      if (c === 0) return [];
      const grau = coefs.length - 1 - i;
      const coef =
        grau && Math.abs(c) === 1 ? (c < 0 ? "-" : "") : numeroLatex(c);
      return [
        `${coef}${grau === 0 ? "" : grau === 1 ? variavel : `${variavel}^{${grau}}`}`,
      ];
    })
    .join(" + ")
    .replaceAll("+ -", "- ") || "0";
export const tfLatex = (f: FuncaoTransferencia, variavel = "s") =>
  `\\frac{${polinomioLatex(f.num, variavel)}}{${polinomioLatex(f.den, variavel)}}`;
export const METODOS_DISCRETOS: Record<
  MetodoDiscreto,
  { nome: string; substituicao: string }
> = {
  forward: { nome: "Euler forward", substituicao: "\\frac{z-1}{T}" },
  backward: { nome: "Euler backward", substituicao: "\\frac{z-1}{Tz}" },
  tustin: { nome: "Tustin", substituicao: "\\frac{2}{T}\\frac{z-1}{z+1}" },
};
