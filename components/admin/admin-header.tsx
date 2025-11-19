"use client"

import { useAuth } from './auth-provider'
import { User } from 'lucide-react'

export function AdminHeader() {
  const { userData } = useAuth()

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">HYEKER Admin</h1>
          <p className="text-sm text-muted-foreground">블로그 & 포트폴리오 관리</p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {userData?.name || userData?.email}
            </p>
            <p className="text-xs text-muted-foreground capitalize">{userData?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
