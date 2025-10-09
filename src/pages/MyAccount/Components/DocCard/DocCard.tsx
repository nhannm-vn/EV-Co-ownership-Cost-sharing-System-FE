import { motion } from 'framer-motion'

interface IDocCard {
  title: string
  image: string | null
}

function DocCard({ title, image }: IDocCard) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(0,255,255,0.4)' }}
      className='w-full rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-br from-black via-purple-900 to-blue-900 shadow-lg'
    >
      <div className='p-3 text-center text-gray-300 text-sm font-medium bg-black/30'>{title}</div>
      {image ? (
        <img src={image} alt={title} className='w-full h-56 object-cover' />
      ) : (
        <div className='w-full h-56 flex items-center justify-center text-gray-400 text-sm bg-gradient-to-r from-black via-purple-900 to-blue-900'>
          Chưa có {title}
        </div>
      )}
    </motion.div>
  )
}

export default DocCard
