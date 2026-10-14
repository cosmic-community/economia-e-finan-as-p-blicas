import Link from 'next/link'
import type { AreaInterface } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AreaBadgeProps {
  area: AreaInterface
  size?: 'sm' | 'md'
  interactive?: boolean
}

export default function AreaBadge({ area, size = 'sm', interactive = true }: AreaBadgeProps) {
  const cor = getMetafieldValue(area.metadata?.cor) || '#334e68'
  const sizeClasses = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
  const baseClasses = `inline-flex items-center gap-1.5 rounded-full font-medium text-white ${sizeClasses}`

  if (!interactive) {
    return (
      <span className={baseClasses} style={{ backgroundColor: cor }}>
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden="true" />
        {area.title}
      </span>
    )
  }

  return (
    <Link
      href={`/areas/${area.slug}`}
      className={`${baseClasses} transition-opacity hover:opacity-90`}
      style={{ backgroundColor: cor }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden="true" />
      {area.title}
    </Link>
  )
}