// app/areas/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { getAreaInterfaceBySlug, getMacroTopicosByArea, getMetafieldValue } from '@/lib/cosmic'
import TopicListItem from '@/components/TopicListItem'

interface AreaPageProps {
  params: Promise<{ slug: string }>
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params
  const { cosmic, previewToken } = await getCosmic()
  const preview = Boolean(previewToken)

  const area = await getAreaInterfaceBySlug(slug, cosmic, preview)

  if (!area) {
    notFound()
  }

  const topicos = await getMacroTopicosByArea(area.id, cosmic, preview)
  const cor = getMetafieldValue(area.metadata?.cor) || '#334e68'
  const descricao = getMetafieldValue(area.metadata?.descricao)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/areas" className="text-sm font-medium text-navy-500 hover:text-navy-700">
        ← Todas as áreas de interface
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span
          className="h-4 w-4 flex-shrink-0 rounded-full"
          style={{ backgroundColor: cor }}
          aria-hidden="true"
        />
        <h1 className="font-serif text-3xl font-bold text-navy-900 sm:text-4xl">{area.title}</h1>
      </div>

      {descricao && (
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy-700">{descricao}</p>
      )}

      <h2 className="mb-4 mt-10 font-serif text-xl font-bold text-navy-900">
        Macro-tópicos relacionados ({topicos.length})
      </h2>

      {topicos.length === 0 ? (
        <p className="text-navy-600">Nenhum macro-tópico relacionado a esta área ainda.</p>
      ) : (
        <ol className="space-y-4">
          {topicos.map((topico) => (
            <TopicListItem key={topico.id} topico={topico} />
          ))}
        </ol>
      )}
    </div>
  )
}