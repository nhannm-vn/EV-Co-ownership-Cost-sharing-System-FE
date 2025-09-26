import { motion } from 'framer-motion'

const services = [
  {
    icon: '/assets/icons/charging.svg',
    title: 'Fast Charging',
    description: 'Charge your EV quickly and efficiently at supported stations.'
  },
  {
    icon: '/assets/icons/share.svg',
    title: 'Energy Sharing',
    description: 'Share energy with other users seamlessly through our network.'
  },
  {
    icon: '/assets/icons/analytics.svg',
    title: 'Smart Analytics',
    description: 'Monitor and optimize your EV usage with smart insights.'
  },
  {
    icon: '/assets/icons/support.svg',
    title: '24/7 Support',
    description: 'Get assistance anytime with our dedicated support team.'
  }
]

export default function HomeService() {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-teal-700 mb-12'>Our Services</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, i) => (
            <motion.div
              key={i}
              className='p-6 rounded-xl shadow-lg bg-teal-50 hover:shadow-2xl transition cursor-pointer'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <img src={service.icon} alt={service.title} className='w-16 h-16 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-teal-800 mb-2'>{service.title}</h3>
              <p className='text-gray-600 text-sm'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
