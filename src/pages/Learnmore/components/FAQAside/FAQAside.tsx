import { ArrowRightOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import type { Category } from '../../../../types/page/learnmore.types'

interface Props {
  propChild: {
    categories: Category[]
    selectedCategory: number
    setSelectedCategory: (element: number) => void
    setActiveFaq: (element: string) => void
  }
}

export default function FAQAside({ propChild }: Props) {
  //handle click: giúp set state khi mà click
  const handleClick = (categoryId: number, categoryKey: string) => {
    setSelectedCategory(categoryId)
    setActiveFaq(categoryKey)
  }

  const { categories, selectedCategory, setActiveFaq, setSelectedCategory } = propChild

  return (
    <aside className='w-[400px] h-[550px] bg-[#ffffff] py-5 px-3 flex flex-col gap-2 rounded-lg shadow-md '>
      <span className='font-sans text-[#808080] text-2xl mb-2 ml-4 '>Categories</span>
      <ul className='space-y-2'>
        {categories.map((category) => (
          <li key={category.id.toString()}>
            <button
              className={classNames(
                'flex items-center justify-between text-lg w-full px-4 py-2 rounded-lg text-left group transition-colors duration-200',
                selectedCategory === category.id //
                  ? 'bg-[#212529] text-white'
                  : 'text-[#000000] hover:bg-gray-300' // so sánh nếu đúng id thì hiện background
              )}
              onClick={() => {
                handleClick(category.id, category.key)
              }} // khi bấm set id category vào state và lưu trạng thái active
            >
              <span>{category.name}</span>
              <ArrowRightOutlined
                className={classNames(
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
  )
}
