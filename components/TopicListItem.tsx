import Link from 'next/link'
import type { MacroTopico } from '@/types'
import { formatNumero, getMetafieldValue, getNumero } from '@/lib/cosmic'
import AreaBadge from '@/components/AreaBadge'

interface TopicListItemProps {
  topico: MacroTopico
}

export default function TopicListItem({ topico }: TopicListItemProps) {
  const numero = getNumero(topico)
  const resumo = getMetafieldValue(topico.metadata?.resumo)
  const areas = topico.metadata?.areas_interface ?? []

  return (
    <li className="group relative">
      <Link
        href={`/topicos/${topico.slug}`}
        className="flex gap-4 rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-md sm:gap-6 sm:p-6"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base">
          {formatNumero(numero)}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-lg font-bold text-navy-900 group-hover:text-navy-700 sm:text-xl">
            {topico.title}
          </h2>
          {resumo && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-navy-600">{resumo}</p>
          )}
          {areas.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {areas.slice(0, 3).map((area) => (
                <AreaBadge key={area.id} area={area} interactive={false} />
              ))}
              {areas.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 text-xs text-navy-400">
                  +{areas.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}