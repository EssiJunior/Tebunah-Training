'use client'

import Dropdown from '@/components/atoms/Animated/Dropdown'
import HamburgerIcon from '@/components/atoms/Animated/HamburgerIcon'
import Logo from '@/components/atoms/Logo'
import MobileNav from '@/components/molecules/MobileNav'
import { NAV_LINKS } from '@/data/navigation'
import { createGoHandler } from '@/utils/navigation'
import { motion, useScroll, useSpring } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const router = useRouter()
  const go = createGoHandler(router)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => scrollYProgress.on('change', v => setScrolled(v > 0.015)), [scrollYProgress])

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [mobileOpen])

  const openDropdown = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(label)
  }

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <>
      {/* Scroll progress */}
      <motion.div className="scroll-bar" style={{ scaleX }} />

      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1], delay: 2.4 }}
        className={[
          'fixed top-0 inset-x-0 z-100 transition-all duration-300',
          scrolled
            ? 'border-b border-white/6 bg-bg/90 backdrop-blur-xl'
            : 'border-b border-transparent',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-15 max-w-350 mx-auto">

          {/* Logo */}
          <Logo size="small" id="#hero" handleClick={go('#hero')} />


          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative"
                  onMouseEnter={() => link.sub && openDropdown(link.label)}
                  onMouseLeave={() => link.sub && closeDropdown()}
                >
                  <a
                    href={link.href}
                    onClick={go(link.href)}
                    className="group relative flex items-center gap-1.5 px-3 py-2 rounded-px font-mono text-[11px] text-white/40 tracking-wider hover:text-ink transition-colors duration-200"
                  >
                    {link.label}
                    {link.sub && (
                      <motion.svg
                        animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="8" height="8" viewBox="0 0 8 8" fill="none"
                        className="opacity-40 group-hover:opacity-70 transition-opacity"
                      >
                        <path d="M1 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </motion.svg>
                    )}
                  </a>

                  {link.sub && (
                    <Dropdown items={link.sub} visible={activeDropdown === link.label} />
                  )}
                </div>
              ))}
            </div>

            {/* CTA — desktop */}
            <motion.a
              href="#contact" onClick={go('#contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(200,242,58,0.2)' }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex items-center gap-2 bg-accent text-bg font-mono text-[11px] font-medium px-4 py-2 rounded-px tracking-[0.08em] uppercase"
            >
              Candidater
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </motion.a>

            <HamburgerIcon open={mobileOpen} onClick={() => setMobileOpen(o => !o)} />
          </div>
        </div>
      </motion.nav>

      {/* Mobile panel */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} go={go} />
    </>
  )
}