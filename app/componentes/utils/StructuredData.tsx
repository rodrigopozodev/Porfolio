/**
 * Componente para agregar structured data (JSON-LD) a las páginas.
 * Mejora el SEO y permite que los motores de búsqueda entiendan mejor el contenido.
 */

interface PersonStructuredDataProps {
  name: string
  jobTitle?: string
  url: string
  image?: string
  sameAs?: string[]
  email?: string
}

export function PersonStructuredData({
  name,
  jobTitle,
  url,
  image,
  sameAs,
  email,
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(jobTitle && { jobTitle }),
    url,
    ...(image && { image }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    ...(email && { email }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface WebSiteStructuredDataProps {
  name: string
  url: string
  description: string
}

export function WebSiteStructuredData({
  name,
  url,
  description,
}: WebSiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

