// 블로그 포스트 타입 (프론트엔드용)
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  date: string
  readTime: string
  image: string
  views: number
  author: {
    name: string
    avatar: string
  }
}

// 카테고리 목록
export const categories = [
  { name: "전체", slug: "all" },
  { name: "개발", slug: "개발" },
  { name: "보안", slug: "보안" },
  { name: "AI/ML", slug: "AI/ML" },
  { name: "커리어", slug: "커리어" },
  { name: "일상", slug: "일상" }
]
