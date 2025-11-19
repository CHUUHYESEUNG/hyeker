"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getCurrentUser, AuthUser } from '@/lib/util/auth'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 로드 시 localStorage에서 사용자 정보 가져오기
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // storage 이벤트 리스너 (다른 탭에서 로그인/로그아웃 감지)
    const handleStorageChange = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const value = {
    user,
    loading,
    isAdmin: user?.role === 'admin' && user?.isAuthenticated === true,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
