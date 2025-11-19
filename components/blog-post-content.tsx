"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { m } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { BlogPost } from "@/lib/blog-data"
import { ReadingProgress } from "@/components/reading-progress"
import { TableOfContents } from "@/components/table-of-contents"
import { RelatedPosts } from "@/components/related-posts"
import { Breadcrumb, type BreadcrumbItem } from "@/components/breadcrumb"

// Dynamic import for Giscus to reduce initial bundle size
const GiscusComments = dynamic(() => import("@/components/giscus-comments").then(mod => ({ default: mod.GiscusComments })), {
  ssr: false,
  loading: () => <div className="text-center text-muted-foreground py-8">댓글을 불러오는 중...</div>
})

interface BlogPostContentProps {
  post: BlogPost
  prevPost: BlogPost | null
  nextPost: BlogPost | null
  breadcrumbItems: BreadcrumbItem[]
}

export function BlogPostContent({ post, prevPost, nextPost, breadcrumbItems }: BlogPostContentProps) {
  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Table of Contents */}
      <TableOfContents />

      <div className="container mx-auto px-6 sm:px-6 lg:px-8 pb-20 pt-8">
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

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <m.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">#{tag}</Badge>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                공유하기
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-muted/30 p-6 rounded-lg border border-border mb-8">
              <p className="text-lg leading-relaxed m-0">{post.excerpt}</p>
            </div>

            <div className="space-y-6">
              <p className="leading-relaxed">{post.content}</p>

              <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
                <p className="text-sm text-muted-foreground m-0">
                  <strong className="text-primary">Note:</strong> 이 글은 더미 데이터입니다.
                  실제 블로그 글은 Supabase와 연동하여 관리할 예정입니다.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">주요 내용</h2>
              <p className="leading-relaxed">
                이 글에서는 {post.title.toLowerCase()}에 대한 실전 경험과 인사이트를 공유합니다.
                {post.category} 분야에서 실무에 바로 적용할 수 있는 노하우를 다룹니다.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">왜 이 주제를 다루게 되었나?</h3>
              <p className="leading-relaxed">
                실무 프로젝트를 진행하면서 겪었던 경험을 바탕으로,
                같은 고민을 하고 있는 개발자들에게 도움이 되고자 이 글을 작성하게 되었습니다.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">핵심 포인트</h3>
              <ul className="space-y-2">
                {post.tags.map((tag, index) => (
                  <li key={index}>{tag}에 대한 실전 활용법</li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">결론</h2>
              <p className="leading-relaxed">
                이 글을 통해 {post.category} 분야에 대한 이해를 높이고,
                실전에서 바로 활용할 수 있는 인사이트를 얻어가셨기를 바랍니다.
              </p>
            </div>
          </div>
        </m.article>

        {/* Author Info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mb-12">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
                  <Image
                    src="/me.png"
                    alt="Hyeker profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">혜커 Hyeker</h3>
                  <p className="text-sm text-muted-foreground">
                    1인 인디 개발자
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    개발, 디자인, 기획 등 프로덕트를 만들며 겪은 다양한 경험과 생각을 공유합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </m.div>

        {/* Navigation */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {prevPost && (
            <Card className="hover:border-primary transition-colors">
              <Link href={`/blog/${prevPost.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <ChevronLeft className="h-4 w-4" />
                    <span>이전 글</span>
                  </div>
                  <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                    {prevPost.title}
                  </h3>
                </CardContent>
              </Link>
            </Card>
          )}

          {nextPost && (
            <Card className="hover:border-primary transition-colors">
              <Link href={`/blog/${nextPost.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                    <span>다음 글</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold line-clamp-2 text-right hover:text-primary transition-colors">
                    {nextPost.title}
                  </h3>
                </CardContent>
              </Link>
            </Card>
          )}
        </m.div>

        {/* Related Posts */}
        <RelatedPosts currentPostId={post.id} currentPostTags={post.tags} />

        {/* Comments Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Separator className="my-12" />
          <GiscusComments />
        </m.div>
      </div>
    </div>
    </>
  )
}
