// Motor numérico LGR — port 1:1 de app_lgr.py (numpy/sympy) para TS puro client-side
// 12 passos oficiais SisContr.pdf p.6

export interface Complex { re: number; im: number }

export const C = (re: number, im = 0): Complex => ({ re, im })
export const cadd = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im })
export const csub = (a: Complex, b: Complex): Complex => ({ re: a.re - b.re, im: a.im - b.im })
export const cmul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
})
export const cdiv = (a: Complex, b: Complex): Complex => {
  const d = b.re * b.re + b.im * b.im || 1e-300
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }
}
export const cabs = (a: Complex): number => Math.hypot(a.re, a.im)
export const cangleDeg = (a: Complex): number => (Math.atan2(a.im, a.re) * 180) / Math.PI

// ---------- polinômios (coefs ordem decrescente, como numpy.poly) ----------

export function parseCoefs(texto: string): number[] | null {
  try {
    const vals = texto.trim().split(/[\s,;]+/).filter(Boolean).map(Number)
    if (vals.length === 0 || vals.some((v) => Number.isNaN(v))) return null
    return vals
  } catch { return null }
}

export function convolve(a: number[], b: number[]): number[] {
  const out = new Array(a.length + b.length - 1).fill(0)
  for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j]
  return out
}

export function padLeft(a: number[], n: number): number[] {
  return a.length >= n ? a : [...new Array(n - a.length).fill(0), ...a]
}

export function polyadd(a: number[], b: number[]): number[] {
  const n = Math.max(a.length, b.length)
  const pa = padLeft(a, n), pb = padLeft(b, n)
  return pa.map((v, i) => v + pb[i])
}

export function polysub(a: number[], b: number[]): number[] {
  const n = Math.max(a.length, b.length)
  const pa = padLeft(a, n), pb = padLeft(b, n)
  return pa.map((v, i) => v - pb[i])
}

export function polyder(p: number[]): number[] {
  if (p.length <= 1) return [0]
  const g = p.length - 1
  return p.slice(0, -1).map((c, k) => c * (g - k))
}

export function polyvalReal(p: number[], x: number): number {
  return p.reduce((acc, c) => acc * x + c, 0)
}

export function polyvalComplex(p: number[], s: Complex): Complex {
  let acc: Complex = C(0, 0)
  for (const c of p) acc = cadd(cmul(acc, s), C(c, 0))
  return acc
}

// Durand-Kerner (Weierstrass) — suficiente p/ graus 1..8 do LGR
// Retorna [] se polinômio constante.
export function roots(coefs: number[]): Complex[] {
  const c = [...coefs]
  while (c.length > 1 && Math.abs(c[0]) < 1e-14) c.shift()
  // zeros na origem (termo independente = 0) são raízes s=0 — extrai antes
  let nZero = 0
  while (c.length > 1 && Math.abs(c[c.length - 1]) < 1e-14) { c.pop(); nZero++ }
  const zerosOrigem: Complex[] = Array.from({ length: nZero }, () => C(0, 0))
  const deg = c.length - 1
  if (deg <= 0) return zerosOrigem
  if (deg === 1) return [...zerosOrigem, C(-c[1] / c[0], 0)]
  // normaliza mônico
  const lead = c[0]
  const m = c.map((v) => v / lead)
  const rts: Complex[] = []
  for (let k = 0; k < deg; k++) {
    const ang = (2 * Math.PI * k) / deg + 0.4
    rts.push({ re: 0.8 * Math.cos(ang), im: 0.8 * Math.sin(ang) })
  }
  const val = (s: Complex): Complex => {
    let acc: Complex = C(0, 0)
    for (const cf of m) acc = cadd(cmul(acc, s), C(cf, 0))
    return acc
  }
  for (let it = 0; it < 3000; it++) {
    let maxDelta = 0
    for (let i = 0; i < deg; i++) {
      const pi = val(rts[i])
      let denom: Complex = C(1, 0)
      for (let j = 0; j < deg; j++) if (i !== j) denom = cmul(denom, csub(rts[i], rts[j]))
      if (cabs(denom) < 1e-300) continue
      const delta = cdiv(pi, denom)
      rts[i] = csub(rts[i], delta)
      maxDelta = Math.max(maxDelta, cabs(delta))
    }
    if (maxDelta < 1e-12) break
  }
  return [
    ...zerosOrigem,
    ...rts.map((r) => ({
      re: Math.abs(r.re) < 1e-9 ? 0 : r.re,
      im: Math.abs(r.im) < 1e-9 ? 0 : r.im,
    })),
  ]
}

