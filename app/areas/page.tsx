import { getCosmic } from '@/lib/cosmic-preview'
import { getAllAreasInterface, getAllMacroTopicos } from '@/lib/cosmic'
import AreaCard from '@/components/AreaCard'

export const metadata = {
  title: 'Áreas de Interface',
  description:
    'Áreas do conhecimento que se conectam aos macro-tópicos de Economia e Finanças Públicas.',
}

export default async function AreasPage() {
  const { cosmic, previewToken } = await getCosmic()
  const preview = Boolean(previewToken)

  const [areas, topicos] = await Promise.all([
    getAllAreasInterface(cosmic, preview),
    getAllMacroTopicos(cosmic, preview),
  ])

  const countByArea = new Map<string, number>()
  for (const topico of topicos) {
    const topicoAreas = topico.metadata?.areas_interface ?? []
    for (const area of topicoAreas) {
      countByArea.set(area.id, (countByArea.get(area.id) ?? 0) + 1)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-12 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-navy-500">
          Interfaces com outras áreas
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-navy-900">Áreas de Interface</h1>
        <p className="mt-5 text-lg leading-relaxed text-navy-700">
          A Economia e as Finanças Públicas dialogam com diversos campos do conhecimento. Explore
          as áreas de interface e descubra quais macro-tópicos se conectam a cada uma delas.
        </p>
      </section>

      {areas.length === 0 ? (
        <p className="text-navy-600">Nenhuma área de interface cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} count={countByArea.get(area.id) ?? 0} />
          ))}
        </div>
      )}
    </div>
  )
}