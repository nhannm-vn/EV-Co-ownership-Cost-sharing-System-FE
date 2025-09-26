import { motion } from 'framer-motion'

export default function HomeAnimation() {
  return (
    <section className='relative min-h-[73vh] flex items-center justify-center bg-gradient-to-br from-teal-300 via-cyan-200 to-white overflow-hidden'>
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
            Smart solutions for electric vehicle owners. Discover, charge, and share energy with a seamless experience.
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
  )
}
