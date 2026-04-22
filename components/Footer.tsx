import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Miras' },
  { href: '/settings', label: 'Pro Settings' },
  { href: '/generator', label: 'Generador' },
  { href: '/tier-list', label: 'Tier List' },
  { href: '/blog', label: 'Blog' }
]

export default function Footer() {
  return (
    <div className='w-full'>
      <div className='max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10'>
        {/* Brand */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <svg viewBox='0 0 40 40' className='w-8 h-8' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='20' cy='20' r='16' stroke='#EF2D5E' strokeWidth='1.5' strokeDasharray='6 4' />
              <circle cx='20' cy='20' r='11' stroke='#EF2D5E' strokeWidth='1' opacity='0.4' />
              <line x1='20' y1='4' x2='20' y2='13' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' />
              <line x1='20' y1='27' x2='20' y2='36' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' />
              <line x1='4' y1='20' x2='13' y2='20' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' />
              <line x1='27' y1='20' x2='36' y2='20' stroke='#EF2D5E' strokeWidth='2' strokeLinecap='round' />
              <circle cx='20' cy='20' r='2' fill='#EF2D5E' />
            </svg>
            <span className='text-white font-bold text-lg'>
              Cross<span className='text-[#EF2D5E]'>hair</span>
            </span>
          </div>
          <p className='text-gray-500 text-sm leading-relaxed'>
            Las mejores miras de Valorant con códigos para copiar. Configuraciones de profesionales y generador de crosshairs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>Navegación</h3>
          <ul className='space-y-2'>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className='text-gray-500 hover:text-[#EF2D5E] text-sm transition-colors duration-200'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className='text-white font-semibold text-sm uppercase tracking-wider mb-4'>Social</h3>
          <div className='flex gap-3'>
            <a
              href='https://twitter.com/ccrsitea34'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#EF2D5E]/30 transition-all duration-200'
              aria-label='Twitter'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
              </svg>
            </a>
            <a
              href='https://www.twitch.tv/entrellaves'
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#9146FF] hover:bg-[#9146FF]/10 hover:border-[#9146FF]/30 transition-all duration-200'
              aria-label='Twitch'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z' />
              </svg>
            </a>
          </div>
          <p className='text-gray-600 text-xs mt-4'>Creado por Entrellaves</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/5 py-4 px-6'>
        <p className='text-gray-600 text-xs text-center'>&copy; {new Date().getFullYear()} Crosshair. No afiliado con Riot Games.</p>
      </div>
    </div>
  )
}
