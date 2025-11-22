/**
 * Cloudinary 이미지 업로드 유틸리티
 *
 * 사용법:
 * 1. Cloudinary 계정 생성: https://cloudinary.com
 * 2. Dashboard에서 Cloud Name 확인
 * 3. Settings > Upload > Upload presets에서 unsigned preset 생성
 * 4. .env.local에 환경변수 추가
 */

export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
  width: number
  height: number
  format: string
  bytes: number
}

/**
 * Cloudinary에 이미지 업로드 (Unsigned Upload)
 * 서버 사이드 시크릿 키 없이 클라이언트에서 직접 업로드
 */
export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResult> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary 환경변수가 설정되지 않았습니다.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', 'blog') // 블로그 이미지 폴더

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)

    // 진행률 추적
    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100
          onProgress(progress)
        }
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        resolve({
          secure_url: response.secure_url,
          public_id: response.public_id,
          width: response.width,
          height: response.height,
          format: response.format,
          bytes: response.bytes,
        })
      } else {
        reject(new Error(`업로드 실패: ${xhr.statusText}`))
      }
    }

    xhr.onerror = () => {
      reject(new Error('네트워크 오류가 발생했습니다.'))
    }

    xhr.send(formData)
  })
}

/**
 * 파일 검증 (이미지만 허용)
 */
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 10 * 1024 * 1024 // 10MB (Cloudinary 무료 플랜 제한)

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: '이미지 파일만 업로드 가능합니다. (jpg, png, webp, gif)',
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: '파일 크기는 10MB 이하여야 합니다.',
    }
  }

  return { valid: true }
}

/**
 * Cloudinary 설정 확인
 */
export const isCloudinaryConfigured = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  )
}

/**
 * Cloudinary URL인지 확인
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('res.cloudinary.com')
}

/**
 * Cloudinary URL에서 public_id 추출
 * 예: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/image.jpg
 *     -> folder/image
 */
export const extractPublicId = (url: string): string | null => {
  if (!isCloudinaryUrl(url)) return null

  try {
    // URL에서 upload/ 이후 부분 추출
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex === -1) return null

    let path = url.substring(uploadIndex + 8) // '/upload/' 이후

    // 버전 번호 제거 (v123456 형식)
    if (path.startsWith('v') && /^v\d+\//.test(path)) {
      path = path.replace(/^v\d+\//, '')
    }

    // 확장자 제거
    const lastDot = path.lastIndexOf('.')
    if (lastDot !== -1) {
      path = path.substring(0, lastDot)
    }

    return path
  } catch {
    return null
  }
}

interface ImageTransformOptions {
  width?: number
  height?: number
  quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  crop?: 'fill' | 'scale' | 'fit' | 'limit' | 'thumb' | 'crop'
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west'
}

/**
 * 최적화된 Cloudinary 이미지 URL 생성
 *
 * @param url - 원본 Cloudinary URL 또는 다른 이미지 URL
 * @param options - 변환 옵션
 * @returns 최적화된 URL (Cloudinary가 아닌 URL은 그대로 반환)
 *
 * 사용 예시:
 * getOptimizedImageUrl(imageUrl, { width: 800, quality: 'auto', format: 'auto' })
 */
export const getOptimizedImageUrl = (
  url: string,
  options: ImageTransformOptions = {}
): string => {
  // Cloudinary URL이 아니면 그대로 반환
  if (!isCloudinaryUrl(url)) return url

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) return url

  const publicId = extractPublicId(url)
  if (!publicId) return url

  // 변환 파라미터 생성
  const transforms: string[] = []

  // 기본 자동 최적화
  const format = options.format ?? 'auto'
  const quality = options.quality ?? 'auto'

  transforms.push(`f_${format}`)
  transforms.push(`q_${quality}`)

  // 크기 제한
  if (options.width) {
    transforms.push(`w_${options.width}`)
  }
  if (options.height) {
    transforms.push(`h_${options.height}`)
  }

  // 크롭 모드
  if (options.crop) {
    transforms.push(`c_${options.crop}`)
  }

  // 중심점
  if (options.gravity) {
    transforms.push(`g_${options.gravity}`)
  }

  const transformation = transforms.join(',')
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`
}

/**
 * 블로그 썸네일용 최적화 URL
 */
export const getBlogThumbnailUrl = (url: string): string => {
  return getOptimizedImageUrl(url, {
    width: 800,
    quality: 'auto',
    format: 'auto',
    crop: 'limit'
  })
}

/**
 * 블로그 상세 이미지용 최적화 URL
 */
export const getBlogDetailImageUrl = (url: string): string => {
  return getOptimizedImageUrl(url, {
    width: 1200,
    quality: 'auto:good',
    format: 'auto',
    crop: 'limit'
  })
}

/**
 * 포트폴리오 카드 썸네일용 최적화 URL
 */
export const getPortfolioThumbnailUrl = (url: string): string => {
  return getOptimizedImageUrl(url, {
    width: 600,
    height: 400,
    quality: 'auto',
    format: 'auto',
    crop: 'fill',
    gravity: 'auto'
  })
}

/**
 * 아바타/프로필 이미지용 최적화 URL
 */
export const getAvatarUrl = (url: string, size: number = 100): string => {
  return getOptimizedImageUrl(url, {
    width: size,
    height: size,
    quality: 'auto',
    format: 'auto',
    crop: 'fill',
    gravity: 'face'
  })
}
