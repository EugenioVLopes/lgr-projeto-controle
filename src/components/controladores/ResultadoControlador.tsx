import { useMemo, useState, type ReactNode } from "react";
import Formula, { complexoParaLatex } from "../Formula";
import GraficosProjeto from "./GraficosProjeto";
import { MemoriaAngulo, MemoriaModulo } from "./MemoriaCriterios";
import EspecificacoesProjeto from "./EspecificacoesProjeto";
import { type ResultadoProjeto } from "../../lib/controladores";
import { simularDegrau } from "../../lib/controladores/simulacao";
import DiscretizacaoControlador from "./DiscretizacaoControlador";
import type { DadosDiscretizacao } from "./dadosDiscretizacao";
import PassosPrimeiraOrdem from "./PassosPrimeiraOrdem";
import {
  numeroLatex as n,
  tfLatex as latexTf,
} from "../../lib/controladores/formatacao";

const texto = (x: number | null, unidade = "") =>
  x === null
    ? "Não definido"
    : `${new Intl.NumberFormat("pt-BR", { maximumSignificantDigits: 6 }).format(x)}${unidade}`;

function MemoriaCompleta({
  visivel,
  children,
}: {
  visivel: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`memoria-completa${visivel ? "" : " memoria-recolhida"}`}>
      {children}
    </div>
  );
}

