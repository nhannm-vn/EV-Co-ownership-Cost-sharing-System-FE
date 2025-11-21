import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

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
  allowAccess: boolean
  handleVerify?: () => void
}

export default function DashboardCardElement({ color, content, children, moveLink, allowAccess, handleVerify }: Props) {
  console.log(allowAccess)
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      whileHover={{
        y: -5,
        boxShadow: `0 15px 40px ${color.boxShadow}`
      }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col bg-slate-800/60 backdrop-blur-md rounded-xl shadow-lg p-6 border transition-all duration-300 ${color.classDivBorder} hover:bg-slate-800/70`}
    >
      {/* Content */}
      <div className='relative z-10 flex flex-col h-full'>
        {/* Title */}
        <h2 className={`text-xl font-bold mb-3 ${color.classHColor} transition-colors duration-300`}>
          {content.title}
        </h2>

        {/* Description */}
        <p className='text-slate-100 text-sm leading-relaxed mb-5 flex-grow'>{content.body}</p>

        {/* Children (e.g. input field) */}
        {children}

        {/* Button */}
        {allowAccess ? (
          <Link to={moveLink} className='mt-auto'>
            <motion.button
              onClick={handleVerify}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${color.classButtonColor}`}
            >
              <span>{content.button}</span>
              <svg
                className='w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </motion.button>
          </Link>
        ) : (
          <div className='mt-auto'>
            <button
              className={`w-full px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${color.classButtonColor} opacity-50 cursor-not-allowed`}
            >
              <span>{content.button}</span>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
