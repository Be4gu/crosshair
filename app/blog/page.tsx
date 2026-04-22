import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '@/data/blog'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Blog - Guías de Miras y Configuraciones Valorant',
  description: 'Guías, tutoriales y artículos sobre miras de Valorant. Aprende a configurar tu crosshair, sensibilidad y más.',
  alternates: { canonical: '/blog' }
}

export default function BlogPage() {
  return (
    <div className='flex flex-col items-center w-full'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog Crosshair - Guías de Valorant',
          description: 'Guías y artículos sobre configuraciones de miras en Valorant',
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            url: `/blog/${p.slug}`
          }))
        }}
      />

      <h1 className='text-2xl md:text-3xl xl:text-4xl uppercase font-semibold mb-4 text-center text-[#EF2D5E]'>Blog</h1>
      <p className='text-gray-400 mb-10 text-center max-w-xl'>Guías, tutoriales y noticias sobre miras y configuraciones de Valorant.</p>

      <div className='grid gap-6 w-full max-w-3xl'>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className='block bg-[#141414] rounded-xl border border-white/10 p-6 hover:border-[#EF2D5E]/50 transition-colors'>
            <time className='text-xs text-gray-500'>{post.date}</time>
            <h2 className='text-lg font-semibold text-gray-100 mt-1'>{post.title}</h2>
            <p className='text-gray-400 text-sm mt-2'>{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
