"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { getAllPortfolioItemsAdmin, deletePortfolioItem, PortfolioItem } from '@/lib/firebase/firestore'

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        setError('Firebase가 설정되지 않았습니다.')
        setLoading(false)
        return
      }

      const data = await getAllPortfolioItemsAdmin()
      setItems(data)
    } catch (err) {
      console.error('포트폴리오 로딩 실패:', err)
      setError('포트폴리오를 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 항목을 삭제하시겠습니까?`)) return

    try {
      setDeleting(id)
      await deletePortfolioItem(id)
      setItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error('삭제 실패:', err)
      alert('삭제에 실패했습니다.')
    } finally {
      setDeleting(null)
    }
  }

  const categoryLabels: Record<string, string> = {
    development: '개발',
    design: '디자인'
  }

  const subCategoryLabels: Record<string, string> = {
    web: '웹',
    app: '앱',
    content: '콘텐츠',
    logo: '로고',
    card: '명함'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-muted-foreground">{error}</p>
        <Link
          href="/admin"
          className="text-primary hover:underline"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">포트폴리오 관리</h2>
          <p className="text-muted-foreground mt-1">총 {items.length}개의 항목</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 항목 추가
        </Link>
      </div>

      {/* Portfolio List */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-4">아직 등록된 포트폴리오가 없습니다.</p>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            첫 번째 항목 추가하기
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={item.image || '/sample1.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                  {item.published ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                      <Eye className="w-3 h-3" />
                      공개
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      <EyeOff className="w-3 h-3" />
                      비공개
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate mb-2">{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    {categoryLabels[item.category] || item.category}
                  </span>
                  {item.subCategory && (
                    <span className="px-2 py-0.5 bg-muted rounded-full">
                      #{subCategoryLabels[item.subCategory] || item.subCategory}
                    </span>
                  )}
                  <span>{item.status}</span>
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/portfolio/${item.id}/edit`}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  disabled={deleting === item.id}
                  className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  {deleting === item.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
