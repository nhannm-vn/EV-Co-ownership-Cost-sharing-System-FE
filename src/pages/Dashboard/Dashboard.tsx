import { useQuery } from '@tanstack/react-query'
import { useMemo, useRef, useEffect } from 'react'
import userApi from '../../apis/user.api'
import Skeleton from '../../components/Skeleton'
import { setUserIdToLS } from '../../utils/auth'
import DashboardCardList from './components/DashboardCardList'
import DashboardTitle from './components/DashboardTitle'
import { ExclamationCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => userApi.getProfile()
  })

  const allowAccess = useMemo(() => {
    const profile = userProfile?.data
    setUserIdToLS(profile?.userId.toString() as string)
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

  // Simplified Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className='relative overflow-hidden min-h-screen pt-20'>
      {/* Simplified Background */}
      <div className='absolute inset-0'>
        <img
          src='https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1920&q=80'
          alt='Electric Car'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/65 via-sky-600/70 to-blue-700/75' />
      </div>

      {/* Simplified Aurora - 2 Orbs Only */}
      <div className='absolute inset-0'>
        <div
          className='absolute top-0 left-0 w-[1000px] h-[1000px] bg-gradient-to-br from-cyan-400/35 to-sky-500/30 rounded-full blur-[150px] animate-pulse'
          style={{ animationDuration: '12s' }}
        />
        <div
          className='absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-tl from-blue-500/35 to-cyan-500/30 rounded-full blur-[150px] animate-pulse'
          style={{ animationDuration: '14s', animationDelay: '3s' }}
        />
      </div>

      {/* Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]' />

      {/* Vignette */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]' />

      {/* Particles */}
      <canvas ref={canvasRef} className='absolute inset-0 pointer-events-none' />

      {/* Main Content - Simplified */}
      <div className='relative z-10 py-12 sm:py-16 lg:py-20'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto'>
            <div className='group relative'>
              {/* Simplified Glow - 2 Layers */}
              <div className='absolute -inset-8 bg-gradient-to-r from-cyan-400/50 via-sky-500/45 to-blue-500/50 blur-[80px] opacity-70 group-hover:opacity-90 transition-all duration-700' />
              <div className='absolute -inset-3 bg-gradient-to-r from-cyan-300/40 to-blue-400/40 blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-700' />

              {/* Glass Card - Cleaner */}
              <div className='relative backdrop-blur-[50px] bg-gradient-to-br from-white/30 via-cyan-50/20 to-white/30 hover:from-white/40 hover:to-white/40 rounded-[3rem] shadow-[0_20px_70px_rgba(0,0,0,0.3),0_0_70px_rgba(6,182,212,0.35)] hover:shadow-[0_25px_90px_rgba(0,0,0,0.4),0_0_90px_rgba(6,182,212,0.45)] hover:scale-[1.01] transition-all duration-500 overflow-hidden border-[2px] border-white/60 hover:border-white/80'>
                {/* Top Edge Glow */}
                <div className='absolute top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent' />

                {/* Content */}
                <div className='relative p-8 sm:p-12 lg:p-16'>
                  {/* Ambient Light */}
                  <div className='absolute inset-0 bg-gradient-to-br from-cyan-200/20 via-transparent to-blue-200/20 rounded-[3rem]' />

                  {/* Main Content */}
                  <div className='relative space-y-10'>
                    <DashboardTitle />
                    <DashboardCardList allowAccess={allowAccess} />

                    {/* Compact Warning Banner */}
                    {!allowAccess && (
                      <div className='flex justify-center'>
                        <div className='relative group/warning max-w-2xl w-full'>
                          {/* Subtle Glow */}
                          <div className='absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-xl opacity-50 group-hover/warning:opacity-70 transition-all duration-300 rounded-xl' />

                          {/* Compact Card */}
                          <div className='relative backdrop-blur-lg bg-gradient-to-r from-cyan-600/90 to-blue-600/90 hover:from-cyan-500/90 hover:to-blue-500/90 px-6 py-4 rounded-xl shadow-xl border border-white/40 hover:border-white/60 transition-all duration-300'>
                            <div className='flex items-center gap-4'>
                              {/* Icon */}
                              <div className='flex-shrink-0 bg-white/25 p-2.5 rounded-lg'>
                                <ExclamationCircleOutlined style={{ fontSize: '24px', color: 'white' }} />
                              </div>

                              {/* Content */}
                              <div className='flex-1'>
                                <div className='flex items-center gap-2 mb-1'>
                                  <SafetyCertificateOutlined style={{ fontSize: '18px', color: 'white' }} />
                                  <h4 className='text-white text-sm font-sans uppercase'>Yêu cầu xác minh</h4>
                                </div>
                                <p className='text-white/95 text-sm font-sans'>
                                  Vui lòng upload <span className='font-black'>CCCD</span> và{' '}
                                  <span className='font-black'>GPLX</span> để truy cập đầy đủ tính năng
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Edge Glow */}
                <div className='absolute bottom-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
