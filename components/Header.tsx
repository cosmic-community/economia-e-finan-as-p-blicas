import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
              Economia &amp; Finanças Públicas
            </span>
            <span className="text-xs uppercase tracking-wide text-navy-500">
              35 Macro-Tópicos de Estudo
            </span>
          </Link>
          <nav className="flex items-center gap-6" aria-label="Navegação principal">
            <Link
              href="/"
              className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900"
            >
              Início
            </Link>
            <Link
              href="/areas"
              className="text-sm font-medium text-navy-700 transition-colors hover:text-navy-900"
            >
              Áreas de Interface
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}