import { motion } from 'framer-motion'
import { Link } from 'react-router'
import path from '../../../../constants/path'
import logo from '../../../../assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png'

export default function EmptyGroup() {
  return (
    <div className='relative w-full h-screen flex items-center justify-center p-6'>
      {/* Background gradient + floating blobs */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-950 to-teal-900' />

        {/* Blob teal mờ */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute -top-20 -left-20 w-96 h-96 rounded-full 
                     bg-gradient-to-tr from-teal-500/20 to-teal-700/20 blur-3xl'
        />

        {/* Blob xanh cyan mờ */}
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className='absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full 
                     bg-gradient-to-tr from-teal-400/20 to-slate-700/20 blur-3xl'
        />
      </div>

      {/* Card trung tâm */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='relative w-full max-w-5xl rounded-3xl bg-white/5 backdrop-blur-lg 
                   border-2 border-teal-400 shadow-[0_0_40px_rgba(20,184,166,0.4)] 
                   overflow-hidden p-16 flex flex-col md:flex-row items-center gap-10'
      >
        {/* Left illustration */}
        <motion.div
          animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.03, 0.97, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className='w-full md:w-1/2 flex items-center justify-center'
        >
          <div
            className='relative w-64 h-64 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 
                          flex items-center justify-center shadow-inner overflow-hidden'
          >
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)]' />
            <div>
              <img src={logo} alt='error_image' />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className='absolute bottom-4 text-xs text-white/70 px-3 py-1 rounded-full bg-black/30'
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

          {/* Buttons */}
          <div className='mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
            <Link
              to={path.home}
              className='px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 
                         text-white font-semibold shadow-lg hover:brightness-110 
                         focus:outline-none focus:ring-4 focus:ring-teal-500/30
                         transition-all duration-300'
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Create New Group
              </motion.button>
            </Link>

            <Link
              to={path.dashBoard}
              className='px-6 py-3 rounded-full border-2 border-teal-400 text-white/90 
                         bg-white/5 hover:bg-white/10 focus:outline-none'
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Return to Dashboard
              </motion.button>
            </Link>
          </div>

          {/* Feature list */}
          <div className='mt-6 grid grid-cols-2 gap-3 text-sm text-white/70'>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-teal-400' />
              <span>Theo dõi chi phí sạc</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-teal-300' />
              <span>Chia sẻ quyền sử dụng</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-teal-500' />
              <span>Bảo trì minh bạch</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-teal-200' />
              <span>Lịch sử sử dụng rõ ràng</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
