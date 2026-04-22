import Image from 'next/image'
import { getPlayer, PLAYERS, DEFAULT_PLAYER, type PlayerName } from '@/data/crosshairs'
import PlayerSelector from '@/components/PlayerSelector'

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ player?: string }> }) {
  const params = await searchParams
  const active = (params.player ?? DEFAULT_PLAYER) as PlayerName
  const infoPlayers = getPlayer(active)

  return (
    <>
      <PlayerSelector players={[...PLAYERS]} active={active} />

      {infoPlayers && (
        <main className='text-gray-300 mt-10 flex flex-col w-full xl:px-52 2xl:px-80 px-8 md:px-32 lg:px-20'>
          <h2 className='md:text-3xl xl:text-4xl text-2xl uppercase font-black mb-10 text-center tracking-tight'>
            <span className='text-[#EF2D5E] drop-shadow-[0_0_12px_rgba(239,45,94,0.4)]'>{infoPlayers.name}</span> configuración
          </h2>
          <div className='flex justify-center mb-5'>
            {infoPlayers.pathImg && (
              <Image src={infoPlayers.pathImg} className='object-cover w-[650px] h-96 object-top rounded-3xl' alt={infoPlayers.name ?? ''} width={650} height={384} />
            )}
          </div>
          {infoPlayers.parag?.map((parrafo, i) => (
            <p key={i} className='mt-4 text-justify'>
              {parrafo}
            </p>
          ))}

          <h2 className='md:text-xl xl:text-2xl text-xl uppercase md:font-semibold mb-5 mt-10 text-[#EF2D5E]'>Configuración de raton</h2>
          <p className='text-justify'>{infoPlayers.mouseSettings?.mouseParag}</p>
          <ul className='list-disc list-inside mt-5'>
            <li>
              DPI: <span className='font-semibold text-gray-100'>{infoPlayers.mouseSettings?.DPI}</span>
            </li>
            <li>
              EDPI: <span className='font-semibold text-gray-100'>{infoPlayers.mouseSettings?.EDPI}</span>
            </li>
            <li>
              Sensitivity: <span className='font-semibold text-gray-100'>{infoPlayers.mouseSettings?.Sensitivity}</span>
            </li>
            <li>
              HZ: <span className='font-semibold text-gray-100'>{infoPlayers.mouseSettings?.HZ}</span>
            </li>
            <li>
              Windows Sensitivity: <span className='font-semibold text-gray-100'>{infoPlayers.mouseSettings?.WindowsSensitivity}</span>
            </li>
            <li>
              Scoped Sensitivity: <span className='font-semibold text-gray-100'>{infoPlayers.mouseSettings?.ScopedSensitivity}</span>
            </li>
          </ul>

          <h2 className='md:text-xl xl:text-2xl text-xl uppercase md:font-semibold mb-5 mt-10 text-[#EF2D5E]'>Configuración de video</h2>
          <p className='text-justify'>{infoPlayers.videoSettings?.videoParag}</p>
          <ul className='list-disc list-inside mt-5'>
            <li>
              Resolution: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.Resolution}</span>
            </li>
            <li>
              Ratio: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.Ratio}</span>
            </li>
            <li>
              DisplayMode: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.DisplayMode}</span>
            </li>
            <li>
              RefreshRate: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.RefreshRate}</span>
            </li>
            <li>
              MateriaQuality: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.MateriaQuality}</span>
            </li>
            <li>
              TextureQuality: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.TextureQuality}</span>
            </li>
            <li>
              DetailQuality: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.DetailQuality}</span>
            </li>
            <li>
              UIQuality: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.UIQuality}</span>
            </li>
            <li>
              Vignette: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.Vignette}</span>
            </li>
            <li>
              Vsync: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.Vsync}</span>
            </li>
            <li>
              AntiAliasing: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.AntiAliasing}</span>
            </li>
            <li>
              AnisotropicFilter: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.AnisotropicFilter}</span>
            </li>
            <li>
              ImproveClarity: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.ImproveClarity}</span>
            </li>
            <li>
              Bloom: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.Bloom}</span>
            </li>
            <li>
              Distortion: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.Distortion}</span>
            </li>
            <li>
              FPPShadows: <span className='font-semibold text-gray-100'>{infoPlayers.videoSettings?.FPPShadows}</span>
            </li>
          </ul>

          <h2 className='md:text-xl xl:text-2xl text-xl uppercase md:font-semibold mb-5 mt-10 text-[#EF2D5E]'>Periféricos</h2>
          <ul className='list-disc list-inside'>
            <li>
              Mouse: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Mouse}</span>
            </li>
            <li>
              Keyboard: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Keyboard}</span>
            </li>
            <li>
              Mousepad: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Mousepad}</span>
            </li>
            <li>
              Headset: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Headset}</span>
            </li>
            <li>
              Bungee: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Bungee}</span>
            </li>
            <li>
              Monitor: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Monitor}</span>
            </li>
            <li>
              Microphone: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Microphone}</span>
            </li>
            <li>
              CPU: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.CPU}</span>
            </li>
            <li>
              GPU: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.GPU}</span>
            </li>
            <li>
              RAM: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.RAM}</span>
            </li>
            <li>
              Chair: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Chair}</span>
            </li>
            <li>
              Motherboard: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Motherboard}</span>
            </li>
            <li>
              Webcam: <span className='font-semibold text-gray-100'>{infoPlayers.gear?.Webcam}</span>
            </li>
          </ul>
        </main>
      )}
    </>
  )
}
