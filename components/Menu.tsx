'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/', label: 'MIRAS', icon: '◎' },
  { href: '/settings', label: 'PRO SETTINGS', icon: '⚙' },
  { href: '/generator', label: 'GENERADOR', icon: '✦' },
  { href: '/aim-trainer', label: 'AIM TRAINER', icon: '🎯' },
  { href: '/tier-list', label: 'TIER LIST', icon: '▲' },
  { href: '/blog', label: 'BLOG', icon: '✎' }
]

export default function Menu() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10 mb-8'>
      <div className='flex h-14 2xl:h-16 w-full items-center justify-between px-1 xs:px-6 lg:px-12 2xl:px-16'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2.5 group'>
          <div className='relative h-10 w-10 2xl:w-11 2xl:h-11'>
            {/* Animated crosshair SVG */}
            <svg viewBox='0 0 40 40' className='w-full h-full' fill='none' xmlns='http://www.w3.org/2000/svg'>
              {/* Outer ring */}
              <circle cx='20' cy='20' r='16' stroke='#EF2D5E' strokeWidth='1.5' className='animate-[spin_12s_linear_infinite] origin-center' strokeDasharray='6 4' />
              {/* Inner ring */}
              <circle cx='20' cy='20' r='11' stroke='#EF2D5E' strokeWidth='1' opacity='0.4' />
              {/* Crosshair lines */}
              <line x1='20' y1='4' x2='20' y2='13' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' className='animate-pulse-glow' />
              <line x1='20' y1='27' x2='20' y2='36' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' className='animate-pulse-glow' />
              <line x1='4' y1='20' x2='13' y2='20' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' className='animate-pulse-glow' />
              <line x1='27' y1='20' x2='36' y2='20' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' className='animate-pulse-glow' />
              {/* Center dot */}
              <circle cx='20' cy='20' r='2' fill='#EF2D5E' className='animate-pulse-glow' />
            </svg>
          </div>
          <span className='hidden sm:block text-white font-bold text-lg tracking-tight group-hover:text-[#EF2D5E] transition-colors duration-300'>
            Cross<span className='text-[#EF2D5E] group-hover:text-white transition-colors duration-300'>hair</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-1'>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                isActive(item.href) ? 'text-white bg-white/10 shadow-[inset_0_-2px_0_#EF2D5E]' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className='mr-1.5 text-xs opacity-60'>{item.icon}</span>
              {item.label}
              {isActive(item.href) && <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#EF2D5E] rounded-full shadow-[0_0_8px_rgba(239,45,94,0.6)]' />}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className='md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors' aria-label='Toggle menu'>
          <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav className='md:hidden flex flex-col border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl px-4 pb-4 pt-2 gap-1 animate-slideDown'>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                isActive(item.href) ? 'text-white bg-[#EF2D5E]/15 border-l-2 border-[#EF2D5E]' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className='mr-2'>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
