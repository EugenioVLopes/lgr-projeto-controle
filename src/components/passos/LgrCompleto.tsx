import { useEffect, useMemo, useRef, useState } from "react";
import LgrPlot, { type Trace } from "../LgrPlot";
import { coresDoTema } from "../../lib/plotTema";
import type { Complex } from "../../lib/lgr/index";

interface Props {
  polos: Complex[];
  zeros: Complex[];
  ramos: Complex[][];
  Ks: number[];
  tema: "light" | "dark";
  corPolo: string;
  corZero: string;
}

function formatarK(k: number): string {
  if (!Number.isFinite(k)) return "—";
  if (k < 1) return k.toFixed(3);
  if (k < 10) return k.toFixed(2);
  if (k < 100) return k.toFixed(1);
  return k.toFixed(0);
}

function formatarRaiz(p: Complex): string {
  const re = Number.isFinite(p.re) ? p.re.toFixed(2) : "—";
  const im = Number.isFinite(p.im) ? Math.abs(p.im).toFixed(2) : "—";
  const sinal = p.im < 0 ? "−" : "+";
  return `${re} ${sinal} ${im}j`;
}

export default function LgrCompleto({
  polos,
  zeros,
  ramos,
  Ks,
  tema,
  corPolo,
  corZero,
}: Props) {
  const total = Ks.length;
  const [indiceK, setIndiceK] = useState(0);
  const [tocando, setTocando] = useState(false);
  const rafRef = useRef<number | null>(null);

  const seguro = total > 0 ? Math.min(Math.max(indiceK, 0), total - 1) : 0;
  const kAtual = total > 0 ? Ks[seguro] : NaN;
  const pontosK = total > 0 ? (ramos[seguro] ?? []) : [];
  const tinta = coresDoTema(tema).ink;

  const traces = useMemo<Trace[]>(() => {
    const indiceSeguro =
      Ks.length > 0 ? Math.min(Math.max(indiceK, 0), Ks.length - 1) : 0;
    const pontosAtuais = Ks.length > 0 ? (ramos[indiceSeguro] ?? []) : [];
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
    const base: Trace[] = [
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
    if (Ks.length > 0) {
      const xs: number[] = [];
      const ys: number[] = [];
      for (const p of pontosAtuais) {
        if (Number.isFinite(p.re) && Number.isFinite(p.im)) {
          xs.push(p.re);
          ys.push(p.im);
        }
      }
      base.push({
        x: xs,
        y: ys,
        mode: "markers",
        name: "K atual",
        marker: {
          color: tinta,
          symbol: "diamond",
          size: 11,
          line: { color: "#ffffff", width: 1.5 },
        },
      });
    }
    return base;
  }, [polos, zeros, ramos, Ks, indiceK, corPolo, corZero, tinta]);

  const kMax = useMemo(
    () => (Ks.length ? Ks[Ks.length - 1].toFixed(1) : "-"),
    [Ks],
  );

  function pararAnimacao(): void {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setTocando(false);
  }

  useEffect(() => {
    if (!tocando || total < 2) return;
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIndiceK(total - 1);
      setTocando(false);
      return;
    }
    const DURACAO = 5200;
    const inicio = performance.now();
    const origem = 0;
    let ultimoEmitido = origem;
    function passo(agora: number): void {
      const t = Math.min((agora - inicio) / DURACAO, 1);
      const suavizado = 1 - Math.pow(1 - t, 3);
      const alvo = Math.round(origem + suavizado * (total - 1 - origem));
      if (Math.abs(alvo - ultimoEmitido) >= 2 || t >= 1) {
        ultimoEmitido = alvo;
        setIndiceK(alvo);
      }
      if (t < 1) {
        rafRef.current = requestAnimationFrame(passo);
      } else {
        rafRef.current = null;
        setTocando(false);
      }
    }
    rafRef.current = requestAnimationFrame(passo);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [tocando, total]);

  useEffect(() => () => pararAnimacao(), []);
  useEffect(() => {
    setIndiceK(0);
    setTocando(false);
  }, [total, polos.length, zeros.length]);

  const leituraK =
    total > 0
      ? `K = ${formatarK(kAtual)} • ${pontosK.filter((p) => Number.isFinite(p.re)).length} raízes • s1 = ${pontosK.length ? formatarRaiz(pontosK[0]) : "—"}`
      : `${polos.length} ramos, K até ${kMax}`;

  return (
    <details open>
      <summary>LGR completo</summary>
      <LgrPlot
        title="Lugar Geométrico das Raízes"
        descritoPor="desc-lgr"
        tema={tema}
        traces={traces}
        foco={[...polos, ...zeros]}
      />
      <div className="k-explorer no-print">
        <label htmlFor="explorador-k">
          Explorar ganho K — arraste para ver as raízes sobre os ramos
        </label>
        <div className="k-controles">
          <input
            id="explorador-k"
            type="range"
            min={0}
            max={Math.max(total - 1, 0)}
            step={1}
            value={seguro}
            disabled={total < 2}
            aria-describedby="desc-lgr"
            aria-valuetext={
              total > 0 ? `K igual a ${formatarK(kAtual)}` : "sem ganhos"
            }
            onChange={(e) => {
              pararAnimacao();
              setIndiceK(Number(e.target.value));
            }}
          />
          <button
            type="button"
            className="k-botao"
            disabled={total < 2}
            aria-pressed={tocando}
            onClick={() => {
              if (tocando) {
                pararAnimacao();
                return;
              }
              if (seguro >= total - 1) setIndiceK(0);
              setTocando(true);
            }}
          >
            {tocando ? "Pausar" : "Animar K"}
          </button>
        </div>
      </div>
      <div className="mono k-leitura" id="desc-lgr" aria-live="polite">
        {leituraK}
      </div>
    </details>
  );
}
