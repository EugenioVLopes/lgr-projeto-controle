import { useState } from "react";

export default function DicaProva({
  dica,
  rotulo = "Ver dica",
}: {
  dica: string;
  rotulo?: string;
}) {
  const [aberta, setAberta] = useState(false);
  return (
    <div className="dica-prova">
      <button
        type="button"
        className="dica-prova-botao"
        aria-expanded={aberta}
        onClick={() => setAberta((v) => !v)}
        title={dica}
      >
        {aberta ? "Esconder dica" : rotulo}
      </button>
      {aberta && (
        <p className="dica-prova-texto" role="note">
          {dica}
        </p>
      )}
    </div>
  );
}
