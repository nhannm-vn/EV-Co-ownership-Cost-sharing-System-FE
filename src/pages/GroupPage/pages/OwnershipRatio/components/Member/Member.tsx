import { formatPriceVN } from '../../../../../../utils/formatPrice'

interface IMember {
  name: string
  investment: number
  percentage: number
}

function Member({ investment, name, percentage }: IMember) {
  return (
    <div className='flex items-center gap-4 mb-3'>
      {/* User Icon */}
      <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border-[2px] border-white/50'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='white'
          style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' }}
        >
          <circle cx='12' cy='9' r='3' />
          <path d='M5 20c0-4 3-6 7-6s7 2 7 6' />
        </svg>
      </div>

      {/* Name & Investment */}
      <div className='flex-grow'>
        <h3 className='text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>{name}</h3>
        <p className='text-sm text-white/70 font-medium'>{formatPriceVN(investment)} ₫</p>
      </div>

      {/* Percentage */}
      <div className='text-3xl font-black text-cyan-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]'>{percentage}%</div>
    </div>
  )
}

export default Member
