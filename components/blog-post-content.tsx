"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { m } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Share2, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { BlogPost } from "@/lib/blog-data"
import { getBlogDetailImageUrl } from "@/lib/cloudinary"
import { ReadingProgress } from "@/components/reading-progress"
import { TableOfContents } from "@/components/table-of-contents"
import { RelatedPosts } from "@/components/related-posts"
import { Breadcrumb, type BreadcrumbItem } from "@/components/breadcrumb"
import { NewsletterForm } from "@/components/newsletter-form"
import { MarkdownRenderer } from "@/components/markdown-renderer"

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
  allPosts?: BlogPost[]
}

export function BlogPostContent({ post, prevPost, nextPost, breadcrumbItems, allPosts = [] }: BlogPostContentProps) {
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
              <Link href={`/blog/category/${post.category}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors">
                  {post.category}
                </Badge>
              </Link>
              {post.tags.slice(0, 3).map((tag) => (
                <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`}>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors">
                    #{tag}
                  </Badge>
                </Link>
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
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views?.toLocaleString() || 0}회 조회</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                공유하기
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg">
              <Image
                src={getBlogDetailImageUrl(post.image)}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <div className="mb-8">
            {/* Excerpt */}
            <div className="bg-muted/30 p-6 rounded-lg border border-border mb-8">
              <p className="text-lg leading-relaxed m-0 text-muted-foreground italic">
                {post.excerpt}
              </p>
            </div>

            {/* Markdown Content */}
            <MarkdownRenderer content={post.content} />
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
        <RelatedPosts currentPostId={post.id} currentPostTags={post.tags} allPosts={allPosts} />

        {/* Newsletter Subscription */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-12"
        >
          <NewsletterForm />
        </m.div>

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
