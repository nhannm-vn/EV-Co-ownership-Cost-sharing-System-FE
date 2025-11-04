import { motion } from 'framer-motion'

const EmptyQRCard = ({ phase }: { phase: string }) => {
  const isCHECKIN = phase === 'CHECKIN'
  const colors = isCHECKIN
    ? { header: 'bg-teal-700', badge: 'bg-teal-100 text-teal-700', border: 'border-teal-300', bg: 'bg-teal-50' }
    : { header: 'bg-gray-700', badge: 'bg-gray-100 text-gray-700', border: 'border-gray-300', bg: 'bg-gray-50' }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-2xl shadow-sm border ${colors.border} overflow-hidden`}
    >
      <div className={`${colors.header} px-6 py-4 flex justify-between items-center`}>
        <p className='font-bold text-lg text-white'>{phase}</p>
        <span className={`${colors.badge} px-3 py-1 rounded-md text-xs font-semibold`}>{phase}</span>
      </div>
      <div className={`${colors.bg} px-6 py-16 flex flex-col items-center justify-center`}>
        <svg className='w-12 h-12 text-gray-300 mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M12 9v2m0 4v2m0 4v2M6 12H4m2 0h16M4 6h16M4 18h16'
          />
        </svg>
        <p className='text-gray-500 font-medium'>No QR {phase.toLowerCase()}</p>
        <p className='text-gray-400 text-xs'>Generated after {phase === 'CHECKIN' ? 'check-in' : 'check-out'}</p>
      </div>
    </motion.div>
  )
}

export default EmptyQRCard
