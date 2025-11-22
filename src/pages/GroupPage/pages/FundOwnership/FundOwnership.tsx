import { useMutation, useQuery } from '@tanstack/react-query'
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
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { toast } from 'react-toastify'
import { getGroupIdFromLS, getUserIdFromLS } from '../../../../utils/auth'
import Skeleton from '../../../../components/Skeleton'

// ============ HEADER COMPONENT ============
const FundHeader: React.FC = () => {
  return (
    <header className='bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 shadow-2xl rounded-2xl overflow-hidden'>
      <div className='px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-white mb-1'>Group Shared Fund & Security Deposit</h1>
            <p className='text-green-50 text-xs'>Manage group finances effectively</p>
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
      {/* Business Rule Description */}
      <div className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500'>
        <div className='flex items-start gap-3'>
          <div>
            <h3 className='font-bold text-blue-700 text-sm mb-1'>About the Group Shared Fund and Security Deposit</h3>
            <p className='text-gray-700 text-xs leading-relaxed'>
              The shared fund is used to pay regular expenses such as upgrade the car and other but except maintenance
              and checkout fail operational costs. When an expense occurs, the amount will automatically be deducted
              from the shared fund and and deposit
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Card Total Fund */}
        <div className='bg-gradient-to-br from-blue-50 to-sky-50 shadow-lg p-5 border border-blue-100 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold'>Current Total Fund</h2>
          </div>
          <p className='text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent'>
            {totalFund.toLocaleString('vi-VN')}đ
          </p>
          <button
            onClick={onContribute}
            className='w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-3 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
          >
            Contribute
          </button>
        </div>

        {/* Security Deposit Card */}
        <div className='bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:shadow-xl rounded-xl shadow-lg p-5 transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-white font-semibold'>Security Deposit</h2>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-400 bg-clip-text text-white'>
            {depositAmount.toLocaleString('vi-VN')}đ
          </p>
          <p className='text-xl text-white mt-2'>Initial deposited amount</p>
        </div>

        {/* Total Income Card */}
        <div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-5 border border-blue-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold flex items-center gap-1'>
              <span className='text-sm'>↑</span> Total Income from Fund & Deposit
            </h2>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
            +{totalIncome.toLocaleString('vi-VN')}đ
          </p>
          <p className='text-xl text-gray-600 mt-2'>From member contributions</p>
        </div>

        {/* Total Expense Card */}
        <div className='bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg p-5 border border-red-100 hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-sm text-gray-700 font-semibold flex items-center gap-1'>
              <span className='text-xl'>↓</span> Total Expenses from Fund & Deposit
            </h2>
          </div>
          <p className='text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
            -{totalExpense.toLocaleString('vi-VN')}đ
          </p>
          <p className='text-xl text-gray-600 mt-2'>Maintenance & other expenses</p>
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
          Transaction History
        </h2>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200'>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <ArrowUpOutlined className='mr-2' />
                Type
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <FundOutlined className='mr-2' />
                Fund Type
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <UserOutlined className='mr-2' />
                User
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>Role</th>
              <th className='pr-10 text-right text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <DollarOutlined className='mr-2' />
                Amount
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider'>
                <CalendarOutlined className='mr-2' />
                Date
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {transactions.map((trans, index) => (
              <tr
                key={`${trans.fundId}-${index}`}
                className='hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300'
              >
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
                    {trans.direction === 'IN' ? 'Income' : 'Expense'}
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
            Total: <span className='font-semibold'>{transactions.length}</span> transactions
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
  onSuccess: (amount: number, note: string) => void
}

const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const paymentFundMutation = useMutation({
    mutationFn: (data: { userId: string; groupId: string; amount: number; note: string }) => groupApi.paymentFund(data),
    onSuccess: (response) => {
      setAmount('')
      setNote('')
      onClose()
      window.open(`${response?.data?.vnpayUrl}`, '_blank')
    },
    onError: () => {
      toast.error('Contribution failed, please try again!')
    }
  })

  if (!isOpen) return null

  const formatNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (!cleaned) return ''
    return new Intl.NumberFormat('vi-VN').format(Number(cleaned))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(formatNumber(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numericValue = Number(amount.replace(/\./g, ''))
    const groupId = getGroupIdFromLS() || ''
    const userId = getUserIdFromLS() || ''

    if (numericValue < 10000) {
      toast.error('Minimum amount is 10,000 VND')
      return
    }
    if (numericValue > 100000000) {
      toast.error('Maximum amount is 100,000,000 VND')
      return
    }
    paymentFundMutation.mutate({
      userId,
      groupId,
      amount: numericValue,
      note
    })
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all'>
        <div className='px-6 py-5 bg-gradient-to-r from-blue-500 to-blue-500 rounded-t-2xl'>
          <h3 className='text-2xl font-bold text-white flex items-center gap-2'>Contribute to Shared Fund</h3>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Amount (VND) <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              inputMode='numeric'
              value={amount}
              onChange={handleAmountChange}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-lg font-semibold'
              placeholder='Enter amount'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Note <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all resize-none'
              rows={3}
              placeholder='Add a note...'
            />
          </div>

          <div className='flex space-x-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
            >
              Confirm
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

  const fundSummaryQuery = useQuery({
    queryKey: ['fundSummary', groupId],
    queryFn: () => groupApi.showDepositAndFundHistory(groupId as string)
  })

  const totalFundData = fundSummaryQuery?.data?.data?.operatingBalance
  useEffect(() => {
    if (totalFundData !== undefined) {
      setTotalFund(totalFundData)
    }
  }, [totalFundData])

  if (fundSummaryQuery.isLoading) {
    return <Skeleton />
  }

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
