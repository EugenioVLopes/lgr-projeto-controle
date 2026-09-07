import { useEffect, useMemo, useState } from 'react'
import LgrPlot, { type Trace } from './components/LgrPlot'
import Formula, { polinomioParaLatex } from './components/Formula'
import { EXEMPLOS } from './lib/examples'
import {
  criarComplexo, encontrarPontosBreakaway, encontrarSegmentosEixoReal, calcularAnguloPartida, calcularAssintotas,
  calcularGanhoK, calcularRamosLgr, encontrarCruzamentosEixoImaginario, combinarMalhaAberta, formatarComplexo, ehNumeroReal, analisarCoeficientes,
  encontrarRaizes, montarTabelaRouth, testarCriterioAngulo,
} from './lib/lgr/index'
import type { BreakPoint, Complex, Cruzamento, TesteAngulo } from './lib/lgr/index'

function useValorComDebounce<T>(valor: T, atraso = 300): T {
  const [debounced, setDebounced] = useState(valor)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(valor), atraso)
    return () => clearTimeout(t)
  }, [valor, atraso])
  return debounced
}

type CalcErro = { error: string }
type CalcOk = {
  error: null; num: number[]; den: number[]; zeros: Complex[]; polos: Complex[]
  segs: Array<[number, number]>; sigma: number | null; angs: number[]
  bk: BreakPoint[]; cruzs: Cruzamento[]; info: Record<string, number[]>; Ks: number[]; ramos: Complex[][]
  s0: Complex; t: TesteAngulo; K: number; partidas: Array<{ p: Complex; ang: number }>; routh0: number[][]
}
type Calc = CalcErro | CalcOk

