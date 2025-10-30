/* eslint-disable @typescript-eslint/no-unused-vars */
// VehicleBookingCalendar.tsx - IMPROVED BADGE & LEGEND DESIGN
import React, { useState } from 'react'
import {
  CalendarOutlined,
  PlusOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CarOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
  FireOutlined,
  StarFilled,
  TrophyOutlined,
  LockOutlined
} from '@ant-design/icons'
import { Card, Tooltip, Progress, Modal, message, Statistic, Tag } from 'antd'

// ============= INTERFACES (giữ nguyên) =============
interface QuotaInfo {
  used: number
  total: number
  remaining: number
}

interface VehicleStatus {
  condition: 'excellent' | 'good' | 'maintenance' | 'broken'
  battery: number
  lastMaintenance: string
  nextMaintenance: string
  mileage: number
  temperature: number
  issues: string[]
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

// ============= INITIAL MOCK DATA (giữ nguyên) =============
const getInitialBookings = (): Record<string, TimeSlot> => ({
  'MON-0': {
    id: 'MON-0',
    timeRange: '00:00 - 03:00',
    type: 'booking',
    status: 'my-booking',
    bookedBy: { userId: 'user-1', userName: 'Anh Tuấn', bookingTime: new Date() }
  },
  'TUE-2': {
    id: 'TUE-2',
    timeRange: '04:00 - 07:00',
    type: 'booking',
    status: 'booked',
    bookedBy: { userId: 'user-2', userName: 'Chị Minh', bookingTime: new Date() }
  },
  'WED-0': {
    id: 'WED-0',
    timeRange: '00:00 - 03:00',
    type: 'booking',
    status: 'my-booking',
    bookedBy: { userId: 'user-1', userName: 'Anh Tuấn', bookingTime: new Date() }
  },
  'FRI-4': {
    id: 'FRI-4',
    timeRange: '08:00 - 11:00',
    type: 'booking',
    status: 'booked',
    bookedBy: { userId: 'user-3', userName: 'Bạn Hùng', bookingTime: new Date() }
  },
  'SAT-8': {
    id: 'SAT-8',
    timeRange: '16:00 - 19:00',
    type: 'booking',
    status: 'booked',
    bookedBy: { userId: 'user-2', userName: 'Chị Minh', bookingTime: new Date() }
  }
})

const getInitialVehicleStatus = (): VehicleStatus => ({
  condition: 'good',
  battery: 85,
  lastMaintenance: '15/10/2025',
  nextMaintenance: '15/11/2025',
  mileage: 12450,
  temperature: 28,
  issues: []
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
        return 'bg-gradient-to-br from-white to-cyan-50/30 border-2 border-[#22D3EE] hover:from-cyan-50 hover:to-cyan-100/50 hover:shadow-xl hover:border-[#06B6D4] cursor-pointer transform hover:scale-105 transition-all duration-300'
      case 'my-booking':
        return 'bg-gradient-to-br from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE] text-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg ring-2 ring-white/20'
      case 'booked':
        return 'bg-gradient-to-br from-slate-400 to-slate-500 text-white opacity-75 shadow-md'
      case 'locked':
        return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 cursor-not-allowed opacity-50'
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
      <div className={`py-6 px-4 rounded-2xl ${getSlotStyle()}`} onClick={handleClick}>
        {status.type === 'available' && (
          <div className='flex flex-col items-center gap-2'>
            <div className='bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-xl shadow-lg'>
              <PlusOutlined style={{ fontSize: '20px', color: 'white' }} />
            </div>
            <span className='text-xs text-cyan-700 font-bold'>Đặt xe</span>
          </div>
        )}
        {status.type === 'my-booking' && (
          <div className='text-center'>
            <div className='bg-white/20 backdrop-blur-sm p-2 rounded-xl mb-2 inline-block'>
              <UserOutlined style={{ fontSize: '20px' }} />
            </div>
            <div className='text-xs font-bold'>Bạn đã đặt</div>
          </div>
        )}
        {status.type === 'booked' && (
          <div className='text-center'>
            <UserOutlined style={{ fontSize: '18px', marginBottom: '6px' }} />
            <div className='text-xs font-semibold truncate'>{status.bookedBy}</div>
          </div>
        )}
      </div>
    </Tooltip>
  )
}

// ============= MAIN COMPONENT =============
const BookingCar: React.FC = () => {
  const [bookings, setBookings] = useState<Record<string, TimeSlot>>(getInitialBookings())
  const [quota, setQuota] = useState<QuotaInfo>({ used: 2, total: 5, remaining: 3 })
  const vehicleStatus: VehicleStatus = getInitialVehicleStatus()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ id: string; timeRange: string; day: string } | null>(null)

