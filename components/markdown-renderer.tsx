"use client"

import { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Check, Copy } from 'lucide-react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

// 코드 블록 복사 버튼 컴포넌트
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('복사 실패:', err)
    }
  }, [code])

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
      title={copied ? '복사됨!' : '코드 복사'}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
        // 코드 블록 커스터마이징
        pre({ children, ...props }) {
          // children에서 코드 텍스트 추출
          let codeString = ''
          try {
            const codeElement = children as React.ReactElement<{ children?: string }>
            if (codeElement?.props?.children && typeof codeElement.props.children === 'string') {
              codeString = codeElement.props.children
            }
          } catch {
            // 코드 추출 실패 시 복사 버튼 비활성화
          }

          return (
            <div className="group relative">
              <pre
                {...props}
                className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 text-sm leading-relaxed"
              >
                {children}
              </pre>
              {codeString && <CopyButton code={codeString} />}
            </div>
          )
        },
        // 인라인 코드
        code({ className, children, ...props }) {
          const isInline = !className
          if (isInline) {
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-muted text-primary font-mono text-sm"
                {...props}
              >
                {children}
              </code>
            )
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        // 링크
        a({ href, children, ...props }) {
          const isExternal = href?.startsWith('http')
          return (
            <a
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-primary hover:underline"
              {...props}
            >
              {children}
            </a>
          )
        },
        // 이미지
        img({ src, alt, ...props }) {
          return (
            <span className="block my-6">
              <img
                src={src}
                alt={alt || ''}
                className="rounded-lg max-w-full h-auto mx-auto"
                loading="lazy"
                {...props}
              />
              {alt && (
                <span className="block text-center text-sm text-muted-foreground mt-2">
                  {alt}
                </span>
              )}
            </span>
          )
        },
        // 블록쿼트
        blockquote({ children, ...props }) {
          return (
            <blockquote
              className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6"
              {...props}
            >
              {children}
            </blockquote>
          )
        },
        // 테이블
        table({ children, ...props }) {
          return (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse" {...props}>
                {children}
              </table>
            </div>
          )
        },
        th({ children, ...props }) {
          return (
            <th
              className="border border-border bg-muted px-4 py-2 text-left font-semibold"
              {...props}
            >
              {children}
            </th>
          )
        },
        td({ children, ...props }) {
          return (
            <td className="border border-border px-4 py-2" {...props}>
              {children}
            </td>
          )
        },
        // 헤딩에 앵커 추가
        h2({ children, ...props }) {
          const id = typeof children === 'string'
            ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            : undefined
          return (
            <h2 id={id} className="scroll-mt-20" {...props}>
              {children}
            </h2>
          )
        },
        h3({ children, ...props }) {
          const id = typeof children === 'string'
            ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            : undefined
          return (
            <h3 id={id} className="scroll-mt-20" {...props}>
              {children}
            </h3>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  )
}
