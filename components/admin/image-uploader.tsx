"use client"

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadBlogImage, validateImageFile } from '@/lib/firebase/storage'
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

    // Firebase Storage에 업로드
    try {
      setUploading(true)
      setProgress(0)

      const downloadURL = await uploadBlogImage(file, (prog) => {
        setProgress(Math.round(prog))
      })

      onUpload(downloadURL)
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
                  JPG, PNG, WebP, GIF (최대 5MB)
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
