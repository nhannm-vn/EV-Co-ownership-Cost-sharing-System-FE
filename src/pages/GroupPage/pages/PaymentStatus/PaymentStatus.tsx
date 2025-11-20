import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router'
import groupApi from '../../../../apis/group.api'
import { formatToVND } from '../../../../utils/formatPrice'
import { useEffect } from 'react'

export default function PaymentStatus() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')?.trim()?.toLowerCase()
  const type = searchParams.get('type')?.trim()?.toLowerCase()
  const txnRef = searchParams.get('txnRef')
  console.log(status, type, txnRef)

  const navigate = useNavigate()

  const txnQuery = useQuery({
    queryKey: ['deposit-history', txnRef],
    queryFn: () => groupApi.getDepositHistoryForGroup(txnRef || '')
  })
  console.log(txnQuery?.data?.data)

  useEffect(() => {
    const data = txnQuery.data?.data
    console.log(data?.groupId)

    console.log(data)

    if (!data) return

    const groupId = data?.groupId
    if (!groupId) return

    if (status === 'fail' && type === 'fund') {
      console.log(status, type)
      navigate(`/dashboard/viewGroups/${groupId}/fund-ownership`)
    } else if (status === 'fail' && type === 'maintenance') {
      console.log('vô đây rồi nè ')

      console.log(status, type)
      navigate(`/dashboard/viewGroups/${groupId}/group-expense`)
    } else if (status === 'fail') {
      navigate(`/dashboard/viewGroups/${groupId}/paymentDeposit`)
    }
  }, [txnQuery.data, status, type, navigate])
  console.log('tới đây rồi nè 2 ')

  const handleNavigate = () => {
    if (type === 'fund') {
      return navigate(`/dashboard/viewGroups/${txnData?.groupId}/fund-ownership`)
    } else if (type === 'maintenance') {
      return navigate(`/dashboard/viewGroups/${txnData?.groupId}/group-expense`)
    } else {
      return navigate(`/dashboard/viewGroups/${txnData?.groupId}/paymentDeposit`)
    }
  }

  const txnData = txnQuery.data?.data
  const formattedAmount = formatToVND(txnData?.amount || 0)
  const formattedDate = new Date(txnData?.paidAt || '').toLocaleString('vi-VN')
  return (
    <div className='bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md text-center'>
      {searchParams.get('status') === 'success' ? (
        <>
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
              onClick={handleNavigate}
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
            >
              Đóng
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}
