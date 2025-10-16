import { motion } from 'framer-motion'

export default function Username({ username }: { username: string }) {
  return (
    <div className='text-center space-y-2'>
      <motion.h2
        className='text-4xl font-black text-transparent bg-clip-text 
               bg-gradient-to-r from-teal-300 to-cyan-300'
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {username}
      </motion.h2>
      <div className='px-4 py-1 bg-teal-500/20 rounded-full border border-teal-400/30 inline-flex items-center gap-2'>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-teal-300'>
          <path d='M13 10V3L4 14h7v7l9-11h-7z' fill='currentColor' />
        </svg>
        <span className='text-teal-300 text-sm font-semibold'>EV Co-Owner</span>
      </div>
    </div>
  )
}
