import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "디자인부터 개발까지, HYEKER의 다양한 프로젝트 포트폴리오. 웹 개발, 앱 개발, 콘텐츠 디자인, 로고 디자인 작업물을 확인하세요.",
  keywords: [
    "포트폴리오",
    "웹 개발",
    "앱 개발",
    "디자인",
    "HYEKER",
    "혜커",
    "Next.js",
    "React Native",
    "UI/UX",
    "콘텐츠 디자인"
  ],
  openGraph: {
    title: "Portfolio - HYEKER STUDIO",
    description: "디자인부터 개발까지, HYEKER의 다양한 프로젝트 포트폴리오",
    url: "https://hyeker.com/portfolio",
    type: "website",
    images: [
      {
        url: "https://hyeker.com/me.png",
        width: 1200,
        height: 630,
        alt: "HYEKER Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - HYEKER STUDIO",
    description: "디자인부터 개발까지, HYEKER의 다양한 프로젝트 포트폴리오",
    images: ["https://hyeker.com/me.png"]
  },
  alternates: {
    canonical: "https://hyeker.com/portfolio"
  }
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "포트폴리오", href: "/portfolio" }]} />
      {children}
    </>
  )
}
