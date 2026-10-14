'use client'

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
  totalCount: number
}

export default function SearchFilter({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchFilterProps) {
  return (
    <div className="mb-8">
      <label htmlFor="busca-topicos" className="sr-only">
        Buscar macro-tópicos
      </label>
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <input
          id="busca-topicos"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por número, título ou resumo..."
          className="w-full rounded-lg border border-navy-200 bg-white py-3 pl-12 pr-4 text-navy-900 placeholder:text-navy-400 shadow-sm focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/30"
        />
      </div>
      <p className="mt-2 text-sm text-navy-500" aria-live="polite">
        {resultCount === totalCount
          ? `Exibindo todos os ${totalCount} macro-tópicos`
          : `${resultCount} de ${totalCount} macro-tópicos encontrados`}
      </p>
    </div>
  )
}