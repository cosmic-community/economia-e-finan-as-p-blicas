import { getCosmic } from '@/lib/cosmic-preview'
import { getAllMacroTopicos } from '@/lib/cosmic'
import TopicosClient from '@/components/TopicosClient'

export const metadata = {
  title: 'Economia e Finanças Públicas | 35 Macro-Tópicos de Estudo',
  description:
    'Estudo completo de Economia e Finanças Públicas organizado em 35 macro-tópicos numerados, com áreas de interface relacionadas.',
}

export default async function HomePage() {
  const { cosmic, previewToken } = await getCosmic()
  const topicos = await getAllMacroTopicos(cosmic, Boolean(previewToken))

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-navy-500">
          Estudos em Economia e Finanças Públicas
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-navy-900 sm:text-5xl">
          35 Macro-Tópicos para Dominar a Economia e as Finanças Públicas
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-700">
          Este material reúne, em uma lista numerada corrida, os 35 grandes institutos que esgotam
          o campo da Economia e das Finanças Públicas — da teoria macroeconômica ao direito
          orçamentário, passando por moeda, tributação, dívida pública e muito mais. Cada
          macro-tópico é autônomo e do mesmo nível hierárquico, com interfaces destacadas para
          outras áreas do conhecimento.
        </p>
      </section>

      <TopicosClient topicos={topicos} />
    </div>
  )
}