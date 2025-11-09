"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Code, Palette, ShoppingBag } from "lucide-react"

const timeline = [
  {
    period: "2025.01 - 현재",
    type: "dev",
    company: "개인 웹/앱 작업",
    role: "1인 개발자",
    icon: Code,
    projects: [
      {
        name: "온유.ai (Onyu.ai)",
        description: "음성 데이터 기반 AI 오디오북 제작 플랫폼",
        tech: ["Next.js 15", "App Router", "Supabase", "Vercel"],
        link: "https://onyu.ai",
        details: []
      },
      {
        name: "매듭 (Maedup)",
        description: "5070 시니어 프리미엄 라이프스타일 플랫폼",
        tech: ["Next.js 15", "App Router", "Supabase", "Vercel"],
        link: "https://maedup.co.kr",
        details: []
      },
      {
        name: "캐치픽 (Catchpick)",
        description: "중장년 액티비티 예약 네이티브 앱",
        tech: ["Expo", "React Native", "Supabase"],
        link: null,
        details: []
      },
      {
        name: "테라다이스 (Terradice)",
        description: "랜덤 질문 일기 앱",
        tech: ["Expo", "React Native"],
        link: null,
        details: []
      },
    ]
  },
  {
    period: "2023.09 - 2024.09",
    type: "dev",
    company: "B사",
    role: "Developer (대리)",
    icon: Briefcase,
    projects: [
      {
        name: "B2B 여행자 보험 가입 서비스",
        description: "단체 보험 가입, 청구, 여행자 보험 가입 서비스 제공",
        tech: ["Next.js 14", "React.js", "TypeScript", "Tailwind CSS", "AWS Cognito", "AWS S3", "DynamoDB"],
        link: null,
        details: [
        ]
      },
      {
        name: "외교부 실의료비 청구 서비스",
        description: "B2B 해외 의료비 청구 웹앱",
        tech: ["Next.js 14", "React.js", "TypeScript", "AWS S3", "Firebase", "Google Analytics"],
        link: null,
        details: [
        ]
      }
    ]
  },
  {
    period: "2020.12 - 2022.11",
    type: "dev",
    company: "S사",
    role: "Developer (사원)",
    icon: Briefcase,
    projects: [
      {
        name: "H사 생산이력추적시스템",
        description: "공장 자동화 MES 시스템 (베트남 공장)",
        tech: ["Spring Boot (Java)", "React.js", "Android (JAVA)", "MSSQL", "Swagger UI"],
        link: null,
        details: [
        ]
      },
      {
        name: "L사 ACS 솔루션",
        description: "물류로봇(AGV) 컨트롤 시스템",
        tech: ["Spring Boot (Java)", "Thymeleaf", "C#", "JavaScript", "JQuery", "MSSQL"],
        link: null,
        details: [
        ]
      },
      {
        name: "L사 랜딩 홈페이지",
        description: "물류로봇(AGV) 홈페이지 구현",
        tech: ["Spring Boot (Java)", "Vanilla JavaScript", "AWS EC2"],
        link: null,
        details: [
        ]
      },
      {
        name: "T사 솔루션 고도화",
        description: "MCS, ACS 솔루션 고객 대상 고도화 개발",
        tech: ["Spring Boot (Java)", "JPA", "JavaScript", "JQuery", "Oracle", "MySQL", "MSSQL"],
        link: null,
        details: [
        ]
      },
      {
        name: "L사 배송자동화 기능 고도화",
        description: "상품 상세페이지 예상 배송일 기능 추가",
        tech: ["Spring Boot (Java)", "JSP", "React.js", "Oracle"],
        link: null,
        details: [
        ]
      }
    ]
  },
  {
    period: "2019.03 - 2020.03",
    type: "business",
    company: "돌프 (개인 사업)",
    role: "대표",
    icon: ShoppingBag,
    projects: [
      {
        name: "해외직구 쇼핑몰 운영",
        description: "중국 사입 및 국내 판매",
        tech: [],
        link: null,
        details: [
        ]
      }
    ]
  },
  {
    period: "2018.01 - 2019.10",
    type: "design",
    company: "M사",
    role: "콘텐츠 디자이너 (매니저)",
    icon: Palette,
    projects: [
      {
        name: "패션 콘텐츠 제작",
        description: "패션 에디터 및 콘텐츠 디자이너",
        tech: [],
        link: null,
        details: [
        ]
      }
    ]
  },
  {
    period: "2016.09 - 2017.12",
    type: "design",
    company: "S사",
    role: "콘텐츠 에디터 (매니저)",
    icon: Palette,
    projects: [
      {
        name: "큐레이션 콘텐츠 제작",
        description: "11번가 '핫픽'탭 큐레이션 콘텐츠 제작",
        tech: [],
        link: null,
        details: [
        ]
      }
    ]
  }
]

const TypeBadge = ({ type }: { type: string }) => {
  const config = {
    dev: { label: "개발", color: "bg-primary text-primary-foreground" },
    design: { label: "디자인", color: "bg-secondary text-secondary-foreground" },
    business: { label: "사업", color: "bg-accent text-accent-foreground" }
  }
  const { label, color } = config[type as keyof typeof config]
  return <Badge className={color}>{label}</Badge>
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Career Timeline</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          디자이너부터 개발자까지, 다양한 경험을 쌓아온 여정
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${index % 2 === 0 ? 'md:pr-[50%] md:pl-0' : 'md:pl-[50%] md:pr-0'} pl-20`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 shadow-lg" />

              {/* Icon */}
              <div className="absolute left-4 md:left-1/2 top-3 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center transform md:-translate-x-1/2 border-2 border-primary">
                <item.icon className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <Card className={`${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'} hover:border-primary transition-all duration-300 hover:shadow-lg`}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{item.company}</CardTitle>
                      <TypeBadge type={item.type} />
                    </div>
                    <Badge variant="outline" className="w-fit">{item.period}</Badge>
                  </div>
                  <CardDescription className="text-base">{item.role}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {item.projects.map((project, pIndex) => (
                    <div key={pIndex} className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      </div>

                      {project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, tIndex) => (
                            <Badge key={tIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {project.details && project.details.length > 0 && (
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {project.details.map((detail, dIndex) => (
                            <li key={dIndex} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-sm text-primary hover:underline"
                        >
                          프로젝트 보기 →
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
