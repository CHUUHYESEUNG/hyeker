# Claude 작업 기록

## 세션 정보

### 현재 세션 (2025-11-20 ~ 2025-11-22)
- 브랜치: `claude/add-admin-panel-01AszuTUSTZHmqbrxZm1kXJp`
- 주요 목표: Admin 패널 구축, Firebase Firestore 연동, Cloudinary 이미지 업로드

### 이전 세션 (2025-11-18 ~ 2025-11-19)
- 브랜치: `claude/design-portfolio-grid-layout-01BcHsSf77hEuqvDh9Y1qg9V`
- 주요 목표: 포트폴리오 사이트 디자인 개선, 블로그 확장, SEO 최적화

---

<<<<<<< HEAD
## 작업 내역

### 1. Portfolio 페이지 그리드 레이아웃 구현
**파일**: `app/portfolio/page.tsx`

**변경 사항**:
- 디자인 탭을 리스트형에서 Instagram 스타일 그리드 레이아웃으로 변경
- 그리드 구조: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (썸네일 크기 확대)
- 개발 탭은 기존 리스트형 유지

**주요 코드**:
```tsx
{activeCategory === "design" ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {/* Grid items */}
  </div>
) : (
  <div className="space-y-6 max-w-3xl mx-auto">
    {/* List items */}
  </div>
)}
```

---

### 2. 서브카테고리 필터링 시스템
**파일**: `app/portfolio/page.tsx`, `lib/portfolio-data.ts`

**변경 사항**:
- 서브카테고리 타입 정의 추가:
  - 개발: `web` (#웹), `app` (#앱)
  - 디자인: `content` (#콘텐츠), `logo` (#로고), `card` (#명함)
- 서브카테고리 필터 UI 구현 (해시태그 스타일 버튼)
- 모든 포트폴리오 아이템에 서브카테고리 할당

**주요 코드**:
```typescript
const subCategoryLabels: Record<DevelopmentSubCategory | DesignSubCategory, string> = {
  web: "웹",
  app: "앱",
  content: "콘텐츠",
  logo: "로고",
  card: "명함"
}

const filteredItems = useMemo(
  () => portfolioItems.filter((item) => {
    if (item.category !== activeCategory) return false
    if (activeSubCategory === "all") return true
    return item.subCategory === activeSubCategory
  }),
  [activeCategory, activeSubCategory]
)
```

---

### 3. 썸네일 호버 효과
**파일**: `app/portfolio/page.tsx`

**변경 사항**:
- 썸네일 호버 시 서브카테고리 배지 표시
- 그라데이션 오버레이 추가
- 부드러운 트랜지션 효과

**주요 코드**:
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
  {item.subCategory && (
    <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20 backdrop-blur-sm">
      #{subCategoryLabels[item.subCategory]}
    </Badge>
  )}
</div>
```

---

### 4. 다크모드 테마 색상 변경
**파일**: `app/globals.css`

**변경 사항**:
- 기존 딥 퍼플에서 보라색 한 방울 들어간 블랙 테마로 변경
- OKLCH 색상 공간 활용한 정교한 색상 조정

**주요 변경**:
```css
.dark {
  --background: oklch(0.08 0.015 285); /* 거의 블랙 + 미묘한 보라 틴트 */
  --foreground: oklch(0.97 0.01 293);
  --card: oklch(0.12 0.02 285);
  --muted: oklch(0.15 0.025 285);
  --border: oklch(0.20 0.03 285);
}
```

**효과**:
- 더 세련되고 깊이감 있는 다크 테마
- 눈의 피로도 감소
- 컨텐츠 가독성 향상

---

### 5. 탭 UI 개선
**파일**: `app/portfolio/page.tsx`

**변경 사항**:
- 카테고리 탭을 full-width 그리드로 변경
- 모든 버튼에 `cursor-pointer` 추가
- 더 명확한 클릭 어포던스 제공

**주요 코드**:
```tsx
<div className="grid grid-cols-2 w-full max-w-md gap-2 p-1 bg-muted rounded-lg">
  <button className="cursor-pointer">개발</button>
  <button className="cursor-pointer">디자인</button>
</div>
```

---

### 6. Projects 페이지 색상 개선
**파일**: `app/projects/page.tsx`

**변경 사항**:
- 보라색/핑크색 텍스트를 화이트 계열 쿨톤으로 변경
- 눈의 피로도 감소
- 텍스트 계층 구조 개선

**주요 변경**:
```tsx
// 프로젝트 이름
text-primary → text-foreground

// 링크
text-primary → text-foreground/80

// 불릿 포인트
text-primary → text-foreground/60
```

---

### 7. 헤더 모던 UI 재디자인
**파일**: `components/header.tsx`

**변경 사항**:
- Framer Motion 애니메이션 추가
- Glassmorphism 효과 강화
- 마이크로 인터랙션 구현
- 동적 스크롤 효과

**주요 기능**:

#### 애니메이션
- 헤더 슬라이드 다운 entrance
- 네비게이션 아이템 stagger 효과
- 로고 hover 시 회전 + 확대
- 메뉴 아이콘 smooth 전환

#### Glassmorphism
```tsx
className="backdrop-blur-xl backdrop-saturate-150"
```

#### Active 상태 표시
```tsx
<motion.div
  layoutId="active-pill"
  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 backdrop-blur-sm"
/>
```

#### 스크롤 기반 효과
```tsx
animate={{
  scale: isScrolled ? 0.98 : 1,
}}
```

---

### 8. Pretendard 폰트 적용
**파일**: `app/layout.tsx`, `app/globals.css`, `public/fonts/PretendardVariable.woff2`

**변경 사항**:
- CDN 대신 로컬 폰트 파일 사용
- Next.js `next/font/local` 최적화 적용
- Variable 폰트 (웨이트 45-920 지원)

**구현**:

#### 1. 폰트 로드 설정
```typescript
const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});
```

#### 2. Body에 적용
```tsx
<body className={`${pretendard.variable} ${pretendard.className} antialiased`}>
```

#### 3. CSS 변수 설정
```css
:root {
  --font-pretendard: "Pretendard Variable", -apple-system, BlinkMacSystemFont, ...;
}

