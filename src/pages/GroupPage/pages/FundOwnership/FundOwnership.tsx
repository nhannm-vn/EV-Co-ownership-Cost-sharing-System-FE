import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import groupApi from '../../../../apis/group.api'
import type { FundDepositHistoryRow } from '../../../../types/api/group.type'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  DollarOutlined,
  FundOutlined,
  TagOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'

// ============ INTERFACES ============

// ============ HEADER COMPONENT ============
const FundHeader: React.FC = () => {
  return (
    <header className='bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 shadow-2xl rounded-2xl overflow-hidden'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-white mb-1'>Quỹ Chung Nhóm và tiền cọc </h1>
            <p className='text-green-50 text-xs'>Quản lý tài chính hiệu quả</p>
          </div>
        </div>
      </div>
    </header>
  )
}

// ============ FUND SUMMARY CARD COMPONENT ============
interface FundSummaryCardProps {
  totalFund: number
  totalIncome: number
  totalExpense: number
  depositAmount: number
  onContribute: () => void
}

const FundSummaryCard: React.FC<FundSummaryCardProps> = ({
  totalFund,
  totalIncome,
  totalExpense,
  depositAmount,
  onContribute
}) => {
  return (
    <div className='space-y-4'>
      {/* Mô tả Business Rule */}
      <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500'>
        <div className='flex items-start gap-3'>
          <div>
            <h3 className='font-bold text-blue-700 text-sm mb-1'>Về Quỹ Chung Nhóm và Tiền Cọc</h3>
            <p className='text-gray-700 text-xs leading-relaxed'>
              Quỹ chung được sử dụng để thanh toán các chi phí định kỳ như bảo dưỡng xe, sửa chữa, và các chi phí vận
              hành khác của nhóm. Khi có phát sinh chi phí, số tiền sẽ được tự động trừ từ quỹ chung.
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Card Tổng Quỹ */}
        <div
          className='bg-gradient-to-br from-blue-50 to-sky-50 shadow-lg p-5 border border-blue-100 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
'
        >
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold'>Tổng Quỹ Hiện Tại</h2>
          </div>
          <p className='text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>
            {totalFund.toLocaleString('vi-VN')}đ
          </p>
          <button
            onClick={onContribute}
            className='w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-3 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Đóng Quỹ
          </button>
        </div>

        {/* ✅ THÊM: Card Tiền Cọc */}
        <div className='bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:shadow-xl rounded-xl shadow-lg p-5 transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-white font-semibold'>Tiền Cọc Đảm Bảo</h2>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-white'>
            {depositAmount.toLocaleString('vi-VN')}đ
          </p>
          <p className='text-xl text-white mt-2'>Tiền cọc đã đóng ban đầu</p>
        </div>

        {/* Card Tổng Thu */}
        <div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-5 border border-blue-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold flex items-center gap-1'>
              <span className='text-sm'>↑</span> Tổng Thu của tiền quỹ và tiền cọc Đảm Bảo
            </h2>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
            +{totalIncome.toLocaleString('vi-VN')}đ
          </p>
          <p className='text-xl text-gray-600 mt-2'>Từ thành viên đóng góp</p>
        </div>

        {/* Card Tổng Chi */}
        <div className='bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg p-5 border border-red-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold flex items-center gap-1'>
              <span className='text-xl'>↓</span> Tổng Chi của tiền quỹ và tiền cọc đảm bảo
            </h2>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
            -{totalExpense.toLocaleString('vi-VN')}đ
          </p>
          <p className='text-xl text-gray-600 mt-2'>Bảo trì & chi phí khác</p>
        </div>
      </div>
    </div>
  )
}

