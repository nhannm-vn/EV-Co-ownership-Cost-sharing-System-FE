import { motion } from 'framer-motion'

function ProgressBar({ percentage, index }: { percentage: number; index: number }) {
  return (
    <div className='bg-white/15 backdrop-blur-sm rounded-full h-2.5 overflow-hidden border border-white/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]'>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
        className='h-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
        style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.8))' }}
      />
    </div>
  )
}

export default ProgressBar
