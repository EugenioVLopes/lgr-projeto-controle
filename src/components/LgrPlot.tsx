import { useEffect, useRef, useState } from "react";
import type { Config, Data, Layout } from "plotly.js";
import type PlotlyType from "plotly.js-basic-dist-min";
import { coresDoTema, type Tema } from "../lib/plotTema";

export type Trace = Data;

let plotlyPromise: Promise<typeof PlotlyType> | null = null;
function carregarPlotly(): Promise<typeof PlotlyType> {
  if (!plotlyPromise) {
    plotlyPromise = import("plotly.js-basic-dist-min").then(
      (mod) => mod.default,
    );
  }
  return plotlyPromise;
}

export default function LgrPlot({
  traces,
  title,
  descritoPor,
  tema = "light",
}: {
  traces: Trace[];
  title: string;
  descritoPor?: string;
  tema?: Tema;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [ehMobile, setEhMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 560 : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 560px)");
    const onChange = () => setEhMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Limpeza ao desmontar: libera o gráfico do DOM.
  useEffect(() => {
    const alvo = ref.current;
    return () => {
      if (alvo && plotlyPromise) {
        void plotlyPromise
          .then((Plotly) => {
            try {
              Plotly.purge(alvo);
            } catch {}
          })
          .catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    let montado = true;
    const el = ref.current;
    if (!el) return;
    setCarregando(true);
    setErro(null);
    void carregarPlotly()
      .then((Plotly) => {
        if (!montado) return;
        const cores = coresDoTema(tema);
        const layout: Partial<Layout> = {
          autosize: true,
          title: { text: title, font: { size: 14, color: cores.ink } },
          paper_bgcolor: cores.surface,
          plot_bgcolor: cores.surface,
          font: { color: cores.ink },
          xaxis: {
            title: { text: "Real" },
            zeroline: true,
            zerolinecolor: cores.border,
            gridcolor: cores.grid,
            tickfont: { color: cores.muted },
          },
          yaxis: {
            title: { text: "Imag (jω)" },
            zeroline: true,
            zerolinecolor: cores.border,
            gridcolor: cores.grid,
            tickfont: { color: cores.muted },
            scaleanchor: "x",
          },
          margin: { l: 45, r: 15, t: 40, b: 40 },
          showlegend: true,
          legend: { orientation: ehMobile ? "v" : "h" },
        };
        const config: Partial<Config> = {
          responsive: true,
          displaylogo: false,
          displayModeBar: true,
          scrollZoom: true,
          toImageButtonOptions: { format: "png" },
        };
        void Plotly.react(el, traces, layout, config);
        setCarregando(false);
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
    };
  }, [traces, title, ehMobile, tema]);

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
