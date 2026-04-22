// Types

export interface Mira {
  name?: string
  type?: string
  alter?: string
  pathImg?: string
  codeCrosshair?: string
}

export interface MouseSettings {
  mouseParag?: string
  DPI?: string
  EDPI?: string
  Sensitivity?: string
  HZ?: string
  WindowsSensitivity?: string
  ScopedSensitivity?: string
}

export interface VideoSettings {
  videoParag?: string
  Resolution?: string
  Ratio?: string
  DisplayMode?: string
  RefreshRate?: string
  MateriaQuality?: string
  TextureQuality?: string
  DetailQuality?: string
  UIQuality?: string
  Vignette?: string
  Vsync?: string
  AntiAliasing?: string
  AnisotropicFilter?: string
  ImproveClarity?: string
  Bloom?: string
  Distortion?: string
  FPPShadows?: string
}

export interface Gear {
  Mouse?: string
  Keyboard?: string
  Mousepad?: string
  Headset?: string
  Bungee?: string
  Monitor?: string
  Microphone?: string
  CPU?: string
  GPU?: string
  RAM?: string
  Chair?: string
  Motherboard?: string
  Webcam?: string
}

export interface Player {
  name?: string
  pathImg?: string
  parag?: string[]
  mouseSettings?: MouseSettings
  videoSettings?: VideoSettings
  gear?: Gear
}

// Constants

export const CROSSHAIR_TYPES = ['all', 'pro', 'streamer', 'funny'] as const
export type CrosshairType = (typeof CROSSHAIR_TYPES)[number]

export const PLAYERS = ['mixwell', 'tenz', 'yay', 'nats', 'f0rsaken'] as const
export type PlayerName = (typeof PLAYERS)[number]

export const DEFAULT_PLAYER: PlayerName = 'mixwell'

// Data

import mirasData from './miras.json'
import playersData from './players.json'

function normalizeImagePath(path?: string): string | undefined {
  if (!path) return path
  const match = path.match(/assets\/img\/.*/)
  return match ? `/${match[0]}` : path
}

function normalizeMiras(miras: Mira[]): Mira[] {
  return miras.map((m) => ({ ...m, pathImg: normalizeImagePath(m.pathImg) }))
}

const allMiras = normalizeMiras(mirasData as Mira[])
const allPlayers = playersData as Record<string, Player>

// Normalize player images
for (const key of Object.keys(allPlayers)) {
  allPlayers[key].pathImg = normalizeImagePath(allPlayers[key].pathImg)
}

export function getCrosshairsByCategory(cat: CrosshairType): Mira[] {
  if (cat === 'all') return allMiras
  return allMiras.filter((m) => m.type === cat)
}

export function getPlayer(name: string): Player | undefined {
  return allPlayers[name.toLowerCase()]
}

export function searchCrosshairs(query: string): Mira[] {
  const q = query.toLowerCase()
  return allMiras.filter((m) => m.name?.toLowerCase().includes(q) || m.alter?.toLowerCase().includes(q) || m.type?.toLowerCase().includes(q))
}
