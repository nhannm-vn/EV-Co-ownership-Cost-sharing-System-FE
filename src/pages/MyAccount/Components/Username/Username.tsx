import { motion } from 'framer-motion'

export default function Username({ username }: { username: string }) {
  return (
    <div className='text-center space-y-3'>
      <motion.h2
        className='text-3xl font-black text-white
                   drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]
                   drop-shadow-[0_0_25px_rgba(14,165,233,0.5)]'
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {username}
      </motion.h2>
      <div
        className='px-4 py-2 bg-white/15 backdrop-blur-lg rounded-full 
                      border-[2px] border-cyan-200/40 
                      inline-flex items-center gap-2
                      shadow-[0_0_20px_rgba(6,182,212,0.3),inset_0_1px_10px_rgba(255,255,255,0.08)]'
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          className='text-cyan-100 drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]'
        >
          <path d='M13 10V3L4 14h7v7l9-11h-7z' fill='currentColor' />
        </svg>
        <span className='text-white text-sm font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]'>EV Co-Owner</span>
      </div>
    </div>
  )
}
