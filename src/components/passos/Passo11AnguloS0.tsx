import { useMemo } from "react";
import LgrPlot from "../LgrPlot";
import Formula, { complexoParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import { detalharAnguloS0, formatarComplexo } from "../../lib/lgr/index";
import type { Complex, TesteAngulo } from "../../lib/lgr/index";

interface Props {
  s0: Complex;
  t: TesteAngulo;
  polos: Complex[];
  zeros: Complex[];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

export default function Passo11AnguloS0({
  s0,
  t,
  polos,
  zeros,
  tema,
  corPolo,
  corZero,
}: Props) {
  const memoria = useMemo(() => {
    const det = detalharAnguloS0(s0, zeros, polos);
    const lp = det.parcelasPolos
      .map(
        (x) =>
          `∠(s0−${x.origem})=∠(${x.vetorRe.toFixed(2)}${x.vetorIm >= 0 ? "+" : ""}${x.vetorIm.toFixed(2)}j)=${x.ang.toFixed(1)}°`,
      )
      .join("\n");
    const lz = det.parcelasZeros.length
      ? det.parcelasZeros
          .map(
            (x) =>
              `∠(s0−${x.origem})=∠(${x.vetorRe.toFixed(2)}${x.vetorIm >= 0 ? "+" : ""}${x.vetorIm.toFixed(2)}j)=${x.ang.toFixed(1)}°`,
          )
          .join("\n")
      : "sem zeros finitos";
    const somaP = det.parcelasPolos.reduce((a, x) => a + x.ang, 0);
    const somaZ = det.parcelasZeros.reduce((a, x) => a + x.ang, 0);
    return `${lp}\n--- zeros ---\n${lz}\n∑polos=${somaP.toFixed(2)}° ∑zeros=${somaZ.toFixed(2)}° → ∠=${t.ang.toFixed(2)}° → norm ${t.norm.toFixed(2)}°`;
  }, [s0, zeros, polos, t]);
  const latex = useMemo(
    () =>
      `s_0 = ${complexoParaLatex(s0)},\\quad \\angle P(s_0) = ${t.norm.toFixed(2)}^{\\circ}`,
    [s0, t],
  );
  const desc = useMemo(
    () => `Ponto s0 com ângulo ${t.norm.toFixed(2)} graus`,
    [t],
  );
  const traces = useMemo(
    () => [
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { color: corPolo, symbol: "x", size: 10 },
      },
      {
        x: [s0.re],
        y: [s0.im],
        mode: "markers",
        name: "s0",
        marker: {
          color: t.pertence ? corZero : corPolo,
          size: 13,
          symbol: "star",
        },
      },
    ],
    [polos, s0, t.pertence, corPolo, corZero],
  );
  const rotuloS0 = useMemo(() => formatarComplexo(s0), [s0]);
  return (
    <details open>
      <summary>Passo 11, critério do ângulo em s0={rotuloS0}</summary>
      <p className={t.pertence ? "badge-ok" : "badge-warn"}>
        {t.pertence ? "PERTENCE ao LGR" : "NÃO pertence"} (∠={t.norm.toFixed(2)}
        °, alvo ±180°)
      </p>
      <LgrPlot
        title="Teste s0"
        descritoPor="desc-s0"
        tema={tema}
        traces={traces}
      />
      <div className="memoria">
        <p className="memoria-titulo">Como cheguei aqui</p>
        <div className="mono">{memoria}</div>
      </div>
      <Formula id="desc-s0" latex={latex} descricao={desc} />
      <DicaProva dica="para cada polo/zero calcula o vetor s0−p (diferença real e imag) e o ângulo com arctan2(Im,Re). Soma zeros menos soma polos. Normaliza para ±180°. Se der ±180° (±5°) pertence ao LGR." />
    </details>
  );
}
