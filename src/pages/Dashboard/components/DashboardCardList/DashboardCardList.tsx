import { motion } from 'framer-motion'
import path from '../../../../constants/path'
import DashboardCardElement from './DashboardCardElement'

export default function DashboardCardList({ allowAccess }: { allowAccess: boolean }) {
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
      className='grid md:grid-cols-3 gap-8'
    >
      {/* Create Group */}
      <DashboardCardElement
        allowAccess={allowAccess}
        color={{
          boxShadow: 'rgba(0,255,255,0.7)',
          classDivBorder: 'border-3 border-cyan-200/80 hover:border-cyan-100 transition-all duration-400',
          classHColor: 'drop-shadow-[0_0_22px_rgba(0,255,255,0.7)] text-cyan-50',
          classButtonColor:
            'bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-300 hover:to-teal-400 shadow-[0_5px_28px_rgba(0,255,255,0.6)] hover:shadow-[0_8px_40px_rgba(0,255,255,0.8)] transition-all duration-400'
        }}
        moveLink={path.createGroups}
        content={{
          title: 'Create Group',
          body: 'Tạo nhóm mới để quản lý và chia sẻ thông tin về xe điện.',
          button: 'Create'
        }}
      />

      {/* View Groups */}
      <DashboardCardElement
        allowAccess={allowAccess}
        color={{
          boxShadow: 'rgba(0,191,255,0.7)',
          classDivBorder: 'border-3 border-sky-200/80 hover:border-sky-100 transition-all duration-400',
          classHColor: 'drop-shadow-[0_0_22px_rgba(0,191,255,0.7)] text-sky-50',
          classButtonColor:
            'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 shadow-[0_5px_28px_rgba(0,191,255,0.6)] hover:shadow-[0_8px_40px_rgba(0,191,255,0.8)] transition-all duration-400'
        }}
        moveLink={path.viewGroups}
        content={{
          title: 'View Groups',
          body: 'Xem danh sách các nhóm xe điện mà bạn đã tham gia.',
          button: 'View'
        }}
      />

      {/* Enter Code */}
      <DashboardCardElement
        allowAccess={allowAccess}
        color={{
          boxShadow: 'rgba(99,102,241,0.7)',
          classDivBorder: 'border-3 border-indigo-200/80 hover:border-indigo-100 transition-all duration-400',
          classHColor: 'drop-shadow-[0_0_22px_rgba(99,102,241,0.7)] text-indigo-50',
          classButtonColor:
            'bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-300 hover:to-indigo-400 shadow-[0_5px_28px_rgba(99,102,241,0.6)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.8)] transition-all duration-400'
        }}
        moveLink=''
        content={{
          title: 'Enter Code',
          body: 'Nhập mã nhóm để tham gia vào cộng đồng EV của bạn.',
          button: 'Join'
        }}
      >
        <div className='relative mb-4'>
          <input
            type='text'
            placeholder='Enter group code'
            className='w-full px-5 py-3.5 rounded-2xl border-3 border-indigo-200/70 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/80 focus:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-400 backdrop-blur-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]'
          />
        </div>
      </DashboardCardElement>
    </motion.div>
  )
}
