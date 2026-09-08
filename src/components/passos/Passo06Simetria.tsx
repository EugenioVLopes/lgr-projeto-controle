import { useMemo } from "react";
import DicaProva from "../DicaProva";
import LgrPlot, { type Trace } from "../LgrPlot";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  polos: Complex[];
  zeros: Complex[];
  ramos: Complex[][];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

export default function Passo06Simetria({
  polos,
  zeros,
  ramos,
  tema,
  corPolo,
  corZero,
}: Props) {
  const traces = useMemo<Trace[]>(() => {
    const linhas = Array.from({ length: polos.length }, (_, j) => ({
      x: ramos
        .map((r) => r[j]?.re)
        .filter((v): v is number => Number.isFinite(v)),
      y: ramos
        .map((r) => r[j]?.im)
        .filter((v): v is number => Number.isFinite(v)),
      mode: "lines",
      name: `ramo ${j + 1}`,
    }));
    return [
      ...linhas,
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { color: corPolo, symbol: "x", size: 10 },
      },
      {
        x: zeros.map((z) => z.re),
        y: zeros.map((z) => z.im),
        mode: "markers",
        name: "zeros",
        marker: { color: corZero, symbol: "circle-open", size: 10 },
      },
    ];
  }, [polos, zeros, ramos, corPolo, corZero]);

  return (
    <details open>
      <summary>Passo 6, simetria</summary>
      <p>
        O LGR é simétrico ao eixo real porque os coeficientes são reais: toda
        raiz complexa aparece com seu conjugado.
      </p>
      <LgrPlot
        title="LGR — simetria ao eixo real"
        descritoPor="desc-simetria"
        tema={tema}
        traces={traces}
        foco={[...polos, ...zeros]}
      />
      <div className="mono" id="desc-simetria">
        {polos.length} ramos espelhados no eixo real
      </div>
      <p className="ajuda">
        Se um ponto complexo pertence ao LGR, o conjugado também pertence. Não
        há conta neste passo.
      </p>
      <DicaProva dica="só fala que o desenho de cima espelha embaixo. Se achar um ponto complexo, o conjugado também é. Não tem conta." />
    </details>
  );
}
