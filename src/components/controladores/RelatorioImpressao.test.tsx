import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import katex from "katex";
import RelatorioImpressao from "./RelatorioImpressao";
import PassosPrimeiraOrdem from "./PassosPrimeiraOrdem";
import {
  resolverListaParaEntrega,
  criarResolucaoImpressao,
} from "../../lib/controladores/impressao";
import { projetarControlador } from "../../lib/controladores";
import { EXERCICIOS_LISTA2 } from "../../lib/controladores/exemplos";

const paginas = (html: string) =>
  (html.match(/class="pagina-resolucao"/g) ?? []).length;

describe("relatório das duas listas", () => {
  it("preserva as oito páginas da primeira lista e usa seis na segunda", () => {
    const antiga = renderToStaticMarkup(
      <RelatorioImpressao resolucoes={resolverListaParaEntrega()} />,
    );
    const nova = renderToStaticMarkup(
      <RelatorioImpressao resolucoes={resolverListaParaEntrega("lista2")} />,
    );
    expect(paginas(antiga)).toBe(8);
    expect(paginas(nova)).toBe(6);
    expect(nova).toContain("2º Exercício da 2ª Unidade");
    expect(nova).not.toContain("1º Exercício da 2ª Unidade");
    expect(nova).toContain("Tustin");
    expect(nova).toContain("Euler forward");
    expect(nova).toContain("Não atende / não confirmado");
    expect(nova).toContain("fora do círculo unitário");
    expect(nova).toContain("6/6");
  });
  it("gera três páginas para a resolução atual e imprime os parâmetros certos", () => {
    const r = projetarControlador(EXERCICIOS_LISTA2[1].entrada);
    const q = criarResolucaoImpressao(r, "lista2-q2", {
      metodo: "backward",
      periodo: 0.5,
      alvo: "Gc",
    });
    const html = renderToStaticMarkup(<RelatorioImpressao resolucoes={[q]} />);
    expect(paginas(html)).toBe(3);
    expect(html).toContain("Euler backward");
    expect(html).toContain("0,5 s");
    expect(html).not.toContain("K_p=");
    expect(html).not.toContain("polo do controlador na origem");
    expect(html).toContain("3/3");
  });
  it("todas as fórmulas dos relatórios são válidas em KaTeX", () => {
    for (const lista of ["lista1", "lista2"] as const) {
      const html = renderToStaticMarkup(
        <RelatorioImpressao resolucoes={resolverListaParaEntrega(lista)} />,
      );
      const formulas = [
        ...html.matchAll(/class="formula"[^>]*aria-label="([^"]*)"/g),
      ];
      expect(formulas.length).toBeGreaterThan(20);
      for (const [, escapado] of formulas) {
        const latex = escapado
          .replaceAll("&amp;", "&")
          .replaceAll("&quot;", '"')
          .replaceAll("&#x27;", "'")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">");
        expect(() =>
          katex.renderToString(latex, { throwOnError: true }),
        ).not.toThrow();
      }
    }
  });
  it("a resolução na tela usa a e b sem exibir ganhos de PID", () => {
    const r = projetarControlador(EXERCICIOS_LISTA2[1].entrada);
    if (r.tipo !== "primeiraOrdem") throw new Error("Tipo incorreto");
    const html = renderToStaticMarkup(<PassosPrimeiraOrdem r={r} completa />);
    expect(html).toContain("partes imaginária e real");
    expect(html).toContain("a=3.799905");
    expect(html).not.toContain("K_p");
  });
});
