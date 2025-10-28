```markdown
# hyeker.com 포트폴리오 사이트 기획서

## 1. 프로젝트 개요

### 목적
- 개발자 장혜승(hyeker)의 포트폴리오 및 기술 블로그
- 재취업 및 프리랜서 활동을 위한 온라인 프레젠스 구축
- 개인 브랜드(혜커 : hyeker) 강화
- 인터랙티브한 홈페이지로 첫 눈을 사로잡는 화려한 인터랙티브 요소 필요 (랜딩 맨 위 첫 화면에 public/hero1.png 활용)

### 주요 목표
- 프로젝트 및 경력 효과적으로 전시
- 기술 블로그를 통한 전문성 어필
- SEO 최적화로 온라인 노출 극대화
- 반응형 디자인으로 모든 디바이스 지원
- ssr 활용 최적으로 해서 성능 최적화

---

## 2. 기술 스택

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (UI 컴포넌트)

### 추가 라이브러리
- **next-mdx-remote** 또는 **contentlayer** (블로그 MDX 처리)
- **framer-motion** (애니메이션)
- **react-icons** (아이콘)
- **next-themes** (다크모드)
- **react-syntax-highlighter** (코드 하이라이팅)

### 배포
- **Vercel** (자동 배포)
- **도메인:** hyeker.com

---

## 3. 사이트 구조

```
hyeker.com
├── / (홈)
├── /about (소개)
├── /projects (프로젝트)
├── /blog (블로그)
├── /blog/[slug] (블로그 글 상세)
├── /resume (이력서)
└── /contact (연락)
```

---

## 4. 페이지별 상세 기획

### 4.1 홈페이지 (/)

**섹션 구성:**

1. **Hero Section**
   - 이름: 장혜승 (Hyeseung Hailey Jang)
   - 타이틀: "Full-stack Developer & AI Researcher"
   - 서브타이틀: "디자이너 출신 풀스택 개발자"
   - CTA 버튼: "프로젝트 보기" / "연락하기"
   - 타이핑 애니메이션 효과

2. **About Section**
   - 프로필 사진 (원형)
   - 짧은 자기소개 (3-4줄)
   - 주요 키워드: 풀스택, AI 석사, React/Next.js, FastAPI, 보안

3. **Skills Section**
   - 카테고리별 스킬 태그
   - Frontend: React.js, Next.js, React Native, TypeScript, Tailwind CSS
   - Backend: Python, FastAPI, Java, Spring Boot
   - AI/ML: LSTM, SAINT, LangChain, TensorFlow
   - Database: PostgreSQL, MySQL, Supabase, DynamoDB
   - DevOps: Docker, AWS, Vercel, Git
   - Security: OWASP, Web Security, API Security

4. **Featured Projects Section**
   - 주요 프로젝트 3개 카드 형식
   - 각 카드: 썸네일, 제목, 짧은 설명, 기술 스택 태그, "자세히 보기" 링크
   - 프로젝트:
     1. 매듭 (5070 시니어 플랫폼)
     2. 캐치픽 (React Native 앱)
     3. 비즈인사이트 보험 서비스

5. **Latest Blog Posts Section**
   - 최신 블로그 글 3개
   - 각 글: 제목, 날짜, 태그, 요약, "더 읽기" 링크

6. **Contact Section**
   - 이메일: heyhyeker@gmail.com
   - GitHub, LinkedIn, 브런치, 티스토리 링크
   - 인스타그램: @heyhyeker

**UI 요구사항:**
- 스크롤 애니메이션 (섹션별 fade-in + public/hero1.png 활용한 애니메이션 필요, 애플처럼 스크롤 내릴때 인터랙션 되는거 너무 좋음!!!)
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 다크모드 지원
- 인터랙티브하고 화려한 디자인

---

### 4.2 소개 페이지 (/about)

**내용:**
1. **상단 섹션**
   - 큰 프로필 사진
   - 전체 이름 및 영문명
   - 현재 상태: "1인 개발자, 혜커"

2. **자기소개**
   - 이력서의 "ABOUT ME" 내용 활용
   - 주요 포인트:
     - 콘텐츠 디자이너 → 개발자 전환
     - AI 석사 (인하대학교)
     - 풀스택 개발 4년
     - 사용자 중심 개발 철학
     - 협업 및 커뮤니케이션 능력

3. **Career Journey**
   - 타임라인 형식
   - 2025: 개인 프로젝트 (매듭, 캐치픽)
   - 2023-2024: 비즈인사이트 (보험 서비스)
   - 2022-2023: 인하대 석사
   - 2022: 메가존 (LFmall)
   - 2020-2022: (주)SHI (공장 자동화)
   - 2019: 자영업
   - 2018-2019: (주)엠버스 (콘텐츠 디자이너)
   - 2016-2017: 11번가 (콘텐츠 에디터)

4. **Values & Approach**
   - 사용자 중심 개발
   - TDD와 클린 코드
   - 보안 고려
   - 지속적 학습

**UI 요구사항:**
- 읽기 편한 타이포그래피
- 타임라인 인터랙티브 효과
- 프로필 사진 hover 효과

---

### 4.3 프로젝트 페이지 (/projects)

**레이아웃:**
- 그리드 레이아웃 (2열, 모바일은 1열)
- 필터링 기능: All / Web / App / B2B / B2C

**프로젝트 리스트:**

1. **매듭 (Maedup)**
   - 설명: 5070 시니어 프리미엄 라이프스타일 플랫폼
   - 기술: Next.js 15, Supabase, Vercel
   - 링크: https://maedup.co.kr
   - 태그: Web, B2C, Senior Tech
   - 스크린샷 4-5장

2. **캐치픽 (Catchpick)**
   - 설명: 중장년 액티비티 예약 네이티브 앱
   - 기술: Expo, React Native, Supabase
   - 태그: App, B2C, Senior Tech
   - 스크린샷 4-5장

3. **외교부 실의료비 청구 서비스**
   - 설명: B2B 해외 의료비 청구 웹앱
   - 기술: Next.js 14, React.js, TypeScript, AWS
   - 기간: 2023.09 - 2024.09
   - 주요 기능: AWS Cognito 로그인, React-table, 유효성 검증
   - 태그: Web, B2B, Insurance
   - 스크린샷 3-4장

4. **여행자 보험 가입 서비스**
   - 설명: B2B 여행자 보험 가입 웹앱
   - 기술: Next.js 14, React.js, TypeScript
   - 주요 기능: 무한 스크롤, 엑셀 파싱
   - 태그: Web, B2B, Insurance

5. **효성첨단소재 생산이력추적시스템**
   - 설명: 공장 자동화 MES 시스템
   - 기술: Spring Boot, React.js, Android, MSSQL
   - 기간: 2022.04 - 2022.09
   - 주요 기능: PDA 앱, 생산이력 추적
   - 태그: B2B, Manufacturing, Android

6. **LoadRunner ACS 솔루션**
   - 설명: 물류로봇(AGV) 컨트롤 시스템
   - 기술: Spring Boot, Thymeleaf, JavaScript
   - 주요 기능: AGV 모니터링, Socket 통신
   - 태그: B2B, Robotics

**각 프로젝트 카드:**
- 썸네일 이미지
- 프로젝트명
- 짧은 설명 (1-2줄)
- 기술 스택 태그
- "자세히 보기" 버튼

**프로젝트 상세 페이지 (/projects/[slug]):**
- 큰 스크린샷 슬라이더
- 프로젝트 개요
- 사용 기술
- 주요 기능
- 담당 업무
- 기간
- 링크 (있는 경우)
- 회고 (배운 점, 어려웠던 점)

---

### 4.4 블로그 페이지 (/blog)

**레이아웃:**
- 리스트 형식 (카드 스타일)
- 사이드바: 카테고리, 태그, 최신 글

**기능:**
- 검색 기능
- 카테고리 필터
- 태그 필터
- 정렬 (최신순, 인기순)

**카테고리:**
- 개발 (Development)
- 보안 (Security)
- AI/ML
- 커리어 (Career)
- 일상 (Daily)

**각 블로그 카드:**
- 썸네일 이미지 (선택)
- 제목
- 날짜
- 카테고리 배지
- 태그들
- 요약 (2-3줄)
- 읽는 시간 (예: 5분 읽기)

**블로그 글 상세 (/blog/[slug]):**
- 제목
- 작성일
- 카테고리, 태그
- 목차 (Table of Contents)
- 본문 (MDX)
- 코드 하이라이팅
- 이전/다음 글 네비게이션
- 공유 버튼 (트위터, 링크드인, 복사)

**MDX 지원 기능:**
- 코드 블록 (syntax highlighting)
- 이미지
- 인용구
- 리스트
- 테이블
- Callout 컴포넌트 (정보, 경고, 팁 등)

---

### 4.5 이력서 페이지 (/resume)

**레이아웃:**
- 2단 레이아웃 (왼쪽: 기본정보, 오른쪽: 상세)

**내용:**

**왼쪽 사이드바:**
- 프로필 사진
- 이름
- 직무: Full-stack Developer
- 연락처
- 이메일
- GitHub, LinkedIn 링크
- Skills 요약 (아이콘 + 이름)
- PDF 다운로드 버튼

**오른쪽 메인:**

1. **Summary**
   - 3-4줄 요약

2. **Work Experience**
   - 회사별 카드
   - 회사명, 직책, 기간
   - 주요 업무
   - 사용 기술

3. **Education**
   - 인하대학교 석사 (AI 융합)
   - 학점은행제 학사 (컴퓨터공학)
   - 인하공전 전문학사 (컴퓨터시스템)

4. **Certificates**
   - Tensorflow Developer Certificate
   - 정보처리기사
   - 정보처리산업기사

5. **Projects**
   - 주요 프로젝트 링크

**기능:**
- PDF 다운로드 (React-to-PDF 라이브러리)
- 인쇄 최적화 CSS

---

### 4.6 연락 페이지 (/contact)

**레이아웃:**
- 중앙 정렬, 카드 형식

**내용:**

1. **Contact Information**
   - 이메일: heyhyeker@gmail.com
   - GitHub: https://github.com/CHUUHYESEUNG
   - 브런치: brunch.co.kr/@hyeker
   - 티스토리: dalsoon-jang.tistory.com
   - 인스타그램: @heyhyeker

2. **Contact Form (선택사항)**
   - 이름
   - 이메일
   - 제목
   - 메시지
   - 제출 버튼
   - (Formspree나 EmailJS 활용)

3. **CTA**
   - "프로젝트 의뢰나 협업 제안은 언제나 환영합니다."


---

## 5. 공통 컴포넌트

### 5.1 Header (네비게이션)
- 로고: "hyeker" (왼쪽)
- 메뉴 (오른쪽):
  - Home
  - About
  - Projects
  - Blog
  - Resume
  - Contact
- 다크모드 토글 버튼
- 모바일: 햄버거 메뉴

### 5.2 Footer
- 왼쪽: © 2025 hyeker. All rights reserved.
- 중앙: 소셜 링크 아이콘들
- 오른쪽: "Built with Next.js & ❤️"

### 5.3 다크모드
- 라이트 모드 / 다크 모드 토글
- 시스템 설정 따르기 옵션
- localStorage에 설정 저장

---

## 6. 디자인 시스템

```markdown
# hyeker.com 포트폴리오 사이트 기획서 (보라색 버전)

