import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPlayer, PLAYERS } from '@/data/crosshairs'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return PLAYERS.map((name) => ({ name }))
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params
  const player = getPlayer(name)
  if (!player) return {}
  const title = `Configuración de ${player.name} - Mira, Sensibilidad y Periféricos Valorant 2026`
  const description = `Código de mira de ${player.name}, DPI: ${player.mouseSettings?.DPI}, sensibilidad: ${player.mouseSettings?.Sensitivity}. Copia su crosshair y configuración completa.`
  return {
    title,
    description,
    alternates: { canonical: `/pro/${name}` },
    openGraph: {
      title,
      description,
      images: player.pathImg ? [{ url: player.pathImg, width: 650, height: 384, alt: `${player.name} configuración Valorant` }] : []
    },
    twitter: { card: 'summary_large_image', title, description }
  }
}

export default async function ProPlayerPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const player = getPlayer(name)
  if (!player) notFound()

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: player.name,
          description: `Jugador profesional de Valorant`,
          url: `/pro/${name}`,
          image: player.pathImg
        }}
      />

      <main className='text-gray-300 mt-10 flex flex-col w-full xl:px-52 2xl:px-80 px-8 md:px-32 lg:px-20'>
        <h1 className='md:text-3xl xl:text-4xl text-2xl uppercase md:font-semibold mb-10 text-center text-[#EF2D5E]'>{player.name} configuración</h1>
        <div className='flex justify-center mb-5'>
          {player.pathImg && (
            <Image
              src={player.pathImg}
              className='object-cover w-[650px] h-96 object-top rounded-3xl'
              alt={`${player.name} - Jugador profesional de Valorant`}
              width={650}
              height={384}
              priority
            />
          )}
        </div>
        {player.parag?.map((parrafo, i) => (
          <p key={i} className='mt-4 text-justify'>
            {parrafo}
          </p>
        ))}

        <h2 className='md:text-xl xl:text-2xl text-xl uppercase md:font-semibold mb-5 mt-10 text-[#EF2D5E]'>Configuración de ratón</h2>
        <p className='text-justify'>{player.mouseSettings?.mouseParag}</p>
        <ul className='list-disc list-inside mt-5'>
          <li>
            DPI: <span className='font-semibold text-gray-100'>{player.mouseSettings?.DPI}</span>
          </li>
          <li>
            EDPI: <span className='font-semibold text-gray-100'>{player.mouseSettings?.EDPI}</span>
          </li>
          <li>
            Sensitivity: <span className='font-semibold text-gray-100'>{player.mouseSettings?.Sensitivity}</span>
          </li>
          <li>
            HZ: <span className='font-semibold text-gray-100'>{player.mouseSettings?.HZ}</span>
          </li>
          <li>
            Windows Sensitivity: <span className='font-semibold text-gray-100'>{player.mouseSettings?.WindowsSensitivity}</span>
          </li>
          <li>
            Scoped Sensitivity: <span className='font-semibold text-gray-100'>{player.mouseSettings?.ScopedSensitivity}</span>
          </li>
        </ul>

        <h2 className='md:text-xl xl:text-2xl text-xl uppercase md:font-semibold mb-5 mt-10 text-[#EF2D5E]'>Configuración de video</h2>
        <p className='text-justify'>{player.videoSettings?.videoParag}</p>
        <ul className='list-disc list-inside mt-5'>
          <li>
            Resolution: <span className='font-semibold text-gray-100'>{player.videoSettings?.Resolution}</span>
          </li>
          <li>
            Ratio: <span className='font-semibold text-gray-100'>{player.videoSettings?.Ratio}</span>
          </li>
          <li>
            DisplayMode: <span className='font-semibold text-gray-100'>{player.videoSettings?.DisplayMode}</span>
          </li>
          <li>
            RefreshRate: <span className='font-semibold text-gray-100'>{player.videoSettings?.RefreshRate}</span>
          </li>
          <li>
            MateriaQuality: <span className='font-semibold text-gray-100'>{player.videoSettings?.MateriaQuality}</span>
          </li>
          <li>
            TextureQuality: <span className='font-semibold text-gray-100'>{player.videoSettings?.TextureQuality}</span>
          </li>
          <li>
            DetailQuality: <span className='font-semibold text-gray-100'>{player.videoSettings?.DetailQuality}</span>
          </li>
          <li>
            UIQuality: <span className='font-semibold text-gray-100'>{player.videoSettings?.UIQuality}</span>
          </li>
          <li>
            Vignette: <span className='font-semibold text-gray-100'>{player.videoSettings?.Vignette}</span>
          </li>
          <li>
            Vsync: <span className='font-semibold text-gray-100'>{player.videoSettings?.Vsync}</span>
          </li>
          <li>
            AntiAliasing: <span className='font-semibold text-gray-100'>{player.videoSettings?.AntiAliasing}</span>
          </li>
          <li>
            AnisotropicFilter: <span className='font-semibold text-gray-100'>{player.videoSettings?.AnisotropicFilter}</span>
          </li>
          <li>
            ImproveClarity: <span className='font-semibold text-gray-100'>{player.videoSettings?.ImproveClarity}</span>
          </li>
          <li>
            Bloom: <span className='font-semibold text-gray-100'>{player.videoSettings?.Bloom}</span>
          </li>
          <li>
            Distortion: <span className='font-semibold text-gray-100'>{player.videoSettings?.Distortion}</span>
          </li>
          <li>
            FPPShadows: <span className='font-semibold text-gray-100'>{player.videoSettings?.FPPShadows}</span>
          </li>
        </ul>

        <h2 className='md:text-xl xl:text-2xl text-xl uppercase md:font-semibold mb-5 mt-10 text-[#EF2D5E]'>Periféricos</h2>
        <ul className='list-disc list-inside'>
          <li>
            Mouse: <span className='font-semibold text-gray-100'>{player.gear?.Mouse}</span>
          </li>
          <li>
            Keyboard: <span className='font-semibold text-gray-100'>{player.gear?.Keyboard}</span>
          </li>
          <li>
            Mousepad: <span className='font-semibold text-gray-100'>{player.gear?.Mousepad}</span>
          </li>
          <li>
            Headset: <span className='font-semibold text-gray-100'>{player.gear?.Headset}</span>
          </li>
          <li>
            Bungee: <span className='font-semibold text-gray-100'>{player.gear?.Bungee}</span>
          </li>
          <li>
            Monitor: <span className='font-semibold text-gray-100'>{player.gear?.Monitor}</span>
          </li>
          <li>
            Microphone: <span className='font-semibold text-gray-100'>{player.gear?.Microphone}</span>
          </li>
          <li>
            CPU: <span className='font-semibold text-gray-100'>{player.gear?.CPU}</span>
          </li>
          <li>
            GPU: <span className='font-semibold text-gray-100'>{player.gear?.GPU}</span>
          </li>
          <li>
            RAM: <span className='font-semibold text-gray-100'>{player.gear?.RAM}</span>
          </li>
          <li>
            Chair: <span className='font-semibold text-gray-100'>{player.gear?.Chair}</span>
          </li>
          <li>
            Motherboard: <span className='font-semibold text-gray-100'>{player.gear?.Motherboard}</span>
          </li>
          <li>
            Webcam: <span className='font-semibold text-gray-100'>{player.gear?.Webcam}</span>
          </li>
        </ul>
      </main>
    </>
  )
}
