// Accurate Valorant crosshair code parser, renderer, and code generator.
// Color presets match in-game values. Code format:
//   profileIndex;s;val;P;key;val;...;S;key;val;...;A;key;val;...
// Keys: c=color preset, u=custom hex RRGGBBAA, o=outline opacity, t=outline thickness,
//   d=center dot, z=dot thickness, a=dot opacity,
//   0b=inner show (1=on,0=off), 0t/0l/0o/0a=inner thickness/length/offset/opacity,
//   1b=outer show, 1t/1l/1o/1a=outer thickness/length/offset/opacity

export const COLOR_PRESETS: Record<number, string> = {
  0: '#ffffff',
  1: '#00ff00',
  2: '#7fff00',
  3: '#bfff00',
  4: '#00ffbf',
  5: '#00ffff',
  6: '#ff69b4',
  7: '#ff0000'
}

export interface CrosshairConfig {
  color: string
  outlineEnabled: boolean
  outlineOpacity: number
  outlineThickness: number
  centerDot: boolean
  centerDotThickness: number
  centerDotOpacity: number
  innerShow: boolean
  innerThickness: number
  innerLength: number
  innerOffset: number
  innerOpacity: number
  innerIndependent: boolean
  innerVLength: number
  innerFiring: boolean
  innerMovement: boolean
  outerShow: boolean
  outerThickness: number
  outerLength: number
  outerOffset: number
  outerOpacity: number
  outerIndependent: boolean
  outerVLength: number
  outerFiring: boolean
  outerMovement: boolean
}

export const DEFAULT_CONFIG: CrosshairConfig = {
  color: '#ffffff',
  outlineEnabled: true,
  outlineOpacity: 0.5,
  outlineThickness: 1,
  centerDot: false,
  centerDotThickness: 2,
  centerDotOpacity: 1,
  innerShow: true,
  innerThickness: 2,
  innerLength: 6,
  innerOffset: 3,
  innerOpacity: 0.8,
  innerIndependent: false,
  innerVLength: 6,
  innerFiring: false,
  innerMovement: false,
  outerShow: true,
  outerThickness: 2,
  outerLength: 2,
  outerOffset: 10,
  outerOpacity: 0.35,
  outerIndependent: false,
  outerVLength: 2,
  outerFiring: false,
  outerMovement: false
}

export function parseCode(code: string): CrosshairConfig {
  const config: CrosshairConfig = { ...DEFAULT_CONFIG }
  const parts = code.split(';')
  let section = ''
  let i = 0
  let colorPreset: number | null = null
  let customColor: string | null = null

  while (i < parts.length) {
    const token = parts[i]

    // Section markers
    if (token === 'P' || token === 'S' || token === 'A') {
      section = token
      i++
      continue
    }

    // Only parse Primary section
    if (section !== 'P') {
      i++
      continue
    }

    const value = parts[i + 1]
    if (value === undefined) {
      i++
      continue
    }

    switch (token) {
      case 'c':
        colorPreset = parseInt(value)
        i += 2
        break
      case 'u':
        customColor = value
        i += 2
        break
      case 'o':
        config.outlineOpacity = parseFloat(value)
        config.outlineEnabled = parseFloat(value) > 0
        i += 2
        break
      case 't':
        config.outlineThickness = parseInt(value) || 1
        i += 2
        break
      case 'd':
        config.centerDot = value === '1'
        i += 2
        break
      case 'z':
        config.centerDotThickness = parseInt(value) || 2
        i += 2
        break
      case 'a':
        config.centerDotOpacity = parseFloat(value)
        i += 2
        break
      // Inner lines — 1 = show, 0 = hide
      case '0b':
        config.innerShow = value === '1'
        i += 2
        break
      case '0t':
        config.innerThickness = parseInt(value) || 2
        i += 2
        break
      case '0l':
        config.innerLength = parseFloat(value)
        i += 2
        break
      case '0o':
        config.innerOffset = parseFloat(value)
        i += 2
        break
      case '0a':
        config.innerOpacity = parseFloat(value)
        i += 2
        break
      // Outer lines — 1 = show, 0 = hide
      case '1b':
        config.outerShow = value === '1'
        i += 2
        break
      case '1t':
        config.outerThickness = parseInt(value) || 2
        i += 2
        break
      case '1l':
        config.outerLength = parseFloat(value)
        i += 2
        break
      case '1o':
        config.outerOffset = parseFloat(value)
        i += 2
        break
      case '1a':
        config.outerOpacity = parseFloat(value)
        i += 2
        break
      // Skip known but irrelevant keys (firing/movement error, etc.)
      case 'h':
        config.outlineEnabled = value !== '0'
        i += 2
        break
      case '0g':
        config.innerIndependent = value === '1'
        i += 2
        break
      case '0v':
        config.innerVLength = parseFloat(value)
        i += 2
        break
      case '0f':
        config.innerFiring = value === '1'
        i += 2
        break
      case '0m':
        config.innerMovement = value === '1'
        i += 2
        break
      case '1g':
        config.outerIndependent = value === '1'
        i += 2
        break
      case '1v':
        config.outerVLength = parseFloat(value)
        i += 2
        break
      case '1f':
        config.outerFiring = value === '1'
        i += 2
        break
      case '1m':
        config.outerMovement = value === '1'
        i += 2
        break
      case 'm':
      case 'f':
      case 's':
      case 'b':
      case 'p':
      case '0e':
      case '0s':
      case '1e':
      case '1s':
        i += 2
        break
      default:
        i++
        break
    }
  }

  // Resolve color: preset takes priority, custom color only when c=8 or no preset
  if (colorPreset !== null && colorPreset in COLOR_PRESETS) {
    config.color = COLOR_PRESETS[colorPreset]
  } else if (customColor && customColor.length >= 6) {
    const r = parseInt(customColor.slice(0, 2), 16)
    const g = parseInt(customColor.slice(2, 4), 16)
    const b = parseInt(customColor.slice(4, 6), 16)
    config.color = `rgb(${r},${g},${b})`
  }

  return config
}

