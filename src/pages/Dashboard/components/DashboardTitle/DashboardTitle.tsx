import { motion } from 'framer-motion'

export default function DashboardTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='text-6xl font-extrabold text-center mb-14 tracking-wide text-white 
        [text-shadow:_0_0_10px_rgba(255,255,255,0.6),_0_0_20px_rgba(168,85,247,0.6),_0_0_35px_rgba(147,51,234,0.5),_0_0_60px_rgba(109,40,217,0.4)]'
    >
      EV Tech Dashboard
    </motion.h1>
  )
}
