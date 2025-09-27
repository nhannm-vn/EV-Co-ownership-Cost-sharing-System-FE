import { categories, faqs } from './data/FAQData'
import { Fragment, useState } from 'react'
import FAQTitle from './components/FAQTitle'
import FAQAside from './components/FAQAside'
import FAQMainContext from './components/FAQMainContext'
import FAQWrapper from './components/FAQWrapper'
// import FAQMainContext from './components/FAQMainContext'

export default function Learnmore() {
  // state lưu id hiển thị arrow cho chuẩn
  const [selectedCategory, setSelectedCategory] = useState<number>(categories[0].id)
  // lưu state hiển main context đúng phần categories
  const [activeFaq, setActiveFaq] = useState<string>(categories[0].key)
  // gom các thành phần thành một object để truyền đi xuống component con
  const propChild = {
    categories,
    selectedCategory,
    setSelectedCategory,
    setActiveFaq
  }

  return (
    <Fragment>
      <FAQWrapper classInput='bg-slate-100 text-center py-16'>
        <FAQTitle />
      </FAQWrapper>
      <FAQWrapper>
        <FAQAside propChild={propChild} />
        <FAQMainContext faqs={faqs} activeFaq={activeFaq} />
      </FAQWrapper>
    </Fragment>
  )
}
