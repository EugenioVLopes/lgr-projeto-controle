export type Tema = "light" | "dark";

export interface CoresPlot {
  surface: string;
  ink: string;
  muted: string;
  grid: string;
  border: string;
}

// Espelha as variáveis CSS de src/index.css (:root e [data-theme="dark"])
// para o plot reagir à prop `tema` sem ler o DOM a cada render.
export const CORES_POR_TEMA: Record<Tema, CoresPlot> = {
  light: {
    surface: "#ffffff",
    ink: "#0f172a",
    muted: "#475569",
    grid: "#e2e8f0",
    border: "#e2e8f0",
  },
  dark: {
    surface: "#111a2e",
    ink: "#e8eef7",
    muted: "#b6c2d4",
    grid: "#243150",
    border: "#243150",
  },
};

export function coresDoTema(tema: Tema): CoresPlot {
  return CORES_POR_TEMA[tema];
}
