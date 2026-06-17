'use client'

// Sections
import Hero from '@/sections/Hero'
import Instructors from '@/sections/Instructors'
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
      <Instructors />
      <FAQ />
    </>
  )
}
