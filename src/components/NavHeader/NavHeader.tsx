import {
  BellOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
  LogoutOutlined,
  TransactionOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Space, Modal, Avatar as AvatarIcon } from 'antd'
import { useContext, useState } from 'react'
import { Link } from 'react-router'
import path from '../../constants/path'
import useCustomFloating from '../../hooks/useCustomFloating'
import formatTimeAgo from '../../utils/caculatimeNotification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { clearLS, getAccessTokenFromLS, getEmailAccountFromLS, getUserIdFromLS } from '../../utils/auth'
import { AppContext } from '../../contexts/app.context'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import type { GetAllNotifications } from '../../types/api/user.type'
import userApi from '../../apis/user.api'
import Skeleton from '../Skeleton'
import Avatar from '../../pages/MyAccount/Components/Avatar/Avatar'

function NavHeader() {
  const userId = getUserIdFromLS()

  // set trạng thái cho ngôn ngữ
  const [lang, setLang] = useState('Tiếng Việt')
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [enableNotificationScroll, setEnableNotificationScroll] = useState(false)

  // Modal state
  // thằng này dùng để tắt mở Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // thằng này dùng để lưu notification nào bị click
  const [selectedNotification, setSelectedNotification] = useState<GetAllNotifications | null>(null)

  // lấy state global từ contextApi
  const { setIsAuthenticated } = useContext(AppContext)

  //hook này để gọi queryClient
  const queryClient = useQueryClient()

  const { data: notifications = [], isPending } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => userApi.getAllNotification().then((res) => res.data),
    staleTime: 10000,
    refetchOnWindowFocus: false
  })

  //viết userMutation cho api put notification
  // useMutation đánh dấu notification đã đọc
  const readNotificationMutation = useMutation({
    mutationFn: (notificationId: number) => userApi.readNotification(notificationId.toString()),
    onSuccess: () => {
      // Sau khi thành công, yêu cầu React Query refetch lại query 'notifications'
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
    onError: (error) => {
      console.error('Failed to mark notification as read', error)
    }
  })

  const handleSetState = (func: React.Dispatch<React.SetStateAction<boolean>>) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    func((prev) => !prev)
  }

  const notificationCount = notifications.filter((n) => !n.isRead).length
  const getDisplayedNotifications = () => (enableNotificationScroll ? notifications : notifications.slice(0, 5))

  // floating account
  const { refs: accountRefs, floatingStyles: accountFloatingStyles } = useCustomFloating({
    open: isAccountOpen,
    setOpen: setIsAccountOpen,
    placement: 'bottom-end'
  })

  // floating notification
  const { refs: notificationRefs, floatingStyles: notificationFloatingStyles } = useCustomFloating({
    open: isNotificationOpen,
    setOpen: setIsNotificationOpen,
    placement: 'bottom-start'
  })

  // call api logout
  const logoutMutation = useMutation({
    mutationFn: authApi.logout
  })

  const handleLogout = () => {
    const accessToken = getAccessTokenFromLS()
    logoutMutation.mutate(accessToken, {
      onSuccess: () => {
        setIsAuthenticated(false)
        clearLS()
        toast.success('Logout successfully!', {
          autoClose: 1000
        })
      }
    })
  }

  // Modal logic
  const handleNotificationClick = ({
    notification,
    notificationId
  }: {
    notification: GetAllNotifications
    notificationId: number
  }) => {
    setSelectedNotification(notification)
    readNotificationMutation.mutate(notificationId)
    setIsModalOpen(true)
  }

  return isPending ? (
    <Skeleton />
  ) : (
    <div className='flex items-center gap-3'>
      {/* Notification */}
      <div onMouseEnter={() => setIsNotificationOpen(true)} onMouseLeave={() => setIsNotificationOpen(false)}>
        <div ref={notificationRefs.setReference} className='relative'>
          <BellOutlined className='text-2xl text-black hover:text-teal-400 transition-all duration-300 cursor-pointer hover:scale-110' />
          {notificationCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse'>
              {notificationCount}
            </span>
          )}
        </div>

        {isNotificationOpen && (
          <div
            ref={notificationRefs.setFloating}
            style={notificationFloatingStyles}
            className='bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[280px] z-50 
                   before:content-[""] before:absolute before:-top-6 before:left-0 before:right-0 before:h-6'
          >
            {notifications.length > 0 && (
              <div
                className={`transition-all duration-500 ease-in-out ${
                  enableNotificationScroll
                    ? 'max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
                    : 'max-h-[400px]'
                }`}
              >
                {getDisplayedNotifications().map((notification) => (
                  <div
                    key={notification.id.toString()}
                    onClick={() =>
                      handleNotificationClick({ notification: notification, notificationId: notification.id })
                    }
                    className={`px-4 py-3 hover:bg-gray-300 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                      !notification.isRead ? 'bg-blue-50 text-gray-900' : 'text-gray-800'
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='text-sm font-medium truncate flex-1 min-w-0 max-w-[220px] overflow-hidden'>
                        {notification.message}
                      </div>
                      {!notification.isRead && (
                        <div className='w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1 flex-shrink-0'></div>
                      )}
                    </div>
                    <div className='text-xs text-gray-500 mt-1'>{formatTimeAgo(new Date(notification.createdAt))}</div>
                  </div>
                ))}
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

      {/* Modal hiện thông báo chi tiết */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        title={
          <div className='flex items-center gap-2'>
            <BellOutlined className='text-teal-500 text-xl' />
            <span className='text-lg font-bold text-teal-700'>Chi tiết thông báo</span>
          </div>
        }
        className='custom-notification-modal'
        style={{
          borderRadius: '18px'
        }}
      >
        <div className='modal-body p-6 bg-gradient-to-br from-teal-50 to-white rounded-lg'>
          <div className='text-base font-semibold mb-2 text-gray-900'>{selectedNotification?.message || ''}</div>
          <div className='text-xs text-gray-500 mb-3'>
            {selectedNotification ? formatTimeAgo(new Date(selectedNotification.createdAt)) : ''}
          </div>
        </div>
      </Modal>

      {/* Account */}
      <div onMouseEnter={handleSetState(setIsAccountOpen)} onMouseLeave={handleSetState(setIsAccountOpen)}>
        <div ref={accountRefs.setReference}>
          <Space className='cursor-pointer'>
            <AvatarIcon
              className='text-2xl text-gray-300 hover:text-teal-400 transition-all duration-300 hover:scale-110 bg-black/60'
              icon={<UserOutlined />}
            />
            <span className='inline-block text-sm font-semibold text-black/60 truncate max-w-[130px]'>
              {getEmailAccountFromLS()}
            </span>
          </Space>
        </div>

        {isAccountOpen && (
          <div
            ref={accountRefs.setFloating}
            style={accountFloatingStyles}
            className='bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl shadow-2xl border border-gray-200/50 py-3 min-w-[220px] ml-10 z-[60] 
                 before:content-[""]  before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 backdrop-blur-sm'
          >
            {/* Header with user info */}
            <div className='px-4 py-3 border-b border-gray-200/70 bg-gradient-to-r from-blue-50 to-indigo-50'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                  {/* <UserOutlined className='text-white text-sm' /> */}
                  <Avatar userId={userId} size={40} className='cursor-pointer' />
                </div>
                <div>
                  <div className='text-sm font-semibold text-gray-800'>{getEmailAccountFromLS()}</div>
                  <div className='text-xs text-gray-500'>Thành viên</div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className='py-2'>
              <div className='px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 text-gray-700 font-medium group'>
                <Link to={path.profile} className='flex items-center gap-3'>
                  {/* <UserOutlined className='text-blue-500 group-hover:text-blue-600 transition-colors' /> */}
                  {/* <Avatar userId={userId} size={40} className='cursor-pointer' /> */}
                  <span className='group-hover:text-blue-600 transition-colors'>Tài Khoản Của Tôi</span>
                </Link>
              </div>

              <div className='px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 cursor-pointer transition-all duration-200 text-gray-700 font-medium group'>
                <Link to={path.uploadLicense} className='flex items-center gap-3'>
                  <SafetyCertificateOutlined className='text-green-500 group-hover:text-green-600 transition-colors' />
                  <span className='group-hover:text-green-600 transition-colors'>Cập nhật GPLX & CCCD</span>
                </Link>
              </div>

              <div className='px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 cursor-pointer transition-all duration-200 text-gray-700 font-medium group'>
                <Link to={path.paymentHistory} className='flex items-center gap-3'>
                  <TransactionOutlined className='text-purple-500 group-hover:text-purple-600 transition-colors' />
                  <span className='group-hover:text-purple-600 transition-colors'>Lịch sử thanh toán</span>
                </Link>
              </div>

              <div className='px-4 py-3 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 cursor-pointer transition-all duration-200 text-gray-700 font-medium group'>
                <Link to={path.changePassword} className='flex items-center gap-3'>
                  <LockOutlined className='text-orange-500 group-hover:text-orange-600 transition-colors' />
                  <span className='group-hover:text-orange-600 transition-colors'>Đổi mật khẩu</span>
                </Link>
              </div>
            </div>

            <div className='border-t border-gray-200/70 mt-2'>
              <div className='px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 cursor-pointer transition-all duration-200 text-gray-700 font-medium group'>
                <div
                  onClick={handleLogout}
                  className={classNames({
                    'flex items-center gap-3 cursor-not-allowed pointer-events-none': logoutMutation.isPending,
                    'flex items-center gap-3 ': !logoutMutation.isPending
                  })}
                >
                  <LogoutOutlined className='text-red-500 group-hover:text-red-600 transition-colors' />
                  <span className='group-hover:text-red-600 transition-colors'>Đăng Xuất</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Language */}
      <Space
        className='cursor-pointer'
        onClick={() => setLang((prev) => (prev === 'Tiếng Việt' ? 'English' : 'Tiếng Việt'))}
      >
        <GlobalOutlined className='text-2xl text-black/90 hover:text-teal-400 transition-all duration-300 hover:scale-110' />
        <span className='text-black/90 font-medium w-24 inline-block'>{lang}</span>
      </Space>
    </div>
  )
}

export default NavHeader
