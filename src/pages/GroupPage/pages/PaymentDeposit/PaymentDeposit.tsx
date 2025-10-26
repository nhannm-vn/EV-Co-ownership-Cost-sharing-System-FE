import { useState } from 'react'

// Constants để tránh typo
const STATUS = {
  PAID: 'Đã đóng',
  UNPAID: 'Chưa đóng'
}

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'user1@example.com',
    ownership: 25,
    amount: 5000000,
    status: 'Chưa đóng',
    joinDate: '1/1/2024',
    phone: '0901234567',
    paymentHistory: []
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'user2@example.com',
    ownership: 30,
    amount: 6000000,
    status: 'Đã đóng',
    joinDate: '2/1/2024',
    phone: '0902345678',
    paymentHistory: [{ date: '10/12/2024', amount: 6000000, method: 'Chuyển khoản', note: 'Đợt 1' }]
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'user3@example.com',
    ownership: 20,
    amount: 4000000,
    status: 'Đã đóng',
    joinDate: '3/1/2024',
    phone: '0903456789',
    paymentHistory: [{ date: '12/12/2024', amount: 4000000, method: 'Tiền mặt', note: 'Đợt 1' }]
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'user4@example.com',
    ownership: 25,
    amount: 5000000,
    status: 'Chưa đóng',
    joinDate: '4/1/2024',
    phone: '0904567890',
    paymentHistory: []
  }
]

const STAT_CONFIG = [
  { key: 'total', label: 'Tổng thành viên', color: 'blue' },
  { key: 'paid', label: 'Đã đóng', color: 'green' },
  { key: 'unpaid', label: 'Chưa đóng', color: 'amber' },
  { key: 'rate', label: 'Tỷ lệ hoàn thành', color: 'cyan', isPercent: true }
]

