import { useEffect, useRef } from 'react'
import DashboardTitle from './components/DashboardTitle'
import DashboardCardList from './components/DashboardCardList'

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const particles: { x: number; y: number; r: number; dx: number; dy: number }[] = []

    // tạo particles
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // neon glow xanh tím
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8)
        gradient.addColorStop(0, 'rgba(96,165,250,0.9)') // xanh dương sáng
        gradient.addColorStop(1, 'rgba(139,92,246,0)') // tím mờ
        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        // line nối particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(167,139,250,${1 - dist / 120})` // tím nhạt neon
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
  }, [])

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden font-sans'>
      {/* Gradient động */}
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .moving-gradient {
            background: linear-gradient(270deg, #1e1b4b, #2563eb, #3b82f6, #8b5cf6, #9333ea);
            background-size: 600% 600%;
            animation: gradientFlow 22s ease infinite;
          }
        `}
      </style>

      {/* Background gradient + overlay */}
      <div className='absolute inset-0 moving-gradient'></div>
      <div className='absolute inset-0 bg-black/60 backdrop-blur-md'></div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.3),rgba(139,92,246,0.25),transparent_75%)]'></div>

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
        height={typeof window !== 'undefined' ? window.innerHeight : 1080}
      />

      {/* Nội dung Dashboard */}
      <div className='relative z-10 max-w-6xl w-full px-6 py-12'>
        <DashboardTitle />
        <DashboardCardList />
      </div>
    </div>
  )
}
