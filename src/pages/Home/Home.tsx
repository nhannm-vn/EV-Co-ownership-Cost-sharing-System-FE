import { motion } from 'framer-motion'
import { Fragment } from 'react/jsx-runtime'

function Home() {
  return (
    <Fragment>
      <section className='relative min-h-[69vh] flex items-center justify-center bg-gradient-to-br from-teal-300 via-cyan-200 to-white overflow-hidden'>
        {/* Floating background blob */}
        <motion.div
          className='absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/40 rounded-full blur-3xl'
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Content wrapper */}
        <div className='container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10'>
          {/* Left text */}
          <div className='flex-1 text-center lg:text-left'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-4xl md:text-5xl font-extrabold text-emerald-900'
            >
              Drive into the <span className='text-emerald-600'>Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className='mt-6 text-gray-600 text-lg max-w-lg mx-auto lg:mx-0'
            >
              Smart solutions for electric vehicle owners. Discover, charge, and share energy with a seamless
              experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className='mt-8 flex gap-4 justify-center lg:justify-start'
            >
              <a
                href='#get-started'
                className='px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition'
              >
                Get Started
              </a>
              <a
                href='#learn-more'
                className='px-6 py-3 rounded-lg bg-white text-emerald-600 font-semibold shadow border border-emerald-600 hover:bg-emerald-50 transition'
              >
                Learn More
              </a>
            </motion.div>
          </div>

          {/* Right image with floating effect */}
          <motion.div
            className='flex-1 flex justify-center'
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
          >
            <img
              src='src/assets/z7049220448378_8b2ec9fc4f2ed8a19a620e26db5eb64f.jpg'
              alt='EV Car'
              className='w-[75%] max-w-md rounded-xl shadow-2xl'
            />
          </motion.div>
        </div>
      </section>
      {/* list slide */}
      <section className='overflow-hidden py-12 bg-gradient-to-r from-teal-100 via-cyan-50  to-white'>
        <motion.div
          className='flex gap-6 w-[200%]'
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        >
          {[
            'src/assets/slide/hannah-busing-Zyx1bK9mqmA-unsplash.jpg',
            'src/assets/slide/john-cameron-ftIPiEdrx2s-unsplash.jpg',
            'src/assets/slide/possessed-photography-PuwfRakCJvk-unsplash.jpg',
            'src/assets/slide/precious-madubuike-N2Td7KpIvYc-unsplash.jpg',
            'src/assets/slide/29797-clock-sstock-533640004.jpg',
            'src/assets/slide/ralph-hutter-sBtDQMmWQPI-unsplash.jpg',
            'src/assets/slide/red-dot-iy8h-Cl8MLc-unsplash.jpg',
            'src/assets/slide/rock-staar-NzIV4vOBA7s-unsplash.jpg',
            'src/assets/slide/co-owner-owns-a-property-from-rental-income.jpg',
            'src/assets/slide/230818152324-electric-vehicle-charging-061222.jpg',
            'src/assets/slide/images.jpg',
            'src/assets/slide/Giving-Away-Money-Will-Make-You-Richer.jpg',
            'src/assets/slide/AdobeStock_377905344-scaled.jpeg'
          ].map((img, i) => (
            <img key={i} src={img} alt='' className='shadow-lg rounded-lg border w-52 h-28 mr-7 object-cover' />
          ))}
        </motion.div>
      </section>
    </Fragment>
  )
}

export default Home
