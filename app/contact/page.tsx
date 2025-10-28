"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Instagram, BookOpen, FileText, MessageCircle } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/CHUUHYESEUNG",
    icon: Github,
    description: "",
    color: "hover:bg-gray-900 hover:text-white"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hyeseung-hailey-jang-a506a7211/",
    icon: Linkedin,
    description: "",
    color: "hover:bg-blue-600 hover:text-white"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/heyhyeker",
    icon: Instagram,
    description: "일상 공유",
    color: "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white"
  },
  {
    name: "브런치",
    href: "https://brunch.co.kr/@hyeker",
    icon: BookOpen,
    description: "창업 일기",
    color: "hover:bg-green-600 hover:text-white"
  },
  {
    name: "티스토리",
    href: "https://dalsoon-jang.tistory.com",
    icon: FileText,
    description: "가볍게 쓰는 기술 블로그",
    color: "hover:bg-orange-500 hover:text-white"
  },
  {
    name: "네이버 블로그",
    href: "https://blog.naver.com/haileychoi-world",
    icon: MessageCircle,
    description: "일상을 담는 공간",
    color: "hover:bg-green-500 hover:text-white"
  }
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          프로젝트 의뢰, 협업 제안은 언제나 환영합니다
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Mail className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Contact Email</h2>
                  <p className="text-muted-foreground mb-6">
                    편하게 연락 주세요 :)
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg" className="gap-2">
                      <a href="mailto:cheesehsmay5th@gmail.com">
                        <Mail className="h-5 w-5" />
                        cheesehsmay5th@gmail.com
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="gap-2">
                      <a href="mailto:hshshshs55@naver.com">
                        <Mail className="h-5 w-5" />
                        hshshshs55@naver.com
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8">소셜 미디어</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`h-full hover:border-primary transition-all duration-300 hover:shadow-lg ${link.color}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <link.icon className="h-6 w-6" />
                      {link.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>연락 가능 시간</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                이메일은 24시간 확인 가능하며, 보통 24시간 이내에 답변드립니다.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                {/* <h3 className="font-semibold mb-2">다음과 같은 문의를 환영합니다:</h3> */}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>프로젝트 개발 및 콘텐츠 디자인 의뢰</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>프리랜서 협업 제안</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>기술 상담 및 멘토링</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>강연 및 세미나 요청</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>기타 문의사항</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