  const getConditionConfig = () => {
    switch (vehicleStatus.condition) {
      case 'excellent':
        return {
          icon: <StarFilled style={{ fontSize: '28px', color: 'white' }} />,
          text: 'Xuất sắc',
          bgColor: 'from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE]'
        }
      case 'good':
        return {
          icon: <CheckCircleOutlined style={{ fontSize: '28px', color: 'white' }} />,
          text: 'Tốt',
          bgColor: 'from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE]'
        }
      case 'maintenance':
        return {
          icon: <ToolOutlined style={{ fontSize: '28px', color: 'white' }} />,
          text: 'Bảo dưỡng',
          bgColor: 'from-[#0EA5E9] via-[#3B82F6] to-[#06B6D4]'
        }
      case 'broken':
        return {
          icon: <WarningOutlined style={{ fontSize: '28px', color: 'white' }} />,
          text: 'Cần sửa',
          bgColor: 'from-[#3B82F6] via-[#6366F1] to-[#0EA5E9]'
        }
    }
  }

  const getSlotStatus = (day: string, rowIndex: number): SlotStatus => {
    const slotId = `${day}-${rowIndex}`
    const booking = bookings[slotId]

    if (!booking) {
      return { type: 'available', tooltip: 'Click để đặt xe' }
    }

    if (booking.status === 'my-booking') {
      return { type: 'my-booking', tooltip: 'Bạn đã đặt slot này. Click để hủy', bookedBy: 'Bạn' }
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

    if (vehicleStatus.condition === 'broken') {
      message.error('Xe đang hư, không thể đặt!')
      return
    }

    if (vehicleStatus.condition === 'maintenance') {
      message.warning('Xe đang bảo dưỡng, vui lòng đặt sau!')
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
      bookedBy: { userId: 'user-1', userName: 'Anh Tuấn', bookingTime: new Date() }
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
      okText: 'Hủy',
      cancelText: 'Không',
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

        message.success('Đã hủy booking!')
      }
    })
  }

  const totalBookingsThisWeek = Object.keys(bookings).length

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/40 p-8 my-5 rounded-2xl'>
      <div className='max-w-[96vw] mx-auto'>
        {/* Header Section - giữ nguyên như code trước */}
        <div className='grid grid-cols-4 gap-6 mb-8'>
          {/* Vehicle Info Card */}
          <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/20'>
            <div className='bg-gradient-to-br from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE] -m-6 p-7 h-full relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
              <div className='relative z-10 flex flex-col h-full justify-between min-h-[300px]'>
                <div className='flex items-center gap-4 mb-5'>
                  <div className='bg-white/30 backdrop-blur-xl p-4 rounded-2xl shadow-xl ring-2 ring-white/20'>
                    <CarOutlined style={{ fontSize: '36px', color: 'white' }} />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <CalendarOutlined style={{ fontSize: '20px', color: 'white' }} />
                      <h2 className='text-xl font-black text-white uppercase tracking-wide'>Lịch Đặt Xe</h2>
                    </div>
                  </div>
                </div>
                <div className='flex-1 flex flex-col justify-center space-y-3'>
                  <div className='text-white text-3xl font-black tracking-tight'>VinFast VF8 Plus</div>
                  <div className='text-white/95 text-xl font-bold'>30A-123.45</div>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl py-3 px-5 inline-block shadow-lg ring-1 ring-white/30'>
                    <span className='text-white text-sm font-bold'>Tuần 44: 28/10 - 03/11/2025</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quota Card */}
          <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-sky-50/20'>
            <div className='bg-gradient-to-br from-[#0EA5E9] via-[#3B82F6] to-[#06B6D4] -m-6 p-7 h-full relative overflow-hidden'>
              <div className='absolute inset-0 bg-white/5'></div>
              <div className='absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
              <div className='relative z-10 flex flex-col justify-between h-full min-h-[300px]'>
                <div className='text-white text-sm font-black uppercase tracking-widest text-center mb-4'>
                  Quota (Anh Tuấn)
                </div>
                <div className='flex-1 flex items-center justify-center'>
                  <div className='relative'>
                    <Progress
                      type='circle'
                      percent={(quota.used / quota.total) * 100}
                      format={() => (
                        <div className='text-white font-black text-3xl'>
                          {quota.used}/{quota.total}
                        </div>
                      )}
                      width={110}
                      strokeColor='#ffffff'
                      trailColor='rgba(255,255,255,0.15)'
                      strokeWidth={12}
                    />
                    <div className='absolute inset-0 rounded-full blur-xl bg-white/20'></div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                    <div className='text-white font-black text-2xl'>{quota.used}</div>
                    <div className='text-white/90 text-xs font-bold uppercase tracking-wide'>đã đặt</div>
                  </div>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                    <div className='text-white font-black text-2xl'>{quota.remaining}</div>
                    <div className='text-white/90 text-xs font-bold uppercase tracking-wide'>còn lại</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/20'>
            <div
              className={`bg-gradient-to-br ${getConditionConfig().bgColor} -m-6 p-7 h-full relative overflow-hidden`}
            >
              <div className='absolute inset-0 bg-white/5'></div>
              <div className='absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
              <div className='relative z-10 flex flex-col justify-between h-full min-h-[300px]'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-white/30 backdrop-blur-xl p-3 rounded-xl shadow-lg ring-1 ring-white/30'>
                      {getConditionConfig().icon}
                    </div>
                    <div>
                      <div className='text-white/95 text-xs font-bold uppercase tracking-wide'>Trạng thái</div>
                      <div className='text-white text-2xl font-black'>{getConditionConfig().text}</div>
                    </div>
                  </div>
                </div>

                <div className='flex-1 flex flex-col justify-center space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <ThunderboltOutlined style={{ fontSize: '26px', color: 'white' }} />
                      <span className='text-white text-sm font-bold'>Pin</span>
                    </div>
                    <div className='text-white text-3xl font-black'>{vehicleStatus.battery}%</div>
                  </div>
                  <div className='relative'>
                    <Progress
                      percent={vehicleStatus.battery}
                      strokeColor='#ffffff'
                      trailColor='rgba(255,255,255,0.15)'
                      showInfo={false}
                      strokeWidth={14}
                      className='rounded-full'
                    />
                    <div className='absolute inset-0 blur-lg bg-white/10 rounded-full'></div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                    <DashboardOutlined style={{ fontSize: '22px', color: 'white' }} />
                    <div className='text-white text-lg font-black mt-1'>{vehicleStatus.mileage.toLocaleString()}</div>
                    <div className='text-white/90 text-xs font-bold uppercase'>km</div>
                  </div>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                    <FireOutlined style={{ fontSize: '22px', color: 'white' }} />
                    <div className='text-white text-lg font-black mt-1'>{vehicleStatus.temperature}°C</div>
                    <div className='text-white/90 text-xs font-bold uppercase'>nhiệt độ</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Maintenance Card */}
          <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/20'>
            <div className='bg-gradient-to-br from-[#3B82F6] via-[#6366F1] to-[#0EA5E9] -m-6 p-7 h-full relative overflow-hidden'>
              <div className='absolute inset-0 bg-white/5'></div>
              <div className='absolute top-0 left-0 w-36 h-36 bg-white/10 rounded-full blur-3xl'></div>
              <div className='relative z-10 flex flex-col justify-between h-full min-h-[300px]'>
                <div className='text-white text-sm font-black uppercase tracking-widest text-center mb-4'>
                  Bảo dưỡng
                </div>

                <div className='flex-1 flex flex-col justify-center space-y-4'>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-5 border-l-4 border-white/50 shadow-lg ring-1 ring-white/20 hover:bg-white/30 transition-all'>
                    <div className='text-white/95 text-xs font-bold uppercase mb-2'>Gần nhất</div>
                    <div className='text-white text-xl font-black'>{vehicleStatus.lastMaintenance}</div>
                  </div>
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-5 border-l-4 border-white/50 shadow-lg ring-1 ring-white/20 hover:bg-white/30 transition-all'>
                    <div className='text-white/95 text-xs font-bold uppercase mb-2'>Tiếp theo</div>
                    <div className='text-white text-xl font-black'>{vehicleStatus.nextMaintenance}</div>
                  </div>
                </div>

                {vehicleStatus.issues.length === 0 ? (
                  <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center gap-3 shadow-lg ring-1 ring-white/30'>
                    <CheckCircleOutlined style={{ fontSize: '22px', color: 'white' }} />
                    <span className='text-white font-black text-sm uppercase'>Không có vấn đề</span>
                  </div>
                ) : (
                  <div className='space-y-2'>
                    {vehicleStatus.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className='bg-white/15 backdrop-blur-sm border-l-4 border-white/40 p-3 rounded-xl text-white text-xs font-bold'
                      >
                        <WarningOutlined style={{ marginRight: '6px' }} />
                        {issue}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Bar */}
        <Card className='mb-8 shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-gradient-to-r from-white via-cyan-50/20 to-white'>
          <div className='grid grid-cols-3 divide-x divide-gray-200'>
            <div className='px-10 py-6 text-center hover:bg-gradient-to-br hover:from-cyan-50/50 hover:to-transparent transition-all duration-300'>
              <Statistic
                title={<span className='text-xs font-black text-gray-600 uppercase tracking-wider'>Tổng booking</span>}
                value={totalBookingsThisWeek}
                suffix='lượt'
                valueStyle={{ color: '#06B6D4', fontWeight: 900, fontSize: '36px' }}
                prefix={<CalendarOutlined style={{ fontSize: '24px' }} />}
              />
            </div>
            <div className='px-10 py-6 text-center hover:bg-gradient-to-br hover:from-sky-50/50 hover:to-transparent transition-all duration-300'>
              <Statistic
                title={<span className='text-xs font-black text-gray-600 uppercase tracking-wider'>Của bạn</span>}
                value={quota.used}
                suffix='lượt'
                valueStyle={{ color: '#0EA5E9', fontWeight: 900, fontSize: '36px' }}
                prefix={<UserOutlined style={{ fontSize: '24px' }} />}
              />
            </div>
            <div className='px-10 py-6 text-center hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-transparent transition-all duration-300'>
              <Statistic
                title={<span className='text-xs font-black text-gray-600 uppercase tracking-wider'>Tỷ lệ</span>}
                value={(quota.used / quota.total) * 100}
                precision={0}
                suffix='%'
                valueStyle={{ color: '#3B82F6', fontWeight: 900, fontSize: '36px' }}
                prefix={<TrophyOutlined style={{ fontSize: '24px' }} />}
              />
            </div>
          </div>
        </Card>

        {/* ============= IMPROVED TABLE WITH BETTER BADGE ============= */}
        <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden mb-8 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-white'>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE]'>
                  <th className='p-6 text-left font-black text-white text-lg w-56 sticky left-0 z-10 bg-[#06B6D4]'>
                    <div className='flex items-center gap-3'>
                      <ClockCircleOutlined style={{ fontSize: '22px' }} />
                      <span className='uppercase tracking-wide'>Khung giờ</span>
                    </div>
                  </th>
                  {DAYS_OF_WEEK.map((day, index) => (
                    <th key={day} className='p-6 text-center font-black text-white text-base min-w-[160px]'>
                      <div className='text-2xl mb-2 tracking-wider'>{day}</div>
                      <div className='bg-white/25 rounded-full py-2 px-4 inline-block text-xs font-bold backdrop-blur-sm shadow-lg ring-1 ring-white/30'>
                        {28 + index}/10
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS_CONFIG.map((slot, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      slot.type === 'maintenance'
                        ? 'bg-gradient-to-r from-gray-50 to-slate-50/50'
                        : 'bg-white hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-transparent transition-all duration-300'
                    }
                  >
                    <td className='border-t border-gray-200 p-6 sticky left-0 z-10 bg-white'>
                      <div className='flex items-center justify-between'>
                        <div className='text-[#06B6D4] font-black text-base'>{slot.time}</div>
                        {slot.type === 'maintenance' && (
                          <Tag
                            icon={<ToolOutlined />}
                            color='cyan'
                            className='rounded-full px-4 py-1 font-bold text-xs border-0 shadow-md'
                            style={{
                              background: 'linear-gradient(135deg, #06B6D4, #0EA5E9)',
                              color: 'white'
                            }}
                          >
                            Bảo dưỡng
                          </Tag>
                        )}
                      </div>
                    </td>
                    {DAYS_OF_WEEK.map((day, colIndex) => (
                      <td key={`${rowIndex}-${colIndex}`} className='border-t border-gray-200 p-5'>
                        {slot.type === 'maintenance' ? (
                          <div className='text-gray-400 text-sm py-6 text-center font-semibold flex flex-col items-center gap-2'>
                            <LockOutlined style={{ fontSize: '20px' }} />
                            <span>Không khả dụng</span>
                          </div>
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
          </div>
        </Card>

        {/* ============= IMPROVED LEGEND ============= */}
        <Card className='shadow-2xl border-0 rounded-3xl hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-gradient-to-r from-white via-cyan-50/10 to-white'>
          <div className='p-8'>
            <h3 className='text-center text-lg font-black text-gray-700 mb-6 uppercase tracking-wider'>Chú thích</h3>
            <div className='grid grid-cols-5 gap-6'>
              {[
                {
                  icon: <PlusOutlined style={{ fontSize: '18px' }} />,
                  bg: 'bg-gradient-to-br from-white to-cyan-50/30',
                  border: 'border-[#22D3EE]',
                  label: 'Có thể đặt',
                  description: 'Click để đặt xe'
                },
                {
                  icon: <UserOutlined style={{ fontSize: '18px', color: 'white' }} />,
                  bg: 'bg-gradient-to-br from-[#06B6D4] to-[#22D3EE]',
                  border: '',
                  label: 'Bạn đã đặt',
                  description: 'Slot của bạn'
                },
                {
                  icon: <UserOutlined style={{ fontSize: '18px', color: 'white' }} />,
                  bg: 'bg-gradient-to-br from-slate-400 to-slate-500',
                  border: '',
                  label: 'Đã đặt',
                  description: 'Người khác đặt'
                },
                {
                  icon: <ToolOutlined style={{ fontSize: '18px' }} />,
                  bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
                  border: 'border-[#22D3EE]',
                  label: 'Bảo dưỡng',
                  description: 'Không khả dụng'
                },
                {
                  icon: <LockOutlined style={{ fontSize: '18px', color: '#9CA3AF' }} />,
                  bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
                  border: '',
                  label: 'Khóa',
                  description: 'Đã bị khóa'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 hover:scale-105'
                >
                  <div
                    className={`w-16 h-16 ${item.bg} ${item.border ? `border-2 ${item.border}` : ''} rounded-2xl shadow-lg flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div className='text-center'>
                    <div className='text-sm font-black text-gray-800 mb-1'>{item.label}</div>
                    <div className='text-xs text-gray-500 font-medium'>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Modal - giữ nguyên */}
      <Modal
        title={
          <div className='flex items-center gap-4'>
            <div className='bg-gradient-to-br from-[#06B6D4] to-[#0EA5E9] p-4 rounded-2xl shadow-xl'>
              <CalendarOutlined style={{ fontSize: '28px', color: 'white' }} />
            </div>
            <span className='text-3xl font-black text-[#06B6D4] tracking-tight'>Xác nhận đặt xe</span>
          </div>
        }
        open={isModalVisible}
        onOk={confirmBooking}
        onCancel={() => setIsModalVisible(false)}
        okText='Xác nhận'
        cancelText='Hủy'
        okButtonProps={{
          style: {
            background: 'linear-gradient(135deg, #06B6D4, #0EA5E9)',
            borderColor: '#06B6D4',
            height: '48px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '12px'
          }
        }}
        cancelButtonProps={{ style: { height: '48px', fontSize: '16px', borderRadius: '12px' } }}
        width={750}
      >
        {selectedSlot && (
          <div className='space-y-5 py-6'>
            {[
              { icon: <CarOutlined />, label: 'Xe', value: 'VinFast VF8 Plus (30A-123.45)' },
              {
                icon: <ClockCircleOutlined />,
                label: 'Thời gian',
                value: `${selectedSlot.day} - ${selectedSlot.timeRange}`
              },
              {
                icon: <UserOutlined />,
                label: 'Quota sau',
                value: `${quota.used + 1}/${quota.total} (còn ${quota.remaining - 1})`
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className='bg-gradient-to-br from-cyan-50 to-blue-50/30 p-7 rounded-2xl border-l-4 border-[#06B6D4] hover:shadow-xl transition-all shadow-md ring-1 ring-cyan-100'
              >
                <div className='flex items-center gap-3 text-[#06B6D4] font-bold text-base mb-3'>
                  {item.icon} {item.label}
                </div>
                <div className='text-gray-800 font-black text-2xl tracking-tight'>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BookingCar
