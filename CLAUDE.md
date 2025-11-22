# Claude 작업 기록

## 세션 정보

### 현재 세션 (2025-11-20 ~ 2025-11-22)
- 브랜치: `claude/add-admin-panel-01AszuTUSTZHmqbrxZm1kXJp`
- 주요 목표: Admin 패널 구축, Firebase Firestore 연동, Cloudinary 이미지 업로드

### 이전 세션 (2025-11-18 ~ 2025-11-19)
- 브랜치: `claude/design-portfolio-grid-layout-01BcHsSf77hEuqvDh9Y1qg9V`
- 주요 목표: 포트폴리오 사이트 디자인 개선, 블로그 확장, SEO 최적화

---

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

---

## 파일 구조

```
/home/user/hyeker/
├── app/
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
│   │   └── PretendardVariable.woff2
│   ├── 3dmodel/
│   ├── lottie/
│   └── me.png
│
├── CLAUDE.md                         # 작업 기록
├── FIREBASE_SETUP.md                 # Firebase 설정 가이드
└── GOOGLE_ANALYTICS_SETUP.md         # GA4 설정 가이드
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

**옵션 A: Firebase Authentication**
```typescript
// lib/firebase/auth.ts (이미 구현됨, 미사용)
import { signInWithEmailAndPassword } from 'firebase/auth'
```

**옵션 B: NextAuth.js**
- GitHub, Google OAuth 지원
- 세션 관리 자동화
- 더 안전한 토큰 관리

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

---

**마지막 업데이트**: 2025-11-22
**다음 세션 추천 작업**: 포트폴리오 Admin 페이지 → 인증 시스템 개선 → 이미지 최적화
