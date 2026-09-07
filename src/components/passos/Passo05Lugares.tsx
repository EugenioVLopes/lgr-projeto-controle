import { useMemo } from "react";
import Formula from "../Formula";
import DicaProva from "../DicaProva";

export default function Passo05Lugares({ np, nz }: { np: number; nz: number }) {
  const total = Math.max(np, nz);
  const latex = useMemo(
    () => `L_s = \\max(n_p,n_z) = \\max(${np},${nz}) = ${total}`,
    [np, nz, total],
  );
  const descricao = useMemo(
    () => `Número de lugares separados igual a ${total}`,
    [total],
  );
  return (
    <details>
      <summary>Passo 5, lugares separados</summary>
      <Formula latex={latex} descricao={descricao} />
      <DicaProva dica="Ls é o número de ramos = número de polos (quase sempre maior que zeros). Cada polo sai um ramo." />
    </details>
  );
}
