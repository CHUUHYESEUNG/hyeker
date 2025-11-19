"use client"

import { useEffect, useState } from "react"
import { m, AnimatePresence } from "framer-motion"
import { List, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 페이지의 모든 h2, h3 태그 수집
    const elements = Array.from(
      document.querySelectorAll(".prose h2, .prose h3")
    )

    const headingData: Heading[] = elements.map((element, index) => {
      // ID가 없으면 생성
      if (!element.id) {
        const id = `heading-${index}`
        element.id = id
      }

      return {
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      }
    })

    setHeadings(headingData)

    // Intersection Observer로 현재 보이는 섹션 추적
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66% 0px",
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
      setIsOpen(false)
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* Desktop: Fixed sidebar */}
      <div className="hidden xl:block fixed right-8 top-32 w-64">
        <div className="sticky top-32">
          <h3 className="text-sm font-semibold mb-4 text-foreground/80">목차</h3>
          <nav className="space-y-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm transition-colors ${
                  activeId === heading.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                } ${heading.level === 3 ? "pl-4" : ""}`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile: Floating button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 rounded-full shadow-lg"
        >
          {isOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </Button>

        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-64 bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-xl p-4"
            >
              <h3 className="text-sm font-semibold mb-3">목차</h3>
              <nav className="space-y-2 max-h-[50vh] overflow-y-auto">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToHeading(heading.id)}
                    className={`block w-full text-left text-sm transition-colors ${
                      activeId === heading.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    } ${heading.level === 3 ? "pl-4" : ""}`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
