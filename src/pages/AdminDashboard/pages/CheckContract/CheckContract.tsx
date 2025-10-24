/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'

interface Contract {
  id: number
  groupId: number
  startDate: string
  endDate: string
  requiredDepositAmount: number
  isActive: boolean
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedById: number | null
  approvedAt: string | null
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

function CheckContract() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock data - thay bằng API call thật
    setContracts([
      {
        id: 1,
        groupId: 3,
        startDate: '2024-02-01',
        endDate: '2024-11-30',
        requiredDepositAmount: 3000.0,
        isActive: true,
        approvalStatus: 'PENDING',
        approvedById: null,
        approvedAt: null,
        rejectionReason: null,
        createdAt: '2025-10-24T19:40:47.46',
        updatedAt: '2025-10-24T19:40:47.46'
      }
    ])
  }, [])

  const handleApprove = async (id: number) => {
    if (!window.confirm('Approve this contract?')) return

    try {
      // await fetch(`/api/contracts/${id}/approve`, { method: 'POST' })
      setContracts((prev) => prev.map((c) => (c.id === id ? { ...c, approvalStatus: 'APPROVED' as const } : c)))
      alert('Contract approved!')
    } catch (error) {
      alert('Error approving contract')
    }
  }

  const handleReject = async (id: number) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason) return

    try {
      // await fetch(`/api/contracts/${id}/reject`, {
      //   method: 'POST',
      //   body: JSON.stringify({ rejectionReason: reason })
      // })
      setContracts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, approvalStatus: 'REJECTED' as const, rejectionReason: reason } : c))
      )
      alert('Contract rejected!')
    } catch (error) {
      alert('Error rejecting contract')
    }
  }

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' VND'
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN')
  }

  if (loading) return <div className='p-8'>Loading...</div>

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>Duyệt Hợp Đồng</h1>

      <div className='bg-white rounded-lg shadow overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>ID</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Group</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Ngày bắt đầu</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Ngày kết thúc</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Tiền đặt cọc</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Trạng thái</th>
              <th className='px-4 py-3 text-left text-sm font-semibold text-gray-700'>Hành động</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {contracts.map((contract) => (
              <tr key={contract.id} className='hover:bg-gray-50'>
                <td className='px-4 py-3'>#{contract.id}</td>
                <td className='px-4 py-3'>Group #{contract.groupId}</td>
                <td className='px-4 py-3'>{formatDate(contract.startDate)}</td>
                <td className='px-4 py-3'>{formatDate(contract.endDate)}</td>
                <td className='px-4 py-3 font-semibold'>{formatMoney(contract.requiredDepositAmount)}</td>
                <td className='px-4 py-3'>
                  {contract.approvalStatus === 'PENDING' && (
                    <span className='px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full'>
                      Chờ duyệt
                    </span>
                  )}
                  {contract.approvalStatus === 'APPROVED' && (
                    <span className='px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full'>
                      Đã duyệt
                    </span>
                  )}
                  {contract.approvalStatus === 'REJECTED' && (
                    <span className='px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full'>
                      Từ chối
                    </span>
                  )}
                </td>
                <td className='px-4 py-3'>
                  {contract.approvalStatus === 'PENDING' ? (
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleApprove(contract.id)}
                        className='px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600'
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => handleReject(contract.id)}
                        className='px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600'
                      >
                        Từ chối
                      </button>
                    </div>
                  ) : (
                    <span className='text-sm text-gray-500'>
                      {contract.approvalStatus === 'APPROVED' ? 'Đã duyệt' : 'Đã từ chối'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contracts.length === 0 && <div className='text-center py-8 text-gray-500'>Không có hợp đồng nào</div>}
      </div>
    </div>
  )
}

export default CheckContract
