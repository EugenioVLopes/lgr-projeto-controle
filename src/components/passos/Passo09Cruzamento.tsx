import { useMemo } from "react";
import Formula, { polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import { avaliarPolinomioReal } from "../../lib/lgr/index";
import type { Cruzamento } from "../../lib/lgr/index";

interface Props {
  info: Record<string, number[]>;
  cruzs: Cruzamento[];
  routh0: number[][];
}

export default function Passo09Cruzamento({ info, cruzs, routh0 }: Props) {
  const latexPartes = useMemo(() => {
    const reD = info.Re_D || [0];
    const imD = info.Im_D || [0];
    const reN = info.Re_N || [0];
    const imN = info.Im_N || [0];
    return `R_D=${polinomioParaLatex(reD, "\\omega")},\\; I_D=${polinomioParaLatex(imD, "\\omega")},\\; R_N=${polinomioParaLatex(reN, "\\omega")},\\; I_N=${polinomioParaLatex(imN, "\\omega")}`;
  }, [info]);
  const latexCross = useMemo(
    () =>
      `\\mathrm{cross}(\\omega) = ${polinomioParaLatex(info.cross, "\\omega")} = 0`,
    [info],
  );
  const textoSubst = useMemo(() => {
    if (!cruzs.length) return "";
    return cruzs
      .map((c) => {
        const reD = avaliarPolinomioReal(info.Re_D || [0], c.w);
        const reN = avaliarPolinomioReal(info.Re_N || [0], c.w);
        const imD = avaliarPolinomioReal(info.Im_D || [0], c.w);
        const imN = avaliarPolinomioReal(info.Im_N || [0], c.w);
        return `ω=${c.w.toFixed(4)}: Re_D=${reD.toFixed(3)}, Im_D=${imD.toFixed(3)}, Re_N=${reN.toFixed(3)}, Im_N=${imN.toFixed(3)} → K=−Re_D/Re_N=${c.K.toFixed(4)}`;
      })
      .join("\n");
  }, [cruzs, info]);
  const latexCruzs = useMemo(
    () =>
      cruzs
        .map(
          (c) =>
            `\\omega = ${c.w.toFixed(4)},\\; K = ${c.K.toFixed(4)},\\; s = \\pm ${c.w.toFixed(4)}j`,
        )
        .join(",\\quad "),
    [cruzs],
  );
  const latexRouth = useMemo(() => {
    const linhas = routh0;
    if (!linhas.length) return "";
    const cols = Math.max(...linhas.map((r) => r.length));
    const corpo = linhas
      .map((r) => {
        const cels = r.map((v) => v.toFixed(3));
        while (cels.length < cols) cels.push("");
        return cels.join(" & ");
      })
      .join("\\\\");
    return `\\begin{array}{${"c".repeat(cols)}}${corpo}\\end{array}`;
  }, [routh0]);
  const descRouth = useMemo(
    () =>
      `Tabela de Routh para K igual a 1, primeira coluna: ${routh0.map((r) => r[0].toFixed(3)).join(", ")}`,
    [routh0],
  );
  return (
    <details>
      <summary>Passo 9, cruzamento eixo imaginário (Routh + s=jω)</summary>
      <div className="memoria">
        <p className="memoria-titulo">Como cheguei aqui</p>
        <Formula
          latex={latexPartes}
          descricao="Partes real e imaginária de D(jw) e N(jw)"
        />
        <div className="mono">{`s=jω → D(jω)=Re_D(ω)+j·Im_D(ω), N(jω)=Re_N(ω)+j·Im_N(ω). Condição Im[D/N]=0 → Re_D·Im_N − Im_D·Re_N = 0`}</div>
      </div>
      <Formula
        latex={latexCross}
        descricao="Polinômio de cruzamento em ômega igual a zero"
      />
      {cruzs.length ? (
        <div className="memoria">
          <p className="memoria-titulo">Substituindo ω para achar K</p>
          <div className="mono">{textoSubst}</div>
        </div>
      ) : null}
      {cruzs.length ? (
        <Formula
          latex={latexCruzs}
          descricao="Cruzamentos do eixo imaginário com ganho K"
        />
      ) : (
        <p>
          não cruza para{" "}
          <Formula inline latex="K > 0" descricao="K maior que zero" />
        </p>
      )}
      <Formula display latex={latexRouth} descricao={descRouth} />
      <DicaProva dica="monta D+K·N=0, separa Re e Im com s=jω (j²=−1, j³=−j). Resolve cross(ω)=0, pega ω>0 real. Acha K=−Re_D/Re_N (ou −Im_D/Im_N). No Routh, zera a linha que dá K crítico e lê ω da linha auxiliar." />
    </details>
  );
}
