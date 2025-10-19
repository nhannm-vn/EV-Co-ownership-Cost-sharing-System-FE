import { motion } from 'framer-motion'

interface IButton {
  isReady: boolean
  uploadedCount: number
  currentStep: 1 | 2
  isUploading: boolean
}

function Button({ isReady, uploadedCount, currentStep, isUploading }: IButton) {
  const isLastStep = currentStep === 2

  const getButtonText = () => {
    if (isUploading) {
      return 'Đang upload...'
    }
    if (isReady) {
      return isLastStep ? '✓ Upload & Hoàn thành' : 'Upload & Tiếp tục →'
    }
    return `Còn thiếu ${2 - uploadedCount} mặt`
  }

  return (
    <motion.button
      whileHover={{ scale: isReady && !isUploading ? 1.02 : 1 }}
      whileTap={{ scale: isReady && !isUploading ? 0.98 : 1 }}
      type='submit'
      disabled={!isReady || isUploading}
      className='flex-1 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700 flex items-center justify-center gap-2'
    >
      {isUploading && <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white' />}
      {getButtonText()}
    </motion.button>
  )
}

export default Button
