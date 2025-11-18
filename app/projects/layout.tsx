import type { Metadata } from "next"
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema"

export const metadata: Metadata = {
  title: "Career Timeline",
  description: "디자이너부터 개발자까지, HYEKER의 커리어 여정과 프로젝트 타임라인. 2016년부터 현재까지의 모든 경력과 주요 프로젝트를 확인하세요.",
  keywords: [
    "커리어",
    "타임라인",
    "경력",
    "프로젝트",
    "HYEKER",
    "혜커",
    "개발자",
    "디자이너",
    "풀스택",
    "Next.js",
    "Spring Boot"
  ],
  openGraph: {
    title: "Career Timeline - HYEKER STUDIO",
    description: "디자이너부터 개발자까지, HYEKER의 커리어 여정과 프로젝트 타임라인",
    url: "https://hyeker.com/projects",
    type: "website",
    images: [
      {
        url: "https://hyeker.com/me.png",
        width: 1200,
        height: 630,
        alt: "HYEKER Career Timeline"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Timeline - HYEKER STUDIO",
    description: "디자이너부터 개발자까지, HYEKER의 커리어 여정과 프로젝트 타임라인",
    images: ["https://hyeker.com/me.png"]
  },
  alternates: {
    canonical: "https://hyeker.com/projects"
  }
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema items={[{ label: "프로젝트", href: "/projects" }]} />
      {children}
    </>
  )
}
