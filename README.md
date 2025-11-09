# HYEKER.COM - Portfolio & Blog

> Next.js 16 + TypeScript + Tailwind CSS v4로 구축된 풀스택 개발자 포트폴리오

🔗 **Live Site**: [hyeker.com](https://hyeker.com)
🚀 **Framework**: Next.js 16.0.0 (App Router)
⚡ **Performance**: Lighthouse 95+ Score Target

---

## 🏗️ Tech Stack

### Core
- **Next.js 16.0.0** - React 19.2.0, App Router, Server Components
- **TypeScript 5** - 타입 안정성
- **Tailwind CSS v4** - 새로운 CSS 엔진, oklch 색상 포맷
- **Turbopack** - Next.js 16 기본 번들러

### UI & Animation
- **shadcn/ui** - Radix UI 기반 컴포넌트 시스템
- **Framer Motion 12** - 선언적 애니메이션 (3D tilt, parallax, scroll-based)
- **Lucide React** - 아이콘 시스템
- **next-themes** - 다크모드 (시스템 설정 감지)

### Styling Architecture
- **CSS Variables** - 테마 토큰 시스템 (oklch 색상 공간)
- **Custom Animations** - fade-up, glow, pulse-slow 등
- **Responsive Design** - Mobile-first 접근
- **Design Tokens** - 보라색(violet) 기반 색상 시스템

---

## 📦 Installation

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# Lint 검사
npm run lint
```

**Environment**:
- Node.js 18+
- npm 9+

---

## 🗂️ Project Structure

```
hyeker/
├── app/                        # Next.js 16 App Router
│   ├── layout.tsx             # 루트 레이아웃 (Header, Footer, ThemeProvider)
│   ├── page.tsx               # 홈 (Hero, About, Skills, Portfolio, Contact)
│   ├── globals.css            # Tailwind v4 설정, CSS Variables
│   ├── portfolio/             # 포트폴리오 페이지
│   │   ├── page.tsx          # 무한 스크롤, lazy loading
│   │   └── app/[id]/         # 동적 상세 페이지
│   ├── blog/                  # 블로그 (MDX 예정)
│   ├── projects/              # 프로젝트 타임라인
│   ├── contact/               # 연락처
│   └── privacy-policy/        # 개인정보 처리방침
│
├── components/
│   ├── ui/                    # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── header.tsx             # 고정 헤더 (스크롤 blur 효과)
│   ├── footer.tsx             # 푸터
│   ├── theme-provider.tsx     # next-themes Provider
│   └── theme-toggle.tsx       # 다크모드 토글
│
├── lib/
│   ├── utils.ts               # cn() - clsx + tailwind-merge
│   ├── portfolio-data.ts      # 포트폴리오 데이터 (타입 정의 포함)
│   └── blog-data.ts           # 블로그 더미 데이터
│
├── public/
│   ├── hero1.png              # Hero 섹션 메인 이미지
│   ├── 2_maedup.png           # 포트폴리오 이미지들
│   ├── 3_terra.png
│   ├── 5_onyu.png
│   └── ...
│
└── types/                      # TypeScript 타입 정의
```

---

## 🎨 Design System

### Color Palette (oklch)

**Light Mode**:
```css
--primary: oklch(0.64 0.23 293);      /* violet-500 */
--secondary: oklch(0.65 0.28 340);    /* pink-500 */
--accent: oklch(0.71 0.32 328);       /* fuchsia-500 */
```

**Dark Mode**:
```css
--background: oklch(0.15 0.04 285);   /* Deep purple */
--primary: oklch(0.75 0.19 293);      /* violet-400 */
```

### Gradients
```css
/* Hero Background */
linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)

