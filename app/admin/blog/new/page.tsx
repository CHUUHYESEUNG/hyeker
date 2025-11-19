"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'
import { MarkdownEditor } from '@/components/admin/markdown-editor'
import { ImageUploader } from '@/components/admin/image-uploader'
import { createBlogPost, generateSlug, calculateReadTime } from '@/lib/firebase/firestore'
import { useAuth } from '@/components/admin/auth-provider'

export default function NewBlogPostPage() {
  const router = useRouter()
  const { user, userData } = useAuth()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '개발',
    tags: '',
    image: '',
    published: false,
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))

    // 제목 변경 시 자동으로 slug 생성
    if (field === 'title' && typeof value === 'string') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !userData) {
      alert('로그인이 필요합니다.')
      return
    }

    if (!formData.title || !formData.content) {
      alert('제목과 내용은 필수입니다.')
      return
    }

    try {
      setSaving(true)

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const readTime = calculateReadTime(formData.content)

      await createBlogPost({
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        readTime,
        image: formData.image || '/sample1.jpg',
        authorId: user.uid,
        authorName: userData.name || userData.email || '작성자',
        authorAvatar: '',
        published: formData.published,
      })

      alert('포스트가 저장되었습니다!')
      router.push('/admin/blog')
    } catch (error) {
      console.error('저장 실패:', error)
      alert('저장에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const categories = ['개발', '보안', 'AI/ML', '커리어', '일상']

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">새 포스트 작성</h2>
            <p className="text-muted-foreground mt-1">Markdown으로 블로그 포스트를 작성하세요</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">기본 정보</h3>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="블로그 포스트 제목"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="auto-generated-slug"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              비워두면 제목에서 자동 생성됩니다
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              발췌문 (요약)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="포스트의 간단한 요약 (1-2문장)"
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                카테고리
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleChange('tags', e.target.value)}
                placeholder="React, Next.js, TypeScript"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Thumbnail Image */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">썸네일 이미지</h3>
          <ImageUploader
            onUpload={(url) => handleChange('image', url)}
            currentImage={formData.image}
            label=""
          />
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">
            본문 <span className="text-red-500">*</span>
          </h3>
          <MarkdownEditor
            value={formData.content}
            onChange={(value) => handleChange('content', value)}
            placeholder="# 제목

마크다운으로 작성하세요..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => handleChange('published', e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <label htmlFor="published" className="text-sm font-medium text-foreground cursor-pointer">
              즉시 공개
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {formData.published ? '저장 및 공개' : 'Draft 저장'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
