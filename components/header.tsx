"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import { Menu } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "/" },
  // { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  // { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = useMemo(() => navigation, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "pt-2 pb-2" : "pt-4 pb-4"
        } transition-all duration-300`}
      >
        <nav
          className={`flex items-center justify-between rounded-full border ${
            isScrolled
              ? "border-white/15 bg-background/85 shadow-[0_18px_60px_-40px_rgba(90,70,255,0.45)]"
              : "border-white/10 bg-background/70 shadow-[0_25px_80px_-50px_rgba(90,70,255,0.35)]"
          } backdrop-blur`}
        >
          <Link href="/" className="flex items-center gap-3 rounded-full pl-4 pr-6 py-2 transition hover:bg-white/5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Image
                src="/hyeker-terminal-icon.svg"
                alt="Hyeker logo"
                width={28}
                height={28}
                priority
              />
            </span>
            <span className="hidden text-sm font-semibold tracking-[0.35em] text-foreground sm:inline">
              HYEKER
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            <ThemeToggle />
            <Button
              asChild
              variant="ghost"
              className="rounded-full border border-foreground/10 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-foreground/70 transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:border-white/20 dark:text-white/80 dark:hover:bg-white/15 dark:hover:text-white"
            >
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/15 bg-white/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[360px]">
                <nav className="mt-10 flex flex-col space-y-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-medium transition ${
                          isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <Button
                    asChild
                    className="mt-6 rounded-full border border-foreground/10 bg-transparent text-sm uppercase tracking-[0.3em] text-foreground/70 hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:border-white/20 dark:text-white/80 dark:hover:bg-white/15 dark:hover:text-white"
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      프로젝트 문의
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
