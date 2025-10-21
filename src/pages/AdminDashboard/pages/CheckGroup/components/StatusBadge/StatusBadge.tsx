export default function StatusBadge({ status }: { status: 'PENDING' | 'ACTIVE' | 'INACTIVE' }) {
  const styles = {
    PENDING: 'bg-yellow-400 text-yellow-900 ring-2 ring-yellow-200',
    ACTIVE: 'bg-green-400 text-green-900 ring-2 ring-green-200',
    INACTIVE: 'bg-red-400 text-red-900 ring-2 ring-red-200'
  }

  const text = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
  }
  return (
    <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${styles[status]} shadow-sm`}>{text[status]}</span>
  )
}
