import type { FagSection } from '../../../../types/page/learnmore.types'
import FAQItem from '../FAQItems'

interface Props {
  faqs: FagSection
  activeFaq: string
}

export default function FAQMainContext({ faqs, activeFaq }: Props) {
  return (
    <div className=' flex-1 space-y-8 pt-6 '>
      {Object.entries(faqs).map(([sectionName, faqsArray], sectionIndex) => {
        // nếu đã chọn category rồi thì mới hiển thị  section khớp
        if (sectionName === activeFaq) {
          //  danh sách câu hỏi đúng với category đã chọn hay không
          return (
            <div key={sectionIndex}>
              {/* Tiêu đề section */}
              <h2 className='text-2xl font-bold mb-6 uppercase'>{sectionName}</h2>
              {/* Câu hỏi trong section */}
              {faqsArray.map((faq, index) => {
                const currentIndex = `${sectionIndex}-${index}` // index duy nhất
                return <FAQItem key={currentIndex.toString()} faq={faq} />
              })}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
