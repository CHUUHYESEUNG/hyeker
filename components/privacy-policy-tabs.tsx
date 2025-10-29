"use client"

import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ListState = {
  type: "ul" | "ol"
  items: string[]
}

type PrivacyPolicyTabsProps = {
  english: string
  korean: string
}

function parseInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = []
  let cursor = 0
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let match: RegExpExecArray | null
  let counter = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index))
    }

    const token = match[0]
    if (token.startsWith("**")) {
      const boldText = token.slice(2, -2)
      nodes.push(
        <strong key={`${keyPrefix}-bold-${counter++}`} className="text-foreground">
          {boldText}
        </strong>
      )
    } else if (token.startsWith("[")) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token)
      if (linkMatch) {
        const [, label, url] = linkMatch
        nodes.push(
          <a
            key={`${keyPrefix}-link-${counter++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary/80"
          >
            {label}
          </a>
        )
      } else {
        nodes.push(token)
      }
    } else {
      nodes.push(token)
    }

    cursor = match.index + token.length
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor))
  }

  return nodes
}

function renderPolicyContent(content: string) {
  const lines = content.split(/\r?\n/)
  const elements: React.ReactNode[] = []
  let listState: ListState | null = null
  let tableLines: string[] = []
  let asideLines: string[] = []
  let inAside = false
  let key = 0

  const nextKey = () => `policy-${++key}`

  const flushList = () => {
    if (!listState) return
    if (listState.items.length === 0) {
      listState = null
      return
    }

    if (listState.type === "ul") {
      elements.push(
        <ul key={nextKey()} className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
          {listState.items.map((item, idx) => (
            <li key={idx}>{parseInline(item, `${nextKey()}-ul-${idx}`)}</li>
          ))}
        </ul>
      )
    } else {
      elements.push(
        <ol key={nextKey()} className="list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
          {listState.items.map((item, idx) => (
            <li key={idx}>{parseInline(item, `${nextKey()}-ol-${idx}`)}</li>
          ))}
        </ol>
      )
    }
    listState = null
  }

  const flushTable = () => {
    if (tableLines.length === 0) return
    const cleaned = tableLines
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    if (cleaned.length < 2) {
      tableLines = []
      return
    }

    const header = cleaned[0].split("|").map((cell) => cell.trim()).filter(Boolean)
    const bodyLines = cleaned.slice(2).map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean))

    elements.push(
      <div key={nextKey()} className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 text-muted-foreground">
              {header.map((cell, idx) => (
                <th key={idx} className="px-4 py-2 text-left font-semibold">
                  {parseInline(cell, `${nextKey()}-th-${idx}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyLines.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-t border-border/40 text-muted-foreground">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-2 align-top">
                    {parseInline(cell, `${nextKey()}-td-${rowIdx}-${cellIdx}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  tableLines = []
  }

  const flushAside = () => {
    if (asideLines.length === 0) return
    const contentLines = asideLines.filter((line) => line.trim().length > 0)
    if (contentLines.length === 0) {
      asideLines = []
      return
    }
    const paragraphs = contentLines.join("\n").split(/\n{2,}/)

    elements.push(
      <div
        key={nextKey()}
        className="rounded-3xl border border-primary/30 bg-primary/10 p-6 text-sm text-primary-foreground/80 shadow-inner"
      >
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className={idx === 0 ? "font-semibold" : undefined}>
            {parseInline(paragraph, `${nextKey()}-aside-${idx}`)}
          </p>
        ))}
      </div>
    )
    asideLines = []
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "")
    const trimmed = line.trim()

    if (!inAside && trimmed.startsWith("<aside")) {
      flushList()
      flushTable()
      inAside = true
      asideLines = []
      continue
    }

    if (inAside) {
      if (trimmed === "</aside>") {
        flushAside()
        inAside = false
      } else {
        asideLines.push(trimmed)
      }
      continue
    }

    if (trimmed.startsWith("|")) {
      tableLines.push(trimmed)
      continue
    } else {
      flushTable()
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/)
    if (orderedMatch) {
      const [, , itemText] = orderedMatch
      if (!listState || listState.type !== "ol") {
        flushList()
        listState = { type: "ol", items: [] }
      }
      listState.items.push(itemText.trim())
      continue
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const itemText = trimmed.slice(2).trim()
      if (!listState || listState.type !== "ul") {
        flushList()
        listState = { type: "ul", items: [] }
      }
      listState.items.push(itemText)
      continue
    }

    if (trimmed.length === 0) {
      flushList()
      continue
    }

    flushList()

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={nextKey()} className="text-lg font-semibold text-foreground">
          {parseInline(trimmed.replace("### ", ""), `${nextKey()}-h3`)}
        </h3>
      )
      continue
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={nextKey()} className="text-xl font-semibold text-foreground">
          {parseInline(trimmed.replace("## ", ""), `${nextKey()}-h2`)}
        </h2>
      )
      continue
    }
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={nextKey()} className="text-2xl font-bold text-foreground">
          {parseInline(trimmed.replace("# ", ""), `${nextKey()}-h1`)}
        </h1>
      )
      continue
    }

    if (/^[-]{3,}$/.test(trimmed)) {
      elements.push(<hr key={nextKey()} className="border-border/40" />)
      continue
    }

    elements.push(
      <p key={nextKey()} className="text-sm leading-relaxed text-muted-foreground">
        {parseInline(trimmed, `${nextKey()}-p`)}
      </p>
    )
  }

  flushAside()
  flushTable()
  flushList()

  return <div className="space-y-6">{elements}</div>
}

export function PrivacyPolicyTabs({ english, korean }: PrivacyPolicyTabsProps) {
  const englishContent = useMemo(() => renderPolicyContent(english), [english])
  const koreanContent = useMemo(() => renderPolicyContent(korean), [korean])

  return (
    <Tabs defaultValue="ko" className="mx-auto max-w-4xl items-center">
      <TabsList className="grid grid-cols-2 rounded-full bg-muted p-1">
        <TabsTrigger value="ko" className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground">
          한국어
        </TabsTrigger>
        <TabsTrigger value="en" className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground">
          English
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ko" className="mt-10">
        <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow">
          {koreanContent}
        </div>
      </TabsContent>
      <TabsContent value="en" className="mt-10">
        <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow">
          {englishContent}
        </div>
      </TabsContent>
    </Tabs>
  )
}
