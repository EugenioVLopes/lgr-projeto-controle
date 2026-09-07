import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import type { Complex } from '../lib/lgr/index'

export function polinomioParaLatex(coeficientes: readonly number[], variavel = 's'): string {
  const grau = coeficientes.length - 1
  const partes: string[] = []
  coeficientes.forEach((coef, k) => {
    const expoente = grau - k
    if (Math.abs(coef) < 1e-12) return
    const abs = Math.abs(coef)
    const coefStr = expoente === 0 ? `${+abs.toFixed(4)}` : Math.abs(abs - 1) < 1e-12 ? '' : `${+abs.toFixed(4)}`
    let termo = ''
    if (expoente === 0) termo = coefStr
    else if (expoente === 1) termo = `${coefStr}${variavel}`
    else termo = `${coefStr}${variavel}^{${expoente}}`
    if (partes.length === 0) partes.push(coef < 0 ? `-${termo}` : termo)
    else partes.push(coef < 0 ? ` - ${termo}` : ` + ${termo}`)
  })
  return partes.join('') || '0'
}

export function complexoParaLatex(z: Complex, decimais = 4): string {
  const re = +z.re.toFixed(decimais)
  const im = +z.im.toFixed(decimais)
  if (Math.abs(im) < 1e-10) return `${re}`
  if (Math.abs(re) < 1e-10) return `${im}j`
  return im >= 0 ? `${re} + ${im}j` : `${re} - ${Math.abs(im)}j`
}

export default function Formula({ latex, display = false, descricao, id, inline = false }: { latex: string; display?: boolean; descricao?: string; id?: string; inline?: boolean }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, { throwOnError: false, displayMode: display })
    } catch {
      return `<code>${latex}</code>`
    }
  }, [latex, display])
  if (inline) {
    return (
      <span
        className="formula-inline"
        role="img"
        aria-label={descricao ?? latex}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
  return (
    <div
      id={id}
      className="formula"
      role="img"
      aria-label={descricao ?? latex}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
