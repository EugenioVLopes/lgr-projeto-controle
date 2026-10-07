import { register } from "node:module";
register("./loader-typescript.mjs", import.meta.url);
const { EXERCICIOS_CONTROLADORES } =
  await import("../src/lib/controladores/exemplos.ts");
const { projetarControlador } =
  await import("../src/lib/controladores/index.ts");
const { simularDegrau } = await import("../src/lib/controladores/simulacao.ts");
const { discretizar } =
  await import("../src/lib/controladores/discretizacao.ts");

const indices = [0, 10, 100, 200, 400, 1000, 2000, 4000];
const results = EXERCICIOS_CONTROLADORES.map(({ id, entrada }) => {
  const r = projetarControlador(entrada),
    s = simularDegrau(r.fechada, 20);
  return {
    id,
    entrada,
    sd: r.sd,
    z: r.z,
    Kc: r.Kc,
    Kp: r.Kp,
    Ki: r.Ki,
    Kd: r.Kd,
    Gc: r.Gc,
    fechada: r.fechada,
    polos: r.polos,
    resposta: {
      mp: s.mp,
      ts2: s.ts2,
      ts5: s.ts5,
      yss: s.yss,
      y0: s.y0,
      amostras: indices.map((i) => s.y[i]),
    },
    discretizacoes: [0.5, 1, 2].flatMap((T) =>
      ["forward", "tustin"].flatMap((metodo) =>
        ["Gc", "malha"].map((alvo) => ({
          T,
          metodo,
          alvo,
          ...discretizar(alvo === "Gc" ? r.Gc : r.malha, T, metodo),
        })),
      ),
    ),
  };
});
process.stdout.write(JSON.stringify({ indices, results }, null, 2));
