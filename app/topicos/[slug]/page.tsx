// app/topicos/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import {
  getMacroTopicoBySlug,
  getAdjacentMacroTopicos,
  getMetafieldValue,
  getNumero,
  formatNumero,
} from '@/lib/cosmic'
import AreaBadge from '@/components/AreaBadge'
import PrevNextNav from '@/components/PrevNextNav'
import RichContent from '@/components/RichContent'

interface TopicoPageProps {
  params: Promise<{ slug: string }>
}

export default async function TopicoPage({ params }: TopicoPageProps) {
  const { slug } = await params
  const { cosmic, previewToken } = await getCosmic()
  const preview = Boolean(previewToken)

  const topico = await getMacroTopicoBySlug(slug, cosmic, preview)

  if (!topico) {
    notFound()
  }

  const numero = getNumero(topico)
  const { prev, next } = await getAdjacentMacroTopicos(numero, cosmic, preview)
  const resumo = getMetafieldValue(topico.metadata?.resumo)
  const conteudo = getMetafieldValue(topico.metadata?.conteudo)
  const areas = topico.metadata?.areas_interface ?? []
  const imagem = topico.metadata?.imagem

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-xl font-bold text-white">
          {formatNumero(numero)}
        </span>
        <p className="text-sm font-semibold uppercase tracking-widest text-navy-500">
          Macro-Tópico {numero} de 35
        </p>
      </div>

      <h1 className="font-serif text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
        {topico.title}
      </h1>

      {resumo && <p className="mt-5 text-lg leading-relaxed text-navy-700">{resumo}</p>}

      {imagem?.imgix_url && (
        <img
          src={`${imagem.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={topico.title}
          width={800}
          height={400}
          className="mt-8 w-full rounded-xl border border-navy-200 object-cover"
        />
      )}

      {areas.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {areas.map((area) => (
            <AreaBadge key={area.id} area={area} size="md" />
          ))}
        </div>
      )}

      {conteudo && (
        <div className="mt-8 border-t border-navy-200 pt-8">
          <RichContent html={conteudo} />
        </div>
      )}

      <PrevNextNav prev={prev} next={next} />
    </article>
  )
}