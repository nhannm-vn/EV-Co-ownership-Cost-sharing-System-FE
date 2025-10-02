import { BellOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons'
import { autoUpdate, offset, shift, useFloating } from '@floating-ui/react'
import { Avatar, Space } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router'
import path from '../../constants/path'

export default function Header() {
  const [lang, setLang] = useState('Tiếng Việt')
  // khởi tạo trạng thái đóng mở của dropdown tài khoản
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  const toggleLang = () => {
    setLang((prev) => (prev === 'Tiếng Việt' ? 'English' : 'Tiếng Việt'))
  }

  const { refs, floatingStyles } = useFloating({
    // trạng thái đóng mở
    open: isAccountOpen,
    // hàm cập nhập trạng thái
    onOpenChange: setIsAccountOpen,
    // nằm dưới vị trí reference
    placement: 'bottom-end',
    // Các "middleware" để điều chỉnh vị trí
    // Đẩy cách reference 16px - khoảng cách xa hơn
    // Nếu bị tràn màn hình, tự dịch vào trong shift()
    middleware: [offset(16), shift()],
    whileElementsMounted: autoUpdate
  })
  return (
    <header className='flex flex-row justify-between items-center px-6 py-1 bg-gradient-to-r from-[#0a1f2e] via-[#0d1b2a] to-[#111827] shadow-2xl border-b border-gray-800/50'>
      <Link to={path.dashBoard} className='flex w-28 h-28 items-center mr-24 transition-transform hover:scale-105'>
        <img
          src='src/assets/z7052214352472_9110bb340043f5ad4f507f5a29909fc3.png'
          alt='logo'
          className='block w-full h-full object-contain'
        />
        <div className='ml-2 text-lg font-bold text-gray-100 hover:text-teal-400 transition-colors duration-300'>
          EVShare
        </div>
      </Link>

      <div className='flex items-center gap-3'>
        <BellOutlined className='text-2xl text-gray-300 hover:text-teal-400 transition-all duration-300 cursor-pointer hover:scale-110' />

        <div
          // Bọc cả trigger và dropdown trong 1 div
          // Hover vào bất kỳ đâu trong div này (account hoặc dropdown) đều giữ dropdown mở
          // Chỉ khi rời ra ngoài hoàn toàn thì mới đóng
          onMouseEnter={() => setIsAccountOpen(true)}
          onMouseLeave={() => setIsAccountOpen(false)}
        >
          <div ref={refs.setReference}>
            <Space className='cursor-pointer'>
              <Avatar
                className='text-2xl text-gray-300 hover:text-teal-400 transition-all duration-300 hover:scale-110 bg-gray-700/60'
                icon={<UserOutlined />}
              />
              <span className='text-gray-300 font-medium'>dn@gmail.com</span>
            </Space>
          </div>

          {isAccountOpen && (
            <div
              // refs.setFloating: Đánh dấu đây là dropdown để Floating UI tính toán vị trí
              ref={refs.setFloating}
              style={floatingStyles}
              // before:content-[""]: Tạo phần tử giả ::before (cầu nối vô hình) cao 16px phía trên dropdown
              // Giúp di chuột từ account xuống dropdown dễ dàng hơn, không bị đóng khi qua khoảng trống
              className='bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50 
                         before:content-[""] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4'
            >
              <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-gray-800 font-medium'>
                Tài Khoản Của Tôi
              </div>
              <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-gray-800 font-medium'>
                Đơn Mua
              </div>
              <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors text-gray-800 font-medium border-t border-gray-200'>
                Đăng Xuất
              </div>
            </div>
          )}
        </div>

        <Space className='cursor-pointer' onClick={toggleLang}>
          <GlobalOutlined className='text-2xl text-gray-300 hover:text-teal-400 transition-all duration-300 hover:scale-110' />
          <span className='text-gray-300 font-medium w-24 inline-block'>{lang}</span>
        </Space>
      </div>
    </header>
  )
}
