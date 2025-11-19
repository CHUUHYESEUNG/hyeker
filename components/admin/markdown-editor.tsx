"use client"

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'

// SimpleMDE는 client-side only
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="border border-border rounded-lg p-4 bg-muted/20">
        <p className="text-muted-foreground text-sm">에디터 로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="markdown-editor-wrapper">
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          placeholder: placeholder || '마크다운으로 작성하세요...',
          spellChecker: false,
          autofocus: false,
          status: ['lines', 'words', 'cursor'],
          toolbar: [
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'unordered-list',
            'ordered-list',
            '|',
            'link',
            'image',
            '|',
            'preview',
            'side-by-side',
            'fullscreen',
            '|',
            'guide',
          ],
          previewClass: ['editor-preview', 'prose', 'prose-sm', 'max-w-none'],
        }}
      />
    </div>
  )
}
