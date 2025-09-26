import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react'

type FAQItemProps = {
  faq: {
    question: string
    answer: string
  }
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className='rounded-lg overflow-hidden my-7 shadow-md'>
      <button
        onClick={() => setOpen(!open)} // nếu bấm vào set thành true
        className={
          'w-full px-6 py-3 min-h-[64px] bg-[#232529] rounded-xl text-white font-bold text-lg text-left whitespace-nowrap flex items-center justify-between'
        }
      >
        <span className='text-left'>{faq.question}</span>
        {/* Mũi tên xuống, bấm vào xoay lên */}
        <DownOutlined
          className={`text-red-500 text-sm transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className='px-6 py-3 bg-gray-100 text-black'>{faq.answer}</div>}
    </div>
  )
}
