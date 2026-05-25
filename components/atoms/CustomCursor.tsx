'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!
    let mx = 0, my = 0, rx = 0, ry = 0, raf: number

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`
    }
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n
    const tick = () => {
      rx = lerp(rx, mx, 0.1); ry = lerp(ry, my, 0.1)
      ring.style.left = `${rx}px`; ring.style.top = `${ry}px`
      raf = requestAnimationFrame(tick)
    }
    const on  = () => { dot.classList.add('hovering');    ring.classList.add('hovering') }
    const off = () => { dot.classList.remove('hovering'); ring.classList.remove('hovering') }

    const bind = () =>
      document.querySelectorAll<HTMLElement>('a,button,[data-cur]').forEach(el => {
        el.addEventListener('mouseenter', on)
        el.addEventListener('mouseleave', off)
      })

    document.addEventListener('mousemove', move)
    raf = requestAnimationFrame(tick)
    bind()
    const obs = new MutationObserver(bind)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf); obs.disconnect() }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
