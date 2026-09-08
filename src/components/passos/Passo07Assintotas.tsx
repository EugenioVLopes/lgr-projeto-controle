import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula from "../Formula";
import DicaProva from "../DicaProva";
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
  const temAssintotas = sigma !== null;
  const sigmaFixo = sigma ?? 0;
  const latexResumo = useMemo(() => {
    if (sigma === null) return "";
    return `n_a = ${na},\\quad \\sigma_a = ${sigma.toFixed(4)},\\quad \\phi = ${angs.map((a) => `${a.toFixed(1)}^{\\circ}`).join(",\\;")}`;
  }, [na, sigma, angs]);
  const descResumo = useMemo(
    () => `Assíntotas com sigma a ${(sigma ?? 0).toFixed(4)}`,
    [sigma],
  );
  const somaPTexto = useMemo(
    () => polos.map((p) => p.re.toFixed(2)).join(" + ") || "0",
    [polos],
  );
  const somaZTexto = useMemo(
    () => (zeros.length ? zeros.map((z) => z.re.toFixed(2)).join(" + ") : "0"),
    [zeros],
  );
  const latexSomas = useMemo(
    () =>
      `\\sum p_i = ${somaPTexto} = ${somaP.toFixed(4)},\\quad \\sum z_i = ${somaZTexto} = ${somaZ.toFixed(4)}`,
    [somaPTexto, somaZTexto, somaP, somaZ],
  );
  const latexSigma = useMemo(
    () =>
      `\\sigma_a = \\frac{\\sum p_i - \\sum z_i}{n_p - n_z} = \\frac{${somaP.toFixed(4)} - (${somaZ.toFixed(4)})}{${na}} = ${sigmaFixo.toFixed(4)}`,
    [somaP, somaZ, na, sigmaFixo],
  );
  const textoPhi = useMemo(
    () =>
      `phi(q) = (2q+1)*180/na → ${angs.map((a, q) => `q=${q}: ${a.toFixed(1)}°`).join("; ")}`,
    [angs],
  );
  const latexPhi = useMemo(
    () =>
      `\\phi(q) = \\frac{(2q+1) \\cdot 180^{\\circ}}{${na}} \\to ${angs.map((a, q) => `q=${q}: ${a.toFixed(1)}^{\\circ}`).join(";\\;")}`,
    [angs, na],
  );
  const traces = useMemo<Trace[]>(() => {
    if (sigma === null) return [];
    const sig: number = sigma;
    return [
      {
        x: polos.map((p) => p.re),
        y: polos.map((p) => p.im),
        mode: "markers",
        name: "polos",
        marker: { color: corPolo, symbol: "x", size: 10 },
      },
      ...angs.map((a, i) => {
        const r = (a * Math.PI) / 180;
        const L = 20;
        return {
          x: [sig, sig + L * Math.cos(r)],
          y: [0, L * Math.sin(r)],
          mode: "lines",
          name: i === 0 ? "assíntotas" : undefined,
        };
      }),
    ];
  }, [polos, angs, sigma, corPolo]);

  return (
    <details open>
      <summary>Passo 7, assíntotas</summary>
      {!temAssintotas ? (
        <p>np ≤ nz → sem assíntotas.</p>
      ) : (
        <>
          <Formula
            id="desc-assintotas"
            latex={latexResumo}
            descricao={descResumo}
          />
          <div className="memoria">
            <Formula
              latex={latexSomas}
              descricao="Somas das partes reais de polos e zeros"
            />
            <Formula
              latex={latexSigma}
              descricao={`Centroide sigma a igual a ${sigmaFixo.toFixed(4)}`}
            />
            <Formula latex={latexPhi} descricao={textoPhi} />
          </div>
          <DicaProva dica="sigma_a = (soma dos polos - soma dos zeros) / (np - nz), usando só a parte real. Depois os ângulos são (2q+1)*180/na para q = 0..na-1. Desenha as retas saindo do sigma_a." />
          <LgrPlot
            title="Assíntotas"
            descritoPor="desc-assintotas"
            tema={tema}
            traces={traces}
          />
        </>
      )}
    </details>
  );
}