// ---------- Passo 1 ----------
export function fazerPasso1(nG: number[], dG: number[], nH: number[], dH: number[]) {
  const num = convolve(nG, nH)
  const den = convolve(dG, dH)
  const n = Math.max(num.length, den.length)
  return { num: padLeft(num, n), den: padLeft(den, n) }
}

// ---------- Passo 3 helpers ----------
export const isReal = (c: Complex, tol = 1e-6) => Math.abs(c.im) < tol

// ---------- Passo 4 ----------
export function acharSegmentosEixoReal(zeros: Complex[], polos: Complex[]): Array<[number, number]> {
  const reais: number[] = []
  for (const p of polos) if (isReal(p, 1e-8)) reais.push(p.re)
  for (const z of zeros) if (isReal(z, 1e-8)) reais.push(z.re)
  if (!reais.length) return []
  const front = [...new Set(reais.map((r) => Math.round(r * 1e8) / 1e8))].sort((a, b) => b - a)
  const segs: Array<[number, number]> = []
  for (let i = 0; i < front.length - 1; i++) {
    const meio = (front[i] + front[i + 1]) / 2
    const cont = reais.filter((r) => r > meio + 1e-10).length
    if (cont % 2 === 1) segs.push([front[i + 1], front[i]])
  }
  if (reais.length % 2 === 1) segs.push([-Infinity, front[front.length - 1]])
  return segs
}

// ---------- Passo 7 ----------
export function calcularAssintotas(zeros: Complex[], polos: Complex[]): { sigma: number | null; angs: number[] } {
  const diff = polos.length - zeros.length
  if (diff <= 0) return { sigma: null, angs: [] }
  const somaP = polos.reduce((a, p) => a + p.re, 0)
  const somaZ = zeros.reduce((a, z) => a + z.re, 0)
  const sigma = (somaP - somaZ) / diff
  const angs = Array.from({ length: diff }, (_, q) => ((2 * q + 1) * 180) / diff)
  return { sigma, angs }
}

// ---------- Passo 8 ----------
export interface BreakPoint { s: Complex; K: number }
export function acharBreakaway(num: number[], den: number[], polos: Complex[], zeros: Complex[]): BreakPoint[] {
  const dN = polyder(num)
  const dD = polyder(den)
  const eq = polysub(convolve(num, dD), convolve(den, dN))
  const raizes = roots(eq)
  const reaisPZ = [...polos, ...zeros].filter((p) => isReal(p, 1e-8)).map((p) => p.re)
  const pts: BreakPoint[] = []
  for (const r of raizes) {
    const vn = polyvalComplex(num, r)
    const vd = polyvalComplex(den, r)
    if (cabs(vn) < 1e-12) continue
    const Kv = cdiv({ re: -vd.re, im: -vd.im }, vn)
    if (Math.abs(r.im) < 1e-4) {
      const rr = r.re
      const cont = reaisPZ.filter((x) => x > rr + 1e-10).length
      if (cont % 2 === 1 && Kv.re > 0 && Math.abs(Kv.im) < 1e-3) pts.push({ s: C(rr, 0), K: Kv.re })
    } else if (Math.abs(Kv.im) < 1e-3 && Kv.re > 0) {
      pts.push({ s: r, K: Kv.re })
    }
  }
  return pts
}

