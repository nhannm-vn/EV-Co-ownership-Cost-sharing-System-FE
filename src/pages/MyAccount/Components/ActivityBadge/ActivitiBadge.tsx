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
        <div className='text-left'>
          <div className='text-white font-bold text-sm drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'>{status}</div>
          <div className='text-white/75 text-xs font-medium'>{formatVnTime(time)}</div>
        </div>
      </div>
    </div>
  )
}
