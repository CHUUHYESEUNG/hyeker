"use client"

import Image from "next/image"
import Link from "next/link"
import { m } from "framer-motion"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PortfolioItem } from "@/lib/portfolio-data"
import { portfolioPlatformIconMap } from "@/lib/portfolio-data"

type PortfolioDetailViewProps = {
  item: PortfolioItem
}

export function PortfolioDetailView({ item }: PortfolioDetailViewProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <Button variant="ghost" asChild className="w-fit gap-2 text-sm text-muted-foreground hover:text-primary">
          <Link href="/portfolio">
            <ArrowLeft className="h-4 w-4" />
            포트폴리오 목록으로
          </Link>
        </Button>

        <Card className="overflow-hidden border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-[260px] sm:h-[320px] lg:h-full bg-muted">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant={item.status === "운영중" ? "default" : "secondary"}>{item.status}</Badge>
              </div>
            </div>

            <CardContent className="p-6 lg:p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Project #{item.routeId}</p>
                <h1 className="text-3xl font-bold leading-tight">{item.title}</h1>
                <p className="text-base text-muted-foreground">{item.description}</p>
                <p className="text-sm text-muted-foreground/80">{item.date}</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{item.longDescription}</p>

              <div>
                <h2 className="text-sm font-semibold mb-2">기술 스택</h2>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold mb-2">주요 기능</h2>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-semibold mb-3">플랫폼</h2>
                <div className="flex flex-wrap gap-3">
                  {item.platforms.map((platform, idx) => {
                    const Icon = portfolioPlatformIconMap[platform.icon]
                    return (
                      <Button
                        key={idx}
                        asChild={platform.available}
                        variant={platform.available ? "default" : "secondary"}
                        disabled={!platform.available}
                        className="gap-2"
                      >
                        {platform.available ? (
                          <a href={platform.url} target="_blank" rel="noopener noreferrer">
                            <Icon className="h-4 w-4" />
                            {platform.label}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        ) : (
                          <span>
                            <Icon className="h-4 w-4" />
                            {platform.label} (준비중)
                          </span>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </m.div>
    </div>
  )
}
