import Script from "next/script"

interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is sanitized via JSON.stringify
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
