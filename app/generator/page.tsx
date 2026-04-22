import type { Metadata } from 'next'
import CrosshairGenerator from './CrosshairGenerator'

export const metadata: Metadata = {
  title: 'Generador y Previsualizador de Miras Valorant - Crea o Importa tu Crosshair',
  description:
    'Diseña tu mira perfecta para Valorant con nuestro generador visual o importa cualquier código existente. Ajusta color, grosor, longitud y opacidad. Genera el código para importar directamente al juego.',
  alternates: { canonical: '/generator' }
}

export default function GeneratorPage() {
  return (
    <div className='flex flex-col items-center w-full'>
      <section className='text-center mb-10 animate-fadeIn'>
        <h1 className='text-2xl md:text-3xl xl:text-4xl font-black uppercase tracking-tight'>
          <span className='text-[#EF2D5E] drop-shadow-[0_0_12px_rgba(239,45,94,0.4)]'>Generador</span> de Miras
        </h1>
        <p className='text-gray-400 mt-3 text-base max-w-xl mx-auto'>Crea tu crosshair personalizado o importa un código existente para previsualizarlo y editarlo.</p>
      </section>
      <CrosshairGenerator />
    </div>
  )
}
