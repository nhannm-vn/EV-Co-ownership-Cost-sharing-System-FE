/* eslint-disable @typescript-eslint/no-unused-vars */
// VehicleBookingCalendar.tsx - IMPROVED BADGE & LEGEND DESIGN
import {
  CalendarOutlined,
  CarOutlined,
  ClockCircleOutlined,
  LockOutlined,
  ToolOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Card, message, Modal, Tag } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import groupApi from '../../../../apis/group.api'

import DetailStatusBooking from './components/DetailStatusBooking'
import MaintenanceCard from './components/MaintenanceCard'
import QuotaCard from './components/QuotaCard'
import Statsbar from './components/StatsBar'
import StatusCard from './components/StatusCard'
import VehicleInforCard from './components/VehicleInforCard'
import BookingSlotCell from './pages/BookingSlotCell'

// ============= INTERFACES (giữ nguyên) =============
type SlotStatus = 'AVAILABLE' | 'LOCKED' | 'CONFIRMED' | 'CANCELLED' | ''
type SlotType = 'AVAILABLE' | 'MAINTENANCE' | 'BOOKED_SELF' | 'BOOKED_OTHER' | ''

interface TimeSlot {
  time: string
  status: SlotStatus
  bookedBy: string | null
  bookable: boolean
  type: SlotType
}
interface DailySlot {
  date: string | ''
  dayOfWeek: string | ''
  slots: TimeSlot[] | []
}

interface QuotaInfo {
  remainingSlots: number
  totalSlots: number
  usedSlots: number
}

// ============= INITIAL MOCK DATA (giữ nguyên) =============