@theme inline {
  --font-sans: var(--font-pretendard);
}
```

**장점**:
- 성능 향상 (Next.js 자동 최적화)
- 안정성 (CDN 의존성 제거)
- 빌드 타임 최적화
- 완전한 self-hosting

---

### 9. 블로그 기능 확장
**날짜**: 2025-11-19

**생성된 파일**:
- `components/giscus-comments.tsx` - GitHub Discussions 기반 댓글 시스템
- `components/reading-progress.tsx` - 읽기 진행률 표시
- `components/table-of-contents.tsx` - 자동 목차 생성
- `components/blog-post-content.tsx` - 블로그 포스트 통합 컴포넌트

**주요 기능**:

#### Giscus 댓글
```tsx
<Giscus
  repo="chuuhyeseung/hyeker"
  repoId="R_kgDOQKksVg"
  category="Announcements"
  categoryId="DIC_kwDOQKksVs4Cx8TR"
  mapping="pathname"
  theme={theme === "dark" ? "dark" : "light"}
  lang="ko"
/>
```
- GitHub Discussions 기반 댓글 시스템
- 다크모드 자동 전환
- OAuth 인증

#### 읽기 진행률 바
```tsx
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
})
```
- 페이지 상단 고정 프로그레스 바
- Framer Motion 스프링 애니메이션

#### 목차(TOC)
- h2, h3 자동 수집
- Intersection Observer로 현재 섹션 추적
- 데스크톱: 고정 사이드바
- 모바일: 플로팅 버튼 + 모달

#### 프로필 이미지
```tsx
<Image
  src="/me.png"
  alt="Hyeker profile"
  fill
  className="object-cover"
/>
```
- 저자 섹션에 실제 프로필 이미지 표시

**해결한 이슈**:
- Giscus 저장소 미설치 오류 → 올바른 repo 설정값 적용
- `@giscus/react` 모듈 해결 실패 → 완전 재설치로 해결

---

### 10. 종합 SEO 최적화
**날짜**: 2025-11-19

**생성된 파일**:
- `app/sitemap.ts` - 동적 사이트맵 생성
- `app/robots.ts` - 검색 엔진 크롤링 정책
- `components/schema/person-schema.tsx` - Person JSON-LD
- `components/schema/website-schema.tsx` - WebSite JSON-LD
- `app/layout.tsx` (수정) - 메타데이터 보강

**구현 내용**:

#### 1. 사이트맵 자동 생성
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hyeker.com'

  // 정적 페이지
  const routes = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'weekly', priority: 0.9 },
    // ...
  ]

  // 블로그 포스트 동적 생성
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...routes, ...blogRoutes, ...portfolioRoutes]
}
```