## 6. 디자인 시스템 (업데이트)

### 6.1 컬러 팔레트

**라이트 모드:**
- Primary: `#8b5cf6` (보라색 - violet-500)
- Primary Hover: `#7c3aed` (violet-600)
- Primary Light: `#a78bfa` (violet-400)
- Secondary: `#ec4899` (핑크 - pink-500)
- Background: `#ffffff`
- Surface: `#faf5ff` (violet-50)
- Surface Secondary: `#f5f3ff` (violet-100)
- Text Primary: `#1e1b4b` (violet-950)
- Text Secondary: `#6b7280` (gray-500)
- Border: `#e9d5ff` (violet-200)
- Accent: `#d946ef` (fuchsia-500)
- Success: `#10b981` (green-500)
- Warning: `#f59e0b` (amber-500)
- Error: `#ef4444` (red-500)

**다크 모드:**
- Primary: `#a78bfa` (violet-400)
- Primary Hover: `#8b5cf6` (violet-500)
- Primary Light: `#c4b5fd` (violet-300)
- Secondary: `#f472b6` (pink-400)
- Background: `#0f0a1f` (커스텀 딥 퍼플)
- Surface: `#1e1b4b` (violet-950)
- Surface Secondary: `#312e81` (violet-900)
- Text Primary: `#f5f3ff` (violet-100)
- Text Secondary: `#c4b5fd` (violet-300)
- Border: `#4c1d95` (violet-800)
- Accent: `#e879f9` (fuchsia-400)
- Success: `#34d399` (green-400)
- Warning: `#fbbf24` (amber-400)
- Error: `#f87171` (red-400)

