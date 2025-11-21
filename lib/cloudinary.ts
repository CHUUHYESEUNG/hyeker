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
