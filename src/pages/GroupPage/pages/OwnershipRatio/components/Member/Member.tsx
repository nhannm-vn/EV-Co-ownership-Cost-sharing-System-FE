import { formatPriceVN } from '../../../../../../utils/formatPrice'

interface IMember {
  name: string
  investment: number
  percentage: number
}

function Member({ investment, name, percentage }: IMember) {
  return (
    <div className='flex items-center gap-4 mb-3'>
      {/* User Icon - Màu giống nhau cho tất cả */}
      <div className='w-12 h-12 rounded-lg flex items-center justify-center' style={{ backgroundColor: '#14b8a6' }}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='white'>
          <circle cx='12' cy='9' r='3' />
          <path d='M5 20c0-4 3-6 7-6s7 2 7 6' />
        </svg>
      </div>

      {/* Name & Investment */}
      <div className='flex-grow'>
        <h3 className='text-white font-bold'>{name}</h3>
        <p className='text-sm text-gray-400'>{formatPriceVN(investment)} ₫</p>
      </div>

      {/* Percentage - Màu giống nhau cho tất cả */}
      <div className='text-3xl font-black text-teal-500'>{percentage}%</div>
    </div>
  )
}

export default Member
