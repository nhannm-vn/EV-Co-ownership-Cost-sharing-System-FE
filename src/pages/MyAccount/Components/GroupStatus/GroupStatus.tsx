import { motion } from 'framer-motion'

function GroupStatus({ totalGroups, status }: { totalGroups: number; status: string }) {
  return (
    <div className='w-full grid grid-cols-2 gap-3 mt-4'>
      {/* Total Groups */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className='bg-gradient-to-br from-teal-600/30 to-teal-700/30 rounded-xl p-4 
               border border-teal-400/30 hover:border-teal-400/60 transition-all cursor-pointer 
               shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]'
      >
        <div className='flex flex-col items-center space-y-2'>
          {/* Groups Icon SVG */}
          <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='text-teal-300'>
            <path
              d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <circle cx='9' cy='7' r='4' stroke='currentColor' strokeWidth='2' />
            <path
              d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
          <div className='text-3xl font-black text-teal-200'>{totalGroups}</div>
          <div className='text-xs text-teal-300 font-semibold'>Groups</div>
          <div className='text-[10px] text-teal-400/70'>Joined</div>
        </div>
      </motion.div>

      {/* Status */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className='bg-gradient-to-br from-green-600/30 to-green-700/30 rounded-xl p-4 
               border border-green-400/30 hover:border-green-400/60 transition-all cursor-pointer 
               shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
      >
        <div className='flex flex-col items-center space-y-2'>
          {/* Status Icon SVG - Check Circle */}
          <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='text-green-300'>
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
            <path
              d='M9 12l2 2 4-4'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='text-lg font-bold text-green-200'>{status}</div>
          <div className='text-xs text-green-300 font-semibold'>Status</div>
          <div className='text-[10px] text-green-400/70'>Verified</div>
        </div>
      </motion.div>
    </div>
  )
}

export default GroupStatus
