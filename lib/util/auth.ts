// 간단한 하드코딩 인증 (Firebase Auth 없이)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'hs0505',
}

export interface AuthUser {
  username: string
  role: 'admin'
  isAuthenticated: boolean
}

/**
 * 로그인 (하드코딩된 자격증명 체크)
 */
export const login = (username: string, password: string): AuthUser | null => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const user: AuthUser = {
      username: ADMIN_CREDENTIALS.username,
      role: 'admin',
      isAuthenticated: true,
    }

    // localStorage에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_user', JSON.stringify(user))
    }

    return user
  }

  return null
}

/**
 * 로그아웃
 */
export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_user')
  }
}

/**
 * 현재 로그인 상태 확인
 */
export const getCurrentUser = (): AuthUser | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('admin_user')
    if (userJson) {
      try {
        return JSON.parse(userJson)
      } catch {
        return null
      }
    }
  }
  return null
}

/**
 * Admin 권한 확인
 */
export const isAdmin = (): boolean => {
  const user = getCurrentUser()
  return user?.role === 'admin' && user?.isAuthenticated === true
}
