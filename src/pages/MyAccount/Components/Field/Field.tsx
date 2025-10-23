import { motion } from 'framer-motion'

interface IField {
  label: string
  value: string
  glow?: boolean
}

function Field({ label, value, glow = false }: IField) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 30px rgba(6,182,212,0.5), 0 0 50px rgba(14,165,233,0.3)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className='w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 
                 shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_1px_10px_rgba(255,255,255,0.08)]
                 border-[2px] border-white/30
                 hover:border-white/50 hover:bg-white/15
                 transition-all duration-400'
    >
      <p className='text-xs uppercase tracking-wider text-white/60 font-semibold mb-1.5'>{label}</p>
      <p
        className={`text-base font-bold ${
          glow
            ? 'bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]'
            : 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
        }`}
      >
        {value}
      </p>
    </motion.div>
  )
}

export default Field
