/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import groupApi from '../../../../apis/group.api'
import type { DepositForGroup } from '../../../../types/api/group.type'
import Skeleton from '../../../../components/Skeleton'

function PaymentDeposit() {
  const { groupId } = useParams<{ groupId: string }>()
  const CURRENT_USER_ID = 1

  const [members, setMembers] = useState<DepositForGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedMember, setSelectedMember] = useState<DepositForGroup | null>(null)
  const [paymentAmount, setPaymentAmount] = useState('')

  useEffect(() => {
    const fetchDeposits = async () => {
      if (!groupId) {
        toast.error('Không tìm thấy group ID')
        return
      }

      setLoading(true)
      try {
        const response = await groupApi.getDepositForGroup(groupId)
        setMembers(response.data)
      } catch (error: any) {
        console.error(error)
        toast.error('Lỗi khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchDeposits()
  }, [groupId])

  const getStatusText = (status: DepositForGroup['depositStatus']) => {
    const statusMap = {
      COMPLETED: 'Đã đóng',
      PENDING: 'Chưa đóng',
      FAILED: 'Thất bại',
      REFUNDED: 'Đã hoàn tiền'
    }
    return statusMap[status]
  }

  const getStatusColor = (status: DepositForGroup['depositStatus']) => {
    const colorMap = {
      COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
      FAILED: 'bg-rose-50 text-rose-700 border-rose-200',
      REFUNDED: 'bg-sky-50 text-sky-700 border-sky-200'
    }
    return colorMap[status]
  }

  const getStatusIcon = (status: DepositForGroup['depositStatus']) => {
    const icons = {
      COMPLETED: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
      ),
      PENDING: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
            clipRule='evenodd'
          />
        </svg>
      ),
      FAILED: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
            clipRule='evenodd'
          />
        </svg>
      ),
      REFUNDED: (
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
            clipRule='evenodd'
          />
        </svg>
      )
    }
    return icons[status]
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const totalMembers = members.length
  const paidMembers = members.filter((m) => m.depositStatus === 'COMPLETED').length
  const unpaidMembers = totalMembers - paidMembers
  const completionRate = totalMembers > 0 ? Math.round((paidMembers / totalMembers) * 100) : 0

  const currentUser = members.find((m) => m.userId === CURRENT_USER_ID)
  const canPayment = currentUser?.depositStatus === 'PENDING'

  const handlePayment = async () => {
    const amount = parseFloat(paymentAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Vui lòng nhập số tiền hợp lệ')
      return
    }

    try {
      toast.success('Thanh toán thành công!')
      setShowPayment(false)
      setPaymentAmount('')

      if (groupId) {
        const response = await groupApi.getDepositForGroup(groupId)
        setMembers(response.data)
      }
    } catch (error: any) {
      console.error(error)
      toast.error('Lỗi khi thanh toán')
    }
  }

  return loading ? (
    <Skeleton />
  ) : (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-10 my-12 rounded-2xl'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-lg border border-white/20'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse'></div>
                <div className='relative bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-4 rounded-2xl shadow-xl'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                  Trạng thái tiền cọc
                </h1>
                <p className='text-sm text-gray-500 mt-1'>Quản lý và theo dõi tiền cọc nhóm</p>
              </div>
            </div>

            {canPayment && (
              <button
                onClick={() => setShowPayment(true)}
                className='group relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-3'
              >
                <svg
                  className='w-6 h-6 group-hover:rotate-12 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>Thanh toán ngay</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          {[
            {
              label: 'Tổng thành viên',
              value: totalMembers,
              gradient: 'from-blue-500 to-blue-600',
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            },
            {
              label: 'Đã đóng',
              value: paidMembers,
              gradient: 'from-emerald-500 to-green-600',
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            },
            {
              label: 'Chưa đóng',
              value: unpaidMembers,
              gradient: 'from-amber-500 to-orange-600',
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            },
            {
              label: 'Tỷ lệ hoàn thành',
              value: `${completionRate}%`,
              gradient: 'from-cyan-500 to-blue-600',
              icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            }
          ].map((stat, index) => (
            <div
              key={index}
              className='group bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-600 text-sm font-medium mb-2'>{stat.label}</p>
                  <p className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl p-6 mb-8 shadow-lg border border-white/20'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-800'>Tiến độ đóng tiền cọc</h3>
            <span className='text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent'>
              {completionRate}%
            </span>
          </div>
          <div className='relative w-full h-8 bg-gray-100 rounded-full overflow-hidden shadow-inner'>
            <div
              className='absolute h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 flex items-center justify-center transition-all duration-1000 ease-out shadow-lg'
              style={{ width: `${completionRate}%` }}
            >
              {completionRate > 15 && (
                <span className='text-white text-sm font-bold drop-shadow-lg'>{completionRate}% hoàn thành</span>
              )}
            </div>
          </div>
          <div className='flex items-center justify-between mt-3'>
            <p className='text-sm text-gray-600'>
              <span className='font-semibold text-emerald-600'>{paidMembers}</span>/{totalMembers} thành viên
            </p>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full animate-pulse'></div>
              <span className='text-xs text-gray-500'>Đang cập nhật</span>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden'>
          <div className='p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-blue-50/50'>
            <h2 className='text-xl font-bold text-gray-800 flex items-center gap-3'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h7' />
              </svg>
              Danh sách thành viên
              <span className='text-sm font-normal text-gray-500'>({members.length} người)</span>
            </h2>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50/50 border-b border-gray-100'>
                <tr>
                  {['Thành viên', 'Email', 'Tỷ lệ', 'Số tiền', 'Trạng thái', 'Ngày tham gia', 'Chi tiết'].map(
                    (header) => (
                      <th
                        key={header}
                        className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
                      >
                        {header}
                      </th>
                    )
                  )}
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
                        <div className='relative'>
                          <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity'></div>
                          <div className='relative w-11 h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform'>
                            {member.userName.charAt(0).toUpperCase()}
                          </div>
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
                      <span className='inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-cyan-200 shadow-sm'>
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                            clipRule='evenodd'
                          />
                        </svg>
                        {member.ownershipPercentage}%
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-blue-600 font-bold text-base'>
                        {formatCurrency(member.requiredDepositAmount)}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border shadow-sm ${getStatusColor(member.depositStatus)}`}
                      >
                        {getStatusIcon(member.depositStatus)}
                        {getStatusText(member.depositStatus)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-600 text-sm'>{formatDate(member.joinDate)}</td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => {
                          setSelectedMember(member)
                          setShowDetail(true)
                        }}
                        className='text-blue-600 hover:text-blue-700 p-2.5 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110'
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

      {/* Modal Detail */}
      {showDetail && selectedMember && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]'
          onClick={() => setShowDetail(false)}
        >
          <div
            className='bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl scale-90 opacity-0 animate-[scaleIn_0.3s_ease-out_forwards]'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between mb-6 pb-6 border-b'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50'></div>
                  <div className='relative w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg'>
                    {selectedMember.userName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-gray-800'>{selectedMember.userName}</h3>
                  <p className='text-gray-500'>ID: {selectedMember.userId}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetail(false)}
                className='text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all hover:rotate-90'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4 mb-6'>
              {[
                { label: 'Email', value: selectedMember.userEmail },
                { label: 'Tỷ lệ sở hữu', value: `${selectedMember.ownershipPercentage}%` },
                { label: 'Ngày tham gia', value: formatDate(selectedMember.joinDate) },
                {
                  label: 'Trạng thái',
                  value: (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedMember.depositStatus)}`}
                    >
                      {getStatusIcon(selectedMember.depositStatus)}
                      {getStatusText(selectedMember.depositStatus)}
                    </span>
                  )
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className='bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-100'
                >
                  <p className='text-sm text-gray-600 mb-1.5'>{item.label}</p>
                  <p className='font-semibold text-gray-800'>{item.value}</p>
                </div>
              ))}
            </div>

            <div className='bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-blue-200'>
              <h4 className='font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                    clipRule='evenodd'
                  />
                </svg>
                Thông tin cọc
              </h4>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>Số tiền cần nộp</p>
                  <p className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    {formatCurrency(selectedMember.requiredDepositAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Payment */}
      {showPayment && currentUser && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]'
          onClick={() => setShowPayment(false)}
        >
          <div
            className='bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl scale-90 opacity-0 animate-[scaleIn_0.3s_ease-out_forwards]'
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
              <div className='bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-xl'>
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              Thanh toán tiền cọc
            </h3>

            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Số tiền (VNĐ)</label>
              <input
                type='number'
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder={formatCurrency(currentUser.requiredDepositAmount)}
                className='w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-lg'
                autoFocus
              />
              <div className='mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200'>
                <p className='text-sm text-blue-700 flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Đề xuất: <span className='font-semibold'>{formatCurrency(currentUser.requiredDepositAmount)}</span>
                </p>
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={() => setShowPayment(false)}
                className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all hover:scale-105'
              >
                Hủy
              </button>
              <button
                onClick={handlePayment}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 transition-all hover:scale-105'
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
