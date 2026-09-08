import { useState } from "react";
import Formula, { complexoParaLatex } from "./Formula";
import { EXEMPLOS } from "../lib/examples";
import { usePreviewFuncao } from "../hooks/usePreviews.ts";
import { criarComplexo } from "../lib/lgr/index";

export interface PontoTesteForm {
  id: string;
  re: string;
  im: string;
}

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
  pontos: PontoTesteForm[];
  aoAdicionarPonto: (re: string, im: string) => void;
  aoAtualizarPonto: (id: string, campo: "re" | "im", valor: string) => void;
  aoRemoverPonto: (id: string) => void;
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
    pontos,
    aoAdicionarPonto,
    aoAtualizarPonto,
    aoRemoverPonto,
    temErroCoeficientes,
  } = props;
  const latexG = usePreviewFuncao(numeradorG, denominadorG, "G");
  const latexH = usePreviewFuncao(numeradorH, denominadorH, "H");
  const [novoRe, setNovoRe] = useState("");
  const [novoIm, setNovoIm] = useState("");
  const descrito = "erro-coefs ajuda-coefs";

  function adicionar(): void {
    const re = novoRe.trim() === "" ? "0" : novoRe.trim();
    const im = novoIm.trim() === "" ? "0" : novoIm.trim();
    if (Number.isNaN(Number(re)) || Number.isNaN(Number(im))) return;
    aoAdicionarPonto(re, im);
    setNovoRe("");
    setNovoIm("");
  }

  return (
    <div className="card">
      <label htmlFor="exemplo">Exemplo da lista</label>
      <select
        id="exemplo"
        value={exemploId}
        onChange={(e) => aoSelecionarExemplo(e.target.value)}
      >
        <option value="">— selecione um exemplo —</option>
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
        <legend>Pontos de teste s0 (passos 11 e 12)</legend>
        {pontos.length === 0 ? (
          <p className="ajuda">
            Nenhum ponto adicionado. Informe Re e Im abaixo e toque em
            “Adicionar ponto” para testar os passos 11 e 12.
          </p>
        ) : (
          <div>
            {pontos.map((p, indice) => {
              const s0 = criarComplexo(Number(p.re) || 0, Number(p.im) || 0);
              return (
                <div key={p.id} className="card" style={{ marginBottom: 8 }}>
                  <Formula
                    latex={`s_{${indice + 1}} = ${complexoParaLatex(s0)}`}
                    descricao={`Ponto de teste ${indice + 1} igual a ${p.re} + ${p.im}j`}
                  />
                  <div className="grid2">
                    <div>
                      <label htmlFor={`re-s0-${p.id}`}>Re(s{indice + 1})</label>
                      <input
                        id={`re-s0-${p.id}`}
                        value={p.re}
                        onChange={(e) =>
                          aoAtualizarPonto(p.id, "re", e.target.value)
                        }
                        inputMode="decimal"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label htmlFor={`im-s0-${p.id}`}>Im(s{indice + 1})</label>
                      <input
                        id={`im-s0-${p.id}`}
                        value={p.im}
                        onChange={(e) =>
                          aoAtualizarPonto(p.id, "im", e.target.value)
                        }
                        inputMode="decimal"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => aoRemoverPonto(p.id)}
                    aria-label={`Remover ponto ${indice + 1}`}
                    style={{ marginTop: 8, minHeight: 44, width: "100%" }}
                  >
                    Remover ponto {indice + 1}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="grid2">
          <div>
            <label htmlFor="novo-re-s0">Novo Re(s0)</label>
            <input
              id="novo-re-s0"
              value={novoRe}
              onChange={(e) => setNovoRe(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              placeholder="ex.: -1"
            />
          </div>
          <div>
            <label htmlFor="novo-im-s0">Novo Im(s0)</label>
            <input
              id="novo-im-s0"
              value={novoIm}
              onChange={(e) => setNovoIm(e.target.value)}
              inputMode="decimal"
              autoComplete="off"
              placeholder="ex.: 2"
            />
          </div>
        </div>
        <button
          type="button"
          className="primary"
          onClick={adicionar}
          style={{ marginTop: 8 }}
        >
          Adicionar ponto
        </button>
      </fieldset>
      <p id="ajuda-coefs" className="ajuda">
        Coefs em ordem decrescente de s, separados por espaço. Ex.: s²+13s →
        &quot;1 13 0&quot;.
      </p>
    </div>
  );
}
