'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { parseCode, drawCrosshair, drawBackground } from '../../lib/crosshair-renderer'

export default function CrosshairPreview({ initialCode }: { initialCode: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [code, setCode] = useState(initialCode)
  const [copied, setCopied] = useState(false)

  const config = parseCode(code)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawBackground(ctx, canvas.width, canvas.height)
    drawCrosshair(ctx, canvas.width / 2, canvas.height / 2, config)
  }, [config])

  useEffect(() => {
    draw()
  }, [draw])

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className='flex flex-col items-center gap-6 w-full max-w-2xl'>
      {/* Input */}
      <div className='w-full'>
        <label className='text-gray-400 text-sm mb-2 block'>Código de mira</label>
        <div className='flex gap-2'>
          <input
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Pega aquí tu código de mira...'
            className='flex-1 h-11 rounded-lg border border-white/20 bg-[#141414] px-4 text-gray-100 placeholder:text-gray-500 focus:border-[#EF2D5E] focus:outline-none font-mono text-sm'
          />
          <button onClick={handleCopy} className='bg-[#EF2D5E] text-white px-4 rounded-lg text-sm font-semibold hover:bg-[#d4264f] shrink-0'>
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} width={400} height={400} className='rounded-xl border border-white/20 shadow-polvillo' />

      {/* Parsed info */}
      <div className='w-full bg-[#141414] rounded-xl border border-white/10 p-5'>
        <h3 className='text-sm font-semibold text-[#EF2D5E] uppercase mb-3'>Propiedades detectadas</h3>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm'>
          <Prop
            label='Color'
            value={
              <span className='inline-flex items-center gap-2'>
                <span className='w-3 h-3 rounded-full inline-block' style={{ background: config.color }} />
                {config.color}
              </span>
            }
          />
          <Prop label='Punto central' value={config.centerDot ? 'Sí' : 'No'} />
          <Prop label='Contorno' value={config.outlineEnabled ? `Sí (${config.outlineOpacity})` : 'No'} />
          <Prop label='Líneas internas' value={config.innerShow ? 'Sí' : 'No'} />
          {config.innerShow && (
            <>
              <Prop label='Grosor interno' value={config.innerThickness} />
              <Prop label='Longitud interna' value={config.innerLength} />
              <Prop label='Offset interno' value={config.innerOffset} />
              <Prop label='Opacidad interna' value={config.innerOpacity} />
            </>
          )}
          <Prop label='Líneas externas' value={config.outerShow ? 'Sí' : 'No'} />
          {config.outerShow && (
            <>
              <Prop label='Grosor externo' value={config.outerThickness} />
              <Prop label='Longitud externa' value={config.outerLength} />
              <Prop label='Offset externo' value={config.outerOffset} />
              <Prop label='Opacidad externa' value={config.outerOpacity} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Prop({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span className='text-gray-500 text-xs'>{label}</span>
      <div className='text-gray-200 font-semibold'>{value}</div>
    </div>
  )
}
