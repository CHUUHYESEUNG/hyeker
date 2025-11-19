import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage'
import { storage } from './config'

/**
 * 이미지 업로드 (Blog)
 */
export const uploadBlogImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`
  const storageRef = ref(storage, `blog/${filename}`)

  if (onProgress) {
    // 프로그레스 바 지원
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress(progress)
        },
        (error) => {
          reject(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        }
      )
    })
  } else {
    // 단순 업로드
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }
}

/**
 * 이미지 업로드 (Portfolio)
 */
export const uploadPortfolioImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`
  const storageRef = ref(storage, `portfolio/${filename}`)

  if (onProgress) {
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress(progress)
        },
        (error) => {
          reject(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        }
      )
    })
  } else {
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }
}

/**
 * 이미지 삭제
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('이미지 삭제 실패:', error)
    // URL이 유효하지 않거나 이미 삭제된 경우 무시
  }
}

/**
 * 파일 검증 (이미지만 허용)
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: '이미지 파일만 업로드 가능합니다. (jpg, png, webp, gif)',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: '파일 크기는 5MB 이하여야 합니다.',
    }
  }

  return { valid: true }
}
