import Formula from "./Formula";
import { EXEMPLOS } from "../lib/examples";
import { usePreviewFuncao, usePreviewS0 } from "../hooks/usePreviews.ts";

interface FormularioLgrProps {
  exemploId: string;
  aoSelecionarExemplo: (id: string) => void;
  numeradorG: string;
  setNumeradorG: (v: string) => void;
  denominadorG: string;
  setDenominadorG: (v: string) => void;
  numeradorH: string;
  setNumeradorH: (v: string) => void;
  denominadorH: string;
  setDenominadorH: (v: string) => void;
  parteRealS0: string;
  setParteRealS0: (v: string) => void;
  parteImaginariaS0: string;
  setParteImaginariaS0: (v: string) => void;
  temErroCoeficientes: boolean;
}

export default function FormularioLgr(props: FormularioLgrProps) {
  const {
    exemploId,
    aoSelecionarExemplo,
    numeradorG,
    setNumeradorG,
    denominadorG,
    setDenominadorG,
    numeradorH,
    setNumeradorH,
    denominadorH,
    setDenominadorH,
    parteRealS0,
    setParteRealS0,
    parteImaginariaS0,
    setParteImaginariaS0,
    temErroCoeficientes,
  } = props;
  const latexG = usePreviewFuncao(numeradorG, denominadorG, "G");
  const latexH = usePreviewFuncao(numeradorH, denominadorH, "H");
  const previewS0 = usePreviewS0(parteRealS0, parteImaginariaS0);
  const descrito = "erro-coefs ajuda-coefs";

  return (
    <div className="card">
      <label htmlFor="exemplo">Exemplo da lista</label>
      <select
        id="exemplo"
        value={exemploId}
        onChange={(e) => aoSelecionarExemplo(e.target.value)}
      >
        {EXEMPLOS.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nome}
          </option>
        ))}
      </select>
      <div className="grid2">
        <fieldset>
          <legend>G(s), malha direta</legend>
          {latexG ? <Formula latex={latexG} descricao="G de s" /> : null}
          <div>
            <label htmlFor="num-g">Numerador G(s)</label>
            <input
              id="num-g"
              value={numeradorG}
              onChange={(e) => setNumeradorG(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErroCoeficientes}
              aria-describedby={descrito}
            />
          </div>
          <div>
            <label htmlFor="den-g">Denominador G(s)</label>
            <input
              id="den-g"
              value={denominadorG}
              onChange={(e) => setDenominadorG(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErroCoeficientes}
              aria-describedby={descrito}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>H(s), realimentação</legend>
          {latexH ? <Formula latex={latexH} descricao="H de s" /> : null}
          <div>
            <label htmlFor="num-h">Numerador H(s)</label>
            <input
              id="num-h"
              value={numeradorH}
              onChange={(e) => setNumeradorH(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErroCoeficientes}
              aria-describedby={descrito}
            />
          </div>
          <div>
            <label htmlFor="den-h">Denominador H(s)</label>
            <input
              id="den-h"
              value={denominadorH}
              onChange={(e) => setDenominadorH(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErroCoeficientes}
              aria-describedby={descrito}
            />
          </div>
        </fieldset>
      </div>
      <fieldset>
        <legend>Ponto de teste s0</legend>
        <Formula
          latex={previewS0.latex}
          descricao={`Ponto de teste s0 igual a ${previewS0.latex}`}
        />
        <div className="grid2">
          <div>
            <label htmlFor="re-s0">Teste Re(s0)</label>
            <input
              id="re-s0"
              value={parteRealS0}
              onChange={(e) => setParteRealS0(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErroCoeficientes}
              aria-describedby={descrito}
            />
          </div>
          <div>
            <label htmlFor="im-s0">Teste Im(s0)</label>
            <input
              id="im-s0"
              value={parteImaginariaS0}
              onChange={(e) => setParteImaginariaS0(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErroCoeficientes}
              aria-describedby={descrito}
            />
          </div>
        </div>
      </fieldset>
      <p id="ajuda-coefs" className="ajuda">
        Coefs em ordem decrescente de s, separados por espaço. Ex.: s²+13s →
        &quot;1 13 0&quot;.
      </p>
    </div>
  );
}
