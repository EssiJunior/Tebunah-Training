'use client'

// Layouts
import Nav          from '@/layouts/Nav'
import Footer       from '@/layouts/Footer'

// Sections
import Hero         from '@/sections/Hero'
import Instructor   from '@/sections/Instructor'
import Formations   from '@/sections/Formations'
import FAQ          from '@/sections/FAQ'

// Components
import Marquee      from '@/components/atoms/Marquee'
import CustomCursor from '@/components/atoms/CustomCursor'
import Loader       from '@/components/atoms/Loader'

export default function Page() {
  return (
    <>
      <CustomCursor />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Formations />
        <Marquee />
        <Instructor />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}
