import { type Status } from '../../CheckLicense'

function StatusBadge({ status }: { status: Status }) {
  const STATUS_CONFIG = {
    APPROVED: {
      color: 'green',
      label: 'Đã duyệt',
      icon: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
    },
    REJECTED: {
      color: 'red',
      label: 'Từ chối',
      icon: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
    },
    PENDING: {
      color: 'orange',
      label: 'Chờ duyệt',
      icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
    }
  }

  const { color, label, icon } = STATUS_CONFIG[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-${color}-100 rounded-full`}>
      <svg className={`w-4 h-4 text-${color}-600`} fill='currentColor' viewBox='0 0 20 20'>
        <path fillRule='evenodd' d={icon} clipRule='evenodd' />
      </svg>
      <span className={`text-sm font-semibold text-${color}-700`}>{label}</span>
    </span>
  )
}

export default StatusBadge
