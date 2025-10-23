import { motion } from 'framer-motion'

export default function Button() {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
      type='submit'
      className='w-full py-4 rounded-xl font-bold text-white 
                 bg-gradient-to-r from-cyan-400 to-sky-500 
                 shadow-[0_8px_32px_rgba(6,182,212,0.6),0_0_20px_rgba(6,182,212,0.4)] 
                 hover:shadow-[0_10px_40px_rgba(6,182,212,0.8),0_0_30px_rgba(6,182,212,0.6)]
                 border-[2px] border-white/40 hover:border-white/60
                 transition-all duration-400 
                 relative overflow-hidden group'
    >
      {/* Animated Shine Effect */}
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent'
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      <span className='relative flex items-center justify-center gap-2'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          className='text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
        >
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
