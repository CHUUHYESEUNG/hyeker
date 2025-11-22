import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage, FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Firebase 설정 여부 확인
export const isFirebaseConfigured = (): boolean => {
  const apiKey = firebaseConfig.apiKey
  const projectId = firebaseConfig.projectId
  const authDomain = firebaseConfig.authDomain

  // 빈 문자열, undefined, "undefined" 문자열 모두 체크
  const isValidValue = (val: string | undefined): boolean => {
    return !!(val && val !== 'undefined' && val.trim() !== '')
  }

  return isValidValue(apiKey) && isValidValue(projectId) && isValidValue(authDomain)
}

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (error) {
    console.error('Firebase 초기화 실패:', error)
  }
}

export { db, storage }
export default app
