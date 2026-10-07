// Usa o mesmo núcleo de cálculo da aplicação; não replica as fórmulas.
import { register } from "node:module";
register("./loader-typescript.mjs", import.meta.url);
const { resolverListaParaEntrega } =
  await import("../src/lib/controladores/impressao.ts");

const questoes = resolverListaParaEntrega().map((resolucao) => {
  const { projeto, resposta } = resolucao;
  const entrada = projeto.entrada;
  if (resposta.status !== "ok")
    throw new Error(`${resolucao.id}: simulação inválida`);
  if (entrada.especificacao.modo === "mpTs") {
    const e = entrada.especificacao;
    const ts = e.faixa === 2 ? resposta.ts2 : resposta.ts5;
    if (resposta.mp === null || resposta.mp > e.mp || ts === null || ts >= e.ts)
      throw new Error(
        `${resolucao.id}: o projeto final não atende ao enunciado`,
      );
  }
  return resolucao;
});
process.stdout.write(
  JSON.stringify(
    {
      fonte: "lista.pdf · DCA-3701.0 · 2026.2 · 1º Exercício da 2ª Unidade",
      autor: "Eugenio Lopes",
      metodo:
        "Núcleo TypeScript do app; degrau unitário, horizonte 20 s, 4001 amostras",
      questoes,
    },
    null,
    2,
  ),
);
