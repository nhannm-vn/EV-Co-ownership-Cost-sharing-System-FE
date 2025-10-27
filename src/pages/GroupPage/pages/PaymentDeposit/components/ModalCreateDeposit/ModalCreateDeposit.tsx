import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import groupApi from '../../../../../../apis/group.api'
import type { CreateDepositSuccess } from '../../../../../../types/api/group.type'
import { getGroupIdFromLS, getUserIdFromLS } from '../../../../../../utils/auth'

interface IModalCreateDeposit {
  handleSetShowCreateDeposit: () => void
}

function ModalCreateDeposit({ handleSetShowCreateDeposit }: IModalCreateDeposit) {
  const groupId = getGroupIdFromLS()
  const [memeber, setMember] = useState<CreateDepositSuccess>()
  const userId = getUserIdFromLS()
  console.log(groupId, userId)

  useEffect(() => {
    const fetchMemberDetail = async () => {
      if (!userId) {
        toast.error('Group ID or User ID not found')
        return
      }
      try {
        const response = await groupApi.createDepositForCoOwner({ userId: userId, groupId: groupId as string })
        setMember(response.data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error)
        toast.error('Error loading member data')
      }
    }

    fetchMemberDetail()
  }, [userId, groupId])

  const handleContinue = () => {
    handleSetShowCreateDeposit()
    window.open(`${memeber?.vnpayUrl}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'
      onClick={handleSetShowCreateDeposit}
    >
      <div className='bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl' onClick={(e) => e.stopPropagation()}>
        <div className='mb-6 p-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl'>
          <h3 className='text-2xl font-bold text-white text-center'>Create New Deposit?</h3>
        </div>

        <p className='text-center text-gray-600 mb-6'>You will be redirected to the deposit details page</p>

        <div className='flex gap-3'>
          <button
            onClick={handleSetShowCreateDeposit}
            className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all'
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className='flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/30 transition-all'
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCreateDeposit
