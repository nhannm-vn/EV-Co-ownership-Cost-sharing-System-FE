import { useEffect, useMemo, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import userApi from '../../apis/user.api'
import DashboardCardList from './components/DashboardCardList'
import DashboardTitle from './components/DashboardTitle'
import Skeleton from '../../components/Skeleton'

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Fetch user profile with React Query
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => userApi.getProfile()
  })

  const allowAccess = useMemo(() => {
    const profile = userProfile?.data
    if (
      profile?.documents?.citizenIdImages?.front?.status === 'APPROVED' &&
      profile?.documents?.citizenIdImages?.back?.status === 'APPROVED' &&
      profile?.documents?.driverLicenseImages?.front?.status === 'APPROVED' &&
      profile?.documents?.driverLicenseImages?.back?.status === 'APPROVED'
    ) {
      return true
    }
    return false
  }, [userProfile])

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

    const edgeMargin = 150 // Particles only in edges

    const particles: Array<{
      x: number
      y: number
      r: number
      dx: number
      dy: number
      pulse: number
      pulseSpeed: number
      colorType: 'cyan' | 'sky' | 'blue' | 'teal'
      zone: 'top' | 'bottom' | 'left' | 'right'
    }> = []

    // Create particles around edges
    for (let i = 0; i < 80; i++) {
      const rand = Math.random()
      const zone = rand < 0.25 ? 'top' : rand < 0.5 ? 'bottom' : rand < 0.75 ? 'left' : 'right'

      let x, y
      if (zone === 'top') {
        x = Math.random() * canvas.width
        y = Math.random() * edgeMargin
      } else if (zone === 'bottom') {
        x = Math.random() * canvas.width
        y = canvas.height - Math.random() * edgeMargin
      } else if (zone === 'left') {
        x = Math.random() * edgeMargin
        y = Math.random() * canvas.height
      } else {
        x = canvas.width - Math.random() * edgeMargin
        y = Math.random() * canvas.height
      }

      const colorRand = Math.random()
      particles.push({
        x,
        y,
        r: Math.random() * 3.5 + 1.2,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.025,
        colorType: colorRand < 0.35 ? 'cyan' : colorRand < 0.6 ? 'sky' : colorRand < 0.85 ? 'blue' : 'teal',
        zone
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.pulse += p.pulseSpeed
        const pulseScale = 1 + Math.sin(p.pulse) * 0.5

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 24 * pulseScale)

        if (p.colorType === 'cyan') {
          gradient.addColorStop(0, `rgba(0,229,255,${0.9 * pulseScale})`)
          gradient.addColorStop(0.12, `rgba(6,182,212,${0.75 * pulseScale})`)
          gradient.addColorStop(0.35, `rgba(34,211,238,${0.5 * pulseScale})`)
          gradient.addColorStop(0.65, `rgba(103,232,249,${0.25 * pulseScale})`)
          gradient.addColorStop(1, 'rgba(165,243,252,0)')
        } else if (p.colorType === 'sky') {
          gradient.addColorStop(0, `rgba(0,149,255,${0.85 * pulseScale})`)
          gradient.addColorStop(0.12, `rgba(14,165,233,${0.7 * pulseScale})`)
          gradient.addColorStop(0.35, `rgba(56,189,248,${0.48 * pulseScale})`)
          gradient.addColorStop(0.65, `rgba(125,211,252,${0.22 * pulseScale})`)
          gradient.addColorStop(1, 'rgba(186,230,253,0)')
        } else if (p.colorType === 'blue') {
          gradient.addColorStop(0, `rgba(29,78,216,${0.8 * pulseScale})`)
          gradient.addColorStop(0.12, `rgba(37,99,235,${0.65 * pulseScale})`)
          gradient.addColorStop(0.35, `rgba(59,130,246,${0.45 * pulseScale})`)
          gradient.addColorStop(0.65, `rgba(96,165,250,${0.2 * pulseScale})`)
          gradient.addColorStop(1, 'rgba(147,197,253,0)')
        } else {
          gradient.addColorStop(0, `rgba(13,148,136,${0.75 * pulseScale})`)
          gradient.addColorStop(0.12, `rgba(20,184,166,${0.6 * pulseScale})`)
          gradient.addColorStop(0.35, `rgba(45,212,191,${0.4 * pulseScale})`)
          gradient.addColorStop(0.65, `rgba(94,234,212,${0.18 * pulseScale})`)
          gradient.addColorStop(1, 'rgba(153,246,228,0)')
        }

        ctx.fillStyle = gradient
        ctx.shadowBlur = 26 * pulseScale
        ctx.shadowColor =
          p.colorType === 'cyan'
            ? 'rgba(0,229,255,0.7)'
            : p.colorType === 'sky'
              ? 'rgba(0,149,255,0.65)'
              : p.colorType === 'blue'
                ? 'rgba(29,78,216,0.6)'
                : 'rgba(13,148,136,0.55)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulseScale, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Movement - keep in edge zones
        p.x += p.dx
        p.y += p.dy

        // Boundary check - keep particles in their zones
        if (p.zone === 'top') {
          if (p.x < 0 || p.x > canvas.width) p.dx *= -1
          if (p.y < 0 || p.y > edgeMargin) p.dy *= -1
        } else if (p.zone === 'bottom') {
          if (p.x < 0 || p.x > canvas.width) p.dx *= -1
          if (p.y < canvas.height - edgeMargin || p.y > canvas.height) p.dy *= -1
        } else if (p.zone === 'left') {
          if (p.x < 0 || p.x > edgeMargin) p.dx *= -1
          if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        } else {
          if (p.x < canvas.width - edgeMargin || p.x > canvas.width) p.dx *= -1
          if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        }

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)

          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.5
            const lineGradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y)
            lineGradient.addColorStop(0, `rgba(0,229,255,${alpha})`)
            lineGradient.addColorStop(0.33, `rgba(14,165,233,${alpha * 0.95})`)
            lineGradient.addColorStop(0.66, `rgba(20,184,166,${alpha * 0.9})`)
            lineGradient.addColorStop(1, `rgba(0,229,255,${alpha})`)
            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 1.2
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
  })

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className='relative overflow-hidden min-h-[1000px] pt-20'>
      {/* Aurora Borealis Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700'>
        {/* Premium Aurora Orbs */}
        <div
          className='absolute -top-80 -left-80 w-[1200px] h-[1200px] bg-gradient-to-br from-cyan-200/65 via-teal-300/55 to-sky-400/45 rounded-full blur-[180px] animate-pulse'
          style={{ animationDuration: '10s' }}
        />
        <div
          className='absolute top-[10%] -right-80 w-[1150px] h-[1150px] bg-gradient-to-bl from-sky-200/60 via-blue-300/50 to-indigo-400/40 rounded-full blur-[170px] animate-pulse'
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <div
          className='absolute -bottom-80 left-[20%] w-[1100px] h-[1100px] bg-gradient-to-tr from-teal-300/58 via-cyan-400/48 to-blue-500/38 rounded-full blur-[165px] animate-pulse'
          style={{ animationDuration: '14s', animationDelay: '3.5s' }}
        />
        <div
          className='absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-cyan-200/55 via-sky-300/45 to-blue-400/35 rounded-full blur-[140px] animate-pulse'
          style={{ animationDuration: '16s', animationDelay: '1.5s' }}
        />
        <div
          className='absolute bottom-[20%] right-[15%] w-[900px] h-[900px] bg-gradient-to-tl from-indigo-300/50 via-blue-200/42 to-cyan-300/32 rounded-full blur-[130px] animate-pulse'
          style={{ animationDuration: '18s', animationDelay: '2.5s' }}
        />

        {/* Aurora Grid Pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.15)_2px,transparent_2px),linear-gradient(90deg,rgba(20,184,166,0.12)_2px,transparent_2px)] bg-[size:75px_75px] [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_90%)]' />

        {/* Premium Multi-layered Aurora Glow */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,255,0.4),transparent_68%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,149,255,0.38),transparent_68%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(29,78,216,0.35),transparent_72%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center_right,rgba(13,148,136,0.32),transparent_65%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(6,182,212,0.3),transparent_65%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.28),transparent_68%)]' />

        {/* Premium Vignette */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(6,20,50,0.7)_100%)]' />
      </div>

      {/* Particles Canvas - EDGE NEURONS */}
      <canvas ref={canvasRef} className='absolute inset-0 pointer-events-none' />

      {/* Main Content */}
      <div className='relative z-10 py-16 sm:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            {/* Luxury Glassmorphism Card */}
            <div className='group relative'>
              {/* Premium Multi-layer Aurora Glow */}
              <div className='absolute -inset-10 bg-gradient-to-r from-cyan-300/60 via-sky-400/55 to-blue-400/50 blur-[85px] opacity-75 group-hover:opacity-95 group-hover:blur-[110px] transition-all duration-1000' />
              <div className='absolute -inset-7 bg-gradient-to-r from-teal-200/50 via-cyan-300/45 to-sky-300/40 blur-[60px] opacity-65 group-hover:opacity-85 transition-all duration-1000' />
              <div className='absolute -inset-3 bg-gradient-to-r from-cyan-100/35 via-sky-100/30 to-blue-200/28 blur-2xl opacity-45 group-hover:opacity-65 transition-all duration-1000' />

              {/* Luxury Glass Card with Chrome Effect */}
              <div className='relative backdrop-blur-[60px] bg-gradient-to-br from-cyan-400/88 via-sky-500/85 to-blue-600/88 hover:from-cyan-300/92 hover:via-sky-400/90 hover:to-blue-500/94 rounded-[3.5rem] shadow-[0_15px_70px_rgba(0,229,255,0.6),0_38px_120px_rgba(14,165,233,0.45),0_0_180px_rgba(29,78,216,0.35),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_22px_90px_rgba(0,229,255,0.75),0_48px_150px_rgba(14,165,233,0.55),0_0_220px_rgba(29,78,216,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] hover:scale-[1.01] transition-all duration-700 ease-out overflow-hidden border-[4px] border-cyan-100/60 hover:border-white/80'>
                {/* Luxury Gradient Overlay */}
                <div className='absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-cyan-200/0 via-transparent to-sky-200/0 group-hover:from-cyan-100/28 group-hover:via-blue-100/18 group-hover:to-sky-100/25 transition-all duration-700' />

                {/* Premium Chrome Edge Glow */}
                <div className='absolute -top-px left-[8%] right-[8%] h-[4px] bg-gradient-to-r from-transparent via-cyan-50/0 to-transparent group-hover:via-cyan-50/100 transition-all duration-700 shadow-[0_0_20px_rgba(0,229,255,0.8)]' />

                {/* Luxury Glass Texture with Depth */}
                <div className='absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.12] group-hover:from-white/[0.18] group-hover:to-white/[0.18] transition-all duration-700' />

                {/* Premium Aurora Shimmer */}
                <div className='absolute inset-0 rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden'>
                  <div
                    className='absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]'
                    style={{ transition: 'transform 3.5s ease-in-out' }}
                  />
                </div>

                {/* Content Container */}
                <div className='relative p-10 sm:p-14 lg:p-20'>
                  {/* Premium Aurora Corner Lights */}
                  <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-200/65 to-teal-200/55 group-hover:from-cyan-100/90 group-hover:to-teal-100/80 blur-[90px] rounded-full transition-all duration-700' />
                  <div className='absolute top-0 left-0 w-52 h-52 bg-gradient-to-br from-cyan-100/55 to-sky-100/45 group-hover:from-cyan-100/75 group-hover:to-sky-100/65 blur-[60px] rounded-full transition-all duration-700' />

                  <div className='absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-sky-200/62 to-blue-200/52 group-hover:from-sky-100/85 group-hover:to-blue-100/75 blur-[90px] rounded-full transition-all duration-700' />
                  <div className='absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-sky-100/52 to-cyan-100/42 group-hover:from-sky-100/72 group-hover:to-cyan-100/62 blur-[60px] rounded-full transition-all duration-700' />

                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-t from-cyan-300/60 to-sky-200/50 group-hover:from-cyan-200/85 group-hover:to-sky-100/75 blur-[90px] rounded-full transition-all duration-700' />
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-gradient-to-t from-sky-200/50 to-blue-100/40 group-hover:from-sky-100/70 group-hover:to-blue-100/58 blur-[60px] rounded-full transition-all duration-700' />

                  <div className='absolute bottom-0 right-0 w-68 h-68 bg-gradient-to-tl from-blue-200/58 to-sky-200/48 group-hover:from-blue-100/80 group-hover:to-sky-100/70 blur-[90px] rounded-full transition-all duration-700' />
                  <div className='absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-sky-100/48 to-teal-100/38 group-hover:from-sky-100/68 group-hover:to-teal-100/55 blur-[60px] rounded-full transition-all duration-700' />

                  {/* Premium Center Aurora Ambient */}
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-r from-cyan-200/25 via-sky-200/22 to-blue-200/18 group-hover:from-cyan-100/40 group-hover:via-sky-100/35 group-hover:to-blue-100/30 blur-[140px] rounded-full transition-all duration-1000' />

                  {/* Main Content */}
                  <div className='relative space-y-12'>
                    <DashboardTitle />
                    <DashboardCardList allowAccess={allowAccess} />
                    {/* Premium Caption */}
                    {!allowAccess && (
                      <div className='flex justify-start'>
                        <div className='backdrop-blur-lg bg-white/12 px-5 py-2 rounded-full border-[2px] border-white/30 shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_1px_8px_rgba(255,255,255,0.1)]'>
                          <p className='text-white text-xs font-bold italic drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'>
                            *Phải upload CCCD và GPLX được phê duyệt để truy cập tất cả các tính năng
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Premium Chrome Bottom Edge */}
                <div className='absolute -bottom-px left-[8%] right-[8%] h-[4px] bg-gradient-to-r from-transparent via-sky-50/0 to-transparent group-hover:via-sky-50/100 transition-all duration-700 shadow-[0_0_20px_rgba(14,165,233,0.8)]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
