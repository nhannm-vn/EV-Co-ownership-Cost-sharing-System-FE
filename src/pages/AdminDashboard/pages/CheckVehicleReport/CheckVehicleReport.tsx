import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Skeleton from '../../../../components/Skeleton'
import technicianApi from '../../../../apis/technician.api'
import type { VehicleCheck } from '../../../../types/api/technician.type'

const STATUS_COLORS = {
  PENDING: 'bg-lime-50 text-lime-600 animate-pulse',
  APPROVED: 'bg-green-50 text-green-700',
  REJECTED: 'bg-red-50 text-red-700'
} as const

const CHECK_TYPE_COLORS = {
  POST_USE: 'bg-emerald-50 text-emerald-700',
  PRE_USE: 'bg-lime-50 text-lime-700'
} as const

const METRIC_STYLES = {
  odometer: 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700',
  battery: 'from-lime-50 to-lime-100 border-lime-200 text-lime-700',
  cleanliness: 'from-green-50 to-green-100 border-green-200 text-green-700'
} as const

export function CheckVehicleReport() {
  const queryClient = useQueryClient()
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['vehicleChecks'],
    queryFn: () => technicianApi.getAllVehicleCheck(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })

  if (isPending) return <Skeleton />
  if (isError) return <ErrorState error={error as Error} />

  const reportData = data?.data ?? []

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-white p-6 lg:p-8'>
      <div className='max-w-5xl mx-auto'>
        <PageHeader totalReports={reportData.length} />
        <div className='space-y-3'>
          {reportData.length ? (
            reportData.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onStatusChange={() => queryClient.invalidateQueries({ queryKey: ['vehicleChecks'] })}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  )
}

const PageHeader = ({ totalReports }: { totalReports: number }) => (
  <div className='mb-10'>
    <div className='flex items-center gap-3 mb-2'>
      <div className='w-1 h-8 bg-gradient-to-b from-emerald-500 to-lime-600 rounded-full'></div>
      <h1 className='text-4xl font-bold bg-gradient-to-r from-emerald-600 to-lime-700 bg-clip-text text-transparent'>
        Vehicle Inspection Approval
      </h1>
    </div>
    <p className='text-green-500 ml-4 text-sm'>
      <span className='font-semibold text-emerald-700'>{totalReports}</span> reports on this page
    </p>
  </div>
)

const EmptyState = () => (
  <div className='text-center py-24'>
    <div className='inline-block mb-4'>
      <div className='w-20 h-20 bg-gradient-to-br from-emerald-100 to-lime-100 rounded-full flex items-center justify-center'>
        <span className='text-2xl font-bold text-emerald-600'>OK</span>
      </div>
    </div>
    <p className='text-green-500 text-lg font-medium'>No pending reports</p>
    <p className='text-green-400 text-sm mt-1'>All reports have been processed</p>
  </div>
)

const ErrorState = ({ error }: { error: Error | null }) => (
  <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6 flex items-center justify-center'>
    <div className='bg-white rounded-2xl shadow-lg p-8 border border-red-200 max-w-md text-center'>
      <p className='text-red-700 font-semibold'>
        {error instanceof Error ? error.message : 'Failed to load report list'}
      </p>
    </div>
  </div>
)

function ReportCard({ report, onStatusChange }: { report: VehicleCheck; onStatusChange: () => void }) {
  const isPending = report.status === 'PENDING'
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-GB', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

  const { mutate: checkReport, isPending: isSubmitting } = useMutation({
    mutationFn: (status: 'APPROVED' | 'REJECTED') => technicianApi.checkReport(String(report.id), status),
    onSuccess: () => onStatusChange(),
    onError: (error) => console.error('Error updating status:', error)
  })

  return (
    <div
      className={` 
        bg-white rounded-2xl border border-green-200 p-6 
        hover:shadow-lg hover:border-emerald-300 transition-all
        ${isPending ? 'ring-1 ring-lime-100' : ''}
        animate-fade-in-up
      `}
    >
      {/* Header */}
      <div className='flex items-center gap-4 mb-4 pb-4 border-b border-green-100'>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold
            ${isPending ? 'bg-emerald-100 text-emerald-600' : 'bg-green-100 text-green-500'}
          `}
        >
          {isPending ? 'NEW' : 'OK'}
        </div>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-emerald-900'>Report #{report.id}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${CHECK_TYPE_COLORS[report.checkType]}`}>
              {report.checkType === 'POST_USE' ? 'After use' : 'Before use'}
            </span>
          </div>
          <p className='text-xs text-green-500 mt-1'>{formatDate(report.createdAt)}</p>
        </div>
        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-full whitespace-nowrap ${STATUS_COLORS[report.status]}`}
        >
          {report.status === 'PENDING' ? 'Pending' : report.status === 'APPROVED' ? 'Approved' : 'Rejected'}
        </span>
      </div>

      {/* Metrics */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        <MetricCard label='Km' value={report.odometer} style={METRIC_STYLES.odometer} />
        <MetricCard label='Battery' value={`${report.batteryLevel}%`} style={METRIC_STYLES.battery} />
        <MetricCard label='Cleanliness' value={report.cleanliness ?? '—'} style={METRIC_STYLES.cleanliness} />
      </div>

      {/* Notes & Issues */}
      {(report.issues || report.notes) && (
        <div className='mb-4 space-y-2'>
          {report.issues && (
            <div className='bg-red-50 border-l-4 border-red-400 px-3 py-2 rounded-r text-sm'>
              <span className='font-bold text-red-700'>Issues:</span>
              <span className='ml-2 text-red-600'>{report.issues}</span>
            </div>
          )}
          {report.notes && (
            <div className='bg-green-50 border-l-4 border-green-400 px-3 py-2 rounded-r text-sm'>
              <span className='font-bold text-green-700'>Notes:</span>
              <span className='ml-2 text-green-600'>{report.notes}</span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {isPending && (
        <div className='flex gap-2 pt-4 border-t border-green-100'>
          <button
            onClick={() => checkReport('REJECTED')}
            disabled={isSubmitting}
            className='flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-2 border-red-300 hover:from-red-100 hover:to-red-200 hover:shadow-lg hover:shadow-red-500/10 disabled:opacity-50'
          >
            {isSubmitting ? 'Processing...' : 'Reject'}
          </button>
          <button
            onClick={() => checkReport('APPROVED')}
            disabled={isSubmitting}
            className='flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all bg-gradient-to-r from-emerald-600 to-lime-700 text-white hover:from-lime-700 hover:to-green-700 hover:shadow-lg hover:shadow-emerald-600/20 disabled:opacity-50'
          >
            {isSubmitting ? 'Processing...' : 'Approve'}
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
