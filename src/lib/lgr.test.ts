import { describe, expect, it } from 'vitest'
import { acharSegmentosEixoReal, calcularAssintotas, fazerPasso1, parseCoefs, roots, C } from './lgr'

describe('lgr core', () => {
  it('parseCoefs', () => {
    expect(parseCoefs('1 4 0')).toEqual([1, 4, 0])
    expect(parseCoefs('a b')).toBeNull()
  })
  it('roots 2o grau', () => {
    const r = roots([1, 4, 0])
    const xs = r.map((c) => Math.round(c.re * 1e6) / 1e6).sort((a, b) => a - b)
    expect(xs).toEqual([-4, 0])
  })
  it('passo1 básico', () => {
    const { num, den } = fazerPasso1([1, 2], [1, 4, 0], [1], [1, 1])
    expect(num.length).toBe(den.length)
  })
  it('assintotas Q1: np=3 nz=1 -> na=2 sigma?', () => {
    // Q1: G=K(s+1)/(s²+13s), H=1/s => P: num=(s+1), den=s²(s+13)? denG=s(s+13), denH=s => den=s²(s+13) grau 3
    const { num, den } = fazerPasso1([1, 1], [1, 13, 0], [1], [1, 0])
    const zeros = roots(num), polos = roots(den)
    expect(polos.length).toBe(3)
    const { sigma, angs } = calcularAssintotas(zeros, polos)
    expect(angs.length).toBe(2)
    expect(sigma).toBeCloseTo(-6, 6)
  })
  it('segmentos eixo real', () => {
    const segs = acharSegmentosEixoReal([C(-2, 0)], [C(0, 0), C(-4, 0)])
    expect(segs.length).toBeGreaterThan(0)
  })
})
