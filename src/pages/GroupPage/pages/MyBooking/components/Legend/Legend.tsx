import { motion } from 'framer-motion'

function Legend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className='mt-7 bg-white rounded-2xl shadow-lg border border-gray-100 p-6'
    >
      <h3 className='font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest'>Status</h3>
      <div className='flex flex-wrap gap-6'>
        <div className='flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform'>
          <div className='w-4 h-4 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 shadow-sm group-hover:shadow-md transition-shadow'></div>
          <span className='text-sm font-semibold text-gray-700'>Confirmed</span>
        </div>
        <div className='flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform'>
          <div className='w-4 h-4 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm group-hover:shadow-md transition-shadow'></div>
          <span className='text-sm font-semibold text-gray-700'>Completed</span>
        </div>
        <div className='flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform'>
          <div className='w-4 h-4 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 shadow-sm group-hover:shadow-md transition-shadow'></div>
          <span className='text-sm font-semibold text-gray-700'>Cancelled</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Legend
