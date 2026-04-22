'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { drawCrosshair, drawBackground, generateCode, parseCode, DEFAULT_CONFIG, COLOR_PRESETS, type CrosshairConfig } from '../../lib/crosshair-renderer'

export default function CrosshairGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [config, setConfig] = useState<CrosshairConfig>({ ...DEFAULT_CONFIG })
  const [copied, setCopied] = useState(false)
  const [importCode, setImportCode] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const code = generateCode(config)

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

  function showMessage(text: string, type: 'success' | 'error') {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    showMessage('¡Código copiado al portapapeles!', 'success')
    setTimeout(() => setCopied(false), 1500)
  }

  function handleImport() {
    if (!importCode.trim()) {
      showMessage('Introduce un código de mira de Valorant', 'error')
      return
    }
    try {
      const parsed = parseCode(importCode.trim())
      setConfig(parsed)
      setImportCode('')
      showMessage('¡Mira importada correctamente!', 'success')
    } catch {
      showMessage('Código inválido. Revisa que esté completo.', 'error')
    }
  }

  function set<K extends keyof CrosshairConfig>(key: K, value: CrosshairConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-6xl'>
      {/* Left Column: Preview + Import/Export */}
      <div className='lg:col-span-5 space-y-6'>
        {/* Preview Card */}
        <div className='bg-[#111] border border-white/10 rounded-2xl p-5'>
          <h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
            <svg className='w-5 h-5 text-[#EF2D5E]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
            Vista Previa
          </h2>
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-[#EF2D5E]/20 via-transparent to-[#EF2D5E]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <canvas ref={canvasRef} width={400} height={400} className='relative rounded-xl border border-white/10 w-full aspect-square' />
          </div>
        </div>

        {/* Import/Export Card */}
        <div className='bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4'>
          <h2 className='text-lg font-semibold text-white'>Gestión de Perfil</h2>

          <div>
            <label className='text-sm text-gray-500 mb-2 block'>Pegar código de mira:</label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                placeholder='Ej: 0;P;c;5;o;1;d;1...'
                className='flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-[#EF2D5E]/50 transition-colors font-mono'
              />
              <button onClick={handleImport} className='bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-lg transition-colors border border-white/10' title='Importar'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`w-full font-semibold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-[#EF2D5E] hover:bg-[#d4264f] text-white shadow-[0_4px_20px_rgba(239,45,94,0.25)] hover:shadow-[0_4px_30px_rgba(239,45,94,0.35)]'
            }`}
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
              />
            </svg>
            {copied ? '✓ Copiado' : 'Copiar código generado'}
          </button>

          <div className='bg-black/30 rounded-lg px-4 py-3'>
            <p className='text-gray-600 text-xs uppercase tracking-wider mb-1'>Código actual</p>
            <code className='text-[#EF2D5E] text-sm break-all font-mono'>{code}</code>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg flex items-center gap-2 text-sm font-medium animate-fadeIn ${
                message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
              }`}
            >
              {message.type === 'error' ? (
                <svg className='w-4 h-4 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <circle cx='12' cy='12' r='10' strokeWidth={2} />
                  <path strokeLinecap='round' strokeWidth={2} d='M12 8v4m0 4h.01' />
                </svg>
              ) : (
                <svg className='w-4 h-4 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              )}
              {message.text}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Controls */}
      <div className='lg:col-span-7 bg-[#111] border border-white/10 rounded-2xl p-5 md:p-6 h-fit'>
        <h2 className='text-xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4'>
          <svg className='w-5 h-5 text-[#EF2D5E]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <circle cx='12' cy='12' r='3' strokeWidth={2} />
          </svg>
          Ajustes Principales
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Col 1: General, Outlines, Dot */}
          <div className='space-y-6'>
            {/* Color */}
            <section>
              <SectionTitle>Color</SectionTitle>
              <div className='grid grid-cols-5 gap-2'>
                {Object.entries(COLOR_PRESETS).map(([key, hex]) => (
                  <button
                    key={key}
                    onClick={() => set('color', hex)}
                    className={`h-8 rounded border-2 transition-all ${config.color === hex ? 'border-white scale-110 shadow-md z-10' : 'border-transparent hover:scale-105 hover:border-white/30'}`}
                    style={{ background: hex }}
                    title={hex}
                  />
                ))}
                <div className='relative'>
                  <input
                    type='color'
                    value={config.color}
                    onChange={(e) => set('color', e.target.value)}
                    className='w-full h-8 rounded cursor-pointer bg-transparent border-2 border-transparent hover:border-white/30 transition-all'
                    title='Color personalizado'
                  />
                  <div
                    className='absolute inset-0 rounded pointer-events-none'
                    style={{ background: 'conic-gradient(from 180deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
                  />
                  <span className='absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow pointer-events-none'>+</span>
                  <input
                    type='color'
                    value={config.color}
                    onChange={(e) => set('color', e.target.value)}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    title='Color personalizado'
                  />
                </div>
              </div>
            </section>

            <hr className='border-white/5' />

            {/* Outlines */}
            <section>
              <SectionTitle>Contornos (Outlines)</SectionTitle>
              <Toggle label='Mostrar Contornos' checked={config.outlineEnabled} onChange={(v) => set('outlineEnabled', v)} />
              {config.outlineEnabled && (
                <>
                  <Slider label='Opacidad del contorno' min={0} max={1} step={0.1} value={config.outlineOpacity} onChange={(v) => set('outlineOpacity', v)} />
                  <Slider label='Grosor del contorno' min={1} max={6} step={1} value={config.outlineThickness} onChange={(v) => set('outlineThickness', v)} />
                </>
              )}
            </section>

            <hr className='border-white/5' />

            {/* Center Dot */}
            <section>
              <SectionTitle>Punto Central</SectionTitle>
              <Toggle label='Mostrar Punto Central' checked={config.centerDot} onChange={(v) => set('centerDot', v)} />
              {config.centerDot && (
                <>
                  <Slider label='Opacidad del punto' min={0} max={1} step={0.1} value={config.centerDotOpacity} onChange={(v) => set('centerDotOpacity', v)} />
                  <Slider label='Grosor del punto' min={1} max={6} step={1} value={config.centerDotThickness} onChange={(v) => set('centerDotThickness', v)} />
                </>
              )}
            </section>
          </div>

          {/* Col 2: Inner + Outer Lines */}
          <div className='space-y-6'>
            {/* Inner Lines */}
            <section>
              <SectionTitle>Líneas Interiores</SectionTitle>
              <Toggle label='Mostrar Líneas Interiores' checked={config.innerShow} onChange={(v) => set('innerShow', v)} />
              {config.innerShow && (
                <>
                  <Toggle label='Longitudes Independientes' checked={config.innerIndependent} onChange={(v) => set('innerIndependent', v)} />
                  <Slider label='Opacidad' min={0} max={1} step={0.1} value={config.innerOpacity} onChange={(v) => set('innerOpacity', v)} />
                  <Slider
                    label={config.innerIndependent ? 'Longitud (Horizontal)' : 'Longitud'}
                    min={0}
                    max={20}
                    step={1}
                    value={config.innerLength}
                    onChange={(v) => set('innerLength', v)}
                  />
                  {config.innerIndependent && <Slider label='Longitud (Vertical)' min={0} max={20} step={1} value={config.innerVLength} onChange={(v) => set('innerVLength', v)} />}
                  <Slider label='Grosor' min={1} max={10} step={1} value={config.innerThickness} onChange={(v) => set('innerThickness', v)} />
                  <Slider label='Desplazamiento (Offset)' min={0} max={20} step={1} value={config.innerOffset} onChange={(v) => set('innerOffset', v)} />
                  <div className='flex gap-6 mt-2'>
                    <Toggle label='Error Disparo' checked={config.innerFiring} onChange={(v) => set('innerFiring', v)} />
                    <Toggle label='Error Mov.' checked={config.innerMovement} onChange={(v) => set('innerMovement', v)} />
                  </div>
                </>
              )}
            </section>

            <hr className='border-white/5' />

            {/* Outer Lines */}
            <section>
              <SectionTitle>Líneas Exteriores</SectionTitle>
              <Toggle label='Mostrar Líneas Exteriores' checked={config.outerShow} onChange={(v) => set('outerShow', v)} />
              {config.outerShow && (
                <>
                  <Toggle label='Longitudes Independientes' checked={config.outerIndependent} onChange={(v) => set('outerIndependent', v)} />
                  <Slider label='Opacidad' min={0} max={1} step={0.1} value={config.outerOpacity} onChange={(v) => set('outerOpacity', v)} />
                  <Slider
                    label={config.outerIndependent ? 'Longitud (Horizontal)' : 'Longitud'}
                    min={0}
                    max={20}
                    step={1}
                    value={config.outerLength}
                    onChange={(v) => set('outerLength', v)}
                  />
                  {config.outerIndependent && <Slider label='Longitud (Vertical)' min={0} max={20} step={1} value={config.outerVLength} onChange={(v) => set('outerVLength', v)} />}
                  <Slider label='Grosor' min={1} max={10} step={1} value={config.outerThickness} onChange={(v) => set('outerThickness', v)} />
                  <Slider label='Desplazamiento (Offset)' min={0} max={30} step={1} value={config.outerOffset} onChange={(v) => set('outerOffset', v)} />
                  <div className='flex gap-6 mt-2'>
                    <Toggle label='Error Disparo' checked={config.outerFiring} onChange={(v) => set('outerFiring', v)} />
                    <Toggle label='Error Mov.' checked={config.outerMovement} onChange={(v) => set('outerMovement', v)} />
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='text-[#EF2D5E] text-sm uppercase tracking-wider font-bold mb-4 flex items-center gap-2'>
      <span className='w-1 h-4 bg-[#EF2D5E] rounded-full' />
      {children}
    </h3>
  )
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className='flex items-center justify-between cursor-pointer mb-4 group'>
      <span className='text-sm font-medium text-gray-300 group-hover:text-white transition-colors'>{label}</span>
      <div className='relative'>
        <input type='checkbox' className='sr-only' checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-[#EF2D5E]' : 'bg-white/10'}`} />
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${checked ? 'translate-x-4' : ''}`} />
      </div>
    </label>
  )
}

function Slider({ label, min, max, step, value, onChange }: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <div className='flex flex-col gap-1.5 mb-4'>
      <div className='flex justify-between text-sm'>
        <span className='text-gray-400 font-medium'>{label}</span>
        <span className='text-gray-300 bg-white/5 px-2 py-0.5 rounded text-xs font-semibold min-w-[2.5rem] text-center'>{value}</span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className='accent-[#EF2D5E] w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer'
      />
    </div>
  )
}
