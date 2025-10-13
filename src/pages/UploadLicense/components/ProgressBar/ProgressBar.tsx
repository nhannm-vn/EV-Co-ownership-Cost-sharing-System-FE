import { motion } from 'framer-motion'

function ProgressBar({ uploadedCount }: { uploadedCount: number }) {
  return (
    <div className='max-w-md mx-auto pt-2'>
      <div className='flex justify-between text-xs text-teal-300 mb-2'>
        <span>Tiến độ</span>
        <span>{uploadedCount}/4 mặt</span>
      </div>
      <div className='w-full bg-slate-700/50 rounded-full h-2 overflow-hidden'>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(uploadedCount / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
          className='h-full bg-gradient-to-r from-teal-500 to-cyan-500'
        />
      </div>
    </div>
  )
}

export default ProgressBar
