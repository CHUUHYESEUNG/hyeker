import { MetadataRoute } from 'next'
import { portfolioItems } from '@/lib/portfolio-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyeker.com'

  // 정적 페이지
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // 포트폴리오 상세 페이지
  const portfolioRoutes = portfolioItems.map((item) => {
    const path = item.category === 'design' ? 'design' : 'app'
    return {
      url: `${baseUrl}/portfolio/${path}/${item.routeId}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  // Note: 블로그 포스트는 Firestore에서 동적으로 관리되므로
  // 블로그 목록 페이지를 통해 검색 엔진이 크롤링합니다.

  return [...routes, ...portfolioRoutes]
}
