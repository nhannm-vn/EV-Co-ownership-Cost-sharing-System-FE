import { motion } from 'framer-motion'

export default function HeaderSection() {
  return (
    <div className='text-center space-y-4 relative'>
      {/* Icon hình cái ổ khóa với hiệu ứng */}
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
          className='absolute inset-0 bg-teal-400/30 rounded-2xl blur-md'
        />

        <div className='relative w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.6)] mx-auto'>
          <svg width='36' height='36' viewBox='0 0 24 24' fill='none' className='text-white drop-shadow-lg'>
            <rect x='5' y='11' width='14' height='10' rx='2' stroke='currentColor' strokeWidth='2.5' />
            <circle cx='12' cy='16' r='1.5' fill='currentColor' />
            <path d='M8 11V7a4 4 0 0 1 8 0v4' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
          </svg>
        </div>
      </motion.div>

      {/* Title với hiệu ứng */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className='text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 mb-2'>
          Change Password
        </h2>
        <p className='text-teal-400/80 text-sm'>Bảo mật tài khoản của bạn</p>
      </motion.div>
    </div>
  )
}
