import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
export default function HomeAbout() {
  //Trên đường dẫn lấy sau dấu #
  const { hash } = useLocation()

  //Cứ hash thay đổi thì làm
  useEffect(() => {
    const about = document.getElementById(hash.replace('#', ''))
    //Nếu có thì duy chuyển xuống dưới mượt đi
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <section
      id='about'
      className='border-t-0 py-24 bg-gradient-to-b from-emerald-50 via-white to-cyan-50 border-b-4 border-teal-200'
    >
      <div className='relative max-w-4xl mx-auto px-8 py-20 bg-white shadow-xl rounded-lg text-center'>
        <motion.h2
          className='text-3xl md:text-4xl font-extrabold text-emerald-600 mb-12'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          About Us
        </motion.h2>
        <motion.p
          className='text-gray-600 text-base md:text-lg font-light  max-w-3xl mx-auto text-center mb-4 font-serif leading-relaxed'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className='font-semibold text-emerald-800'>EVShare</span> is a platform for{' '}
          <span className='font-semibold text-emerald-700'>
            co-ownership management and electric vehicle cost sharing.
          </span>
          We help owners{' '}
          <span className='font-bold text-emerald-700'>easily track expenses, distribute costs transparently,</span> and
          optimize the use of electric vehicles within the community. EVShare is a platform for co-ownership management
          and electric vehicle cost sharing. We help owners easily track expenses, distribute costs transparently, and
          optimize the use of electric vehicles within the community. With EVShare, you can manage finances, usage
          history, and payments quickly and fairly, ensuring convenience and transparency for all members.
        </motion.p>
      </div>
    </section>
  )
}
