'use client'

// Layouts
import Nav from '@/layouts/Nav'
import Footer from '@/layouts/Footer'

// Components
import CustomCursor from '@/components/atoms/CustomCursor'
import Loader from '@/components/atoms/Loader'
import ScrollToTop from '@/components/atoms/Animated/ScrollToTop'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CustomCursor />
            <Loader />
            <Nav />
            <main>
                {children}
                <Footer />
            </main>
            <ScrollToTop />
        </>
    )
}
