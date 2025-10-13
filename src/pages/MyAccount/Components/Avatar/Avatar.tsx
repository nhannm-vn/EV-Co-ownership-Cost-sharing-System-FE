import { motion } from 'framer-motion'

function Avatar({ avatar }: { avatar: string }) {
  return (
    <motion.div className='relative' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}>
      <div className='absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 blur-xl opacity-50' />
      <div
        className='relative w-40 h-40 rounded-full overflow-hidden 
                 shadow-[0_0_30px_rgba(20,184,166,0.8)] 
                 border-4 border-teal-400'
      >
        <img src={avatar} alt='avatar' className='w-full h-full object-cover' />
      </div>
    </motion.div>
  )
}

export default Avatar
