import { useState } from "react";
import FormularioLgr from "./components/FormularioLgr";
import Passo01Equacao from "./components/passos/Passo01Equacao";
import Passo02FormaFatorada from "./components/passos/Passo02FormaFatorada";
import Passo03PolosZeros from "./components/passos/Passo03PolosZeros";
import Passo04Segmentos from "./components/passos/Passo04Segmentos";
import Passo05Lugares from "./components/passos/Passo05Lugares";
import Passo06Simetria from "./components/passos/Passo06Simetria";
import Passo07Assintotas from "./components/passos/Passo07Assintotas";
import Passo08Breakaway from "./components/passos/Passo08Breakaway";
import Passo09Cruzamento from "./components/passos/Passo09Cruzamento";
import Passo10Partida from "./components/passos/Passo10Partida";
import Passo11AnguloS0 from "./components/passos/Passo11AnguloS0";
import Passo12GanhoS0 from "./components/passos/Passo12GanhoS0";
import LgrCompleto from "./components/passos/LgrCompleto";
import { EXEMPLOS } from "./lib/examples";
import { useCalculoLgr } from "./hooks/useCalculoLgr.ts";
import { analisarCoeficientes } from "./lib/lgr/polinomios";

export default function App() {
  const exemploInicial =
    EXEMPLOS.find((exemplo) => exemplo.id === "q1") ?? EXEMPLOS[0];
  const [exemploId, setExemploId] = useState(exemploInicial.id);
  const [numeradorG, setNumeradorG] = useState(exemploInicial.numeradorG);
  const [denominadorG, setDenominadorG] = useState(exemploInicial.denominadorG);
  const [numeradorH, setNumeradorH] = useState(exemploInicial.numeradorH);
  const [denominadorH, setDenominadorH] = useState(exemploInicial.denominadorH);
  const [parteRealS0, setParteRealS0] = useState(
    String(exemploInicial.parteRealS0),
  );
  const [parteImaginariaS0, setParteImaginariaS0] = useState(
    String(exemploInicial.parteImaginariaS0),
  );
  const tema = "light" as const;
  const corPolo = "#dc2626";
  const corZero = "#16a34a";

  function selecionarExemplo(id: string): void {
    const exemploSelecionado =
      EXEMPLOS.find((candidato) => candidato.id === id) ?? EXEMPLOS[0];
    setExemploId(exemploSelecionado.id);
    setNumeradorG(exemploSelecionado.numeradorG);
    setDenominadorG(exemploSelecionado.denominadorG);
    setNumeradorH(exemploSelecionado.numeradorH);
    setDenominadorH(exemploSelecionado.denominadorH);
    setParteRealS0(String(exemploSelecionado.parteRealS0));
    setParteImaginariaS0(String(exemploSelecionado.parteImaginariaS0));
  }

  const calculoLgr = useCalculoLgr(
    numeradorG,
    denominadorG,
    numeradorH,
    denominadorH,
    parteRealS0,
    parteImaginariaS0,
  );
  const temErroCoeficientes = calculoLgr.error !== null;

  return (
    <>
      <header className="lgr-hero">
        <svg
          className="hero-trace"
          viewBox="0 0 320 160"
          aria-hidden="true"
          focusable="false"
        >
          <line x1="8" y1="80" x2="312" y2="80" className="trace-axis" />
          <line x1="96" y1="10" x2="96" y2="150" className="trace-axis faint" />
          <path d="M96 80 H34" className="trace-branch" />
          <path d="M96 80 C 140 80 158 44 206 26" className="trace-branch" />
          <path d="M96 80 C 140 80 158 116 206 134" className="trace-branch" />
          <path d="M206 26 L214 26 M210 22 L210 30" className="trace-tip" />
          <path d="M206 134 L214 134 M210 130 L210 138" className="trace-tip" />
          <path d="M34 74 L46 86 M46 74 L34 86" className="trace-polo" />
          <path d="M90 74 L102 86 M102 74 L90 86" className="trace-polo" />
          <circle cx="64" cy="80" r="5" className="trace-zero" />
        </svg>
        <div className="header-row">
          <div className="hero-copy">
            <h1>Lugar Geométrico das Raízes (LGR)</h1>
            <p className="hero-meta">
              DCA3701.0 — Projeto de Sistemas de Controle — Teoria — T01
              (2026.2) UFRN
            </p>
            <p className="hero-author">
              <span>Autor: Eugenio Lopes</span>
              <a
                className="hero-gh"
                href="https://github.com/EugenioVLopes/lgr-projeto-controle"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                GitHub do projeto
              </a>
            </p>
          </div>
        </div>
      </header>
      <main>
        <FormularioLgr
          exemploId={exemploId}
          aoSelecionarExemplo={selecionarExemplo}
          numeradorG={numeradorG}
          setNumeradorG={setNumeradorG}
          denominadorG={denominadorG}
          setDenominadorG={setDenominadorG}
          numeradorH={numeradorH}
          setNumeradorH={setNumeradorH}
          denominadorH={denominadorH}
          setDenominadorH={setDenominadorH}
          parteRealS0={parteRealS0}
          setParteRealS0={setParteRealS0}
          parteImaginariaS0={parteImaginariaS0}
          setParteImaginariaS0={setParteImaginariaS0}
          temErroCoeficientes={temErroCoeficientes}
        />
        {temErroCoeficientes ? (
          <div id="erro-coefs" className="card badge-warn" role="alert">
            {calculoLgr.error}
          </div>
        ) : (
          <>
            <Passo01Equacao
              numeradorG={analisarCoeficientes(numeradorG) ?? []}
              denominadorG={analisarCoeficientes(denominadorG) ?? []}
              numeradorH={analisarCoeficientes(numeradorH) ?? []}
              denominadorH={analisarCoeficientes(denominadorH) ?? []}
              num={calculoLgr.num}
              den={calculoLgr.den}
            />
            <Passo02FormaFatorada
              num={calculoLgr.num}
              den={calculoLgr.den}
              zeros={calculoLgr.zeros}
              polos={calculoLgr.polos}
            />
            <Passo03PolosZeros
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo04Segmentos
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
              segs={calculoLgr.segs}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo05Lugares
              np={calculoLgr.polos.length}
              nz={calculoLgr.zeros.length}
            />
            <Passo06Simetria />
            <Passo07Assintotas
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
              sigma={calculoLgr.sigma}
              angs={calculoLgr.angs}
              tema={tema}
              corPolo={corPolo}
            />
            <Passo08Breakaway
              num={calculoLgr.num}
              den={calculoLgr.den}
              bk={calculoLgr.bk}
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
            />
            <Passo09Cruzamento
              info={calculoLgr.info}
              cruzs={calculoLgr.cruzs}
              routh0={calculoLgr.routh0}
              den={calculoLgr.den}
              num={calculoLgr.num}
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
              ramos={calculoLgr.ramos}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo10Partida
              partidas={calculoLgr.partidas}
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
              ramos={calculoLgr.ramos}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo11AnguloS0
              s0={calculoLgr.s0}
              t={calculoLgr.t}
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo12GanhoS0
              s0={calculoLgr.s0}
              K={calculoLgr.K}
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
            />
            <LgrCompleto
              polos={calculoLgr.polos}
              ramos={calculoLgr.ramos}
              Ks={calculoLgr.Ks}
              tema={tema}
              corPolo={corPolo}
            />
          </>
        )}
      </main>
    </>
  );
}
