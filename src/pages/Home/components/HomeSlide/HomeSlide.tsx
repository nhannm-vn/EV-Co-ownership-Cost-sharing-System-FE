import { motion } from 'framer-motion'
import { SLIDES_IMG_URL } from '../../../../constants/images'

function HomeSlide() {
  return (
    <section className='overflow-hidden pb-12 pt-8 bg-gradient-to-r from-teal-100 via-cyan-50  to-white'>
      <motion.div
        className='flex gap-6 w-[200%]'
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
      >
        {SLIDES_IMG_URL.map((img, i) => (
          <img key={i} src={img} alt='' className='shadow-lg rounded-lg border w-48 h-28 mr-7 object-cover' />
        ))}
      </motion.div>
    </section>
  )
}

export default HomeSlide
