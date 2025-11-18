"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  // { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Projects", href: "/projects" },
  // { name: "Blog", href: "/blog" },
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "pt-2 pb-2" : "pt-4 pb-4"
        } transition-all duration-500 ease-out`}
      >
        <motion.nav
          animate={{
            scale: isScrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`relative flex items-center justify-between rounded-full border ${
            isScrolled
              ? "border-primary/20 bg-background/90 shadow-[0_8px_32px_-8px_rgba(139,92,246,0.3)]"
              : "border-primary/10 bg-background/80 shadow-[0_20px_60px_-20px_rgba(139,92,246,0.2)]"
          } backdrop-blur-xl backdrop-saturate-150 transition-all duration-500`}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />

          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-3 rounded-full pl-4 pr-6 py-2">
            <motion.span
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Image
                src="/hyeker-terminal-icon.svg"
                alt="Hyeker logo"
                width={28}
                height={28}
                priority
                className="relative z-10"
              />
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 mr-2 md:flex">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="relative group px-4 py-2 text-sm cursor-pointer"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-primary font-medium" : "text-foreground/70 group-hover:text-foreground"
                    }`}>
                      {item.name}
                    </span>

                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100"
                      layoutId={isActive ? undefined : `hover-${item.name}`}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/15 via-secondary/15 to-accent/15 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Bottom accent line */}
                    <motion.div
                      className="absolute bottom-1 left-1/2 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "70%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              )
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Open menu</span>
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[360px] px-6 border-primary/20 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="sr-only">
                  <SheetTitle>사이트 내비게이션</SheetTitle>
                  <SheetDescription>Hyeker의 주요 페이지 이동 메뉴</SheetDescription>
                </SheetHeader>
                <nav className="mt-12 flex flex-col space-y-5">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`relative group block text-base font-medium transition cursor-pointer ${
                            isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                          }`}
                        >
                          <span className="relative z-10">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="mobile-active"
                              className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
                              initial={{ opacity: 0, scaleY: 0 }}
                              animate={{ opacity: 1, scaleY: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 + 0.2, duration: 0.3 }}
                  >
                    <Button
                      asChild
                      className="mt-6 w-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        프로젝트 문의
                      </Link>
                    </Button>
                  </motion.div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  )
}
