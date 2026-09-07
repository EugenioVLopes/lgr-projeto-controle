import Formula from "./Formula";
import { EXEMPLOS } from "../lib/examples";
import { usePreviewFuncao, usePreviewS0 } from "../hooks/usePreviews.ts";

interface FormularioLgrProps {
  exId: string;
  onPickEx: (id: string) => void;
  nG: string;
  setNG: (v: string) => void;
  dG: string;
  setDG: (v: string) => void;
  nH: string;
  setNH: (v: string) => void;
  dH: string;
  setDH: (v: string) => void;
  sr: string;
  setSr: (v: string) => void;
  si: string;
  setSi: (v: string) => void;
  temErro: boolean;
}

export default function FormularioLgr(props: FormularioLgrProps) {
  const {
    exId,
    onPickEx,
    nG,
    setNG,
    dG,
    setDG,
    nH,
    setNH,
    dH,
    setDH,
    sr,
    setSr,
    si,
    setSi,
    temErro,
  } = props;
  const latexG = usePreviewFuncao(nG, dG, "G");
  const latexH = usePreviewFuncao(nH, dH, "H");
  const previewS0 = usePreviewS0(sr, si);
  const descrito = "erro-coefs ajuda-coefs";

  return (
    <div className="card">
      <label htmlFor="exemplo">Exemplo da lista</label>
      <select
        id="exemplo"
        value={exId}
        onChange={(e) => onPickEx(e.target.value)}
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
              value={nG}
              onChange={(e) => setNG(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErro}
              aria-describedby={descrito}
            />
          </div>
          <div>
            <label htmlFor="den-g">Denominador G(s)</label>
            <input
              id="den-g"
              value={dG}
              onChange={(e) => setDG(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErro}
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
              value={nH}
              onChange={(e) => setNH(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErro}
              aria-describedby={descrito}
            />
          </div>
          <div>
            <label htmlFor="den-h">Denominador H(s)</label>
            <input
              id="den-h"
              value={dH}
              onChange={(e) => setDH(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErro}
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
              value={sr}
              onChange={(e) => setSr(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErro}
              aria-describedby={descrito}
            />
          </div>
          <div>
            <label htmlFor="im-s0">Teste Im(s0)</label>
            <input
              id="im-s0"
              value={si}
              onChange={(e) => setSi(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              aria-invalid={temErro}
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
