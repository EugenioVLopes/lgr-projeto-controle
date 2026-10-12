// Usa o mesmo núcleo de cálculo da aplicação; não replica as fórmulas.
import { register } from "node:module";
register("./loader-typescript.mjs", import.meta.url);
const { resolverListaParaEntrega, requisitosImpressao } =
  await import("../src/lib/controladores/impressao.ts");

const lista = process.argv[2] ?? "lista1";
if (lista !== "lista1" && lista !== "lista2")
  throw new Error("Uso: node scripts/exportar-lista.mjs [lista1|lista2]");
const questoes = resolverListaParaEntrega(lista).map((resolucao) => {
  const { projeto, resposta } = resolucao;
  const entrada = projeto.entrada;
  if (resposta.status !== "ok")
    throw new Error(`${resolucao.id}: simulação inválida`);
  // A segunda lista registra a reprovação do PID inicial. Não transforma
  // um projeto calculado em uma resolução que atende ao enunciado.
  if (lista === "lista1" && entrada.especificacao.modo === "mpTs") {
    const e = entrada.especificacao;
    const ts = e.faixa === 2 ? resposta.ts2 : resposta.ts5;
    if (resposta.mp === null || resposta.mp > e.mp || ts === null || ts >= e.ts)
      throw new Error(
        `${resolucao.id}: o projeto final não atende ao enunciado`,
      );
  }
  if (resolucao.discretizacao?.erro)
    throw new Error(`${resolucao.id}: ${resolucao.discretizacao.erro}`);
  return lista === "lista2"
    ? { ...resolucao, requisitos: requisitosImpressao(resolucao) }
    : resolucao;
});
process.stdout.write(
  JSON.stringify(
    {
      fonte:
        lista === "lista1"
          ? "lista.pdf · DCA-3701.0 · 2026.2 · 1º Exercício da 2ª Unidade"
          : "docs/lista2.pdf · DCA-3701.0 · 2026.2 · 2º Exercício da 2ª Unidade",
      autor: "Eugenio Lopes",
      metodo:
        "Núcleo TypeScript do app; degrau unitário, horizonte 20 s, 4001 amostras",
      questoes,
    },
    null,
    2,
  ),
);