### 6.2 그라데이션 (특별 섹션용)

**Hero Gradient:**
```css
background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
```

**Card Hover Gradient:**
```css
background: linear-gradient(135deg, #a78bfa 0%, #f472b6 100%);
```

**Accent Gradient:**
```css
background: linear-gradient(135deg, #7c3aed 0%, #d946ef 100%);
```

### 6.3 타이포그래피
- Heading Font: **Pretendard** (한글 최적화) or **Inter** (영문)
- Body Font: **Pretendard** or **Inter**
- Code Font: **JetBrains Mono** or **Fira Code**

**크기:**
- h1: 3rem (48px) - font-bold
- h2: 2.25rem (36px) - font-bold
- h3: 1.875rem (30px) - font-semibold
- h4: 1.5rem (24px) - font-semibold
- body: 1rem (16px) - font-normal
- small: 0.875rem (14px) - font-normal

### 6.4 간격
- Section 간격: 5rem (80px)
- Card 간격: 2rem (32px)
- 요소 간격: 1rem (16px)
- 작은 요소 간격: 0.5rem (8px)

### 6.5 Border Radius
- Small: 0.5rem (8px)
- Medium: 0.75rem (12px)
- Large: 1rem (16px)
- XL: 1.5rem (24px)

### 6.6 그림자 (Shadow)

