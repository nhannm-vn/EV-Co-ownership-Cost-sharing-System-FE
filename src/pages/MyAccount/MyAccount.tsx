import { motion } from 'framer-motion'
import DocCard from './Components/DocCard'
import Field from './Components/Field'

export default function ProfilePage() {
  //Demo data
  const profile = {
    username: 'Lupin III',
    avatar: 'https://opensource.fb.com/img/projects/react.jpg',
    email: 'lupin3@gmail.com',
    phone: '+84 912 345 678',
    cccd: null,
    gplx: null
  }

  return (
    <div
      // Nền gradient teal (xanh ngọc bích) đồng bộ với CreateGroups - năng lượng xe điện
      className='min-h-screen flex items-center justify-center p-6 font-sans 
                 bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688]'
    >
      {/* Card Profile với hiệu ứng fade-in + scale nhẹ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='w-full max-w-md bg-white/5 backdrop-blur-xl 
                   rounded-2xl p-8 shadow-[0_0_40px_rgba(20,184,166,0.7)] 
                   border-2 border-teal-400 space-y-6'
      >
        {/* Avatar + Username */}
        <motion.div
          className='flex flex-col items-center space-y-3'
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className='w-28 h-28 rounded-full overflow-hidden 
                       shadow-[0_0_25px_rgba(20,184,166,0.8)] 
                       border-2 border-teal-400'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <img src={profile.avatar} alt='avatar' className='w-full h-full object-cover' />
          </motion.div>

          <motion.h2
            className='text-3xl font-extrabold text-center text-white 
                       drop-shadow-[0_0_15px_rgba(94,234,212,0.6)]'
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {profile.username}
          </motion.h2>
        </motion.div>

        {/* Info fields với hiệu ứng stagger */}
        {/* map qua data để render ra các field hiển thị */}
        <motion.div
          className='space-y-4'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {[
            // glow là thuộc tính giúp biết được thằng nào sẽ có màu trắng thằng nào sẽ nhấp nháy
            { label: 'Email', value: profile.email, glow: true },
            { label: 'Phone', value: profile.phone, glow: true },
            { label: 'CCCD', value: '0123456789' },
            { label: 'GPLX', value: '79A-123456' }
          ].map((field, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <Field {...field} />
            </motion.div>
          ))}
        </motion.div>

        {/* Documents với hiệu ứng fade-in 
        Hai cái khung để hiển thị hình ảnh*/}
        <motion.div
          className='grid grid-cols-1 gap-4 pt-4'
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <DocCard title='CCCD' image={profile.cccd} />
          <DocCard title='GPLX' image={profile.gplx} />
        </motion.div>
      </motion.div>
    </div>
  )
}