#### 2. robots.txt 설정
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],  // AI 학습 방지
      },
    ],
    sitemap: 'https://hyeker.com/sitemap.xml',
  }
}
```

#### 3. 메타데이터 개선
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://hyeker.com'),
  verification: {
    google: "google-site-verification-code",
    other: {
      "naver-site-verification": "naver-site-verification-code",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

#### 4. JSON-LD 구조화 데이터
- Person 스키마: 개인 정보, 소셜 링크, 직업
- WebSite 스키마: 사이트 이름, URL, 설명

#### 5. 블로그 동적 메타데이터
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === id)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, "개발 블로그", "HYEKER"],
    openGraph: { /* ... */ },
    twitter: { /* ... */ },
    alternates: {
      canonical: `https://hyeker.com/blog/${post.id}`,
    },
  }
}
```

---

### 11. 페이지별 메타데이터 추가
**날짜**: 2025-11-19

**생성된 파일**:
- `app/portfolio/layout.tsx` - 포트폴리오 메타데이터
- `app/projects/layout.tsx` - 프로젝트 메타데이터
- `app/contact/layout.tsx` - 연락처 메타데이터

**추가된 메타데이터**:
- Open Graph (소셜 미디어 공유)
- Twitter Card (트위터 공유)
- Keywords (검색 키워드)
- Canonical URL (중복 컨텐츠 방지)

**효과**:
- 모든 페이지에서 소셜 미디어 공유 시 예쁜 카드 표시
- 검색 엔진 최적화 개선
- 페이지별 맞춤 키워드 설정

---

### 12. 블로그 관련 포스트 추천
**날짜**: 2025-11-19

**생성된 파일**:
- `components/related-posts.tsx`

**알고리즘**:
```typescript
const scoredPosts = blogPosts
  .filter(post => post.id !== currentPostId)
  .map(post => {
    const commonTags = post.tags.filter(tag => currentPostTags.includes(tag))
    return {
      post,
      score: commonTags.length  // 공통 태그 개수로 점수 계산
    }
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)  // 상위 3개만 표시
```

**UI 기능**:
- 카드형 레이아웃 (3개 컬럼)
- 공통 태그 강조 표시
- 호버 효과 및 애니메이션
- 관련 포스트 없으면 자동 숨김

**SEO/UX 효과**:
- 사용자 체류 시간 증가
- 페이지뷰 증가
- 콘텐츠 발견성 향상
- 내부 링크 구조 강화

---

### 13. Breadcrumb 네비게이션
**날짜**: 2025-11-19

**생성된 파일**:
- `components/breadcrumb.tsx` - UI 컴포넌트
- `components/schema/breadcrumb-schema.tsx` - JSON-LD 스키마

**적용 위치**:
- `/blog` → `홈 > 블로그`
- `/blog/[id]` → `홈 > 블로그 > 포스트 제목`
- `/portfolio` → `홈 > 포트폴리오`
- `/projects` → `홈 > 프로젝트`
- `/contact` → `홈 > 연락처`

**구현**:
```tsx
<Breadcrumb items={[
  { label: "블로그", href: "/blog" },
  { label: post.title, href: `/blog/${post.id}` }
]} />

<BreadcrumbSchema items={breadcrumbItems} />
```

**JSON-LD 스키마**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://hyeker.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "블로그",
      "item": "https://hyeker.com/blog"
    }
  ]
}
```

**SEO 효과**:
- Google 검색 결과에 breadcrumb 표시 가능
- 사이트 구조 명확화
- 크롤링 효율성 향상

**UX 효과**:
- 현재 위치 파악 쉬움
- 상위 페이지로 빠른 이동
- 사이트 계층 구조 이해 향상

---

### 14. Google Analytics 4 설정 가이드
**날짜**: 2025-11-19

**생성된 파일**:
- `GOOGLE_ANALYTICS_SETUP.md` - 완벽한 단계별 가이드

**포함 내용**:
1. GA4 계정 생성 (스크린샷 없이 상세 설명)
2. 측정 ID 발급 방법
3. Next.js 통합 방법 2가지:
   - 직접 삽입
   - 환경 변수 사용 (추천)
4. Vercel 환경 변수 설정
5. 설치 확인 방법 (3가지)
6. IP 필터링 설정
7. 커스텀 이벤트 추적 예시
8. 주요 지표 확인 위치
9. GDPR 및 개인정보 처리방침 안내

**환경 변수 방식 예시**:
```tsx
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

{GA_ID && process.env.NODE_ENV === 'production' && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}
    </Script>
  </>
)}
```

**사용자 할 일**:
- [ ] Google Analytics 계정 생성
- [ ] 측정 ID (G-XXXXXXXXXX) 받기
- [ ] Vercel 환경 변수 설정
- [ ] 배포 후 실시간 데이터 확인

---

### 15. 성능 최적화
**날짜**: 2025-11-19 (Day 3)

**목표**: JavaScript 번들 크기 축소 및 애니메이션 최적화

**변경 사항**:

#### A. Framer Motion → LazyMotion 전환
- **영향**: ~60% 번들 크기 감소 (30KB → 12KB)
- **생성된 파일**: `components/motion-provider.tsx`
- **변환된 파일**: 14개 (모든 애니메이션 컴포넌트)

**구현**:
```tsx
// components/motion-provider.tsx
import { LazyMotion, domAnimation } from "framer-motion"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

// 모든 컴포넌트에서 motion → m 변경
import { m } from "framer-motion"  // motion 대신 m 사용
```

#### B. Giscus Dynamic Import
- **영향**: 초기 페이지 로드에서 Giscus 제외 (~10KB)
- **구현**: Next.js dynamic import + ssr: false

```tsx
const GiscusComments = dynamic(
  () => import("@/components/giscus-comments").then(mod => ({ default: mod.GiscusComments })),
  { ssr: false, loading: () => <div>댓글을 불러오는 중...</div> }
)
```

#### C. 애니메이션 간소화
- **블로그 포스트**: 스태거 딜레이 최대 0.25초 제한
- **포트폴리오 그리드**: 최대 0.3초
- **포트폴리오 리스트**: 최대 0.4초
- **애니메이션 duration**: 0.6s → 0.4~0.5s 감소

**성능 개선 효과**:
- JavaScript 번들: ~28KB 절감 (LazyMotion 18KB + Giscus 10KB)
- 초기 로드 시간: 향상
- 60fps 부드러운 애니메이션 유지

---

### 16. RSS 피드 생성
**날짜**: 2025-11-19 (Day 3)

**생성된 파일**: `app/feed.xml/route.ts`

**기능**:
- RSS 2.0 표준 준수
- 모든 블로그 포스트 포함 (최신순 정렬)
- 카테고리, 태그, 전체 콘텐츠, 이미지 포함
- Cache-Control 헤더: 1시간 캐시 + 24시간 stale-while-revalidate

**주요 코드**:
```typescript
export async function GET() {
  const siteUrl = "https://hyeker.com"

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HYEKER STUDIO - 개발 블로그</title>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${blogPosts.map(post => `<item>...</item>`).join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
    }
  })
}
```

**접근 URL**: `https://hyeker.com/feed.xml`

---

### 17. 뉴스레터 구독 기능
**날짜**: 2025-11-19 (Day 3)

**생성된 파일**:
- `components/newsletter-form.tsx` - 구독 폼 UI
- `app/api/subscribe/route.ts` - Resend API 연동
- `.env.example` - 환경 변수 예시

**의존성 추가**:
```bash
npm install resend
```

**주요 기능**:

#### A. 뉴스레터 구독 폼
- 아름다운 그라데이션 카드 UI
- 이메일 유효성 검사
- 성공/실패 상태 피드백 (CheckCircle/AlertCircle)
- RSS 피드 링크 제공
- Framer Motion 애니메이션

**배치 위치**:
- 블로그 목록 페이지 하단
- 블로그 포스트 페이지 (관련 포스트 다음, 댓글 이전)

#### B. Resend API 연동
**기능**:
1. 이메일 유효성 검사
2. Resend Audience에 구독자 추가 (선택사항)
3. 웰컴 이메일 자동 발송 (HTML 템플릿)
4. 중복 구독 방지
5. 에러 처리 및 로깅

**웰컴 이메일 템플릿**:
- 그라데이션 디자인 (#667eea → #764ba2)
- 반응형 HTML
- "블로그 둘러보기" CTA 버튼
- 구독 취소 링크 포함

**환경 변수**:
```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxx           # 필수
RESEND_AUDIENCE_ID=aud_xxxxxxxxxx       # 선택사항
```

**발신자 설정**:
```typescript
// 현재 (테스트용)
from: "HYEKER STUDIO <onboarding@resend.dev>"

// 도메인 인증 후 변경 예정
from: "HYEKER STUDIO <hey@hyeker.com>"
```

**API 엔드포인트**: `POST /api/subscribe`

**응답 예시**:
```json
{
  "success": true,
  "message": "구독해주셔서 감사합니다! 이메일을 확인해주세요."
}
```

**Resend 무료 플랜**:
- 월 3,000통
- 구독자 무제한
- 개인 블로그에 충분

---

## 기술 스택

### Frontend
- **Framework**: Next.js 16.0.0 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (OKLCH 색상 공간)
- **Animation**: Framer Motion (LazyMotion 사용)
- **Font**: Pretendard Variable (로컬 호스팅)

### Backend & Services
- **Email**: Resend API (뉴스레터 구독)
- **Comments**: Giscus (GitHub Discussions)
- **Analytics**: Google Analytics 4 (예정)

### 주요 패턴
- Server Components & Client Components 구분
- React Hooks (useState, useMemo, useCallback, useEffect)
- Responsive Design (mobile-first)
- Image Optimization (Next.js Image)
- Font Optimization (next/font/local)
=======
## 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.0.0 | App Router, Turbopack |
| React | 19.2.0 | UI 라이브러리 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | 4.x | 스타일링 (OKLCH 색상) |
| Framer Motion | 12.x | 애니메이션 |
| Shadcn UI | - | Radix UI 기반 컴포넌트 |
| Lucide React | 0.548 | 아이콘 |

### Backend/Services
| 서비스 | 용도 |
|--------|------|
| Firebase Firestore | 블로그 데이터베이스 |
| Cloudinary | 이미지 호스팅 (25GB 무료) |
| Giscus | GitHub Discussions 댓글 |
| Resend | 이메일 발송 (뉴스레터) |
| Google Analytics 4 | 웹 분석 |

### 주요 라이브러리
```json
{
  "firebase": "^12.6.0",
  "next-cloudinary": "^6.17.5",
  "framer-motion": "^12.23.24",
  "react-markdown": "^10.1.0",
  "easymde": "^2.20.0",
  "react-simplemde-editor": "^5.2.0",
  "@giscus/react": "^3.1.0",
  "three": "^0.181.1",
  "@react-three/fiber": "^9.4.0"
}
```
>>>>>>> 60d977d886d6d4d84fed9dbcd57690f96e21d44c

---

## 파일 구조

```
/home/user/hyeker/
├── app/
<<<<<<< HEAD
│   ├── layout.tsx                        # 루트 레이아웃, 폰트, JSON-LD, MotionProvider
│   ├── globals.css                       # 전역 스타일, 테마 색상
│   ├── sitemap.ts                        # 동적 사이트맵 생성
│   ├── robots.ts                         # 검색 엔진 크롤링 정책
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts                 # 뉴스레터 구독 API (Resend)
│   ├── feed.xml/
│   │   └── route.ts                     # RSS 피드 생성
│   ├── blog/
│   │   ├── page.tsx                     # 블로그 목록 + 뉴스레터 폼
=======
│   ├── layout.tsx                    # 루트 레이아웃, 폰트, JSON-LD
│   ├── globals.css                   # 전역 스타일, 테마 색상
│   ├── page.tsx                      # 홈 페이지
│   ├── sitemap.ts                    # 동적 사이트맵
│   ├── robots.ts                     # 크롤링 정책
│   │
│   ├── admin/                        # ⭐ Admin 패널 (신규)
│   │   ├── layout.tsx                # Admin 레이아웃 (ProtectedRoute)
│   │   ├── page.tsx                  # Dashboard (통계, 빠른 작업)
│   │   ├── login/
│   │   │   └── page.tsx              # 로그인 페이지
│   │   ├── blog/
│   │   │   ├── page.tsx              # 블로그 목록/관리
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # 새 포스트 작성
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx      # 포스트 편집
│   │   └── portfolio/                # ⭐ 포트폴리오 Admin (신규)
│   │       ├── page.tsx              # 포트폴리오 목록/관리
│   │       ├── new/
│   │       │   └── page.tsx          # 새 포트폴리오 항목
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx      # 포트폴리오 편집
│   │
│   ├── blog/
│   │   ├── page.tsx                  # 블로그 목록 (Firestore 연동)
>>>>>>> 60d977d886d6d4d84fed9dbcd57690f96e21d44c
│   │   └── [id]/
│   │       └── page.tsx              # 블로그 상세 (Firestore 연동)
│   │
│   ├── portfolio/
│   │   ├── layout.tsx                # 포트폴리오 메타데이터
│   │   └── page.tsx                  # 그리드 레이아웃
│   │
│   ├── projects/
│   │   ├── layout.tsx                # 프로젝트 메타데이터
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   ├── layout.tsx                # 연락처 메타데이터
│   │   └── page.tsx
│   │
│   └── feed.xml/
│       └── route.ts                  # RSS 피드 (Firestore 연동)
│
├── components/
<<<<<<< HEAD
│   ├── header.tsx                        # 모던 UI 헤더 (LazyMotion)
│   ├── motion-provider.tsx               # LazyMotion wrapper (NEW)
│   ├── newsletter-form.tsx               # 뉴스레터 구독 폼 (NEW)
│   ├── breadcrumb.tsx                    # Breadcrumb UI
│   ├── related-posts.tsx                 # 관련 포스트 추천
│   ├── blog-post-content.tsx             # 블로그 통합 컴포넌트 + 뉴스레터
│   ├── giscus-comments.tsx               # GitHub 댓글 시스템 (Dynamic Import)
│   ├── reading-progress.tsx              # 읽기 진행률 바
│   ├── table-of-contents.tsx             # 자동 목차
│   └── schema/
│       ├── person-schema.tsx            # Person JSON-LD
│       ├── website-schema.tsx           # WebSite JSON-LD
│       └── breadcrumb-schema.tsx        # BreadcrumbList JSON-LD
=======
│   ├── admin/                        # ⭐ Admin 컴포넌트 (신규)
│   │   ├── auth-provider.tsx         # 인증 Context Provider
│   │   ├── protected-route.tsx       # Admin 접근 제어
│   │   ├── admin-header.tsx          # Admin 헤더
│   │   ├── admin-sidebar.tsx         # Admin 사이드바
│   │   ├── markdown-editor.tsx       # SimpleMDE 마크다운 에디터
│   │   └── image-uploader.tsx        # Cloudinary 이미지 업로더
│   │
│   ├── schema/                       # JSON-LD 스키마
│   │   ├── person-schema.tsx
│   │   ├── website-schema.tsx
│   │   └── breadcrumb-schema.tsx
│   │
│   ├── ui/                           # Shadcn UI 컴포넌트
│   │
│   ├── header.tsx                    # 모던 UI 헤더
│   ├── footer.tsx
│   ├── layout-wrapper.tsx            # Admin/Public 레이아웃 분기
│   ├── breadcrumb.tsx
│   ├── blog-post-content.tsx
│   ├── reading-progress.tsx
│   ├── table-of-contents.tsx
│   ├── related-posts.tsx
│   ├── giscus-comments.tsx
│   └── newsletter-form.tsx
│
>>>>>>> 60d977d886d6d4d84fed9dbcd57690f96e21d44c
├── lib/
│   ├── firebase/                     # ⭐ Firebase 관련 (신규)
│   │   ├── config.ts                 # Firebase 초기화 (조건부)
│   │   ├── auth.ts                   # Firebase Auth 함수
│   │   └── firestore.ts              # Firestore CRUD 함수
│   │
│   ├── util/
│   │   ├── auth.ts                   # 로컬 인증 (폴백)
│   │   └── firebase.ts               # Firebase 설정 내보내기
│   │
│   ├── cloudinary.ts                 # ⭐ Cloudinary 업로드 (신규)
│   ├── blog-data.ts                  # 블로그 타입 정의
│   ├── portfolio-data.ts             # 포트폴리오 데이터
│   └── utils.ts
│
├── public/
│   ├── fonts/
<<<<<<< HEAD
│   │   └── PretendardVariable.woff2     # 2MB
│   └── me.png                            # 프로필 이미지
├── .env.example                          # 환경 변수 예시 (NEW)
├── GOOGLE_ANALYTICS_SETUP.md             # GA4 설정 가이드
└── CLAUDE.md                             # 작업 기록
=======
│   │   └── PretendardVariable.woff2
│   ├── 3dmodel/
│   ├── lottie/
│   └── me.png
│
├── CLAUDE.md                         # 작업 기록
├── FIREBASE_SETUP.md                 # Firebase 설정 가이드
└── GOOGLE_ANALYTICS_SETUP.md         # GA4 설정 가이드
>>>>>>> 60d977d886d6d4d84fed9dbcd57690f96e21d44c
```

---

## Admin 패널 (신규)

### 인증 시스템
- **방식**: localStorage 기반 하드코딩 인증
- **계정**: `admin` / `hs0505`
- **파일**: `lib/util/auth.ts`

```typescript
// 인증 함수
export const login = (username: string, password: string): AuthUser | null
export const logout = (): void
export const getCurrentUser = (): AuthUser | null
export const isAdmin = (): boolean
```

### Admin 라우트

| 경로 | 설명 | 상태 |
|------|------|------|
| `/admin/login` | 로그인 페이지 | ✅ 완성 |
| `/admin` | 대시보드 (통계) | ✅ 완성 |
| `/admin/blog` | 블로그 목록/관리 | ✅ 완성 |
| `/admin/blog/new` | 새 포스트 작성 | ✅ 완성 |
| `/admin/blog/[id]/edit` | 포스트 편집 | ✅ 완성 |
| `/admin/portfolio` | 포트폴리오 목록/관리 | ✅ 완성 |
| `/admin/portfolio/new` | 새 포트폴리오 항목 | ✅ 완성 |
| `/admin/portfolio/[id]/edit` | 포트폴리오 편집 | ✅ 완성 |

### Admin 컴포넌트

| 컴포넌트 | 역할 |
|----------|------|
| `AuthProvider` | 인증 상태 관리 (Context) |
| `ProtectedRoute` | Admin 접근 제어 |
| `AdminHeader` | 헤더 (사용자 정보) |
| `AdminSidebar` | 네비게이션 |
| `MarkdownEditor` | SimpleMDE 에디터 |
| `ImageUploader` | Cloudinary 업로드 |

### 2025-11-19 (Day 3)

10. `perf: optimize bundle size and animations`
    - Framer Motion → LazyMotion 전환 (18KB 절감)
    - Giscus Dynamic Import 적용
    - 애니메이션 딜레이 최적화 (최대 0.4초)
    - 14개 파일에서 motion → m 변환

11. `feat: add newsletter subscription and RSS feed`
    - RSS 피드 생성 (/feed.xml)
    - 뉴스레터 구독 폼 UI
    - Resend API 연동
    - 웰컴 이메일 HTML 템플릿
    - resend 패키지 설치
    - .env.example 생성

12. `fix: use Resend test sender for email verification`
    - onboarding@resend.dev 임시 발신자 설정
    - 도메인 인증 없이 테스트 가능
    - TODO 주석 추가 (향후 hey@hyeker.com 변경)

---

## Firebase Firestore

### 컬렉션: `blog_posts`

```typescript
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string           // Markdown
  category: string
  tags: string[]
  date: Timestamp
  readTime: string
  image: string
  authorId: string
  authorName: string
  authorAvatar: string
  published: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### CRUD 함수 (`lib/firebase/firestore.ts`)

```typescript
// 읽기
getBlogPosts(categoryFilter?)      // 공개 포스트만
getAllBlogPostsAdmin()             // 모든 포스트 (Draft 포함)
getBlogPost(id)                    // 단일 포스트
getBlogPostBySlug(slug)            // Slug로 조회

// 쓰기
createBlogPost(data)               // 생성
updateBlogPost(id, data)           // 수정
deleteBlogPost(id)                 // 삭제

// 헬퍼
generateSlug(title)                // URL 슬러그 생성
calculateReadTime(content)         // 읽기 시간 계산
```

### Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    match /blog_posts/{document=**} {
      allow read: if true;
      allow write: if true;  // 추후 인증 추가 시 수정
    }
  }
}
```

### 필요한 인덱스
- `blog_posts`: `published` (Ascending) + `date` (Descending)

---

## Cloudinary 이미지 업로드

### 설정 (`lib/cloudinary.ts`)

```typescript
// 업로드
export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string>

export const validateImageFile = (file: File): { valid: boolean; error?: string }
export const isCloudinaryConfigured = (): boolean

// 이미지 최적화 (자동 포맷/품질 변환)
export const getOptimizedImageUrl = (url: string, options?: ImageTransformOptions): string
export const getBlogThumbnailUrl = (url: string): string        // w_800, q_auto, f_auto
export const getBlogDetailImageUrl = (url: string): string      // w_1200, q_auto:good, f_auto
export const getPortfolioThumbnailUrl = (url: string): string   // w_600, h_400, c_fill
export const getAvatarUrl = (url: string, size?: number): string // 원형 아바타
```

### 환경 변수

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Cloudinary 설정 방법
1. [Cloudinary Console](https://console.cloudinary.com) 접속
2. Settings → Upload → Upload Presets
3. "Add upload preset" 클릭
4. Signing Mode: **Unsigned**
5. Folder: `blog` (선택사항)
6. 저장 후 Preset Name 복사

---

## 작업 내역 (2025-11-20 ~ 2025-11-22)

### 15. Admin 패널 기본 구조
**날짜**: 2025-11-20

**생성된 파일**:
- `app/admin/layout.tsx` - Admin 레이아웃
- `app/admin/page.tsx` - 대시보드
- `app/admin/login/page.tsx` - 로그인 페이지
- `app/admin/blog/page.tsx` - 블로그 관리
- `app/admin/blog/new/page.tsx` - 새 포스트
- `app/admin/blog/[id]/edit/page.tsx` - 포스트 편집
- `components/admin/*.tsx` - Admin 컴포넌트들
- `lib/util/auth.ts` - 인증 유틸리티

---

### 16. Firebase Firestore 연동
**날짜**: 2025-11-21

**변경 사항**:
- `lib/firebase/firestore.ts` - CRUD 함수 구현
- `lib/util/firebase.ts` - Firebase 초기화
- `app/blog/page.tsx` - Firestore에서 데이터 fetch
- `app/blog/[id]/page.tsx` - 클라이언트 컴포넌트로 변환
- `app/feed.xml/route.ts` - RSS 피드 Firestore 연동

**제거된 파일**:
- `lib/blog-data.ts` - 더미 데이터 제거 (타입만 유지)

---

### 17. Cloudinary 이미지 업로드
**날짜**: 2025-11-21

**변경 사항**:
- Firebase Storage → Cloudinary로 변경
- `lib/cloudinary.ts` - 업로드 함수 구현
- `components/admin/image-uploader.tsx` - Cloudinary 업로더

**이유**:
- Firebase Storage 설정 복잡성
- Cloudinary 25GB 무료 제공
- 이미지 최적화 자동 처리

---

### 18. 버그 수정
**날짜**: 2025-11-21 ~ 2025-11-22

| 이슈 | 원인 | 해결 |
|------|------|------|
| 로그인 후 리다이렉트 안됨 | storage 이벤트가 같은 탭에서 발생 안함 | `refreshUser()` 함수 추가 |
| Admin 대시보드 무한 로딩 | Firebase 미설정 시 에러 처리 없음 | 설정 체크 로직 추가 |
| 블로그 포스트 수정 에러 | Next.js 15 params Promise 변경 | `React.use()` 사용 |
| Favicon preload 경고 | SVG 아이콘 preload 이슈 | 메타데이터 type 명시 |

---

### 19. 포트폴리오 Admin 페이지
**날짜**: 2025-11-22

**생성된 파일**:
- `app/admin/portfolio/page.tsx` - 포트폴리오 목록/관리
- `app/admin/portfolio/new/page.tsx` - 새 포트폴리오 항목 작성
- `app/admin/portfolio/[id]/edit/page.tsx` - 포트폴리오 편집

**추가된 Firestore CRUD** (`lib/firebase/firestore.ts`):
- `getPortfolioItems()` - 공개 포트폴리오만
- `getAllPortfolioItemsAdmin()` - 모든 포트폴리오 (Draft 포함)
- `getPortfolioItem(id)` - 단일 포트폴리오
- `createPortfolioItem(data)` - 생성
- `updatePortfolioItem(id, data)` - 수정
- `deletePortfolioItem(id)` - 삭제

---

### 20. Firebase Auth 듀얼 모드 지원
**날짜**: 2025-11-22

**변경 사항**:
- `lib/firebase/config.ts` - Firebase 조건부 초기화 (API 키 없을 시 null 반환)
- `lib/firebase/auth.ts` - null auth 처리, `isFirebaseAuthAvailable()` 함수 추가
- `components/admin/auth-provider.tsx` - Firebase Auth + localStorage 듀얼 모드 지원

**동작 방식**:
- Firebase API 키 설정 시: Firebase Authentication 사용
- Firebase 미설정 시: localStorage 기반 로컬 인증 폴백

---

### 21. Cloudinary 이미지 최적화
**날짜**: 2025-11-22

**변경 사항**:
- `lib/cloudinary.ts` - 이미지 최적화 함수 추가
  - `getOptimizedImageUrl()` - 범용 최적화
  - `getBlogThumbnailUrl()` - 블로그 썸네일
  - `getBlogDetailImageUrl()` - 블로그 상세 이미지
  - `getPortfolioThumbnailUrl()` - 포트폴리오 썸네일
  - `getAvatarUrl()` - 프로필 아바타

**적용된 페이지**:
- `app/blog/page.tsx` - 블로그 목록 이미지
- `components/blog-post-content.tsx` - 블로그 상세 히어로 이미지
- `app/portfolio/page.tsx` - 포트폴리오 그리드/카드 이미지
- `app/admin/portfolio/page.tsx` - Admin 포트폴리오 썸네일

**최적화 효과**:
- `f_auto`: 브라우저에 맞는 최적 포맷 (WebP/AVIF) 자동 선택
- `q_auto`: 품질 자동 최적화 (파일 크기 절감)
- 반응형 크기 제한으로 모바일 대역폭 절약

---

### 22. Markdown 코드 구문 강조
**날짜**: 2025-11-22

**생성된 파일**:
- `components/markdown-renderer.tsx` - ReactMarkdown + rehype-highlight

**기능**:
- 코드 블록 구문 강조 (GitHub Dark 테마)
- 코드 복사 버튼
- GFM (GitHub Flavored Markdown) 지원
- 테이블, 인라인 코드, 링크, 이미지 스타일링
- 헤딩 앵커 자동 생성

---

### 23. 블로그 검색 기능 개선
**날짜**: 2025-11-22

**변경 사항**:
- `app/blog/page.tsx` - 검색 기능 강화

**기능**:
- 제목, 발췌문, 본문 내용 검색
- 태그 클릭 필터링 (다중 선택)
- 활성 필터 표시 및 개별 제거
- 전체 필터 초기화 버튼
- 검색 결과 개수 표시

---

### 24. 태그/카테고리 페이지
**날짜**: 2025-11-22

**생성된 파일**:
- `app/blog/tags/[tag]/page.tsx` - 태그별 포스트 목록
- `app/blog/category/[category]/page.tsx` - 카테고리별 포스트 목록

**기능**:
- 관련 태그/다른 카테고리 표시
- 무한 스크롤 로딩
- 블로그 상세 페이지에서 태그/카테고리 링크 추가

---

### 25. 조회수 카운터
**날짜**: 2025-11-22

**변경 사항**:
- `lib/firebase/firestore.ts` - `views` 필드 및 `incrementViewCount()` 함수 추가
- `lib/blog-data.ts` - BlogPost 타입에 `views` 필드 추가
- `app/blog/[id]/page.tsx` - 조회수 증가 호출
- `app/blog/page.tsx` - 카드에 조회수 표시
- `components/blog-post-content.tsx` - 상세 페이지에 조회수 표시

**기능**:
- 세션당 1회 조회수 증가
- Eye 아이콘과 함께 조회수 표시
- 숫자 포맷팅 (천 단위 구분)

---

### 26. OG 이미지 동적 생성
**날짜**: 2025-11-22

**생성된 파일**:
- `app/api/og/route.tsx` - Edge Runtime OG 이미지 생성 API

**기능**:
- 동적 제목/설명 파라미터
- 타입별 그라데이션 색상 (default, blog, portfolio)
- 반응형 폰트 크기
- 브랜드 로고 및 장식 요소

**사용 방법**:
```
/api/og?title=제목&description=설명&type=blog
```

**적용**:
- `app/layout.tsx` - 기본 OG 이미지 설정
- `app/blog/[id]/page.tsx` - 동적 메타 태그 업데이트

---

## 커밋 히스토리 (2025-11-20 ~ 2025-11-22)

```
005fa9b fix: use React.use() for async params in Next.js 15
fb1b1c2 fix: update favicon metadata to prevent preload warning
be18cde feat: connect blog pages to Firebase Firestore
bbbca28 feat: replace Firebase Storage with Cloudinary for image uploads
b5bcce9 fix: add Firebase error handling to prevent infinite loading
b4f8da3 fix: add refreshUser to update auth state after login
20268a6 fix: hide main site header/footer on admin routes
e48923c refactor: simplify auth to hardcoded credentials
7bf4125 feat: complete Firebase Admin Blog CRUD
```

---

## 환경 변수

### 필수

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### 선택

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Resend (이메일)
RESEND_API_KEY=
```

---

## 고도화 제안

### 1. 인증 시스템 개선 (높은 우선순위)
현재 하드코딩된 인증을 실제 인증 시스템으로 교체

<<<<<<< HEAD
### 성능 최적화
- [x] 이미지 lazy loading 최적화 ✅
- [x] 애니메이션 성능 프로파일링 ✅
- [x] JavaScript 번들 크기 축소 ✅
- [ ] Lighthouse 점수 개선
- [ ] Core Web Vitals 측정

### 기능 추가
- [ ] 블로그 검색 기능 강화
- [ ] 포트폴리오 필터 & 정렬 옵션 추가
- [ ] 다국어 지원 (i18n)
- [x] RSS 피드 생성 ✅
- [ ] 소셜 공유 버튼 구현
- [x] 뉴스레터 구독 기능 ✅
- [ ] 구독 취소 페이지 (/unsubscribe)
- [ ] 새 글 발행 시 구독자에게 이메일 발송
=======
**옵션 A: Firebase Authentication**
```typescript
// lib/firebase/auth.ts (이미 구현됨, 미사용)
import { signInWithEmailAndPassword } from 'firebase/auth'
```

**옵션 B: NextAuth.js**
- GitHub, Google OAuth 지원
- 세션 관리 자동화
- 더 안전한 토큰 관리
>>>>>>> 60d977d886d6d4d84fed9dbcd57690f96e21d44c

**할 일**:
- [ ] Firebase Auth 또는 NextAuth.js 적용
- [ ] Admin 권한 Firestore에 저장
- [ ] 로그아웃 시 세션 정리

---

### 2. 포트폴리오 Admin 페이지 (높은 우선순위)
블로그처럼 포트폴리오도 Admin에서 관리

**필요한 작업**:
- [ ] `app/admin/portfolio/page.tsx` - 목록/관리
- [ ] `app/admin/portfolio/new/page.tsx` - 새 항목
- [ ] `app/admin/portfolio/[id]/edit/page.tsx` - 편집
- [ ] `lib/firebase/firestore.ts` - Portfolio CRUD 추가
- [ ] Firestore `portfolio_items` 컬렉션 생성

---

### 3. 이미지 최적화 (중간 우선순위)

**현재 문제**:
- 원본 이미지 그대로 사용
- 모바일에서 불필요하게 큰 이미지 로드

**해결 방안**:
```typescript
// Cloudinary 변환 URL 사용
const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_800,f_auto,q_auto/${publicId}`
```

**할 일**:
- [ ] Cloudinary 자동 변환 적용
- [ ] Next.js Image 컴포넌트 최적화
- [ ] Lazy loading 개선

---

### 4. 검색 기능 (중간 우선순위)

**현재**: 클라이언트 사이드 필터링만 지원

**개선안 A: Firestore 전문 검색**
```typescript
// 제목/내용 검색 (제한적)
where('title', '>=', searchTerm)
where('title', '<=', searchTerm + '\uf8ff')
```

**개선안 B: Algolia 통합**
- 전문 검색 엔진
- 자동완성, 하이라이팅
- 무료 티어 제공

**할 일**:
- [ ] 검색 UI 개선
- [ ] Algolia 또는 Meilisearch 검토
- [ ] 검색 결과 페이지 생성

---

### 5. 블로그 기능 확장 (중간 우선순위)

**추가 기능**:
- [ ] 시리즈/연재 기능
- [ ] 태그 페이지 (`/blog/tags/[tag]`)
- [ ] 카테고리 페이지 (`/blog/category/[cat]`)
- [ ] 조회수 카운터
- [ ] 좋아요 기능

**시리즈 구현 예시**:
```typescript
interface BlogPost {
  // 기존 필드...
  seriesId?: string
  seriesOrder?: number
}

interface Series {
  id: string
  title: string
  description: string
  posts: string[]  // post IDs
}
```

---

### 6. SEO 고급 최적화 (낮은 우선순위)

**할 일**:
- [ ] Open Graph 이미지 동적 생성 (`/api/og`)
- [ ] Article JSON-LD 스키마
- [ ] FAQ JSON-LD 스키마
- [ ] 내부 링크 구조 최적화
- [ ] Core Web Vitals 개선

**OG 이미지 동적 생성 예시**:
```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')

  return new ImageResponse(
    <div style={{ /* 스타일 */ }}>
      {title}
    </div>,
    { width: 1200, height: 630 }
  )
}
```

---

### 7. 성능 최적화 (낮은 우선순위)

**현재 상태**: 기본 Next.js 최적화만 적용

**개선 방안**:
- [ ] React Server Components 더 활용
- [ ] Streaming SSR 적용
- [ ] 번들 사이즈 분석 (`@next/bundle-analyzer`)
- [ ] 코드 스플리팅 최적화
- [ ] Prefetch 전략 개선

---

### 8. 테스트 추가 (낮은 우선순위)

**현재**: 테스트 없음

**권장 스택**:
- Jest + React Testing Library (단위 테스트)
- Playwright (E2E 테스트)

**우선 테스트 대상**:
- [ ] Auth 함수들
- [ ] Firestore CRUD 함수들
- [ ] Admin 페이지 플로우

---

### 9. 백업 및 복구 (낮은 우선순위)

**Firestore 백업**:
```bash
# Firebase CLI 사용
firebase firestore:export gs://your-bucket/backups/$(date +%Y%m%d)
```

**자동 백업 설정**:
- [ ] Cloud Functions로 일일 백업
- [ ] 복구 스크립트 작성
- [ ] 백업 알림 설정

---

### 10. 다국어 지원 (낮은 우선순위)

**라이브러리 옵션**:
- `next-intl`
- `next-i18next`

**구조 예시**:
```
app/
├── [locale]/
│   ├── page.tsx
│   ├── blog/
│   └── portfolio/
└── dictionaries/
    ├── ko.json
    └── en.json
```

---

## 이전 세션 작업 내역 (2025-11-18 ~ 2025-11-19)

### 완료된 기능
- ✅ 포트폴리오 그리드 레이아웃
- ✅ 서브카테고리 필터링
- ✅ 다크 테마 색상 개선 (OKLCH)
- ✅ Pretendard 폰트 로컬 호스팅
- ✅ 헤더 모던 UI (Framer Motion)
- ✅ 블로그 댓글 시스템 (Giscus)
- ✅ 읽기 진행률 바
- ✅ 자동 목차
- ✅ 종합 SEO 최적화
- ✅ 페이지별 메타데이터
- ✅ 관련 포스트 추천
- ✅ Breadcrumb 네비게이션
- ✅ Google Analytics 가이드

### 참고: 이전 세션 상세 내역은 Git 히스토리 참조

---

## 사용자 할 일 체크리스트

### 즉시 (배포 전)
- [ ] Firebase 환경 변수 설정 (Vercel)
- [ ] Cloudinary 환경 변수 설정 (Vercel)
- [ ] Firestore 인덱스 생성 확인
- [ ] 보안 규칙 확인

### 배포 후
- [ ] Google Search Console 인증
- [ ] Naver Search Advisor 인증
- [ ] sitemap.xml 제출
- [ ] Google Analytics 설정 및 확인

### 선택사항
- [ ] Admin 계정 비밀번호 변경 (코드 수정 필요)
- [ ] Cloudinary 폴더 구조 정리
- [ ] 백업 스케줄 설정

---

## 참고 자료

### Firebase
- [Firestore 시작하기](https://firebase.google.com/docs/firestore/quickstart)
- [Firestore 보안 규칙](https://firebase.google.com/docs/firestore/security/get-started)
- [복합 쿼리 인덱스](https://firebase.google.com/docs/firestore/query-data/indexing)

### Cloudinary
- [Upload API](https://cloudinary.com/documentation/upload_images)
- [이미지 변환](https://cloudinary.com/documentation/image_transformations)
- [React SDK](https://cloudinary.com/documentation/react_integration)

### Next.js 15
- [App Router](https://nextjs.org/docs/app)
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

### 기타
- [Framer Motion](https://www.framer.com/motion/)
- [Giscus](https://giscus.app/ko)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [OKLCH Color Space](https://oklch.com/)

### 애니메이션
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Framer Motion Scroll Animations](https://www.framer.com/motion/scroll-animations/)

### SEO & 메타데이터
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search/docs)
- [Naver Search Advisor](https://searchadvisor.naver.com/)
- [Open Graph Protocol](https://ogp.me/)

### 블로그 & 댓글
- [Giscus GitHub](https://github.com/giscus/giscus)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### 이메일 & 구독
- [Resend Documentation](https://resend.com/docs)
- [Resend React Email](https://resend.com/docs/send-with-react-email)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)

### Analytics
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics](https://nextjs.org/analytics)

---

## 브랜치 정보

**현재 브랜치**: `claude/design-portfolio-grid-layout-01BcHsSf77hEuqvDh9Y1qg9V`

**메인 브랜치로 머지 시 체크리스트**:
- [x] 모든 페이지에서 폰트 제대로 적용되는지 확인
- [x] 라이트모드/다크모드 테마 전환 테스트
- [x] 모바일 반응형 테스트
- [x] 애니메이션 성능 체크 (LazyMotion 적용)
- [x] 빌드 에러 없는지 확인 ✅
- [x] 링크 및 네비게이션 작동 확인
- [x] SEO 메타데이터 모든 페이지에 적용
- [x] Breadcrumb 모든 페이지에 표시
- [x] 블로그 댓글, 진행률, 목차 기능 동작
- [x] 관련 포스트 추천 기능 동작
- [x] RSS 피드 정상 생성 (/feed.xml)
- [x] 뉴스레터 구독 기능 로컬 테스트 완료
- [ ] Vercel 환경 변수 설정 (RESEND_API_KEY)
- [ ] Resend 도메인 인증
- [ ] 뉴스레터 구독 프로덕션 테스트
- [ ] Google Search Console 인증 완료
- [ ] Naver Search Advisor 인증 완료
- [ ] Google Analytics 설치 및 데이터 수집 확인
- [ ] sitemap.xml 제출 완료

---

## 세션 요약

### 완료된 주요 기능
✅ 포트폴리오 그리드 레이아웃
✅ 서브카테고리 필터링
✅ 다크 테마 색상 개선
✅ Pretendard 폰트 로컬 호스팅
✅ 헤더 모던 UI
✅ 블로그 댓글 시스템 (Giscus)
✅ 읽기 진행률 바
✅ 자동 목차
✅ 종합 SEO 최적화
✅ 페이지별 메타데이터
✅ 관련 포스트 추천
✅ Breadcrumb 네비게이션
✅ Google Analytics 가이드
✅ **성능 최적화 (LazyMotion)** ⭐ NEW
✅ **RSS 피드** ⭐ NEW
✅ **뉴스레터 구독** ⭐ NEW

### 생성된 파일 (총 24개)
- **컴포넌트**: 9개 (motion-provider, newsletter-form 추가)
- **레이아웃**: 3개
- **API Routes**: 1개 (subscribe)
- **Dynamic Routes**: 1개 (feed.xml)
- **SEO 파일**: 2개 (sitemap, robots)
- **JSON-LD 스키마**: 3개
- **환경 설정**: 1개 (.env.example)
- **가이드 문서**: 2개 (GA4, CLAUDE.md)
- **기타**: 2개

### 총 커밋 수: 12개
- 2025-11-18 (Day 1): 4개 (디자인 & 폰트)
- 2025-11-19 (Day 2): 5개 (블로그 & SEO)
- 2025-11-19 (Day 3): 3개 (성능 최적화 & 뉴스레터)

### 빌드 상태
```bash
✓ Compiled successfully
✓ Generating static pages (23/23)
Route (app)
├ ○ / (Static)
├ ○ /_not-found (Static)
├ ƒ /api/subscribe (Dynamic - API Route)
├ ○ /blog (Static)
├ ● /blog/[id] (SSG - 10 pages)
├ ○ /contact (Static)
├ ƒ /feed.xml (Dynamic - RSS Feed)
├ ○ /portfolio (Static)
├ ƒ /portfolio/app/[id] (Dynamic)
├ ƒ /portfolio/design/[id] (Dynamic)
├ ○ /privacy-policy (Static)
├ ○ /projects (Static)
├ ○ /robots.txt (Static)
└ ○ /sitemap.xml (Static)
```

### 성능 개선 효과
- **JavaScript 번들**: ~28KB 절감 (LazyMotion 18KB + Giscus 10KB)
- **초기 로드 시간**: 향상
- **애니메이션**: 60fps 유지, 딜레이 최적화

### SEO & 사용자 참여 개선
- **Sitemap**: 검색 엔진 자동 크롤링
- **Metadata**: 모든 페이지 검색 최적화
- **JSON-LD**: Rich Snippets 가능
- **Breadcrumb**: 검색 결과 구조 표시
- **Related Posts**: 체류 시간 증가
- **Open Graph**: 소셜 공유 최적화
- **RSS Feed**: RSS 리더 구독 가능
- **Newsletter**: 이메일 구독자 확보

### 사용자 할 일 (배포 전)
- [ ] Resend 도메인 인증 (DNS TXT 레코드)
- [ ] 발신자 이메일 hey@hyeker.com으로 변경
- [ ] Vercel 환경 변수 설정 (RESEND_API_KEY)
- [ ] Resend Audience 생성 및 ID 설정 (선택사항)
- [ ] Search Console 인증
- [ ] Google Analytics 설치
- [ ] sitemap.xml 제출

---
