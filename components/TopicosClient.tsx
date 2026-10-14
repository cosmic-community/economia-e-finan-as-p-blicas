'use client'

import { useMemo, useState } from 'react'
import type { MacroTopico } from '@/types'
import SearchFilter from '@/components/SearchFilter'
import TopicListItem from '@/components/TopicListItem'
import { getMetafieldValue, getNumero } from '@/lib/cosmic'

interface TopicosClientProps {
  topicos: MacroTopico[]
}

export default function TopicosClient({ topicos }: TopicosClientProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return topicos

    return topicos.filter((topico) => {
      const numero = String(getNumero(topico))
      const resumo = getMetafieldValue(topico.metadata?.resumo).toLowerCase()
      const titulo = topico.title.toLowerCase()

      return titulo.includes(normalized) || resumo.includes(normalized) || numero.includes(normalized)
    })
  }, [topicos, query])

  return (
    <div>
      <SearchFilter
        value={query}
        onChange={setQuery}
        resultCount={filtered.length}
        totalCount={topicos.length}
      />
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-navy-300 bg-white p-10 text-center">
          <p className="font-serif text-lg text-navy-700">Nenhum macro-tópico encontrado</p>
          <p className="mt-1 text-sm text-navy-500">Tente buscar por outro termo ou número.</p>
        </div>
      ) : (
        <ol className="space-y-4">
          {filtered.map((topico) => (
            <TopicListItem key={topico.id} topico={topico} />
          ))}
        </ol>
      )}
    </div>
  )
}