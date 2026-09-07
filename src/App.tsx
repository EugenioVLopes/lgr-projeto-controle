import { useEffect, useState } from "react";
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
  const [tema, setTema] = useState<"light" | "dark">("light");
  const corPolo = tema === "dark" ? "#f87171" : "#dc2626";
  const corZero = tema === "dark" ? "#4ade80" : "#16a34a";

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

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
      <header>
        <div className="header-row">
          <div>
            <h1>LGR</h1>
            <p>
              DCA3701.0 - PROJETO DE SISTEMAS DE CONTROLE - TEORIA - T01
              (2026.2) UFRN
            </p>
          </div>
          <button
            type="button"
            className="primary"
            style={{ width: "auto", marginTop: 0 }}
            onClick={() => setTema((t) => (t === "light" ? "dark" : "light"))}
            aria-pressed={tema === "dark"}
          >
            {tema === "light" ? "Modo escuro" : "Modo claro"}
          </button>
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
            />
            <Passo09Cruzamento
              info={calculoLgr.info}
              cruzs={calculoLgr.cruzs}
              routh0={calculoLgr.routh0}
            />
            <Passo10Partida
              partidas={calculoLgr.partidas}
              polos={calculoLgr.polos}
              zeros={calculoLgr.zeros}
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