// ============= MAIN COMPONENT =============
const BookingCar: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const bookingQuery = useQuery({
    queryKey: ['vehicle-bookings'],
    queryFn: () => groupApi.getBookingCalendar(groupId as string),
    enabled: !!groupId
  })

  // data
  const data = bookingQuery?.data?.data

  // quota
  const quotaUser: QuotaInfo = {
    totalSlots: bookingQuery?.data?.data?.userQuota?.totalSlots ?? 0,
    usedSlots: bookingQuery?.data?.data?.userQuota?.usedSlots ?? 0,
    remainingSlots: bookingQuery?.data?.data?.userQuota?.remainingSlots ?? 0
  }
  const dailySlots: DailySlot[] =
    bookingQuery?.data?.data?.dailySlots?.map((day) => ({
      date: day.date ?? '',
      dayOfWeek: day.dayOfWeek ?? '',
      slots:
        day.slots?.map((slot) => ({
          time: slot.time ?? '',
          status: slot.status ?? '',
          bookedBy: slot.bookedBy ?? null,
          bookable: slot.bookable ?? false,
          type: slot.type ?? ''
        })) ?? []
    })) ?? []

  // groupSummary
  const groupSummary = bookingQuery?.data?.data?.dashboardSummary

  const vehicleStatus = bookingQuery?.data?.data?.dashboardSummary?.vehicleStatus || ''
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ id: string; timeRange: string; day: string } | null>(null)

  const handleBook = () => {
    if (quotaUser.remainingSlots <= 0) {
      message.error('Bạn đã hết quota tuần này!')
      return
    }

    if (vehicleStatus === 'Has Issues') {
      message.error('Xe đang hư, không thể đặt!')
      return
    }

    if (vehicleStatus === 'Under Maintenance') {
      message.warning('Xe đang bảo dưỡng, vui lòng đặt sau!')
      return
    }

    // const [day, slotIndexStr] = slotId.split('-')
    // const slotIndex = parseInt(slotIndexStr)
    // const timeRange = dailySlots[slotIndex]?.slots[slotIndex]?.time || ''

    // setSelectedSlot({ id: slotId, timeRange, day })
    // setIsModalVisible(true)
  }

  const confirmBooking = () => {
    if (!selectedSlot) return
    ;<div>hehe</div>
  }

  const handleCancel = () => {
    Modal.confirm({
      title: 'Hủy đặt xe',
      content: 'Bạn có chắc muốn hủy booking này?',
      okText: 'Hủy',
      cancelText: 'Không',
      okButtonProps: { danger: true },
      onOk: () => {
        message.success('Đã hủy booking!')
      }
    })
  }
  console.log(dailySlots)

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/40 p-8 my-5 rounded-2xl'>
      <div className='max-w-[96vw] mx-auto'>
        {/* Header Section - giữ nguyên như code trước */}
        <div className='grid grid-cols-4 gap-6 mb-8'>
          {/* Vehicle Info Card */}
          <VehicleInforCard
            brand={groupSummary?.brand || ''}
            licensePlate={groupSummary?.licensePlate || ''}
            weekStart={data?.weekStart || ''}
            weekEnd={data?.weekEnd || ''}
          />
          {/* Quota Card */}
          <QuotaCard quotaUser={quotaUser} />
          {/* Status Card */}
          <StatusCard
            vehicleStatus={groupSummary?.vehicleStatus || ''}
            batteryPercent={groupSummary?.batteryPercent || 0}
            odometer={groupSummary?.odometer || 0}
          />
          {/* Maintenance Card */}
          <MaintenanceCard
            lastMaintenanceDate={groupSummary?.lastMaintenanceDate || ''}
            nextMaintenanceDate={groupSummary?.nextMaintenanceDate || ''}
            maintenanceStatus={groupSummary?.maintenanceStatus || ''}
          />
        </div>

        {/* Stats Bar */}
        <Statsbar totalBookings={groupSummary?.totalBookings || 0} quotaUser={quotaUser} />

        {/* hiển thị lịch  đặt xe */}
        <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden mb-8 hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.2)] transition-all duration-500 bg-white'>
          <div className='overflow-x-auto'>
            {/* Chỉ render 1 bảng duy nhất, không map dailySlots nữa */}
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-gradient-to-r from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE]'>
                  <th className='p-6 text-left font-black text-white text-lg w-56 sticky left-0 z-10 bg-[#06B6D4]'>
                    <div className='flex items-center gap-3'>
                      <ClockCircleOutlined style={{ fontSize: '22px' }} />
                      <span className='uppercase tracking-wide'>Khung giờ</span>
                    </div>
                  </th>

                  {dailySlots.map((day) => (
                    <th
                      key={day.date}
                      className='p-6 text-center font-black text-white text-base min-w-[140px] whitespace-nowrap'
                    >
                      <div className='flex flex-col items-center justify-center gap-2'>
                        <div className='text-xl font-black tracking-wide uppercase'>{day.dayOfWeek}</div>
                        <div className='bg-white/25 rounded-full py-2 px-4 inline-block text-xs font-bold backdrop-blur-sm shadow-lg ring-1 ring-white/30'>
                          {day.date}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/*  hiển thị cột khung giờ */}
                {dailySlots[0]?.slots.map((slot, timeIndex) => (
                  <tr
                    key={timeIndex}
                    className={
                      slot.type === 'MAINTENANCE'
                        ? 'bg-gradient-to-r from-gray-50 to-slate-50/50'
                        : 'bg-white hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-transparent transition-all duration-300'
                    }
                  >
                    <td className='border-t border-gray-200 p-6 sticky left-0 z-10 bg-white'>
                      <div className='flex items-center gap-3'>
                        <div className='text-[#06B6D4] font-black text-base'>{slot.time}</div>
                        {slot.type === 'MAINTENANCE' && (
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

                    {dailySlots.map((day) => {
                      const daySlot = day.slots[timeIndex]
                      return (
                        <td key={`${day.date}-${timeIndex}`} className='border-t border-gray-200 p-5'>
                          {daySlot?.type === 'MAINTENANCE' ? (
                            <div className='text-gray-400 text-sm py-6 text-center font-semibold flex flex-col items-center gap-2'>
                              <LockOutlined style={{ fontSize: '20px' }} />
                              <span>Không khả dụng</span>
                            </div>
                          ) : (
                            <BookingSlotCell
                              time={daySlot?.time}
                              bookedBy={daySlot?.bookedBy}
                              type={daySlot?.type as SlotType}
                              onBook={handleBook}
                              onCancel={handleCancel}
                            />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* mô tả các trang thái khi booking*/}
        <DetailStatusBooking />
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
                value: `${quotaUser.usedSlots + 1}/${quotaUser.totalSlots} (còn ${quotaUser.remainingSlots - 1})`
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
