'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Dashboard() {
  // Hiệu ứng particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='text-5xl font-extrabold text-center mb-12 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-emerald-300 animate-pulse drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]'
        >
          ⚡ EV Tech Dashboard
        </motion.h1>

        {/* 3 ô chức năng */}
        <motion.div
          initial='hidden'
          animate='show'
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className='grid md:grid-cols-3 gap-10'
        >
          {/* Create Group */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            whileHover={{
              scale: 1.07,
              boxShadow: '0 0 35px rgba(34,211,238,0.8)'
            }}
            className='flex flex-col bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-cyan-400/60 transition-all'
          >
            <h2 className='text-2xl font-semibold text-cyan-300 mb-4 drop-shadow-[0_0_10px_#22d3ee]'>Create Group</h2>
            <p className='text-gray-300 mb-6'>Tạo nhóm mới để quản lý và chia sẻ thông tin về xe điện.</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className='mt-auto px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium shadow-lg hover:shadow-cyan-400/50 transition transform hover:-translate-y-1'
            >
              Create
            </motion.button>
          </motion.div>

          {/* View Groups */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            whileHover={{
              scale: 1.07,
              boxShadow: '0 0 35px rgba(168,85,247,0.8)'
            }}
            className='flex flex-col bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-purple-400/60 transition-all'
          >
            <h2 className='text-2xl font-semibold text-purple-300 mb-4 drop-shadow-[0_0_10px_#a855f7]'>View Groups</h2>
            <p className='text-gray-300 mb-6'>Xem danh sách các nhóm xe điện mà bạn đã tham gia.</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className='mt-auto px-5 py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium shadow-lg hover:shadow-purple-400/50 transition transform hover:-translate-y-1'
            >
              View
            </motion.button>
          </motion.div>

          {/* Enter Code */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            whileHover={{
              scale: 1.07,
              boxShadow: '0 0 35px rgba(34,197,94,0.8)'
            }}
            className='flex flex-col bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border border-emerald-400/60 transition-all'
          >
            <h2 className='text-2xl font-semibold text-emerald-300 mb-4 drop-shadow-[0_0_10px_#22c55e]'>Enter Code</h2>
            <p className='text-gray-300 mb-6'>Nhập mã nhóm để tham gia vào cộng đồng EV của bạn.</p>
            <input
              type='text'
              placeholder='Enter code'
              className='w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className='mt-auto px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-lg hover:shadow-emerald-400/50 transition transform hover:-translate-y-1'
            >
              Join
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
