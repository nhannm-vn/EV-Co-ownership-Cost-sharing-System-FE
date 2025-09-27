import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  classInput?: string
}

export default function FAQWrapper({
  children,
  // grid grid-cols-1 là chia theo mobile chiếm 1 hàng , md(>= 768px):thì width 400px , _1fr là phần con lại chiếm hết
  classInput = 'bg-[#E6E6E6] grid grid-cols-1 md:grid-cols-[400px_1fr]  gap-6 w-full mx-auto py-8 px-4 md:px-12 lg:px-24'
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
