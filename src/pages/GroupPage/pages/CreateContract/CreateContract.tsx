import { CloseOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import groupApi from '../../../../apis/group.api'
import { toast } from 'react-toastify'

const CreateContract: React.FC = () => {
  const { groupId } = useParams()
  const [showContract, setShowContract] = useState(true)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState('')

  // sign contract
  const signContractMutation = useMutation({
    mutationFn: (id: string) => groupApi.signContract(id),
    onSuccess: () => {
      console.log('Contract signed successfully')
      toast.success('Hợp đồng đã được phê duyệt thành công!')
      setShowContract(false)
    },
    onError: (error) => {
      console.log('Error signing contract', error)
      toast.error('Đã có lỗi xảy ra khi phê duyệt hợp đồng.')
    }
  })

  const contractQuery = useQuery({
    queryKey: ['contractData', groupId],
    queryFn: () => groupApi.generateContract(groupId as string),
    enabled: !!groupId,
    staleTime: 60000 // Cache 1 phút
  })

  const onSubmit = () => {
    if (!groupId) {
      toast.error('Không tìm thấy groupId, vui lòng thử lại.')
      return
    }
    signContractMutation.mutate(groupId as string)
  }

  console.log(contractQuery.data?.data)
  const dataContract = contractQuery.data?.data

  return (
    <>
      {showCancelModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setShowCancelModal(false)}
        >
          <div className='bg-white rounded-xl p-6 w-[500px]' onClick={(e) => e.stopPropagation()}>
            <h3 className='text-lg font-bold mb-4'>Lý do hủy hợp đồng</h3>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder='Nhập lý do...'
              rows={4}
              className='w-full border rounded-lg p-3 mb-4'
            />
            <div className='flex gap-3'>
              <button onClick={() => setShowCancelModal(false)} className='flex-1 border rounded-lg py-2'>
                Quay lại
              </button>
              <button
                onClick={() => {
                  console.log('Cancel:', cancelReason)
                  setShowCancelModal(false)
                  setShowContract(false)
                }}
                disabled={!cancelReason.trim()}
                className='flex-1 bg-red-500 text-white rounded-lg py-2 disabled:opacity-50'
              >
                Xác nhận hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {showContract && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50'>
          <div className='bg-white rounded-2xl w-[800px] max-h-[90vh] overflow-auto relative'>
            {/* Close Button */}
            <button onClick={() => setShowContract(false)} className='absolute top-4 right-4 text-gray-500'>
              <CloseOutlined className='w-6 h-6 text-gray-800' />
            </button>

            <div className='p-8'>
              {/* Header */}
              <div className='flex justify-between items-center mb-6 pb-6 border-b'>
                <div>
                  <h2 className='text-xl font-bold'>EVShare</h2>
                  <p className='text-sm text-gray-600'>Hệ thống đồng sở hữu xe điện</p>
                </div>
                <div>
                  <span className='bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-lg'>DRAFT</span>
                  <p className='text-xs text-gray-500 mt-1'>Số: {dataContract?.contractNumber}</p>
                </div>
              </div>

              {/* Title */}
              <h1 className='text-2xl font-bold mb-2'>HỢP ĐỒNG SỞ HỮU XE CHUNG</h1>
              <p className='text-sm text-gray-600 mb-6'>
                Căn cứ theo thỏa thuận giữa các Bên thuộc Nhóm sở hữu{' '}
                <span className='font-bold text-cyan-600'>EVShare – {dataContract?.group.name}</span>
              </p>

              {/* Vehicle Info */}
              <div className='grid grid-cols-2 gap-6 mb-6 p-4 bg-cyan-50 rounded-xl'>
                <div>
                  <h3 className='font-bold mb-2'>Thông tin phương tiện</h3>
                  <div className='space-y-1 text-sm'>
                    <div className='flex justify-between'>
                      <span>Biển số</span>
                      <span className='font-bold'>{dataContract?.vehicle?.plate}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Số VIN</span>
                      <span className='font-bold text-xs'>{dataContract?.vehicle?.vin}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='font-bold mb-2'>Hiệu lực hợp đồng</h3>
                  <div className='space-y-1 text-sm'>
                    <div className='flex justify-between'>
                      <span>Ngày hiệu lực</span>
                      <span className='font-bold'>{dataContract?.contract?.effectiveDate}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Ngày kết thúc</span>
                      <span className='font-bold'>{dataContract?.contract?.endDate}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Kỳ hạn</span>
                      <span className='font-bold'>{dataContract?.contract?.termLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shareholders Table */}
              <div className='mb-6'>
                <h3 className='font-bold mb-3'>1. Các Bên đồng sở hữu</h3>
                <table className='w-full text-sm border rounded-xl overflow-hidden'>
                  <thead className='bg-cyan-100'>
                    <tr>
                      <th className='border-b px-3 py-2 text-left'>#</th>
                      <th className='border-b px-3 py-2 text-left'>Họ tên</th>
                      <th className='border-b px-3 py-2 text-left'>Liên hệ</th>
                      <th className='border-b px-3 py-2 text-left'>Tỷ lệ (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataContract?.owners?.map((item, index) => (
                      <tr key={index}>
                        <td className='border-b px-3 py-2'>{index}</td>
                        <td className='border-b px-3 py-2 font-bold'>{item?.name}</td>
                        <td className='border-b px-3 py-2 text-xs'>{item?.phone}</td>
                        <td className='border-b px-3 py-2 font-bold text-cyan-600'>{item?.share}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className='text-sm mt-2'>
                  Tổng tỷ lệ: <span className='font-bold text-cyan-600'>100%</span>
                </p>
              </div>

              {/* Fund Info */}
              <div className='mb-6 p-4 bg-cyan-50 rounded-xl'>
                <h3 className='font-bold mb-3'>2. Góp vốn & Quỹ vận hành</h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span>Giá trị xe</span>
                    <span className='font-bold'>{dataContract?.finance?.vehiclePrice}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tiền cọc</span>
                    <span className='font-bold'>{dataContract?.finance?.depositAmount}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Mục tiêu quỹ</span>
                    <span className='font-bold'>{dataContract?.finance?.targetAmount}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Nguyên tắc góp</span>
                    <span className='font-bold'>Theo Tỷ lệ Sở Hữu</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4 mt-6 pt-6 border-t'>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className='flex-1 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600'
                >
                  Hủy hợp đồng
                </button>
                <button
                  onClick={onSubmit}
                  disabled={signContractMutation.isPending}
                  className='flex-1 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {signContractMutation.isPending ? 'Đang xử lý...' : 'Phê duyệt hợp đồng'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateContract
