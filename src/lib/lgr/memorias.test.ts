import { describe, expect, it } from "vitest";
import { criarComplexo } from "./complexos";
import {
  detalharAnguloS0,
  detalharGanhoS0,
  detalharPartida,
  equacaoDerivadaBreakaway,
} from "./memorias";

describe("memorias de cálculo", () => {
  it("detalha ângulo em s0 com parcelas por polo/zero", () => {
    const det = detalharAnguloS0(
      criarComplexo(0, 0),
      [],
      [criarComplexo(-1, 0), criarComplexo(-2, 0)],
    );
    expect(det.parcelasPolos).toHaveLength(2);
    expect(det.parcelasPolos[0].ang).toBeCloseTo(0, 5);
  });

  it("detalha ganho com distâncias", () => {
    const det = detalharGanhoS0(
      criarComplexo(0, 0),
      [],
      [criarComplexo(-1, 0)],
    );
    expect(det.distPolos[0]).toBeCloseTo(1, 8);
  });

  it("detalha partida excluindo o próprio polo", () => {
    const alvo = criarComplexo(0, 1);
    const det = detalharPartida(alvo, [alvo, criarComplexo(-1, 0)], []);
    expect(det.parcelasPolos).toHaveLength(1);
  });

  it("monta equação N·D' − D·N'", () => {
    const { eq } = equacaoDerivadaBreakaway([1, 1], [1, 13, 0]);
    expect(eq.length).toBeGreaterThan(1);
  });
});
