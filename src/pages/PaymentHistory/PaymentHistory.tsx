/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query'
import userApi from '../../apis/user.api'
import { getUserIdFromLS } from '../../utils/auth'
import type { PaymentItem } from '../../types/api/user.type'
import { formatToVND } from '../../utils/formatPrice'

export default function PaymentHistory() {
  const userId = getUserIdFromLS()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['paymentHistory', userId],
    queryFn: async () => {
      const response = await userApi.getHistoryPayments(Number(userId))
      return response.data
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: 2
  })

  if (isError) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50'>
        <div className='rounded-2xl bg-white shadow-xl border border-blue-100 p-12 max-w-md text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center'>
            <svg className='w-8 h-8 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>Đã xảy ra lỗi</h2>
          <p className='text-gray-600 mb-6 text-sm'>
            {error instanceof Error ? error.message : 'Không thể tải lịch sử giao dịch. Vui lòng thử lại.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm'
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen p-4 md:p-8 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600'>
      <div className='mx-auto w-full max-w-5xl'>
        {/* Header & Summary Cards */}
        <div className='mb-6 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 shadow-lg overflow-hidden'>
          <div className='px-6 md:px-8 py-8'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  />
                </svg>
              </div>
              <h1 className='text-2xl md:text-3xl font-bold text-white'>Lịch sử giao dịch</h1>
            </div>
            <p className='text-blue-100 text-sm'>Theo dõi toàn bộ giao dịch của bạn</p>
          </div>
          {data && (
            <div className='px-6 md:px-8 pb-8'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4'>
                  <div className='text-blue-100 text-xs font-medium mb-1'>Tổng đã thanh toán</div>
                  <div className='text-white text-xl md:text-2xl font-bold'>
                    {formatToVND(data.totalCompletedAmount)}
                  </div>
                </div>
                <div className='rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4'>
                  <div className='text-blue-100 text-xs font-medium mb-1'>Tổng giao dịch</div>
                  <div className='text-white text-xl md:text-2xl font-bold'>{data.items.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transaction List with Scroll */}
        <div className='rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden'>
          <div className='px-6 md:px-8 py-4 bg-gray-50 border-b border-gray-100 sticky top-0 z-10'>
            <h2 className='text-sm font-semibold text-gray-700'>Danh sách giao dịch</h2>
          </div>
          <div
            className='p-4 md:p-6'
            style={{
              maxHeight: 500,
              overflowY: 'auto'
            }}
          >
            {isLoading && (
              <div className='space-y-3'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='p-5 rounded-xl bg-gray-50 animate-pulse'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='h-5 w-40 rounded bg-gray-200' />
                      <div className='h-6 w-28 rounded bg-gray-200' />
                    </div>
                    <div className='h-4 w-32 rounded bg-gray-200 mb-3' />
                    <div className='flex gap-2'>
                      <div className='h-6 w-20 rounded-full bg-gray-200' />
                      <div className='h-6 w-20 rounded-full bg-gray-200' />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && data?.items && data.items.length === 0 && (
              <div className='py-20 text-center'>
                <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </div>
                <p className='text-gray-500 font-medium'>Chưa có giao dịch nào</p>
                <p className='text-gray-400 text-sm mt-1'>Các giao dịch của bạn sẽ hiển thị tại đây</p>
              </div>
            )}

            {!isLoading && data?.items && (
              <div className='space-y-3'>
                {data.items.map((item) => (
                  <div
                    key={item.paymentId}
                    className='group relative p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-white'
                  >
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex items-center gap-3 min-w-0 flex-1'>
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-50'
                              : item.status === 'PENDING'
                                ? 'bg-amber-50'
                                : 'bg-red-50'
                          }`}
                        >
                          {item.paymentType === 'DEPOSIT' ? (
                            <svg
                              className='w-5 h-5 text-blue-600'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                            </svg>
                          ) : (
                            <svg
                              className='w-5 h-5 text-purple-600'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                              />
                            </svg>
                          )}
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h3 className='text-base font-semibold text-gray-900 truncate'>{item.groupName}</h3>
                          <div className='flex items-center gap-2 text-xs text-gray-500 flex-wrap'>
                            <span className='font-mono'>{item.transactionCode}</span>
                            <span>•</span>
                            <span>
                              {new Date(item.paymentDate).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='text-right flex-shrink-0'>
                        <div
                          className={`text-lg md:text-xl font-bold ${
                            item.paymentType === 'DEPOSIT' ? 'text-emerald-600' : 'text-blue-600'
                          }`}
                        >
                          {formatToVND(item.amount)}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      <StatusBadge status={item.status} />
                      <TypeBadge type={item.paymentType} />
                      <MethodBadge method={item.paymentMethod} />
                    </div>
                    <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: PaymentItem['status'] }) {
  const styles = {
    COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    FAILED: 'bg-red-50 text-red-700 border-red-200'
  }
  const labels = {
    COMPLETED: 'Hoàn tất',
    PENDING: 'Đang xử lý',
    FAILED: 'Thất bại'
  }
  const icons = {
    COMPLETED: (
      <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        />
      </svg>
    ),
    PENDING: (
      <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
          clipRule='evenodd'
        />
      </svg>
    ),
    FAILED: (
      <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
          clipRule='evenodd'
        />
      </svg>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status]}`}
    >
      {icons[status]}
      {labels[status]}
    </span>
  )
}

function TypeBadge({ type }: { type: PaymentItem['paymentType'] }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
        type === 'DEPOSIT'
          ? 'bg-blue-50 text-blue-700 border-blue-200'
          : 'bg-purple-50 text-purple-700 border-purple-200'
      }`}
    >
      {type === 'DEPOSIT' ? 'Nạp tiền' : 'Đóng góp'}
    </span>
  )
}

function MethodBadge({ method }: { method: PaymentItem['paymentMethod'] }) {
  const styles = {
    VNPAY: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    BANK_TRANSFER: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    CASH: 'bg-gray-50 text-gray-700 border-gray-200'
  }
  const labels = {
    VNPAY: 'VNPay',
    BANK_TRANSFER: 'Chuyển khoản',
    CASH: 'Tiền mặt'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${styles[method]}`}>
      {labels[method]}
    </span>
  )
}
