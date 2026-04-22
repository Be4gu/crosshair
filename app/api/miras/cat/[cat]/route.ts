import { NextRequest, NextResponse } from 'next/server'
import { getCrosshairsByCategory, type CrosshairType } from '@/data/crosshairs'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params
  const miras = getCrosshairsByCategory(cat as CrosshairType)
  return NextResponse.json(miras)
}
