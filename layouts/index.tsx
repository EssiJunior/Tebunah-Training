'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Layouts
import Nav from '@/layouts/Nav'
import Footer from '@/layouts/Footer'

// Components
import CustomCursor from '@/components/atoms/CustomCursor'
import Loader from '@/components/atoms/Loader'
import ScrollToTop from '@/components/atoms/Animated/ScrollToTop'

// Context
import { FormationsProvider } from '@/context/FormationsContext'

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdmin = pathname?.split('/').includes('admin')

    useEffect(() => {
        if (isAdmin) {
            document.documentElement.classList.add('admin-mode')
            document.documentElement.style.cursor = 'default'
        } else {
            document.documentElement.classList.remove('admin-mode')
            document.documentElement.style.cursor = ''
        }
    }, [isAdmin])

    if (isAdmin) {
        return (
            <div className="admin-container min-h-screen bg-bg text-ink">
                {children}
            </div>
        )
    }

    return (
        <FormationsProvider>
            <CustomCursor />
            <Loader />
            <Nav />
            <main>
                {children}
                <Footer />
            </main>
            <ScrollToTop />
        </FormationsProvider>
    )
}

