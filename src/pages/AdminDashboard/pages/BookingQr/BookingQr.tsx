/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeCanvas } from 'qrcode.react'
import adminApi from '../../../../apis/admin.api'
import EmptyQRCard from './components/EmptyQRCard'

export default function BookingQr() {
  const { userId, groupId } = useParams()
  const qrRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const {
    data: bookingResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['booking', userId, groupId],
    queryFn: () =>
      adminApi.getQrBookingByUserIdAndGroupId({
        userId: Number(userId),
        groupId: Number(groupId)
      }),
    enabled: !!userId && !!groupId
  })

  const bookings = bookingResponse?.data?.content || []

  //function help download QR code as PNG
  const handleDownload = (bookingId: number, phase: string) => {
    const canvas = qrRefs.current[`${bookingId}-${phase}`]?.querySelector('canvas') as HTMLCanvasElement
    if (canvas) {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `booking-${bookingId}-${phase.toLowerCase()}-qr.png`
      link.click()
    }
  }

  const QRCardContent = ({ qrData, phase }: any) => {
    const isCHECKIN = phase === 'CHECKIN'
    const colors = isCHECKIN
      ? {
          header: 'bg-teal-700',
          badge: 'bg-teal-100 text-teal-700',
          border: 'border-teal-300',
          button: 'bg-teal-50 text-teal-700 hover:bg-teal-100',
          qr: '#0d9488'
        }
      : {
          header: 'bg-gray-700',
          badge: 'bg-gray-100 text-gray-700',
          border: 'border-gray-300',
          button: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
          qr: '#4b5563'
        }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-2xl shadow-sm border ${colors.border} overflow-hidden hover:shadow-md transition-shadow`}
      >
        <div className={`${colors.header} px-6 py-4 flex justify-between items-center`}>
          <p className='font-bold text-lg text-white'>{phase}</p>
          <span className={`${colors.badge} px-3 py-1 rounded-md text-xs font-semibold`}>{phase}</span>
        </div>

        <div className='p-6 flex items-center justify-center bg-white'>
          <div
            ref={(el) => {
              if (el) qrRefs.current[`${qrData.bookingId}-${phase}`] = el.parentElement as HTMLDivElement
            }}
            className='bg-white p-4 rounded-lg shadow-sm border border-gray-200'
          >
            <QRCodeCanvas value={JSON.stringify(qrData)} size={200} level='H' fgColor={colors.qr} bgColor='#ffffff' />
          </div>
        </div>

        <div className='px-6 py-3 space-y-2 border-t border-gray-100 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Vehicle ID</span>
            <span className='font-semibold text-gray-800'>{qrData.vehicleId}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Start</span>
            <span className='font-semibold text-gray-800 text-xs'>
              {new Date(qrData.startTime).toLocaleString('vi-VN')}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>End</span>
            <span className='font-semibold text-gray-800 text-xs'>
              {new Date(qrData.endTime).toLocaleString('vi-VN')}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleDownload(qrData.bookingId, phase)}
          className={`w-full px-6 py-3 font-medium border-t border-gray-100 transition-colors ${colors.button}`}
        >
          Download {phase}
        </motion.button>
      </motion.div>
    )
  }

  if (isLoading)
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600' />
      </div>
    )
  if (error)
    return (
      <div className='min-h-screen bg-white flex items-center justify-center p-6'>
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
          Error: {error instanceof Error ? error.message : 'Unknown'}
        </div>
      </div>
    )
  if (!bookings.length)
    return (
      <div className='min-h-screen bg-white flex items-center justify-center p-6'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-12'>
          <p className='text-gray-500'>No bookings found</p>
        </div>
      </div>
    )

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-6xl mx-auto mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>QR Code Check-in / Check-out</h1>
        <p className='text-gray-600'>
          User {userId} • Group {groupId} • Total: <span className='font-semibold'>{bookings.length}</span> bookings
        </p>
      </div>

      <div className='max-w-6xl mx-auto space-y-4'>
        {bookings.map((booking, idx) => (
          <motion.div
            key={booking.bookingId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* Header - Click to Toggle */}
            <motion.div
              onClick={() => setExpandedId(expandedId === booking.bookingId ? null : booking.bookingId)}
              className='bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-teal-300 cursor-pointer transition-all'
            >
              <div className='px-6 py-4 flex items-center justify-between'>
                <div className='flex-1'>
                  <h3 className='text-lg font-bold text-gray-900'>Booking: {booking.bookingId}</h3>
                  <p className='text-gray-600 text-sm mt-1'>
                    {booking.licensePlate} • {booking.brand}
                  </p>
                  <div className='flex items-center gap-2 mt-2 text-xs text-gray-500'>
                    <span>{new Date(booking.startDateTime).toLocaleString('vi-VN')}</span>
                    <span>→</span>
                    <span>{new Date(booking.endDateTime).toLocaleString('vi-VN')}</span>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-green-50 text-green-700'
                        : booking.status === 'CANCELLED'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                  <motion.svg
                    animate={{ rotate: expandedId === booking.bookingId ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className='w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                  </motion.svg>
                </div>
              </div>

              {/* Status Indicators */}
              <div className='px-6 py-2 bg-gray-50 border-t border-gray-100 flex gap-4 text-xs'>
                <div className='flex items-center gap-2'>
                  <div className={`w-2 h-2 rounded-full ${booking.qrCodeCheckin ? 'bg-teal-600' : 'bg-gray-300'}`} />
                  <span className='text-gray-600'>{booking.qrCodeCheckin ? '✓ Check-in' : 'Check-in'}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className={`w-2 h-2 rounded-full ${booking.qrCodeCheckout ? 'bg-gray-600' : 'bg-gray-300'}`} />
                  <span className='text-gray-600'>{booking.qrCodeCheckout ? '✓ Check-out' : 'Check-out'}</span>
                </div>
              </div>
            </motion.div>

            {/* Expanded QR Codes */}
            <AnimatePresence>
              {expandedId === booking.bookingId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'
                >
                  {booking.qrCodeCheckin ? (
                    <QRCardContent qrData={booking.qrCodeCheckin} phase='CHECKIN' />
                  ) : (
                    <EmptyQRCard phase='CHECKIN' />
                  )}
                  {booking.qrCodeCheckout ? (
                    <QRCardContent qrData={booking.qrCodeCheckout} phase='CHECKOUT' />
                  ) : (
                    <EmptyQRCard phase='CHECKOUT' />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