export default function ResultadoControlador({
  r,
  completa,
  ativo,
  aoImprimir,
  preparandoImpressao,
  discretizacao,
  aoEditarDiscretizacao,
}: {
  r: ResultadoProjeto;
  completa: boolean;
  ativo: boolean;
  aoImprimir: () => void;
  preparandoImpressao: boolean;
  discretizacao: DadosDiscretizacao;
  aoEditarDiscretizacao: (dados: DadosDiscretizacao) => void;
}) {
  const [horizonte, setHorizonte] = useState("");
  const simulacao = useMemo(() => {
    try {
      return {
        resposta: simularDegrau(
          r.fechada,
          horizonte.trim() ? Number(horizonte) : undefined,
        ),
        erro: null,
      };
    } catch (e) {
      return {
        resposta: null,
        erro: e instanceof Error ? e.message : "Falha na simulação.",
      };
    }
  }, [r, horizonte]);
  const esp = r.entrada.especificacao;
  const resposta = simulacao.resposta;
  const ts =
    esp.modo === "mpTs" && esp.faixa === 5 ? resposta?.ts5 : resposta?.ts2;
  const aprovaMp =
    resposta?.status === "ok" &&
    resposta.mp !== null &&
    esp.modo === "mpTs" &&
    resposta.mp <= esp.mp;
  const aprovaTs =
    resposta?.status === "ok" &&
    ts != null &&
    esp.modo === "mpTs" &&
    ts < esp.ts;
  const integral = r.entrada.topologia !== "PD",
    zeros = r.entrada.topologia === "PID" ? 2 : 1;
  return (
    <section aria-label="Resolução do projeto">
      {r.tipo === "primeiraOrdem" ? (
        <PassosPrimeiraOrdem r={r} completa={completa} />
      ) : (
        <>
          <details open>
            <summary>1. Planta, realimentação e controlador</summary>
            <div className="step-body">
              <Formula
                latex={`G(s)=${latexTf(r.entrada.G)},\\quad H(s)=${latexTf(r.entrada.H)}`}
              />
              <Formula
                latex={`G_c(s)=K_c\\frac{(s+z)${zeros === 2 ? "^2" : ""}}{${integral ? "s" : "1"}}`}
              />
              <MemoriaCompleta visivel={completa}>
                <>
                  <p>
                    Realimentação negativa com o controlador em série com a
                    planta. Os coeficientes originais de G e H fazem parte do
                    cálculo do ganho.
                  </p>
                  <Formula latex={`G(s)H(s)=${latexTf(r.GH)}`} />
                </>
              </MemoriaCompleta>
            </div>
          </details>
          <details open>
            <summary>2. Especificações e polos desejados</summary>
            <div className="step-body">
              <EspecificacoesProjeto r={r} completa={completa} />
            </div>
          </details>
          <details open={completa}>
            <summary>3. Critério do ângulo</summary>
            <div className="step-body">
              <MemoriaAngulo r={r} completa={completa} />
            </div>
          </details>
          <details open={completa}>
            <summary>4. Posição do zero do controlador</summary>
            <div className="step-body">
              <Formula
                latex={
                  completa
                    ? `z=\\frac{${n(r.sd.im)}}{\\tan(${n(r.alfa)}^\\circ)}-(${n(r.sd.re)})=${n(r.z)}`
                    : `z=\\frac{\\operatorname{Im}s_d}{\\tan\\alpha}-\\operatorname{Re}s_d=${n(r.z)}`
                }
              />
              <Formula
                latex={`s_z=${n(-r.z)}${zeros === 2 ? "\\quad\\text{(zero duplo)}" : ""}`}
              />
            </div>
          </details>
          <details open={completa}>
            <summary>5. Critério do módulo e ganho Kc</summary>
            <div className="step-body">
              <MemoriaModulo r={r} completa={completa} />
            </div>
          </details>
          <details open>
            <summary>6. Controlador e ganhos finais</summary>
            <div className="step-body">
              {completa ? (
                <>
                  <Formula
                    latex={
                      r.entrada.topologia === "PID"
                        ? `K_p=2K_cz=${n(r.Kp)}`
                        : r.entrada.topologia === "PD"
                          ? `K_p=K_cz=${n(r.Kp)}`
                          : `K_p=K_c=${n(r.Kp)}`
                    }
                  />
                  {integral && (
                    <Formula
                      latex={`K_i=K_cz${zeros === 2 ? "^2" : ""}=${n(r.Ki)}`}
                    />
                  )}
                  {r.entrada.topologia !== "PI" && (
                    <Formula latex={`K_d=K_c=${n(r.Kd)}`} />
                  )}
                </>
              ) : (
                <dl className="ganhos-projeto">
                  <div>
                    <dt>Kp</dt>
                    <dd>{texto(r.Kp)}</dd>
                  </div>
                  {integral && (
                    <div>
                      <dt>Ki</dt>
                      <dd>{texto(r.Ki)}</dd>
                    </div>
                  )}
                  {r.entrada.topologia !== "PI" && (
                    <div>
                      <dt>Kd</dt>
                      <dd>{texto(r.Kd)}</dd>
                    </div>
                  )}
                </dl>
              )}
              <Formula latex={`G_c(s)=${latexTf(r.Gc)}`} />
              {r.avisos.map((a) => (
                <p key={a} className="ajuda">
                  {a}
                </p>
              ))}
            </div>
          </details>
        </>
      )}
      <details open>
        <summary>Validação da malha fechada</summary>
        <div className="step-body">
          <Formula
            latex={`T(s)=\\frac{G_c(s)G(s)}{1+G_c(s)G(s)H(s)}=${latexTf(r.fechada)}`}
          />
          <p>Todos os polos de malha fechada</p>
          <div className="lista-polos">
            {r.polos.map((p, i) => (
              <Formula
                key={i}
                latex={`p_{${i + 1}}=${complexoParaLatex(p, 6)}`}
              />
            ))}
          </div>
          <p className="ajuda">
            A presença do par desejado não garante sua dominância nem o
            cumprimento de Mp e tempo de acomodação.
          </p>
          <MemoriaCompleta visivel={completa}>
            <details>
              <summary>Precisão numérica</summary>
              <Formula
                latex={`|\\angle L(s_d)-180^\\circ|_{\\mathrm{mod}\\,360}=${n(r.erroAngulo)}^\\circ,\\quad ||L(s_d)|-1|=${n(r.erroModulo)}`}
              />
              <Formula
                latex={`\\varepsilon_{\\mathrm{polo}}=${n(r.erroPolo)},\\quad\\varepsilon_{\\mathrm{caract.,rel.}}=${n(r.residuo)}`}
              />
            </details>
          </MemoriaCompleta>
          <label className="no-print">
            Horizonte de simulação em segundos
            <input
              type="number"
              min="0"
              step="any"
              placeholder="Automático pelos polos"
              value={horizonte}
              onChange={(e) => setHorizonte(e.target.value)}
            />
          </label>
          {simulacao.erro && (
            <p role="alert" className="badge-warn">
              {simulacao.erro}
            </p>
          )}
          {resposta && (
            <>
              <p
                className={resposta.status === "ok" ? "badge-ok" : "badge-warn"}
                role="status"
              >
                {resposta.status === "ok"
                  ? "Malha assintoticamente estável"
                  : resposta.mensagem}
              </p>
              {resposta.status === "ok" && (
                <>
                  <div className="tabela-scroll">
                    <table>
                      <caption>Resposta ao degrau unitário</caption>
                      <thead>
                        <tr>
                          <th scope="col">Medida</th>
                          <th scope="col">Simulação</th>
                          <th scope="col">Requisito</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Valor final</th>
                          <td>{texto(resposta.yss)}</td>
                          <td>Calculado com H(s)</td>
                        </tr>
                        {(completa || resposta.y0 !== 0) && (
                          <tr>
                            <th scope="row">Saída em 0⁺</th>
                            <td>{texto(resposta.y0)}</td>
                            <td>Termo direto</td>
                          </tr>
                        )}
                        <tr>
                          <th scope="row">Mp</th>
                          <td>{texto(resposta.mp, "%")}</td>
                          <td>
                            {esp.modo === "mpTs"
                              ? `≤ ${texto(esp.mp, "%")} · ${resposta.mp === null ? "Não definido" : aprovaMp ? "Atendido" : "Não atendido"}`
                              : "Sem limite informado"}
                          </td>
                        </tr>
                        {[2, 5]
                          .filter(
                            (f) =>
                              completa ||
                              esp.modo !== "mpTs" ||
                              esp.faixa === f,
                          )
                          .map((f) => {
                            const medido =
                              f === 2 ? resposta.ts2 : resposta.ts5;
                            return (
                              <tr key={f}>
                                <th scope="row">Acomodação {f}%</th>
                                <td>
                                  {medido === null
                                    ? resposta.yss === 0
                                      ? "Faixa relativa não definida"
                                      : "Não acomodou no intervalo"
                                    : texto(medido, " s")}
                                </td>
                                <td>
                                  {esp.modo === "mpTs" && esp.faixa === f
                                    ? `< ${texto(esp.ts, " s")} · ${medido === null ? "Não confirmado" : aprovaTs ? "Atendido" : "Não atendido"}`
                                    : "Sem limite informado"}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <p className="ajuda">
                    Horizonte de {texto(resposta.horizonte, " s")}. Mp inclui o
                    salto inicial, quando presente. Para valor final nulo, as
                    métricas relativas não são definidas.
                  </p>
                  {esp.modo === "mpTs" && (!aprovaMp || !aprovaTs) && (
                    <p className="badge-warn">
                      O projeto calculado não confirmou todos os limites. Ajuste
                      o fator de frequência ou informe outro polo e projete
                      novamente. Estender o horizonte permite conferir a
                      acomodação.
                    </p>
                  )}
                </>
              )}
              {ativo && <GraficosProjeto r={r} resposta={resposta} />}
            </>
          )}
        </div>
      </details>
      <DiscretizacaoControlador
        r={r}
        completa={completa}
        dados={discretizacao}
        aoEditar={aoEditarDiscretizacao}
      />
      <div className="no-print print-actions">
        <button
          type="button"
          className="primary"
          onClick={aoImprimir}
          disabled={preparandoImpressao}
        >
          {preparandoImpressao
            ? "Preparando impressão…"
            : "Imprimir resolução / salvar PDF"}
        </button>
        <p className="ajuda">
          Documento no formato das entregas, com enunciado, cálculos, gráfico e
          verificação dos requisitos. Usa o projeto atual, mesmo com passos
          recolhidos.
        </p>
      </div>
    </section>
  );
}
