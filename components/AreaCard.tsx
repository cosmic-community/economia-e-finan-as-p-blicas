import Link from 'next/link'
import type { AreaInterface } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AreaCardProps {
  area: AreaInterface
  count: number
}

export default function AreaCard({ area, count }: AreaCardProps) {
  const cor = getMetafieldValue(area.metadata?.cor) || '#334e68'
  const descricao = getMetafieldValue(area.metadata?.descricao)

  return (
    <Link
      href={`/areas/${area.slug}`}
      className="group block rounded-xl border border-navy-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: cor }}
          aria-hidden="true"
        />
        <span className="rounded-full bg-navy-100 px-2.5 py-1 text-xs font-semibold text-navy-700">
          {count} {count === 1 ? 'tópico' : 'tópicos'}
        </span>
      </div>
      <h2 className="mt-4 font-serif text-xl font-bold text-navy-900 group-hover:text-navy-700">
        {area.title}
      </h2>
      {descricao && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-navy-600">{descricao}</p>
      )}
    </Link>
  )
}