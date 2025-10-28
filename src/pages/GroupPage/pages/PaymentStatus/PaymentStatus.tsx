import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router'
import groupApi from '../../../../apis/group.api'
import { formatToVND } from '../../../../utils/formatPrice'

export default function PaymentStatus() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  console.log(searchParams.get('status'), searchParams.get('txnRef'))

  const txnQuery = useQuery({
    queryKey: ['deposit-history', searchParams.get('txnRef')],
    queryFn: () => groupApi.getDepositHistoryForGroup(searchParams.get('txnRef') || '')
  })

  const txnData = txnQuery.data?.data
  const formattedAmount = formatToVND(txnData?.amount || 0)
  const formattedDate = new Date(txnData?.paidAt || '').toLocaleString('vi-VN')
  return (
    <div className='bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md text-center'>
      <div className='flex justify-center mb-4'>
        <div className='bg-green-100 text-green-600 rounded-full p-4 text-5xl'>✔</div>
      </div>
      <h1 className='text-2xl font-bold text-gray-800 mb-2'>Thanh toán thành công!</h1>
      <p className='text-gray-600 mb-6'>
        Cảm ơn bạn đã thanh toán qua <span className='font-semibold'>{txnData?.paymentMethod}</span>.
      </p>

      <div className='text-left text-gray-700 space-y-2 border-t border-gray-200 pt-4'>
        <p>
          <strong>Số tiền:</strong> {formattedAmount}
        </p>
        <p>
          <strong>Phương thức:</strong> {txnData?.paymentMethod}
        </p>
        <p>
          <strong>Mã giao dịch:</strong> {txnData?.transactionCode}
        </p>
        <p>
          <strong>Ngày thanh toán:</strong> {formattedDate}
        </p>
        <p>
          <strong>Nhóm:</strong> #{txnData?.groupId}
        </p>

        <p>
          <strong>Ghi chú:</strong> Thanh toán của bạn đã được ghi nhận thành công.
        </p>
      </div>

      <div className='mt-8 flex flex-col gap-3'>
        <button
          onClick={() => navigate(`/dashboard/viewGroups/${txnData?.groupId}/paymentDeposit`)}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
        >
          Đóng
        </button>
      </div>
    </div>
  )
}
