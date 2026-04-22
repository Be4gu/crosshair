export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  content: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'como-copiar-mira-valorant',
    title: 'Cómo copiar una mira desde el chat de Valorant - Guía paso a paso',
    description: 'Aprende a copiar y pegar códigos de miras de Valorant desde el chat del juego, redes sociales o nuestra web. Tutorial completo con capturas.',
    date: '2026-04-15',
    content: [
      'Copiar una mira en Valorant es más fácil de lo que parece. Solo necesitas el código de crosshair, que es una cadena de texto que contiene toda la configuración de la mira.',
      'Para importar un código de mira: ve a Configuración > Crosshair > Importar código de perfil. Pega el código y listo.',
      'En nuestra web puedes copiar cualquier código haciendo clic en el botón rojo debajo de cada mira. El código se copia automáticamente al portapapeles.',
      'También puedes compartir códigos desde el chat del juego. Simplemente pega el código en el chat y otros jugadores podrán copiarlo.'
    ]
  },
  {
    slug: 'mejores-miras-valorant-ranked',
    title: 'Las 10 mejores miras para jugar Ranked en Valorant 2026',
    description: 'Descubre las miras más efectivas para subir de rango en Valorant. Análisis de las crosshairs favoritas de profesionales con códigos para copiar.',
    date: '2026-04-10',
    content: [
      'Elegir la mira correcta puede marcar la diferencia entre ganar y perder un duelo. Los profesionales dedican horas a ajustar su crosshair.',
      'Las miras más usadas en competitivo son simples: punto central, líneas cortas y colores con buen contraste como verde o cian.',
      'Evita miras demasiado grandes o con animaciones de disparo excesivas. Necesitas precisión, no distracciones.',
      'Te recomendamos probar cada mira durante al menos 5 partidas de Deathmatch antes de decidir si es la tuya.'
    ]
  },
  {
    slug: 'configuracion-sensibilidad-pro',
    title: 'Configuración de sensibilidad de profesionales Valorant - DPI y eDPI',
    description: 'Guía completa sobre la sensibilidad ideal en Valorant. Aprende qué DPI y eDPI usan TenZ, yay, nAts y otros profesionales.',
    date: '2026-04-05',
    content: [
      'La sensibilidad es probablemente el ajuste más importante en Valorant. Un DPI y eDPI correctos te darán precisión y consistencia.',
      'El eDPI se calcula multiplicando tu DPI por la sensibilidad in-game. La mayoría de profesionales usan un eDPI entre 200 y 400.',
      'Un eDPI bajo te da más precisión pero necesitas más espacio de mousepad. Un eDPI alto es más rápido pero menos preciso.',
      'Nuestra recomendación: empieza con 800 DPI y 0.35 de sensibilidad (eDPI 280) y ajusta desde ahí.'
    ]
  },
  {
    slug: 'mira-perfecta-principiantes',
    title: 'La mira perfecta para principiantes en Valorant - Guía 2026',
    description: 'Si empiezas en Valorant, esta guía te ayudará a elegir tu primera mira. Consejos, códigos recomendados y errores comunes al configurar el crosshair.',
    date: '2026-03-28',
    content: [
      'Como principiante, lo más importante es que tu mira sea visible sin ser molesta. Un punto verde con líneas cortas es el estándar.',
      'No copies la mira de tu streamer favorito sin más. Lo que funciona para un profesional con miles de horas puede no funcionar para ti.',
      'Empieza con la mira por defecto de Valorant y haz ajustes pequeños: quita el error de movimiento, reduce la opacidad del contorno.',
      'Una vez tengas más experiencia, prueba miras más minimalistas. Muchos profesionales usan solo un punto central.'
    ]
  },
  {
    slug: 'miras-pro-champions-2026',
    title: 'Miras usadas en VCT Champions 2026 - Todas las crosshairs del torneo',
    description: 'Recopilación de todas las miras usadas por los equipos en VCT Champions 2026. Códigos de crosshair de cada jugador del torneo.',
    date: '2026-03-20',
    content: [
      'VCT Champions 2026 nos dejó algunos datos interesantes sobre las miras más populares entre los profesionales.',
      'El 78% de los jugadores usaron miras con punto central. Solo el 15% usaron miras completamente personalizadas.',
      'Las miras tipo "cruz simple" siguen dominando el meta competitivo. Los colores más populares fueron verde (45%), cian (30%) y blanco (20%).',
      'Hemos recopilado los códigos de mira de todos los jugadores del torneo. Puedes encontrarlos en nuestra sección de miras pro.'
    ]
  }
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
