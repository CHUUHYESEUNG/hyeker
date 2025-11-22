"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { m } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Loader2, ArrowLeft, Tag } from "lucide-react"
import { BlogPost } from "@/lib/blog-data"
import { getBlogPosts } from "@/lib/firebase/firestore"
import { getBlogThumbnailUrl } from "@/lib/cloudinary"
import { Breadcrumb } from "@/components/breadcrumb"

export default function TagPage() {
  const params = useParams()
  const tag = decodeURIComponent(params.tag as string)

  const INITIAL_BATCH = 6
  const LOAD_STEP = 6
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH)
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Firestore에서 블로그 포스트 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setInitialLoading(true)
        const posts = await getBlogPosts()

        // Firestore 데이터를 프론트엔드 형식으로 변환
        const formattedPosts: BlogPost[] = posts.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: post.tags,
          date: post.date?.toDate?.()
            ? post.date.toDate().toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          readTime: post.readTime,
          image: post.image || '/sample1.jpg',
          views: post.views || 0,
          author: {
            name: post.authorName || '장혜승',
            avatar: post.authorAvatar || ''
          }
        }))

        setBlogPosts(formattedPosts)
      } catch (error) {
        console.error('블로그 포스트 로딩 실패:', error)
        setBlogPosts([])
      } finally {
        setInitialLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // 태그로 필터링
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post =>
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    )
  }, [blogPosts, tag])

  const isExhausted = visibleCount >= filteredPosts.length

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

  // 관련 태그 (같은 포스트에서 자주 등장하는 다른 태그들)
  const relatedTags = useMemo(() => {
    const tagCounts = new Map<string, number>()
    filteredPosts.forEach(post => {
      post.tags.forEach(t => {
        if (t.toLowerCase() !== tag.toLowerCase()) {
          tagCounts.set(t, (tagCounts.get(t) || 0) + 1)
        }
      })
    })
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t)
  }, [filteredPosts, tag])

  const breadcrumbItems = [
    { label: "블로그", href: "/blog" },
    { label: `#${tag}`, href: `/blog/tags/${encodeURIComponent(tag)}` }
  ]

  // 초기 로딩 상태
  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">포스트를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Back Button */}
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Button asChild variant="ghost">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </Button>
      </m.div>

      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mb-12 max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 mb-6">
          <Tag className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-primary">#{tag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            태그: {tag}
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          총 {filteredPosts.length}개의 포스트
        </p>
      </m.div>

      {/* Related Tags */}
      {relatedTags.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-3">관련 태그</p>
          <div className="flex flex-wrap justify-center gap-2">
            {relatedTags.map((t) => (
              <Link
                key={t}
                href={`/blog/tags/${encodeURIComponent(t)}`}
                className="px-3 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              >
                #{t}
              </Link>
            ))}
          </div>
        </m.div>
      )}

      {/* Posts Grid */}
      {visiblePosts.length > 0 ? (
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <m.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
            >
              <Link href={`/blog/${post.id}`} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-background/80 transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow-md">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getBlogThumbnailUrl(post.image)}
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
                      {post.tags.slice(0, 3).map((t) => (
                        <Badge
                          key={t}
                          variant={t.toLowerCase() === tag.toLowerCase() ? "default" : "outline"}
                          className="rounded-full text-xs"
                        >
                          #{t}
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
            </m.div>
          ))}
        </div>
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <p className="text-lg text-muted-foreground">
            해당 태그의 포스트가 없습니다.
          </p>
          <Button asChild className="mt-4">
            <Link href="/blog">
              모든 포스트 보기
            </Link>
          </Button>
        </m.div>
      )}

      {/* Load More */}
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
    </div>
  )
}
