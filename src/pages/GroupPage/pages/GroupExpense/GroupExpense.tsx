import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import { useState } from 'react'
import Skeleton from '../../../../components/Skeleton'
import { FaCheckCircle } from 'react-icons/fa'
import { ClockCircleOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons'

interface MaintenancePayment {
  id: number
  description: string
  actualCost: number
  estimatedDurationDays: number
  vehicleModel: string
  status: string
  requestedByName: string
}

export default function GroupExpense() {
  const paymentMaintanceQuery = useQuery({
    queryKey: ['payment-maintance'],
    queryFn: () => userApi.getAllPaymentMaintance()
  })

  const paymentMaintenanceMutation = useMutation({
    mutationFn: (maintenanceId: string) => userApi.paymentMaintenance(maintenanceId),
    onSuccess: (response) => {
      console.log('Payment successful', response)
      window.open(`${response?.data?.vnpayUrl}`, '_blank')
    }
  })

  const handlePayment = (maintenanceId: string) => {
    // Implement payment logic here
    paymentMaintenanceMutation.mutate(maintenanceId)
  }

  const [selectedItem, setSelectedItem] = useState<MaintenancePayment | null>(null)

  const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫'
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { bg: string; text: string; label: string } } = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Chờ duyệt' },
      FUNDED: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Đã duyệt' },
      COMPLETED: { bg: 'bg-green-100', text: 'text-green-700', label: 'Hoàn thành' }
    }
    const config = statusConfig[status] || statusConfig.PENDING
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  // Loading skeleton
  if (paymentMaintanceQuery.isLoading) {
    return <Skeleton />
  }
  if (paymentMaintanceQuery?.data?.data.length === 0) {
    return (
      <div className='flex items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-dashed border-gray-300'>
        <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-600'>
          <FaCheckCircle className='w-6 h-6' />
        </div>
        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-gray-900'>No maintenance requests available</p>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-14 py-5 m-24 rounded-3xl'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Danh sách Bảo trì</h2>
          <p className='text-gray-600'>Tổng: {paymentMaintanceQuery?.data?.data.length || 0} yêu cầu</p>
        </div>

        {/* List with enhanced cards */}
        <div className='space-y-4'>
          {paymentMaintanceQuery?.data?.data.map((item: MaintenancePayment) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className='group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 overflow-hidden'
            >
              {/* Gradient overlay on hover */}
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative flex justify-between items-start'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg'>
                      {item.vehicleModel.charAt(0)}
                    </div>
                    <div>
                      <h3 className='font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors'>
                        {item.vehicleModel}
                      </h3>
                      <p className='text-sm text-gray-500'>ID: #{item.id}</p>
                    </div>
                  </div>

                  <p className='text-gray-600 mb-3 line-clamp-2'>{item.description}</p>

                  <div className='flex items-center gap-3 flex-wrap'>
                    {getStatusBadge(item.status)}
                    <span className='text-xs text-gray-500 flex items-center gap-1'>
                      <ClockCircleOutlined className='text-gray-500 w-4 h-4' />
                      {item.estimatedDurationDays} ngày
                    </span>
                  </div>
                </div>

                <div className='text-right ml-4'>
                  <div className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
                    {formatVND(item.actualCost)}
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>Chi phí</p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className='absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300'>
                <RightOutlined className='text-blue-600 text-xl' />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Detail Modal */}
        {selectedItem && (
          <div
            className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
            onClick={() => setSelectedItem(null)}
          >
            <div
              className='bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with gradient */}
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-2xl font-bold mb-1'>Chi tiết Bảo trì</h3>
                    <p className='text-blue-100 text-sm'>{selectedItem.vehicleModel}</p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className='w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors'
                  >
                    <CloseOutlined className='!text-white' />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className='p-6 space-y-4'>
                <div className='bg-gray-50 rounded-lg p-4'>
                  <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block'>
                    Mô tả
                  </label>
                  <p className='text-gray-800 leading-relaxed'>{selectedItem.description}</p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4'>
                    <label className='text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2 block'>
                      Chi phí
                    </label>
                    <p className='text-2xl font-bold text-blue-700'>{formatVND(selectedItem.actualCost)}</p>
                  </div>

                  <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4'>
                    <label className='text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2 block'>
                      Thời gian
                    </label>
                    <p className='text-2xl font-bold text-purple-700'>{selectedItem.estimatedDurationDays}</p>
                    <p className='text-xs text-purple-600 mt-1'>ngày</p>
                  </div>
                </div>

                <div className='bg-gray-50 rounded-lg p-4'>
                  <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block'>
                    Trạng thái
                  </label>
                  <div className='flex items-center gap-2'>
                    {getStatusBadge(selectedItem.status)}
                    <span className='text-sm text-gray-600'>• ID: #{selectedItem.id}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className='p-6 bg-gray-50 border-t flex gap-3'>
                <button
                  onClick={() => setSelectedItem(null)}
                  className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                  Đóng
                </button>

                <button
                  onClick={() => handlePayment(selectedItem?.id.toString() || '')}
                  className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg'
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
