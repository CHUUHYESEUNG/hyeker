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
  author: {
    name: string
    avatar: string
  }
}

// 더미 데이터
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "콘텐츠 디자이너에서 개발자로 전환한 이야기",
    slug: "designer-to-developer",
    excerpt: "11번가 콘텐츠 에디터, 쇼핑앱 패션 디자이너에서 풀스택 개발자가 되기까지의 여정과 배운 점들을 공유합니다.",
    content: "콘텐츠 디자이너로 일하며 느낀 개발의 필요성과 개발자로 전환하기까지의 과정...",
    category: "커리어",
    tags: ["커리어전환", "개발자", "디자이너", "회고"],
    date: "2025-01-15",
    readTime: "8분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "2",
    title: "AI 석사 과정에서 배운 것들",
    slug: "ai-masters-journey",
    excerpt: "인하대학교 AIF Labs에서 진행한 'LSTM 및 SAINT 기반 ETF 최대 손실 예측' 연구를 통해 배운 딥러닝과 금융 AI.",
    content: "AI 석사 과정 동안 금융 시계열 데이터를 다루며 배운 것들...",
    category: "AI/ML",
    tags: ["AI", "머신러닝", "딥러닝", "LSTM", "SAINT", "금융AI"],
    date: "2025-01-10",
    readTime: "12분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "3",
    title: "Next.js 15 App Router 완벽 가이드",
    slug: "nextjs-15-app-router-guide",
    excerpt: "Next.js 15의 새로운 App Router를 활용한 실전 개발 가이드. Server Components, Client Components, 그리고 최적화 기법.",
    content: "Next.js 15 App Router의 핵심 개념과 실전 활용법...",
    category: "개발",
    tags: ["Next.js", "React", "TypeScript", "웹개발"],
    date: "2025-01-05",
    readTime: "15분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "4",
    title: "FastAPI로 보안 고려한 API 만들기",
    slug: "fastapi-security-best-practices",
    excerpt: "FastAPI를 사용하여 보안이 강화된 RESTful API를 구축하는 방법. OAuth2, JWT, CORS 설정부터 SQL Injection 방지까지.",
    content: "FastAPI 보안 best practices...",
    category: "보안",
    tags: ["FastAPI", "보안", "API", "OAuth2", "JWT"],
    date: "2024-12-28",
    readTime: "10분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "5",
    title: "React Native로 5070 시니어 앱 만들기",
    slug: "react-native-senior-app",
    excerpt: "캐치픽 앱 개발 경험을 바탕으로, 중장년층을 위한 사용자 친화적인 모바일 앱을 만드는 노하우를 공유합니다.",
    content: "시니어 타겟 앱 개발 시 고려사항...",
    category: "개발",
    tags: ["React Native", "Expo", "모바일앱", "UX"],
    date: "2024-12-20",
    readTime: "7분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "6",
    title: "OWASP Top 10 실전 가이드",
    slug: "owasp-top-10-guide",
    excerpt: "웹 애플리케이션 보안의 기초, OWASP Top 10을 실전에서 어떻게 적용할 수 있을지 구체적인 예제와 함께 설명합니다.",
    content: "OWASP Top 10 보안 취약점과 대응 방법...",
    category: "보안",
    tags: ["OWASP", "웹보안", "보안", "취약점"],
    date: "2024-12-15",
    readTime: "20분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "7",
    title: "TDD로 React 컴포넌트 테스트하기",
    slug: "tdd-react-components",
    excerpt: "Jest와 React Testing Library를 활용한 테스트 주도 개발(TDD) 실전 가이드.",
    content: "React 컴포넌트 TDD 실전...",
    category: "개발",
    tags: ["TDD", "React", "Jest", "테스트"],
    date: "2024-12-10",
    readTime: "11분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "8",
    title: "임신 준비 중인 개발자의 커리어 고민",
    slug: "developer-pregnancy-career",
    excerpt: "임신과 육아를 준비하면서 개발자로서의 커리어를 어떻게 이어갈 것인지에 대한 솔직한 이야기.",
    content: "일과 삶의 균형, 그리고 개발자로서의 성장...",
    category: "일상",
    tags: ["커리어", "일상", "워라밸", "개발자"],
    date: "2024-12-05",
    readTime: "6분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "9",
    title: "Supabase와 Next.js로 풀스택 앱 만들기",
    slug: "fullstack-app-with-supabase",
    excerpt: "Supabase를 백엔드로 사용하여 Next.js 풀스택 애플리케이션을 빠르게 구축하는 방법.",
    content: "Supabase + Next.js 실전 개발...",
    category: "개발",
    tags: ["Supabase", "Next.js", "풀스택", "Database"],
    date: "2024-11-28",
    readTime: "14분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  },
  {
    id: "10",
    title: "AWS Cognito를 활용한 인증 시스템 구축",
    slug: "aws-cognito-authentication",
    excerpt: "비즈인사이트 프로젝트에서 AWS Cognito를 사용하여 안전한 사용자 인증 시스템을 구축한 경험.",
    content: "AWS Cognito 인증 시스템 구축 경험...",
    category: "개발",
    tags: ["AWS", "Cognito", "인증", "보안"],
    date: "2024-11-20",
    readTime: "9분",
    image: "/sample1.jpg",
    author: {
      name: "장혜승",
      avatar: ""
    }
  }
]

export const categories = [
  { name: "전체", slug: "all" },
  { name: "개발", slug: "개발" },
  { name: "보안", slug: "보안" },
  { name: "AI/ML", slug: "AI/ML" },
  { name: "커리어", slug: "커리어" },
  { name: "일상", slug: "일상" }
]

export function getBlogPosts(category?: string): BlogPost[] {
  if (!category || category === "all") {
    return blogPosts
  }
  return blogPosts.filter(post => post.category === category)
}

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id)
}
