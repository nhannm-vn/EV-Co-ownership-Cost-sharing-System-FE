// file chứa các hàm tiện ích
export const formatVnTime = (time: string) => {
  const date = new Date(time)
  const formatted = date.toLocaleDateString('vi-VN')
  return formatted
}
