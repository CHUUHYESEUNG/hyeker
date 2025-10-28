"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Code, Palette, ShoppingBag } from "lucide-react"

const timeline = [
  {
    period: "2025.08 - 현재",
    type: "dev",
    company: "개인 웹/앱 작업",
    role: "1인 개발자",
    icon: Code,
    projects: [
      {
        name: "매듭 (Maedup)",
        description: "5070 시니어 프리미엄 라이프스타일 플랫폼",
        tech: ["Next.js 15", "App Router", "Supabase", "Vercel"],
        link: "https://maedup.co.kr"
      },
      {
        name: "캐치픽 (Catchpick)",
        description: "중장년 액티비티 예약 네이티브 앱",
        tech: ["Expo", "React Native", "Supabase"],
        link: null
      }
    ]
  },
  {
    period: "2023.09 - 2024.09",
    type: "dev",
    company: "비즈인사이트",
    role: "개발자 (대리)",
    icon: Briefcase,
    projects: [
      {
        name: "B2B 여행자 보험 가입 서비스",
        description: "단체 보험 가입, 청구, 여행자 보험 가입 서비스 제공",
        tech: ["Next.js 14", "React.js", "TypeScript", "Tailwind CSS", "AWS Cognito", "AWS S3", "DynamoDB"],
        details: [
          "UI 라우팅 설계 및 AWS Cognito 연동 로그인",
          "React-table 라이브러리 활용 가입자 엑셀 업로드 파싱",
          "Cursor based pagination (무한 스크롤) 구현",
          "TDD 기반 유효성 검증 처리"
        ]
      },
      {
        name: "외교부 실의료비 청구 서비스",
        description: "B2B 해외 의료비 청구 웹앱",
        tech: ["Next.js 14", "React.js", "TypeScript", "AWS S3", "Firebase", "Google Analytics"],
        details: [
          "전 화면 공통 UI 컴포넌트 작업",
          "Custom Hook UI/로직 분리",
          "AWS Presigned URL 우회 업로드",
          "Server / Client Components 분리"
        ]
      }
    ]
  },
  {
    period: "2022.11 - 2023.02",
    type: "dev",
    company: "메가존",
    role: "개발자 (대리)",
    icon: Briefcase,
    projects: [
      {
        name: "LFmall 배송자동화 고도화",
        description: "상품 상세페이지 예상 배송일 기능 추가",
        tech: ["Spring Boot (Java)", "JSP", "React.js", "Oracle"],
        details: [
          "Oracle 프로시저를 통한 배송 확률 계산",
          "React.js와 JSP 혼합 구조 개발"
        ]
      }
    ]
  },
  {
    period: "2020.12 - 2022.09",
    type: "dev",
    company: "(주)SHI (현 로드러너)",
    role: "개발자 (사원)",
    icon: Briefcase,
    projects: [
      {
        name: "효성첨단소재 생산이력추적시스템",
        description: "공장 자동화 MES 시스템 (베트남 연짝공장)",
        tech: ["Spring Boot (Java)", "React.js", "Android (JAVA)", "MSSQL", "Swagger UI"],
        details: [
          "PDA(Android) 앱, UI, SERVER 개발",
          "방사 → 연사 → 제직 → 열처리 공정 중 방사, 열처리 공정 담당",
          "자재 투입, 검사, 라벨 등록, 체크시트 화면 및 서버 개발",
          "통합생산이력 UI 개발"
        ]
      },
      {
        name: "LoadRunner ACS 솔루션",
        description: "물류로봇(AGV) 컨트롤 시스템",
        tech: ["Spring Boot (Java)", "Thymeleaf", "C#", "JavaScript", "JQuery", "MSSQL"],
        details: [
          "솔루션 UI/UX 디자인",
          "Bootstrap, GoJS Library 활용 AGV 모니터링 개발",
          "ACS ~ User간 Socket 통신 초기 셋팅"
        ]
      },
      {
        name: "Loadrunner 자사 홈페이지",
        description: "물류로봇(AGV) LoadRunner 홈페이지 구축",
        tech: ["Spring Boot (Java)", "Vanilla JavaScript", "AWS EC2"],
        details: [
          "UI/UX 디자인",
          "Linux EC2 인스턴스 기반 AWS 배포"
        ]
      },
      {
        name: "티라유텍 솔루션 고도화",
        description: "MCS, ACS 솔루션 고객 대상 고도화 개발",
        tech: ["Spring Boot (Java)", "JPA", "JavaScript", "JQuery", "Oracle", "MySQL", "MSSQL"],
        details: [
          "삼성전자, 삼성전기, LG Display 대상 고도화",
          "AGV Simulator 개발",
          "AGV 발생 Process Log Batch 및 실시간 로봇 상태 현황 화면 구현"
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
        description: "중국에서 물건을 수입하여 한국에 판매",
        tech: [],
        details: [
          "쿠팡, 스마트스토어 해외직구 판매업",
          "홍콩, 중국 심천, 이우 시장 조사 및 중국 거래처 무역 거래",
          "쇼핑몰 상세페이지 제작 및 판매 아이템 광고 집행"
        ]
      }
    ]
  },
  {
    period: "2018.01 - 2019.10",
    type: "design",
    company: "(주)엠버스",
    role: "콘텐츠 디자이너 (매니저)",
    icon: Palette,
    projects: [
      {
        name: "패션 콘텐츠 제작",
        description: "쇼핑 비서앱 써프라이즈 - 패션 에디터 및 콘텐츠 디자이너",
        tech: [],
        details: [
          "무신사, 유니클로, H&M, 에이티브 시즌별 프로모션 콘텐츠 제작",
          "시즌별 화보 촬영 및 스토리 텔링 콘텐츠 제작",
          "모델 섭외 및 콘텐츠 기획",
          "웹드라마 하트메이트 유튜브 게재 - 시나리오 협업, 배우 섭외 및 스타일링"
        ]
      }
    ]
  },
  {
    period: "2016.09 - 2017.12",
    type: "design",
    company: "11번가",
    role: "콘텐츠 에디터 (매니저)",
    icon: Palette,
    projects: [
      {
        name: "큐레이션 콘텐츠 제작",
        description: "11번가 '핫픽'탭 큐레이션 콘텐츠 제작",
        tech: [],
        details: [
          "11번가 내 셀러 아이템 기반 큐레이션 콘텐츠 기획 및 제작",
          "패션, 리빙 분야 MD들과 시리즈 콘텐츠 제작",
          "Google Analytics 활용 소비자 반응 데일리 검토 및 개선"
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
