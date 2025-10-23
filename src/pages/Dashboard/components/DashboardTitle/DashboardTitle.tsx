import { motion } from 'framer-motion'

export default function DashboardTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='relative mb-14'
    >
      {/* Premium Glow Background */}
      <div className='absolute -inset-4 blur-2xl opacity-50 bg-gradient-to-r from-cyan-300/25 via-sky-300/25 to-indigo-300/25 rounded-full' />

      <motion.h1
        animate={{
          textShadow: [
            '0_0_10px_rgba(6,182,212,0.6),_0_0_20px_rgba(14,165,233,0.45),_0_0_35px_rgba(79,70,229,0.35)',
            '0_0_13px_rgba(14,165,233,0.7),_0_0_23px_rgba(79,70,229,0.5),_0_0_38px_rgba(6,182,212,0.4)',
            '0_0_10px_rgba(6,182,212,0.6),_0_0_20px_rgba(14,165,233,0.45),_0_0_35px_rgba(79,70,229,0.35)'
          ]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className='relative text-4xl sm:text-5xl font-extrabold text-center tracking-wide
          drop-shadow-[0_2px_5px_rgba(0,0,0,0.2)]'
      >
        <span className='relative inline-block bg-gradient-to-r from-white via-sky-50 to-white bg-clip-text text-transparent'>
          EV Tech Dashboard
          {/* Elegant Shimmer */}
          <motion.span
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear'
            }}
            className='absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent bg-[length:200%_100%] bg-clip-text'
          />
        </span>
      </motion.h1>
    </motion.div>
  )
}
