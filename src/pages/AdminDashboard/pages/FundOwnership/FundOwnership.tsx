import { useState } from 'react'

interface Contribution {
  id: string
  memberName: string
  amount: number
  date: string
  isAdmin: boolean
  isPaid: boolean // Thêm trạng thái đã đóng hay chưa
}
// ============ HEADER COMPONENT ============
const FundHeader: React.FC = () => {
  return (
    <header className='bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-2xl rounded-2xl overflow-hidden'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-white mb-1'>Quỹ Chung Nhóm</h1>
            <p className='text-green-50 text-xs'>Quản lý tài chính hiệu quả</p>
          </div>
          <div className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg'>
            <span className='text-white text-xs font-semibold'>🚗 VinFast VF8 Plus</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// ============ FUND SUMMARY CARD COMPONENT ============
interface FundSummaryCardProps {
  totalFund: number
  onContribute: () => void
}

const FundSummaryCard: React.FC<FundSummaryCardProps> = ({ totalFund, onContribute }) => {
  const isLowBalance = totalFund < 5000000

  return (
    <div className='space-y-4'>
      {/* Mô tả Business Rule */}
      <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500'>
        <div className='flex items-start gap-3'>
          <div className='bg-blue-100 p-2 rounded-full flex-shrink-0'>
            <span className='text-xl'>ℹ️</span>
          </div>
          <div>
            <h3 className='font-bold text-blue-700 text-sm mb-1'>Về Quỹ Chung Nhóm</h3>
            <p className='text-gray-700 text-xs leading-relaxed'>
              Quỹ chung được sử dụng để thanh toán các chi phí định kỳ như bảo dưỡng xe, sửa chữa, và các chi phí vận
              hành khác của nhóm. Khi có phát sinh chi phí, số tiền sẽ được tự động trừ từ quỹ chung.
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Card Tổng Quỹ */}
        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-5 border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold'>Tổng Quỹ Hiện Tại</h2>
            <span className='text-2xl'>💰</span>
          </div>
          <p className='text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
            {totalFund.toLocaleString('vi-VN')}đ
          </p>
          <button
            onClick={onContribute}
            className='w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 py-3 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Đóng Quỹ
          </button>
        </div>

        {/* Card Cảnh Báo */}
        {isLowBalance && (
          <div className='bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-lg p-4 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300'>
            <div className='flex items-start space-x-3'>
              <div className='bg-orange-100 p-2 rounded-full'>
                <span className='text-2xl'>⚠️</span>
              </div>
              <div>
                <h3 className='font-bold text-orange-600 text-base mb-1'>Số Dư Quỹ Thấp</h3>
                <p className='text-gray-700 text-xs leading-relaxed'>
                  Quỹ hiện tại thấp hơn mức khuyến nghị. Vui lòng đóng thêm để duy trì hoạt động nhóm.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ContributionHistory: React.FC = () => {
  const contributions: Contribution[] = [
    { id: '1', memberName: 'Nguyễn Văn A', amount: 2000000, date: '2025-11-05', isAdmin: true, isPaid: true },
    { id: '2', memberName: 'Trần Thị B', amount: 1500000, date: '2025-11-04', isAdmin: false, isPaid: true },
    { id: '3', memberName: 'Lê Văn C', amount: 2000000, date: '2025-11-03', isAdmin: false, isPaid: false },
    { id: '4', memberName: 'Phạm Thị D', amount: 1800000, date: '2025-11-02', isAdmin: false, isPaid: true },
    { id: '5', memberName: 'Hoàng Văn E', amount: 2200000, date: '2025-11-01', isAdmin: false, isPaid: false }
  ]

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
      <div className='px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500'>
        <h2 className='text-xl font-bold text-white flex items-center gap-2'>
          <span>📋</span> Lịch Sử Đóng Quỹ
        </h2>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 py-3 text-left text-xs font-bold text-gray-700'>Thành Viên</th>
              <th className='px-4 py-3 text-left text-xs font-bold text-gray-700'>Số Tiền</th>
              <th className='px-4 py-3 text-left text-xs font-bold text-gray-700'>Ngày Đóng</th>
              <th className='px-4 py-3 text-left text-xs font-bold text-gray-700'>Trạng Thái</th>
              <th className='px-4 py-3 text-left text-xs font-bold text-gray-700'>Vai Trò</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 bg-white'>
            {contributions.map((contrib, index) => (
              <tr
                key={contrib.id}
                className='hover:bg-blue-50 transition-all duration-200'
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className='px-4 py-3'>
                  <div className='flex items-center space-x-2'>
                    <div
                      className='w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md'
                      style={{
                        background: contrib.isAdmin
                          ? 'linear-gradient(135deg, #CE93D8 0%, #AB47BC 100%)'
                          : 'linear-gradient(135deg, #039BE5 0%, #0277BD 100%)'
                      }}
                    >
                      {contrib.memberName.charAt(0)}
                    </div>
                    <span className='font-semibold text-gray-800 text-sm'>{contrib.memberName}</span>
                  </div>
                </td>
                <td className='px-4 py-3 font-bold text-green-600 text-base'>
                  +{contrib.amount.toLocaleString('vi-VN')}đ
                </td>
                <td className='px-4 py-3 text-gray-600 text-sm'>
                  {new Date(contrib.date).toLocaleDateString('vi-VN')}
                </td>
                <td className='px-4 py-3'>
                  <span
                    className='px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 shadow-sm'
                    style={{
                      background: contrib.isPaid
                        ? 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
                        : 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
                      color: contrib.isPaid ? '#2E7D32' : '#C62828'
                    }}
                  >
                    <span className='text-sm'>{contrib.isPaid ? '✓' : '⏱'}</span>
                    {contrib.isPaid ? 'Đã Đóng' : 'Chưa Đóng'}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <span
                    className='px-3 py-1 rounded-full text-xs font-bold text-white shadow-md'
                    style={{
                      background: contrib.isAdmin
                        ? 'linear-gradient(135deg, #CE93D8 0%, #AB47BC 100%)'
                        : 'linear-gradient(135deg, #039BE5 0%, #0277BD 100%)'
                    }}
                  >
                    {contrib.isAdmin ? '👑 Admin' : '👤 Thành viên'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============ CONTRIBUTE MODAL COMPONENT ============
interface ContributeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (amount: number) => void
}

const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<string>('')
  const [note, setNote] = useState<string>('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseInt(amount)
    if (numAmount > 0) {
      onSuccess(numAmount)
      setAmount('')
      setNote('')
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all'>
        <div className='px-6 py-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl'>
          <h3 className='text-2xl font-bold text-white flex items-center gap-2'>
            <span>💳</span> Đóng Quỹ Chung
          </h3>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Số Tiền (VNĐ) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all text-lg font-semibold'
              placeholder='Nhập số tiền'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>Ghi Chú (Tùy chọn)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all resize-none'
              rows={3}
              placeholder='Thêm ghi chú...'
            />
          </div>

          <div className='flex space-x-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all'
            >
              Huỷ
            </button>
            <button
              type='submit'
              className='flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              Xác Nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function FundOwnership() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalFund, setTotalFund] = useState(10000000)

  return (
    <div className='min-h-screen overflow-auto'>
      <div className='max-w-7xl mx-auto h-full p-4'>
        <div className='bg-white/95 backdrop-blur-lg rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] p-5 space-y-4'>
          <FundHeader />

          <FundSummaryCard totalFund={totalFund} onContribute={() => setIsModalOpen(true)} />

          <ContributionHistory />
        </div>
      </div>

      <ContributeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(amount) => {
          setTotalFund((prev) => prev + amount)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
