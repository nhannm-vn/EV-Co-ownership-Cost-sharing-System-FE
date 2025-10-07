export const getStatusStyle = (status: string) => {
  type StatusType = 'active' | 'pending' | 'reject'
  // chuẩn hóa tránh lỗi do viết hoa
  const normalizedStatus = status.toLowerCase() as StatusType
  const styles = {
    active: {
      bg: 'bg-green-500/20',
      border: 'border-green-400/50',
      text: 'text-green-300',
      label: 'ACTIVE'
    },
    pending: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-400/50',
      text: 'text-yellow-300',
      label: 'PENDING'
    },
    reject: {
      bg: 'bg-red-500/20',
      border: 'border-red-400/50',
      text: 'text-red-300',
      label: 'REJECTED'
    }
  }
  return styles[normalizedStatus] || styles.pending
}