// Scale factor to make crosshair visible on a small canvas.
// Valorant values are in screen-pixels at 1080p; 3x makes them
// clearly visible on a 400px preview.
const DEFAULT_SCALE = 3

function drawArms(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  thickness: number,
  hLength: number,
  vLength: number,
  offset: number,
  color: string,
  opacity: number,
  outlineEnabled: boolean,
  outlineOpacity: number,
  outlineThickness: number,
  scale: number
) {
  const t = thickness * scale
  const lH = hLength * scale
  const lV = vLength * scale
  const o = offset * scale

  ctx.globalAlpha = opacity

  // Outline (slightly larger filled rects behind each arm)
  if (outlineEnabled && outlineOpacity > 0) {
    const ot = outlineThickness * scale
    ctx.globalAlpha = opacity * outlineOpacity
    ctx.fillStyle = '#000000'
    if (vLength > 0) {
      // Top
      ctx.fillRect(cx - (t / 2 + ot), cy - o - lV - ot, t + ot * 2, lV + ot * 2)
      // Bottom
      ctx.fillRect(cx - (t / 2 + ot), cy + o - ot, t + ot * 2, lV + ot * 2)
    }
    if (hLength > 0) {
      // Left
      ctx.fillRect(cx - o - lH - ot, cy - (t / 2 + ot), lH + ot * 2, t + ot * 2)
      // Right
      ctx.fillRect(cx + o - ot, cy - (t / 2 + ot), lH + ot * 2, t + ot * 2)
    }
  }

  // Filled arms
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  if (vLength > 0) {
    // Top
    ctx.fillRect(cx - t / 2, cy - o - lV, t, lV)
    // Bottom
    ctx.fillRect(cx - t / 2, cy + o, t, lV)
  }
  if (hLength > 0) {
    // Left
    ctx.fillRect(cx - o - lH, cy - t / 2, lH, t)
    // Right
    ctx.fillRect(cx + o, cy - t / 2, lH, t)
  }
}

