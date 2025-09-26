import { motion } from 'framer-motion'

function HomeSlide() {
  return (
    <section className='overflow-hidden pb-12 pt-8 bg-gradient-to-r from-teal-100 via-cyan-50  to-white'>
      <motion.div
        className='flex gap-6 w-[200%]'
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
      >
        {[
          'src/assets/slide/precious-madubuike-N2Td7KpIvYc-unsplash.jpg',
          'src/assets/slide/co-owner-owns-a-property-from-rental-income.jpg',
          'src/assets/slide/ralph-hutter-sBtDQMmWQPI-unsplash.jpg',
          'src/assets/slide/hannah-busing-Zyx1bK9mqmA-unsplash.jpg',
          'src/assets/slide/john-cameron-ftIPiEdrx2s-unsplash.jpg',
          'src/assets/slide/230818152324-electric-vehicle-charging-061222.jpg',
          'src/assets/slide/images.jpg',
          'src/assets/slide/Giving-Away-Money-Will-Make-You-Richer.jpg',
          'src/assets/slide/possessed-photography-PuwfRakCJvk-unsplash.jpg'
        ].map((img, i) => (
          <img key={i} src={img} alt='' className='shadow-lg rounded-lg border w-44 h-24 mr-7 object-cover' />
        ))}
      </motion.div>
    </section>
  )
}

export default HomeSlide
