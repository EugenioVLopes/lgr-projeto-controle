import type { ResultadoClassico } from "./index";
import { numeroLatex as n } from "./formatacao";
import { anguloMemoriaParaLatex } from "../lgr/formatacao";

// A memória usa as parcelas já calculadas, sem alterar o projeto.
export function memoriaCriterios(r: ResultadoClassico) {
  const polos = r.parcelas.filter((p) => p.tipo === "polo");
  const zeros = r.parcelas.filter((p) => p.tipo === "zero");
  const integral = r.entrada.topologia !== "PD";
  const quantidade = r.entrada.topologia === "PID" ? 2 : 1;
  const somaPolos = polos.reduce((s, p) => s + p.angulo, 0);
  const somaZeros = zeros.reduce((s, p) => s + p.angulo, 0);
  const fator = Math.abs(r.GH.den[0] / r.GH.num[0]);
  const distanciaZero = Math.hypot(r.sd.re + r.z, r.sd.im);
  const distanciaOrigem = Math.hypot(r.sd.re, r.sd.im);
  const potencia = quantidade === 2 ? "^2" : "";
  const curto = (valor: number) => String(Number(valor.toFixed(4)));
  const produto = (termos: string[]) => termos.join("\\cdot ") || "1";
  const produtoPolos = produto([
    ...polos.map((_, i) => `A_{${i + 1}}`),
    ...(integral ? ["A_c"] : []),
  ]);
  const produtoZeros = produto([
    ...zeros.map((_, i) => `B_{${i + 1}}`),
    `B_c${potencia}`,
  ]);
  const grupos = [
    ...polos.map((p, i) => ({
      ...p,
      anguloRotulo: `\\theta_{${i + 1}}`,
      distanciaRotulo: `A_{${i + 1}}`,
    })),
    ...zeros.map((p, i) => ({
      ...p,
      anguloRotulo: `\\phi_{${i + 1}}`,
      distanciaRotulo: `B_{${i + 1}}`,
    })),
  ];
  const agrupados = new Map<string, (typeof grupos)[number]>();
  grupos.forEach((p) => {
    const chave = `${p.tipo}:${p.vetor.re.toFixed(6)}:${p.vetor.im.toFixed(6)}`;
    const anterior = agrupados.get(chave);
    agrupados.set(
      chave,
      anterior
        ? {
            ...anterior,
            anguloRotulo: `${anterior.anguloRotulo}=${p.anguloRotulo}`,
            distanciaRotulo: `${anterior.distanciaRotulo}=${p.distanciaRotulo}`,
          }
        : p,
    );
  });
  const angulosDetalhados = [...agrupados.values()].map((p) =>
    anguloMemoriaParaLatex(
      p.anguloRotulo,
      p.vetor.re,
      p.vetor.im,
      p.angulo,
      4,
      false,
    ),
  );
  const distanciasDetalhadas = [...agrupados.values()].map(
    (p) =>
      `${p.distanciaRotulo}=\\sqrt{(${curto(p.vetor.re)})^2+(${curto(p.vetor.im)})^2}=${curto(p.distancia)}`,
  );
  const origem = polos.findIndex(
    (p) => Math.hypot(p.raiz.re, p.raiz.im) < 1e-8,
  );
  if (integral) {
    angulosDetalhados.push(
      origem >= 0
        ? `\\theta_c=\\theta_{${origem + 1}}`
        : anguloMemoriaParaLatex(
            "\\theta_c",
            r.sd.re,
            r.sd.im,
            r.faseIntegral,
            4,
            false,
          ),
    );
    distanciasDetalhadas.push(
      origem >= 0
        ? `A_c=|s_d|=A_{${origem + 1}}`
        : `A_c=|s_d|=\\sqrt{(${curto(r.sd.re)})^2+(${curto(r.sd.im)})^2}=${curto(distanciaOrigem)}`,
    );
  }
  distanciasDetalhadas.push(
    `B_c=|s_d+z|=\\sqrt{(${curto(r.sd.re + r.z)})^2+(${curto(r.sd.im)})^2}=${curto(distanciaZero)}`,
  );
  const resumo = (
    parcelas: typeof polos,
    simbolo: string,
    campo: "angulo" | "distancia",
  ) => {
    const iguais = new Map<string, string[]>();
    parcelas.forEach((p, i) => {
      const valor = curto(p[campo]);
      iguais.set(valor, [
        ...(iguais.get(valor) ?? []),
        `${simbolo}_{${i + 1}}`,
      ]);
    });
    return [...iguais]
      .map(
        ([valor, rotulos]) =>
          `${rotulos.join("=")}=${valor}${campo === "angulo" ? "^\\circ" : ""}`,
      )
      .join(",\\quad ");
  };
  const alfa = quantidade === 2 ? "2\\alpha" : "\\alpha";
  const faseNecessaria =
    somaPolos + (integral ? r.faseIntegral : 0) - somaZeros - r.faseGanho;
  const totalPolos = polos.reduce(
    (v, p) => v * p.distancia,
    integral ? distanciaOrigem : 1,
  );
  const totalZeros = zeros.reduce(
    (v, p) => v * p.distancia,
    distanciaZero ** quantidade,
  );
  return {
    angulosResumo: [
      resumo(polos, "\\theta", "angulo"),
      [
        resumo(zeros, "\\phi", "angulo"),
        integral ? `\\theta_c=${curto(r.faseIntegral)}^\\circ` : "",
      ]
        .filter(Boolean)
        .join(",\\quad "),
    ].filter(Boolean),
    angulosDetalhados,
    condicaoAngulo: `\\begin{aligned}${alfa}&\\equiv(${curto(faseNecessaria)}-180)^\\circ\\pmod{360^\\circ}\\\\\\alpha&=${curto(r.alfa)}^\\circ\\end{aligned}`,
    distanciasResumo: [
      [
        resumo(polos, "A", "distancia"),
        integral ? `A_c=|s_d|=${curto(distanciaOrigem)}` : "",
      ]
        .filter(Boolean)
        .join(",\\quad "),
      [resumo(zeros, "B", "distancia"), `B_c=|s_d+z|=${curto(distanciaZero)}`]
        .filter(Boolean)
        .join(",\\quad "),
    ].filter(Boolean),
    distanciasDetalhadas,
    ganhoSimbolico: `K_c=${fator === 1 ? "" : `${n(fator)}\\cdot`}\\frac{${produtoPolos}}{${produtoZeros}}`,
    ganho: `K_c=${fator === 1 ? "" : `${n(fator)}\\cdot`}\\frac{${produtoPolos}}{${produtoZeros}}=${n(r.Kc)}`,
    ganhoNumerico: `K_c=${n(fator)}\\cdot\\frac{${n(totalPolos)}}{${n(totalZeros)}}=${n(r.Kc)}`,
  };
}
