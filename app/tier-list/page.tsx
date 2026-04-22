import type { Metadata } from 'next'
import { getCrosshairsByCategory, type Mira } from '@/data/crosshairs'
import JsonLd from '@/components/JsonLd'
import TierMiraCard from './TierMiraCard'

export const metadata: Metadata = {
  title: 'Tier List de Miras Valorant 2026 - Mejores Crosshairs del Meta',
  description: 'Ranking actualizado de las mejores miras de Valorant. Descubre qué crosshairs usan los profesionales y cuáles son Tier S, A y B para competitivo.',
  alternates: { canonical: '/tier-list' }
}

interface Tier {
  label: string
  color: string
  bg: string
  border: string
  miras: Mira[]
}

function buildTiers(): Tier[] {
  const pro = getCrosshairsByCategory('pro')
  const streamer = getCrosshairsByCategory('streamer')
  const funny = getCrosshairsByCategory('funny')

  return [
    {
      label: 'S',
      color: 'text-yellow-300',
      bg: 'bg-yellow-400/10',
      border: 'border-yellow-400/40',
      miras: pro.slice(0, 5)
    },
    {
      label: 'A',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/40',
      miras: [...pro.slice(5), ...streamer.slice(0, 3)]
    },
    {
      label: 'B',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/40',
      miras: [...streamer.slice(3), ...funny.slice(0, 3)]
    }
  ]
}

export default function TierListPage() {
  const tiers = buildTiers()

  return (
    <div className='flex flex-col items-center w-full'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Tier List de Miras Valorant 2026',
          description: 'Ranking de las mejores miras de Valorant clasificadas por uso profesional',
          itemListElement: tiers.flatMap((tier, ti) =>
            tier.miras.map((m, mi) => ({
              '@type': 'ListItem',
              position: ti * 10 + mi + 1,
              name: `[Tier ${tier.label}] ${m.name}`,
              description: `Código: ${m.codeCrosshair}`
            }))
          )
        }}
      />

      <section className='text-center mb-10 animate-fadeIn'>
        <h1 className='text-2xl md:text-3xl xl:text-4xl font-black uppercase tracking-tight'>
          <span className='text-[#EF2D5E] drop-shadow-[0_0_12px_rgba(239,45,94,0.4)]'>Tier List</span> de Miras
        </h1>
        <p className='text-gray-400 mt-3 text-base max-w-xl mx-auto'>Clasificación basada en el uso de jugadores profesionales en torneos de Valorant. Actualizado para 2026.</p>
      </section>

      <div className='flex flex-col gap-6 w-full max-w-5xl'>
        {tiers.map((tier) => (
          <div key={tier.label} className={`flex rounded-xl border ${tier.border} ${tier.bg} overflow-hidden transition-all duration-200 hover:shadow-lg`}>
            <div className={`flex items-center justify-center w-20 shrink-0 text-4xl font-black ${tier.color} border-r ${tier.border}`}>{tier.label}</div>
            <div className='flex flex-wrap gap-4 p-4'>
              {tier.miras.map((mira, i) => (
                <TierMiraCard key={i} name={mira.name} code={mira.codeCrosshair} type={mira.type} tierLabel={tier.label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
