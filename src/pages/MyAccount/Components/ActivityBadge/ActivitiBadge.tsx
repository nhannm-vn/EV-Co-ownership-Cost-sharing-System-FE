import { formatVnTime } from '../../../../utils/helper'

export default function ActivitiBadge({ status, time }: { status: string; time: string }) {
  return (
    <div
      className='w-full bg-white/12 backdrop-blur-lg rounded-xl p-4
               border-[2px] border-white/35
               shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_1px_10px_rgba(255,255,255,0.08)]
               hover:bg-white/18 hover:border-white/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]
               transition-all duration-400'
    >
      <div className='flex items-center justify-center gap-3'>
        {/* Battery Icon SVG with Glow */}
        <svg
          width='26'
          height='26'
          viewBox='0 0 24 24'
          fill='none'
          className='text-cyan-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]'
        >
          <rect x='1' y='6' width='18' height='12' rx='2' stroke='currentColor' strokeWidth='2' />
          <path d='M19 10h2v4h-2' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          <rect x='4' y='9' width='10' height='6' fill='currentColor' fillOpacity='0.9' />
        </svg>

        <div className='text-left'>
          <div className='text-white font-bold text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'>{status}</div>
          <div className='text-white/75 text-xs font-medium'>{formatVnTime(time)}</div>
        </div>
      </div>
    </div>
  )
}
