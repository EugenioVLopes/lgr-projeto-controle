import { useMemo } from "react";
import Formula, { complexoParaLatex, polinomioParaLatex } from "../Formula";
import DicaProva from "../DicaProva";
import {
  avaliarPolinomioComplexo,
  encontrarRaizes,
  equacaoDerivadaBreakaway,
  formatarComplexo,
} from "../../lib/lgr/index";
import type { BreakPoint, Complex } from "../../lib/lgr/index";

interface Candidata {
  s: Complex;
  K: number | null;
  KIm: number;
  pertenceTrecho: boolean;
  valida: boolean;
  motivo: string;
}

export default function Passo08Breakaway({
  num,
  den,
  bk,
  polos,
  zeros,
}: {
  num: number[];
  den: number[];
  bk: BreakPoint[];
  polos: Complex[];
  zeros: Complex[];
}) {
  const det = useMemo(() => equacaoDerivadaBreakaway(num, den), [num, den]);
  const candidatas = useMemo<Candidata[]>(() => {
    const raizes = encontrarRaizes(det.eq);
    const reaisPZ = [...polos, ...zeros]
      .filter((p) => Math.abs(p.im) < 1e-8)
      .map((p) => p.re);
    return raizes.map((r) => {
      const vN = avaliarPolinomioComplexo(num, r);
      const vD = avaliarPolinomioComplexo(den, r);
      const modN = Math.hypot(vN.re, vN.im);
      if (modN < 1e-12) {
        return {
          s: r,
          K: null,
          KIm: NaN,
          pertenceTrecho: false,
          valida: false,
          motivo: "fora do LGR",
        };
      }
      const Kre = (-vD.re * vN.re - vD.im * vN.im) / (modN * modN);
      const Kim = (vD.re * vN.im - vD.im * vN.re) / (modN * modN);
      if (Math.abs(r.im) < 1e-6) {
        const rr = r.re;
        const cont = reaisPZ.filter((x) => x > rr + 1e-10).length;
        const noLgr = cont % 2 === 1;
        const valida = noLgr && Kre > 0 && Math.abs(Kim) < 1e-3;
        return {
          s: { re: rr, im: 0 },
          K: Kre,
          KIm: Kim,
          pertenceTrecho: noLgr,
          valida,
          motivo: noLgr ? "pertence ao LGR" : "fora do LGR",
        };
      }
      const valida = Math.abs(Kim) < 1e-3 && Kre > 0;
      return {
        s: r,
        K: Kre,
        KIm: Kim,
        pertenceTrecho: valida,
        valida,
        motivo: valida ? "no LGR" : "fora",
      };
    });
  }, [det, num, den, polos, zeros]);
  return (
    <details open>
      <summary>Passo 8, pontos de saída/entrada (descolamento)</summary>
      <p>
        <strong>1) Isolar K na equação característica:</strong>
      </p>
      <Formula
        latex={
          "D(s) + K \\cdot N(s) = 0 \\;\\;\\Longrightarrow\\;\\; K = -\\frac{D(s)}{N(s)}"
        }
        descricao="Isolar K"
      />
      <Formula
        latex={`K = -\\frac{${polinomioParaLatex(den)}}{${polinomioParaLatex(num)}}`}
        descricao="K em função de N e D"
      />
      <p>
        <strong>2) Condição de descolamento dK/ds = 0:</strong>
      </p>
      <Formula
        latex={
          "\\frac{dK}{ds} = -\\frac{D'(s) \\cdot N(s) - D(s) \\cdot N'(s)}{N(s)^2} = 0"
        }
        descricao="Derivada igual a zero"
      />
      <p>Para o numerador ser zero:</p>
      <Formula
        latex={"D'(s) \\cdot N(s) - D(s) \\cdot N'(s) = 0"}
        descricao="Numerador zero"
      />
      <p>
        <strong>3) Calculando as derivadas:</strong>
      </p>
      <Formula
        latex={`N(s) = ${polinomioParaLatex(num)}`}
        descricao="Numerador"
      />
      <Formula
        latex={`N'(s) = ${polinomioParaLatex(det.dNum)}`}
        descricao="Derivada do numerador"
      />
      <Formula
        latex={`D(s) = ${polinomioParaLatex(den)}`}
        descricao="Denominador"
      />
      <Formula
        latex={`D'(s) = ${polinomioParaLatex(det.dDen)}`}
        descricao="Derivada do denominador"
      />
      <p>
        <strong>4) Equação de descolamento:</strong>
      </p>
      <Formula
        latex={`${polinomioParaLatex(det.eq)} = 0`}
        descricao="Equacao de descolamento"
      />
      <p>
        <strong>5) Raízes da equação de descolamento:</strong>
      </p>
      {candidatas.length === 0 && (
        <p>
          <em>Sem candidatas.</em>
        </p>
      )}
      {candidatas.map((c, i) => (
        <div key={i}>
          <Formula
            latex={`s = ${complexoParaLatex(c.s)},\\quad K = ${c.K !== null && Number.isFinite(c.K) ? c.K.toFixed(4) : "\\infty"} \\quad [\\text{${c.motivo}}]`}
            descricao={`Candidata ${i + 1}: s=${formatarComplexo(c.s)}`}
          />
          {c.valida && (
            <p className="badge-ok">
              Ponto de descolamento válido: s = {c.s.re.toFixed(4)} com K ={" "}
              {(c.K ?? 0).toFixed(4)}
            </p>
          )}
        </div>
      ))}
      {!candidatas.some((c) => c.valida) && (
        <p>
          <em>Nenhum ponto válido com K&gt;0 no LGR.</em>
        </p>
      )}
      {bk.length > 0 && (
        <p className="mono">
          Resumo:{" "}
          {bk
            .map((b) => `s=${formatarComplexo(b.s)}, K=${b.K.toFixed(4)}`)
            .join("; ")}
        </p>
      )}
      <DicaProva dica="K = -D(s)/N(s). Deriva dK/ds = 0 → resolve N·D' - D·N' = 0. Só vale raiz em trecho do LGR (passo 4) com K > 0. Calcula K = -D(s)/N(s) em cada candidata e descarta K negativo." />
    </details>
  );
}
