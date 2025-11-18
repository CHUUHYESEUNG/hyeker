# Google Analytics 4 (GA4) 설정 가이드

## 📊 왜 Google Analytics가 필요한가요?

Google Analytics를 설치하면 다음과 같은 데이터를 추적할 수 있습니다:
- 방문자 수, 페이지뷰, 세션 시간
- 사용자 행동 패턴 (어떤 페이지를 많이 보는지)
- 트래픽 소스 (어디서 방문했는지: 구글, 네이버, 소셜미디어 등)
- 실시간 방문자 현황
- 전환율 추적 (블로그 구독, 연락 폼 제출 등)

---

## 🚀 설정 단계

### 1단계: Google Analytics 계정 생성

1. https://analytics.google.com 접속
2. Google 계정으로 로그인
3. **측정 시작** 클릭
4. **계정 이름** 입력 (예: "HYEKER STUDIO")
5. 데이터 공유 설정 선택 (기본값 유지 권장)
6. **다음** 클릭

### 2단계: 속성(Property) 생성

1. **속성 이름** 입력 (예: "hyeker.com")
2. **보고 시간대**: `대한민국 표준시`
3. **통화**: `대한민국 원 (₩)`
4. **다음** 클릭

### 3단계: 비즈니스 정보 입력

1. 업종 카테고리: `컴퓨터 및 기술` 또는 `온라인 커뮤니티`
2. 비즈니스 규모: `소규모` (직원 1~10명)
3. 사용 목적: 원하는 옵션 선택
4. **만들기** 클릭

### 4단계: 데이터 스트림 설정

1. 플랫폼 선택: **웹** 클릭
2. **웹사이트 URL**: `https://hyeker.com`
3. **스트림 이름**: `HYEKER 웹사이트`
4. **향상된 측정** 활성화 (기본값)
5. **스트림 만들기** 클릭

### 5단계: 측정 ID 복사

데이터 스트림이 생성되면 다음과 같은 화면이 나타납니다:

```
측정 ID
G-XXXXXXXXXX
```

이 **G-XXXXXXXXXX** 형식의 ID를 복사하세요!

---

## 💻 Next.js 프로젝트에 Google Analytics 설치

### 방법 1: next/script 사용 (권장)

#### 1. app/layout.tsx 수정

`app/layout.tsx` 파일을 열고 다음 코드를 추가하세요:

```tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
```

**중요**: `G-XXXXXXXXXX` 부분을 실제 측정 ID로 교체하세요!

---

### 방법 2: 환경 변수 사용 (더 안전, 추천!)

#### 1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 만들고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 2. app/layout.tsx 수정

```tsx
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {/* Google Analytics - Production only */}
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

        {children}
      </body>
    </html>
  )
}
```

#### 3. Vercel에 환경 변수 추가

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 이름: `NEXT_PUBLIC_GA_ID`
4. 값: `G-XXXXXXXXXX`
5. **Save** 클릭
6. 프로젝트 재배포

---

## 🧪 설치 확인

### 1. 빌드 & 배포

```bash
npm run build
git add .
git commit -m "feat: add Google Analytics 4"
git push
```

### 2. 실시간 데이터 확인

1. Google Analytics 대시보드 접속
2. 왼쪽 메뉴에서 **보고서** → **실시간** 클릭
3. 웹사이트(https://hyeker.com)를 방문하면 실시간으로 표시됨!

### 3. 브라우저 개발자 도구로 확인

1. 웹사이트 방문
2. F12 눌러서 개발자 도구 열기
3. **Network** 탭 클릭
4. `collect` 또는 `gtag` 검색
5. 요청이 보이면 정상 작동 중!

---

## 🎯 추천 설정

### 1. IP 필터링 (내 방문 제외)

내 방문은 분석에서 제외하려면:

1. Google Analytics → **관리** → **데이터 스트림** 선택
2. **태그 지정 고급 설정** → **내부 트래픽 정의**
3. **만들기** 클릭
4. IP 주소 입력 (내 IP 확인: https://whatismyipaddress.com)
5. **만들기** 클릭

### 2. 이벤트 추적 설정

버튼 클릭, 폼 제출 등을 추적하려면 커스텀 이벤트 추가:

```tsx
// 이메일 클릭 추적 예시
<Button
  onClick={() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_click', {
        event_category: 'contact',
        event_label: 'header_email_button'
      });
    }
  }}
>
  이메일 보내기
</Button>
```

---

## 📈 주요 지표 확인 위치

### 1. 실시간 방문자
**보고서** → **실시간**

### 2. 전체 방문자 수
**보고서** → **수명 주기** → **참여도** → **개요**

### 3. 인기 페이지
**보고서** → **참여도** → **페이지 및 화면**

### 4. 트래픽 소스
**보고서** → **수명 주기** → **획득** → **트래픽 획득**

### 5. 사용자 위치
**보고서** → **사용자 속성** → **사용자 속성 개요**

---

## ⚠️ 주의사항

1. **GDPR 준수**: 유럽 사용자가 있다면 쿠키 동의 배너 필요
2. **개인정보 처리방침 업데이트**: Google Analytics 사용 명시 필요
3. **개발 환경 제외**: `NODE_ENV === 'production'` 조건으로 운영 환경에만 적용
4. **데이터 수집까지 24~48시간** 소요될 수 있음

---

## 🔗 참고 자료

- [Google Analytics 공식 문서](https://support.google.com/analytics/answer/9304153)
- [Next.js Google Analytics 가이드](https://nextjs.org/docs/messages/next-script-for-ga)
- [GA4 vs Universal Analytics 차이점](https://support.google.com/analytics/answer/11583528)

---

## ✅ 체크리스트

- [ ] Google Analytics 계정 생성
- [ ] 측정 ID (G-XXXXXXXXXX) 발급
- [ ] `.env.local`에 환경 변수 추가
- [ ] `app/layout.tsx`에 Script 태그 추가
- [ ] Vercel 환경 변수 설정
- [ ] 배포 후 실시간 데이터 확인
- [ ] (선택) IP 필터링 설정
- [ ] (선택) 이벤트 추적 설정
- [ ] (선택) 개인정보 처리방침 업데이트

설정 완료 후 데이터가 쌓이기 시작하면 매일 방문자 통계를 확인할 수 있습니다! 🎉
