import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts, getPost } from '@/data/blog'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article className='flex flex-col w-full max-w-3xl mx-auto'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { '@type': 'Organization', name: 'Crosshair' }
        }}
      />

      <time className='text-xs text-gray-500'>{post.date}</time>
      <h1 className='text-2xl md:text-3xl font-semibold text-[#EF2D5E] mt-2 mb-8'>{post.title}</h1>
      {post.content.map((paragraph, i) => (
        <p key={i} className='text-gray-300 text-justify mt-4 leading-7'>
          {paragraph}
        </p>
      ))}
    </article>
  )
}
