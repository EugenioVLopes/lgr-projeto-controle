import { useEffect } from "react";

// Prepara a unidade ativa tanto pelo botão quanto por Ctrl+P. A primeira
// unidade expande os passos; a segunda imprime o relatório já montado.
export function useImpressaoPassos(unidade: 1 | 2) {
  useEffect(() => {
    let restaurar: (() => void) | undefined;
    function antesDeImprimir() {
      restaurar?.();
      const painel = document.getElementById(
        unidade === 1 ? "painel-lgr" : "painel-controladores",
      );
      if (!painel) return;
      const unidadeAnterior = document.body.dataset.impressaoUnidade;
      const tituloAnterior = document.title;
      document.body.dataset.impressaoUnidade = String(unidade);
      if (unidade === 2) {
        const paginas = painel.querySelectorAll(".pagina-resolucao");
        if (paginas.length)
          document.title =
            paginas.length > 2
              ? "Resolução da lista da segunda unidade"
              : `${paginas[0].querySelector("h2")?.textContent} · resolução`;
      }
      const passos = [...painel.querySelectorAll("details")];
      const abertos = passos.map((passo) => passo.open);
      painel.classList.add("impressao-passos");
      passos.forEach((passo) => {
        passo.open = true;
      });
      restaurar = () => {
        passos.forEach((passo, i) => {
          passo.open = abertos[i];
        });
        painel.classList.remove("impressao-passos");
        if (unidadeAnterior === undefined)
          delete document.body.dataset.impressaoUnidade;
        else document.body.dataset.impressaoUnidade = unidadeAnterior;
        document.title = tituloAnterior;
      };
    }
    function depoisDeImprimir() {
      restaurar?.();
      restaurar = undefined;
    }
    window.addEventListener("beforeprint", antesDeImprimir);
    window.addEventListener("afterprint", depoisDeImprimir);
    return () => {
      window.removeEventListener("beforeprint", antesDeImprimir);
      window.removeEventListener("afterprint", depoisDeImprimir);
      depoisDeImprimir();
    };
  }, [unidade]);
}
