'use client'

import { useAdmin, AdminProvider } from '@/context/AdminContext'
import Sidebar from '@/layouts/admin/Sidebar'
import TopNav from '@/layouts/admin/TopNav'
import { authUserAtom } from '@/store/auth/userAtoms'
import { useAtomValue } from 'jotai'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const user = useAtomValue(authUserAtom);

  const { isAuthenticated, isLoading, logout } = useAdmin()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname?.includes('/admin/login')


  useEffect(() => {
    const segments = pathname?.split('/') || []
    const locale = segments[1] || 'fr'

    if (user.user.email !== "" && isLoginPage) {
      router.push(`/${locale}/admin`)
    }

  }, [user, pathname, router, isLoginPage])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg font-mono text-[13px] text-accent">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  if (isLoginPage) {
    return <>{children}</>
  }


  return (
    <div className="flex h-screen bg-bg text-ink overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />

        <main className="flex-1 overflow-y-auto p-8 bg-bg/50">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  )
}
