export interface Exemplo {
  id: string;
  nome: string;
  numeradorG: string;
  denominadorG: string;
  numeradorH: string;
  denominadorH: string;
  parteRealS0: number;
  parteImaginariaS0: number;
}

export const EXEMPLOS: Exemplo[] = [
  {
    id: "q1",
    nome: "Q1, G=K(s+1)/(s²+13s), H=1/s",
    numeradorG: "1 1",
    denominadorG: "1 13 0",
    numeradorH: "1",
    denominadorH: "1 0",
    parteRealS0: 4,
    parteImaginariaS0: 2,
  },
  {
    id: "q2",
    nome: "Q2, G=K(s²+0.2s+4)/(s³+2s²+2s+1), H=1/(s+2)",
    numeradorG: "1 0.2 4",
    denominadorG: "1 2 2 1",
    numeradorH: "1",
    denominadorH: "1 2",
    parteRealS0: -2.19,
    parteImaginariaS0: 2.89,
  },
  {
    id: "q3",
    nome: "Q3, G=K(s²+8s+17)/(s³+7s²+12s+10), H=(s+1)/(s+5)",
    numeradorG: "1 8 17",
    denominadorG: "1 7 12 10",
    numeradorH: "1 1",
    denominadorH: "1 5",
    parteRealS0: 0.23,
    parteImaginariaS0: 5,
  },
  {
    id: "q4",
    nome: "Q4, G=K(s+14)/(s²+5s+6), H=1/(s+7)",
    numeradorG: "1 14",
    denominadorG: "1 5 6",
    numeradorH: "1",
    denominadorH: "1 7",
    parteRealS0: -1,
    parteImaginariaS0: 8,
  },
  {
    id: "q5",
    nome: "Q5, G=K(s²+4s+5)/(s(s+5)), H=(s+1)/s",
    numeradorG: "1 4 5",
    denominadorG: "1 5 0",
    numeradorH: "1 1",
    denominadorH: "1 0",
    parteRealS0: 1,
    parteImaginariaS0: 0.6,
  },
  {
    id: "base",
    nome: "Base, G=(s+2)/(s²+4s), H=1/(s+1)",
    numeradorG: "1 2",
    denominadorG: "1 4 0",
    numeradorH: "1",
    denominadorH: "1 1",
    parteRealS0: 0,
    parteImaginariaS0: 0,
  },
];
