import { motion } from 'framer-motion'

interface IField {
  label: string
  value: string
  glow?: boolean
}

function Field({ label, value, glow = false }: IField) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(20,184,166,0.4)' }}
      className='w-full bg-black/20 rounded-xl p-4 shadow-md border border-white/10'
    >
      <p className='text-xs uppercase tracking-wider text-gray-400 mb-1'>{label}</p>
      <p
        className={`text-lg font-semibold ${
          glow
            ? 'bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-pulse'
            : 'text-white'
        }`}
      >
        {value}
      </p>
    </motion.div>
  )
}

export default Field
