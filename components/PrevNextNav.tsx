import Link from 'next/link'
import type { MacroTopico } from '@/types'
import { formatNumero, getNumero } from '@/lib/cosmic'

interface PrevNextNavProps {
  prev: MacroTopico | null
  next: MacroTopico | null
}

export default function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null

  return (
    <nav
      className="mt-12 grid grid-cols-1 gap-4 border-t border-navy-200 pt-8 sm:grid-cols-2"
      aria-label="Navegação entre macro-tópicos"
    >
      <div>
        {prev && (
          <Link
            href={`/topicos/${prev.slug}`}
            className="group flex flex-col rounded-lg border border-navy-200 bg-white p-4 transition-colors hover:border-navy-400"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              ← Anterior
            </span>
            <span className="mt-1 font-serif text-base font-semibold text-navy-900 group-hover:text-navy-700">
              {formatNumero(getNumero(prev))}. {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/topicos/${next.slug}`}
            className="group flex flex-col rounded-lg border border-navy-200 bg-white p-4 text-right transition-colors hover:border-navy-400 sm:items-end"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-navy-400">
              Próximo →
            </span>
            <span className="mt-1 font-serif text-base font-semibold text-navy-900 group-hover:text-navy-700">
              {formatNumero(getNumero(next))}. {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}