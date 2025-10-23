import { motion } from 'framer-motion'

function GroupStatus({ totalGroups, status }: { totalGroups: number; status: string }) {
  return (
    <div className='w-full grid grid-cols-2 gap-4 mt-4'>
      {/* Total Groups */}
      <motion.div
        whileHover={{ scale: 1.06, y: -3 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className='bg-white/12 backdrop-blur-xl rounded-xl p-4 
                   border-[2px] border-cyan-200/40 
                   hover:border-cyan-100/70 hover:bg-white/18
                   shadow-[0_0_20px_rgba(6,182,212,0.3),inset_0_1px_10px_rgba(255,255,255,0.08)]
                   hover:shadow-[0_0_30px_rgba(6,182,212,0.5),inset_0_1px_15px_rgba(255,255,255,0.12)]
                   transition-all duration-400 cursor-pointer'
      >
        <div className='flex flex-col items-center space-y-2'>
          {/* Groups Icon */}
          <svg
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            className='text-cyan-100 drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]'
          >
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
          <div className='text-3xl font-black text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]'>{totalGroups}</div>
          <div className='text-xs text-white font-bold'>Groups</div>
          <div className='text-[10px] text-white/70 font-medium'>Joined</div>
        </div>
      </motion.div>

      {/* Status */}
      <motion.div
        whileHover={{ scale: 1.06, y: -3 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className='bg-white/12 backdrop-blur-xl rounded-xl p-4 
                   border-[2px] border-green-200/40 
                   hover:border-green-100/70 hover:bg-white/18
                   shadow-[0_0_20px_rgba(74,222,128,0.3),inset_0_1px_10px_rgba(255,255,255,0.08)]
                   hover:shadow-[0_0_30px_rgba(74,222,128,0.5),inset_0_1px_15px_rgba(255,255,255,0.12)]
                   transition-all duration-400 cursor-pointer'
      >
        <div className='flex flex-col items-center space-y-2'>
          {/* Status Icon - Check Circle */}
          <svg
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            className='text-green-100 drop-shadow-[0_0_10px_rgba(74,222,128,0.7)]'
          >
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
            <path
              d='M9 12l2 2 4-4'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='text-lg font-bold text-white drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]'>{status}</div>
          <div className='text-xs text-white font-bold'>Status</div>
          <div className='text-[10px] text-white/70 font-medium'>Verified</div>
        </div>
      </motion.div>
    </div>
  )
}

export default GroupStatus
