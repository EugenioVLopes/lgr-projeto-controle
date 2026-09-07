import { useEffect, useRef } from 'react'
// @ts-expect-error plotly dist sem tipos completos
import Plotly from 'plotly.js-dist-min'

export interface Trace { x: number[]; y: number[]; mode?: string; name?: string; type?: string; marker?: unknown; line?: unknown }

export default function LgrPlot({ traces, title }: { traces: Trace[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    Plotly.newPlot(ref.current, traces as never, {
      title: { text: title, font: { size: 14 } },
      xaxis: { title: { text: 'Real' }, zeroline: true, gridcolor: '#eee' },
      yaxis: { title: { text: 'Imag (jω)' }, zeroline: true, gridcolor: '#eee', scaleanchor: 'x' },
      margin: { l: 45, r: 15, t: 40, b: 40 },
      showlegend: true,
      legend: { orientation: 'h' },
    }, { responsive: true, displaylogo: false })
    return () => { try { Plotly.purge(ref.current!) } catch { /* noop */ } }
  }, [title, JSON.stringify(traces)])
  return <div ref={ref} style={{ width: '100%', height: 340 }} />
}
