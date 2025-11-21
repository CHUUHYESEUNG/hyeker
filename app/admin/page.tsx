"use client"

import { useEffect, useState } from 'react'
import { FileText, Briefcase, Eye, TrendingUp, AlertTriangle } from 'lucide-react'
import { getAllBlogPostsAdmin } from '@/lib/firebase/firestore'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalPortfolio: 0,
  })
  const [loading, setLoading] = useState(true)
  const [firebaseError, setFirebaseError] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      // Firebase 설정 확인
      if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        setFirebaseError(true)
        setLoading(false)
        return
      }

      try {
        const posts = await getAllBlogPostsAdmin()
        const published = posts.filter(post => post.published).length
        const drafts = posts.filter(post => !post.published).length

        setStats({
          totalBlogPosts: posts.length,
          publishedPosts: published,
          draftPosts: drafts,
          totalPortfolio: 0, // TODO: 포트폴리오 API 추가 시
        })
      } catch (error) {
        console.error('통계 가져오기 실패:', error)
        setFirebaseError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      name: '총 블로그 포스트',
      value: stats.totalBlogPosts,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: '공개 포스트',
      value: stats.publishedPosts,
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Draft',
      value: stats.draftPosts,
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      name: '포트폴리오',
      value: stats.totalPortfolio,
      icon: Briefcase,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (firebaseError) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">대시보드</h2>
          <p className="text-muted-foreground mt-1">HYEKER Admin Panel</p>
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
                <p>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com</p>
                <p>NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id</p>
                <p>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com</p>
                <p>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id</p>
                <p>NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">빠른 작업</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/admin/blog/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">새 블로그 포스트 작성</p>
                <p className="text-sm text-muted-foreground">Firebase 설정 후 사용 가능</p>
              </div>
            </a>
            <a
              href="/admin/blog"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">블로그 관리</p>
                <p className="text-sm text-muted-foreground">Firebase 설정 후 사용 가능</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">대시보드</h2>
        <p className="text-muted-foreground mt-1">HYEKER Admin Panel 통계 및 현황</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">빠른 작업</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/blog/new"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">새 블로그 포스트 작성</p>
              <p className="text-sm text-muted-foreground">Markdown 에디터로 글 작성</p>
            </div>
          </a>
          <a
            href="/admin/blog"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">블로그 관리</p>
              <p className="text-sm text-muted-foreground">기존 포스트 수정/삭제</p>
            </div>
          </a>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">환영합니다! 👋</h3>
        <p className="text-muted-foreground">
          Firebase 기반 Admin 패널이 성공적으로 구축되었습니다.
          <br />
          이제 블로그 포스트를 작성하고 관리할 수 있습니다.
        </p>
      </div>
    </div>
  )
}
