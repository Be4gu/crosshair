'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { drawCrosshair, parseCode, DEFAULT_CONFIG, type CrosshairConfig } from '@/lib/crosshair-renderer'

interface Target {
  id: number
  x: number
  y: number
  radius: number
}

type Difficulty = 'easy' | 'medium' | 'hard'

const DIFFICULTY_SETTINGS: Record<Difficulty, { minRadius: number; maxRadius: number; label: string }> = {
  easy: { minRadius: 25, maxRadius: 35, label: 'Fácil' },
  medium: { minRadius: 15, maxRadius: 25, label: 'Normal' },
  hard: { minRadius: 8, maxRadius: 15, label: 'Difícil' }
}

const GAME_DURATION = 30

export default function AimTrainer() {
  const gameRef = useRef<HTMLDivElement>(null)
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle')
  const [score, setScore] = useState(0)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [target, setTarget] = useState<Target | null>(null)
  const [useCrosshair, setUseCrosshair] = useState(false)
  const [crosshairCode, setCrosshairCode] = useState('')
  const [config, setConfig] = useState<CrosshairConfig>({ ...DEFAULT_CONFIG })
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [importMsg, setImportMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const targetIdRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const crosshairDrawnRef = useRef(false)

  // Draw crosshair image once when config changes
  useEffect(() => {
    if (!useCrosshair) return
    const canvas = cursorCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCrosshair(ctx, canvas.width / 2, canvas.height / 2, config, 1)
    crosshairDrawnRef.current = true
  }, [config, useCrosshair])

  // Move cursor canvas directly via DOM for zero-lag tracking
  useEffect(() => {
    const game = gameRef.current
    if (!game || !useCrosshair) return

    const onMove = (e: MouseEvent) => {
      const canvas = cursorCanvasRef.current
      if (!canvas) return
      const rect = game.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      canvas.style.transform = `translate(${x - 50}px, ${y - 50}px)`
    }

    game.addEventListener('mousemove', onMove)
    return () => game.removeEventListener('mousemove', onMove)
  }, [useCrosshair])

  const spawnTarget = useCallback(() => {
    const game = gameRef.current
    if (!game) return
    const rect = game.getBoundingClientRect()
    const settings = DIFFICULTY_SETTINGS[difficulty]
    const radius = settings.minRadius + Math.random() * (settings.maxRadius - settings.minRadius)
    const padding = radius + 10
    const x = padding + Math.random() * (rect.width - padding * 2)
    const y = padding + Math.random() * (rect.height - padding * 2)
    targetIdRef.current++
    setTarget({ id: targetIdRef.current, x, y, radius })
  }, [difficulty])

  const startGame = useCallback(() => {
    setGameState('playing')
    setScore(0)
    setHits(0)
    setMisses(0)
    setTimeLeft(GAME_DURATION)
    spawnTarget()

    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setGameState('ended')
          setTarget(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [spawnTarget])

  const handleClick = (e: React.MouseEvent) => {
    if (gameState !== 'playing' || !target || !gameRef.current) return

    const rect = gameRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const dist = Math.sqrt((clickX - target.x) ** 2 + (clickY - target.y) ** 2)

    if (dist <= target.radius) {
      setScore((prev) => prev + 1)
      setHits((prev) => prev + 1)
      spawnTarget()
    } else {
      setMisses((prev) => prev + 1)
    }
  }

  const handleImportCrosshair = () => {
    if (!crosshairCode.trim()) return
    try {
      const parsed = parseCode(crosshairCode.trim())
      setConfig(parsed)
      setUseCrosshair(true)
      setImportMsg({ text: '¡Mira aplicada!', type: 'success' })
      setTimeout(() => setImportMsg(null), 2000)
    } catch {
      setImportMsg({ text: 'Código inválido', type: 'error' })
      setTimeout(() => setImportMsg(null), 2000)
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0

  return (
    <div className='w-full max-w-6xl space-y-6'>
      {/* Controls */}
      <div className='bg-[#111] border border-white/10 rounded-2xl p-5'>
        <div className='flex flex-wrap items-center gap-6 mb-4'>
          {/* Difficulty selector */}
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-400'>Dificultad:</span>
            <div className='flex gap-1'>
              {(Object.entries(DIFFICULTY_SETTINGS) as [Difficulty, (typeof DIFFICULTY_SETTINGS)['easy']][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    difficulty === key ? 'bg-[#EF2D5E] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom crosshair toggle */}
          <label className='flex items-center gap-2 cursor-pointer'>
            <div className='relative'>
              <input type='checkbox' className='sr-only' checked={useCrosshair} onChange={(e) => setUseCrosshair(e.target.checked)} />
              <div className={`block w-10 h-6 rounded-full transition-colors ${useCrosshair ? 'bg-[#EF2D5E]' : 'bg-white/10'}`} />
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${useCrosshair ? 'translate-x-4' : ''}`} />
            </div>
            <span className='text-sm text-gray-300'>Mira personalizada</span>
          </label>
        </div>

        {useCrosshair && (
          <div className='flex flex-wrap gap-2 mb-4 items-center'>
            <input
              type='text'
              value={crosshairCode}
              onChange={(e) => setCrosshairCode(e.target.value)}
              placeholder='Pega tu código de mira...'
              className='flex-1 min-w-[200px] bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#EF2D5E]/50 font-mono'
            />
            <button onClick={handleImportCrosshair} className='bg-[#EF2D5E] hover:bg-[#d4264f] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors'>
              Aplicar
            </button>
            {importMsg && <span className={`text-xs font-medium ${importMsg.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{importMsg.text}</span>}
          </div>
        )}

        {/* Stats */}
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm'>
          <div className='flex items-center gap-2'>
            <span className='text-gray-500'>Puntos</span>
            <span className='text-white font-bold text-xl tabular-nums'>{score}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-500'>Precisión</span>
            <span className='text-white font-bold tabular-nums'>{accuracy}%</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-500'>Aciertos</span>
            <span className='text-green-400 font-bold tabular-nums'>{hits}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-gray-500'>Fallos</span>
            <span className='text-red-400 font-bold tabular-nums'>{misses}</span>
          </div>
          <div className='ml-auto flex items-center gap-2'>
            <span className='text-gray-500'>Tiempo</span>
            <span className={`font-black text-2xl tabular-nums ${timeLeft <= 5 && gameState === 'playing' ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameRef}
        onClick={handleClick}
        className={`relative w-full h-[500px] rounded-2xl border border-white/10 overflow-hidden select-none ${
          gameState === 'playing' && useCrosshair ? 'cursor-none' : gameState === 'playing' ? 'cursor-crosshair' : ''
        }`}
        style={{ background: '#0f1923' }}
      >
        {/* Grid bg */}
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Target */}
        {target && gameState === 'playing' && (
          <div
            key={target.id}
            className='absolute rounded-full animate-fadeIn'
            style={{
              width: target.radius * 2,
              height: target.radius * 2,
              left: target.x - target.radius,
              top: target.y - target.radius,
              background: 'radial-gradient(circle, #EF2D5E 0%, #EF2D5E 60%, rgba(239,45,94,0.6) 100%)',
              boxShadow: '0 0 20px rgba(239,45,94,0.4), 0 0 60px rgba(239,45,94,0.15)'
            }}
          >
            <div className='absolute inset-[25%] rounded-full bg-white/20 border border-white/30' />
            <div className='absolute inset-[45%] rounded-full bg-white/60' />
          </div>
        )}

        {/* Custom crosshair cursor */}
        {useCrosshair && gameState === 'playing' && (
          <canvas ref={cursorCanvasRef} width={100} height={100} className='absolute top-0 left-0 pointer-events-none z-10 will-change-transform' />
        )}

        {/* Overlay: Idle / Ended */}
        {gameState !== 'playing' && (
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20'>
            {gameState === 'ended' ? (
              <div className='text-center space-y-5 animate-fadeIn'>
                <h3 className='text-4xl font-black text-white uppercase tracking-tight'>¡Tiempo!</h3>
                <div className='space-y-2'>
                  <p className='text-3xl text-[#EF2D5E] font-black'>{score} puntos</p>
                  <p className='text-gray-400'>
                    Precisión: <span className='text-white font-semibold'>{accuracy}%</span> · {hits} aciertos · {misses} fallos
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className='bg-[#EF2D5E] hover:bg-[#d4264f] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(239,45,94,0.25)] transition-all hover:scale-105'
                >
                  Jugar de nuevo
                </button>
              </div>
            ) : (
              <div className='text-center space-y-5 animate-fadeIn'>
                <div className='text-6xl'>🎯</div>
                <h3 className='text-3xl font-black text-white uppercase tracking-tight'>Entrenador de Aim</h3>
                <p className='text-gray-400 max-w-md'>
                  Haz clic en los objetivos lo más rápido posible. Tienes <span className='text-white font-semibold'>{GAME_DURATION} segundos</span>.
                </p>
                <button
                  onClick={startGame}
                  className='bg-[#EF2D5E] hover:bg-[#d4264f] text-white px-8 py-3 rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(239,45,94,0.25)] animate-pulse-glow transition-all hover:scale-105'
                >
                  Comenzar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
