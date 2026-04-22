import type { Metadata } from 'next'
import AimTrainer from './AimTrainer'

export const metadata: Metadata = {
  title: 'Entrenador de Aim - Practica tu Puntería con tu Mira de Valorant',
  description: 'Entrena tu puntería con nuestro aim trainer. Usa tu mira personalizada de Valorant y mejora tu precisión con distintos niveles de dificultad.',
  alternates: { canonical: '/aim-trainer' }
}

export default function AimTrainerPage() {
  return (
    <div className='flex flex-col items-center w-full'>
      <section className='text-center mb-10 animate-fadeIn'>
        <h1 className='text-2xl md:text-3xl xl:text-4xl font-black uppercase tracking-tight'>
          <span className='text-[#EF2D5E] drop-shadow-[0_0_12px_rgba(239,45,94,0.4)]'>Entrenador</span> de Aim
        </h1>
        <p className='text-gray-400 mt-3 text-base max-w-xl mx-auto'>Practica tu puntería y usa tu mira personalizada de Valorant.</p>
      </section>
      <AimTrainer />
    </div>
  )
}
