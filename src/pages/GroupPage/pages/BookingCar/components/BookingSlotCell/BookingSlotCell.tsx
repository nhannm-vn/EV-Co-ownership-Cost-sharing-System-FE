import { LockOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Tooltip } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
import groupApi from '../../../../../../apis/group.api'
import convertIsoString from '../../../../../../utils/createIsoString'
import ModalConfirm from '../ModalConfirm'
import getSlotStyle from './utils/getSlotStyle'
import getTooltip from './utils/getTooltip'

export interface Slot {
  date: string
  time: string
  bookedBy: string | null
  type: 'AVAILABLE' | 'MAINTENANCE' | 'BOOKED_SELF' | 'BOOKED_OTHER' | 'LOCKED' | 'AWAITING_REVIEW' | '' | 'COMPLETED'
  vehicleId: number

  vehicleStatus: 'Good' | 'Under Maintenance' | 'Has Issues' | ''
  quotaUser: {
    usedSlots: number
    totalSlots: number
    remainingSlots: number
  }
  bookingId?: number | null
}

export default function BookingSlotCell({
  date,
  time,
  bookedBy,
  type,
  vehicleId,
  vehicleStatus,
  bookingId,
  quotaUser
}: Slot) {
  const mutateQuery = useQueryClient()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const confirmMutation = useMutation({
    mutationFn: (body: { vehicleId: number; startDateTime: string; endDateTime: string }) => groupApi.bookingSlot(body),
    onSuccess: (response) => {
      console.log(response?.data)
      mutateQuery.invalidateQueries({ queryKey: ['vehicle-bookings'] })
      toast.success(response?.data?.message)
      setIsModalVisible(false)
    },
    onError: (response) => {
      console.log(response)
    }
  })

  const cancelMutation = useMutation({
    mutationFn: (bookingId: number) => groupApi.cancelBookingSlot(bookingId),
    onSuccess: (response) => {
      console.log(response)
      mutateQuery.invalidateQueries({ queryKey: ['vehicle-bookings'] })
      toast.success('Hủy đặt xe thành công!')
      setIsModalVisible(false)
    },
    onError: (response) => {
      console.log(response)
    }
  })
  const confirmBooking = () => {
    if (type !== 'AVAILABLE' && type !== 'BOOKED_SELF') {
      return
    }
    if (quotaUser.remainingSlots <= 0) {
      toast.error('Bạn đã hết quota tuần này!')
      return
    }

    if (vehicleStatus === 'Has Issues') {
      toast.error('Xe đang hư, không thể đặt!')
      return
    }

    if (vehicleStatus === 'Under Maintenance') {
      toast.warning('Xe đang bảo dưỡng, vui lòng đặt sau!')
      return
    }
    const { startDateTime, endDateTime } = convertIsoString({ date, time })
    console.log(startDateTime)
    console.log(endDateTime)
    console.log(vehicleId)

    setIsModalVisible(true)
  }

  const handleConfirm = () => {
    const { startDateTime, endDateTime } = convertIsoString({ date, time })
    console.log(startDateTime)
    console.log(endDateTime)
    console.log(vehicleId)
    console.log(typeof startDateTime)

    confirmMutation.mutate({
      vehicleId,
      startDateTime,
      endDateTime
    })
  }

  const handleCancel = (bookingId: number) => {
    cancelMutation.mutate(bookingId)
  }

  return (
    <>
      <div className={`py-6 px-4 rounded-2xl ${getSlotStyle(type)}`} onClick={confirmBooking}>
        <Tooltip title={getTooltip({ type, bookedBy })} placement='top'>
          {/* Thêm min-h và flex để căn giữa */}
          <div className='flex items-center justify-center h-[120px]'>
            {type === 'AVAILABLE' && (
              <div className='flex flex-col items-center gap-2'>
                <div className='bg-gradient-to-br from-cyan-500 to-blue-500 p-2 rounded-xl shadow-lg'>
                  <PlusOutlined style={{ fontSize: '20px', color: 'white' }} />
                </div>
                <span className='text-xs text-cyan-700 font-bold'>Đặt xe</span>
              </div>
            )}
            {type === 'BOOKED_SELF' && (
              <div className='flex flex-col items-center gap-2'>
                <div className='bg-white/20 backdrop-blur-sm p-2 rounded-xl'>
                  <UserOutlined style={{ fontSize: '20px' }} />
                </div>
                <div className='text-xs font-bold'>Bạn đã đặt</div>
              </div>
            )}
            {type === 'BOOKED_OTHER' && (
              <div className='flex flex-col items-center gap-2'>
                <div className='bg-white/20 backdrop-blur-sm p-2 rounded-xl'>
                  <UserOutlined style={{ fontSize: '20px' }} />
                </div>
                <div className='text-xs font-bold'>Đã đặt</div>
                <div className='text-xs opacity-90'>Người khác</div>
              </div>
            )}
            {type === 'LOCKED' && (
              <div className='flex flex-col items-center gap-2'>
                <div className='bg-white/20 backdrop-blur-sm p-2 rounded-xl'>
                  <LockOutlined style={{ fontSize: '20px' }} />
                </div>
                <div className='text-xs font-bold'>Đã khóa</div>
              </div>
            )}
            {type === 'COMPLETED' && (
              <div className='flex flex-col items-center gap-2'>
                <div className='bg-gradient-to-br from-green-100 to-teal-100 p-2 rounded-xl shadow-md border border-green-300'>
                  <UserOutlined style={{ fontSize: '20px', color: '#22c55e' }} />
                </div>
                <div className='text-xs font-bold text-green-700 tracking-wide drop-shadow-md'>Completed Booking</div>
              </div>
            )}
          </div>
        </Tooltip>
      </div>
      <ModalConfirm
        isLoadingConfirm={confirmMutation.isPending}
        isLoadingCancel={cancelMutation.isPending}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCancel={handleCancel}
        selectedSlot={{ day: date, timeRange: time }}
        onConfirm={handleConfirm}
        quotaUser={quotaUser}
        bookingId={bookingId ?? null}
      />
    </>
  )
}
