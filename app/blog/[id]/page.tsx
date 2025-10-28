import { blogPosts } from "@/lib/blog-data"
import { BlogPostContent } from "@/components/blog-post-content"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = blogPosts.find(p => p.id === id)

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">글을 찾을 수 없습니다</h1>
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
  const currentIndex = blogPosts.findIndex(p => p.id === id)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  return <BlogPostContent post={post} prevPost={prevPost} nextPost={nextPost} />
}
