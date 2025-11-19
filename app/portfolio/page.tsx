"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { m } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react"
import { portfolioItems, portfolioPlatformIconMap, type PortfolioCategory, type DevelopmentSubCategory, type DesignSubCategory } from "@/lib/portfolio-data"
import { Breadcrumb } from "@/components/breadcrumb"

const subCategoryLabels: Record<DevelopmentSubCategory | DesignSubCategory, string> = {
  web: "웹",
  app: "앱",
  content: "콘텐츠",
  logo: "로고",
  card: "명함"
}

export default function PortfolioPage() {
  const INITIAL_BATCH = 2
  const LOAD_STEP = 2
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("development")
  const [activeSubCategory, setActiveSubCategory] = useState<DevelopmentSubCategory | DesignSubCategory | "all">("all")
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filteredItems = useMemo(
    () => portfolioItems.filter((item) => {
      if (item.category !== activeCategory) return false
      if (activeSubCategory === "all") return true
      return item.subCategory === activeSubCategory
    }),
    [activeCategory, activeSubCategory]
  )
  const isExhausted = visibleCount >= filteredItems.length

  const loadMore = useCallback(() => {
    if (isLoading || isExhausted) return
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filteredItems.length))
      setIsLoading(false)
      timeoutRef.current = null
    }, 280)
  }, [isExhausted, isLoading, filteredItems.length])

  useEffect(() => {
    if (isExhausted) return
    const target = loadMoreRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [loadMore, isExhausted])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Reset visible count and subcategory when category changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH)
    setActiveSubCategory("all")
  }, [activeCategory])

  // Reset visible count when subcategory changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH)
  }, [activeSubCategory])

  const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "포트폴리오", href: "/portfolio" }]} />

      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Portfolio</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />

      </m.div>

      {/* Category Tabs */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="grid grid-cols-2 w-full max-w-md gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveCategory("development")}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === "development"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            개발
          </button>
          <button
            onClick={() => setActiveCategory("design")}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeCategory === "design"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            디자인
          </button>
        </div>
      </m.div>

      {/* SubCategory Filter */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mb-12"
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveSubCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeSubCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            전체
          </button>
          {activeCategory === "development" ? (
            <>
              <button
                onClick={() => setActiveSubCategory("web")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeSubCategory === "web"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                #웹
              </button>
              <button
                onClick={() => setActiveSubCategory("app")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeSubCategory === "app"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                #앱
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveSubCategory("content")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeSubCategory === "content"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                #콘텐츠
              </button>
              <button
                onClick={() => setActiveSubCategory("logo")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeSubCategory === "logo"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                #로고
              </button>
              <button
                onClick={() => setActiveSubCategory("card")}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeSubCategory === "card"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                #명함
              </button>
            </>
          )}
        </div>
      </m.div>

      {/* Portfolio Grid */}
      {activeCategory === "design" ? (
        /* Instagram-style Grid for Design */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visibleItems.map((item, index) => {
            const isImmediate = index < INITIAL_BATCH
            const animationProps = isImmediate
              ? {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 }
                }
              : {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 }
                }
            const transitionProps = {
              duration: 0.4,
              delay: isImmediate ? Math.min(index * 0.08, 0.3) : Math.min((index - INITIAL_BATCH) * 0.05, 0.2)
            }
            const viewportProps = isImmediate ? undefined : { once: true, amount: 0.3 }

            return (
              <m.div
                key={item.id}
                {...animationProps}
                transition={transitionProps}
                viewport={viewportProps}
              >
                <Link
                  href={`/portfolio/design/${item.routeId}`}
                  className="group block relative aspect-square overflow-hidden rounded-lg bg-muted"
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm md:text-base mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.subCategory && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-white/10 text-white border-white/20 backdrop-blur-sm"
                        >
                          #{subCategoryLabels[item.subCategory]}
                        </Badge>
                      )}
                      <Badge
                        variant={item.status === "완료" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Status Badge (visible by default on mobile) */}
                  <div className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <Badge
                      variant={item.status === "완료" ? "default" : "secondary"}
                      className="text-xs backdrop-blur-sm bg-background/80"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </Link>
              </m.div>
            )
          })}
        </div>
      ) : (
        /* List Layout for Development */
        <div className="space-y-16 max-w-6xl mx-auto">
          {visibleItems.map((item, index) => {
            const isImmediate = index < INITIAL_BATCH
            const animationProps = isImmediate
              ? {
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0 }
                }
              : {
                  initial: { opacity: 0, y: 40 },
                  whileInView: { opacity: 1, y: 0 }
                }
            const transitionProps = {
              duration: 0.5,
              delay: isImmediate ? Math.min(index * 0.12, 0.4) : Math.min((index - INITIAL_BATCH) * 0.08, 0.25)
            }
            const viewportProps = isImmediate ? undefined : { once: true, amount: 0.3 }

            return (
              <m.div
                key={item.id}
                {...animationProps}
                transition={transitionProps}
                viewport={viewportProps}
              >
              <Card className="overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-glow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Section */}
                  <div className="relative h-[300px] lg:h-auto bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center p-6">
                    <div className={`relative ${item.image.endsWith('.svg') ? 'w-[12.5%] h-[12.5%]' : 'w-full h-full'}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={item.status === "운영중" ? "default" : "secondary"}
                        className="text-sm"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-3xl mb-2">{item.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-2">
                          {item.date}
                        </p>
                      </CardHeader>

                      <CardContent className="p-0 space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {item.longDescription}
                        </p>

                        {/* Tech Stack */}
                        <div>
                          <h3 className="text-sm font-semibold mb-2">기술 스택</h3>
                          <div className="flex flex-wrap gap-2">
                            {item.tech.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h3 className="text-sm font-semibold mb-2">주요 기능</h3>
                          <ul className="space-y-1">
                            {item.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-1">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Platform Links */}
                        {item.showPlatforms !== false && (
                          <div>
                            <h3 className="text-sm font-semibold mb-3">플랫폼</h3>
                            <div className="flex flex-wrap gap-3">
                              {item.platforms.map((platform, idx) => {
                                const Icon = portfolioPlatformIconMap[platform.icon]
                                return (
                                  <Button
                                    key={idx}
                                    asChild={platform.available}
                                    variant={platform.available ? "default" : "secondary"}
                                    disabled={!platform.available}
                                    className="gap-2"
                                  >
                                    {platform.available ? (
                                      <a href={platform.url} target="_blank" rel="noopener noreferrer">
                                        <Icon className="h-4 w-4" />
                                        {platform.label}
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                      </a>
                                    ) : (
                                      <span>
                                        <Icon className="h-4 w-4" />
                                        {platform.label} (준비중)
                                      </span>
                                    )}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      {item.showDetailLink !== false && (
                        <div className="pt-6 flex justify-end">
                          <Button variant="link" asChild className="h-auto px-0 text-primary">
                            <Link href={`/portfolio/${item.category === 'design' ? 'design' : 'app'}/${item.routeId}`} className="inline-flex items-center gap-1 text-base">
                              자세히 보기
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
              </m.div>
            )
          })}
        </div>
      )}

      <div ref={loadMoreRef} className="h-24 flex items-center justify-center">
        {isExhausted ? (
          <span className="text-sm text-muted-foreground">모든 프로젝트를 확인하셨습니다.</span>
        ) : isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>불러오는 중이에요…</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">아래로 스크롤하면 더 많은 프로젝트를 볼 수 있어요</span>
        )}
      </div>

      {/* CTA Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">더 많은 프로젝트 보기</h2>
            <p className="text-muted-foreground mb-6">
              전체 경력과 프로젝트 타임라인은 Projects 페이지에서 확인하세요
            </p>
            <Button asChild size="lg">
              <Link href="/projects">
                전체 프로젝트 보기
              </Link>
            </Button>
          </CardContent>
        </Card>
      </m.div>
    </div>
  )
}
