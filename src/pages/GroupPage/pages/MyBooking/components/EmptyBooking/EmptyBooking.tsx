import { formatDate } from '../../../../../../utils/formatTimeMyBooking'
import { motion } from 'framer-motion'

export default function EmptyBooking({ weekDays }: { weekDays: Date[] }) {
  return (
    <div className='bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 p-6 my-8 rounded-3xl'>
      <div className='max-w-7xl mx-auto'>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-1 h-8 bg-gradient-to-b from-cyan-400 to-sky-500 rounded-full'></div>
            <h1 className='text-4xl font-bold text-gray-900'>My Bookings</h1>
          </div>
          <p className='text-gray-500 text-sm font-medium ml-5'>
            Week of {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center'
        >
          <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-10 h-10 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>No Bookings</h2>
          <p className='text-gray-600'>You don't have any bookings for this week.</p>
        </motion.div>
      </div>
    </div>
  )
}
