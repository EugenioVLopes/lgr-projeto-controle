import { useMemo } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import Formula from "../Formula";
import DicaProva from "../DicaProva";
import {
  detalharPartida,
  ehNumeroReal,
  formatarComplexo,
  subtrairComplexos,
} from "../../lib/lgr/index";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  partidas: Array<{ p: Complex; ang: number }>;
  polos: Complex[];
  zeros: Complex[];
  ramos: Complex[][];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

export default function Passo10Partida({
  partidas,
  polos,
  zeros,
  ramos,
  tema,
  corPolo,
  corZero,
}: Props) {
  const zerosCx = useMemo(
    () => zeros.filter((z) => !ehNumeroReal(z) && z.im > 1e-8),
    [zeros],
  );
  const detalheChegada = useMemo(() => {
    return zerosCx.map((zk) => {
      const parcelasZeros = zeros
        .filter((zj) => Math.hypot(zj.re - zk.re, zj.im - zk.im) > 1e-10)
        .map((zj) => {
          const v = subtrairComplexos(zk, zj);
          const ang = (Math.atan2(v.im, v.re) * 180) / Math.PI;
          return { ang, vetor: v };
        });
      const parcelasPolos = polos.map((pj) => {
        const v = subtrairComplexos(zk, pj);
        const ang = (Math.atan2(v.im, v.re) * 180) / Math.PI;
        return { ang, vetor: v };
      });
      const somaZ = parcelasZeros.reduce((a, x) => a + x.ang, 0);
      const somaP = parcelasPolos.reduce((a, x) => a + x.ang, 0);
      let theta = 180 - somaZ + somaP;
      theta = ((((theta + 180) % 360) + 360) % 360) - 180;
      return { zk, parcelasZeros, parcelasPolos, somaZ, somaP, theta };
    });
  }, [zerosCx, zeros, polos]);
  const traces = useMemo<Trace[]>(() => {
    const base: Trace[] = [];
    for (let j = 0; j < polos.length; j++) {
      base.push({
        x: ramos
          .map((r) => r[j]?.re)
          .filter((v): v is number => Number.isFinite(v)),
        y: ramos
          .map((r) => r[j]?.im)
          .filter((v): v is number => Number.isFinite(v)),
        mode: "lines",
        name: j === 0 ? "LGR" : undefined,
        line: { color: "#9ca3af", width: 1.5 },
      });
    }
    base.push({
      x: polos.map((p) => p.re),
      y: polos.map((p) => p.im),
      mode: "markers",
      name: "polos",
      marker: { color: corPolo, symbol: "x", size: 10 },
    });
    if (zeros.length) {
      base.push({
        x: zeros.map((z) => z.re),
        y: zeros.map((z) => z.im),
        mode: "markers",
        name: "zeros",
        marker: { color: corZero, symbol: "circle-open", size: 9 },
      });
    }
    const todos = [...polos, ...zeros];
    const spread = todos.length
      ? Math.max(
          Math.max(...todos.map((p) => p.re)) -
            Math.min(...todos.map((p) => p.re)),
          Math.max(...todos.map((p) => Math.abs(p.im))) * 2,
          1,
        )
      : 1;
    const L = spread * 0.3;
    partidas.forEach(({ p, ang }, i) => {
      const r = (ang * Math.PI) / 180;
      base.push({
        x: [p.re, p.re + L * Math.cos(r)],
        y: [p.im, p.im + L * Math.sin(r)],
        mode: "lines",
        name: i === 0 ? "partida" : undefined,
        line: { width: 2 },
      });
    });
    detalheChegada.forEach(({ zk, theta }, i) => {
      const r = (theta * Math.PI) / 180;
      base.push({
        x: [zk.re, zk.re + L * Math.cos(r)],
        y: [zk.im, zk.im + L * Math.sin(r)],
        mode: "lines",
        name: i === 0 && partidas.length === 0 ? "chegada" : undefined,
        line: { width: 2, dash: "dash" },
      });
    });
    return base;
  }, [ramos, polos, zeros, partidas, detalheChegada, corPolo, corZero]);
  if (!partidas.length && !zerosCx.length) {
    return (
      <details open>
        <summary>Passo 10, ângulos partida/chegada</summary>
        <p>
          <strong>Não ocorre</strong>
        </p>
        <p>
          <em>Sem polos/zeros complexos.</em>
        </p>
        <DicaProva dica="no polo complexo, soma os ângulos até os outros polos, soma até os zeros, faz 180 − somaPolos + somaZeros." />
      </details>
    );
  }
  return (
    <details open>
      <summary>Passo 10, ângulos de partida e chegada</summary>
      {partidas.length > 0 && (
        <>
          <p>
            <strong>Ângulos de partida (polos complexos)</strong>
          </p>
          <p>
            <strong>Fórmula:</strong>
          </p>
          <Formula
            latex={
              "\\theta_d = 180^{\\circ} - \\sum_{j \\neq k} \\angle(p_k - p_j) + \\sum_j \\angle(p_k - z_j)"
            }
            descricao="Formula partida"
          />
          {partidas.map(({ p: pk, ang }, idx) => {
            const det = detalharPartida(pk, polos, zeros);
            const somaAp = det.parcelasPolos.reduce((a, x) => a + x.ang, 0);
            const somaAz = det.parcelasZeros.reduce((a, x) => a + x.ang, 0);
            const tShow = ((ang % 360) + 360) % 360;
            const cShow = ((-ang % 360) + 360) % 360;
            return (
              <div key={idx}>
                <hr />
                <p>
                  <strong>Polo pk = {formatarComplexo(pk)}:</strong>
                </p>
                <p>Ângulos dos outros polos:</p>
                {det.parcelasPolos.length === 0 && (
                  <p>
                    <em>nenhum outro polo</em>
                  </p>
                )}
                {det.parcelasPolos.map((x, j) => (
                  <Formula
                    key={j}
                    latex={`\\angle(p_k - p_j) = ${x.ang.toFixed(2)}^{\\circ}`}
                    descricao={`Angulo ${x.origem}: ${x.vetorRe.toFixed(2)} ${x.vetorIm >= 0 ? "+" : ""}${x.vetorIm.toFixed(2)}j`}
                  />
                ))}
                {zeros.length > 0 && <p>Ângulos dos zeros:</p>}
                {det.parcelasZeros.map((x, j) => (
                  <Formula
                    key={j}
                    latex={`\\angle(p_k - z_j) = ${x.ang.toFixed(2)}^{\\circ}`}
                    descricao={`Zero ${x.origem}`}
                  />
                ))}
                <p>Somatórios:</p>
                <Formula
                  latex={`\\sum \\angle(p_k - p_j) = ${somaAp.toFixed(2)}^{\\circ}`}
                  descricao="Soma polos"
                />
                <Formula
                  latex={`\\sum \\angle(p_k - z_j) = ${somaAz.toFixed(2)}^{\\circ}`}
                  descricao="Soma zeros"
                />
                <p>Resultado:</p>
                <Formula
                  latex={`\\theta_d = 180^{\\circ} - (${somaAp.toFixed(2)}^{\\circ}) + (${somaAz.toFixed(2)}^{\\circ}) = ${tShow.toFixed(2)}^{\\circ}`}
                  descricao="Partida"
                />
                <Formula
                  latex={`\\text{Conjugado: } ${cShow.toFixed(2)}^{\\circ}`}
                  descricao="Conjugado"
                />
              </div>
            );
          })}
        </>
      )}
      {detalheChegada.length > 0 && (
        <>
          <p>
            <strong>Ângulos de chegada (zeros complexos)</strong>
          </p>
          <p>
            <strong>Fórmula:</strong>
          </p>
          <Formula
            latex={
              "\\theta_a = 180^{\\circ} - \\sum_{j \\neq k} \\angle(z_k - z_j) + \\sum_j \\angle(z_k - p_j)"
            }
            descricao="Chegada"
          />
          {detalheChegada.map((d, idx) => {
            const tShow = ((d.theta % 360) + 360) % 360;
            const cShow = ((-d.theta % 360) + 360) % 360;
            return (
              <div key={idx}>
                <hr />
                <p>
                  <strong>Zero zk = {formatarComplexo(d.zk)}:</strong>
                </p>
                <Formula
                  latex={`\\sum \\angle(z_k - z_j) = ${d.somaZ.toFixed(2)}^{\\circ}`}
                  descricao="Soma zeros"
                />
                <Formula
                  latex={`\\sum \\angle(z_k - p_j) = ${d.somaP.toFixed(2)}^{\\circ}`}
                  descricao="Soma polos"
                />
                <Formula
                  latex={`\\theta_a = 180^{\\circ} - (${d.somaZ.toFixed(2)}^{\\circ}) + (${d.somaP.toFixed(2)}^{\\circ}) = ${tShow.toFixed(2)}^{\\circ}`}
                  descricao="Chegada"
                />
                <Formula
                  latex={`\\text{Conjugado: } ${cShow.toFixed(2)}^{\\circ}`}
                  descricao="Conjugado"
                />
              </div>
            );
          })}
        </>
      )}
      <hr />
      <LgrPlot
        title="LGR - Ângulos de Partida/Chegada"
        descritoPor="desc-partida"
        tema={tema}
        traces={traces}
        foco={[...polos, ...zeros]}
      />
      <div className="mono" id="desc-partida">
        setas indicam direção de partida/chegada
      </div>
      <DicaProva dica="no polo complexo, soma os ângulos até os outros polos, soma até os zeros, faz 180 − somaPolos + somaZeros." />
    </details>
  );
}