// ---------- Passo 9: s=jw ----------
function separarJw(coefs: number[]): { re: number[]; im: number[] } {
  const grau = coefs.length - 1
  const reMap = new Map<number, number>()
  const imMap = new Map<number, number>()
  for (let k = 0; k < coefs.length; k++) {
    const pot = grau - k
    const c = coefs[k]
    const r = ((pot % 4) + 4) % 4
    if (r === 0) reMap.set(pot, (reMap.get(pot) ?? 0) + c)
    else if (r === 1) imMap.set(pot, (imMap.get(pot) ?? 0) + c)
    else if (r === 2) reMap.set(pot, (reMap.get(pot) ?? 0) - c)
    else imMap.set(pot, (imMap.get(pot) ?? 0) - c)
  }
  const montar = (d: Map<number, number>): number[] => {
    if (!d.size) return [0]
    const g = Math.max(...d.keys())
    const arr = new Array(g + 1).fill(0)
    for (const [p, v] of d) arr[g - p] = v
    return arr
  }
  return { re: montar(reMap), im: montar(imMap) }
}

export interface Cruzamento { K: number; w: number }
export function cruzamentoJw(den: number[], num: number[]): { cruzs: Cruzamento[]; info: Record<string, number[]> } {
  const dR = separarJw(den), dI = { re: [0], im: [0] }
  const Re_D = separarJw(den).re, Im_D = separarJw(den).im
  const Re_N = separarJw(num).re, Im_N = separarJw(num).im
  void dR; void dI
  let cross = polysub(convolve(Re_D, Im_N), convolve(Im_D, Re_N))
  while (cross.length > 1 && Math.abs(cross[0]) < 1e-12) cross = cross.slice(1)
  const info = { Re_D, Im_D, Re_N, Im_N, cross }
  if (cross.length <= 1) return { cruzs: [], info }
  const ws = roots(cross)
  const out: Cruzamento[] = []
  for (const w of ws) {
    if (Math.abs(w.im) > 1e-4 || w.re < 1e-8) continue
    const omega = w.re
    const ImN = polyvalReal(Im_N, omega), ImD = polyvalReal(Im_D, omega)
    const ReN = polyvalReal(Re_N, omega), ReD = polyvalReal(Re_D, omega)
    let K = NaN
    if (Math.abs(ImN) > 1e-12) K = -ImD / ImN
    else if (Math.abs(ReN) > 1e-12) K = -ReD / ReN
    else continue
    if (K > 1e-10 && !out.some((o) => Math.abs(o.K - K) < 1e-4 && Math.abs(o.w - omega) < 1e-4))
      out.push({ K, w: omega })
  }
  return { cruzs: out, info }
}

// Routh numérico p/ K fixo (exibição + estabilidade)
export function routhTable(den: number[], num: number[], K: number): number[][] {
  const n = Math.max(den.length, num.length)
  const coefs = padLeft(den, n).map((d, i) => d + K * padLeft(num, n)[i])
  const grau = coefs.length - 1
  const cols = Math.floor((grau + 2) / 2)
  const tab: number[][] = Array.from({ length: grau + 1 }, () => new Array(cols).fill(0))
  for (let j = 0; j < cols; j++) {
    if (2 * j < coefs.length) tab[0][j] = coefs[2 * j]
    if (2 * j + 1 < coefs.length && tab.length > 1) tab[1][j] = coefs[2 * j + 1]
  }
  for (let i = 2; i <= grau; i++) {
    const piv = tab[i - 1][0]
    if (Math.abs(piv) < 1e-12) break
    for (let j = 0; j < cols - 1; j++) {
      tab[i][j] = (tab[i - 1][0] * tab[i - 2][j + 1] - tab[i - 2][0] * tab[i - 1][j + 1]) / piv
    }
  }
  return tab
}

// ---------- LGR completo (fundo do gráfico) ----------
function ordenarRaizes(prev: Complex[], curr: Complex[]): Complex[] {
  const n = curr.length
  const out: Complex[] = new Array(n)
  const usado = new Set<number>()
  for (let i = 0; i < n; i++) {
    let melhor = -1, dm = Infinity
    for (let j = 0; j < n; j++) {
      if (usado.has(j)) continue
      const d = Math.hypot(prev[i].re - curr[j].re, prev[i].im - curr[j].im)
      if (d < dm) { dm = d; melhor = j }
    }
    out[i] = curr[melhor]; usado.add(melhor)
  }
  return out
}

