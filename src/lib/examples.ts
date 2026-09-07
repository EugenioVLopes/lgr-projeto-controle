export interface Exemplo {
  id: string;
  nome: string;
  nG: string;
  dG: string;
  nH: string;
  dH: string;
  sr: number;
  si: number;
}

export const EXEMPLOS: Exemplo[] = [
  {
    id: "q1",
    nome: "Q1, G=K(s+1)/(s²+13s), H=1/s",
    nG: "1 1",
    dG: "1 13 0",
    nH: "1",
    dH: "1 0",
    sr: 4,
    si: 2,
  },
  {
    id: "q2",
    nome: "Q2, G=K(s²+0.2s+4)/(s³+2s²+2s+1), H=1/(s+2)",
    nG: "1 0.2 4",
    dG: "1 2 2 1",
    nH: "1",
    dH: "1 2",
    sr: -2.19,
    si: 2.89,
  },
  {
    id: "q3",
    nome: "Q3, G=K(s²+8s+17)/(s³+7s²+12s+10), H=(s+1)/(s+5)",
    nG: "1 8 17",
    dG: "1 7 12 10",
    nH: "1 1",
    dH: "1 5",
    sr: 0.23,
    si: 5,
  },
  {
    id: "q4",
    nome: "Q4, G=K(s+14)/(s²+5s+6), H=1/(s+7)",
    nG: "1 14",
    dG: "1 5 6",
    nH: "1",
    dH: "1 7",
    sr: -1,
    si: 8,
  },
  {
    id: "q5",
    nome: "Q5, G=K(s²+4s+5)/(s(s+5)), H=(s+1)/s",
    nG: "1 4 5",
    dG: "1 5 0",
    nH: "1 1",
    dH: "1 0",
    sr: 1,
    si: 0.6,
  },
  {
    id: "base",
    nome: "Base, G=(s+2)/(s²+4s), H=1/(s+1)",
    nG: "1 2",
    dG: "1 4 0",
    nH: "1",
    dH: "1 1",
    sr: 0,
    si: 0,
  },
];
