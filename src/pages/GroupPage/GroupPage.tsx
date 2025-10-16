import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'

export default function GroupPage() {
  // const elements = useGPElement()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='min-h-screen flex items-center justify-center relative overflow-hidden
                 bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688]'
    >
      {/* ánh sáng teal mờ trung tâm */}
      <div className='absolute inset-0'>
        <div
          className='absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2
                        bg-teal-500/30 blur-[120px] rounded-full'
        />
        <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/20 blur-[100px] rounded-full' />
      </div>
      {/* Nội dung trang con */}

      <Outlet />
    </motion.div>
  )
}
