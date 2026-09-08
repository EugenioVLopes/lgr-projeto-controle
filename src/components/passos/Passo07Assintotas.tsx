import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula from "../Formula";
import DicaProva from "../DicaProva";
import { encontrarSegmentosEixoReal } from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  polos: Complex[];
  zeros: Complex[];
  sigma: number | null;
  angs: number[];
  tema: "light" | "dark";
  corPolo: string;
}

export default function Passo07Assintotas({
  polos,
  zeros,
  sigma,
  angs,
  tema,
  corPolo,
}: Props) {
  const somaP = useMemo(() => polos.reduce((a, p) => a + p.re, 0), [polos]);
  const somaZ = useMemo(() => zeros.reduce((a, z) => a + z.re, 0), [zeros]);
  const na = polos.length - zeros.length;
  const segs = useMemo(
    () => encontrarSegmentosEixoReal(zeros, polos),
    [zeros, polos],
  );
  const termosP = useMemo(
    () => polos.map((p) => `(${p.re.toFixed(4)})`).join(" + ") || "0",
    [polos],
  );
  const termosZ = useMemo(
    () =>
      zeros.length ? zeros.map((z) => `(${z.re.toFixed(4)})`).join(" + ") : "0",
    [zeros],
  );
  const traces = useMemo<Trace[]>(() => {
    if (sigma === null) return [];
    const sig: number = sigma;
    const base: Trace[] = [
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { color: corPolo, symbol: "x", size: 10 },
      },
    ];
    const xs = [...polos, ...zeros].map((p) => p.re);
    const baseMin = xs.length ? Math.min(...xs) : 0;
    const xMin = baseMin - 3;
    segs.forEach(([a, b], i) => {
      base.push({
        x: [Number.isFinite(a) ? a : xMin, Number.isFinite(b) ? b : sig],
        y: [0, 0],
        mode: "lines",
        name: i === 0 ? "segmentos" : undefined,
        line: { width: 5 },
      });
    });
    angs.forEach((a, i) => {
      const r = (a * Math.PI) / 180;
      const L = 20;
      base.push({
        x: [sig, sig + L * Math.cos(r)],
        y: [0, L * Math.sin(r)],
        mode: "lines",
        name: i === 0 ? "assíntotas" : undefined,
      });
    });
    base.push({
      x: [sig],
      y: [0],
      mode: "markers",
      name: `centroide (${sig.toFixed(2)})`,
      marker: { symbol: "cross", size: 12 },
    });
    return base;
  }, [polos, zeros, angs, sigma, segs, corPolo]);
  if (sigma === null || na <= 1) {
    return (
      <details open>
        <summary>Passo 7, assíntotas</summary>
        <Formula
          latex={`n_p = ${polos.length},\\quad n_z = ${zeros.length}`}
          descricao="Numero de polos e zeros"
        />
        {na <= 0 ? (
          <p>n_p = n_z → sem assíntotas.</p>
        ) : (
          <p>Não é necessário, pois: (nₚ − n_z) = 1.</p>
        )}
        <DicaProva dica="sigma_a = (soma dos polos - soma dos zeros) / (np - nz), usando só a parte real. Depois os ângulos são (2q+1)*180/na para q = 0..na-1." />
      </details>
    );
  }
  return (
    <details open>
      <summary>Passo 7, assíntotas</summary>
      <p>
        <strong>Número de assíntotas:</strong>
      </p>
      <Formula
        latex={`n_a = n_p - n_z = ${polos.length} - ${zeros.length} = ${na}`}
        descricao="Numero de assintotas"
      />
      <hr />
      <p>
        <strong>Centroide (ponto de encontro das assíntotas):</strong>
      </p>
      <Formula
        display
        latex={"\\sigma_a = \\frac{S_p - S_z}{n_p - n_z}"}
        descricao="Formula do centroide: Sp menos Sz sobre np menos nz"
      />
      <p className="ajuda">
        Sp = soma das partes reais dos polos, Sz = soma das partes reais dos
        zeros (ver linhas abaixo).
      </p>
      <p>Soma das partes reais dos polos:</p>
      <Formula
        display
        latex={`S_p = ${termosP} = ${somaP.toFixed(4)}`}
        descricao="Sp soma das partes reais dos polos"
      />
      {zeros.length ? (
        <>
          <p>Soma das partes reais dos zeros:</p>
          <Formula
            display
            latex={`S_z = ${termosZ} = ${somaZ.toFixed(4)}`}
            descricao="Sz soma das partes reais dos zeros"
          />
        </>
      ) : (
        <>
          <p>Sem zeros finitos:</p>
          <Formula
            display
            latex="S_z = 0"
            descricao="Sem zeros finitos Sz zero"
          />
        </>
      )}
      <p>Substituindo:</p>
      <Formula
        display
        latex={`\\sigma_a = \\frac{(${somaP.toFixed(4)}) - (${somaZ.toFixed(4)})}{${na}} = \\frac{${(somaP - somaZ).toFixed(4)}}{${na}} = ${sigma.toFixed(4)}`}
        descricao={`Centroide sigma a igual a ${sigma.toFixed(4)}`}
      />
      <hr />
      <p>
        <strong>Ângulos das assíntotas:</strong>
      </p>
      <Formula
        latex={`\\phi_a = \\frac{(2q + 1) \\cdot 180^{\\circ}}{n_a} = \\frac{(2q + 1) \\cdot 180^{\\circ}}{${na}}`}
        descricao="Formula dos angulos"
      />
      <p>Calculando para cada q:</p>
      {angs.map((a, q) => (
        <Formula
          key={q}
          latex={`q = ${q}:\\quad \\phi_a = \\frac{(2 \\cdot ${q} + 1) \\cdot 180^{\\circ}}{${na}} = \\frac{${2 * q + 1} \\cdot 180^{\\circ}}{${na}} = ${a.toFixed(1)}^{\\circ}`}
          descricao={`Angulo ${q} igual a ${a.toFixed(1)} graus`}
        />
      ))}
      <hr />
      <LgrPlot
        title="LGR - Assíntotas"
        descritoPor="desc-assintotas"
        tema={tema}
        traces={traces}
      />
      <div className="mono" id="desc-assintotas">
        n_a = {na}, sigma_a = {sigma.toFixed(4)}, ângulos{" "}
        {angs.map((a) => `${a.toFixed(1)}°`).join("; ")}
      </div>
      <DicaProva dica="sigma_a = (soma dos polos - soma dos zeros) / (np - nz), usando só a parte real. Depois os ângulos são (2q+1)*180/na para q = 0..na-1. Desenha as retas saindo do sigma_a." />
    </details>
  );
}