**라이트 모드:**
- Small: `0 2px 8px rgba(139, 92, 246, 0.1)`
- Medium: `0 4px 16px rgba(139, 92, 246, 0.15)`
- Large: `0 8px 24px rgba(139, 92, 246, 0.2)`
- Glow: `0 0 20px rgba(139, 92, 246, 0.3)`

**다크 모드:**
- Small: `0 2px 8px rgba(167, 139, 250, 0.1)`
- Medium: `0 4px 16px rgba(167, 139, 250, 0.15)`
- Large: `0 8px 24px rgba(167, 139, 250, 0.2)`
- Glow: `0 0 30px rgba(167, 139, 250, 0.4)`

### 6.7 애니메이션

**Transition:**
- Fast: 150ms ease
- Normal: 300ms ease
- Slow: 500ms ease

**효과:**
- 페이지 전환: fade-in (opacity 0 → 1)
- 스크롤 애니메이션: fade-up (opacity 0 → 1, translateY 20px → 0)
- 버튼 hover: 
  - scale: 1 → 1.05
  - shadow: small → medium
  - 보라색 glow 효과
- 카드 hover: 
  - translateY: 0 → -8px
  - shadow: medium → large
  - border: violet-200 → primary
- 링크 hover: underline + primary color
- 로딩: pulse animation (보라색 펄스)

### 6.8 아이콘 스타일
- 라이브러리: **react-icons** (Lucide 또는 Heroicons)
- 크기: 20px (sm), 24px (md), 32px (lg)
- 색상: Primary 또는 Text Secondary
- Hover 시: Primary로 변경 + scale 애니메이션

---

