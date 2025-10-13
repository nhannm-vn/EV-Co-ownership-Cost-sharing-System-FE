import { motion } from 'framer-motion'

function ProgressBar({ percentage, index }: { percentage: number; index: number }) {
  return (
    <div className='bg-slate-700/50 rounded-full h-2 overflow-hidden'>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
        className='h-full bg-teal-500'
      />
    </div>
  )
}

export default ProgressBar
