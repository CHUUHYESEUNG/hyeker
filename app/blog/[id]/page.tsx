"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { getBlogPost, getBlogPosts, incrementViewCount } from "@/lib/firebase/firestore"
import { BlogPostContent } from "@/components/blog-post-content"
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema"
import { BlogPost } from "@/lib/blog-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function BlogPostPage() {
  const params = useParams()
  const id = params.id as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const viewCountedRef = useRef(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(false)

        // 현재 포스트와 전체 포스트 목록 가져오기
        const [currentPost, posts] = await Promise.all([
          getBlogPost(id),
          getBlogPosts()
        ])

        if (!currentPost) {
          setError(true)
          return
        }

        // 조회수 증가 (세션당 한 번만)
        if (!viewCountedRef.current) {
          viewCountedRef.current = true
          incrementViewCount(id).catch(err => {
            console.error('조회수 증가 실패:', err)
          })
        }

        // Firestore 데이터를 프론트엔드 형식으로 변환
        const formattedPost: BlogPost = {
          id: currentPost.id,
          title: currentPost.title,
          slug: currentPost.slug,
          excerpt: currentPost.excerpt,
          content: currentPost.content,
          category: currentPost.category,
          tags: currentPost.tags,
          date: currentPost.date?.toDate?.()
            ? currentPost.date.toDate().toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          readTime: currentPost.readTime,
          image: currentPost.image || '/sample1.jpg',
          views: (currentPost.views || 0) + 1, // 현재 조회 포함
          author: {
            name: currentPost.authorName || '장혜승',
            avatar: currentPost.authorAvatar || ''
          }
        }

        const formattedPosts: BlogPost[] = posts.map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          content: p.content,
          category: p.category,
          tags: p.tags,
          date: p.date?.toDate?.()
            ? p.date.toDate().toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          readTime: p.readTime,
          image: p.image || '/sample1.jpg',
          views: p.views || 0,
          author: {
            name: p.authorName || '장혜승',
            avatar: p.authorAvatar || ''
          }
        }))

        setPost(formattedPost)
        setAllPosts(formattedPosts)

        // 페이지 타이틀 업데이트
        document.title = `${formattedPost.title} - 혜커 HYEKER`

        // OG 메타 태그 동적 업데이트
        const ogTitle = document.querySelector('meta[property="og:title"]')
        const ogDescription = document.querySelector('meta[property="og:description"]')
        const ogImage = document.querySelector('meta[property="og:image"]')
        const ogUrl = document.querySelector('meta[property="og:url"]')
        const twitterTitle = document.querySelector('meta[name="twitter:title"]')
        const twitterDescription = document.querySelector('meta[name="twitter:description"]')
        const twitterImage = document.querySelector('meta[name="twitter:image"]')

        const ogImageUrl = `/api/og?title=${encodeURIComponent(formattedPost.title)}&description=${encodeURIComponent(formattedPost.excerpt)}&type=blog`
        const postUrl = `https://hyeker.com/blog/${id}`

        if (ogTitle) ogTitle.setAttribute('content', formattedPost.title)
        if (ogDescription) ogDescription.setAttribute('content', formattedPost.excerpt)
        if (ogImage) ogImage.setAttribute('content', ogImageUrl)
        if (ogUrl) ogUrl.setAttribute('content', postUrl)
        if (twitterTitle) twitterTitle.setAttribute('content', formattedPost.title)
        if (twitterDescription) twitterDescription.setAttribute('content', formattedPost.excerpt)
        if (twitterImage) twitterImage.setAttribute('content', ogImageUrl)
      } catch (err) {
        console.error('포스트 로딩 실패:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  // 로딩 상태
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">포스트를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  // 에러 또는 포스트 없음
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">글을 찾을 수 없습니다</h1>
        <p className="text-muted-foreground mb-8">요청하신 포스트가 존재하지 않거나 삭제되었습니다.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그로 돌아가기
          </Link>
        </Button>
      </div>
    )
  }

  // ID 기반으로 이전/다음 글 찾기
  const currentIndex = allPosts.findIndex(p => p.id === id)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "블로그", href: "/blog" },
    { label: post.title, href: `/blog/${post.id}` }
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogPostContent
        post={post}
        prevPost={prevPost}
        nextPost={nextPost}
        breadcrumbItems={breadcrumbItems}
        allPosts={allPosts}
      />
    </>
  )
}
