"use client"

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { User } from 'firebase/auth'
import { onAuthChange, getUserData, UserData, isFirebaseAuthAvailable } from '@/lib/firebase/auth'
import { getCurrentUser, AuthUser } from '@/lib/util/auth'

interface AuthContextType {
  user: AuthUser | null
  firebaseUser: User | null
  userData: UserData | null
  loading: boolean
  isAdmin: boolean
  authMode: 'firebase' | 'local'
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  userData: null,
  loading: true,
  isAdmin: false,
  authMode: 'local',
  refreshUser: () => {},
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
  // Local auth state
  const [localUser, setLocalUser] = useState<AuthUser | null>(null)

  // Firebase auth state
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)

  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState<'firebase' | 'local'>('local')

  // Local auth: 사용자 정보 새로고침 함수
  const refreshUser = useCallback(() => {
    if (authMode === 'local') {
      const currentUser = getCurrentUser()
      setLocalUser(currentUser)
    }
  }, [authMode])

  useEffect(() => {
    // Firebase Auth가 설정되어 있는지 확인
    if (isFirebaseAuthAvailable()) {
      setAuthMode('firebase')

      // Firebase Auth 상태 리스너
      const unsubscribe = onAuthChange(async (user) => {
        setFirebaseUser(user)

        if (user) {
          // Firestore에서 사용자 데이터 가져오기
          const data = await getUserData(user.uid)
          setUserData(data)
        } else {
          setUserData(null)
        }

        setLoading(false)
      })

      return () => unsubscribe()
    } else {
      // Local auth 사용
      setAuthMode('local')
      const currentUser = getCurrentUser()
      setLocalUser(currentUser)
      setLoading(false)

      // storage 이벤트 리스너 (다른 탭에서 로그인/로그아웃 감지)
      const handleStorageChange = () => {
        const currentUser = getCurrentUser()
        setLocalUser(currentUser)
      }

      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // isAdmin 계산
  const isAdmin = authMode === 'firebase'
    ? userData?.role === 'admin'
    : localUser?.role === 'admin' && localUser?.isAuthenticated === true

  // user 객체 통합
  const user: AuthUser | null = authMode === 'firebase'
    ? firebaseUser
      ? {
          username: userData?.name || firebaseUser.email || 'Admin',
          role: userData?.role || 'user',
          isAuthenticated: true,
        }
      : null
    : localUser

  const value = {
    user,
    firebaseUser,
    userData,
    loading,
    isAdmin: !!isAdmin,
    authMode,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
