import { motion } from 'framer-motion'

export default function DashboardTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='text-5xl font-extrabold text-center mb-14 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-emerald-300 animate-pulse drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]'
    >
      ⚡ EV Tech Dashboard
    </motion.h1>
  )
}
