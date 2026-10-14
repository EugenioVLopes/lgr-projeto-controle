import Formula from "../Formula";
import type { ResultadoClassico } from "../../lib/controladores";
import { memoriaCriterios } from "../../lib/controladores/criterios";

export function MemoriaAngulo({
  r,
  completa = false,
}: {
  r: ResultadoClassico;
  completa?: boolean;
}) {
  const m = memoriaCriterios(r);
  return (
    <>
      <p className="ajuda">
        θ: polos; φ: zeros
        {r.entrada.topologia !== "PD"
          ? "; θc: polo do controlador na origem"
          : ""}
        . A contribuição de cada zero do controlador é α.
      </p>
      {(completa ? m.angulosDetalhados : m.angulosResumo).map((latex, i) => (
        <Formula key={i} latex={latex} />
      ))}
      <Formula latex={m.condicaoAngulo} />
    </>
  );
}

export function MemoriaModulo({
  r,
  completa = false,
}: {
  r: ResultadoClassico;
  completa?: boolean;
}) {
  const m = memoriaCriterios(r);
  return (
    <>
      <p className="ajuda">
        A: distâncias aos polos; B: distâncias aos zeros. O índice c identifica
        o controlador.
      </p>
      {(completa ? m.distanciasDetalhadas : m.distanciasResumo).map(
        (latex, i) => (
          <Formula key={i} latex={latex} />
        ),
      )}
      <Formula latex={completa ? m.ganhoSimbolico : m.ganho} />
      {completa && <Formula latex={m.ganhoNumerico} />}
    </>
  );
}
