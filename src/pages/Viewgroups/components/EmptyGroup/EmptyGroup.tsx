import { motion } from 'framer-motion'
import { Link } from 'react-router'
import path from '../../../../constants/path'

export default function EmptyGroup() {
  return (
    <div className={`relative w-full h-screen flex items-center justify-center p-6 `}>
      {/* Animated gradient background with floating blobs */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-emerald-700/60 via-sky-800/70 to-indigo-900/70' />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-green-400/40 to-cyan-400/40 blur-3xl'
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className='absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-lime-400/30 to-blue-400/30 blur-3xl'
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='relative w-full max-w-5xl rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden p-16 flex flex-col md:flex-row items-center gap-10'
      >
        {/* Left side illustration (EV car + charging station) */}
        <motion.div
          animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.03, 0.97, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className='w-full md:w-1/2 flex items-center justify-center'
        >
          <div className='relative w-64 h-64 rounded-2xl bg-gradient-to-br from-white/5 to-white/20 flex items-center justify-center shadow-inner overflow-hidden'>
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]' />
            {/* EV car illustration */}
            <div>
              <img src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png' alt='error_image' />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className='absolute bottom-4 text-xs text-white/70 px-3 py-1 rounded-full bg-black/20'
            >
              EV Sharing – Tương lai xanh
            </motion.div>
          </div>
        </motion.div>

        {/* Right content */}
        <div className='w-full md:w-1/2 text-center md:text-left'>
          <h3 className='text-3xl md:text-4xl font-sans text-white tracking-tight'>No groups available</h3>
          <p className='mt-4 font-sans text-base md:text-lg text-white/80 leading-relaxed'>
            Tạo nhóm quản lý đồng sở hữu xe điện để chia sẻ chi phí sạc, bảo trì và quyền sử dụng minh bạch.
          </p>

          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
            <Link
              to={path.home}
              className='px-6 py-3 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 text-sky-900 font-semibold shadow-lg hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-lime-500/30'
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Create New Group
              </motion.button>
            </Link>

            <Link
              to={path.dashBoard}
              className='px-6 py-3 rounded-full border border-white/20 text-white/90 bg-white/10 hover:bg-white/20 focus:outline-none'
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Return to Dashboard
              </motion.button>
            </Link>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3 text-sm text-white/70'>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-emerald-400' />
              <span>Theo dõi chi phí sạc</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-cyan-400' />
              <span>Chia sẻ quyền sử dụng</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-lime-400' />
              <span>Bảo trì minh bạch</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-blue-400' />
              <span>Lịch sử sử dụng rõ ràng</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
