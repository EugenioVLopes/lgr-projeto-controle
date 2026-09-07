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

export default function App() {
  const exemploInicial = EXEMPLOS.find((e) => e.id === "q1") ?? EXEMPLOS[0];
  const [exId, setExId] = useState(exemploInicial.id);
  const [nG, setNG] = useState(exemploInicial.nG);
  const [dG, setDG] = useState(exemploInicial.dG);
  const [nH, setNH] = useState(exemploInicial.nH);
  const [dH, setDH] = useState(exemploInicial.dH);
  const [sr, setSr] = useState(String(exemploInicial.sr));
  const [si, setSi] = useState(String(exemploInicial.si));
  const [tema, setTema] = useState<"light" | "dark">("light");
  const corPolo = tema === "dark" ? "#f87171" : "#dc2626";
  const corZero = tema === "dark" ? "#4ade80" : "#16a34a";

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  function pickEx(id: string): void {
    const e = EXEMPLOS.find((x) => x.id === id) ?? EXEMPLOS[0];
    setExId(e.id);
    setNG(e.nG);
    setDG(e.dG);
    setNH(e.nH);
    setDH(e.dH);
    setSr(String(e.sr));
    setSi(String(e.si));
  }

  const calc = useCalculoLgr(nG, dG, nH, dH, sr, si);
  const temErro = calc.error !== null;

  return (
    <>
      <header>
        <div className="header-row">
          <div>
            <h1>LGR 12 passos</h1>
            <p>DCA-3701 UFRN</p>
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
          exId={exId}
          onPickEx={pickEx}
          nG={nG}
          setNG={setNG}
          dG={dG}
          setDG={setDG}
          nH={nH}
          setNH={setNH}
          dH={dH}
          setDH={setDH}
          sr={sr}
          setSr={setSr}
          si={si}
          setSi={setSi}
          temErro={temErro}
        />
        {temErro ? (
          <div id="erro-coefs" className="card badge-warn" role="alert">
            {calc.error}
          </div>
        ) : (
          <>
            <Passo01Equacao num={calc.num} den={calc.den} />
            <Passo02FormaFatorada num={calc.num} den={calc.den} />
            <Passo03PolosZeros
              polos={calc.polos}
              zeros={calc.zeros}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo04Segmentos
              polos={calc.polos}
              zeros={calc.zeros}
              segs={calc.segs}
            />
            <Passo05Lugares np={calc.polos.length} nz={calc.zeros.length} />
            <Passo06Simetria />
            <Passo07Assintotas
              polos={calc.polos}
              zeros={calc.zeros}
              sigma={calc.sigma}
              angs={calc.angs}
              tema={tema}
              corPolo={corPolo}
            />
            <Passo08Breakaway num={calc.num} den={calc.den} bk={calc.bk} />
            <Passo09Cruzamento
              info={calc.info}
              cruzs={calc.cruzs}
              routh0={calc.routh0}
            />
            <Passo10Partida
              partidas={calc.partidas}
              polos={calc.polos}
              zeros={calc.zeros}
            />
            <Passo11AnguloS0
              s0={calc.s0}
              t={calc.t}
              polos={calc.polos}
              zeros={calc.zeros}
              tema={tema}
              corPolo={corPolo}
              corZero={corZero}
            />
            <Passo12GanhoS0
              s0={calc.s0}
              K={calc.K}
              polos={calc.polos}
              zeros={calc.zeros}
            />
            <LgrCompleto
              polos={calc.polos}
              ramos={calc.ramos}
              Ks={calc.Ks}
              tema={tema}
              corPolo={corPolo}
            />
          </>
        )}
      </main>
    </>
  );
}
