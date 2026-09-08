import DicaProva from "../DicaProva";

export default function Passo06Simetria() {
  return (
    <details open>
      <summary>Passo 6, simetria</summary>
      <p>
        O LGR é simétrico ao eixo real porque os coeficientes são reais: toda
        raiz complexa aparece com seu conjugado.
      </p>
      <p className="ajuda">
        Se um ponto complexo pertence ao LGR, o conjugado também pertence. Não
        há conta neste passo.
      </p>
      <DicaProva dica="só fala que o desenho de cima espelha embaixo. Se achar um ponto complexo, o conjugado também é. Não tem conta." />
    </details>
  );
}
