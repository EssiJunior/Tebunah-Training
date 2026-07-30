'use client'

import { useRouter } from 'next/navigation'

const createGoHandler = (router: ReturnType<typeof useRouter>, setActive?: (category: Category) => void) => {
    return (href: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        
        // Handle category links like #formations-dev, #formations-ia, etc.
        if (href.startsWith('#formations-') && setActive) {
            const category = href.replace('#formations-', '') as Category
            setActive(category)
        }
        
        // Use #formations as the scroll target if it is a category sub-link
        const scrollTarget = href.startsWith('#formations-') ? '#formations' : href
        
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
        const segments = currentPath.split('/')
        const locale = segments[1] || 'fr'
        const homePath = `/${locale}`
        const target = document.querySelector(scrollTarget)
        const isNotOnHomePage = currentPath !== homePath
        
        if (target) {
            // Element exists on current page, just scroll
            target.scrollIntoView({ behavior: 'smooth' })
        } else if (isNotOnHomePage) {
            // We're on another page, navigate to locale-aware home first
            router.push(`${homePath}${href.startsWith('#') ? href : ''}`)
            // Wait for navigation and element to appear
            setTimeout(() => {
                const element = document.querySelector(scrollTarget)
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