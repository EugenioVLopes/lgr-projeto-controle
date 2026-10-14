import Formula, { complexoParaLatex } from "../Formula";
import type { ResultadoProjeto } from "../../lib/controladores";
import { numeroLatex as n } from "../../lib/controladores/formatacao";

export default function EspecificacoesProjeto({
  r,
  completa,
}: {
  r: ResultadoProjeto;
  completa: boolean;
}) {
  const e = r.entrada.especificacao;
  return (
    <>
      {e.modo === "mpTs" && (
        <>
          <Formula
            latex={`\\zeta=\\frac{-\\ln(${completa ? n(e.mp) : "M_p"}/100)}{\\sqrt{\\pi^2+\\ln^2(${completa ? n(e.mp) : "M_p"}/100)}}=${n(r.zeta)}`}
          />
          <Formula
            latex={`${e.margem === 1 ? "\\omega_n=" : ""}\\omega_{n,\\min}=\\frac{${e.faixa === 2 ? 4 : 3}}{${completa ? `${n(r.zeta)}\\cdot${n(e.ts)}` : "\\zeta t_s"}}=${n(r.wnMin!)}\\,\\mathrm{rad/s}`}
          />
          {e.margem !== 1 && (
            <Formula
              latex={`\\omega_n=${n(e.margem)}\\cdot\\omega_{n,\\min}=${n(r.wn)}\\,\\mathrm{rad/s}`}
            />
          )}
        </>
      )}
      {e.modo === "zetaWn" && (
        <Formula
          latex={`\\zeta=${n(r.zeta)},\\quad\\omega_n=${n(r.wn)}\\,\\mathrm{rad/s}`}
        />
      )}
      <Formula
        latex={`s_d=${e.modo === "polo" ? "" : "-\\zeta\\omega_n+j\\omega_n\\sqrt{1-\\zeta^2}="}${complexoParaLatex(r.sd, 6)}`}
      />
      {e.modo === "polo" && (
        <p className="ajuda">
          Polo informado diretamente. O cálculo usa o conjugado no semiplano
          superior.
        </p>
      )}
    </>
  );
}
