const convertIsoString = ({ date, time }: { date: string; time: string }) => {
  const [startTime, endTime] = time.split('-')

  // Chỉ đơn giản là nối chuỗi lại theo định dạng YYYY-MM-DDTHH:mm:ss
  // (Đây là giờ local mà bạn hiển thị trên lịch)

  const startDateTime = `${date}T${startTime}:00`
  const endDateTime = `${date}T${endTime}:00`

  return {
    startDateTime, // Ví dụ: '2025-11-02T08:00:00'
    endDateTime // Ví dụ: '2025-11-02T11:00:00'
  }
}

export default convertIsoString
