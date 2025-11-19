"use client"

import { useState } from "react"
import { m } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send, CheckCircle2, AlertCircle, Rss } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("올바른 이메일 주소를 입력해주세요.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("구독해주셔서 감사합니다! 이메일을 확인해주세요.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "구독에 실패했습니다. 다시 시도해주세요.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.")
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-50" />

      <CardContent className="relative pt-6 pb-6">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Icon & Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">뉴스레터 구독</h3>
              <p className="text-sm text-muted-foreground">새로운 글을 이메일로 받아보세요</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 bg-background/80 backdrop-blur-sm border-border/60"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    구독
                  </>
                )}
              </Button>
            </div>

            {/* Status Message */}
            {message && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`flex items-center gap-2 text-sm ${
                  status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{message}</span>
              </m.div>
            )}
          </form>

          {/* RSS Feed Link */}
          <div className="pt-2 border-t border-border/40">
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <Rss className="h-4 w-4 group-hover:animate-pulse" />
              <span>또는 RSS 피드로 구독하기</span>
            </a>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-muted-foreground">
            구독하시면 새로운 글이 발행될 때 이메일 알림을 받으실 수 있습니다.
            언제든지 구독을 취소할 수 있습니다.
          </p>
        </m.div>
      </CardContent>
    </Card>
  )
}
