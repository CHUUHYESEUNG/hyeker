import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Contact",
  description: "HYEKER와 함께 일하고 싶으신가요? 프로젝트 의뢰, 협업 제안은 언제나 환영합니다. 이메일 또는 소셜 미디어로 연락주세요.",
  keywords: [
    "연락처",
    "이메일",
    "협업",
    "프로젝트 의뢰",
    "HYEKER",
    "혜커",
    "개발자 연락",
    "포트폴리오 문의"
  ],
  openGraph: {
    title: "Contact - HYEKER STUDIO",
    description: "HYEKER와 함께 일하고 싶으신가요? 프로젝트 의뢰, 협업 제안은 언제나 환영합니다.",
    url: "https://hyeker.com/contact",
    type: "website",
    images: [
      {
        url: "https://hyeker.com/me.png",
        width: 1200,
        height: 630,
        alt: "Contact HYEKER"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - HYEKER STUDIO",
    description: "HYEKER와 함께 일하고 싶으신가요? 프로젝트 의뢰, 협업 제안은 언제나 환영합니다.",
    images: ["https://hyeker.com/me.png"]
  },
  alternates: {
    canonical: "https://hyeker.com/contact"
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "연락처", href: "/contact" }]} />
      {children}
    </>
  )
}