## Tailwind Config 설정

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8b5cf6", // violet-500
          foreground: "#ffffff",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        secondary: {
          DEFAULT: "#ec4899", // pink-500
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#d946ef", // fuchsia-500
          foreground: "#ffffff",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "gradient-card": "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
        "gradient-accent": "linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(139, 92, 246, 0.3)",
        "glow-md": "0 0 20px rgba(139, 92, 246, 0.4)",
        "glow-lg": "0 0 30px rgba(139, 92, 246, 0.5)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Pretendard", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.5s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
```

---

## CSS Variables 설정

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode */
    --background: 0 0% 100%;
    --foreground: 243 75% 20%;
    
    --primary: 258 90% 66%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 330 81% 60%;
    --secondary-foreground: 0 0% 100%;
    
    --accent: 292 76% 58%;
    --accent-foreground: 0 0% 100%;
    
    --muted: 258 100% 97%;
    --muted-foreground: 258 30% 45%;
    
    --border: 258 90% 85%;
    --input: 258 90% 85%;
    --ring: 258 90% 66%;
  }

  .dark {
    /* Dark Mode */
    --background: 258 80% 6%;
    --foreground: 258 100% 97%;
    
    --primary: 258 90% 75%;
    --primary-foreground: 243 75% 20%;
    
    --secondary: 330 81% 70%;
    --secondary-foreground: 243 75% 20%;
    
    --accent: 292 76% 68%;
    --accent-foreground: 243 75% 20%;
    
    --muted: 243 75% 20%;
    --muted-foreground: 258 90% 80%;
    
    --border: 258 70% 25%;
    --input: 258 70% 25%;
    --ring: 258 90% 75%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 컴포넌트 스타일 가이드

### 버튼 스타일

```tsx
// Primary Button
<Button className="bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-glow-md transition-all duration-300">
  Click Me
</Button>

// Outline Button
<Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white hover:shadow-glow-sm">
  Outline
</Button>

// Ghost Button
<Button variant="ghost" className="hover:bg-primary/10 hover:text-primary">
  Ghost
</Button>
```

### 카드 스타일

```tsx
<Card className="border-violet-200 dark:border-violet-800 hover:border-primary hover:shadow-glow-md hover:-translate-y-2 transition-all duration-300">
  {/* Content */}
</Card>
```

### 링크 스타일

```tsx
<Link className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors">
  Link Text
</Link>
```

### 배지/태그 스타일

```tsx
<Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white transition-colors">
  Next.js
</Badge>
```

---

## Hero Section 특별 디자인

```tsx
// Hero Section with Gradient Background
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Gradient Background */}
  <div className="absolute inset-0 bg-gradient-primary opacity-10 dark:opacity-20" />
  
  {/* Animated Gradient Orbs */}
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse-slow delay-1000" />
  
  {/* Content */}
  <div className="relative z-10 text-center">
    <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
      hyeker
    </h1>
    <p className="text-2xl text-muted-foreground mt-4">
      Full-stack Developer & AI Researcher
    </p>
  </div>
</section>
```

---

## 페이지별 색상 포인트

### 홈페이지
- Hero: 그라데이션 배경 + 보라색 글로우
- Skills: 보라색 배지들
- Projects: 카드 hover 시 보라색 테두리 + 글로우

### About
- 타임라인: 보라색 라인 + 노드
- 프로필 이미지: 보라색 링 + 글로우

### Projects
- 카드: 보라색 hover 효과
- 필터 버튼: 보라색 active 상태
- 기술 스택 배지: 보라색 계열

### Blog
- 카테고리 배지: 보라색 계열
- 읽는 중 프로그레스 바: 보라색 그라데이션
- 코드 블록: 보라색 하이라이트

### Resume
- Section 제목: 보라색 accent
- 스킬 아이콘: 보라색
- PDF 다운로드 버튼: 보라색 그라데이션

### Contact
- 폼 포커스: 보라색 링
- 제출 버튼: 보라색 그라데이션 + 글로우
- 소셜 아이콘: hover 시 보라색

---

## 특별 효과

### Scroll Progress Bar (상단)
```tsx
<div className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary z-50" style={{ width: `${scrollProgress}%` }} />
```

### Section Divider
```tsx
<div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
```

### Floating Action Button (맨 위로)
```tsx
<Button className="fixed bottom-8 right-8 rounded-full w-12 h-12 bg-primary shadow-glow-lg hover:shadow-glow-xl animate-bounce">
  ↑
</Button>
```

---

## 마우스 커서 효과 (선택사항)

```tsx
// Custom Cursor with Purple Glow
<div className="fixed pointer-events-none z-50">
  <div className="w-8 h-8 border-2 border-primary rounded-full" />
  <div className="absolute inset-0 w-8 h-8 bg-primary/30 rounded-full blur-md" />
</div>
```

---

## 7. SEO 최적화

### 7.1 메타 데이터
```typescript
// app/layout.tsx
export const metadata = {
  title: 'hyeker - Full-stack Developer & AI Researcher',
  description: '보안을 고려한 풀스택 개발자 장혜승의 포트폴리오',
  keywords: ['풀스택 개발자', 'Next.js', 'React', 'AI', '보안', 'FastAPI'],
  authors: [{ name: 'Hyeseung Jang' }],
  openGraph: {
    title: 'hyeker - Full-stack Developer',
    description: '보안을 고려한 풀스택 개발자',
    url: 'https://hyeker.com',
    siteName: 'hyeker',
    images: ['/og-image.jpg'],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hyeker - Full-stack Developer',
    description: '보안을 고려한 풀스택 개발자',
    images: ['/og-image.jpg'],
  },
}
```

### 7.2 사이트맵
- `/sitemap.xml` 자동 생성
- 모든 페이지 및 블로그 글 포함

### 7.3 RSS 피드
- `/rss.xml` 생성
- 블로그 글 자동 추가

### 7.4 robots.txt
```
User-agent: *
Allow: /

