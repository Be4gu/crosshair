import { Suspense } from 'react'
import type { Metadata } from 'next'
import Card from '@/components/Card'
import SubMenu from '@/components/SubMenu'
import { getCrosshairsByCategory, searchCrosshairs, type CrosshairType } from '@/data/crosshairs'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Todas las Miras de Valorant - Códigos Crosshair 2026',
  description: 'Colección completa de miras de Valorant con códigos para copiar. Crosshairs de profesionales, streamers y miras divertidas.',
  alternates: { canonical: '/' }
}

export default async function Home({ searchParams }: { searchParams: Promise<{ cat?: string; search?: string }> }) {
  const params = await searchParams
  const search = params.search
  const cat = (params.cat ?? 'all') as CrosshairType

  const miras = search && search.length > 0 ? searchCrosshairs(search) : getCrosshairsByCategory(cat === 'pro' || cat === 'funny' || cat === 'streamer' ? cat : 'all')

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Miras de Valorant',
          description: 'Colección de crosshairs para Valorant con códigos para copiar',
          numberOfItems: miras.length,
          itemListElement: miras.slice(0, 20).map((m, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `Mira ${m.name}`,
            description: `Código de mira: ${m.codeCrosshair}`
          }))
        }}
      />

      {/* Hero Section */}
      <section className='w-full max-w-4xl text-center mb-10 animate-fadeIn'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl font-black uppercase tracking-tight'>
          Las mejores <span className='text-[#EF2D5E] drop-shadow-[0_0_12px_rgba(239,45,94,0.4)]'>miras</span> de Valorant
        </h1>
        <p className='text-gray-400 mt-3 text-base md:text-lg max-w-2xl mx-auto'>
          Códigos de crosshair de profesionales, streamers y miras personalizadas. Copia y pega directamente en el juego.
        </p>
      </section>

      <Suspense>
        <SubMenu />
      </Suspense>
      <div
        className='my-4 grid grid-cols-1 justify-items-center gap-7 font-antonio xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
        id='main'
      >
        <Card miras={miras} />
      </div>
    </div>
  )
}
