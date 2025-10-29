import Link from "next/link"
import { Github, Linkedin, Instagram, BookOpen, FileText } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/CHUUHYESEUNG",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/heyhyeker",
    icon: Instagram,
  },
  {
    name: "브런치",
    href: "https://brunch.co.kr/@hyeker",
    icon: BookOpen,
  },
  {
    name: "티스토리",
    href: "https://dalsoon-jang.tistory.com",
    icon: FileText,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2025 hyeker. All rights reserved.
            </p>
          </div>

          {/* Center - Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Right - Privacy Policy */}
          <div className="text-center md:text-right">
            <Link
              href="/privacy-policy"
              className="text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
