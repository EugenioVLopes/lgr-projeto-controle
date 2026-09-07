import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";

let katexPromise: Promise<typeof import("katex")> | null = null;
function carregarKatex(): Promise<typeof import("katex")> {
  if (!katexPromise) {
    katexPromise = import("katex");
  }
  return katexPromise;
}

export function polinomioParaLatex(
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
    let termo = "";
    if (expoente === 0) termo = coefStr;
    else if (expoente === 1) termo = `${coefStr}${variavel}`;
    else termo = `${coefStr}${variavel}^{${expoente}}`;
    if (partes.length === 0) partes.push(coef < 0 ? `-${termo}` : termo);
    else partes.push(coef < 0 ? ` - ${termo}` : ` + ${termo}`);
  });
  return partes.join("") || "0";
}

export {
  coeficienteLider,
  complexoParaLatex,
  fatorLinearParaLatex,
  fatoresParaLatex,
  formatarNumLatex,
  polinomioFatoradoParaLatex,
} from "../lib/lgr/formatacao";

export default function Formula({
  latex,
  display = false,
  descricao,
  id,
  inline = false,
}: {
  latex: string;
  display?: boolean;
  descricao?: string;
  id?: string;
  inline?: boolean;
}) {
  const [html, setHtml] = useState<string>(`<code>${latex}</code>`);
  useEffect(() => {
    let vivo = true;
    carregarKatex()
      .then((mod) => {
        if (!vivo) return;
        const katex = mod.default ?? mod;
        try {
          setHtml(
            katex.renderToString(latex, {
              throwOnError: false,
              displayMode: display,
            }),
          );
        } catch {
          setHtml(`<code>${latex}</code>`);
        }
      })
      .catch(() => {
        if (vivo) setHtml(`<code>${latex}</code>`);
      });
    return () => {
      vivo = false;
    };
  }, [latex, display]);
  if (inline) {
    return (
      <span
        className="formula-inline"
        role="img"
        aria-label={descricao ?? latex}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <div
      id={id}
      className="formula"
      role="img"
      aria-label={descricao ?? latex}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
