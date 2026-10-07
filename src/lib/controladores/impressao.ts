import { projetarControlador, type ResultadoProjeto } from "./index";
import { EXERCICIOS_CONTROLADORES } from "./exemplos";
import { simularDegrau, type RespostaDegrau } from "./simulacao";

export interface ResolucaoImpressao {
  id: string;
  titulo: string;
  enunciado: string;
  projeto: ResultadoProjeto;
  resposta: RespostaDegrau;
  inicial?: { projeto: ResultadoProjeto; resposta: RespostaDegrau };
}
export interface RequisitoImpressao {
  descricao: string;
  resultado: string;
  atende: boolean;
}
export const numeroImpresso = (x: number | null, unidade = "") =>
  x === null
    ? "Não confirmado"
    : `${new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 6,
      }).format(x)}${unidade}`;

export function criarResolucaoImpressao(
  projeto: ResultadoProjeto,
  exercicioId?: string,
): ResolucaoImpressao {
  const entrada = projeto.entrada;
  const esp = entrada.especificacao;
  const exemplo = EXERCICIOS_CONTROLADORES.find((e) => {
    const esperado = structuredClone(e.entrada);
    const atual = structuredClone(entrada);
    if (atual.especificacao.modo === "mpTs") atual.especificacao.margem = 1;
    return (
      e.id === exercicioId && JSON.stringify(esperado) === JSON.stringify(atual)
    );
  });
  const pedido =
    esp.modo === "mpTs"
      ? `Mp ≤ ${numeroImpresso(esp.mp)}% e tempo de acomodação, na faixa de ${esp.faixa}%, inferior a ${numeroImpresso(esp.ts)} s`
      : esp.modo === "zetaWn"
        ? `fator de amortecimento ζ = ${numeroImpresso(esp.zeta)} e frequência natural ωn = ${numeroImpresso(esp.wn)} rad/s`
        : `o par de polos de malha fechada em ${numeroImpresso(esp.re)} ± ${numeroImpresso(Math.abs(esp.im))}j`;
  return {
    id: exemplo?.id ?? "manual",
    titulo: exemplo?.titulo ?? `Projeto manual · ${entrada.topologia}`,
    enunciado: `Projetar ${entrada.topologia}${entrada.topologia === "PID" ? " com zeros reais e iguais" : ""} para ${pedido}.`,
    projeto,
    resposta: simularDegrau(projeto.fechada, 20),
  };
}

// Compartilhado pela impressão no navegador e pelo gerador das entregas.
export function resolverListaParaEntrega(): ResolucaoImpressao[] {
  return EXERCICIOS_CONTROLADORES.map((exercicio, i) => {
    const entrada = structuredClone(exercicio.entrada);
    let inicial: ResolucaoImpressao["inicial"];
    if (i === 0 && entrada.especificacao.modo === "mpTs") {
      const projeto = projetarControlador(structuredClone(entrada));
      inicial = { projeto, resposta: simularDegrau(projeto.fechada, 20) };
      entrada.especificacao.margem = 1.1;
    }
    return {
      ...criarResolucaoImpressao(projetarControlador(entrada), exercicio.id),
      inicial,
    };
  });
}

export function requisitosImpressao({
  projeto: p,
  resposta: s,
}: ResolucaoImpressao): RequisitoImpressao[] {
  const e = p.entrada.especificacao;
  const perto = (a: number, b: number) =>
    Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b));
  const polo = p.polos.reduce((a, b) =>
    Math.hypot(a.re - p.sd.re, a.im - p.sd.im) <=
    Math.hypot(b.re - p.sd.re, b.im - p.sd.im)
      ? a
      : b,
  );
  const wn = Math.hypot(polo.re, polo.im);
  const criterios: RequisitoImpressao[] =
    e.modo === "mpTs"
      ? [
          {
            descricao: `Sobressinal ≤ ${numeroImpresso(e.mp)}%`,
            resultado: numeroImpresso(s.mp, "%"),
            atende: s.status === "ok" && s.mp !== null && s.mp <= e.mp,
          },
          {
            descricao: `Acomodação de ${e.faixa}% < ${numeroImpresso(e.ts)} s`,
            resultado: numeroImpresso(e.faixa === 2 ? s.ts2 : s.ts5, " s"),
            atende:
              s.status === "ok" &&
              (e.faixa === 2 ? s.ts2 : s.ts5) !== null &&
              (e.faixa === 2 ? s.ts2! : s.ts5!) < e.ts,
          },
        ]
      : e.modo === "zetaWn"
        ? [
            {
              descricao: `Fator de amortecimento ζ = ${numeroImpresso(e.zeta)}`,
              resultado: numeroImpresso(-polo.re / wn),
              atende: perto(-polo.re / wn, e.zeta),
            },
            {
              descricao: `Frequência natural ωn = ${numeroImpresso(e.wn)} rad/s`,
              resultado: numeroImpresso(wn, " rad/s"),
              atende: perto(wn, e.wn),
            },
          ]
        : [
            {
              descricao: `Par de polos ${numeroImpresso(e.re)} ± ${numeroImpresso(Math.abs(e.im))}j`,
              resultado: `${numeroImpresso(polo.re)} ± ${numeroImpresso(Math.abs(polo.im))}j`,
              atende: [-1, 1].every((sinal) =>
                p.polos.some(
                  (polo) =>
                    perto(polo.re, e.re) &&
                    perto(polo.im, sinal * Math.abs(e.im)),
                ),
              ),
            },
          ];
  if (p.entrada.topologia === "PID")
    criterios.push({
      descricao: "Zeros reais e iguais",
      resultado: `${numeroImpresso(-p.z)} · multiplicidade 2`,
      atende: true,
    });
  return criterios;
}
