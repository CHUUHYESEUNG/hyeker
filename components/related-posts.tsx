"use client"

import Link from "next/link"
import Image from "next/image"
import { m } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { type BlogPost } from "@/lib/blog-data"

interface RelatedPostsProps {
  currentPostId: string
  currentPostTags: string[]
  allPosts?: BlogPost[]  // 선택적 props로 변경
}

export function RelatedPosts({ currentPostId, currentPostTags, allPosts = [] }: RelatedPostsProps) {
  // Calculate relevance score for each post
  const scoredPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .map(post => {
      const commonTags = post.tags.filter(tag => currentPostTags.includes(tag))
      return {
        post,
        score: commonTags.length
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  if (scoredPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-16 border-t border-border">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">관련 포스트</h2>
        <p className="text-muted-foreground mb-8">
          이 글과 비슷한 주제의 포스트를 확인해보세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scoredPosts.map(({ post }, index) => (
            <m.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.id}`}>
                <Card className="h-full hover:border-primary transition-all duration-300 hover:shadow-lg group">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge
                          key={tag}
                          variant={currentPostTags.includes(tag) ? "default" : "outline"}
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-1 text-sm text-primary font-medium">
                      <span>읽어보기</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  )
}
