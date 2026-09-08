// Passo 9b — Tabela de Routh simbólica com K (sem sympy)
// Cada coeficiente da equação D(s)+K·N(s)=0 é d+K·n.
// Linhas seguintes usam a recorrência clássica com expressões em K.
function fmt(v: number): string {
  if (Math.abs(v) < 1e-12) return "0";
  const r = Math.round(v);
  if (Math.abs(v - r) < 1e-9) return `${r}`;
  return `${+v.toFixed(4)}`;
}
function coefLatex(d: number, n: number): string {
  const sd = Math.abs(d) < 1e-12 ? null : fmt(d);
  const sn = Math.abs(n) < 1e-12 ? null : fmt(Math.abs(n));
  if (sd === null && sn === null) return "0";
  if (sd === null) {
    if (Math.abs(n - 1) < 1e-9) return "K";
    if (Math.abs(n + 1) < 1e-9) return "-K";
    return `${fmt(n)}K`;
  }
  if (sn === null) return sd;
  const kPart =
    Math.abs(n - 1) < 1e-9 ? "K" : Math.abs(n + 1) < 1e-9 ? "K" : `${sn}K`;
  return n > 0 ? `${sd} + ${kPart}` : `${sd} - ${kPart}`;
}
export interface RouthSimbolica {
  grau: number;
  cols: number;
  tab: string[][];
  coefs: string[];
}
export function montarTabelaRouthSimbolica(
  denominador: readonly number[],
  numerador: readonly number[],
): RouthSimbolica {
  const tamanho = Math.max(denominador.length, numerador.length);
  const dPad = [
    ...new Array(tamanho - denominador.length).fill(0),
    ...denominador,
  ];
  const nPad = [...new Array(tamanho - numerador.length).fill(0), ...numerador];
  const grau = tamanho - 1;
  const cols = Math.floor((grau + 2) / 2);
  const coefs = dPad.map((d, i) => coefLatex(d, nPad[i]));
  const tab: string[][] = Array.from({ length: grau + 1 }, () =>
    new Array(cols).fill("0"),
  );
  for (let j = 0; j < cols; j++) {
    if (2 * j < coefs.length) tab[0][j] = coefs[2 * j];
    if (2 * j + 1 < coefs.length && grau >= 1) tab[1][j] = coefs[2 * j + 1];
  }
  for (let i = 2; i <= grau; i++) {
    const piv = tab[i - 1][0];
    if (piv === "0" || piv === "") break;
    for (let j = 0; j < cols - 1; j++) {
      const a = tab[i - 1][0];
      const b = tab[i - 2][j + 1] ?? "0";
      const c = tab[i - 2][0];
      const d = tab[i - 1][j + 1] ?? "0";
      if (a === "0" || a === "") {
        tab[i][j] = "0";
        continue;
      }
      tab[i][j] = `\\frac{(${a})(${b})-(${c})(${d})}{${a}}`;
    }
  }
  return { grau, cols, tab, coefs };
}
