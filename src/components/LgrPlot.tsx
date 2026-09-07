import { useEffect, useRef, useState } from "react";
import type PlotlyType from "plotly.js-basic-dist-min";

export interface Trace {
  x: number[];
  y: number[];
  mode?: string;
  name?: string;
  type?: string;
  marker?: unknown;
  line?: unknown;
}

let plotlyPromise: Promise<typeof PlotlyType> | null = null;
function carregarPlotly(): Promise<typeof PlotlyType> {
  if (!plotlyPromise) {
    plotlyPromise = import("plotly.js-basic-dist-min").then(
      (mod) => (mod.default ?? mod) as unknown as typeof PlotlyType,
    );
  }
  return plotlyPromise;
}

function lerVar(nome: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(nome)
    .trim();
  return v || fallback;
}

export default function LgrPlot({
  traces,
  title,
  descritoPor,
  tema,
}: {
  traces: Trace[];
  title: string;
  descritoPor?: string;
  tema?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [ehMobile, setEhMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 560 : false,
  );
  const [tickTema, setTickTema] = useState(0);
  const payload = JSON.stringify(traces);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 560px)");
    const onChange = () => setEhMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new MutationObserver(() => setTickTema((t) => t + 1));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let montado = true;
    const el = ref.current;
    setCarregando(true);
    setErro(null);
    carregarPlotly()
      .then((Plotly) => {
        if (!montado || !el) return;
        const atual = JSON.parse(payload) as Trace[];
        const surface = lerVar("--surface", "#ffffff");
        const ink = lerVar("--ink", "#0f172a");
        const muted = lerVar("--muted", "#475569");
        const grid = lerVar("--plot-grid", "#e2e8f0");
        const border = lerVar("--border", "#e2e8f0");
        Plotly.react(
          el as HTMLElement,
          atual as never,
          {
            title: { text: title, font: { size: 14, color: ink } },
            paper_bgcolor: surface,
            plot_bgcolor: surface,
            font: { color: ink },
            xaxis: {
              title: { text: "Real" },
              zeroline: true,
              zerolinecolor: border,
              gridcolor: grid,
              tickfont: { color: muted },
            },
            yaxis: {
              title: { text: "Imag (jω)" },
              zeroline: true,
              zerolinecolor: border,
              gridcolor: grid,
              tickfont: { color: muted },
              scaleanchor: "x",
            },
            margin: { l: 45, r: 15, t: 40, b: 40 },
            showlegend: true,
            legend: { orientation: ehMobile ? "v" : "h" },
          } as never,
          {
            responsive: true,
            displaylogo: false,
            displayModeBar: true,
            scrollZoom: true,
            useResizeHandler: true,
            toImageButtonOptions: { format: "png" },
          },
        );
        if (montado) setCarregando(false);
      })
      .catch(() => {
        if (montado) {
          setCarregando(false);
          setErro(
            "Gráfico indisponível offline. Recalcule para tentar de novo.",
          );
        }
      });
    return () => {
      montado = false;
      if (el && plotlyPromise) {
        const alvo: HTMLElement = el;
        carregarPlotly().then((Plotly) => {
          try {
            (Plotly as { purge?: (el: HTMLElement) => void }).purge?.(alvo);
          } catch {
            /* noop */
          }
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, payload, ehMobile, tema, tickTema]);

  return (
    <div
      ref={ref}
      role="figure"
      aria-label={`${title} — gráfico interativo com zoom e salvamento`}
      aria-describedby={descritoPor}
      style={{ width: "100%", height: "min(72vw, 340px)", minHeight: 240 }}
    >
      {carregando && <p className="plot-carregando">Carregando gráfico…</p>}
      {erro && (
        <p className="plot-carregando" role="status">
          {erro}
        </p>
      )}
    </div>
  );
}
