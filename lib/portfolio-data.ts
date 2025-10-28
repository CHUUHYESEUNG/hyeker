import type { LucideIcon } from "lucide-react"
import { Globe, Smartphone } from "lucide-react"

export type PortfolioPlatformIcon = "globe" | "smartphone"

export const portfolioPlatformIconMap: Record<PortfolioPlatformIcon, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone
}

export type PortfolioPlatform = {
  type: "web" | "ios" | "android"
  icon: PortfolioPlatformIcon
  label: string
  url: string
  available: boolean
}

export type PortfolioItem = {
  routeId: string
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  platforms: PortfolioPlatform[]
  image: string
  status: string
  date: string
  features: string[]
}

export const portfolioItems: PortfolioItem[] = [
  {
    routeId: "1",
    id: "maedup",
    title: "매듭 (Maedup)",
    description: "5070 시니어 프리미엄 라이프스타일 플랫폼",
    longDescription:
      "중장년층을 위한 프리미엄 라이프스타일 커뮤니티 플랫폼입니다. 시니어들이 새로운 인연을 만들고, 다양한 액티비티를 즐기며, 풍요로운 제2의 인생을 설계할 수 있도록 돕습니다.",
    tech: ["Next.js 15", "App Router", "Supabase", "TypeScript", "Tailwind CSS", "Vercel"],
    platforms: [
      {
        type: "web",
        icon: "globe",
        label: "웹사이트",
        url: "https://maedup.co.kr",
        available: true
      }
    ],
    image: "/sample1.jpg",
    status: "운영중",
    date: "2025.08 - 현재",
    features: ["반응형 웹 디자인", "실시간 채팅 기능", "Supabase 기반 백엔드", "SEO 최적화", "다크모드 지원"]
  },
  {
    routeId: "2",
    id: "catchpick",
    title: "캐치픽 (Catchpick)",
    description: "중장년 액티비티 예약 네이티브 앱",
    longDescription:
      "5070 시니어를 위한 액티비티 예약 플랫폼입니다. 골프, 등산, 여행 등 다양한 액티비티를 쉽게 예약하고, 같은 관심사를 가진 사람들과 함께 즐길 수 있습니다.",
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "iOS", "Android"],
    platforms: [
      {
        type: "ios",
        icon: "smartphone",
        label: "App Store",
        url: "https://apps.apple.com",
        available: false
      },
      {
        type: "android",
        icon: "smartphone",
        label: "Google Play",
        url: "https://play.google.com",
        available: false
      }
    ],
    image: "/sample1.jpg",
    status: "개발중",
    date: "2025.08 - 현재",
    features: ["크로스 플랫폼 네이티브 앱", "액티비티 예약 시스템", "실시간 알림", "카카오페이 결제 연동", "사용자 리뷰 시스템"]
  },
  {
    routeId: "3",
    id: "travel-insurance",
    title: "B2B 여행자 보험 가입 서비스",
    description: "단체 보험 가입과 청구를 위한 엔터프라이즈 웹앱",
    longDescription:
      "보험 대리점과 파트너사가 단체 여행자 보험을 가입하고 청구 현황을 관리할 수 있는 B2B 플랫폼입니다. 복잡한 가입 절차를 단계별로 단순화하고, 운영팀이 필요한 정보를 손쉽게 추적할 수 있도록 설계했습니다.",
    tech: ["Next.js 14", "React.js", "TypeScript", "Tailwind CSS", "AWS Cognito", "AWS S3", "DynamoDB"],
    platforms: [
      {
        type: "web",
        icon: "globe",
        label: "내부 운영 포털",
        url: "#",
        available: false
      }
    ],
    image: "/sample1.jpg",
    status: "운영중",
    date: "2023.09 - 2024.09",
    features: [
      "AWS Cognito 기반 인증과 세션 관리",
      "대량 가입자 업로드를 위한 엑셀 파싱 인터페이스",
      "무한 스크롤 기반 가입자 목록 탐색",
      "단계별 유효성 검사 및 에러 처리 자동화"
    ]
  },
  {
    routeId: "4",
    id: "medical-claim",
    title: "외교부 실의료비 청구 서비스",
    description: "해외 의료비 청구를 위한 B2B/B2C 하이브리드 웹앱",
    longDescription:
      "외교부 임직원이 해외에서 발생한 의료비를 청구하고 진행 상황을 모니터링할 수 있도록 제작한 웹 애플리케이션입니다. 복잡한 증빙 자료 업로드 과정을 간소화하고, 관리자 용량에 맞춘 데이터 흐름을 구성했습니다.",
    tech: ["Next.js 14", "React.js", "TypeScript", "AWS S3", "Firebase", "Google Analytics"],
    platforms: [
      {
        type: "web",
        icon: "globe",
        label: "보안 전용 서비스",
        url: "#",
        available: false
      }
    ],
    image: "/sample1.jpg",
    status: "운영중",
    date: "2023.09 - 2024.09",
    features: ["Presigned URL을 활용한 대용량 증빙 업로드", "Server/Client 컴포넌트 분리로 초기 로드 축소", "관리자 분석을 위한 GA 이벤트 매핑", "공통 UI 컴포넌트 시스템 구축"]
  },
  {
    routeId: "5",
    id: "lfmall-delivery",
    title: "LFmall 배송자동화 고도화",
    description: "배송 ETA 예측 기능을 제공하는 커머스 고도화 프로젝트",
    longDescription:
      "LFmall 상품 상세 페이지에 예상 배송일 기능을 추가해 구매 결정 경험을 개선한 프로젝트입니다. 다양한 창고와 공급망 조건을 고려하여 정확도 높은 배송 ETA를 계산하는 백엔드 연동을 담당했습니다.",
    tech: ["Spring Boot (Java)", "JSP", "React.js", "Oracle"],
    platforms: [
      {
        type: "web",
        icon: "globe",
        label: "LFmall",
        url: "https://www.lfmall.co.kr",
        available: true
      }
    ],
    image: "/sample1.jpg",
    status: "완료",
    date: "2022.11 - 2023.02",
    features: [
      "Oracle 기반 배송 확률 산정 로직 구현",
      "React.js · JSP 혼합 구조 대응",
      "상품 상세 정보와 연동된 ETA 노출",
      "물류 운영팀 요구사항을 반영한 반복 개선"
    ]
  },
  {
    routeId: "6",
    id: "hyosung-mes",
    title: "효성첨단소재 생산이력추적 시스템",
    description: "베트남 공장의 생산 공정을 추적하는 MES 시스템",
    longDescription:
      "방사부터 열처리까지 이어지는 공정 데이터를 한눈에 확인할 수 있는 MES 솔루션입니다. 현장 작업자의 PDA 앱과 웹 대시보드를 연동해 실시간으로 자재 투입과 검사 정보를 수집했습니다.",
    tech: ["Spring Boot (Java)", "React.js", "Android (Java)", "MSSQL", "Swagger UI"],
    platforms: [
      {
        type: "web",
        icon: "globe",
        label: "내부 공장 시스템",
        url: "#",
        available: false
      },
      {
        type: "android",
        icon: "smartphone",
        label: "안드로이드 PDA",
        url: "#",
        available: false
      }
    ],
    image: "/sample1.jpg",
    status: "완료",
    date: "2020.12 - 2022.09",
    features: [
      "자재 투입 · 검사 · 라벨 등록 PDA 화면 개발",
      "공정별 실시간 이력 수집 및 대시보드화",
      "Swagger 기반 API 문서화",
      "베트남 현지 환경에 맞춘 로컬라이징"
    ]
  }
]

export const getPortfolioItemByRouteId = (routeId: string) =>
  portfolioItems.find((item) => item.routeId === routeId)
