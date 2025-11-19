"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ArrowRight, Loader2 } from "lucide-react"
import { blogPosts, categories } from "@/lib/blog-data"
import { Breadcrumb } from "@/components/breadcrumb"

export default function BlogPage() {
  const INITIAL_BATCH = 4
  const LOAD_STEP = 4
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
  const [isLoading, setIsLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filterPosts = useCallback((category: string, query: string) => {
    const normalizedQuery = query.trim().toLowerCase()
    return blogPosts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category
      const matchesSearch =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      return matchesCategory && matchesSearch
    })
  }, [])

  const filteredPosts = useMemo(
    () => filterPosts(selectedCategory, searchQuery),
    [filterPosts, selectedCategory, searchQuery]
  )
  const isExhausted = visibleCount >= filteredPosts.length

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug)
    const nextLength = filterPosts(slug, searchQuery).length
    setVisibleCount(Math.min(INITIAL_BATCH, nextLength))
    setIsLoading(false)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    const nextLength = filterPosts(selectedCategory, value).length
    setVisibleCount(Math.min(INITIAL_BATCH, nextLength))
    setIsLoading(false)
  }

  const loadMore = useCallback(() => {
    if (isLoading || isExhausted) return
    setIsLoading(true)
    timeoutRef.current = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_STEP, filteredPosts.length))
      setIsLoading(false)
      timeoutRef.current = null
    }, 260)
  }, [filteredPosts.length, isExhausted, isLoading])

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
      { rootMargin: "240px" }
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

  const visiblePosts = useMemo(() => filteredPosts.slice(0, visibleCount), [filteredPosts, visibleCount])

  const highlightPost = visiblePosts[0]
  const remainingPosts = visiblePosts.slice(1)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "블로그", href: "/blog" }]} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mb-16 max-w-3xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.4em] text-primary">
          Notes & Stories
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Hyeker Log</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          개인적인 생각과 경험 공유하기
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mb-10 max-w-3xl"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm backdrop-blur">
          <Search className="absolute left-6 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground sm:block" />
          <Input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-12 border-none bg-transparent pl-4 sm:pl-12 text-base focus-visible:ring-0"
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((category) => (
          <Button
            key={category.slug}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            onClick={() => handleCategoryChange(category.slug)}
            className="rounded-full border px-4 py-2 text-sm transition-all"
          >
            {category.name}
          </Button>
        ))}
      </motion.div>

      {/* Highlight Post */}
      {highlightPost && (
        <motion.article
          key={highlightPost.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mb-16 overflow-hidden rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/20 via-background/90 to-secondary/15 p-1"
        >
          <Link href={`/blog/${highlightPost.id}`} className="block rounded-[28px] bg-background/95 backdrop-blur">
            <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
              <div className="relative h-72 overflow-hidden rounded-3xl lg:h-full">
                <Image
                  src={highlightPost.image}
                  alt={highlightPost.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-4 text-white">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur">
                      {highlightPost.category}
                    </Badge>
                    <span className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(highlightPost.date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {highlightPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-semibold leading-tight">{highlightPost.title}</h2>
                  <p className="text-sm text-white/75 line-clamp-3">{highlightPost.excerpt}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">함께 읽으면 좋은 키워드</p>
                  <div className="flex flex-wrap gap-2">
                    {highlightPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-full border-primary/40 bg-primary/10 text-primary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">계속 읽기</span>
                  <Button variant="secondary" className="rounded-full px-6 py-2">
                    더 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      )}

      {/* Remaining Posts */}
      {remainingPosts.length > 0 && (
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {remainingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-background/80 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs text-white/80">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg transition group-hover:text-primary">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-full text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                      더 읽기
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {filteredPosts.length > 0 && (
        <div ref={loadMoreRef} className="mx-auto mt-12 flex h-16 max-w-5xl items-center justify-center text-sm text-muted-foreground">
          {isExhausted ? (
            <span>모든 글을 확인했습니다.</span>
          ) : isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              불러오는 중이에요...
            </span>
          ) : (
            <span>스크롤하면 더 많은 글이 열려요</span>
          )}
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <p className="text-lg text-muted-foreground">검색 결과가 없습니다. 다른 키워드를 입력해보세요.</p>
        </motion.div>
      )}
    </div>
  )
}
