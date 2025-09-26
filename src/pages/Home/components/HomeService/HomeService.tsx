import { CarOutlined, DollarOutlined, IssuesCloseOutlined, UserOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const services = [
  {
    icon: <UserOutlined className='text-[50px]' />,
    title: 'User & Ownership Management',
    description: 'Manage accounts, verify identity, create groups, and handle co-ownership contracts.'
  },
  {
    icon: <CarOutlined className='text-[50px]' />,
    title: 'Vehicle Booking & Usage',
    description: 'Fair scheduling, easy check-in/out, and transparent vehicle usage.'
  },
  {
    icon: <DollarOutlined className='text-[50px]' />,
    title: 'Cost Sharing & Payments',
    description: 'Auto-split costs, manage group funds, and pay securely online.'
  },
  {
    icon: <IssuesCloseOutlined className='text-[50px]' />,
    title: 'Issue & Dispute Handling',
    description: 'Report damages, assign responsibility, and resolve conflicts clearly.'
  }
]

export default function HomeService() {
  return (
    <section className='pb-60 pt-32 bg-gradient-to-b from-teal-50 via-white to-emerald-50'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-emerald-900 mb-12'>
          Our <span className='text-emerald-600'>Services</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, i) => (
            <motion.div
              key={i}
              className='p-6 rounded-2xl shadow-md bg-white border border-teal-100
                         hover:shadow-lg hover:shadow-teal-200 hover:border-teal-400
                         transition transform hover:scale-105 cursor-pointer'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div
                className='w-20 h-20 mx-auto mb-4 flex items-center justify-center align-middle
                              rounded-full bg-gradient-to-tr from-teal-400 to-cyan-300 shadow-md'
              >
                {service.icon}
                {/* <img src={service.icon} alt={service.title} className='w-10 h-10' /> */}
              </div>
              <h3 className='text-xl font-semibold text-teal-800 mb-2'>{service.title}</h3>
              <p className='text-gray-600 text-sm'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