export function drawCrosshair(ctx: CanvasRenderingContext2D, cx: number, cy: number, config: CrosshairConfig, scale: number = DEFAULT_SCALE) {
  // Inner lines
  if (config.innerShow) {
    const vLen = config.innerIndependent ? config.innerVLength : config.innerLength
    drawArms(
      ctx,
      cx,
      cy,
      config.innerThickness,
      config.innerLength,
      vLen,
      config.innerOffset,
      config.color,
      config.innerOpacity,
      config.outlineEnabled,
      config.outlineOpacity,
      config.outlineThickness,
      scale
    )
  }

  // Outer lines
  if (config.outerShow) {
    const vLen = config.outerIndependent ? config.outerVLength : config.outerLength
    drawArms(
      ctx,
      cx,
      cy,
      config.outerThickness,
      config.outerLength,
      vLen,
      config.outerOffset,
      config.color,
      config.outerOpacity,
      config.outlineEnabled,
      config.outlineOpacity,
      config.outlineThickness,
      scale
    )
  }

  // Center dot
  if (config.centerDot) {
    const dotR = (config.centerDotThickness * scale) / 2

    // Dot outline
    if (config.outlineEnabled && config.outlineOpacity > 0) {
      const ot = config.outlineThickness * scale
      ctx.globalAlpha = config.centerDotOpacity * config.outlineOpacity
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(cx, cy, dotR + ot, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.globalAlpha = config.centerDotOpacity
    ctx.fillStyle = config.color
    ctx.beginPath()
    ctx.arc(cx, cy, Math.max(dotR, 1), 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
}

export function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h)

  // Dark neutral background so crosshair colors are vivid
  ctx.fillStyle = '#0f1923'
  ctx.fillRect(0, 0, w, h)

  // Subtle grid lines for depth
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 1
  const step = 40
  for (let x = step; x < w; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, h)
    ctx.stroke()
  }
  for (let y = step; y < h; y += step) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  // Center crosshair guide (very subtle)
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.beginPath()
  ctx.moveTo(w / 2, 0)
  ctx.lineTo(w / 2, h)
  ctx.moveTo(0, h / 2)
  ctx.lineTo(w, h / 2)
  ctx.stroke()
}

export function generateCode(config: CrosshairConfig): string {
  const parts: string[] = ['0', 'P']

  // Color
  const presetEntry = Object.entries(COLOR_PRESETS).find(([, v]) => v.toLowerCase() === config.color.toLowerCase())
  if (presetEntry) {
    parts.push('c', presetEntry[0])
  } else {
    parts.push('c', '8')
    parts.push('u', colorToHex(config.color))
  }

  // Outlines
  parts.push('o', String(config.outlineOpacity))
  if (config.outlineThickness !== 1) {
    parts.push('t', String(config.outlineThickness))
  }

  // Center dot
  parts.push('d', config.centerDot ? '1' : '0')
  if (config.centerDot) {
    parts.push('z', String(config.centerDotThickness))
    parts.push('a', String(config.centerDotOpacity))
  }

  parts.push('f', '0')

  // Inner lines
  parts.push('0b', config.innerShow ? '1' : '0')
  if (config.innerShow) {
    parts.push('0t', String(config.innerThickness))
    parts.push('0l', String(config.innerLength))
    if (config.innerIndependent) {
      parts.push('0v', String(config.innerVLength))
      parts.push('0g', '1')
    }
    parts.push('0o', String(config.innerOffset))
    parts.push('0a', String(config.innerOpacity))
    parts.push('0f', config.innerFiring ? '1' : '0')
    if (config.innerMovement) parts.push('0m', '1')
  }

  // Outer lines
  parts.push('1b', config.outerShow ? '1' : '0')
  if (config.outerShow) {
    parts.push('1t', String(config.outerThickness))
    parts.push('1l', String(config.outerLength))
    if (config.outerIndependent) {
      parts.push('1v', String(config.outerVLength))
      parts.push('1g', '1')
    }
    parts.push('1o', String(config.outerOffset))
    parts.push('1a', String(config.outerOpacity))
    parts.push('1f', config.outerFiring ? '1' : '0')
    if (config.outerMovement) parts.push('1m', '1')
  }

  return parts.join(';')
}

function colorToHex(color: string): string {
  if (color.startsWith('#')) {
    const hex = color.slice(1).toUpperCase()
    return hex.length === 6 ? hex + 'FF' : hex
  }
  const match = color.match(/(\d+)/g)
  if (match) {
    const [r, g, b] = match.map(Number)
    return (r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + 'FF').toUpperCase()
  }
  return 'FFFFFFFF'
}
