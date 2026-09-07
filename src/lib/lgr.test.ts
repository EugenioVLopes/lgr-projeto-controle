import { describe, expect, it } from 'vitest'
import { encontrarSegmentosEixoReal, calcularAssintotas, combinarMalhaAberta, analisarCoeficientes, encontrarRaizes, criarComplexo } from './lgr/index'

describe('lgr core', () => {
  it('analisarCoeficientes', () => {
    expect(analisarCoeficientes('1 4 0')).toEqual([1, 4, 0])
    expect(analisarCoeficientes('a b')).toBeNull()
  })
  it('encontrarRaizes 2o grau', () => {
    const r = encontrarRaizes([1, 4, 0])
    const xs = r.map((c) => Math.round(c.re * 1e6) / 1e6).sort((a, b) => a - b)
    expect(xs).toEqual([-4, 0])
  })
  it('passo1 básico', () => {
    const { num, den } = combinarMalhaAberta([1, 2], [1, 4, 0], [1], [1, 1])
    expect(num.length).toBe(den.length)
  })
  it('assintotas Q1: np=3 nz=1 -> na=2 sigma?', () => {
    // Q1: G=K(s+1)/(s²+13s), H=1/s => P: num=(s+1), den=s²(s+13)? denG=s(s+13), denH=s => den=s²(s+13) grau 3
    const { num, den } = combinarMalhaAberta([1, 1], [1, 13, 0], [1], [1, 0])
    const zeros = encontrarRaizes(num), polos = encontrarRaizes(den)
    expect(polos.length).toBe(3)
    const { sigma, angs } = calcularAssintotas(zeros, polos)
    expect(angs.length).toBe(2)
    expect(sigma).toBeCloseTo(-6, 6)
  })
  it('segmentos eixo real', () => {
    const segs = encontrarSegmentosEixoReal([criarComplexo(-2, 0)], [criarComplexo(0, 0), criarComplexo(-4, 0)])
    expect(segs.length).toBeGreaterThan(0)
  })
})
