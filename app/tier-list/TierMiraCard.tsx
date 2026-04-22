'use client'

import { useRef, useEffect } from 'react'
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

export default function TierMiraCard({ name, code, type, tierLabel }: { name?: string; code?: string; type?: string; tierLabel: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!code) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = getCachedConfig(code)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCrosshair(ctx, canvas.width / 2, canvas.height / 2, config, 2)
  }, [code])

  return (
    <div className='flex flex-col items-center gap-1 bg-[#141414] rounded-lg border border-white/10 p-3 w-32 transition-all duration-200 hover:border-white/20 hover:scale-105'>
      <div className='w-16 h-16 flex items-center justify-center rounded bg-[#0f1923]'>
        {code ? <canvas ref={canvasRef} width={80} height={80} className='w-full h-full' /> : null}
      </div>
      <span className='text-sm font-semibold text-gray-200'>{name}</span>
      <span className='text-xs text-gray-500'>{type}</span>
    </div>
  )
}
