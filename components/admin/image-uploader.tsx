"use client"

import { useState, useRef } from 'react'
import { Upload, X, Loader2, AlertTriangle } from 'lucide-react'
import { uploadToCloudinary, validateImageFile, isCloudinaryConfigured } from '@/lib/cloudinary'
import Image from 'next/image'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  currentImage?: string
  label?: string
}

export function ImageUploader({ onUpload, currentImage, label = "이미지" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const cloudinaryConfigured = isCloudinaryConfigured()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // 파일 검증
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error!)
      return
    }

    // 미리보기 생성
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Cloudinary에 업로드
    try {
      setUploading(true)
      setProgress(0)

      const result = await uploadToCloudinary(file, (prog) => {
        setProgress(Math.round(prog))
      })

      onUpload(result.secure_url)
      setError(null)
    } catch (err) {
      console.error('이미지 업로드 실패:', err)
      setError('이미지 업로드에 실패했습니다.')
      setPreviewUrl(null)
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Cloudinary 미설정 시 안내
  if (!cloudinaryConfigured) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-2">Cloudinary 설정 필요</p>
              <p className="text-muted-foreground mb-3">
                이미지 업로드를 위해 Cloudinary를 설정해주세요.
              </p>
              <div className="bg-background/50 rounded p-3 font-mono text-xs">
                <p className="text-muted-foreground mb-1"># .env.local</p>
                <p>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name</p>
                <p>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>

      {/* Preview */}
      {previewUrl && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted/20">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          {!uploading && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                <p className="text-sm font-medium">{progress}%</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Button */}
      {!previewUrl && (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? (
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{progress}%</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">클릭하여 이미지 업로드</p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WebP, GIF (최대 10MB)
                </p>
              </div>
            )}
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