Sitemap: https://hyeker.com/sitemap.xml
```

---

## 8. 성능 최적화

### 8.1 이미지 최적화
- Next.js Image 컴포넌트 사용
- WebP 포맷
- Lazy loading
- 적절한 크기 사전 설정

### 8.2 코드 스플리팅
- Dynamic import 활용
- Route-based code splitting

### 8.3 폰트 최적화
- next/font 사용
- 폰트 서브셋팅

### 8.4 캐싱
- Static Generation 최대 활용
- ISR (Incremental Static Regeneration) for 블로그

---

## 9. 블로그 콘텐츠 관리

### 9.1 MDX 파일 구조
```
/content
  /blog
    /getting-started-with-owasp.mdx
    /fastapi-security-best-practices.mdx
    ...
```

### 9.2 프론트매터 형식
```yaml
---
title: "OWASP Top 10 실전 가이드"
date: "2025-11-01"
description: "웹 보안의 기초, OWASP Top 10을 실전에서 어떻게 적용할까?"
category: "보안"
tags: ["OWASP", "웹보안", "Security"]
image: "/blog/owasp-cover.jpg"
---
```

### 9.3 초기 블로그 글 (예시 제목)
1. "콘텐츠 디자이너에서 개발자로 전환한 이야기"
2. "AI 석사 과정에서 배운 것들"
3. "Next.js 15 App Router 완벽 가이드"
4. "FastAPI로 보안 고려한 API 만들기"
5. "임신 준비 중인 개발자의 커리어 고민"
+ 댓글 기능, 메일 구독 기능도 있으면 좋을듯

---

## 10. 배포 및 도메인 설정

### 10.1 Vercel 배포
- GitHub 레포지토리 연결
- main 브랜치 push 시 자동 배포
- Preview deployment for PR

### 10.2 도메인 연결
- hyeker.com 구입
- Vercel에서 커스텀 도메인 설정
- HTTPS 자동 설정

### 10.3 환경 변수
```
# .env.local
NEXT_PUBLIC_SITE_URL=https://hyeker.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (Google Analytics)
```

---

## 11. Analytics

### 11.1 Google Analytics
- GA4 설정
- 페이지뷰 추적
- 이벤트 추적 (버튼 클릭, 프로젝트 상세 보기 등)

### 11.2 추적할 주요 지표
- 페이지별 방문자 수
- 블로그 글 인기도
- 프로젝트 페이지 체류 시간
- Contact 페이지 전환율

---

## 12. 접근성 (Accessibility)

### 12.1 기본 요구사항
- Semantic HTML 사용
- Alt text for 모든 이미지
- ARIA labels 적절히 사용
- 키보드 네비게이션 지원
- 색상 대비 WCAG AA 기준 충족

### 12.2 스크린 리더 지원
- Proper heading hierarchy
- Skip to main content 링크
- Focus indicators

---

## 13. 우선순위 및 일정

### Phase 1: MVP (1주)
- [x] 프로젝트 초기 설정
- [ ] 공통 레이아웃 (Header, Footer)
- [ ] 홈페이지
- [ ] 프로젝트 페이지 (정적 데이터)
- [ ] 기본 스타일링
- [ ] Vercel 배포

### Phase 2: 콘텐츠 (1주)
- [ ] About 페이지
- [ ] Resume 페이지
- [ ] Contact 페이지
- [ ] 프로젝트 상세 페이지
- [ ] 실제 콘텐츠 추가

### Phase 3: 블로그 (3-5일)
- [ ] MDX 설정
- [ ] 블로그 리스트 페이지
- [ ] 블로그 상세 페이지
- [ ] 검색 기능
- [ ] 카테고리/태그 필터

### Phase 4: 고도화 (3-5일)
- [ ] 다크모드
- [ ] 애니메이션 추가
- [ ] SEO 최적화
- [ ] Analytics 연동
- [ ] 성능 최적화
- [ ] 반응형 테스트
- [ ] 접근성 검증

---

## 14. shadcn/ui 컴포넌트 활용

### 14.1 사용할 컴포넌트
- Button
- Card
- Badge
- Avatar
- Separator
- Tabs
- Dialog
- Sheet (모바일 메뉴)
- Input (Contact form)
- Textarea (Contact form)
- Select (블로그 필터)
- Skeleton (로딩 상태)

### 14.2 커스텀 컴포넌트
- ProjectCard
- BlogCard
- SkillTag
- Timeline
- Section
- Container
- CodeBlock

---

## 15. 파일 구조

```
hyeker-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── resume/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── ProjectCard.tsx
│   ├── BlogCard.tsx
│   ├── SkillTag.tsx
│   ├── Timeline.tsx
│   └── ...
├── content/
│   └── blog/
│       ├── post-1.mdx
│       └── ...
├── lib/
│   ├── mdx.ts
│   ├── utils.ts
│   └── ...
├── public/
│   ├── images/
│   ├── projects/
│   └── blog/
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
└── package.json
```

---

## 16. 초기 설정 명령어

```bash
# 프로젝트 생성
npx create-next-app@latest hyeker-portfolio --typescript --tailwind --app

