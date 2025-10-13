export const notifications = [
  {
    id: 1,
    message: 'Có chuyến đi mới được đăng',
    // lấy hiện tại trừ 5 phút trước
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 phút trước
    isRead: false
  },
  {
    id: 2,
    message: 'Yêu cầu chia sẻ chi phí đã được chấp nhận',
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 phút trước
    isRead: false
  },
  {
    id: 3,
    message: 'Thanh toán chi phí đã hoàn thành',
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 phút trước
    isRead: false
  },
  {
    id: 4,
    message: 'Người dùng mới tham gia nhóm chia sẻ',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 giờ trước
    isRead: true
  },
  {
    id: 5,
    message: 'Xe điện đã sẵn sàng cho chuyến đi',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 giờ trước
    isRead: true
  },
  {
    id: 6,
    message: 'Thanh toán định kỳ sắp đến hạn',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 ngày trước
    isRead: true
  },
  {
    id: 7,
    message: 'Báo cáo chi phí tháng đã sẵn sàng',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 ngày trước
    isRead: true
  },
  {
    id: 8,
    message: 'Có cập nhật mới về lịch trình',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 tuần trước
    isRead: true
  }
]