function TransactionHistory({ transactions }: { transactions: FundDepositHistoryRow[] }) {
  return (
    <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200'>
      {/* Header */}
      <div className='px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500'>
        <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
          <UnorderedListOutlined className='text-white' style={{ fontSize: '24px' }} />
          Lịch Sử Giao Dịch
        </h2>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200'>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <TagOutlined className='mr-2' />
                ID
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <ArrowUpOutlined className='mr-2' />
                Loại
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <FundOutlined className='mr-2' />
                Loại Tiền
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <UserOutlined className='mr-2' />
                Người Dùng
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Chức vụ</th>

              <th className='pr-10text-right text-xs font-bold text-gray-700 uppercase tracking-wider '>
                <DollarOutlined className='mr-2' />
                Số Tiền
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <CalendarOutlined className='mr-2' />
                Ngày
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {transactions.map((trans, index) => (
              <tr
                key={`${trans.fundId}-${index}`}
                className='hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300'
              >
                {/* Fund ID */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='text-sm font-semibold text-gray-900'>
                    <TagOutlined className='mr-1 text-gray-500' />#{trans.fundId}
                  </span>
                </td>

                {/* Direction */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                      trans.direction === 'IN'
                        ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 ring-1 ring-emerald-200'
                        : 'bg-gradient-to-r from-rose-100 to-red-100 text-rose-700 ring-1 ring-rose-200'
                    }`}
                  >
                    {trans.direction === 'IN' ? (
                      <ArrowUpOutlined style={{ fontSize: '14px' }} />
                    ) : (
                      <ArrowDownOutlined style={{ fontSize: '14px' }} />
                    )}
                    {trans.direction === 'IN' ? 'Thu' : 'Chi'}
                  </span>
                </td>

                {/* Fund Type */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-200'>
                    <FundOutlined style={{ fontSize: '12px' }} />
                    {trans.fundType == 'DEPOSIT_RESERVE' ? 'Security Deposit' : 'Fund Contribution'}
                  </span>
                </td>

                {/* User */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-3'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      <div className='h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg ring-2 ring-white'>
                        <UserOutlined className='text-white' style={{ fontSize: '16px' }} />
                      </div>
                    </div>
                    <span className='text-sm font-medium text-gray-900'>{trans.title}</span>
                  </div>
                </td>

                {/* Subtitle */}
                <td className='px-6 py-4'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700'>
                    {trans.subtitle}
                  </span>
                </td>

                {/* Amount */}
                <td className='px-6 py-4 whitespace-nowrap text-right'>
                  <div
                    className={`inline-flex items-center gap-1 text-base font-bold ${
                      trans.direction === 'IN' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    <DollarOutlined style={{ fontSize: '14px' }} />
                    {trans.direction === 'IN' ? '+' : '-'}
                    {trans.amount.toLocaleString('vi-VN')}
                    <span className='text-xs ml-0.5'>đ</span>
                  </div>
                </td>

                {/* Date */}
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-1 text-sm text-gray-900'>
                    <CalendarOutlined className='text-gray-500' style={{ fontSize: '12px' }} />
                    {new Date(trans.occurredAt).toLocaleDateString('vi-VN')}
                  </div>
                  <div className='text-xs text-gray-500 ml-4'>
                    {new Date(trans.occurredAt).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-600 flex items-center gap-2'>
            <UnorderedListOutlined className='text-gray-500' />
            Tổng: <span className='font-semibold'>{transactions.length}</span> giao dịch
          </span>
        </div>
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

// ============ MAIN COMPONENT ============
export default function FundOwnership() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalFund, setTotalFund] = useState(0)
  const { groupId } = useParams<{ groupId: string }>()
  console.log(groupId)

  // call API
  const fundSummaryQuery = useQuery({
    queryKey: ['fundSummary', groupId],
    queryFn: () => groupApi.showDepositAndFundHistory(groupId as string)
  })

  console.log(fundSummaryQuery?.data?.data)

  // Tính tổng thu và chi từ transactions (trong thực tế sẽ lấy từ API)
  const totalFundData = fundSummaryQuery?.data?.data?.operatingBalance
  useEffect(() => {
    if (totalFundData !== undefined) {
      setTotalFund(totalFundData)
    }
  }, [totalFundData])
  const totalIncome = fundSummaryQuery?.data?.data?.totalIn
  const totalExpense = fundSummaryQuery?.data?.data?.totalOut
  const depositAmount = fundSummaryQuery?.data?.data?.depositBalance

  return (
    <div className='min-h-screen overflow-auto'>
      <div className='max-w-7xl mx-auto h-full p-4 mt-7'>
        <div className='bg-white/95 backdrop-blur-lg rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] p-5 space-y-4'>
          <FundHeader />

          <FundSummaryCard
            totalFund={totalFund ?? 0}
            totalIncome={totalIncome ?? 0}
            totalExpense={totalExpense ?? 0}
            depositAmount={depositAmount ?? 0}
            onContribute={() => setIsModalOpen(true)}
          />

          <TransactionHistory transactions={fundSummaryQuery?.data?.data?.rows ?? []} />
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
