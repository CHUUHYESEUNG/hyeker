"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          호기심 많은 개발자, AI 석사 전공, Python 및 Java, React.js, React Native 가능
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20"
      >
        <Card className="max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">장혜승</h2>
                  <p className="text-lg text-muted-foreground">Hyeseung Hailey Jang</p>
                  <p className="text-sm text-muted-foreground">1994. 05. 05</p>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed">
                    글 쓰는 것을 좋아하고 배움을 즐기는 호기심 많은 개발자입니다. 콘텐츠 디자이너로 3년 경력 이후,
                    현업에서 오랜 기간 개발자로 일하고 계신 아버지의 영향을 받아 개발자가 되었으며,
                    AI 기술에 대응하기 위해 인하대학교 AIF Labs에 파트타임 석사로 합류,
                    딥러닝을 활용한 금융 시계열 예측 소재의 &lsquo;LSTM 및 SAINT 기반 ETF 최대 손실 예측&rsquo; 졸업 논문을 작성하였습니다.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Java 기반 B2B 공장 자동화 MES, MCS, ACS 시스템 프로젝트를 진행하였고,
                    Next.js와 Typescript 기반 B2C 보험 서비스 프로젝트를 다수 진행하였습니다.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">풀스택 개발</Badge>
                  <Badge variant="secondary">AI 석사</Badge>
                  <Badge variant="secondary">React/Next.js</Badge>
                  <Badge variant="secondary">FastAPI</Badge>
                  <Badge variant="secondary">TDD</Badge>
                  <Badge variant="secondary">보안</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Education Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold">Education</h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {[
            {
              period: "2022.03 - 2025.02",
              school: "인하대학교 공학대학원",
              major: "인공지능융합",
              degree: "석사",
              gpa: "4.1/4.5",
              description: "Finance AI 연구실 AIF Lab. - 'LSTM 및 SAINT 기반 ETF 최대 손실 예측' 연구"
            },
            {
              period: "2017.03 - 2017.07",
              school: "학점은행제",
              major: "컴퓨터공학과",
              degree: "학사",
              gpa: "4.0/4.5",
              description: ""
            },
            {
              period: "2013.03 - 2017.02",
              school: "인하공업전문대학",
              major: "컴퓨터시스템과",
              degree: "전문학사",
              gpa: "3.33/4.5",
              description: ""
            }
          ].map((edu, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-xl">{edu.school}</CardTitle>
                  <Badge variant="outline">{edu.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="font-semibold text-primary">{edu.major}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{edu.degree}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-semibold">{edu.gpa}</span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <Award className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Tensorflow Developer Certificate", issuer: "Google", date: "2021.10" },
            { name: "정보처리기사", issuer: "한국산업인력공단", date: "2021.06" },
            { name: "정보처리산업기사", issuer: "한국산업인력공단", date: "2015.05" },
            { name: "2종보통운전면허", issuer: "경찰청", date: "2019.09" }
          ].map((cert, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-sm text-primary font-semibold mt-1">{cert.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold">개발 철학</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "사용자 중심 개발",
              description: "다양한 소프트웨어 기술을 익히고 활용하는 것은 개발자에게 중요한 덕목입니다. 하지만 결국 프로그램의 목적은 사용자들을 편리하게 만들기 위함입니다."
            },
            {
              title: "TDD와 클린 코드",
              description: "애자일 프로세스에 기반을 두어 우선순위가 높은 task를 바탕으로 빠른 프로토타입을 만들어 내는 것에 초점을 두고, 고객 중심의 요구사항을 반복적이고 주기적으로 반영합니다."
            },
            {
              title: "협업과 커뮤니케이션",
              description: "개발자는 당연하게도 깊은 IT 지식 기술과 함께 코딩 역량을 갖추어야 합니다. 그러나 협업 능력과 커뮤니케이션 능력도 중요하다는 것을 깨닫게 되었습니다."
            }
          ].map((item, index) => (
            <Card key={index} className="hover:border-primary hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl">차별화된 능력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary">1. 도전하는 것을 즐기고, 추진력이 좋습니다</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                새로운 기술에 대한 호기심과 탐구심으로 학습한 내용을 실제 프로젝트에 적용하고
                동료들과 피드백하며 지속적으로 성장해왔습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary">2. 팀 단위로 협업하며 커뮤니케이션하는 것을 좋아합니다</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                생각을 말로 표현하고, 상대방의 의사를 존중하며 부드러운 커뮤니케이션이 이어져야 합니다.
                대학교 시절 학회장을 맡으며 커뮤니케이션 역량을 훈련하였습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary">3. 공부하는 것을 좋아하기 때문에 습득력이 좋습니다</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                필요한 것이 있다면 주저 없이 학습에 몰입합니다.
                개발 이외에도 철학이나, 뇌과학, AI 등 궁금한 것이 생기면 책이나 온라인 강의를 통해 지식을 넓히고자 노력합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
