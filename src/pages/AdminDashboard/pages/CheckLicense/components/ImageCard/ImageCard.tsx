import { toast } from 'react-toastify'
import staffApi from '../../../../../../apis/staff.api'
import type { Status } from '../../CheckLicense'
import StatusBadge from '../StatusBadge'

export default function ImageCard({
  image,
  alt,
  status,
  onApprove,
  onReject,
  documentId,
  setSelected
}: {
  image: string
  alt: string
  status: Status
  onApprove: () => void
  onReject: () => void
  documentId?: number
  setSelected: (image: string) => void
}) {
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <h5 className='text-gray-700 font-bold text-sm'>{alt}</h5>
        <StatusBadge status={status} />
      </div>
      <div
        onClick={() => setSelected(image)}
        className='relative cursor-pointer rounded-xl overflow-hidden border-2 border-gray-200 hover:border-indigo-400 transition-all'
      >
        <img
          src={image}
          alt={alt}
          className='w-full h-40 object-cover transition-transform duration-300 hover:scale-110'
        />
        {status === 'PENDING' && documentId && (
          <div className='flex gap-2 mt-1'>
            <button
              onClick={async (e) => {
                e.stopPropagation()
                await staffApi.reviewDocument(documentId, 'APPROVE')
                toast.success('Checking license approved', { autoClose: 1000 })
                onApprove()
              }}
              className='flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 font-bold'
            >
              Duyệt
            </button>
            <button
              onClick={async (e) => {
                e.stopPropagation()
                await staffApi.reviewDocument(documentId, 'REJECT')
                toast.success('Checking license rejected', { autoClose: 1000 })
                onReject()
              }}
              className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg py-2 font-bold'
            >
              Từ chối
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
