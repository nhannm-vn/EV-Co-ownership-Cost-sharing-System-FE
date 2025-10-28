// Cấu trúc Type (giữ nguyên)
type Member = {
  id: string
  name: string
  quotaTotal: number
  quotaUsed: number
  color: string
}

type Booking = {
  memberId: string
  memberName: string
  date: Date | string
  startTime: string
  endTime: string
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const CURRENT_USER_ID = '1' // Giả định User hiện tại là Anh Tuấn

// Định nghĩa các Khung giờ Cố định (HÀNG của bảng)
const TIME_SLOTS = [
  { start: '08:00', end: '12:00', name: 'Sáng' },
  { start: '13:00', end: '17:00', name: 'Chiều' },
  { start: '18:00', end: '22:00', name: 'Tối' }
]

function getDayString(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const dayIndex = d.getDay() === 0 ? 6 : d.getDay() - 1
  return daysOfWeek[dayIndex]
}

export default function BookingCar() {
  const members: Member[] = [
    { id: '1', name: 'Anh Tuấn', quotaTotal: 5, quotaUsed: 0, color: '#0D9488' }, // Tăng quota để dễ test
    { id: '2', name: 'Chị Minh', quotaTotal: 4, quotaUsed: 0, color: '#4F46E5' },
    { id: '3', name: 'Bạn Hùng', quotaTotal: 2, quotaUsed: 0, color: '#CA8A04' }
  ]

  // Dữ liệu mẫu (sử dụng khung giờ cố định)
  const bookings: Booking[] = [
    // Anh Tuấn: 2 lần đặt (Mon Sáng, Wed Sáng) -> Còn 3 lần
    { memberId: '1', memberName: 'Anh Tuấn', date: '2025-10-27', startTime: '08:00', endTime: '12:00' }, // Mon Sáng
    { memberId: '1', memberName: 'Anh Tuấn', date: '2025-10-29', startTime: '08:00', endTime: '12:00' }, // Wed Sáng

    // Chị Minh: 2 lần đặt
    { memberId: '2', memberName: 'Chị Minh', date: '2025-10-28', startTime: '13:00', endTime: '17:00' }, // Tue Chiều
    { memberId: '2', memberName: 'Chị Minh', date: '2025-11-01', startTime: '18:00', endTime: '22:00' }, // Sat Tối

    // Bạn Hùng: 1 lần đặt
    { memberId: '3', memberName: 'Bạn Hùng', date: '2025-10-31', startTime: '13:00', endTime: '17:00' }, // Fri Chiều

    // Mon Chiều: Đặt bởi người khác
    { memberId: '2', memberName: 'Chị Minh', date: '2025-10-27', startTime: '13:00', endTime: '17:00' }
  ]

  // Logic tìm kiếm booking theo Ngày VÀ Khung giờ cố định (Đảm bảo chỉ có 1 booking/ô)
  const getBookingByDayAndSlot = (day: string, slot: { start: string; end: string }) => {
    return bookings.find((b) => getDayString(b.date) === day && b.startTime === slot.start && b.endTime === slot.end)
  }

  // Tính Quota dựa trên số lần đặt (mỗi khung giờ là 1 lần)
  const currentUser = members.find((m) => m.id === CURRENT_USER_ID)!
  const usedBookings = bookings.filter((b) => b.memberId === CURRENT_USER_ID).length
  const quotaRemaining = currentUser.quotaTotal - usedBookings

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-8'>
      <div className='bg-white rounded-2xl shadow-2xl overflow-hidden max-w-7xl w-full border border-gray-200'>
        <div className='bg-white p-6 border-b border-gray-100'>
          <h2 className='text-3xl font-extrabold text-gray-800 text-center flex items-center justify-center'>
            <svg
              className='w-8 h-8 mr-3 text-teal-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              ></path>
            </svg>
            Lịch Đặt Xe Tuần Này (Khung giờ cố định)
          </h2>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 w-[150px]'>
                  Khung giờ
                </th>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    className='px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500'
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {/* Lặp qua Khung giờ (Tạo Hàng) */}
              {TIME_SLOTS.map((slot, slotIndex) => (
                <tr
                  key={slot.start}
                  className={`${slotIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-150 ease-in-out`}
                >
                  {/* Cột Khung giờ */}
                  <td className='px-6 py-3 font-semibold text-gray-700 whitespace-nowrap border-r border-gray-100'>
                    {slot.name} <br />
                    <span className='text-xs font-normal text-gray-500'>
                      {slot.start} - {slot.end}
                    </span>
                  </td>

                  {/* Lặp qua các Ngày (Tạo Cột) */}
                  {daysOfWeek.map((day) => {
                    // Tìm booking cho Khung giờ và Ngày này
                    const booked = getBookingByDayAndSlot(day, slot)
                    const isBooked = !!booked

                    // Kiểm tra khả năng đặt
                    const canBookSlot = quotaRemaining > 0

                    if (isBooked) {
                      // Nếu ô đã được đặt: HIỂN THỊ TÊN VÀ KHÔNG CHO BẤM
                      const isMine = booked.memberId === CURRENT_USER_ID
                      const bookingMember = members.find((m) => m.id === booked.memberId) || members[0]

                      return (
                        <td key={day} className='px-4 py-3 text-center'>
                          <div
                            className={`
                                px-3 py-2 rounded-xl text-sm font-medium cursor-not-allowed w-full h-full
                                ${isMine ? 'bg-opacity-15 border-2 shadow-sm' : 'bg-gray-100 text-gray-600'}
                            `}
                            style={
                              isMine
                                ? {
                                    backgroundColor: `${bookingMember.color}25`,
                                    borderColor: bookingMember.color,
                                    color: bookingMember.color
                                  }
                                : { color: bookingMember.color }
                            }
                            title={`Đã đặt: ${booked.memberName}`}
                          >
                            <span className={`font-bold text-sm`}>{isMine ? '✓ Bạn' : booked.memberName}</span>
                          </div>
                        </td>
                      )
                    }

                    // Nếu ô trống (chưa ai đặt): HIỂN THỊ + (khi hover hiện ĐẶT)
                    return (
                      <td key={day} className='px-4 py-3 text-center'>
                        <button
                          className={`
                                  px-3 py-2 rounded-xl text-sm font-medium w-full group transition duration-200 h-full
                                  ${
                                    canBookSlot
                                      ? 'text-gray-400 border border-dashed border-gray-300 hover:bg-teal-500 hover:text-white hover:border-teal-500'
                                      : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-dashed border-gray-200'
                                  }
                                `}
                          disabled={!canBookSlot}
                          title={canBookSlot ? 'Nhấn để đặt khung giờ này' : 'Bạn đã dùng hết quota cho tuần này'}
                        >
                          <span className={`text-lg ${canBookSlot ? 'group-hover:hidden' : ''}`}>+</span>
                          {canBookSlot && <span className='hidden group-hover:inline-block font-bold'>Đặt</span>}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
            {/* Phần Quota chỉ dành cho user hiện tại */}
            <tfoot>
              <tr className='bg-gray-100 border-t border-gray-300'>
                <td colSpan={daysOfWeek.length + 1} className='px-6 py-4 text-right font-bold text-gray-700'>
                  Quota của Bạn ({currentUser.name}):
                </td>
                <td className='px-6 py-4 text-center'>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider
                              ${quotaRemaining > 0 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}
                            `}
                  >
                    {usedBookings}/{currentUser.quotaTotal} lần đặt
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