/* Glow Effects */
box-shadow: 0 0 20px rgba(139, 92, 246, 0.3)
```

### Typography
- **Font**: Inter (via next/font), Pretendard (한글)
- **Spacing**: letter-spacing 적극 활용 (0.35em ~ 0.45em)
- **Hierarchy**: h1 (48px) → h2 (36px) → body (16px)

---

## ⚡ Performance Optimizations

### Image Optimization
- **Next.js Image Component** - 자동 WebP 변환, lazy loading
- **Sizes Attribute** - 반응형 이미지 최적화
- **Priority Loading** - Hero 섹션 이미지 우선 로드

### Code Splitting
- **Dynamic Imports** - 필요한 컴포넌트만 로드
- **Route-based Splitting** - App Router 자동 최적화

### Animation Performance
- **GPU Acceleration** - transform, opacity 활용
- **will-change** - 애니메이션 최적화
- **Framer Motion** - 선언적 애니메이션, 60fps 유지

### Bundle Size
- **Tree Shaking** - 사용하지 않는 코드 제거
- **Tailwind CSS Purge** - 미사용 스타일 제거

**Target Metrics**:
- Lighthouse Score: 95+
- FCP: < 1.5s
- TTI: < 3s
- CLS: < 0.1

---

## 🔧 Key Technical Decisions

### 1. Tailwind CSS v4
- **이유**: 새로운 CSS 엔진, oklch 색상, 성능 개선
- **트레이드오프**: 새 버전이라 일부 플러그인 호환성 이슈

### 2. Framer Motion
- **이유**: 선언적 애니메이션 API, 3D transform 지원
- **사용 사례**: Hero tilt, scroll-based animations, card hover

### 3. shadcn/ui
- **이유**: 컴포넌트 소스 코드 소유, 커스터마이징 용이
- **장점**: 번들 사이즈 최적화, 디자인 시스템 통합

### 4. Server Components (RSC)
- **이유**: 초기 로드 성능 개선, SEO 최적화
- **사용**: layout.tsx, 정적 콘텐츠
- **Client Components**: 인터랙션 필요 시 "use client"

---

## 🎯 Key Features Implementation

### 1. Hero 섹션 3D Tilt 효과
```typescript
// Framer Motion + MouseMove 이벤트
const handleHeroPointerMove = (event) => {
  const relativeX = (event.clientX - rect.left) / rect.width - 0.5
  const rotateY = relativeX * 24
  setHeroTilt({ rotateX, rotateY })
}
```

### 2. 포트폴리오 무한 스크롤
```typescript
// IntersectionObserver + Lazy Loading
const loadMore = () => {
  setVisibleCount(prev => prev + LOAD_STEP)
}
```

### 3. 다크모드 시스템
```typescript
// next-themes + CSS Variables
<ThemeProvider attribute="class" defaultTheme="system">
```

### 4. 조건부 렌더링 (플랫폼/상세 링크)
```typescript
showPlatforms?: boolean  // 플랫폼 섹션 표시 여부
showDetailLink?: boolean // "자세히 보기" 링크 표시 여부
```

---

## 🚀 Deployment

### Vercel (Production)
```bash
# 자동 배포: main 브랜치 push 시
git push origin main

# 환경 변수 설정 (Vercel Dashboard)
NEXT_PUBLIC_SITE_URL=https://hyeker.com
```

### Build Output
```bash
npm run build
# Output: .next/ (Static + Server)
# Deployment: Vercel Edge Network
```

---

## 🧪 Development Workflow

### 1. 컴포넌트 추가
```bash
# shadcn/ui 컴포넌트 설치
npx shadcn@latest add [component-name]
```

### 2. 포트폴리오 데이터 추가
`lib/portfolio-data.ts`에 새 항목 추가:
```typescript
{
  routeId: "8",
  id: "new-project",
  title: "프로젝트명",
  image: "/project-image.png",
  showPlatforms: true,
  showDetailLink: false,
  ...
}
```

### 3. 블로그 글 추가 (예정)
- MDX 파일 작성: `content/blog/post-name.mdx`
- next-mdx-remote 설정

---

## 📊 Analytics & SEO

### Metadata
```typescript
export const metadata = {
  title: 'HYEKER STUDIO',
  description: '1인 인디 개발자 혜커의 블로그 & 포트폴리오',
  openGraph: { ... },
  twitter: { ... }
}
```

### SEO Checklist
- ✅ Semantic HTML
- ✅ Meta tags (OG, Twitter Card)
- ✅ Alt text for images
- ⏳ sitemap.xml (예정)
- ⏳ RSS feed (예정)
- ⏳ Google Analytics (예정)

---

## 🐛 Troubleshooting

### Port 충돌
```bash
# Port 3000이 사용 중일 때
npm run dev
# → Port 3001로 자동 전환
```

### Tailwind CSS v4 경고
- `@tailwind` 대신 `@import "tailwindcss"` 사용
- `bg-gradient-to-br` → `bg-linear-to-br` (일부 경고)

### Image 최적화 이슈
- SVG 파일은 조건부 크기 조정 (`w-[12.5%]` for icons)

---

## 📝 TODO

- [ ] MDX 블로그 시스템 구현
- [ ] 검색 기능 (블로그)
- [ ] 댓글 시스템 (Giscus)
- [ ] Google Analytics 연동
- [ ] sitemap.xml 자동 생성
- [ ] RSS feed
- [ ] About 페이지 (독립)
- [ ] Resume 페이지 (PDF 다운로드)

---

## 📄 License

Copyright © 2025 Hyeker. All rights reserved.

---

## 📬 Contact

- **Email**: heyhyeker@gmail.com
- **Website**: [hyeker.com](https://hyeker.com)
- **GitHub**: [@CHUUHYESEUNG](https://github.com/CHUUHYESEUNG)
- **Instagram**: [@heyhyeker](https://instagram.com/heyhyeker)
- **Brunch**: [brunch.co.kr/@hyeker](https://brunch.co.kr/@hyeker)
- **Tistory**: [dalsoon-jang.tistory.com](https://dalsoon-jang.tistory.com)
