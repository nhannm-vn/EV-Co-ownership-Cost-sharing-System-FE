import { motion } from 'framer-motion'

export default function HeaderSection() {
  return (
    <div className='text-center space-y-4 relative'>
      {/* Lock Icon with Effects */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
        className='relative inline-block'
      >
        {/* Pulse Ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute inset-0 bg-cyan-300/40 rounded-2xl blur-md'
        />

        <div className='relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-2xl flex items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.7),0_0_60px_rgba(14,165,233,0.4)] border-[3px] border-white/50 mx-auto backdrop-blur-sm'>
          <svg
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            className='text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
          >
            <rect x='5' y='11' width='14' height='10' rx='2' stroke='currentColor' strokeWidth='2.5' />
            <circle cx='12' cy='16' r='1.5' fill='currentColor' />
            <path d='M8 11V7a4 4 0 0 1 8 0v4' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
          </svg>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className='text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.7)] mb-2'>
          Change Password
        </h2>
        <p className='text-white/75 text-sm font-medium'>Keep your account secure</p>
      </motion.div>
    </div>
  )
}
