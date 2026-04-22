import { NextRequest, NextResponse } from 'next/server'
import { searchCrosshairs } from '@/data/crosshairs'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const results = searchCrosshairs(name)
  return NextResponse.json(results)
}
