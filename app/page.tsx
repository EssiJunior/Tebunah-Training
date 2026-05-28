'use client'

// Sections
import Hero from '@/sections/Hero'
import Instructor from '@/sections/Instructor'
import Formations from '@/sections/Formations'
import FAQ from '@/sections/FAQ'

// Components
import Marquee from '@/components/atoms/Marquee'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Formations />
      <Marquee />
      <Instructor />
      <FAQ />
    </>
  )
}
