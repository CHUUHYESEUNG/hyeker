"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ImageUploader } from '@/components/admin/image-uploader'
import { createPortfolioItem, PortfolioPlatform, PortfolioCategory, DevelopmentSubCategory, DesignSubCategory } from '@/lib/firebase/firestore'

export default function NewPortfolioPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    tech: '',
    image: '',
    status: '진행중',
    date: '',
    features: '',
    category: 'development' as PortfolioCategory,
    subCategory: 'web' as DevelopmentSubCategory | DesignSubCategory,
    showPlatforms: true,
    showDetailLink: false,
    published: false,
  })
  const [platforms, setPlatforms] = useState<PortfolioPlatform[]>([])

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))

    // 카테고리 변경 시 서브카테고리 초기화
    if (field === 'category') {
      setFormData(prev => ({
        ...prev,
        subCategory: value === 'development' ? 'web' : 'content',
      }))
    }
  }

  const addPlatform = () => {
    setPlatforms(prev => [...prev, {
      type: 'web',
      icon: 'globe',
      label: '',
      url: '',
      available: true
    }])
  }

  const updatePlatform = (index: number, field: keyof PortfolioPlatform, value: string | boolean) => {
    setPlatforms(prev => prev.map((p, i) => {
      if (i !== index) return p
      const updated = { ...p, [field]: value }
      // type 변경 시 icon 자동 설정
      if (field === 'type') {
        updated.icon = value === 'web' ? 'globe' : 'smartphone'
      }
      return updated
    }))
  }

  const removePlatform = (index: number) => {
    setPlatforms(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      alert('제목과 설명은 필수입니다.')
      return
    }

    try {
      setSaving(true)

      const techArray = formData.tech
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

      const featuresArray = formData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0)

      await createPortfolioItem({
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription,
        tech: techArray,
        platforms: platforms,
        image: formData.image || '/sample1.jpg',
        status: formData.status,
        date: formData.date,
        features: featuresArray,
        category: formData.category,
        subCategory: formData.subCategory,
        showPlatforms: formData.showPlatforms,
        showDetailLink: formData.showDetailLink,
        published: formData.published,
      })

      alert('포트폴리오가 등록되었습니다!')
      router.push('/admin/portfolio')
    } catch (error) {
      console.error('등록 실패:', error)
      alert('등록에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const categories = [
    { value: 'development', label: '개발' },
    { value: 'design', label: '디자인' },
  ]

  const devSubCategories = [
    { value: 'web', label: '웹' },
    { value: 'app', label: '앱' },
  ]

  const designSubCategories = [
    { value: 'content', label: '콘텐츠' },
    { value: 'logo', label: '로고' },
    { value: 'card', label: '명함' },
  ]

  const statusOptions = ['운영중', '진행중', '완료', '앱 심사 진행중', '작업 가능']

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/portfolio"
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-foreground">새 포트폴리오</h2>
          <p className="text-muted-foreground mt-1">새로운 포트폴리오 항목을 추가합니다</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">기본 정보</h3>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="프로젝트 제목"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              짧은 설명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="한 줄 설명"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              상세 설명
            </label>
            <textarea
              value={formData.longDescription}
              onChange={(e) => handleChange('longDescription', e.target.value)}
              placeholder="프로젝트에 대한 상세한 설명"
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Category & SubCategory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">서브카테고리</label>
              <select
                value={formData.subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {(formData.category === 'development' ? devSubCategories : designSubCategories).map(sub => (
                  <option key={sub.value} value={sub.value}>{sub.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">상태</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">기간</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder="2025.01 - 현재"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">기술 스택 (쉼표로 구분)</label>
              <input
                type="text"
                value={formData.tech}
                onChange={(e) => handleChange('tech', e.target.value)}
                placeholder="React, Next.js, TypeScript"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">주요 기능 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.features}
              onChange={(e) => handleChange('features', e.target.value)}
              placeholder="반응형 디자인&#10;실시간 데이터 처리&#10;API 연동"
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">썸네일 이미지</h3>
          <ImageUploader
            onUpload={(url) => handleChange('image', url)}
            currentImage={formData.image}
            label=""
          />
        </div>

        {/* Platforms */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">플랫폼 링크</h3>
            <button
              type="button"
              onClick={addPlatform}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Plus className="w-4 h-4" />
              추가
            </button>
          </div>

          {platforms.length === 0 ? (
            <p className="text-sm text-muted-foreground">등록된 플랫폼이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <select
                    value={platform.type}
                    onChange={(e) => updatePlatform(index, 'type', e.target.value)}
                    className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  >
                    <option value="web">웹</option>
                    <option value="ios">iOS</option>
                    <option value="android">Android</option>
                  </select>
                  <input
                    type="text"
                    value={platform.label}
                    onChange={(e) => updatePlatform(index, 'label', e.target.value)}
                    placeholder="레이블"
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={platform.url}
                    onChange={(e) => updatePlatform(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={platform.available}
                      onChange={(e) => updatePlatform(index, 'available', e.target.checked)}
                      className="w-4 h-4"
                    />
                    활성
                  </label>
                  <button
                    type="button"
                    onClick={() => removePlatform(index)}
                    className="p-1 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">표시 옵션</h3>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showPlatforms}
                onChange={(e) => handleChange('showPlatforms', e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">플랫폼 링크 표시</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showDetailLink}
                onChange={(e) => handleChange('showDetailLink', e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">상세 페이지 링크 표시</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange('published', e.target.checked)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm font-medium">공개</span>
          </label>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/portfolio"
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  등록하기
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
