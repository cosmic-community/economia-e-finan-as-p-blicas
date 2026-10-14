export default function Footer() {
  return (
    <footer className="mt-20 border-t border-navy-200 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="font-serif text-lg text-white">Economia &amp; Finanças Públicas</p>
        <p className="mt-2 max-w-2xl text-sm text-navy-300">
          Material de estudo organizado em 35 macro-tópicos autônomos, cobrindo todo o espectro da
          economia e das finanças públicas, com interfaces destacadas para outras áreas do
          conhecimento.
        </p>
        <p className="mt-6 text-xs text-navy-400">
          © {new Date().getFullYear()} Economia &amp; Finanças Públicas. Conteúdo gerenciado via
          Cosmic.
        </p>
      </div>
    </footer>
  )
}