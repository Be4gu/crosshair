import { NextRequest, NextResponse } from 'next/server'
import { getPlayer } from '@/data/crosshairs'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const player = getPlayer(name)
  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 })
  }
  return NextResponse.json(player)
}
