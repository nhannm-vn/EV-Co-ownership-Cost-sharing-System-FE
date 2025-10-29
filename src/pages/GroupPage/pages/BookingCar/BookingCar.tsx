// VehicleBookingCalendar.tsx
import React, { useState } from 'react'
import {
  CalendarOutlined,
  PlusOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { Card, Badge, Tooltip, Progress, Modal, message } from 'antd'

// ============= INTERFACES =============
interface QuotaInfo {
  used: number
  total: number
  remaining: number
}

interface TimeSlot {
  id: string
  timeRange: string
  type: 'booking' | 'maintenance'
  status: 'available' | 'booked' | 'my-booking' | 'locked'
  bookedBy?: {
    userId: string
    userName: string
    bookingTime: Date
  }
}

interface SlotStatus {
  type: 'available' | 'booked' | 'my-booking' | 'locked'
  tooltip: string
  bookedBy?: string
}

// ============= CONSTANTS =============
const TIME_SLOTS_CONFIG = [
  { time: '00:00 - 03:00', type: 'booking' as const },
  { time: '03:00 - 04:00', type: 'maintenance' as const },
  { time: '04:00 - 07:00', type: 'booking' as const },
  { time: '07:00 - 08:00', type: 'maintenance' as const },
  { time: '08:00 - 11:00', type: 'booking' as const },
  { time: '11:00 - 12:00', type: 'maintenance' as const },
  { time: '12:00 - 15:00', type: 'booking' as const },
  { time: '15:00 - 16:00', type: 'maintenance' as const },
  { time: '16:00 - 19:00', type: 'booking' as const },
  { time: '19:00 - 20:00', type: 'maintenance' as const },
  { time: '20:00 - 23:00', type: 'booking' as const },
  { time: '23:00 - 00:00', type: 'maintenance' as const }
]

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

// ============= INITIAL MOCK DATA =============
const getInitialBookings = (): Record<string, TimeSlot> => ({
  'MON-0': {
    id: 'MON-0',
    timeRange: '00:00 - 03:00',
    type: 'booking',
    status: 'my-booking',
    bookedBy: {
      userId: 'user-1',
      userName: 'Anh Tuấn',
      bookingTime: new Date()
    }
  },
  'TUE-2': {
    id: 'TUE-2',
    timeRange: '04:00 - 07:00',
    type: 'booking',
    status: 'booked',
    bookedBy: {
      userId: 'user-2',
      userName: 'Chị Minh',
      bookingTime: new Date()
    }
  },
  'WED-0': {
    id: 'WED-0',
    timeRange: '00:00 - 03:00',
    type: 'booking',
    status: 'my-booking',
    bookedBy: {
      userId: 'user-1',
      userName: 'Anh Tuấn',
      bookingTime: new Date()
    }
  },
  'FRI-4': {
    id: 'FRI-4',
    timeRange: '08:00 - 11:00',
    type: 'booking',
    status: 'booked',
    bookedBy: {
      userId: 'user-3',
      userName: 'Bạn Hùng',
      bookingTime: new Date()
    }
  },
  'SAT-8': {
    id: 'SAT-8',
    timeRange: '16:00 - 19:00',
    type: 'booking',
    status: 'booked',
    bookedBy: {
      userId: 'user-2',
      userName: 'Chị Minh',
      bookingTime: new Date()
    }
  }
})

// ============= BOOKING SLOT CELL COMPONENT =============
const BookingSlotCell: React.FC<{
  slotId: string
  status: SlotStatus
  onBook: (slotId: string) => void
  onCancel: (slotId: string) => void
}> = ({ slotId, status, onBook, onCancel }) => {
  const getSlotStyle = () => {
    switch (status.type) {
      case 'available':
        return 'bg-green-50 border-2 border-green-500 hover:bg-green-100 cursor-pointer'
      case 'my-booking':
        return 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
      case 'booked':
        return 'bg-purple-500 text-white'
      case 'locked':
        return 'bg-gray-200 text-gray-500 cursor-not-allowed'
      default:
        return 'bg-white'
    }
  }

  const handleClick = () => {
    if (status.type === 'available') {
      onBook(slotId)
    } else if (status.type === 'my-booking') {
      onCancel(slotId)
    }
  }

  return (
    <Tooltip title={status.tooltip} placement='top'>
      <div className={`py-3 px-2 rounded transition-all ${getSlotStyle()}`} onClick={handleClick}>
        {status.type === 'available' && <PlusOutlined style={{ fontSize: '20px', color: '#16a34a' }} />}
        {status.type === 'my-booking' && (
          <div className='text-xs'>
            <UserOutlined style={{ fontSize: '16px', marginBottom: '4px' }} />
            <div>Bạn</div>
          </div>
        )}
        {status.type === 'booked' && (
          <div className='text-xs'>
            <div className='font-semibold truncate'>{status.bookedBy}</div>
          </div>
        )}
      </div>
    </Tooltip>
  )
}

// ============= MAIN COMPONENT =============
const VehicleBookingCalendar: React.FC = () => {
  const [bookings, setBookings] = useState<Record<string, TimeSlot>>(getInitialBookings())
  const [quota, setQuota] = useState<QuotaInfo>({ used: 2, total: 5, remaining: 3 })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ id: string; timeRange: string; day: string } | null>(null)

  const getSlotStatus = (day: string, rowIndex: number): SlotStatus => {
    const slotId = `${day}-${rowIndex}`
    const booking = bookings[slotId]

    if (!booking) {
      return {
        type: 'available',
        tooltip: 'Click để đặt xe'
      }
    }

    if (booking.status === 'my-booking') {
      return {
        type: 'my-booking',
        tooltip: 'Bạn đã đặt slot này. Click để hủy',
        bookedBy: 'Bạn'
      }
    }

    return {
      type: 'booked',
      tooltip: `Đã được đặt bởi ${booking.bookedBy?.userName}`,
      bookedBy: booking.bookedBy?.userName
    }
  }

  const handleBook = (slotId: string) => {
    if (quota.remaining <= 0) {
      message.error('Bạn đã hết quota tuần này!')
      return
    }

    const [day, slotIndexStr] = slotId.split('-')
    const slotIndex = parseInt(slotIndexStr)
    const timeRange = TIME_SLOTS_CONFIG[slotIndex].time

    setSelectedSlot({ id: slotId, timeRange, day })
    setIsModalVisible(true)
  }

  const confirmBooking = () => {
    if (!selectedSlot) return

    const newBooking: TimeSlot = {
      id: selectedSlot.id,
      timeRange: selectedSlot.timeRange,
      type: 'booking',
      status: 'my-booking',
      bookedBy: {
        userId: 'user-1',
        userName: 'Anh Tuấn',
        bookingTime: new Date()
      }
    }

    setBookings((prevBookings) => ({
      ...prevBookings,
      [selectedSlot.id]: newBooking
    }))

    setQuota((prevQuota) => ({
      ...prevQuota,
      used: prevQuota.used + 1,
      remaining: prevQuota.remaining - 1
    }))

    setIsModalVisible(false)
    message.success('Đặt xe thành công!')
  }

  const handleCancel = (slotId: string) => {
    Modal.confirm({
      title: 'Hủy đặt xe',
      content: 'Bạn có chắc muốn hủy booking này?',
      okText: 'Hủy booking',
      cancelText: 'Đóng',
      okButtonProps: { danger: true },
      onOk: () => {
        setBookings((prevBookings) => {
          const newBookings = { ...prevBookings }
          delete newBookings[slotId]
          return newBookings
        })

        setQuota((prevQuota) => ({
          ...prevQuota,
          used: prevQuota.used - 1,
          remaining: prevQuota.remaining + 1
        }))

        message.success('Đã hủy booking')
      }
    })
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Header Card */}
      <Card className='mb-6 shadow-sm'>
        <div className='flex justify-between items-center flex-wrap gap-4'>
          <div>
            <h1 className='text-2xl font-bold flex items-center gap-2'>
              <CalendarOutlined style={{ fontSize: '24px' }} />
              Lịch Đặt Xe Tuần Này (VinFast VF8 Plus)
            </h1>
            <p className='text-gray-500 mt-1'>Biển số: 30A-123.45 | Tuần 44: 28/10 - 03/11/2025</p>
          </div>

          {/* Quota Display */}
          <div className='text-right'>
            <div className='text-sm text-gray-600 mb-2'>Quota của Bạn (Anh Tuấn):</div>
            <div className='flex items-center gap-3'>
              <Progress
                type='circle'
                percent={(quota.used / quota.total) * 100}
                format={() => `${quota.used}/${quota.total}`}
                width={60}
                strokeColor={quota.remaining > 0 ? '#52c41a' : '#ff4d4f'}
              />
              <div className='text-left'>
                <div className='text-green-600 font-semibold'>{quota.used} lần đã đặt</div>
                <div className='text-gray-600'>{quota.remaining} lần còn lại</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Booking Grid */}
      <Card className='shadow-sm overflow-x-auto'>
        <table className='w-full border-collapse min-w-[800px]'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border p-3 text-left font-semibold text-gray-700 w-40'>KHUNG GIỜ</th>
              {DAYS_OF_WEEK.map((day, index) => (
                <th key={day} className='border p-3 text-center font-semibold text-gray-700'>
                  <div>{day}</div>
                  <div className='text-xs font-normal text-gray-500'>{28 + index}/10</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS_CONFIG.map((slot, rowIndex) => (
              <tr key={rowIndex} className={slot.type === 'maintenance' ? 'bg-gray-50' : ''}>
                <td className='border p-3 font-medium text-gray-700'>
                  <div className='flex items-center gap-2'>
                    <ClockCircleOutlined style={{ fontSize: '16px' }} />
                    {slot.time}
                  </div>
                  {slot.type === 'maintenance' && (
                    <Badge count='Bảo dưỡng' className='mt-1' style={{ backgroundColor: '#faad14' }} />
                  )}
                </td>
                {DAYS_OF_WEEK.map((day, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`} className='border p-2 text-center'>
                    {slot.type === 'maintenance' ? (
                      <div className='text-gray-400 text-xs py-3'>Không khả dụng</div>
                    ) : (
                      <BookingSlotCell
                        slotId={`${day}-${rowIndex}`}
                        status={getSlotStatus(day, rowIndex)}
                        onBook={handleBook}
                        onCancel={handleCancel}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Legend */}
      <Card className='mt-4 shadow-sm'>
        <div className='flex gap-6 items-center justify-center flex-wrap'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-green-100 border-2 border-green-500 rounded'></div>
            <span className='text-sm'>Có thể đặt</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-blue-500 rounded'></div>
            <span className='text-sm'>Bạn đã đặt</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-purple-500 rounded'></div>
            <span className='text-sm'>Người khác đã đặt</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-yellow-100 border-2 border-yellow-500 rounded'></div>
            <span className='text-sm'>Bảo dưỡng</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 bg-gray-200 rounded'></div>
            <span className='text-sm'>Đã khóa</span>
          </div>
        </div>
      </Card>

      {/* Booking Confirmation Modal */}
      <Modal
        title={
          <div className='flex items-center gap-2'>
            <CalendarOutlined style={{ fontSize: '20px' }} /> Xác nhận đặt xe
          </div>
        }
        open={isModalVisible}
        onOk={confirmBooking}
        onCancel={() => setIsModalVisible(false)}
        okText='Xác nhận'
        cancelText='Hủy'
        okButtonProps={{ icon: <CheckOutlined /> }}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
      >
        {selectedSlot && (
          <div className='space-y-4 py-4'>
            <div className='bg-blue-50 p-4 rounded-lg'>
              <div className='text-sm text-gray-600'>Xe</div>
              <div className='font-semibold'>VinFast VF8 Plus (30A-123.45)</div>
            </div>
            <div className='bg-green-50 p-4 rounded-lg'>
              <div className='text-sm text-gray-600'>Thời gian</div>
              <div className='font-semibold'>
                {selectedSlot.day} - {selectedSlot.timeRange}
              </div>
            </div>
            <div className='bg-yellow-50 p-4 rounded-lg'>
              <div className='text-sm text-gray-600'>Quota sau khi đặt</div>
              <div className='font-semibold'>
                {quota.used + 1}/{quota.total} lần (còn {quota.remaining - 1})
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default VehicleBookingCalendar
