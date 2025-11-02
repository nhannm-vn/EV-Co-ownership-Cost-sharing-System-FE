import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface MyBooking {
  bookingId: number
  licensePlate: string
  brand: string
  model: string
  startDateTime: string
  endDateTime: string
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | string
}

const MyBooking = () => {
  const bookings: MyBooking[] = [
    {
      bookingId: 1,
      licensePlate: '30A-12345',
      brand: 'VinFast',
      model: 'VF e34',
      startDateTime: '2025-11-03T06:00:00',
      endDateTime: '2025-11-03T09:00:00',
      status: 'CONFIRMED'
    },
    {
      bookingId: 2,
      licensePlate: '51B-67890',
      brand: 'Tesla',
      model: 'Model 3',
      startDateTime: '2025-11-04T12:00:00',
      endDateTime: '2025-11-04T15:00:00',
      status: 'COMPLETED'
    },
    {
      bookingId: 3,
      licensePlate: '29C-11111',
      brand: 'VinFast',
      model: 'VF 8',
      startDateTime: '2025-11-05T08:00:00',
      endDateTime: '2025-11-05T11:00:00',
      status: 'CANCELLED'
    },
    {
      bookingId: 4,
      licensePlate: '30B-99999',
      brand: 'VinFast',
      model: 'VF 5',
      startDateTime: '2025-11-07T16:00:00',
      endDateTime: '2025-11-07T19:00:00',
      status: 'CONFIRMED'
    }
  ]

  const timeSlots = [
    '00:00-03:00',
    '03:00-06:00',
    '06:00-09:00',
    '09:00-12:00',
    '12:00-15:00',
    '15:00-18:00',
    '18:00-21:00',
    '21:00-00:00'
  ]

  const weekDays = useMemo(() => {
    const days = []
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - today.getDay() + 1)

    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      days.push(day)
    }
    return days
  }, [])

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${day}/${month}`
  }

  const isBookingInSlot = (booking: MyBooking, date: Date, slotIndex: number) => {
    const bookingStart = new Date(booking.startDateTime)
    const slotHours = [0, 3, 6, 9, 12, 15, 18, 21]

    const isSameDate =
      bookingStart.getDate() === date.getDate() &&
      bookingStart.getMonth() === date.getMonth() &&
      bookingStart.getFullYear() === date.getFullYear()

    const bookingHour = bookingStart.getHours()
    const slotStartHour = slotHours[slotIndex]
    const slotEndHour = slotIndex < 7 ? slotHours[slotIndex + 1] : 24

    return isSameDate && bookingHour >= slotStartHour && bookingHour < slotEndHour
  }

  const getBookingForSlot = (date: Date, slotIndex: number) => {
    return bookings.find((booking) => isBookingInSlot(booking, date, slotIndex))
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmed'
      case 'COMPLETED':
        return 'Completed'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 p-6 my-8 rounded-3xl'>
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
          {/* Header Row */}
          <div className='grid grid-cols-8 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500'>
            <div className='px-4 py-5 flex items-center justify-center border-r border-white/15'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2.5}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className='px-4 py-5 text-center border-r border-white/15 last:border-r-0 hover:bg-white/10 transition-colors cursor-pointer'
              >
                <div className='text-white font-bold text-sm leading-tight'>{dayNames[index]}</div>
                <div className='text-sky-100 text-xs font-semibold mt-1'>{formatDate(day)}</div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((slot, slotIndex) => (
            <div key={slotIndex} className='grid grid-cols-8 border-t border-gray-100'>
              {/* Time Label */}
              <div className='px-4 py-3.5 bg-gradient-to-b from-cyan-50/70 to-sky-50/70 border-r border-gray-100 flex items-center justify-center sticky left-0 z-10'>
                <span className='text-xs font-bold text-cyan-700'>{slot}</span>
              </div>

              {/* Day Cells */}
              {weekDays.map((day, dayIndex) => {
                const booking = getBookingForSlot(day, slotIndex)

                return (
                  <div
                    key={dayIndex}
                    className='px-1.5 py-2.5 border-r border-gray-100 last:border-r-0 min-h-[92px] hover:bg-sky-50/50 transition-colors'
                  >
                    {booking ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className={`${getStatusStyle(booking.status)} text-white rounded-xl p-3 h-full cursor-pointer group hover:shadow-lg transition-all duration-200`}
                      >
                        <div className='flex items-start gap-2 mb-2'>
                          <div className='w-7 h-7 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0 group-hover:bg-white/35 transition-all'>
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M18.92 5.01C18.72 4.42 18.16 4 17.5 4h-11c-.66 0-1.21.42-1.42 1.01L3 11v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 15c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 10l1.5-4.5h11L19 10H5z' />
                            </svg>
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='font-bold text-xs leading-tight truncate'>{booking.licensePlate}</div>
                            <div className='text-xs opacity-95 truncate leading-tight'>
                              {booking.brand} {booking.model}
                            </div>
                          </div>
                        </div>
                        <div className='text-xs opacity-90 mt-2 pt-2 border-t border-white/25'>
                          <span className='font-bold'>{getStatusText(booking.status)}</span>
                          <span className='opacity-75 ml-1.5'>#{booking.bookingId}</span>
                        </div>
                      </motion.div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='mt-7 bg-white rounded-2xl shadow-lg border border-gray-100 p-6'
        >
          <h3 className='font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest'>Status</h3>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform'>
              <div className='w-4 h-4 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 shadow-sm group-hover:shadow-md transition-shadow'></div>
              <span className='text-sm font-semibold text-gray-700'>Confirmed</span>
            </div>
            <div className='flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform'>
              <div className='w-4 h-4 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm group-hover:shadow-md transition-shadow'></div>
              <span className='text-sm font-semibold text-gray-700'>Completed</span>
            </div>
            <div className='flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform'>
              <div className='w-4 h-4 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 shadow-sm group-hover:shadow-md transition-shadow'></div>
              <span className='text-sm font-semibold text-gray-700'>Cancelled</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MyBooking
