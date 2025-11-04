import { motion } from 'framer-motion'

interface EmptyStateProps {
  title?: string
  description?: string
}

export default function EmptyState({
  title = 'Không có dữ liệu',
  description = 'Hiện tại không có dữ liệu nào để hiển thị'
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center min-h-80 flex flex-col items-center justify-center'
    >
      <svg className='w-16 h-16 text-gray-300 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
      <h3 className='text-lg font-bold text-gray-900 mb-2'>{title}</h3>
      <p className='text-gray-500'>{description}</p>
    </motion.div>
  )
}
