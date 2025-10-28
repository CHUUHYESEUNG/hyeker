"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone, Github, Linkedin, Award, GraduationCap, Briefcase } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Resume</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />

        <Button asChild size="lg" className="gap-2">
          <a href="/이력서.pdf" download="장혜승_이력서.pdf">
            <Download className="h-5 w-5" />
            PDF 다운로드
          </a>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Profile */}
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
              </div>
              <h2 className="text-2xl font-bold mb-1">장혜승</h2>
              <p className="text-muted-foreground mb-1">Hyeseung Hailey Jang</p>
              <p className="text-sm text-muted-foreground">Full-stack Developer</p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground break-all">cheesehsmay5th@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+82 10-5415-2649</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Github className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="https://github.com/CHUUHYESEUNG" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Linkedin className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="https://www.linkedin.com/in/hyeseung-hailey-jang-a506a7211/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-2 text-primary">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "React Native"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2 text-primary">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "FastAPI", "Java", "Spring Boot"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2 text-primary">Database</p>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "MySQL", "Supabase", "DynamoDB"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2 text-primary">DevOps</p>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "AWS", "Vercel", "Git"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                글 쓰는 것을 좋아하고 배움을 즐기는 호기심 많은 개발자입니다.
                콘텐츠 디자이너로 3년 경력 이후 개발자로 전환하여 AI 석사 학위를 취득하였습니다.
                Java 기반 B2B 공장 자동화 시스템과 Next.js, TypeScript 기반 B2C 보험 서비스 프로젝트를 다수 진행하였습니다.
                사용자 중심의 개발과 TDD, 클린 코드를 지향하며, 협업과 커뮤니케이션을 중요시합니다.
              </p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  period: "2025.08 - 현재",
                  company: "개인 웹/앱 작업",
                  role: "1인 개발자",
                  description: "5070 시니어 타겟 플랫폼 매듭(maedup.co.kr), 중장년 액티비티 예약 앱 캐치픽 개발"
                },
                {
                  period: "2023.09 - 2024.09",
                  company: "비즈인사이트",
                  role: "개발자 (대리)",
                  description: "B2B 타겟 단체 보험 가입, 청구, 여행자 보험 가입 서비스 개발. Next.js 14, React.js, TypeScript 기반"
                },
                {
                  period: "2022.11 - 2023.02",
                  company: "메가존",
                  role: "개발자 (대리)",
                  description: "LFmall 배송자동화 고도화 프로젝트. Spring Boot, React.js 기반"
                },
                {
                  period: "2020.12 - 2022.09",
                  company: "(주)SHI (현 로드러너)",
                  role: "개발자 (사원)",
                  description: "공장자동화 MES, MCS, ACS 시스템 개발. Spring Boot, React.js, Android 기반"
                }
              ].map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <h3 className="font-semibold text-lg">{exp.company}</h3>
                    <Badge variant="outline" className="w-fit">{exp.period}</Badge>
                  </div>
                  <p className="text-sm text-primary font-semibold mb-2">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  period: "2022.03 - 2025.02",
                  school: "인하대학교 공학대학원",
                  major: "인공지능융합 석사",
                  gpa: "4.1/4.5",
                  thesis: "LSTM 및 SAINT 기반 ETF 최대 손실 예측"
                },
                {
                  period: "2017.03 - 2017.07",
                  school: "학점은행제",
                  major: "컴퓨터공학과 학사",
                  gpa: "4.0/4.5"
                },
                {
                  period: "2013.03 - 2017.02",
                  school: "인하공업전문대학",
                  major: "컴퓨터시스템과 전문학사",
                  gpa: "3.33/4.5"
                }
              ].map((edu, index) => (
                <div key={index} className="border-l-2 border-secondary pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <h3 className="font-semibold">{edu.school}</h3>
                    <Badge variant="outline" className="w-fit">{edu.period}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.major} · {edu.gpa}</p>
                  {edu.thesis && (
                    <p className="text-xs text-muted-foreground mt-1">논문: {edu.thesis}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Tensorflow Developer Certificate", issuer: "Google", date: "2021.10" },
                  { name: "정보처리기사", issuer: "한국산업인력공단", date: "2021.06" },
                  { name: "정보처리산업기사", issuer: "한국산업인력공단", date: "2015.05" },
                  { name: "2종보통운전면허", issuer: "경찰청", date: "2019.09" }
                ].map((cert, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-semibold text-sm">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-primary">{cert.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
