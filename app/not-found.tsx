import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-serif text-6xl font-bold text-navy-900">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-navy-900">Página não encontrada</h1>
      <p className="mt-3 text-navy-600">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
      >
        Voltar para o início
      </Link>
    </div>
  )
}