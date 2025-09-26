import { categories, faqs } from './data/FAQData'
import { ArrowRightOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FAQItem from './components/FAQItems'

export default function Learnmore() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(categories[0].id) // state lưu id hiển thị arrow cho chuẩn
  const [activeFaq, setActiveFaq] = useState<string | null>(categories[0].key) // lưu state hiển main context đúng phần categories

  return (
    <div>
      <motion.h2
        className='bg-slate-100 text-center py-24 '
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        <h2 className='font-sans font-bold text-5xl text-gray-900'>Frequently Asked Questions</h2>
      </motion.h2>

      <motion.p
        className='flex gap-8 bg-[#E6E6E6] w-full  mx-auto px-48  py-10'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        {/* sidebar */}
        <aside className='w-[400px] h-[500px] bg-[#ffffff] p-4 flex flex-col gap-2 rounded-lg shadow-md '>
          <span className='font-sans text-[#808080] text-2xl mb-2 ml-4 '>Categories</span>
          <ul className='space-y-2'>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  className={classnames(
                    'flex items-center justify-between text-lg w-full px-4 py-2 rounded-lg text-left group transition-colors duration-200',
                    selectedCategory === category.id ? 'bg-[#212529] text-white' : 'text-[#000000] hover:bg-gray-300' // so sánh nếu đúng id thì hiện background
                  )}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setActiveFaq(category.key)
                  }} // khi bấm set id category vào state và lưu trạng thái active
                >
                  <span>{category.name}</span>
                  <ArrowRightOutlined
                    className={classnames(
                      'transition-all duration-200',
                      selectedCategory === category.id // so sánh id category với state nếu trùng thì đổi màu
                        ? 'text-red-500 opacity-100'
                        : 'text-gray-400 group-hover:text-gray-500 opacity-0 group-hover:opacity-100'
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </aside>
        {/* main content  */}
        {/* Object.entries(faqs) */}
        <div className=' flex-1 space-y-8 pt-6 '>
          {Object.entries(faqs).map(([sectionName, faqsArray], sectionIdx) => {
            // nếu đã chọn category rồi thì mới hiển thị  section khớp
            if (sectionName === activeFaq) {
              //  danh sách câu hỏi đúng với category đã chọn hay không
              return (
                <div key={sectionIdx}>
                  {/* Tiêu đề section */}
                  <h2 className='text-2xl font-bold mb-6 uppercase'>{sectionName}</h2>

                  {/* Câu hỏi trong section */}
                  {faqsArray.map((faq, idx) => {
                    const currentIndex = `${sectionIdx}-${idx}` // index duy nhất
                    return <FAQItem key={currentIndex} faq={faq} />
                  })}
                </div>
              )
            }
            return null
          })}
        </div>
      </motion.p>
    </div>
  )
}
