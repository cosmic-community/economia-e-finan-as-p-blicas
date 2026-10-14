interface RichContentProps {
  html: string
}

export default function RichContent({ html }: RichContentProps) {
  if (!html) return null

  return <div className="rich-content" dangerouslySetInnerHTML={{ __html: html }} />
}