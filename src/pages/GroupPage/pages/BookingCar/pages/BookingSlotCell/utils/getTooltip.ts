const getTooltip = ({ type, bookedBy }: { type: string; bookedBy: string | null }) => {
  switch (type) {
    case 'AVAILABLE':
      return 'Chỗ trống, bạn có thể đặt'
    case 'BOOKED_SELF':
      return 'Bạn đã đặt slot này, click để hủy'
    case 'BOOKED_OTHER':
      return bookedBy ? `Đã được đặt bởi ${bookedBy}` : 'Đã được đặt'
    case 'MAINTENANCE':
      return 'Đang bảo trì, không thể đặt'
    default:
      return ''
  }
}

export default getTooltip
