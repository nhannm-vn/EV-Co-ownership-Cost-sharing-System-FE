import { useEffect, useRef } from 'react'
import DashboardTitle from './components/DashboardTitle'
import DashboardCardList from './components/DashboardCardList'

export default function Dashboard() {
  // Hiệu ứng particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // Xài uffect để giúp lúc nào vào thì hiệu ứng này cũng sẽ chạy hết
  //và nó sẽ chạy lần đầu tiên khi component render
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const particles: { x: number; y: number; r: number; dx: number; dy: number }[] = []

    // tạo hạt
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255,255,255,0.8)'

      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
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
            background: linear-gradient(270deg, #0f172a, #0ea5e9, #7c3aed, #06b6d4);
            background-size: 400% 400%;
            animation: gradientFlow 18s ease infinite;
          }
        `}
      </style>

      {/* Background gradient + overlay */}
      <div className='absolute inset-0 moving-gradient'></div>
      <div className='absolute inset-0 bg-black/70 backdrop-blur-md'></div>

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
        {/* 3 ô chức năng */}
        <DashboardCardList />
      </div>
    </div>
  )
}
