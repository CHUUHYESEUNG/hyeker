"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login as localLogin } from '@/lib/util/auth'
import { login as firebaseLogin } from '@/lib/firebase/auth'
import { useAuth } from '@/components/admin/auth-provider'
import { Terminal, Lock, User, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, isAdmin, authMode, refreshUser } = useAuth()

  // 이미 로그인된 Admin이면 리다이렉트
  useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin')
    }
  }, [user, isAdmin, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (authMode === 'firebase') {
        // Firebase Auth 로그인
        await firebaseLogin(email, password)
        router.push('/admin')
      } else {
        // Local Auth 로그인 (기존 방식)
        const authUser = localLogin(email, password)

        if (authUser) {
          refreshUser()
          router.push('/admin')
        } else {
          setError('아이디 또는 비밀번호가 올바르지 않습니다.')
        }
      }
    } catch (err: unknown) {
      console.error('로그인 실패:', err)

      // Firebase Auth 에러 처리
      if (err && typeof err === 'object' && 'code' in err) {
        const firebaseError = err as { code: string }
        switch (firebaseError.code) {
          case 'auth/user-not-found':
            setError('등록되지 않은 이메일입니다.')
            break
          case 'auth/wrong-password':
            setError('비밀번호가 올바르지 않습니다.')
            break
          case 'auth/invalid-email':
            setError('유효하지 않은 이메일 형식입니다.')
            break
          case 'auth/too-many-requests':
            setError('너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.')
            break
          default:
            setError('로그인에 실패했습니다. 다시 시도해주세요.')
        }
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.')
      }
    } finally {
      setLoading(false)
    }
  }

  const isFirebase = authMode === 'firebase'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Terminal className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-2">
            HYEKER 블로그 관리자 로그인
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email/Username Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {isFirebase ? '이메일' : '아이디'}
              </label>
              <div className="relative">
                {isFirebase ? (
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                ) : (
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                )}
                <input
                  id="email"
                  type={isFirebase ? 'email' : 'text'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isFirebase ? 'admin@example.com' : 'admin'}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                  autoComplete={isFirebase ? 'email' : 'username'}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            {isFirebase ? (
              <span>Firebase Authentication 사용 중</span>
            ) : (
              <span>테스트 계정: admin / hs0505</span>
            )}
          </div>
        </div>

        {/* Auth Mode Indicator */}
        <div className="mt-4 text-center">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
            isFirebase
              ? 'bg-green-500/10 text-green-500'
              : 'bg-yellow-500/10 text-yellow-500'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isFirebase ? 'bg-green-500' : 'bg-yellow-500'
            }`}></span>
            {isFirebase ? 'Firebase Auth' : 'Local Auth'}
          </span>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}
