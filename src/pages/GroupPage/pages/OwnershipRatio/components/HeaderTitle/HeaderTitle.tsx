import { motion } from 'framer-motion'

function HeaderTitle() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center mb-8'>
      <h1 className='text-4xl font-bold text-teal-300 mb-2'>Quản Lý Đồng Sở Hữu Xe Điện</h1>
      <p className='text-gray-400'>Theo dõi tỷ lệ sở hữu và đóng góp</p>
    </motion.div>
  )
}

export default HeaderTitle
