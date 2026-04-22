'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CROSSHAIR_TYPES } from '@/data/crosshairs'

export default function SubMenu() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('cat') ?? 'all'
  const searcher = searchParams.get('search') ?? ''

  function handleActiveButton(name: string) {
    router.push(`/?cat=${name.toLowerCase()}`)
  }

  function handleSearch(value: string) {
    router.push(`/?cat=all&search=${encodeURIComponent(value)}`)
  }

  return (
    <div className='w-full max-w-5xl mb-8 flex flex-col items-center justify-between gap-4 font-antonio sm:flex-row'>
      {/* Search input */}
      <div className='relative order-2 sm:order-none w-full sm:w-auto'>
        <svg className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
        </svg>
        <input
          defaultValue={searcher}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Buscar mira...'
          type='text'
          className='h-10 w-full sm:w-64 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-gray-200 placeholder:text-gray-500 focus:border-[#EF2D5E]/50 focus:shadow-[0_0_15px_rgba(239,45,94,0.1)] focus:outline-none transition-all duration-200'
        />
      </div>

      {/* Filter tabs */}
      <div className='order-1 flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10 sm:order-none'>
        {CROSSHAIR_TYPES.map((name) => (
          <button
            key={name}
            onClick={() => handleActiveButton(name)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase transition-all duration-200 ${
              name === active ? 'bg-[#EF2D5E] text-white shadow-[0_0_15px_rgba(239,45,94,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  )
}
