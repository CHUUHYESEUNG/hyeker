"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Mail, Github, Linkedin, Instagram, BookOpen, FileText } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import type { MouseEvent as ReactMouseEvent } from "react"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const [heroTilt, setHeroTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleHeroPointerMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5
    const rotateY = Math.max(-12, Math.min(12, relativeX * 24))
    const rotateX = Math.max(-12, Math.min(12, -relativeY * 24))
    setHeroTilt({ rotateX, rotateY })
  }, [])

  const handleHeroPointerLeave = useCallback(() => {
    setHeroTilt({ rotateX: 0, rotateY: 0 })
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroPointerMove}
        onMouseLeave={handleHeroPointerLeave}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05030d] text-white"
      >
        <div className="absolute inset-0">
          <motion.div style={{ opacity, scale, y }} className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{
                rotateX: heroTilt.rotateX * 0.15,
                rotateY: heroTilt.rotateY * -0.15,
                x: heroTilt.rotateY * 10,
                y: heroTilt.rotateX * -10
              }}
              transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="relative w-screen max-w-[1200px]"
                style={{ transform: "translateZ(-180px)", willChange: "transform" }}
              >
                <Image
                  src="/hero1.png"
                  alt="Hyeker Jang creative silhouette"
                  width={1600}
                  height={1200}
                  priority
                  className="w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(118,69,217,0.22),rgba(5,3,13,0.98))]" />
          <div className="absolute -left-1/2 top-1/3 h-[520px] w-[520px] rounded-full bg-[#6f3bff]/25 blur-3xl" />
          <div className="absolute -right-1/3 bottom-0 h-[460px] w-[460px] rounded-full bg-[#b48bff]/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center px-6 py-24" style={{ perspective: "1600px" }}>
          <motion.div
            animate={{
              rotateX: heroTilt.rotateX,
              rotateY: heroTilt.rotateY
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.7 }}
            className="flex flex-col items-center gap-12 mt-20 text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* <div className="flex items-center gap-4">
              <span className="h-[2px] w-16 bg-gradient-to-r from-white/65 to-transparent" />
              <span className="h-2 w-2 rounded-full bg-white/45" />
              <span className="h-[2px] w-16 bg-gradient-to-l from-white/65 to-transparent" />
            </div> */}

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black uppercase tracking-[0.45em] text-white/85 sm:text-[68px]"
              >
                HYEKER JANG
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.05 }}
                className="text-3xl uppercase tracking-[0.35em] text-white/55 sm:text-[30px]"
              >
                Designer &amp; Developer
              </motion.h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full border border-white/15 bg-white/10 px-7 text-sm font-semibold uppercase tracking-[0.35em] text-white backdrop-blur transition hover:-translate-y-1 hover:bg-[#8c56ff]/90"
              >
                <Link href="/portfolio">
                  View Works
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-white/25 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:-translate-y-1 hover:border-white/35"
              >
                <Link href="/contact">
                  Contact
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            animate={{
              rotateX: heroTilt.rotateX * -0.6,
              rotateY: heroTilt.rotateY * -0.6,
              x: heroTilt.rotateY * -4,
              y: heroTilt.rotateX * 4
            }}
            transition={{ type: "spring", stiffness: 100, damping: 16, mass: 0.6 }}
            className="pointer-events-none mt-16 h-[220px] w-[220px] rounded-full border border-white/10 bg-white/5 opacity-60 blur-3xl"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="relative overflow-hidden bg-[#070512] py-24">
        <div className="absolute inset-0">
          <div className="absolute -left-1/3 top-1/4 h-[520px] w-[520px] rounded-full bg-[#5b35ff]/25 blur-3xl" />
          <div className="absolute right-[-20%] top-0 h-[440px] w-[440px] rounded-full bg-[#b09aff]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(7,5,18,0.85)_0%,rgba(7,5,18,0.95)_45%,rgba(5,3,13,1)_100%)]" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2"
          >
            <div className="relative flex justify-center">
              <div className="absolute -inset-10 hidden rounded-[48px] border border-white/5 bg-white/5 blur-2xl lg:block" />
              <div className="relative flex w-full max-w-[420px] flex-col gap-6 rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#120a24]/90">
                  <Image
                    src="/me.png"
                    alt="Hyeker portrait"
                    width={640}
                    height={640}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-4 text-white/70">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/45">
                    <span>Designer → Developer</span>
                    <span>Seoul · Remote</span>
                  </div>
                  <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>Experience</span>
                      <span>8+ yrs</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Focus</span>
                      <span>Product · Brand · AI</span>
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm text-white/65">
                    <p>패션/브랜드 경험에서 출발해 인터랙션 중심의 프로덕트를 만드는 하이브리드 메이커입니다.</p>
                    <p>브랜드 감성과 엔지니어링을 연결해 팀이 공감하는 언어와 시스템을 설계합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10 text-white text-center sm:text-left">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.45em] text-white/55">
                  About
                  <span className="h-1 w-1 rounded-full bg-[#d3c6ff]" />
                </span>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Designer & Product Engineer
                </h2>
                {/* <p className="text-base leading-relaxed text-white/70">
                  글로벌 브랜드 캠페인을 경험한 콘텐츠 디자이너에서 개발자, AI 석사를 거쳐 프로덕트 엔지니어로 활동중입니다.
                  프로덕트 단위의 빠른 MVP로 성과를 예측하고, 사용자 경험을 최우선으로 여기는 제작 방식을 선호합니다.
                </p> */}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur text-left">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/45">Design Craft</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li>Design system &amp; brand storytelling</li>
                    <li>Motion spec · Micro interaction</li>
                    <li>Creative direction &amp; prototyping</li>
                  </ul>
                </div>
                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur text-left">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/45">Engineering</p>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li>Next.js 15 · React Native · TypeScript</li>
                    <li>FastAPI · Spring Boot · Supabase</li>
                    <li>AI-assisted workflow &amp; automation</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-sm text-white/70 backdrop-blur text-left">
                <p className="uppercase tracking-[0.35em] text-white/50">Currently</p>
                <p>
                  글로벌 브랜드 캠페인을 경험한 콘텐츠 디자이너에서 개발자, AI 석사를 거쳐 프로덕트 엔지니어로 활동중입니다.
                  프로덕트 단위의 빠른 MVP로 성과를 예측하고, 사용자 경험을 최우선으로 여기는 제작 방식을 선호합니다.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {["Product Strategy", "Design Systems", "AI Assisted Dev", "Motion Narrative", "Brand Tech"].map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/25 bg-transparent text-white/60">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative overflow-hidden bg-[#04030d] py-24">
        <div className="absolute inset-0">
          <div className="absolute -left-1/4 top-0 h-[360px] w-[420px] rounded-full bg-[#8a63ff]/25 blur-3xl" />
          <div className="absolute right-[-15%] top-1/3 h-[320px] w-[380px] rounded-full bg-[#47c4ff]/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)]" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-4xl flex-col items-center text-center text-white"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.45em] text-white/55">
              Skillscape
              <span className="h-1 w-1 rounded-full bg-[#c8b9ff]" />
            </span>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">디자인과 엔지니어링 A to Z</h2>
            <p className="mt-4 text-base text-white/65">
              사용자 경험을 중심으로 디자인 시스템, 프론트엔드, 백엔드, AI 워크플로를 연결합니다.
            </p>
          </motion.div>

          <div className="relative mt-16 grid gap-6 lg:grid-cols-[0.6fr,1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 text-white backdrop-blur"
            >
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.45em] text-white/45">Profile</p>
                <div className="mt-6 grid gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#9d88ff]" />
                    <span>Design system · 마이크로 인터랙션</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#7ecbff]" />
                    <span>Next.js 15 · React Native · TypeScript 기반 프론트엔드</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#ffc874]" />
                    <span>FastAPI · Spring Boot · Supabase · AWS 아키텍처</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#ff82b5]" />
                    <span>AI Assisted Workflow · 데이터 기반 문제 해결</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-white/65">
                <p>
                  디자인 언어와 엔지니어링 사이의 간극을 줄이는 것을 목표로 합니다. Figma, After Effects로 인터랙션을 스케치하고,
                  Next.js · React Native로 빠르게 검증하며, FastAPI · Spring Boot와 Supabase/AWS로 안정적인 서비스를 구축합니다.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {[
                {
                  title: "Experience Design",
                  tone: "from-[#9c7dff]/20 to-transparent border-white/15",
                  items: ["Design system", "Motion spec", "Storytelling", "Creative direction", "Accessibility"]
                },
                {
                  title: "Frontend Core",
                  tone: "from-[#73b5ff]/20 to-transparent border-white/15",
                  items: ["Next.js 15", "React Native", "TypeScript", "Tailwind CSS", "Framer Motion"]
                },
                {
                  title: "Product Backend",
                  tone: "from-[#ffcf73]/15 to-transparent border-white/10",
                  items: ["FastAPI", "Spring Boot", "Supabase", "PostgreSQL", "REST · GraphQL"]
                },
                {
                  title: "AI & Ops",
                  tone: "from-[#ff7fb0]/20 to-transparent border-white/10",
                  items: ["SAINT · LSTM 모델링", "LangChain · Prompting", "Docker · AWS", "CI/CD Automation", "Security & Observability"]
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`group relative overflow-hidden rounded-[28px] border bg-white/[0.04] p-6 text-white backdrop-blur transition hover:translate-y-[-6px]`}
                >
                  <div className={`absolute -inset-px rounded-[28px] bg-gradient-to-br ${category.tone} opacity-0 transition group-hover:opacity-100`} />
                  <div className="relative z-10 space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/50">{category.title}</p>
                    <ul className="space-y-2 text-sm text-white/70">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/40" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative overflow-hidden bg-[#070512] py-24">
        <div className="absolute inset-0">
          <div className="absolute -left-1/3 top-0 h-[480px] w-[520px] rounded-full bg-[#5d3bff]/25 blur-3xl" />
          <div className="absolute right-[-20%] bottom-0 h-[440px] w-[520px] rounded-full bg-[#66d7ff]/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,18,0.96)_0%,rgba(5,3,13,1)_100%)]" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.45em] text-white/55">
              Portfolio
              <span className="h-1 w-1 rounded-full bg-[#c8baff]" />
            </span>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">주요 프로젝트</h2>
            <p className="mt-4 text-base text-white/65">
              Next.js, RN, Supabase 등을 활용한 웹/앱 제작
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              {
                id: "maedup",
                title: "매듭 (Maedup)",
                tagline: "시니어 프리미엄 라이프스타일 커뮤니티",
                description: "시니어끼리 인연을 만들고 다양한 활동을 유도하여 사회 참여를 독려하는 라이프스타일 플랫폼",
                tech: ["Next.js 15", "Supabase", "TypeScript", "Vercel"],
                links: [
                  { label: "웹사이트", type: "web", available: true, url: "https://maedup.co.kr" },
                ],
                detail: "/portfolio/app/1",
                image: "/app_1_maedup.png",
                type: "mobile"
              },
              {
                id: "onyu",
                title: "온유.ai (Onyu.ai)",
                tagline: "음성 데이터 기반 AI 오디오북 제작 플랫폼",
                description: "글쓰기에 어려움을 느끼는 중·장년층과 시니어 세대를 위해 음성 인터뷰를 기반으로 AI가 자서전을 자동 생성하는 플랫폼",
                tech: ["Next.js 15", "AI/ML", "TypeScript", "Python", "Supabase", "Vercel"],
                links: [
                  { label: "웹사이트", type: "web", available: true, url: "https://onyu.ai" },
                ],
                detail: "/portfolio/app/3",
                image: "/app_3_onyu.png",
                type: "web"
              },
              {
                id: "terradice",
                title: "테라다이스 (Terradice)",
                tagline: "매일 바뀌는 질문 기반 일기 앱",
                description: "일기 작성 중도 포기를 해결하기 위한 랜덤 일기 앱",
                tech: ["React Native", "Expo"],
                links: [{ label: "앱 심사 진행중", type: "web", available: true, url: "" }],
                detail: "/portfolio/app/2",
                image: "/app_2_terradice.png",
                type: "mobile"
              }
            ].map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex h-full flex-col overflow-visible rounded-[32px] border border-white/10 bg-white/[0.05] pb-6 backdrop-blur"
              >
                <div className={project.type === "web" ? "relative h-[320px]" : "relative h-[320px]"}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        y: [-12, 12, -12],
                        rotateX: [-4, 4, -4],
                        rotateY: [2, -2, 2]
                      }}
                      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                      className={project.type === "web" ? "relative w-full max-w-[442px]" : "relative w-full max-w-[240px]"}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} mockup`}
                        width={project.type === "web" ? 910 : 500}
                        height={project.type === "web" ? 780 : 820}
                        className="w-full object-contain drop-shadow-[0_40px_80px_rgba(10,10,35,0.45)]"
                        priority
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/20 opacity-40" />
                      <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_70%)]" />
                      <div className="pointer-events-none absolute inset-x-6 bottom-[-60px] h-24 rounded-full bg-gradient-to-b from-white/20 via-white/10 to-transparent blur-2xl" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-[-36px] left-6 right-6 z-20 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-lg shadow-[0_20px_40px_-30px_rgba(120,110,255,0.7)]">
                    <span className="text-xs uppercase tracking-[0.35em] text-white/55">{project.tagline}</span>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                </div>

                <div className="relative z-10 mt-16 flex flex-1 flex-col gap-6 px-6 text-white">
                  <p className="text-sm text-white/70">{project.description}</p>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/45">Tech Stack</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/20 bg-transparent text-white/65">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Download &amp; Links</p>
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => {
                        const isAvailable = link.available
                        const label = isAvailable ? link.label : `${link.label} (준비중)`
                        const buttonClasses = isAvailable
                          ? "border-white/25 bg-white/10 text-white hover:-translate-y-1 hover:bg-white/20"
                          : "border-white/10 bg-white/[0.04] text-white/40 cursor-not-allowed"

                        return isAvailable ? (
                          <Button
                            key={link.label}
                            asChild
                            variant="outline"
                            size="sm"
                            className={`rounded-full border ${buttonClasses}`}
                          >
                            <Link href={link.url} target={link.type === "web" ? "_blank" : undefined} rel="noopener noreferrer">
                              {link.label}
                            </Link>
                          </Button>
                        ) : (
                          <Button key={link.label} variant="outline" size="sm" disabled className={`rounded-full border ${buttonClasses}`}>
                            {label}
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  {/* <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-white/25 bg-transparent text-white transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
                  >
                    <Link href={project.detail}>
                      자세히 보기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button> */}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flex flex-col items-center gap-6 text-white"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full border border-white/20 bg-white/10 px-8 text-sm font-semibold uppercase tracking-[0.35em] text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                <Link href="/portfolio">
                  더 많은 포트폴리오 보러가기
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border border-white/20 bg-transparent px-8 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:-translate-y-1 hover:border-white/40"
              >
                <Link href="/projects">
                  전체 프로젝트 타임라인
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden bg-[#04020c] py-24">
        <div className="absolute inset-0">
          <div className="absolute -left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-[#7f4dff]/25 blur-[140px]" />
          <div className="absolute right-[-20%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-[#4dcfff]/15 blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-white/[0.08] p-10 backdrop-blur-lg text-white shadow-[0_30px_120px_-60px_rgba(95,78,255,0.65)]"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-6 text-center sm:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.45em] text-white/60">
                  Contact
                  <span className="h-1 w-1 rounded-full bg-[#e7defe]" />
                </span>
                <h2 className="text-3xl font-semibold sm:text-4xl">Let&apos;s build something bold!</h2>

                <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="group h-12 rounded-full border border-white/20 bg-white/10 px-7 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-1 hover:bg-white/20"
                  >
                    <a href="mailto:heyhyeker@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      heyhyeker@gmail.com
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group h-12 rounded-full border border-white/20 bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-1 hover:border-white/35 hover:bg-white/10"
                  >
                    <Link href="/contact">
                      제안 보내기
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-6 rounded-[28px] border border-white/10 bg-black/20 p-6 backdrop-blur">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/45">Social</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: Github, href: "https://github.com/CHUUHYESEUNG", label: "GitHub" },
                      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                      { icon: Instagram, href: "https://instagram.com/heyhyeker", label: "Instagram" },
                      { icon: BookOpen, href: "https://brunch.co.kr/@hyeker", label: "브런치" },
                      { icon: FileText, href: "https://dalsoon-jang.tistory.com", label: "티스토리" }
                    ].map((social, idx) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/70 transition hover:-translate-y-1 hover:text-white"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm text-white/60">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/45">Next</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/45" />
                      <span>프로젝트 성격 · 일정 · 예산 범위를 알려 주세요.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/45" />
                      <span>필요 시 온라인 미팅을 통해 방향을 함께 맞춰요.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
