import { motion } from 'framer-motion'

function Button({ isReady, uploadedCount }: { isReady: boolean; uploadedCount: number }) {
  return (
    <motion.button
      whileHover={{ scale: isReady ? 1.02 : 1 }}
      whileTap={{ scale: isReady ? 0.98 : 1 }}
      type='submit'
      disabled={!isReady}
      className='w-full py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {isReady ? '✓ Xác nhận Upload' : `Còn thiếu ${4 - uploadedCount} mặt`}
    </motion.button>
  )
}

export default Button
