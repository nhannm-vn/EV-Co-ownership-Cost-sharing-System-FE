import { BellOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'
import { useState } from 'react'
import formatTimeAgo from '../../utils/caculatimeNotification'
import { notifications } from '../Header/data/test-data'
import useCustomFloating from '../../hooks/useCustomFloating'

// type AccountFloatingStyles = React.CSSProperties
// interface Props {
//   refs: {
//     accountRefs: UseFloatingReturn['refs']
//     notificationRefs: UseFloatingReturn['refs']
//   }
//   floatingStyles: {
//     accountFloatingStyles: AccountFloatingStyles
//     notificationFloatingStyles: AccountFloatingStyles
//   }
// }

function NavHeader() {
  // set trạng thái cho ngôn ngữ
  const [lang, setLang] = useState('Tiếng Việt')
  // khởi tạo trạng thái đóng mở của dropdown tài khoản
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  // khởi tạo trạng thái đóng mở thông báo
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  // trạng thái cho phép scroll để xem thêm thông báo
  const [enableNotificationScroll, setEnableNotificationScroll] = useState(false)

  // hàm giúp set các state boolean
  const handleSetState = (func: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    func((prev) => !prev)
  }

  // Số lượng thông báo chưa đọc (tự động tính từ array) để hiển thị trên chuông cho người dùng biết có thông báo mới
  const notificationCount = notifications.filter((n) => !n.isRead).length

  // Xác định danh sách thông báo sẽ hiển thị dựa trên trạng thái scroll
  const getDisplayedNotifications = () => (enableNotificationScroll ? notifications : notifications.slice(0, 5))

  //floating account
  const { refs: accountRefs, floatingStyles: accountFloatingStyles } = useCustomFloating({
    open: isAccountOpen,
    setOpen: setIsAccountOpen,
    placement: 'bottom-end'
  })

  //floating notification

  const { refs: notificationRefs, floatingStyles: notificationFloatingStyles } = useCustomFloating({
    open: isNotificationOpen,
    setOpen: setIsNotificationOpen,
    placement: 'bottom-start'
  })

  return (
    <div className='flex items-center gap-3'>
      {/* Notification */}
      <div
        onMouseEnter={handleSetState(setIsNotificationOpen)} //
        onMouseLeave={handleSetState(setIsNotificationOpen)}
      >
        <div ref={notificationRefs.setReference} className='relative'>
          <BellOutlined className='text-2xl text-gray-300 hover:text-teal-400 transition-all duration-300 cursor-pointer hover:scale-110' />
          {notificationCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse'>
              {notificationCount}
            </span>
          )}
        </div>

        {isNotificationOpen && (
          <div
            ref={notificationRefs.setFloating}
            style={notificationFloatingStyles}
            className='bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[280px] z-50 
                   before:content-[""] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2'
          >
            {notifications.length > 0 && (
              // Container thông báo với scroll logic động
              <div
                className={`${
                  enableNotificationScroll
                    ? // Khi enable scroll: có max-height 300px + custom scrollbar
                      'max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
                    : // Khi chưa enable: không có scroll, height tự động theo content (5 items)
                      ''
                }`}
              >
                {/* 
              Hiển thị danh sách thông báo:
              - Nếu chưa bấm "Xem thêm": hiển thị 5 thông báo đầu tiên
              - Nếu đã bấm "Xem thêm": hiển thị tất cả thông báo với scroll
            */}
                {getDisplayedNotifications().map((notification) => (
                  <div
                    key={notification.id.toString()}
                    className={`px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                      // nếu chưa đọc thì nền xanh chữ đen  , đã đọc chữ nhạt hơn xíu
                      !notification.isRead ? 'bg-blue-50 text-gray-900' : 'text-gray-800'
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='text-sm font-medium flex-1'>{notification.message}</div>
                      {/* chấm tròn xanh là chưa đọc */}
                      {!notification.isRead && (
                        <div className='w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1 flex-shrink-0'></div>
                      )}
                    </div>
                    <div className='text-xs text-gray-500 mt-1'>{formatTimeAgo(notification.createdAt)}</div>
                  </div>
                ))}
                {/* 
              Button "Xem thêm" - chỉ hiển thị khi:
              1. Có > 5 notifications
              2. Chưa enable scroll (đang ở trạng thái mặc định)
            */}
                {/* nếu như số thong bóa lớn hơn 5 và scroll bị tắt hiện xem thêm thông báo  */}
                {notifications.length > 5 && !enableNotificationScroll && (
                  <div className='px-4 py-2 text-center border-t border-gray-200 bg-gray-50'>
                    <button
                      onClick={handleSetState(setEnableNotificationScroll)}
                      className='text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors'
                    >
                      Xem thêm {notifications.length - 5} thông báo
                    </button>
                  </div>
                )}
                {/* 
              Button "Ẩn bớt" - chỉ hiển thị khi:
              1. Đã enable scroll (đang xem tất cả notifications)
              2. Có > 5 notifications
              Bấm sẽ quay về trạng thái ban đầu (5 items, không scroll)
              nếu scroll mở và thông báo lớn hơn 5 có thêm nút ẩn bớt 
            */}
                {enableNotificationScroll && notifications.length > 5 && (
                  <div className='px-4 py-2 text-center border-t border-gray-200 bg-gray-50'>
                    <button
                      onClick={handleSetState(setEnableNotificationScroll)}
                      className='text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors'
                    >
                      Ẩn bớt
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Account */}
      <div
        // Bọc cả trigger và dropdown trong 1 div
        // Hover vào bất kỳ đâu trong div này (account hoặc dropdown) đều giữ dropdown mở
        // Chỉ khi rời ra ngoài hoàn toàn thì mới đóng
        onMouseEnter={handleSetState(setIsAccountOpen)}
        onMouseLeave={handleSetState(setIsAccountOpen)}
      >
        <div ref={accountRefs.setReference}>
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
            ref={accountRefs.setFloating}
            style={accountFloatingStyles}
            // before:content-[""]: Tạo phần tử giả ::before (cầu nối vô hình) cao 8px phía trên dropdown
            // Giúp di chuột từ account xuống dropdown dễ dàng hơn, không bị đóng khi qua khoảng trống
            className='bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[180px] ml-5 z-50 
                   before:content-[""]  before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 '
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

      {/* Language */}
      <Space
        className='cursor-pointer'
        onClick={() => setLang((prev) => (prev === 'Tiếng Việt' ? 'English' : 'Tiếng Việt'))}
      >
        <GlobalOutlined className='text-2xl text-gray-300 hover:text-teal-400 transition-all duration-300 hover:scale-110' />
        <span className='text-gray-300 font-medium w-24 inline-block'>{lang}</span>
      </Space>
    </div>
  )
}

export default NavHeader
