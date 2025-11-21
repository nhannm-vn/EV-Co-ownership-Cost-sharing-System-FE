import { motion } from 'framer-motion'

function HeaderTitle() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center mb-8'>
      <h1 className='text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.7)] mb-2'>
        EV Co-ownership Management
      </h1>
      <p className='text-white/75 font-medium'>Track ownership percentages and contributions</p>
    </motion.div>
  )
}

export default HeaderTitle
