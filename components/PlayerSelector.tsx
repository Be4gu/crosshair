'use client'

import { useRouter } from 'next/navigation'

export default function PlayerSelector({ players, active }: { players: readonly string[]; active: string }) {
  const router = useRouter()

  function handleClick(name: string) {
    router.push(`/settings?player=${name.toLowerCase()}`)
  }

  return (
    <div className='flex justify-center flex-wrap gap-2 p-2 bg-white/5 rounded-xl border border-white/10 max-w-5xl mx-auto'>
      {players.map((name) => (
        <button
          key={name}
          onClick={() => handleClick(name)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase transition-all duration-200 ${
            name === active ? 'bg-[#EF2D5E] text-white shadow-[0_0_15px_rgba(239,45,94,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
