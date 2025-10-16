import { motion } from 'framer-motion'

export default function Button() {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      type='submit'
      className='w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-[0_0_30px_rgba(20,184,166,0.5)] hover:shadow-[0_0_40px_rgba(20,184,166,0.7)] transition-all duration-300 relative overflow-hidden group'
    >
      {/* Animated Shine Effect chỉ dùng Framer Motion */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent'
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8 }}
      />

      <span className='relative flex items-center justify-center gap-2'>
        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-white'>
          <path
            d='M5 13l4 4L19 7'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        Confirm Change
      </span>
    </motion.button>
  )
}
