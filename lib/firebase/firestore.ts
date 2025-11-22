import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/util/firebase'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // Markdown
  category: string
  tags: string[]
  date: Timestamp
  readTime: string
  image: string
  authorId: string
  authorName: string
  authorAvatar: string
  published: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface BlogPostInput {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  readTime: string
  image: string
  authorId: string
  authorName: string
  authorAvatar: string
  published: boolean
}

// Blog Posts CRUD

/**
 * 모든 블로그 포스트 가져오기 (공개만)
 */
export const getBlogPosts = async (categoryFilter?: string): Promise<BlogPost[]> => {
  const constraints: QueryConstraint[] = [
    where('published', '==', true),
    orderBy('date', 'desc'),
  ]

  if (categoryFilter && categoryFilter !== 'all' && categoryFilter !== '전체') {
    constraints.push(where('category', '==', categoryFilter))
  }

  const q = query(collection(db, 'blog_posts'), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[]
}

/**
 * Admin: 모든 블로그 포스트 가져오기 (Draft 포함)
 */
export const getAllBlogPostsAdmin = async (): Promise<BlogPost[]> => {
  const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[]
}

/**
 * 단일 블로그 포스트 가져오기 (ID)
 */
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const docRef = doc(db, 'blog_posts', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as BlogPost
}

/**
 * 단일 블로그 포스트 가져오기 (Slug)
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const q = query(collection(db, 'blog_posts'), where('slug', '==', slug), limit(1))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    return null
  }

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
  } as BlogPost
}

/**
 * 블로그 포스트 생성
 */
export const createBlogPost = async (data: BlogPostInput): Promise<string> => {
  const docRef = await addDoc(collection(db, 'blog_posts'), {
    ...data,
    date: Timestamp.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

/**
 * 블로그 포스트 수정
 */
export const updateBlogPost = async (id: string, data: Partial<BlogPostInput>): Promise<void> => {
  const docRef = doc(db, 'blog_posts', id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

/**
 * 블로그 포스트 삭제
 */
export const deleteBlogPost = async (id: string): Promise<void> => {
  const docRef = doc(db, 'blog_posts', id)
  await deleteDoc(docRef)
}

/**
 * Slug 생성 헬퍼
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-가-힣]/g, '') // 특수문자 제거 (한글 유지)
    .replace(/[\s_-]+/g, '-') // 공백을 하이픈으로
    .replace(/^-+|-+$/g, '') // 시작/끝 하이픈 제거
}

/**
 * 읽기 시간 계산 (간단한 로직)
 */
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200 // 한국어 평균 읽기 속도
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes}분`
}

// ================================
// Portfolio Items CRUD
// ================================

export type PortfolioCategory = 'development' | 'design'
export type DevelopmentSubCategory = 'web' | 'app'
export type DesignSubCategory = 'content' | 'logo' | 'card'

export interface PortfolioPlatform {
  type: 'web' | 'ios' | 'android'
  icon: 'globe' | 'smartphone'
  label: string
  url: string
  available: boolean
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  longDescription: string
  tech: string[]
  platforms: PortfolioPlatform[]
  image: string
  status: string
  date: string
  features: string[]
  category: PortfolioCategory
  subCategory?: DevelopmentSubCategory | DesignSubCategory
  showPlatforms?: boolean
  showDetailLink?: boolean
  published: boolean
  order: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface PortfolioItemInput {
  title: string
  description: string
  longDescription: string
  tech: string[]
  platforms: PortfolioPlatform[]
  image: string
  status: string
  date: string
  features: string[]
  category: PortfolioCategory
  subCategory?: DevelopmentSubCategory | DesignSubCategory
  showPlatforms?: boolean
  showDetailLink?: boolean
  published: boolean
  order?: number
}

/**
 * 모든 포트폴리오 아이템 가져오기 (공개만)
 */
export const getPortfolioItems = async (categoryFilter?: PortfolioCategory): Promise<PortfolioItem[]> => {
  const constraints: QueryConstraint[] = [
    where('published', '==', true),
    orderBy('order', 'asc'),
  ]

  if (categoryFilter) {
    constraints.push(where('category', '==', categoryFilter))
  }

  const q = query(collection(db, 'portfolio_items'), ...constraints)
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as PortfolioItem[]
}

/**
 * Admin: 모든 포트폴리오 아이템 가져오기 (Draft 포함)
 */
export const getAllPortfolioItemsAdmin = async (): Promise<PortfolioItem[]> => {
  const q = query(collection(db, 'portfolio_items'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as PortfolioItem[]
}

/**
 * 단일 포트폴리오 아이템 가져오기 (ID)
 */
export const getPortfolioItem = async (id: string): Promise<PortfolioItem | null> => {
  const docRef = doc(db, 'portfolio_items', id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as PortfolioItem
}

/**
 * 포트폴리오 아이템 생성
 */
export const createPortfolioItem = async (data: PortfolioItemInput): Promise<string> => {
  // 현재 아이템 수를 가져와서 order 설정
  const existingItems = await getAllPortfolioItemsAdmin()
  const maxOrder = existingItems.length > 0
    ? Math.max(...existingItems.map(item => item.order || 0))
    : 0

  const docRef = await addDoc(collection(db, 'portfolio_items'), {
    ...data,
    order: data.order ?? maxOrder + 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}

/**
 * 포트폴리오 아이템 수정
 */
export const updatePortfolioItem = async (id: string, data: Partial<PortfolioItemInput>): Promise<void> => {
  const docRef = doc(db, 'portfolio_items', id)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

/**
 * 포트폴리오 아이템 삭제
 */
export const deletePortfolioItem = async (id: string): Promise<void> => {
  const docRef = doc(db, 'portfolio_items', id)
  await deleteDoc(docRef)
}
