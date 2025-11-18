export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HYEKER STUDIO',
    alternateName: '혜커 스튜디오',
    url: 'https://hyeker.com',
    description: '1인 인디 개발자 혜커의 블로그 & 포트폴리오',
    author: {
      '@type': 'Person',
      name: '장혜승',
    },
    inLanguage: 'ko-KR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