# 프로젝트 이동
cd hyeker-portfolio

# shadcn/ui 초기화
npx shadcn@latest init

# 필요한 shadcn 컴포넌트 설치
npx shadcn@latest add button card badge avatar separator tabs dialog sheet input textarea select skeleton

# 추가 패키지 설치
npm install next-themes framer-motion react-icons
npm install next-mdx-remote gray-matter reading-time
npm install react-syntax-highlighter @types/react-syntax-highlighter

# 개발 서버 실행
npm run dev
```

---

## 17. 디자인 참고

### 17.1 영감을 받을 사이트
- leerob.io (Lee Robinson - Vercel)
- brittanychiang.com (미니멀)
- jahir.dev (다크모드)
- cassidoo.co (친근함)

### 17.2 디자인 방향
- **미니멀하지만 따뜻함**
- **전문적이지만 접근하기 쉬움**
- **개발자스럽지만 디자이너 감각**

---

## 18. 성공 지표

### 18.1 기술적 지표
- Lighthouse Score: 95+ (모든 카테고리)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Core Web Vitals: 모두 Good

### 18.2 비즈니스 지표
- 월 방문자 수: 500+
- 블로그 글 조회수: 글당 100+
- Contact 문의: 월 5+
- 프로젝트 페이지 체류 시간: 2분+

---

## 19. 유지보수 계획

### 19.1 정기 업데이트
- 블로그 글: 주 1회
- 프로젝트 추가: 완료 시마다
- 기술 스택 업데이트: 분기별

### 19.2 모니터링
- Google Analytics 주간 체크
- Vercel Analytics 성능 모니터링
- 깨진 링크 월 1회 체크

---

## 20. 추가 고려사항

### 20.1 다국어 지원 (Phase 5, 선택)
- 한국어 / 영어
- next-intl 라이브러리

### 20.2 댓글 기능 (선택)
- Giscus (GitHub Discussions 활용)
- 블로그 글에만 적용

### 20.3 뉴스레터 (선택)
- Mailchimp나 Substack 연동
- 블로그 구독자 모으기

---

## 완료!

이 기획서를 Claude Code에게 주고 개발을 시작하세요. 
필요한 부분은 단계별로 요청하면 됩니다.

**First Step:**
"이 기획서의 Phase 1 (MVP)부터 시작해줘. 
먼저 프로젝트 초기 설정과 공통 레이아웃(Header, Footer)을 만들어줘."
```

---

이거 Claude Code한테 주면 바로 시작할 수 있어요!

**🤔 추가 질문:**

**A. 콘텐츠 관련**
- 프로젝트 스크린샷이나 이미지 준비되어 있어요?
- 블로그 글 몇 개 정도 미리 써놓으셨어요?
→ 콘텐츠 준비 가이드 드릴게요

**B. 디자인 디테일**
- 특별히 원하는 색상이나 분위기 있어요?
- 참고하고 싶은 포트폴리오 사이트 있으면 알려주세요
→ 디자인 시스템 더 구체화해드릴게요

**C. 우선순위**
- 어떤 페이지를 제일 먼저 완성하고 싶어요?
- 빠르게 만들어서 배포하는 게 중요해요, 아니면 완벽하게?
→ 개발 순서 조정해드릴게요

**어떤 거 궁금하세요?**