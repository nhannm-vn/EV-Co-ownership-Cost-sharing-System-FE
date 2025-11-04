// components/technician/CheckVehicleReport.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Skeleton from '../../../../components/Skeleton'
import technicianApi from '../../../../apis/technician.api'
import type { BookingReviewItem, BookingReviewResponse } from '../../../../types/api/technician.type'

// Color constants
const STATUS_COLORS = {
  PENDING: 'bg-yellow-50 text-yellow-700 animate-pulse',
  APPROVED: 'bg-green-50 text-green-700',
  REJECTED: 'bg-red-50 text-red-700'
}

const CHECK_TYPE_COLORS = {
  POST_USE: 'bg-blue-50 text-blue-700',
  PRE_USE: 'bg-purple-50 text-purple-700'
}

const METRIC_STYLES = {
  odometer: 'from-teal-50 to-teal-100 border-teal-200 text-teal-700',
  battery: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  cleanliness: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700'
}

export function CheckVehicleReport() {
  const [currentPage, setCurrentPage] = useState(0)
  const queryClient = useQueryClient()

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['vehicleChecks', currentPage],
    queryFn: () => technicianApi.getAllVehicleCheck(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })

  if (isPending) return <Skeleton />
  if (isError) return <ErrorState error={error} />

  const reportData = data?.data as BookingReviewResponse | undefined

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6 lg:p-8'>
      <div className='max-w-5xl mx-auto'>
        <PageHeader totalReports={reportData?.totalElements || 0} />

        <div className='space-y-3'>
          {reportData?.content?.length ? (
            reportData.content.map((report, idx) => (
              <ReportCard
                key={report.id}
                report={report}
                index={idx}
                onStatusChange={() => queryClient.invalidateQueries({ queryKey: ['vehicleChecks'] })}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {reportData && reportData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={reportData.totalPages}
            isFirst={reportData.first}
            isLast={reportData.last}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

// Sub-components
const PageHeader = ({ totalReports }: { totalReports: number }) => (
  <div className='mb-10'>
    <div className='flex items-center gap-3 mb-2'>
      <div className='w-1 h-8 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full'></div>
      <h1 className='text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent'>
        Duyệt Kiểm Tra Xe
      </h1>
    </div>
    <p className='text-gray-500 ml-4 text-sm'>
      <span className='font-semibold text-gray-700'>{totalReports}</span> báo cáo cần xử lý
    </p>
  </div>
)

const EmptyState = () => (
  <div className='text-center py-24'>
    <div className='inline-block mb-4'>
      <div className='w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center'>
        <span className='text-2xl font-bold text-teal-600'>OK</span>
      </div>
    </div>
    <p className='text-gray-500 text-lg font-medium'>Không có báo cáo chờ duyệt</p>
    <p className='text-gray-400 text-sm mt-1'>Tất cả báo cáo đã được xử lý</p>
  </div>
)

const ErrorState = ({ error }: { error: Error | null }) => (
  <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center'>
    <div className='bg-white rounded-2xl shadow-lg p-8 border border-red-200 max-w-md text-center'>
      <p className='text-red-700 font-semibold'>{error instanceof Error ? error.message : 'Không thể tải danh sách'}</p>
    </div>
  </div>
)

const Pagination = ({
  currentPage,
  totalPages,
  isFirst,
  isLast,
  onPageChange
}: {
  currentPage: number
  totalPages: number
  isFirst: boolean
  isLast: boolean
  onPageChange: (page: number) => void
}) => (
  <div className='flex justify-center items-center gap-3 mt-12'>
    <button
      onClick={() => onPageChange(Math.max(0, currentPage - 1))}
      disabled={isFirst}
      className='px-5 py-2.5 bg-white border-2 border-teal-200 text-teal-600 rounded-xl font-medium text-sm hover:border-teal-400 hover:shadow-lg transition-all disabled:opacity-50'
    >
      ← Trước
    </button>
    <div className='flex items-center gap-2 px-6 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm text-sm'>
      <span className='font-semibold text-gray-600'>{currentPage + 1}</span>
      <span className='text-gray-400'>/</span>
      <span className='font-semibold text-gray-600'>{totalPages}</span>
    </div>
    <button
      onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
      disabled={isLast}
      className='px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-teal-600/20 transition-all disabled:opacity-50'
    >
      Sau →
    </button>
  </div>
)

function ReportCard({
  report,
  index,
  onStatusChange
}: {
  report: BookingReviewItem
  index: number
  onStatusChange: () => void
}) {
  const isPending = report.status === 'PENDING'

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('vi-VN', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

  const { mutate: checkReport, isPending: isSubmitting } = useMutation({
    mutationFn: (status: 'APPROVED' | 'REJECTED') => technicianApi.checkReport(String(report.id), status),
    onSuccess: () => {
      onStatusChange()
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật trạng thái:', error)
    }
  })

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-teal-200 transition-all ${
        isPending ? 'ring-1 ring-teal-100' : ''
      }`}
      style={{ animation: `slideIn 0.4s ease-out ${index * 0.08}s both` }}
    >
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* Header */}
      <div className='flex items-center gap-4 mb-4 pb-4 border-b border-gray-100'>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
            isPending ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isPending ? 'NEW' : 'OK'}
        </div>

        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-gray-900'>Báo cáo #{report.id}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${CHECK_TYPE_COLORS[report.checkType]}`}>
              {report.checkType === 'POST_USE' ? 'Sau' : 'Trước'}
            </span>
          </div>
          <p className='text-xs text-gray-500 mt-1'>{formatDate(report.createdAt)}</p>
        </div>

        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-full whitespace-nowrap ${STATUS_COLORS[report.status]}`}
        >
          {report.status === 'PENDING' ? 'Chờ xử lý' : report.status === 'APPROVED' ? 'Phê duyệt' : 'Từ chối'}
        </span>
      </div>

      {/* Metrics */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        <MetricCard label='Km' value={report.odometer} style={METRIC_STYLES.odometer} />
        <MetricCard label='Pin' value={`${report.batteryLevel}%`} style={METRIC_STYLES.battery} />
        <MetricCard label='Sạch' value={report.cleanliness ?? '—'} style={METRIC_STYLES.cleanliness} />
      </div>

      {/* Notes & Issues */}
      {(report.issues || report.notes) && (
        <div className='mb-4 space-y-2'>
          {report.issues && (
            <div className='bg-red-50 border-l-3 border-red-400 px-3 py-2 rounded-r text-sm'>
              <span className='font-bold text-red-700'>Vấn đề:</span>
              <span className='ml-2 text-red-600'>{report.issues}</span>
            </div>
          )}
          {report.notes && (
            <div className='bg-blue-50 border-l-3 border-blue-400 px-3 py-2 rounded-r text-sm'>
              <span className='font-bold text-blue-700'>Ghi chú:</span>
              <span className='ml-2 text-blue-600'>{report.notes}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {isPending && (
        <div className='flex gap-2 pt-4 border-t border-gray-100'>
          <button
            onClick={() => checkReport('REJECTED')}
            disabled={isSubmitting}
            className='flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-2 border-red-300 hover:from-red-100 hover:to-red-200 hover:shadow-lg hover:shadow-red-500/10 disabled:opacity-50'
          >
            {isSubmitting ? 'Đang xử lý...' : 'Từ chối'}
          </button>
          <button
            onClick={() => checkReport('APPROVED')}
            disabled={isSubmitting}
            className='flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 hover:shadow-lg hover:shadow-teal-600/20 disabled:opacity-50'
          >
            {isSubmitting ? 'Đang xử lý...' : 'Phê duyệt'}
          </button>
        </div>
      )}
    </div>
  )
}

const MetricCard = ({ label, value, style }: { label: string; value: string | number; style: string }) => (
  <div className={`bg-gradient-to-br ${style} rounded-lg p-3 border`}>
    <p className='text-xs font-bold uppercase mb-1 opacity-75'>{label}</p>
    <p className='text-2xl font-black'>{value}</p>
  </div>
)

export default CheckVehicleReport
