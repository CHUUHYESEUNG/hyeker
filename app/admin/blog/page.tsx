"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react'
import { getAllBlogPostsAdmin, deleteBlogPost, BlogPost } from '@/lib/firebase/firestore'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [firebaseError, setFirebaseError] = useState(false)
  const router = useRouter()

  const fetchPosts = async () => {
    // Firebase 설정 확인
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      setFirebaseError(true)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const data = await getAllBlogPostsAdmin()
      setPosts(data)
    } catch (error) {
      console.error('블로그 목록 가져오기 실패:', error)
      setFirebaseError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 포스트를 삭제하시겠습니까?`)) {
      return
    }

    try {
      setDeleting(id)
      await deleteBlogPost(id)
      setPosts(posts.filter(p => p.id !== id))
    } catch (error) {
      console.error('삭제 실패:', error)
      alert('삭제에 실패했습니다.')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (firebaseError) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">블로그 관리</h2>
          <p className="text-muted-foreground mt-1">포스트 목록을 불러올 수 없습니다</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Firebase 설정 필요</h3>
              <p className="text-muted-foreground text-sm mb-4">
                블로그 데이터를 관리하려면 Firebase를 설정해야 합니다.
              </p>
              <div className="bg-background/50 rounded-lg p-4 text-sm font-mono">
                <p className="text-muted-foreground mb-2"># .env.local 파일에 추가:</p>
                <p>NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key</p>
                <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id</p>
              </div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
              >
                ← 대시보드로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">블로그 관리</h2>
          <p className="text-muted-foreground mt-1">
            총 {posts.length}개의 포스트 (공개: {posts.filter(p => p.published).length}, Draft: {posts.filter(p => !p.published).length})
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          새 포스트 작성
        </Link>
      </div>

      {/* Table */}
      {posts.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground mb-4">아직 작성된 포스트가 없습니다.</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            첫 포스트 작성하기
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">제목</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">카테고리</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">상태</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">작성일</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{post.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {post.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-500">
                          <Eye className="w-3 h-3" />
                          공개
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {post.date && format(post.date.toDate(), 'yyyy년 M월 d일', { locale: ko })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="수정"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500 disabled:opacity-50"
                          title="삭제"
                        >
                          {deleting === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
