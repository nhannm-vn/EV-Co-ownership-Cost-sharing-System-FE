import { motion } from 'framer-motion'
import DashboardCardElement from './DashboardCardElement'

export default function DashboardCardList() {
  return (
    <motion.div
      initial='hidden'
      animate='show'
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className='grid md:grid-cols-3 gap-10'
    >
      {/* Create Group */}
      <DashboardCardElement
        color={{
          boxShadow: 'rgba(34,211,238,0.8)',
          classDivBorder: 'border-cyan-400/60',
          classHColor: 'drop-shadow-[0_0_10px_#22d3ee] text-cyan-300',
          classButtonColor: 'bg-cyan-500 hover:bg-cyan-600 hover:shadow-cyan-400/50'
        }}
        content={{
          title: 'Create Group',
          body: 'Tạo nhóm mới để quản lý và chia sẻ thông tin về xe điện.',
          button: 'Create'
        }}
      />

      {/* View Groups */}
      <DashboardCardElement
        color={{
          boxShadow: 'rgba(168,85,247,0.8)',
          classDivBorder: 'border-purple-400/60',
          classHColor: 'drop-shadow-[0_0_10px_#a855f7] text-purple-300',
          classButtonColor: 'bg-purple-500 hover:bg-purple-600 hover:shadow-purple-400/50'
        }}
        content={{
          title: 'View Groups',
          body: 'Xem danh sách các nhóm xe điện mà bạn đã tham gia.',
          button: 'View'
        }}
      />

      {/* Enter Code */}
      <DashboardCardElement
        color={{
          boxShadow: 'rgba(34,197,94,0.8)',
          classDivBorder: 'border-emerald-400/60',
          classHColor: 'drop-shadow-[0_0_10px_#22c55e] text-emerald-300',
          classButtonColor: 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-400/50'
        }}
        content={{
          title: 'Enter Code', //
          body: 'Nhập mã nhóm để tham gia vào cộng đồng EV của bạn.',
          button: 'Join'
        }}
      >
        <input
          type='text'
          placeholder='Enter code'
          className='w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition'
        />
      </DashboardCardElement>
    </motion.div>
  )
}
