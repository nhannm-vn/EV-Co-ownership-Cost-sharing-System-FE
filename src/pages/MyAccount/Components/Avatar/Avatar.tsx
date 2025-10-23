import { motion } from 'framer-motion'

function Avatar({ avatar }: { avatar: string }) {
  return (
    <motion.div
      className='relative'
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 250, damping: 15 }}
    >
      {/* Multi-layer Holographic Glow */}
      <div
        className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300/50 via-sky-300/50 to-indigo-300/50 blur-2xl opacity-60 animate-pulse'
        style={{ animationDuration: '3s' }}
      />
      <div className='absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/10 blur-xl opacity-40' />

      {/* Premium Avatar Ring */}
      <div
        className='relative w-40 h-40 rounded-full overflow-hidden 
                 shadow-[0_0_35px_rgba(6,182,212,0.6),0_0_60px_rgba(14,165,233,0.4),inset_0_2px_15px_rgba(255,255,255,0.15)]
                 border-[4px] border-white/70
                 hover:border-white/90 hover:shadow-[0_0_45px_rgba(6,182,212,0.8),0_0_80px_rgba(14,165,233,0.6)]
                 transition-all duration-500
                 backdrop-blur-sm'
      >
        <img src={avatar} alt='avatar' className='w-full h-full object-cover' />

        {/* Holographic Overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none' />
      </div>

      {/* Rotating Ring Effect */}
      <motion.div
        className='absolute inset-0 rounded-full border-[3px] border-transparent'
        style={{
          background: 'linear-gradient(45deg, rgba(6,182,212,0.6), rgba(79,70,229,0.6)) border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

export default Avatar
