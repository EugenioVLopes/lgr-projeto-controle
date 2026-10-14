import { describe, expect, it } from "vitest";
import { projetarControlador } from "./index";
import { EXERCICIOS_CONTROLADORES } from "./exemplos";
import {
  criarResolucaoImpressao,
  requisitosImpressao,
  resolverListaParaEntrega,
} from "./impressao";

describe("resoluções impressas", () => {
  it("resolve as quatro questões com as entradas originais e registra os limites não atendidos", () => {
    const lista = resolverListaParaEntrega();
    expect(lista.map((q) => q.id)).toEqual(["q1", "q2", "q3", "q4"]);
    for (const q of lista) {
      expect(q.projeto.entrada).toEqual(
        EXERCICIOS_CONTROLADORES.find((e) => e.id === q.id)!.entrada,
      );
      expect(q.resposta.t).toHaveLength(4001);
      expect(q.resposta.horizonte).toBe(20);
    }
    expect(lista[0].projeto.entrada.especificacao).toMatchObject({
      margem: 1,
    });
    expect(lista[0].resposta.ts5).toBeCloseTo(4.135, 3);
    expect(requisitosImpressao(lista[0]).map((c) => c.atende)).toEqual([
      true,
      false,
    ]);
    for (const q of lista.slice(1)) {
      expect(requisitosImpressao(q).every((c) => c.atende)).toBe(true);
    }
    expect(EXERCICIOS_CONTROLADORES[0].entrada.especificacao).toMatchObject({
      margem: 1,
    });
  });
  it("imprime o projeto atual sem ajustar nem aprovar um resultado que falhou", () => {
    const r = projetarControlador(EXERCICIOS_CONTROLADORES[0].entrada);
    const q = criarResolucaoImpressao(r, "q1");
    expect(q.projeto).toBe(r);
    expect(requisitosImpressao(q).map((c) => c.atende)).toEqual([true, false]);
  });
  it("preserva o fator de frequência informado manualmente no cálculo e na impressão", () => {
    const entrada = structuredClone(EXERCICIOS_CONTROLADORES[0].entrada);
    if (entrada.especificacao.modo !== "mpTs")
      throw new Error("Exemplo inválido");
    entrada.especificacao.margem = 1.2;
    const projeto = projetarControlador(entrada);
    const q = criarResolucaoImpressao(projeto, "q1");
    expect(q.projeto.entrada.especificacao).toEqual(entrada.especificacao);
    expect(q.projeto.wn).toBeCloseTo(projeto.wnMin! * 1.2, 12);
    expect(q.projeto).toBe(projeto);
  });
  it("não inventa exigências de Mp ou acomodação nas questões 2 e 3", () => {
    const lista = resolverListaParaEntrega();
    expect(requisitosImpressao(lista[1]).map((c) => c.descricao)).toEqual([
      "Fator de amortecimento ζ = 0,7",
      "Frequência natural ωn = 0,5 rad/s",
    ]);
    expect(requisitosImpressao(lista[2])).toHaveLength(1);
    expect(lista[2].resposta.y0).toBeCloseTo(35);
    expect(lista[2].resposta.yss).toBeCloseTo(5);
  });
  it("identifica dados alterados como projeto manual, com o pedido atual", () => {
    const entrada = structuredClone(EXERCICIOS_CONTROLADORES[1].entrada);
    entrada.especificacao = { modo: "zetaWn", zeta: 0.6, wn: 0.5 };
    const q = criarResolucaoImpressao(projetarControlador(entrada), "q2");
    expect(q.id).toBe("manual");
    expect(q.enunciado).toContain("ζ = 0,6");
    expect(q.titulo).toBe("Projeto manual · PD");
  });
});
