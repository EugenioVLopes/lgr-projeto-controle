import { useMemo, useState } from 'react'
import LgrPlot from './components/LgrPlot'
import { EXEMPLOS } from './lib/examples'
import {
  criarComplexo, encontrarPontosBreakaway, encontrarSegmentosEixoReal, calcularAnguloPartida, calcularAssintotas,
  calcularGanhoK, calcularRamosLgr, encontrarCruzamentosEixoImaginario, combinarMalhaAberta, formatarComplexo, ehNumeroReal, analisarCoeficientes,
  polinomioParaTexto, encontrarRaizes, montarTabelaRouth, testarCriterioAngulo,
} from './lib/lgr/index'

export default function App() {
  const [exId, setExId] = useState('q1')
  const ex = EXEMPLOS.find((e) => e.id === exId)!
  const [nG, setNG] = useState(ex.nG)
  const [dG, setDG] = useState(ex.dG)
  const [nH, setNH] = useState(ex.nH)
  const [dH, setDH] = useState(ex.dH)
  const [sr, setSr] = useState(String(ex.sr))
  const [si, setSi] = useState(String(ex.si))

  const pickEx = (id: string) => {
    const e = EXEMPLOS.find((x) => x.id === id)!
    setExId(id); setNG(e.nG); setDG(e.dG); setNH(e.nH); setDH(e.dH); setSr(String(e.sr)); setSi(String(e.si))
  }

  const calc = useMemo(() => {
    const pNG = analisarCoeficientes(nG), pDG = analisarCoeficientes(dG), pNH = analisarCoeficientes(nH), pDH = analisarCoeficientes(dH)
    if (!pNG || !pDG || !pNH || !pDH) return { error: 'Confere os coeficientes (use espaços: ex. "1 4 0")' } as const
    const { num, den } = combinarMalhaAberta(pNG, pDG, pNH, pDH)
    const zeros = encontrarRaizes(num), polos = encontrarRaizes(den)
    const segs = encontrarSegmentosEixoReal(zeros, polos)
    const { sigma, angs } = calcularAssintotas(zeros, polos)
    const bk = encontrarPontosBreakaway(num, den, polos, zeros)
    const { cruzs, info } = encontrarCruzamentosEixoImaginario(den, num)
    const { Ks, ramos } = calcularRamosLgr(num, den)
    const s0 = criarComplexo(Number(sr) || 0, Number(si) || 0)
    const t = testarCriterioAngulo(s0, zeros, polos)
    const K = calcularGanhoK(s0, zeros, polos)
    const cxP = polos.filter((p) => p.im > 1e-8)
    const partidas = cxP.map((p) => ({ p, ang: calcularAnguloPartida(p, polos, zeros) }))
    const routh0 = montarTabelaRouth(den, num, 1)
    return { error: null as null, num, den, zeros, polos, segs, sigma, angs, bk, cruzs, info, Ks, ramos, s0, t, K, partidas, routh0 }
  }, [nG, dG, nH, dH, sr, si])

  return (
    <>
      <header><h1>LGR — 12 Passos</h1><p>DCA-3701 UFRN · 100% no celular · offline (PWA)</p></header>
      <main>
        <div className="card">
          <label>Exemplo da lista</label>
          <select value={exId} onChange={(e) => pickEx(e.target.value)}>
            {EXEMPLOS.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
          <div className="grid2">
            <div><label>Numerador G(s)</label><input value={nG} onChange={(e) => setNG(e.target.value)} inputMode="decimal" /></div>
            <div><label>Denominador G(s)</label><input value={dG} onChange={(e) => setDG(e.target.value)} inputMode="decimal" /></div>
            <div><label>Numerador H(s)</label><input value={nH} onChange={(e) => setNH(e.target.value)} inputMode="decimal" /></div>
            <div><label>Denominador H(s)</label><input value={dH} onChange={(e) => setDH(e.target.value)} inputMode="decimal" /></div>
            <div><label>Teste Re(s0)</label><input value={sr} onChange={(e) => setSr(e.target.value)} inputMode="decimal" /></div>
            <div><label>Teste Im(s0)</label><input value={si} onChange={(e) => setSi(e.target.value)} inputMode="decimal" /></div>
          </div>
          <p style={{ fontSize: 12, color: '#475569' }}>Coefs em ordem decrescente de s, separados por espaço. Ex.: s²+13s → “1 13 0”.</p>
        </div>

        {calc.error ? <div className="card badge-warn">{calc.error}</div> : (
          <>
            <details open><summary>Passo 1 — Equação característica</summary>
              <div className="mono">G(s)H(s) = K·({polinomioParaTexto(calc.num)})/({polinomioParaTexto(calc.den)})</div>
              <div className="mono">1 + K·P(s) = 0 → {polinomioParaTexto(calc.den)} + K·({polinomioParaTexto(calc.num)}) = 0</div>
            </details>
            <details><summary>Passo 2 — Forma fatorada</summary>
              <div className="mono">P(s) = N(s)/D(s), N={polinomioParaTexto(calc.num)}, D={polinomioParaTexto(calc.den)}</div>
            </details>
            <details open><summary>Passo 3 — Polos e zeros ({calc.polos.length}p / {calc.zeros.length}z)</summary>
              <LgrPlot title="Polos (x) e zeros (o)" traces={[
                { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { symbol: 'x', size: 11, color: 'red' } },
                { x: calc.zeros.map((z) => z.re), y: calc.zeros.map((z) => z.im), mode: 'markers', name: 'zeros', marker: { symbol: 'circle-open', size: 10, color: 'green' } },
              ]} />
              <div className="mono">polos: {calc.polos.map(formatarComplexo).join(' · ')}</div>
              <div className="mono">zeros: {calc.zeros.length ? calc.zeros.map(formatarComplexo).join(' · ') : 'nenhum finito'}</div>
            </details>
            <details><summary>Passo 4 — Segmentos eixo real</summary>
              <div className="mono">{calc.segs.length ? calc.segs.map(([a, b]) => `[${a === -Infinity ? '-∞' : a.toFixed(4)}, ${b.toFixed(4)}]`).join('  ') : 'nenhum segmento'}</div>
            </details>
            <details><summary>Passo 5 — Lugares separados</summary>
              <div className="mono">Ls = max(np,nz) = max({calc.polos.length},{calc.zeros.length}) = {Math.max(calc.polos.length, calc.zeros.length)}</div>
            </details>
            <details><summary>Passo 6 — Simetria</summary><p>Simétrico ao eixo real (pares conjugados).</p></details>
            <details open><summary>Passo 7 — Assíntotas</summary>
              {calc.sigma === null ? <p>np ≤ nz → sem assíntotas.</p> : (
                <><div className="mono">na={calc.polos.length - calc.zeros.length}, σa={calc.sigma.toFixed(4)}, φ={calc.angs.map((a) => a.toFixed(1) + '°').join(', ')}</div>
                <LgrPlot title="Assíntotas" traces={[
                  { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { color: 'red', symbol: 'x', size: 10 } },
                  ...calc.angs.map((a, i) => {
                    const r = (a * Math.PI) / 180, L = 20
                    return { x: [calc.sigma as number, (calc.sigma as number) + L * Math.cos(r)], y: [0, L * Math.sin(r)], mode: 'lines', name: i === 0 ? 'assíntotas' : undefined } as never
                  }),
                ]} /></>
              )}
            </details>
            <details><summary>Passo 8 — Breakaway/Break-in (dK/ds=0)</summary>
              <div className="mono">{calc.bk.length ? calc.bk.map((b) => `s=${formatarComplexo(b.s)} K=${b.K.toFixed(4)}`).join('\n') : 'nenhum ponto válido com K>0 no LGR'}</div>
            </details>
            <details><summary>Passo 9 — Cruzamento eixo imaginário (Routh + s=jω)</summary>
              <div className="mono">cross(ω)={polinomioParaTexto(calc.info.cross, 'ω')}=0</div>
              <div className="mono">{calc.cruzs.length ? calc.cruzs.map((c) => `ω=${c.w.toFixed(4)} K=${c.K.toFixed(4)} s=±${c.w.toFixed(4)}j`).join('\n') : 'não cruza p/ K>0'}</div>
              <div className="mono">Routh K=1, 1ª coluna: {calc.routh0.map((r) => r[0].toFixed(3)).join(' | ')}</div>
            </details>
            <details><summary>Passo 10 — Ângulos partida/chegada</summary>
              <div className="mono">{calc.partidas.length ? calc.partidas.map((p) => `p=${formatarComplexo(p.p)} θd=${p.ang.toFixed(2)}°`).join('\n') : 'sem polos complexos — não se aplica (' + calc.polos.filter((p) => !ehNumeroReal(p)).length + ' complexos)'}</div>
            </details>
            <details open><summary>Passo 11 — Critério do ângulo em s0={formatarComplexo(calc.s0)}</summary>
              <p className={calc.t.pertence ? 'badge-ok' : 'badge-warn'}>{calc.t.pertence ? 'PERTENCE ao LGR' : 'NÃO pertence'} (∠={calc.t.norm.toFixed(2)}°, alvo ±180°)</p>
              <LgrPlot title="Teste s0" traces={[
                { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { color: 'red', symbol: 'x', size: 10 } },
                { x: [calc.s0.re], y: [calc.s0.im], mode: 'markers', name: 's0', marker: { color: calc.t.pertence ? 'green' : 'red', size: 13, symbol: 'star' } },
              ]} />
            </details>
            <details open><summary>Passo 12 — K em s0</summary>
              <div className="mono">K = Π|s0−pi| / Π|s0−zi| = {Number.isFinite(calc.K) ? calc.K.toFixed(6) : '∞'}</div>
            </details>
            <details open><summary>LGR completo</summary>
              <LgrPlot title="Lugar Geométrico das Raízes" traces={[
                ...Array.from({ length: calc.polos.length }, (_, j) => ({
                  x: calc.ramos.map((r) => r[j]?.re).filter((v) => Number.isFinite(v)),
                  y: calc.ramos.map((r) => r[j]?.im).filter((v) => Number.isFinite(v)),
                  mode: 'lines', name: `ramo ${j + 1}`,
                })),
                { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { color: 'red', symbol: 'x', size: 10 } },
              ]} />
            </details>
          </>
        )}
        <p style={{ fontSize: 12, color: '#64748b' }}>Spec: 12 passos SisContr.pdf p.6 · Routh numérico · rode <code>npm run dev -- --host</code> e abra o IP no celular.</p>
      </main>
    </>
  )
}
