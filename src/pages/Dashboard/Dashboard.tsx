import { useQuery } from '@tanstack/react-query'
import { useMemo, useRef } from 'react'
import userApi from '../../apis/user.api'
import Skeleton from '../../components/Skeleton'
import DashboardCardList from './components/DashboardCardList'
import DashboardTitle from './components/DashboardTitle'

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className='relative overflow-hidden min-h-[1000px] pt-20'>
      {/* Cyan-to-Blue Background with Car Image */}
      <div className='absolute inset-0'>
        {/* Car Background Image */}
        <img
          src='https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1920&q=80'
          alt='Electric Car'
          className='w-full h-full object-cover'
        />

        {/* Cyan to Blue Gradient Overlay - Matching Image Colors */}
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-400/50 via-sky-500/60 to-blue-600/55' />

        {/* Additional Brightness Layer */}
        <div className='absolute inset-0 bg-gradient-to-t from-blue-700/30 via-transparent to-cyan-300/20' />
      </div>

      {/* Cyan-Blue Aurora Orbs */}
      <div className='absolute inset-0'>
        <div
          className='absolute -top-80 -left-80 w-[1200px] h-[1200px] bg-gradient-to-br from-cyan-300/35 via-sky-400/30 to-blue-400/30 rounded-full blur-[180px] animate-pulse'
          style={{ animationDuration: '10s' }}
        />
        <div
          className='absolute top-[10%] -right-80 w-[1150px] h-[1150px] bg-gradient-to-bl from-sky-300/35 via-cyan-400/30 to-blue-500/30 rounded-full blur-[170px] animate-pulse'
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <div
          className='absolute -bottom-80 left-[20%] w-[1100px] h-[1100px] bg-gradient-to-tr from-blue-400/35 via-sky-500/30 to-cyan-500/30 rounded-full blur-[165px] animate-pulse'
          style={{ animationDuration: '14s', animationDelay: '3.5s' }}
        />
      </div>

      {/* Cyan Grid Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]' />

      {/* Soft Vignette */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]' />

      {/* Particles Canvas */}
      <canvas ref={canvasRef} className='absolute inset-0 pointer-events-none' />

      {/* Main Content */}
      <div className='relative z-10 py-16 sm:py-20 lg:py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='group relative'>
              {/* Cyan-Blue Multi-layer Glow */}
              <div className='absolute -inset-10 bg-gradient-to-r from-cyan-400/50 via-sky-500/45 to-blue-500/50 blur-[85px] opacity-75 group-hover:opacity-95 group-hover:blur-[110px] transition-all duration-1000' />
              <div className='absolute -inset-7 bg-gradient-to-r from-cyan-300/45 via-sky-400/40 to-blue-400/45 blur-[60px] opacity-65 group-hover:opacity-85 transition-all duration-1000' />
              <div className='absolute -inset-3 bg-gradient-to-r from-cyan-200/35 via-sky-300/30 to-blue-300/35 blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-1000' />

              {/* Glass Card */}
              <div className='relative backdrop-blur-[50px] bg-gradient-to-br from-white/22 via-cyan-50/15 to-white/22 hover:from-white/30 hover:via-cyan-50/22 hover:to-white/30 rounded-[3.5rem] shadow-[0_20px_75px_rgba(0,0,0,0.3),0_0_75px_rgba(6,182,212,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] hover:shadow-[0_25px_95px_rgba(0,0,0,0.4),0_0_95px_rgba(6,182,212,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] hover:scale-[1.01] transition-all duration-700 ease-out overflow-hidden border-[3px] border-white/45 hover:border-cyan-100/60'>
                {/* Cyan Gradient Overlay */}
                <div className='absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-cyan-100/0 via-transparent to-sky-100/0 group-hover:from-cyan-50/20 group-hover:via-sky-50/12 group-hover:to-blue-50/20 transition-all duration-700' />

                {/* Cyan Top Edge Glow */}
                <div className='absolute -top-px left-[8%] right-[8%] h-[3px] bg-gradient-to-r from-transparent via-cyan-300/0 to-transparent group-hover:via-cyan-300/95 transition-all duration-700 shadow-[0_0_20px_rgba(6,182,212,0.7)]' />

                {/* Glass Texture */}
                <div className='absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.12] group-hover:from-white/[0.18] group-hover:to-white/[0.18] transition-all duration-700' />

                {/* Cyan Shimmer */}
                <div className='absolute inset-0 rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden'>
                  <div
                    className='absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]'
                    style={{ transition: 'transform 3.5s ease-in-out' }}
                  />
                </div>

                {/* Content Container */}
                <div className='relative p-10 sm:p-14 lg:p-20'>
                  {/* Cyan-Blue Corner Lights */}
                  <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-400/45 to-sky-500/40 group-hover:from-cyan-300/65 group-hover:to-sky-400/60 blur-[90px] rounded-full transition-all duration-700' />
                  <div className='absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-sky-400/45 to-blue-500/40 group-hover:from-sky-300/65 group-hover:to-blue-400/60 blur-[90px] rounded-full transition-all duration-700' />
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-t from-blue-500/45 to-cyan-400/40 group-hover:from-blue-400/65 group-hover:to-cyan-300/60 blur-[90px] rounded-full transition-all duration-700' />

                  {/* Center Ambient */}
                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-r from-cyan-300/18 via-sky-300/15 to-blue-300/15 group-hover:from-cyan-200/30 group-hover:via-sky-200/25 group-hover:to-blue-200/25 blur-[140px] rounded-full transition-all duration-1000' />

                  {/* Main Content */}
                  <div className='relative space-y-12'>
                    <DashboardTitle />
                    <DashboardCardList allowAccess={allowAccess} />
                    {!allowAccess && (
                      <div className='flex justify-start'>
                        <div className='backdrop-blur-lg bg-white/18 px-5 py-2 rounded-full border-[2px] border-cyan-200/40 shadow-[0_0_20px_rgba(6,182,212,0.3),inset_0_1px_5px_rgba(255,255,255,0.25)]'>
                          <p className='text-white text-xs font-bold italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]'>
                            *Phải upload CCCD và GPLX được phê duyệt để truy cập tất cả các tính năng
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blue Bottom Edge Glow */}
                <div className='absolute -bottom-px left-[8%] right-[8%] h-[3px] bg-gradient-to-r from-transparent via-sky-400/0 to-transparent group-hover:via-sky-400/95 transition-all duration-700 shadow-[0_0_20px_rgba(14,165,233,0.7)]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
