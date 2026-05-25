'use client'

import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────────
   GridBackground
   High-performance canvas animation for the Hero section.

   Concept: "Data in motion" — the grid is a circuit board / coordinate
   system where numeric data (binary, hex, decimals) travel along lines,
   converge at nodes, and create a living numeric field.

   Techniques:
   - Single <canvas>, devicePixelRatio-aware for crispness
   - requestAnimationFrame loop, no React re-renders during animation
   - Three layered effects drawn each frame:
       1. Grid lines (static-ish, drawn once to an offscreen canvas)
       2. Numeric particles traveling along grid edges
       3. Pulsing intersection nodes that light up when a particle passes
   - Mouse parallax: the yellow radial glow subtly tracks the cursor
   - All opacity math runs in JS, no CSS transitions touching the canvas
──────────────────────────────────────────────────────────────────────── */

const CELL = 48            // grid cell size in CSS pixels
const ACCENT: [number, number, number] = [255, 210, 80]  // secondary flash color
const LINE_ALPHA = 0.10          // base grid line alpha

// Numeric tokens to display as particles
const TOKENS = [
    '0', '1', '01', '10', '11', '00',
    'FF', 'A0', '1F', '0x', '3F',
    '42', '07', '16', '32', '64', '128', '255',
    '0.1', 'π', '∑', '∞', 'λ', 'Δ',
    'npm', 'git', 'div', 'API', 'AI',
]

type Axis = 'h' | 'v'

interface Particle {
    axis: Axis
    track: number   // which row (h) or col (v) index
    pos: number   // position along the track [0..1]
    speed: number
    token: string
    alpha: number
    fadeIn: number   // fade-in progress [0..1]
    fadeOut: number   // 0 = alive, >0 = fading out
    color: [number, number, number]
    size: number
    pulse: number   // brightness oscillation phase
}

interface Node {
    col: number
    row: number
    alpha: number   // current glow alpha
    decay: number
}

function rand(min: number, max: number) {
    return Math.random() * (max - min) + min
}

function pickColor(): [number, number, number] {
    return ACCENT
}

function makeParticle(cols: number, rows: number): Particle {
    const axis = Math.random() > 0.5 ? 'h' : 'v'
    return {
        axis,
        track: axis === 'h' ? Math.floor(rand(0, rows + 1)) : Math.floor(rand(0, cols + 1)),
        pos: Math.random(),
        speed: rand(0.0006, 0.0022),
        token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
        alpha: 0,
        fadeIn: 0,
        fadeOut: 0,
        color: pickColor(),
        size: rand(9, 13),
        pulse: rand(0, Math.PI * 2),
    }
}

