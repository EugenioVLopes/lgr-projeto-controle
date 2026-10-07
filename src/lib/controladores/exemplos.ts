import type { EntradaProjeto } from "./index";
export const EXERCICIOS_CONTROLADORES: {
  id: string;
  titulo: string;
  enunciado: string;
  entrada: EntradaProjeto;
}[] = [
  {
    id: "q1",
    titulo: "Questão 1 · PD",
    enunciado:
      "Projetar PD para Mp ≤ 10% e tempo de acomodação de 5% inferior a 4 s.",
    entrada: {
      G: { num: [4, 16], den: [1, 4, 4, 0] },
      H: { num: [1], den: [1] },
      topologia: "PD",
      especificacao: { modo: "mpTs", mp: 10, ts: 4, faixa: 5, margem: 1 },
    },
  },
  {
    id: "q2",
    titulo: "Questão 2 · PD",
    enunciado:
      "Projetar PD para ζ = 0,7 e ωn = 0,5 rad/s. A planta original é instável.",
    entrada: {
      G: { num: [1], den: [10000, 0, -11772] },
      H: { num: [1], den: [1] },
      topologia: "PD",
      especificacao: { modo: "zetaWn", zeta: 0.7, wn: 0.5 },
    },
  },
  {
    id: "q3",
    titulo: "Questão 3 · PI",
    enunciado: "Projetar PI para obter polos de malha fechada em −4 ± 4j.",
    entrada: {
      G: { num: [5, 25, 20], den: [1, 4, 4] },
      H: { num: [0.2], den: [1, 1] },
      topologia: "PI",
      especificacao: { modo: "polo", re: -4, im: 4 },
    },
  },
  {
    id: "q4",
    titulo: "Questão 4 · PID",
    enunciado:
      "Projetar PID com zeros reais iguais para Mp ≤ 20% e tempo de acomodação de 2% inferior a 5 s.",
    entrada: {
      G: { num: [5], den: [1, 12, 22, 20] },
      H: { num: [0.4], den: [1] },
      topologia: "PID",
      especificacao: { modo: "mpTs", mp: 20, ts: 5, faixa: 2, margem: 1 },
    },
  },
];
