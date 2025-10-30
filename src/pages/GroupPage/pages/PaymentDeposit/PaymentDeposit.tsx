/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import groupApi from '../../../../apis/group.api'
import Skeleton from '../../../../components/Skeleton'
import { AppContext } from '../../../../contexts/app.context'
import type { DepositForGroup } from '../../../../types/api/group.type'
import { formatToVND } from '../../../../utils/formatPrice'
import ModalCreateDeposit from './components/ModalCreateDeposit'
import ProgressBar from './components/ProgressBar'

function PaymentDeposit() {
  const { groupId } = useParams<{ groupId: string }>()

  const { userId } = useContext(AppContext)

  // Lấy thông tin của toàn bộ nhóm để hiển thị
  const [members, setMembers] = useState<DepositForGroup[]>([])
  // Lấy thông tin chi tiết của từng thành viên
  //cần thằng này để check khi nào thì cho sử dụng nút tạo deposit
  // const [memeber, setMember] = useState<DepositForUser>()
  const [loading, setLoading] = useState(true)
  const [showCreateDeposit, setShowCreateDeposit] = useState(false)

  const handleSetShowCreateDeposit = () => {
    setShowCreateDeposit((prev) => !prev)
  }

  useEffect(() => {
    const fetchDeposits = async () => {
      if (!groupId) {
        return
      }
      setLoading(true)
      try {
        const response = await groupApi.getDepositForGroup(groupId)
        setMembers(response.data)
      } catch (error: any) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeposits()
  }, [groupId])

  //check hai trạng thái nếu ký rồi thì mới cho tạo deposit
  const isSigned = useMemo(() => {
    const check = members.find((member) => member.userId === Number(userId))
    return check?.contractStatus !== 'SIGNED'
  }, [members, userId])

  // nếu đã đóng tiền rồi thì khóa nút tạo deposit
  const isSubmitDeposit = useMemo(() => {
    const check = members.find((member) => member.userId === Number(userId))
    return check?.depositStatus === 'PAID'
  }, [members, userId])

  const getStatusText = (status: DepositForGroup['depositStatus']) => {
    const statusMap = {
      PAID: 'Paid',
      PENDING: 'Pending',

      REFUNDED: 'Refunded'
    }
    return statusMap[status]
  }

  const getStatusColor = (status: DepositForGroup['depositStatus']) => {
    const colorMap = {
      PAID: 'bg-teal-50 text-teal-700 border-teal-200',
      PENDING: 'bg-sky-50 text-sky-700 border-sky-200',
      REFUNDED: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
    return colorMap[status]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const totalMembers = members.length
  const paidMembers = members.filter((m) => m.depositStatus === 'PAID').length
  const unpaidMembers = totalMembers - paidMembers
  const completionRate = totalMembers > 0 ? Math.round((paidMembers / totalMembers) * 100) : 0

  return loading ? (
    <Skeleton />
  ) : (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-10 my-12 rounded-2xl'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-lg border border-white/20'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent'>
                Deposit Status
              </h1>
              <p className='text-sm text-gray-500 mt-1'>Manage and track group deposits</p>
            </div>

            <div className='flex items-center gap-3'>
              <button
                onClick={() => setShowCreateDeposit(true)}
                disabled={isSigned || isSubmitDeposit}
                className={classNames(
                  'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105',
                  {
                    'cursor-not-allowed': isSigned || isSubmitDeposit
                  }
                )}
              >
                Create Deposit
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {[
            {
              label: 'Total Members',
              value: totalMembers,
              gradient: 'from-cyan-500 to-blue-500'
            },
            {
              label: 'Paid',
              value: paidMembers,
              gradient: 'from-teal-500 to-cyan-600'
            },
            {
              label: 'Unpaid',
              value: unpaidMembers,
              gradient: 'from-sky-500 to-blue-600'
            },
            {
              label: 'Completion Rate',
              value: `${completionRate}%`,
              gradient: 'from-blue-500 to-indigo-600'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
            >
              <p className='text-white/80 text-sm font-medium mb-2'>{stat.label}</p>
              <p className='text-5xl font-bold text-white'>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <ProgressBar completionRate={completionRate} paidMembers={paidMembers} totalMembers={totalMembers} />

        {/* Members Table */}
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden'>
          <div className='p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-blue-50/50'>
            <h2 className='text-xl font-bold text-gray-800 flex items-center gap-3'>
              Member List
              <span className='text-sm font-normal text-gray-500'>({members.length} people)</span>
            </h2>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50/50 border-b border-gray-100'>
                <tr>
                  {['Member', 'Email', 'Rate', 'Amount', 'Status', 'Join Date'].map((header) => (
                    <th
                      key={header}
                      className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {members.map((member) => (
                  <tr
                    key={member.userId}
                    className='hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform'>
                          {member.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className='font-semibold text-gray-800 group-hover:text-blue-600 transition-colors'>
                            {member.userName}
                          </p>
                          <p className='text-xs text-gray-500'>ID: {member.userId}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-600 text-sm'>{member.userEmail}</td>
                    <td className='px-6 py-4'>
                      <span className='inline-flex items-center bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-cyan-200 shadow-sm'>
                        {member.ownershipPercentage}%
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-blue-600 font-bold text-base'>
                        {formatToVND(member.requiredDepositAmount)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border shadow-sm ${getStatusColor(member.depositStatus)}`}
                      >
                        {getStatusText(member.depositStatus)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-600 text-sm'>{formatDate(member.joinDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Confirm */}
      {showCreateDeposit && <ModalCreateDeposit handleSetShowCreateDeposit={handleSetShowCreateDeposit} />}
    </div>
  )
}

export default PaymentDeposit
