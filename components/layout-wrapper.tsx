"use client"

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // Admin 페이지에서는 Header/Footer 숨김
  if (isAdminRoute) {
    return <>{children}</>
  }

  // 일반 페이지에서는 Header/Footer 표시
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}
