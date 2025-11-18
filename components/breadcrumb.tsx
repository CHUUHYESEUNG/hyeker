"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Breadcrumb"
      className="mb-8"
    >
      <ol className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">홈</span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
              {isLast ? (
                <span
                  className="text-foreground font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </motion.nav>
  )
}