export default function GridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        if (!ctx) return

        let raf: number
        let W = 0, H = 0, dpr = 1
        let cols = 0, rows = 0
        let mouseX = canvas.offsetWidth * 0.85
        let mouseY = canvas.offsetHeight * 0.1
        let targetMX = mouseX, targetMY = mouseY

        // Offscreen canvas for static grid (redrawn only on resize)
        const gridCanvas = document.createElement('canvas')
        const gCtx = gridCanvas.getContext('2d')!

        const particles: Particle[] = []
        const nodes: Node[] = []

        /* ── Sizing ──────────────────────────────────────── */
        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2)
            W = canvas!.offsetWidth
            H = canvas!.offsetHeight
            canvas!.width = W * dpr
            canvas!.height = H * dpr
            ctx!.scale(dpr, dpr)

            gridCanvas.width = W * dpr
            gridCanvas.height = H * dpr
            gCtx.scale(dpr, dpr)

            cols = Math.ceil(W / CELL) + 1
            rows = Math.ceil(H / CELL) + 1

            drawStaticGrid()

            // seed initial particles
            particles.length = 0
            const count = Math.floor((cols * rows) / 12) + 20
            for (let i = 0; i < count; i++) particles.push(makeParticle(cols, rows))
        }

        /* ── Static grid (drawn to offscreen canvas) ─────── */
        function drawStaticGrid() {
            gCtx.clearRect(0, 0, W, H)
            gCtx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA})`
            gCtx.lineWidth = 0.5

            // vertical lines
            for (let c = 0; c <= cols; c++) {
                const x = c * CELL
                gCtx.beginPath()
                gCtx.moveTo(x, 0)
                gCtx.lineTo(x, H)
                gCtx.stroke()
            }
            // horizontal lines
            for (let r = 0; r <= rows; r++) {
                const y = r * CELL
                gCtx.beginPath()
                gCtx.moveTo(0, y)
                gCtx.lineTo(W, y)
                gCtx.stroke()
            }
        }

        /* ── Intersection flash nodes ────────────────────── */
        function flashNode(col: number, row: number) {
            const existing = nodes.find(n => n.col === col && n.row === row)
            if (existing) {
                existing.alpha = 1
                existing.decay = 0.018
            } else {
                nodes.push({ col, row, alpha: 1, decay: 0.018 })
            }
        }

        /* ── Main draw ───────────────────────────────────── */
        function draw(t: number) {
            ctx.clearRect(0, 0, W, H)

            // 1. Draw cached static grid
            ctx.drawImage(gridCanvas, 0, 0, W * dpr, H * dpr, 0, 0, W, H)

            // 2. Radial yellow glow follows mouse (lerped)
            mouseX += (targetMX - mouseX) * 0.04
            mouseY += (targetMY - mouseY) * 0.04

            const grd = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, Math.max(W, H) * 0.65)
            grd.addColorStop(0, `rgba(${ACCENT.join(',')},0.18)`)
            grd.addColorStop(0.4, `rgba(${ACCENT.join(',')},0.06)`)
            grd.addColorStop(1, 'transparent')
            ctx.fillStyle = grd
            ctx.fillRect(0, 0, W, H)

            // 3. Animated particles
            const toRemove: number[] = []
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // Update
                p.pos += p.speed
                p.pulse += 0.04

                if (p.fadeOut > 0) {
                    p.fadeOut += 0.04
                    p.alpha = Math.max(0, 1 - p.fadeOut)
                    if (p.alpha <= 0) { toRemove.push(i); continue }
                } else {
                    p.fadeIn = Math.min(1, p.fadeIn + 0.04)
                    p.alpha = p.fadeIn

                    // Trigger fade-out near end
                    if (p.pos > 0.85) p.fadeOut = 0.001
                }

                // Position
                let x: number, y: number, maxPos: number
                if (p.axis === 'h') {
                    maxPos = cols
                    x = p.pos * maxPos * CELL
                    y = p.track * CELL
                } else {
                    maxPos = rows
                    x = p.track * CELL
                    y = p.pos * maxPos * CELL
                }

                // Flash nearest intersection
                if (p.pos < 0.98) {
                    const nc = Math.round(x / CELL)
                    const nr = Math.round(y / CELL)
                    if (Math.abs(x - nc * CELL) < 3 || Math.abs(y - nr * CELL) < 3) {
                        flashNode(nc, nr)
                    }
                }

                // Draw token
                const brightness = 0.7 + 0.3 * Math.sin(p.pulse)
                const a = p.alpha * brightness
                const [r, g, b] = p.color
                ctx.save()
                ctx.globalAlpha = a
                ctx.font = `${Math.floor(p.size)}px 'DM Mono', monospace`
                ctx.fillStyle = `rgb(${r},${g},${b})`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                // subtle glow
                ctx.shadowColor = `rgba(${r},${g},${b},0.8)`
                ctx.shadowBlur = 6
                ctx.fillText(p.token, x, y)
                ctx.restore()
            }

            // Remove dead particles (reverse order)
            for (let i = toRemove.length - 1; i >= 0; i--) {
                particles.splice(toRemove[i], 1)
                particles.push(makeParticle(cols, rows))
            }

            // 4. Intersection glow nodes
            for (let i = nodes.length - 1; i >= 0; i--) {
                const n = nodes[i]
                if (n.alpha <= 0) { nodes.splice(i, 1); continue }

                const x = n.col * CELL
                const y = n.row * CELL

                // Outer halo
                const halo = ctx.createRadialGradient(x, y, 0, x, y, 18)
                halo.addColorStop(0, `rgba(${ACCENT.join(',')},${n.alpha * 0.7})`)
                halo.addColorStop(0.5, `rgba(${ACCENT.join(',')},${n.alpha * 0.2})`)
                halo.addColorStop(1, 'transparent')
                ctx.fillStyle = halo
                ctx.beginPath()
                ctx.arc(x, y, 18, 0, Math.PI * 2)
                ctx.fill()

                // Center dot
                ctx.beginPath()
                ctx.arc(x, y, 2.5, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${ACCENT.join(',')},${n.alpha})`
                ctx.fill()

                n.alpha -= n.decay
            }

            // 5. Maintain particle density
            const target = Math.floor((cols * rows) / 10) + 25
            while (particles.length < target) particles.push(makeParticle(cols, rows))

            raf = requestAnimationFrame(draw)
        }

        /* ── Mouse tracking ──────────────────────────────── */
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas!.getBoundingClientRect()
            targetMX = e.clientX - rect.left
            targetMY = e.clientY - rect.top
        }

        /* ── Init ────────────────────────────────────────── */
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)
        resize()

        canvas.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        raf = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            canvas.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 1 }}
        />
    )
}