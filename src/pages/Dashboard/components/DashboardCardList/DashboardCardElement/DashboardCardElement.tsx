import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface Props {
  children?: ReactNode
  moveLink: string
  content: {
    title: string
    body: string
    button: string
  }
  color: {
    boxShadow: string
    classDivBorder: string
    classHColor: string
    classButtonColor: string
  }
}

export default function DashboardCardElement({ color, content, children, moveLink }: Props) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
      whileHover={{
        scale: 1.07,
        boxShadow: `0 0 35px ${color.boxShadow}`
      }}
      className={`flex flex-col bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-center border transition-all ${color.classDivBorder}`}
    >
      <h2 className={`text-2xl font-semibold mb-4 ${color.classHColor}`}>{content.title}</h2>
      <p className='text-gray-300 mb-6'>{content.body}</p>
      {children}
      <Link
        to={moveLink}
        className={`mt-auto px-5 py-2.5 rounded-lg text-white font-medium shadow-lg transition transform hover:-translate-y-1
          ${color.classButtonColor}`}
      >
        <motion.button whileTap={{ scale: 0.9 }}>{content.button}</motion.button>
      </Link>
    </motion.div>
  )
}
