// Ponto de entrada do módulo LGR — re-exporta a API pública (nomes em pt-BR).
// Arquivos multi-passo trazem a distinção no cabeçalho:
// - passo09-cruzamento.ts → Passo 9a (cruzamento jw) + Passo 9b (Routh)
// - passo10-12-angulos.ts → Passo 10 (partida) + Passo 11 (critério) + Passo 12 (K)
// - ramos-lgr.ts → desenho dos ramos (apoio, fora dos 12 passos)
export type { Complex, BreakPoint, Cruzamento } from "./tipos";
export type { EquacaoMalhaAberta } from "./passo01-equacao";
export type { Assintotas } from "./passo07-assintotas";
export type { TesteAngulo } from "./passo10-12-angulos";

export {
  criarComplexo,
  somarComplexos,
  subtrairComplexos,
  multiplicarComplexos,
  dividirComplexos,
  moduloComplexo,
  anguloEmGraus,
  ehNumeroReal,
} from "./complexos";

export {
  analisarCoeficientes,
  multiplicarPolinomios,
  preencherZerosEsquerda,
  somarPolinomios,
  subtrairPolinomios,
  derivarPolinomio,
  avaliarPolinomioReal,
  avaliarPolinomioComplexo,
} from "./polinomios";

export { encontrarRaizes } from "./raizes";
export { combinarMalhaAberta } from "./passo01-equacao";
export { encontrarSegmentosEixoReal } from "./passo04-segmentos";
export { calcularAssintotas } from "./passo07-assintotas";
export { encontrarPontosBreakaway } from "./passo08-breakaway";
export {
  encontrarCruzamentosEixoImaginario,
  montarTabelaRouth,
} from "./passo09-cruzamento";
export { montarTabelaRouthSimbolica } from "./passo09-routh-simbolico";
export type { RouthSimbolica } from "./passo09-routh-simbolico";
export {
  calcularAnguloPartida,
  testarCriterioAngulo,
  calcularGanhoK,
} from "./passo10-12-angulos";
export { calcularRamosLgr } from "./ramos-lgr";
export {
  detalharAnguloS0,
  detalharGanhoS0,
  detalharPartida,
  equacaoDerivadaBreakaway,
} from "./memorias";
export {
  coeficienteLider,
  complexoParaLatex,
  fatorLinearParaLatex,
  fatoresParaLatex,
  formatarComplexo,
  formatarNumLatex,
  polinomioFatoradoParaLatex,
  polinomioParaTexto,
} from "./formatacao";
