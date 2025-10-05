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
  // khởi tạo trạng thái đóng mở thông báo
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  // trạng thái cho phép scroll để xem thêm thông báo
  // false: hiển thị 5 items đầu, không scroll
  // true: hiển thị tất cả items với scroll xem tất cả item
  const [enableNotificationScroll, setEnableNotificationScroll] = useState(false)

  // demo danh sách thông báo (có thể lấy từ API)
  const notifications = [
    {
      id: 1,
      message: 'Có chuyến đi mới được đăng',
      // lấy hiện tại trừ 5 phút trước
      createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 phút trước
      isRead: false
    },
    {
      id: 2,
      message: 'Yêu cầu chia sẻ chi phí đã được chấp nhận',
      createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 phút trước
      isRead: false
    },
    {
      id: 3,
      message: 'Thanh toán chi phí đã hoàn thành',
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 phút trước
      isRead: false
    },
    {
      id: 4,
      message: 'Người dùng mới tham gia nhóm chia sẻ',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 giờ trước
      isRead: true
    },
    {
      id: 5,
      message: 'Xe điện đã sẵn sàng cho chuyến đi',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 giờ trước
      isRead: true
    },
    {
      id: 6,
      message: 'Thanh toán định kỳ sắp đến hạn',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 ngày trước
      isRead: true
    },
    {
      id: 7,
      message: 'Báo cáo chi phí tháng đã sẵn sàng',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 ngày trước
      isRead: true
    },
    {
      id: 8,
      message: 'Có cập nhật mới về lịch trình',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 tuần trước
      isRead: true
    }
  ]

  // hàm này giúp hiển thị các dòng như 5 phút trước , 2  giờ trước
  const formatTimeAgo = (createdAt: Date) => {
    // lấy thời gian hiện tại
    const now = new Date()
    // diffInMinute là số phút đã trôi qua thời điểm kể từ khi tạo
    // lấy số mili giây hiện tại trừ đi mili giây tạo chia cho 1000 * 60 để đổi ra phút
    const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) {
      return 'Vừa xong'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`
      // 1440 phút là 24  giờ
    } else if (diffInMinutes < 1440) {
      // < 24 hours
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} giờ trước`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} ngày trước`
    }
  }

  // Số lượng thông báo chưa đọc (tự động tính từ array) để hiển thị trên chuông cho người dùng biết có thông báo mới
  const notificationCount = notifications.filter((n) => !n.isRead).length

  // hàm chuyển đổi ngôn ngữ
  const toggleLang = () => {
    setLang((prev) => (prev === 'Tiếng Việt' ? 'English' : 'Tiếng Việt'))
  }

  // Handler khi user bấm "Xem thêm" - enable scroll để xem tất cả thông báo
  const handleShowMore = () => {
    setEnableNotificationScroll(true)
  }

  // Handler khi user bấm "Ẩn bớt" - về trạng thái ban đầu (5 items, không scroll)
  const handleShowLess = () => {
    setEnableNotificationScroll(false)
  }

  // Xác định danh sách thông báo sẽ hiển thị dựa trên trạng thái scroll
  const getDisplayedNotifications = () => {
    if (enableNotificationScroll) {
      // Đã bấm "Xem thêm" -> hiển thị tất cả thông báo
      return notifications
    } else {
      // Trạng thái mặc định -> chỉ hiển thị 5 thông báo đầu tiên
      return notifications.slice(0, 5)
    }
  }

  const { refs: accountRefs, floatingStyles: accountFloatingStyles } = useFloating({
    // trạng thái đóng mở account
    open: isAccountOpen,
    onOpenChange: setIsAccountOpen,
    placement: 'bottom-end',
    // shift dropdown không bị tràn ra ngoài
    middleware: [offset(8), shift()],
    whileElementsMounted: autoUpdate
  })

  const { refs: notificationRefs, floatingStyles: notificationFloatingStyles } = useFloating({
    // trạng thái đóng mở notification
    open: isNotificationOpen,
    onOpenChange: setIsNotificationOpen,
    placement: 'bottom-start',
    middleware: [offset(8), shift()],
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
        <div onMouseEnter={() => setIsNotificationOpen(true)} onMouseLeave={() => setIsNotificationOpen(false)}>
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
                      key={notification.id}
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
                        onClick={handleShowMore}
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
                        onClick={handleShowLess}
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

        <div
          // Bọc cả trigger và dropdown trong 1 div
          // Hover vào bất kỳ đâu trong div này (account hoặc dropdown) đều giữ dropdown mở
          // Chỉ khi rời ra ngoài hoàn toàn thì mới đóng
          onMouseEnter={() => setIsAccountOpen(true)}
          onMouseLeave={() => setIsAccountOpen(false)}
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
              className='bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50 
                         before:content-[""] before:absolute before:-top-2 before:left-0 before:right-0 before:h-2'
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
