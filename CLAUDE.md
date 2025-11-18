# Claude 작업 기록

## 세션 정보
- 브랜치: `claude/design-portfolio-grid-layout-01BcHsSf77hEuqvDh9Y1qg9V`
- 작업 기간: 2025-11-18
- 주요 목표: 포트폴리오 사이트 디자인 개선 및 폰트 변경

---

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

## 기술 스택

### Frontend
- **Framework**: Next.js 16.0.0 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (OKLCH 색상 공간)
- **Animation**: Framer Motion
- **Font**: Pretendard Variable (로컬 호스팅)

### 주요 패턴
- Server Components & Client Components 구분
- React Hooks (useState, useMemo, useCallback, useEffect)
- Responsive Design (mobile-first)
- Image Optimization (Next.js Image)
- Font Optimization (next/font/local)

---

## 파일 구조

```
/home/user/hyeker/
├── app/
│   ├── layout.tsx                 # 루트 레이아웃, 폰트 설정
│   ├── globals.css                # 전역 스타일, 테마 색상
│   ├── portfolio/
│   │   └── page.tsx              # 그리드 레이아웃, 필터링
│   └── projects/
│       └── page.tsx              # 색상 개선
├── components/
│   └── header.tsx                # 모던 UI 헤더
├── lib/
│   └── portfolio-data.ts         # 포트폴리오 데이터, 타입
└── public/
    └── fonts/
        └── PretendardVariable.woff2  # 2MB
```

---

## 커밋 히스토리

1. `feat: modernize header with advanced UI techniques`
   - Framer Motion 애니메이션
   - Glassmorphism 효과
   - 마이크로 인터랙션

2. `feat: change primary font to Pretendard`
   - Pretendard CDN 추가 (초기)

3. `refactor: replace Pretendard CDN with local font file`
   - 로컬 폰트 파일 다운로드
   - next/font/local 설정

4. `fix: add pretendard.className for proper font application`
   - className 추가로 폰트 제대로 적용

---

## 알려진 이슈 및 해결

### 이슈 1: Pretendard 폰트 적용 안됨
**증상**: Inter 폰트처럼 보임

**원인**: `pretendard.variable`만 추가하고 `pretendard.className` 누락

**해결**:
```tsx
// Before
<body className={`${pretendard.variable} antialiased font-sans`}>

// After
<body className={`${pretendard.variable} ${pretendard.className} antialiased`}>
```

---

## 다음 작업 제안

### UI/UX 개선
- [ ] 포트폴리오 상세 페이지 개선
- [ ] 블로그 페이지 그리드 레이아웃
- [ ] Contact 페이지 폼 디자인 개선
- [ ] Footer 재디자인

### 성능 최적화
- [ ] 이미지 lazy loading 최적화
- [ ] 애니메이션 성능 프로파일링
- [ ] Lighthouse 점수 개선

### 기능 추가
- [ ] 검색 기능
- [ ] 포트폴리오 정렬 옵션
- [ ] 다국어 지원 (i18n)
- [ ] RSS 피드

---

## 참고 자료

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Pretendard GitHub](https://github.com/orioncactus/pretendard)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [OKLCH Color Space](https://oklch.com/)

---

## 브랜치 정보

**현재 브랜치**: `claude/design-portfolio-grid-layout-01BcHsSf77hEuqvDh9Y1qg9V`

**메인 브랜치로 머지 시 체크리스트**:
- [ ] 모든 페이지에서 폰트 제대로 적용되는지 확인
- [ ] 라이트모드/다크모드 테마 전환 테스트
- [ ] 모바일 반응형 테스트
- [ ] 애니메이션 성능 체크
- [ ] 빌드 에러 없는지 확인
- [ ] 링크 및 네비게이션 작동 확인