export default function App() {
  const exemploInicial = EXEMPLOS.find((e) => e.id === 'q1') ?? EXEMPLOS[0]
  const [exId, setExId] = useState(exemploInicial.id)
  const [nG, setNG] = useState(exemploInicial.nG)
  const [dG, setDG] = useState(exemploInicial.dG)
  const [nH, setNH] = useState(exemploInicial.nH)
  const [dH, setDH] = useState(exemploInicial.dH)
  const [sr, setSr] = useState(String(exemploInicial.sr))
  const [si, setSi] = useState(String(exemploInicial.si))
  const [tema, setTema] = useState<'light' | 'dark'>('light')
  const corPolo = tema === 'dark' ? '#f87171' : '#dc2626'
  const corZero = tema === 'dark' ? '#4ade80' : '#16a34a'

  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  const pickEx = (id: string) => {
    const e = EXEMPLOS.find((x) => x.id === id) ?? EXEMPLOS[0]
    setExId(e.id); setNG(e.nG); setDG(e.dG); setNH(e.nH); setDH(e.dH); setSr(String(e.sr)); setSi(String(e.si))
  }

  const nGd = useValorComDebounce(nG)
  const dGd = useValorComDebounce(dG)
  const nHd = useValorComDebounce(nH)
  const dHd = useValorComDebounce(dH)
  const srd = useValorComDebounce(sr)
  const sid = useValorComDebounce(si)

  const calc: Calc = useMemo(() => {
    const pNG = analisarCoeficientes(nGd)
    const pDG = analisarCoeficientes(dGd)
    const pNH = analisarCoeficientes(nHd)
    const pDH = analisarCoeficientes(dHd)
    if (!pNG || !pDG || !pNH || !pDH) return { error: 'Confere os coeficientes (use espaços: ex. "1 4 0")' }
    const { num, den } = combinarMalhaAberta(pNG, pDG, pNH, pDH)
    const zeros = encontrarRaizes(num)
    const polos = encontrarRaizes(den)
    const segs = encontrarSegmentosEixoReal(zeros, polos)
    const { sigma, angs } = calcularAssintotas(zeros, polos)
    const bk = encontrarPontosBreakaway(num, den, polos, zeros)
    const { cruzs, info } = encontrarCruzamentosEixoImaginario(den, num)
    const { Ks, ramos } = calcularRamosLgr(num, den)
    const s0 = criarComplexo(Number(srd) || 0, Number(sid) || 0)
    const t = testarCriterioAngulo(s0, zeros, polos)
    const K = calcularGanhoK(s0, zeros, polos)
    const cxP = polos.filter((p) => p.im > 1e-8)
    const partidas = cxP.map((p) => ({ p, ang: calcularAnguloPartida(p, polos, zeros) }))
    const routh0 = montarTabelaRouth(den, num, 1)
    return { error: null, num, den, zeros, polos, segs, sigma, angs, bk, cruzs, info, Ks, ramos, s0, t, K, partidas, routh0 }
  }, [nGd, dGd, nHd, dHd, srd, sid])

  const tracesRamos: Trace[] = useMemo(() => {
    if (calc.error !== null) return []
    return [
      ...Array.from({ length: calc.polos.length }, (_, j) => ({
        x: calc.ramos.map((r) => r[j]?.re).filter((v): v is number => Number.isFinite(v)),
        y: calc.ramos.map((r) => r[j]?.im).filter((v): v is number => Number.isFinite(v)),
        mode: 'lines',
        name: `ramo ${j + 1}`,
      })),
      {
        x: calc.polos.map((p) => p.re),
        y: calc.polos.map((p) => p.im),
        mode: 'markers',
        name: 'polos',
        marker: { color: corPolo, symbol: 'x', size: 10 },
      },
    ]
  }, [calc, corPolo])

  return (
    <>
      <header>
        <div className="header-row">
          <div><h1>LGR 12 passos</h1><p>DCA-3701 UFRN</p></div>
          <button type="button" className="primary" style={{ width: 'auto', marginTop: 0 }} onClick={() => setTema((t) => (t === 'light' ? 'dark' : 'light'))} aria-pressed={tema === 'dark'}>
            {tema === 'light' ? 'Modo escuro' : 'Modo claro'}
          </button>
        </div>
      </header>
      <main>
        <div className="card">
          <label htmlFor="exemplo">Exemplo da lista</label>
          <select id="exemplo" value={exId} onChange={(e) => pickEx(e.target.value)}>
            {EXEMPLOS.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
          <div className="grid2">
            <fieldset><legend>G(s), malha direta</legend>
              <div><label htmlFor="num-g">Numerador G(s)</label><input id="num-g" value={nG} onChange={(e) => setNG(e.target.value)} inputMode="decimal" autoComplete="off" aria-invalid={calc.error !== null} aria-describedby="erro-coefs ajuda-coefs" /></div>
              <div><label htmlFor="den-g">Denominador G(s)</label><input id="den-g" value={dG} onChange={(e) => setDG(e.target.value)} inputMode="decimal" autoComplete="off" aria-invalid={calc.error !== null} aria-describedby="erro-coefs ajuda-coefs" /></div>
            </fieldset>
            <fieldset><legend>H(s), realimentação</legend>
              <div><label htmlFor="num-h">Numerador H(s)</label><input id="num-h" value={nH} onChange={(e) => setNH(e.target.value)} inputMode="decimal" autoComplete="off" aria-invalid={calc.error !== null} aria-describedby="erro-coefs ajuda-coefs" /></div>
              <div><label htmlFor="den-h">Denominador H(s)</label><input id="den-h" value={dH} onChange={(e) => setDH(e.target.value)} inputMode="decimal" autoComplete="off" aria-invalid={calc.error !== null} aria-describedby="erro-coefs ajuda-coefs" /></div>
            </fieldset>
            <fieldset><legend>Ponto de teste s0</legend>
              <div><label htmlFor="re-s0">Teste Re(s0)</label><input id="re-s0" value={sr} onChange={(e) => setSr(e.target.value)} inputMode="decimal" autoComplete="off" aria-invalid={calc.error !== null} aria-describedby="erro-coefs ajuda-coefs" /></div>
              <div><label htmlFor="im-s0">Teste Im(s0)</label><input id="im-s0" value={si} onChange={(e) => setSi(e.target.value)} inputMode="decimal" autoComplete="off" aria-invalid={calc.error !== null} aria-describedby="erro-coefs ajuda-coefs" /></div>
            </fieldset>
          </div>
          <p id="ajuda-coefs" className="ajuda">Coefs em ordem decrescente de s, separados por espaço. Ex.: s²+13s → "1 13 0".</p>
        </div>

        {calc.error !== null ? <div id="erro-coefs" className="card badge-warn" role="alert">{calc.error}</div> : (
          <>
            <details open><summary>Passo 1, equação característica</summary>
              <Formula latex={`G(s)H(s) = K \\cdot \\frac{${polinomioParaLatex(calc.num)}}{${polinomioParaLatex(calc.den)}}`} descricao={`G H igual a K vezes N sobre D`} />
              <Formula latex={`1 + K \\cdot P(s) = 0 \\quad\\to\\quad ${polinomioParaLatex(calc.den)} + K \\cdot (${polinomioParaLatex(calc.num)}) = 0`} descricao="Equação característica" />
            </details>
            <details><summary>Passo 2, forma fatorada</summary>
              <Formula latex={`P(s) = \\frac{N(s)}{D(s)} = \\frac{${polinomioParaLatex(calc.num)}}{${polinomioParaLatex(calc.den)}}`} descricao="P igual a N sobre D" />
            </details>
            <details open><summary>Passo 3, polos e zeros ({calc.polos.length}p / {calc.zeros.length}z)</summary>
              <LgrPlot title="Polos (x) e zeros (o)" descritoPor="desc-polos" tema={tema} traces={[
                { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { symbol: 'x', size: 11, color: corPolo } },
                { x: calc.zeros.map((z) => z.re), y: calc.zeros.map((z) => z.im), mode: 'markers', name: 'zeros', marker: { symbol: 'circle-open', size: 10, color: corZero } },
              ]} />
              <div className="mono" id="desc-polos">polos: {calc.polos.map(formatarComplexo).join(' · ')}</div>
              <div className="mono">zeros: {calc.zeros.length ? calc.zeros.map(formatarComplexo).join(' · ') : 'nenhum finito'}</div>
            </details>
            <details><summary>Passo 4, segmentos eixo real</summary>
              <div className="mono">{calc.segs.length ? calc.segs.map(([a, b]) => `[${a === -Infinity ? '-∞' : a.toFixed(4)}, ${b.toFixed(4)}]`).join('  ') : 'nenhum segmento'}</div>
            </details>
            <details><summary>Passo 5, lugares separados</summary>
              <div className="mono">Ls = max(np,nz) = max({calc.polos.length},{calc.zeros.length}) = {Math.max(calc.polos.length, calc.zeros.length)}</div>
            </details>
            <details><summary>Passo 6, simetria</summary><p>Simétrico ao eixo real (pares conjugados).</p></details>
            <details open><summary>Passo 7, assíntotas</summary>
              {calc.sigma === null ? <p>np ≤ nz → sem assíntotas.</p> : (() => {
                const sig: number = calc.sigma
                return (
                  <><div className="mono" id="desc-assintotas">na={calc.polos.length - calc.zeros.length}, σa={sig.toFixed(4)}, φ={calc.angs.map((a) => a.toFixed(1) + '°').join(', ')}</div>
                    <LgrPlot title="Assíntotas" descritoPor="desc-assintotas" tema={tema} traces={[
                      { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { color: corPolo, symbol: 'x', size: 10 } },
                      ...calc.angs.map((a, i) => {
                        const r = (a * Math.PI) / 180
                        const L = 20
                        return { x: [sig, sig + L * Math.cos(r)], y: [0, L * Math.sin(r)], mode: 'lines', name: i === 0 ? 'assíntotas' : undefined }
                      }),
                    ]} /></>
                )
              })()}
            </details>
            <details><summary>Passo 8, breakaway/break-in (dK/ds=0)</summary>
              <div className="mono">{calc.bk.length ? calc.bk.map((b) => `s=${formatarComplexo(b.s)} K=${b.K.toFixed(4)}`).join('\n') : 'nenhum ponto válido com K>0 no LGR'}</div>
            </details>
            <details><summary>Passo 9, cruzamento eixo imaginário (Routh + s=jω)</summary>
              <Formula latex={`\\mathrm{cross}(\\omega) = ${polinomioParaLatex(calc.info.cross, '\\omega')} = 0`} descricao="Polinômio de cruzamento em ômega igual a zero" />
              <div className="mono">{calc.cruzs.length ? calc.cruzs.map((c) => `ω=${c.w.toFixed(4)} K=${c.K.toFixed(4)} s=±${c.w.toFixed(4)}j`).join('\n') : 'não cruza p/ K>0'}</div>
              <div className="mono">Routh K=1, 1ª coluna: {calc.routh0.map((r) => r[0].toFixed(3)).join(' | ')}</div>
            </details>
            <details><summary>Passo 10, ângulos partida/chegada</summary>
              <div className="mono">{calc.partidas.length ? calc.partidas.map((p) => `p=${formatarComplexo(p.p)} θd=${p.ang.toFixed(2)}°`).join('\n') : 'sem polos complexos, não se aplica (' + calc.polos.filter((p) => !ehNumeroReal(p)).length + ' complexos)'}</div>
            </details>
            <details open><summary>Passo 11, critério do ângulo em s0={formatarComplexo(calc.s0)}</summary>
              <p className={calc.t.pertence ? 'badge-ok' : 'badge-warn'}>{calc.t.pertence ? 'PERTENCE ao LGR' : 'NÃO pertence'} (∠={calc.t.norm.toFixed(2)}°, alvo ±180°)</p>
              <LgrPlot title="Teste s0" descritoPor="desc-s0" tema={tema} traces={[
                { x: calc.polos.map((p) => p.re), y: calc.polos.map((p) => p.im), mode: 'markers', name: 'polos', marker: { color: corPolo, symbol: 'x', size: 10 } },
                { x: [calc.s0.re], y: [calc.s0.im], mode: 'markers', name: 's0', marker: { color: calc.t.pertence ? corZero : corPolo, size: 13, symbol: 'star' } },
              ]} />
              <div className="mono" id="desc-s0">s0={formatarComplexo(calc.s0)} ∠={calc.t.norm.toFixed(2)}°</div>
            </details>
            <details open><summary>Passo 12, K em s0</summary>
              <Formula latex={`K = \\frac{\\prod|s_0-p_i|}{\\prod|s_0-z_i|} = ${Number.isFinite(calc.K) ? calc.K.toFixed(6) : '\\infty'}`} descricao={`Ganho K igual a ${Number.isFinite(calc.K) ? calc.K.toFixed(6) : 'infinito'}`} />
            </details>
            <details open><summary>LGR completo</summary>
              <LgrPlot title="Lugar Geométrico das Raízes" descritoPor="desc-lgr" tema={tema} traces={tracesRamos} />
              <div className="mono" id="desc-lgr">{calc.polos.length} ramos, K até {calc.Ks.length ? calc.Ks[calc.Ks.length - 1].toFixed(1) : '-'}</div>
            </details>
          </>
        )}
      </main>
    </>
  )
}
