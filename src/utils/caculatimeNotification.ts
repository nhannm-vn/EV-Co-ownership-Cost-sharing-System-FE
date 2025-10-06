// hàm này giúp hiển thị các dòng như 5 phút trước , 2  giờ trước
const formatTimeAgo = (createdAt: Date) => {
  // lấy thời gian hiện tại
  const now = new Date()
  // diffInMinute là số phút đã trôi qua thời điểm kể từ khi tạo
  // lấy số mili giây hiện tại trừ đi mili giây tạo chia cho 1000 * 60 để đổi ra phút
  const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) {
    return 'Vừa xong'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`
    // 1440 phút là 24  giờ
  } else if (diffInMinutes < 1440) {
    // < 24 hours
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} giờ trước`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} ngày trước`
  }
}

export default formatTimeAgo
