import { useEffect, useRef } from 'react'
import DashboardCardList from './components/DashboardCardList'
import DashboardTitle from './components/DashboardTitle'

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const updateCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }
    updateCanvas()
    window.addEventListener('resize', updateCanvas)

    const particles: Array<{
      x: number
      y: number
      r: number
      dx: number
      dy: number
      pulse: number
      pulseSpeed: number
    }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.pulse += p.pulseSpeed
        const pulseScale = 1 + Math.sin(p.pulse) * 0.3

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 14 * pulseScale)
        gradient.addColorStop(0, `rgba(167,243,208,${0.8 * pulseScale})`)
        gradient.addColorStop(0.3, `rgba(45,212,191,${0.5 * pulseScale})`)
        gradient.addColorStop(0.6, `rgba(20,184,166,${0.25 * pulseScale})`)
        gradient.addColorStop(1, 'rgba(13,148,136,0)')
        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulseScale, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)

          if (dist < 150) {
            ctx.strokeStyle = `rgba(167,243,208,${(1 - dist / 150) * 0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
    return () => window.removeEventListener('resize', updateCanvas)
  }, [])

  return (
    <div className='relative overflow-hidden min-h-[900px] pt-20'>
      {/* Premium Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950'>
        {/* Animated gradient orbs */}
        <div
          className='absolute -top-40 -left-40 w-[900px] h-[900px] bg-gradient-to-br from-emerald-400/35 via-teal-500/25 to-cyan-500/20 rounded-full blur-[140px] animate-pulse'
          style={{ animationDuration: '7s' }}
        />

        <div
          className='absolute top-1/4 -right-40 w-[800px] h-[800px] bg-gradient-to-bl from-violet-500/30 via-purple-500/25 to-fuchsia-500/20 rounded-full blur-[120px] animate-pulse'
          style={{ animationDuration: '9s', animationDelay: '1s' }}
        />

        <div
          className='absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/25 via-teal-400/20 to-emerald-400/15 rounded-full blur-[100px] animate-pulse'
          style={{ animationDuration: '11s', animationDelay: '2s' }}
        />

        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-violet-500/15 rounded-full blur-[90px] animate-pulse'
          style={{ animationDuration: '13s', animationDelay: '1.5s' }}
        />

        {/* Grid pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(167,243,208,0.04)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(167,243,208,0.04)_1.5px,transparent_1.5px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]' />

        {/* Radial overlays */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(167,243,208,0.15),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(192,132,252,0.12),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(45,212,191,0.1),transparent_60%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.5)_100%)]' />
      </div>

      {/* Particles Canvas */}
      <canvas ref={canvasRef} className='absolute inset-0 pointer-events-none' />

      {/* Main Content - Tăng padding */}
      <div className='relative z-10 py-16 sm:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            {/* Premium Glass Card */}
            <div className='group relative'>
              {/* Outer glow */}
              <div className='absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 via-violet-500/15 to-purple-500/20 blur-3xl opacity-40 group-hover:opacity-70 group-hover:blur-[60px] transition-all duration-700' />

              {/* Glass Card */}
              <div className='relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:from-white/[0.08] hover:to-white/[0.04] border border-emerald-500/20 hover:border-emerald-400/40 rounded-[2rem] shadow-[0_8px_32px_rgba(167,243,208,0.12),0_20px_60px_rgba(139,92,246,0.08)] hover:shadow-[0_12px_48px_rgba(167,243,208,0.25),0_30px_90px_rgba(139,92,246,0.18),0_0_120px_rgba(20,184,166,0.15)] hover:scale-[1.01] transition-all duration-500 ease-out'>
                {/* Gradient overlay */}
                <div className='absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-400/0 via-transparent to-violet-500/0 group-hover:from-emerald-400/15 group-hover:to-violet-500/15 transition-all duration-500' />

                {/* Top edge glow */}
                <div className='absolute -top-px left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-emerald-400/0 to-transparent group-hover:via-emerald-400/60 transition-all duration-500' />

                {/* Content - Tăng padding */}
                <div className='relative p-10 sm:p-14 lg:p-20'>
                  {/* Corner glows */}
                  <div className='absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-emerald-400/15 to-teal-500/10 group-hover:from-emerald-400/30 group-hover:to-teal-500/20 blur-3xl rounded-full transition-all duration-500' />

                  <div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-violet-400/15 to-purple-500/10 group-hover:from-violet-400/30 group-hover:to-purple-500/20 blur-3xl rounded-full transition-all duration-500' />

                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-t from-cyan-400/12 to-teal-500/8 group-hover:from-cyan-400/25 group-hover:to-teal-500/18 blur-3xl rounded-full transition-all duration-500' />

                  {/* Main content - Tăng spacing */}
                  <div className='relative space-y-12'>
                    <DashboardTitle />
                    <DashboardCardList />
                  </div>
                </div>

                {/* Bottom edge glow */}
                <div className='absolute -bottom-px left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-violet-400/0 to-transparent group-hover:via-violet-400/50 transition-all duration-500' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
