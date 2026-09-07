import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  polos: Complex[];
  ramos: Complex[][];
  Ks: number[];
  tema: "light" | "dark";
  corPolo: string;
}

export default function LgrCompleto({
  polos,
  ramos,
  Ks,
  tema,
  corPolo,
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
    ];
  }, [polos, ramos, corPolo]);
  const kMax = useMemo(
    () => (Ks.length ? Ks[Ks.length - 1].toFixed(1) : "-"),
    [Ks],
  );
  return (
    <details open>
      <summary>LGR completo</summary>
      <LgrPlot
        title="Lugar Geométrico das Raízes"
        descritoPor="desc-lgr"
        tema={tema}
        traces={traces}
      />
      <div className="mono" id="desc-lgr">
        {polos.length} ramos, K até {kMax}
      </div>
    </details>
  );
}
