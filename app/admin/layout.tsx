"use client"

import { usePathname } from 'next/navigation'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  // 로그인 페이지는 ProtectedRoute 없이 렌더링
  if (isLoginPage) {
    return <>{children}</>
  }

  // 나머지 admin 페이지는 ProtectedRoute + 사이드바/헤더 적용
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <AdminSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto bg-background p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
