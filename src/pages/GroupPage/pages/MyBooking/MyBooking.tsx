import { LockOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import groupApi from '../../../../apis/group.api'
import Skeleton from '../../../../components/Skeleton'
import { getGroupIdFromLS } from '../../../../utils/auth'
import Legend from './components/Legend'
import { formatDate } from '../../../../utils/formatTimeMyBooking'
import EmptyBooking from './components/EmptyBooking'
import type { MyBookingResponse } from '../../../../types/api/group.type'

const MyBooking = () => {
  const [bookings, setBookings] = useState<MyBookingResponse[]>([])
  const [loading, setLoading] = useState(true)
  const groupId = getGroupIdFromLS()

  // Define maintenance slots
  const maintenanceSlotIndices = [1, 3, 5, 7, 9, 11] // 03-04, 07-08, 11-12, 15-16, 19-20, 23-24

  useEffect(() => {
    let isMounted = true

    const fetchBookings = async () => {
      try {
        setLoading(true)

        const response = await groupApi.getMyBooking(groupId || '')

        if (isMounted) {
          if (response?.data && Array.isArray(response.data)) {
            setBookings(response.data)
          } else {
            setBookings([])
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching bookings:', err)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchBookings()

    return () => {
      isMounted = false
    }
  }, [groupId])

  const timeSlots = [
    '00:00-03:00',
    '03:00-04:00',
    '04:00-07:00',
    '07:00-08:00',
    '08:00-11:00',
    '11:00-12:00',
    '12:00-15:00',
    '15:00-16:00',
    '16:00-19:00',
    '19:00-20:00',
    '20:00-23:00',
    '23:00-00:00+1'
  ]

  const weekDays = useMemo(() => {
    const days = []
    const today = new Date()
    const currentDay = today.getDay()

    let daysToMonday
    if (currentDay === 0) {
      daysToMonday = -6
    } else {
      daysToMonday = 1 - currentDay
    }

    const monday = new Date(today)
    monday.setDate(today.getDate() + daysToMonday)

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday)
      day.setDate(monday.getDate() + i)
      days.push(day)
    }
    return days
  }, [])

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const timeSlotHours: Record<number, { start: number; end: number }> = {
    0: { start: 0, end: 3 },
    1: { start: 3, end: 4 },
    2: { start: 4, end: 7 },
    3: { start: 7, end: 8 },
    4: { start: 8, end: 11 },
    5: { start: 11, end: 12 },
    6: { start: 12, end: 15 },
    7: { start: 15, end: 16 },
    8: { start: 16, end: 19 },
    9: { start: 19, end: 20 },
    10: { start: 20, end: 23 },
    11: { start: 23, end: 24 }
  }

  const isMaintenanceSlot = (slotIndex: number): boolean => {
    return maintenanceSlotIndices.includes(slotIndex)
  }

  const isBookingInSlot = (booking: MyBookingResponse, date: Date, slotIndex: number): boolean => {
    try {
      if (!booking?.startDateTime) return false

      const bookingStart = new Date(booking.startDateTime)
      if (isNaN(bookingStart.getTime())) return false

      const isSameDate =
        bookingStart.getDate() === date.getDate() &&
        bookingStart.getMonth() === date.getMonth() &&
        bookingStart.getFullYear() === date.getFullYear()

      if (!isSameDate) return false

      const bookingHour = bookingStart.getHours()
      const slotInfo = timeSlotHours[slotIndex]

      if (!slotInfo) return false

      return bookingHour >= slotInfo.start && bookingHour < slotInfo.end
    } catch {
      return false
    }
  }

  const getBookingForSlot = (date: Date, slotIndex: number): MyBookingResponse | undefined => {
    try {
      return bookings.find((booking) => isBookingInSlot(booking, date, slotIndex))
    } catch {
      return undefined
    }
  }

  const getStatusStyle = (status: string): string => {
    switch (status?.toUpperCase?.()) {
      case 'CONFIRMED':
        return 'bg-gradient-to-br from-cyan-400 to-sky-500 shadow-md'
      case 'COMPLETED':
        return 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md'
      case 'CANCELLED':
        return 'bg-gradient-to-br from-slate-300 to-slate-400 shadow-md'
      default:
        return 'bg-gradient-to-br from-cyan-400 to-sky-500 shadow-md'
    }
  }

  const getStatusText = (status: string): string => {
    switch (status?.toUpperCase?.()) {
      case 'CONFIRMED':
        return 'Confirmed'
      case 'COMPLETED':
        return 'Completed'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status || 'Unknown'
    }
  }

  const getTimeRange = (slot: string): { start: string; end: string } => {
    const [start, end] = slot.split('-')
    return { start: start || '', end: end || '' }
  }

  if (bookings.length === 0) {
    return <EmptyBooking weekDays={weekDays} />
  }

  return loading ? (
    <Skeleton />
  ) : (
    <div className='bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 p-6 my-8 rounded-3xl'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-1 h-8 bg-gradient-to-b from-cyan-400 to-sky-500 rounded-full'></div>
            <h1 className='text-4xl font-bold text-gray-900'>My Bookings</h1>
          </div>
          <p className='text-gray-500 text-sm font-medium ml-5'>
            Week of {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
          </p>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className='bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'
        >
          {/* Header Row with Days */}
          <div className='grid grid-cols-8 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500'>
            <div className='px-4 py-5 flex items-center justify-center border-r border-white/15'>
              <div className='text-center'>
                <svg className='w-5 h-5 text-white mx-auto mb-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2.5}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <div className='text-white font-bold text-xs whitespace-nowrap'>TIME SLOT</div>
              </div>
            </div>
            {weekDays.map((day, index) => (
              <div
                key={`day-${index}`}
                className='px-4 py-5 text-center border-r border-white/15 last:border-r-0 hover:bg-white/10 transition-colors cursor-pointer'
              >
                <div className='text-white font-bold text-sm leading-tight'>{dayNames[index]}</div>
                <div className='text-sky-100 text-xs font-semibold mt-1'>{formatDate(day)}</div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((slot, slotIndex) => {
            const { start, end } = getTimeRange(slot)
            const isMaintenance = isMaintenanceSlot(slotIndex)

            return (
              <div
                key={`slot-${slotIndex}`}
                className={`grid grid-cols-8 border-t ${isMaintenance ? 'bg-gray-50/50' : 'border-gray-100'}`}
              >
                {/* Time Label */}
                <div
                  className={`px-3 py-3 border-r flex items-center justify-center sticky left-0 z-10 ${
                    isMaintenance
                      ? 'bg-gradient-to-b from-orange-50/70 to-amber-50/70 border-orange-100'
                      : 'bg-gradient-to-b from-cyan-50/70 to-sky-50/70 border-gray-100'
                  }`}
                >
                  <div className='text-center'>
                    <div
                      className={`text-xs font-bold leading-none ${isMaintenance ? 'text-orange-600' : 'text-cyan-600'}`}
                    >
                      {start}
                    </div>
                    <div
                      className={`text-xs font-bold leading-none mt-1 ${isMaintenance ? 'text-orange-600' : 'text-cyan-600'}`}
                    >
                      {end}
                    </div>
                  </div>
                </div>

                {/* Day Cells */}
                {weekDays.map((day, dayIndex) => {
                  const booking = getBookingForSlot(day, slotIndex)

                  return (
                    <div
                      key={`cell-${slotIndex}-${dayIndex}`}
                      className={`px-1.5 py-2.5 border-r border-gray-100 last:border-r-0 min-h-[92px] flex items-center justify-center transition-colors ${
                        isMaintenance ? 'bg-gray-50/50 hover:bg-gray-100/50' : 'hover:bg-sky-50/50'
                      }`}
                    >
                      {booking ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className={`${getStatusStyle(booking.status)} text-white rounded-xl p-3 h-full cursor-pointer group hover:shadow-lg transition-all duration-200 w-full`}
                        >
                          <div className='flex items-start gap-2 mb-2'>
                            <div className='w-7 h-7 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0 group-hover:bg-white/35 transition-all'>
                              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 15c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 10l1.5-4.5h11L19 10H5z' />
                              </svg>
                            </div>
                            <div className='flex-1 min-w-0'>
                              <div className='font-bold text-xs leading-tight truncate'>
                                {booking.licensePlate || 'N/A'}
                              </div>
                              <div className='text-xs opacity-95 truncate leading-tight'>
                                {booking.brand || 'Unknown'} {booking.model || ''}
                              </div>
                            </div>
                          </div>
                          <div className='text-xs opacity-90 mt-2 pt-2 border-t border-white/25'>
                            <span className='font-bold'>{getStatusText(booking.status)}</span>
                            <span className='opacity-75 ml-1.5'>#{booking.bookingId}</span>
                          </div>
                        </motion.div>
                      ) : isMaintenance ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className='flex flex-col items-center justify-center gap-2'
                        >
                          <LockOutlined style={{ fontSize: '20px', color: '#D97706' }} />
                          <span className='text-xs font-semibold text-amber-600 text-center'>Maintenance</span>
                        </motion.div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </motion.div>

        {/* Legend */}
        <Legend />
      </div>
    </div>
  )
}

export default MyBooking
