import { motion } from 'framer-motion'

interface IProgressBar {
  uploadedCount: number
  maxCount: number
}

function ProgressBar({ uploadedCount, maxCount }: IProgressBar) {
  return (
    <div className='max-w-md mx-auto pt-2'>
      <div className='flex justify-between text-xs text-teal-300 mb-2'>
        <span>Tiến độ bước này</span>
        <span>
          {uploadedCount}/{maxCount} mặt
        </span>
      </div>
      <div className='w-full bg-slate-700/50 rounded-full h-2 overflow-hidden'>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(uploadedCount / maxCount) * 100}%` }}
          transition={{ duration: 0.3 }}
          className='h-full bg-gradient-to-r from-teal-500 to-cyan-500'
        />
      </div>
    </div>
  )
}

export default ProgressBar
