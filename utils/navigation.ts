'use client'

import { useRouter } from 'next/navigation'

const createGoHandler = (router: ReturnType<typeof useRouter>) => {
    return (href: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        const target = document.querySelector(href)
        
        if (target) {
            // We're on the home page, just scroll
            target.scrollIntoView({ behavior: 'smooth' })
        } else {
            // Target doesn't exist on current page, navigate to home first
            router.push('/')
            // Scroll after a small delay to allow page to load
            setTimeout(() => {
                const element = document.querySelector(href)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        }
    }
}

const scroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export { createGoHandler, scroll }