function PaymentDeposit() {
  const currentUserId = 1
  const [members, setMembers] = useState(INITIAL_MEMBERS)
  const [showPayment, setShowPayment] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [createForm, setCreateForm] = useState({ amount: '', deadline: '', description: '' })

  // Tính stats
  const total = members.length
  const paid = members.filter((m) => m.status === STATUS.PAID).length
  const unpaid = total - paid
  const rate = total > 0 ? Math.round((paid / total) * 100) : 0

  // Helper functions
  const formatMoney = (num) => {
    if (!num || isNaN(num)) return '0 ₫'
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num)
  }

  const getStatValue = (key: any) => {
    const values = { total, paid, unpaid, rate }
    return values[key] || 0
  }

  const openDetail = (member) => {
    setSelectedMember(member)
    setShowDetail(true)
  }

  const closeDetail = () => {
    setSelectedMember(null)
    setShowDetail(false)
  }

  // Handlers
  const handlePayment = () => {
    const amount = parseFloat(paymentAmount)
    if (!amount || amount <= 0 || isNaN(amount)) {
      alert('Vui lòng nhập số tiền hợp lệ')
      return
    }

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== currentUserId) return m
        return {
          ...m,
          status: STATUS.PAID,
          amount,
          paymentHistory: [
            ...m.paymentHistory,
            {
              date: new Date().toLocaleDateString('vi-VN'),
              amount,
              method: 'Chuyển khoản',
              note: `Đợt ${m.paymentHistory.length + 1}`
            }
          ]
        }
      })
    )

    setShowPayment(false)
    setPaymentAmount('')
    alert('Thanh toán thành công!')
  }

  const handleCreate = () => {
    const amount = parseFloat(createForm.amount)
    if (!amount || !createForm.deadline || isNaN(amount)) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }

    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        status: STATUS.UNPAID,
        amount: amount * (m.ownership / 100)
      }))
    )

    setShowCreate(false)
    setCreateForm({ amount: '', deadline: '', description: '' })
    alert('Tạo khoản nộp thành công!')
  }

  const currentUser = members.find((m) => m.id === currentUserId)
  const canPay = currentUser && currentUser.status === STATUS.UNPAID

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
      green: 'bg-gradient-to-br from-green-500 to-green-600',
      amber: 'bg-gradient-to-br from-amber-500 to-amber-600',
      cyan: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6 my-10 rounded-3xl'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-3'>
            <div className='bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-gray-800'>Trang thái tiền cọc nhóm</h1>
          </div>

          <div className='flex gap-3'>
            <button className='bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2'>
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Làm mới
            </button>

            <button
              onClick={() => setShowCreate(true)}
              className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
              </svg>
              Tạo khoản nộp
            </button>

            {canPay && (
              <button
                onClick={() => setShowPayment(true)}
                className='bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Thanh toán
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {STAT_CONFIG.map(({ key, label, color, isPercent }) => (
            <div key={key} className={`${getColorClasses(color)} rounded-2xl p-6 shadow-xl`}>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-white/80 text-sm font-medium mb-2'>{label}</p>
                  <p className='text-4xl font-bold text-white'>
                    {getStatValue(key)}
                    {isPercent ? '%' : ''}
                  </p>
                </div>
                <div className='bg-white/20 p-4 rounded-xl'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className='bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-100'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Tiến độ đóng tiền cọc</h3>
          <div className='relative w-full h-6 bg-gray-100 rounded-full overflow-hidden'>
            <div
              className='absolute h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center transition-all duration-500'
              style={{ width: `${rate}%` }}
            >
              <span className='text-white text-xs font-bold'>{rate}% hoàn thành</span>
            </div>
          </div>
          <p className='text-sm text-gray-600 mt-2'>
            {paid}/{total} thành viên đã đóng tiền cọc
          </p>
        </div>

        {/* Table */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
          <div className='p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white'>
            <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h7' />
              </svg>
              Danh sách thành viên
            </h2>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-100'>
                <tr>
                  {['Thành viên', 'Email', 'Tỷ lệ', 'Số tiền', 'Trạng thái', 'Ngày tham gia', 'Chi tiết'].map((h) => (
                    <th key={h} className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {members.map((m) => (
                  <tr key={m.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md'>
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className='font-semibold text-gray-800'>{m.name}</p>
                          <p className='text-xs text-gray-500'>ID: {m.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>{m.email}</td>
                    <td className='px-6 py-4'>
                      <span className='bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-semibold border border-cyan-200'>
                        {m.ownership}%
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-blue-600 font-bold'>{formatMoney(m.amount)}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${
                          m.status === STATUS.PAID
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d={
                              m.status === STATUS.PAID
                                ? 'M5 13l4 4L19 7'
                                : 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            }
                          />
                        </svg>
                        {m.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>{m.joinDate}</td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => openDetail(m)}
                        className='text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all'
                      >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Chi tiết */}
      {showDetail && selectedMember && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
          onClick={closeDetail}
        >
          <div
            className='bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between mb-6 pb-6 border-b'>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg'>
                  {selectedMember.name.charAt(0)}
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-800'>{selectedMember.name}</h3>
                  <p className='text-gray-500'>ID: {selectedMember.id}</p>
                </div>
              </div>
              <button
                onClick={closeDetail}
                className='text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-6'>
              {[
                ['Email', selectedMember.email],
                ['SĐT', selectedMember.phone],
                ['Tỷ lệ', `${selectedMember.ownership}%`],
                ['Ngày tham gia', selectedMember.joinDate]
              ].map(([k, v]) => (
                <div key={k} className='bg-gray-50 rounded-xl p-4'>
                  <p className='text-sm text-gray-600 mb-1'>{k}</p>
                  <p className='font-semibold text-gray-800'>{v}</p>
                </div>
              ))}
            </div>

            <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100'>
              <h4 className='font-semibold text-gray-800 mb-3'>Trạng thái hiện tại</h4>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Số tiền cần nộp</p>
                  <p className='text-2xl font-bold text-blue-600'>{formatMoney(selectedMember.amount)}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border ${
                    selectedMember.status === STATUS.PAID
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : 'bg-amber-100 text-amber-700 border-amber-200'
                  }`}
                >
                  {selectedMember.status}
                </span>
              </div>
            </div>

            <div>
              <h4 className='font-semibold text-gray-800 mb-4'>Lịch sử thanh toán</h4>
              {selectedMember.paymentHistory && selectedMember.paymentHistory.length > 0 ? (
                <div className='space-y-3'>
                  {selectedMember.paymentHistory.map((p, i) => (
                    <div key={i} className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='font-semibold text-gray-800'>{p.note}</span>
                        <span className='text-sm text-gray-500'>{p.date}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-sm text-gray-600'>{p.method}</span>
                        <span className='font-bold text-green-600'>{formatMoney(p.amount)}</span>
                      </div>
                    </div>
                  ))}
                  <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200'>
                    <div className='flex items-center justify-between'>
                      <span className='font-semibold text-gray-800'>Tổng đã thanh toán</span>
                      <span className='text-xl font-bold text-green-600'>
                        {formatMoney(selectedMember.paymentHistory.reduce((s, p) => s + (p.amount || 0), 0))}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-center py-12'>
                  <svg
                    className='w-16 h-16 text-gray-300 mx-auto mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                  <p className='text-gray-500'>Chưa có lịch sử thanh toán</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Tạo khoản nộp */}
      {showCreate && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
          onClick={() => setShowCreate(false)}
        >
          <div className='bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Tạo khoản nộp mới</h3>
            <div className='space-y-4 mb-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Tổng số tiền (VNĐ)</label>
                <input
                  type='number'
                  value={createForm.amount}
                  onChange={(e) => setCreateForm({ ...createForm, amount: e.target.value })}
                  placeholder='20000000'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all'
                />
                <p className='text-xs text-gray-500 mt-1'>Chia theo tỷ lệ sở hữu</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Hạn nộp</label>
                <input
                  type='date'
                  value={createForm.deadline}
                  onChange={(e) => setCreateForm({ ...createForm, deadline: e.target.value })}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Mô tả</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  placeholder='Mục đích...'
                  rows='3'
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowCreate(false)}
                className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all'
              >
                Hủy
              </button>
              <button
                onClick={handleCreate}
                className='flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all'
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thanh toán */}
      {showPayment && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
          onClick={() => setShowPayment(false)}
        >
          <div className='bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-2xl font-bold text-gray-800 mb-6'>Thanh toán tiền cọc</h3>
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Số tiền (VNĐ)</label>
              <input
                type='number'
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder={formatMoney(currentUser?.amount || 0)}
                className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all'
                autoFocus
              />
              <p className='text-xs text-gray-500 mt-1'>Đề xuất: {formatMoney(currentUser?.amount || 0)}</p>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setShowPayment(false)}
                className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all'
              >
                Hủy
              </button>
              <button
                onClick={handlePayment}
                className='flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/30 transition-all'
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentDeposit
