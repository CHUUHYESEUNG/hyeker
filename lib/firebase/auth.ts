import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from './config'

export interface UserData {
  uid: string
  email: string
  name?: string
  role: 'admin' | 'user'
  createdAt: any
}

/**
 * 로그인
 */
export const login = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  return signOut(auth)
}

/**
 * 회원가입 (Admin 전용 - Firebase Console에서만 생성)
 */
export const signup = async (email: string, password: string, name?: string): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // Firestore에 사용자 정보 저장
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    name: name || '',
    role: 'user', // 기본값 (Admin은 수동으로 변경)
    createdAt: serverTimestamp(),
  })

  return userCredential
}

/**
 * 사용자 권한 확인
 */
export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid))

  if (!userDoc.exists()) {
    return null
  }

  return userDoc.data() as UserData
}

/**
 * Admin 권한 확인
 */
export const isAdmin = async (user: User | null): Promise<boolean> => {
  if (!user) return false

  const userData = await getUserData(user.uid)
  return userData?.role === 'admin'
}

/**
 * 인증 상태 변화 리스너
 */
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export { User }
