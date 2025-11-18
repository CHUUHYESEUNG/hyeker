"use client"

import { useTheme } from "next-themes"
import Giscus from "@giscus/react"
import { useEffect, useState } from "react"

export function GiscusComments() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">댓글</h2>
      <Giscus
        id="comments"
        repo="CHUUHYESEUNG/hyeker"
        repoId="R_kgDONXmOgg"
        category="General"
        categoryId="DIC_kwDONXmOgs4ClOVk"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="ko"
        loading="lazy"
      />
    </div>
  )
}
