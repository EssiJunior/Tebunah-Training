'use client'

import { useRouter } from 'next/navigation'
import type { Category } from '@/data/formations'

const createGoHandler = (router: ReturnType<typeof useRouter>, setActive?: (category: Category) => void) => {
    return (href: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        
        // Handle category links like #formations-dev, #formations-ia, etc.
        if (href.startsWith('#formations-') && setActive) {
            const category = href.substring(11) as Category
            setActive(category)
        }
        
        // Check if target element exists on current page
        const target = document.querySelector(href)
        const isOnDetailPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/formations/')
        
        if (target) {
            // Element exists on current page, just scroll
            target.scrollIntoView({ behavior: 'smooth' })
        } else if (isOnDetailPage) {
            // We're on a detail page, navigate to home first
            router.push('/')
            // Wait for navigation and element to appear
            setTimeout(() => {
                const element = document.querySelector(href)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 500)
        } else {
            // We're on home page but element doesn't exist, just scroll to formations
            const formationsElement = document.querySelector('#formations')
            if (formationsElement) {
                formationsElement.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }
}

const scroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export { createGoHandler, scroll }