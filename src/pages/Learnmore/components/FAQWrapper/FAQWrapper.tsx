import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  classInput?: string
}

export default function FAQWrapper({
  children,
  classInput = 'bg-[#E6E6E6] flex gap-8 w-full mx-auto py-16 px-52'
}: Props) {
  return (
    <motion.div
      className={classInput}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.7 }}
      viewport={{ once: true, amount: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