export function calcularLgr(num: number[], den: number[], Kmax?: number): { Ks: number[]; ramos: Complex[][] } {
  const np = den.length - 1
  let kmax = Kmax ?? 100
  if (Kmax === undefined) {
    kmax = 1000
    for (const kt of [100, 500, 1000, 5000]) {
      const poly = polyadd(den, padLeft(num, den.length).map((v) => v * kt))
      const rr = roots(poly)
      if (rr.some((r) => cabs(r) > 50)) { kmax = kt; break }
    }
  }
  const k1 = Array.from({ length: 120 }, (_, i) => (i / 119) * 0.5)
  const k2 = Array.from({ length: 600 }, (_, i) => 0.5 * Math.pow(kmax / 0.5, i / 599))
  const Ks = [...new Set([...k1, ...k2])].sort((a, b) => a - b)
  const ramos: Complex[][] = []
  let prev: Complex[] | null = null
  for (const k of Ks) {
    const poly = polyadd(den, padLeft(num, den.length).map((v) => v * k))
    let r = roots(poly)
    // garante ordem np (completa com NaN se degenerar)
    while (r.length < np) r.push(C(NaN, NaN))
    r = r.slice(0, np)
    if (prev) r = ordenarRaizes(prev, r)
    prev = r
    ramos.push(r)
  }
  // transpõe p/ ramos por polo: ramos[k][j] -> series[j][k]
  return { Ks, ramos }
}

// ---------- Passos 10/11/12 ----------
export function anguloPartida(polo: Complex, polos: Complex[], zeros: Complex[]): number {
  let sp = 0, sz = 0
  for (const pj of polos) if (Math.hypot(pj.re - polo.re, pj.im - polo.im) > 1e-10) sp += cangleDeg(csub(polo, pj))
  for (const zj of zeros) sz += cangleDeg(csub(polo, zj))
  let t = 180 - sp + sz
  t = ((t + 180) % 360 + 360) % 360 - 180
  return t
}

export function testarAngulo(s0: Complex, zeros: Complex[], polos: Complex[]) {
  const ap = polos.reduce((a, p) => a + cangleDeg(csub(s0, p)), 0)
  const az = zeros.reduce((a, z) => a + cangleDeg(csub(s0, z)), 0)
  const ang = az - ap
  const norm = ((ang + 180) % 360 + 360) % 360 - 180
  const pertence = Math.abs(Math.abs(norm) - 180) < 5
  let K: number | null = null
  if (pertence) {
    const pp = polos.reduce((a, p) => a * Math.hypot(s0.re - p.re, s0.im - p.im), 1)
    const pz = zeros.length ? zeros.reduce((a, z) => a * Math.hypot(s0.re - z.re, s0.im - z.im), 1) : 1
    K = pz > 1e-12 ? pp / pz : Infinity
  }
  return { ang, norm, pertence, K }
}

export function calcularK(s0: Complex, zeros: Complex[], polos: Complex[]): number {
  const pp = polos.reduce((a, p) => a * Math.hypot(s0.re - p.re, s0.im - p.im), 1)
  const pz = zeros.length ? zeros.reduce((a, z) => a * Math.hypot(s0.re - z.re, s0.im - z.im), 1) : 1
  return pz > 1e-12 ? pp / pz : Infinity
}

// ---------- formatação ----------
export function fmt(c: Complex, dec = 4): string {
  const r = +c.re.toFixed(dec), im = +c.im.toFixed(dec)
  if (Math.abs(im) < 1e-10) return `${r}`
  const s = im >= 0 ? '+' : '-'
  return `${r} ${s} ${Math.abs(im)}j`
}

export function polyStr(coefs: number[], v = 's'): string {
  const g = coefs.length - 1
  const parts: string[] = []
  coefs.forEach((c, k) => {
    const e = g - k
    if (Math.abs(c) < 1e-12) return
    const a = Math.abs(c)
    const cs = e === 0 ? `${+a.toFixed(4)}` : Math.abs(a - 1) < 1e-12 ? '' : `${+a.toFixed(4)}`
    const t = e === 0 ? cs : e === 1 ? `${cs}${v}` : `${cs}${v}^${e}`
    parts.push(parts.length === 0 ? (c < 0 ? `-${t}` : t) : c < 0 ? ` - ${t}` : ` + ${t}`)
  })
  return parts.join('') || '0'
}
