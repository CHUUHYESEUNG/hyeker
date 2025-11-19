"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-provider'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // 로그인하지 않은 경우
        router.push('/admin/login')
      } else if (!isAdmin) {
        // 로그인했지만 Admin이 아닌 경우
        router.push('/')
      }
    }
  }, [user, loading, isAdmin, router])

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // 권한 없음
  if (!user || !isAdmin) {
    return null
  }

  // Admin 권한 있음
  return <>{children}</>
}
