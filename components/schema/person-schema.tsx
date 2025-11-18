export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '장혜승',
    alternateName: 'HYEKER',
    url: 'https://hyeker.com',
    image: 'https://hyeker.com/me.png',
    sameAs: [
      'https://github.com/CHUUHYESEUNG',
      'https://www.linkedin.com/in/hyeseung-hailey-jang-a506a7211/',
      'https://instagram.com/heyhyeker',
      'https://brunch.co.kr/@hyeker',
      'https://dalsoon-jang.tistory.com',
    ],
    jobTitle: 'Full-stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'HYEKER STUDIO',
    },
    description: '디자이너에서 개발자로 전환한 1인 인디 개발자. Next.js, React Native, AI/ML 기반 프로덕트 개발 전문.',
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'React Native',
      'Python',
      'FastAPI',
      'UI/UX Design',
      'Figma',
      'AI/ML',
      'Web Security',
    ],
    email: 'heyhyeker@gmail.com',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
