'use client'

import { useState, useRef, useEffect } from 'react'
import type { Mira } from '@/data/crosshairs'
import { parseCode, drawCrosshair, type CrosshairConfig } from '@/lib/crosshair-renderer'

const configCache = new Map<string, CrosshairConfig>()

function getCachedConfig(code: string): CrosshairConfig {
  let config = configCache.get(code)
  if (!config) {
    config = parseCode(code)
    configCache.set(code, config)
  }
  return config
}

function CrosshairCanvas({ code }: { code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = getCachedConfig(code)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCrosshair(ctx, canvas.width / 2, canvas.height / 2, config, 2)
  }, [code])

  return <canvas ref={canvasRef} width={208} height={128} className='w-full h-full' />
}

function ButtonClip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className='absolute left-0 bottom-0 h-12 w-full cursor-pointer'>
      <div
        onClick={handleClick}
        className={`absolute inset-0 flex h-full w-full items-center justify-center gap-2 transition-all duration-200 ${
          copied ? 'bg-green-600' : 'bg-[#EF2D5E] hover:bg-[#d4264f]'
        }`}
      >
        {copied ? (
          <span className='text-white text-sm font-semibold'>✓ Copiado</span>
        ) : (
          <>
            <svg className='h-5 w-5 stroke-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
              />
            </svg>
            <span className='text-white text-xs font-semibold'>COPIAR</span>
          </>
        )}
      </div>
    </div>
  )
}

export default function Card({ miras }: { miras: Mira[] }) {
  return (
    <>
      {miras.map((mira, index) => (
        <div
          key={index}
          className='group card-crosshair relative h-48 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-card transition-all duration-300 hover:scale-[1.03] hover:border-[#EF2D5E]/30 hover:shadow-glow-pink md:w-48'
        >
          <div className='absolute top-0 left-0 flex h-32 w-full items-center justify-center bg-[#0f1923]'>
            {mira.codeCrosshair ? <CrosshairCanvas code={mira.codeCrosshair} /> : null}
          </div>
          <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-[#141414] via-transparent to-transparent'>
            <span className='absolute bottom-1 left-2 text-lg font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]'>{mira.name}</span>
          </div>
          {mira.codeCrosshair && <ButtonClip code={mira.codeCrosshair} />}
        </div>
      ))}
    </>
  )
}
