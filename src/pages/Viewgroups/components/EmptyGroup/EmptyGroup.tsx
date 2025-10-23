import { motion } from 'framer-motion'
import { Link } from 'react-router'
import path from '../../../../constants/path'
import logo from '../../../../assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png'

export default function EmptyGroup() {
  return (
    <div className='relative w-full min-h-[600px] flex items-center justify-center p-6'>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='relative w-full max-w-5xl rounded-3xl backdrop-blur-xl bg-white/15 border-[3px] border-white/40 shadow-[0_0_40px_rgba(6,182,212,0.4),inset_0_1px_20px_rgba(255,255,255,0.1)] overflow-hidden p-12 md:p-16 flex flex-col md:flex-row items-center gap-10'
      >
        {/* Top gradient bar */}
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200' />

        {/* Left illustration */}
        <motion.div
          animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.03, 0.97, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className='w-full md:w-1/2 flex items-center justify-center'
        >
          <div className='relative w-64 h-64 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_2px_15px_rgba(255,255,255,0.1)] border-[2px] border-white/30 overflow-hidden'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]' />
            <div>
              <img src={logo} alt='error_image' />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className='absolute bottom-4 text-xs text-white font-semibold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30'
            >
              EV Sharing – Tương lai xanh
            </motion.div>
          </div>
        </motion.div>

        {/* Right content */}
        <div className='w-full md:w-1/2 text-center md:text-left'>
          <h3 className='text-3xl md:text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-tight'>
            No groups available
          </h3>
          <p className='mt-4 text-base md:text-lg text-white/80 leading-relaxed font-medium'>
            Tạo nhóm quản lý đồng sở hữu xe điện để chia sẻ chi phí sạc, bảo trì và quyền sử dụng minh bạch.
          </p>

          {/* Buttons */}
          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
            <Link to={path.home}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 text-white font-bold shadow-[0_8px_25px_rgba(6,182,212,0.5)] hover:shadow-[0_10px_35px_rgba(6,182,212,0.7)] border-[2px] border-white/40 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transition-all duration-300'
              >
                Create New Group
              </motion.button>
            </Link>

            <Link to={path.dashBoard}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-6 py-3 rounded-full border-[2px] border-white/50 text-white font-bold bg-white/10 hover:bg-white/20 backdrop-blur-lg focus:outline-none transition-all duration-300'
              >
                Return to Dashboard
              </motion.button>
            </Link>
          </div>

          {/* Feature list */}
          <div className='mt-8 grid grid-cols-2 gap-3 text-sm text-white/80 font-medium'>
            {[
              { label: 'Theo dõi chi phí sạc', color: 'bg-cyan-300' },
              { label: 'Chia sẻ quyền sử dụng', color: 'bg-sky-300' },
              { label: 'Bảo trì minh bạch', color: 'bg-indigo-300' },
              { label: 'Lịch sử sử dụng rõ ràng', color: 'bg-cyan-200' }
            ].map((item, idx) => (
              <div key={idx} className='flex items-center gap-2'>
                <span className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_8px_currentColor]`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200' />
      </motion.div>
    </div>
  )
}
