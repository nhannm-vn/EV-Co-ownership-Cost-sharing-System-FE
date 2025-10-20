import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { UserOfStaff } from '../../../../types/api/staff.type'
import staffApi from '../../../../apis/staff.api'

type Status = 'PENDING' | 'APPROVED' | 'REJECTED'
type DocType = 'cccd' | 'gplx'
type Side = 'front' | 'back'

interface Document {
  frontImage: string
  backImage: string
  frontStatus: Status
  backStatus: Status
}

interface Member {
  id: string
  name: string
  email: string
  phone: string
  cccd: Document
  gplx: Document
  submittedAt: string
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    cccd: {
      frontImage: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=CCCD+Truoc',
      backImage: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=CCCD+Sau',
      frontStatus: 'PENDING',
      backStatus: 'PENDING'
    },
    gplx: {
      frontImage: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=GPLX+Truoc',
      backImage: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=GPLX+Sau',
      frontStatus: 'PENDING',
      backStatus: 'PENDING'
    },
    submittedAt: '2025-10-20 09:30'
  }
]

const STATUS_CONFIG = {
  APPROVED: {
    color: 'green',
    label: 'Đã duyệt',
    icon: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
  },
  REJECTED: {
    color: 'red',
    label: 'Từ chối',
    icon: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
  },
  PENDING: {
    color: 'orange',
    label: 'Chờ duyệt',
    icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
  }
}

const DOC_CONFIG = {
  cccd: {
    title: 'Căn cước công dân',
    color: 'blue',
    icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
  },
  gplx: {
    title: 'Giấy phép lái xe',
    color: 'green',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  }
}

export default function CheckLicense() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [users, setUsers] = useState<UserOfStaff | null>(null)
  useEffect(() => {
    staffApi.getUsersPendingLicense().then((response) => {
      console.log(response.data)
    })
  }, [])

  const updateStatus = (memberId: string, docType: DocType, side: Side, status: Status) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              [docType]: { ...m[docType], [`${side}Status`]: status }
            }
          : m
      )
    )
  }

  const StatusBadge = ({ status }: { status: Status }) => {
    const { color, label, icon } = STATUS_CONFIG[status]
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-${color}-100 rounded-full`}>
        <svg className={`w-4 h-4 text-${color}-600`} fill='currentColor' viewBox='0 0 20 20'>
          <path fillRule='evenodd' d={icon} clipRule='evenodd' />
        </svg>
        <span className={`text-sm font-semibold text-${color}-700`}>{label}</span>
      </span>
    )
  }

  const ImageCard = ({
    image,
    alt,
    status,
    onApprove,
    onReject
  }: {
    image: string
    alt: string
    status: Status
    onApprove: () => void
    onReject: () => void
  }) => (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <h5 className='text-gray-700 font-bold text-sm'>{alt}</h5>
        <StatusBadge status={status} />
      </div>
      <div
        className='relative group cursor-pointer rounded-xl overflow-hidden border-2 border-gray-200 hover:border-indigo-400 transition-all'
        onClick={() => setSelectedImage(image)}
      >
        <img
          src={image}
          alt={alt}
          className='w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='absolute bottom-2 left-2 right-2 flex items-center justify-between'>
            <span className='text-white text-xs font-semibold'>Xem chi tiết</span>
            <svg className='w-4 h-4 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
        </div>
      </div>
      {status === 'PENDING' && (
        <div className='flex gap-2'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onApprove}
            className='flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            Duyệt
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReject}
            className='flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-red-50 text-red-600 text-sm font-bold rounded-lg border-2 border-red-300 transition-colors'
          >
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
            Từ chối
          </motion.button>
        </div>
      )}
    </div>
  )

  const DocumentSection = ({ member, docType }: { member: Member; docType: DocType }) => {
    const doc = member[docType]
    const { title, color, icon } = DOC_CONFIG[docType]

    return (
      <div className={`p-4 bg-${color}-50 rounded-2xl border-2 border-${color}-200`}>
        <div className='flex items-center gap-2 mb-4'>
          <div className={`w-10 h-10 bg-${color}-500 rounded-xl flex items-center justify-center`}>
            <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
            </svg>
          </div>
          <h4 className='text-lg font-bold text-gray-900'>{title}</h4>
        </div>
        <div className='space-y-3'>
          <ImageCard
            image={doc.frontImage}
            alt='Mặt trước'
            status={doc.frontStatus}
            onApprove={() => updateStatus(member.id, docType, 'front', 'APPROVED')}
            onReject={() => updateStatus(member.id, docType, 'front', 'REJECTED')}
          />
          <ImageCard
            image={doc.backImage}
            alt='Mặt sau'
            status={doc.backStatus}
            onApprove={() => updateStatus(member.id, docType, 'back', 'APPROVED')}
            onReject={() => updateStatus(member.id, docType, 'back', 'REJECTED')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Header */}
      <div className='bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-6 py-5'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
              <svg className='w-7 h-7 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                Kiểm duyệt giấy tờ
              </h1>
              <p className='text-sm text-gray-600'>Quản lý CCCD và GPLX</p>
            </div>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='space-y-6'>
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className='bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden'
            >
              {/* Member Header */}
              <div className='p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold border-2 border-white/30'>
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className='text-xl font-bold'>{member.name}</h3>
                      <p className='text-sm text-white/90'>
                        {member.email} • {member.phone}
                      </p>
                    </div>
                  </div>
                  <div className='bg-white/20 px-3 py-1.5 rounded-lg text-sm font-semibold'>{member.submittedAt}</div>
                </div>
              </div>

              {/* Documents */}
              <div className='p-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                <DocumentSection member={member} docType='cccd' />
                <DocumentSection member={member} docType='gplx' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className='fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4'
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt='Preview'
              className='max-w-4xl w-full rounded-2xl'
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
