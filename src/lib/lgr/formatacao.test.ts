import { describe, expect, it } from "vitest";
import katex from "katex";
import {
  anguloMemoriaParaLatex,
  anguloParcelaParaLatex,
  distanciaParaLatex,
  vetorParaLatex,
} from "./formatacao";

function esperaKatexValido(latex: string) {
  expect(() =>
    katex.renderToString(latex, { throwOnError: true }),
  ).not.toThrow();
}

describe("formatacao de memorias", () => {
  it("vetor exibe sinal", () => {
    expect(vetorParaLatex(1, 2)).toBe("1.00 + 2.00j");
    expect(vetorParaLatex(-1, -2)).toBe("-1.00 - 2.00j");
  });

  it("angulo no 1o quadrante usa arctan", () => {
    const latex = anguloParcelaParaLatex("\\theta", 1, 1, 1, 45);
    expect(latex).toContain("\\angle(1.00 + 1.00j)");
    expect(latex).toContain("\\tan^{-1}");
    esperaKatexValido(latex);
  });

  it("angulo no 2o quadrante soma 180", () => {
    const latex = anguloParcelaParaLatex("\\theta", 1, -1, 1, 135);
    expect(latex).toContain("180^{\\circ} +");
    esperaKatexValido(latex);
  });

  it("angulo reto preserva sinal", () => {
    expect(anguloParcelaParaLatex("\\theta", 1, 0, -1, -90)).toContain(
      "-90.00",
    );
  });

  it("memoria com rotulo exibe vetor", () => {
    const latex = anguloMemoriaParaLatex("\\angle(p_k - p_1)", 1, 0, 0);
    expect(latex).toContain("\\angle(p_k - p_1)");
    esperaKatexValido(latex);
  });

  it("distancia exibe dx, dy com sinal", () => {
    const latex = distanciaParaLatex("A", 1, -1.5, 2, 2.5);
    expect(latex).toContain("(-1.50)^{2}");
    expect(latex).toContain("\\sqrt");
    esperaKatexValido(latex);
  });
});
