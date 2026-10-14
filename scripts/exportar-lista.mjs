// Usa o mesmo núcleo de cálculo da aplicação; não replica as fórmulas.
import { register } from "node:module";
register("./loader-typescript.mjs", import.meta.url);
const { resolverListaParaEntrega, requisitosImpressao } =
  await import("../src/lib/controladores/impressao.ts");

const lista = process.argv[2] ?? "lista1";
if (lista !== "lista1" && lista !== "lista2")
  throw new Error("Uso: node scripts/exportar-lista.mjs [lista1|lista2]");
const questoes = resolverListaParaEntrega(lista).map((resolucao) => {
  const { resposta } = resolucao;
  if (resposta.status !== "ok")
    throw new Error(`${resolucao.id}: simulação inválida`);
  if (resolucao.discretizacao?.erro)
    throw new Error(`${resolucao.id}: ${resolucao.discretizacao.erro}`);
  return { ...resolucao, requisitos: requisitosImpressao(resolucao) };
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
