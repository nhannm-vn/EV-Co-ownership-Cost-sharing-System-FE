import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import ImageCard from './components/ImageCard'

export type Status = 'PENDING' | 'APPROVED' | 'REJECTED'
type DocType = 'cccd' | 'gplx'
type Side = 'front' | 'back'

interface Document {
  frontImage: string
  backImage: string
  frontStatus: Status
  backStatus: Status
  frontId?: number
  backId?: number
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUserToMember(user: any): Member {
  return {
    id: String(user.userId || ''),
    name: user.fullName || '',
    email: user.email || '',
    phone: user.phoneNumber || '',
    submittedAt: user.documents?.citizenIdImages?.front?.uploadedAt || user.createdAt || '',
    cccd: {
      frontImage:
        user.documents?.citizenIdImages?.front?.imageUrl ||
        'https://tailwindflex.com/storage/thumbnails/skeleton-loader/thumb_u.min.webp?v=1',
      backImage:
        user.documents?.citizenIdImages?.back?.imageUrl ||
        'https://tailwindflex.com/storage/thumbnails/skeleton-loader/thumb_u.min.webp?v=1',
      frontStatus: user.documents?.citizenIdImages?.front?.status || 'PENDING',
      backStatus: user.documents?.citizenIdImages?.back?.status || 'PENDING',
      frontId: user.documents?.citizenIdImages?.front?.documentId,
      backId: user.documents?.citizenIdImages?.back?.documentId
    },
    gplx: {
      frontImage:
        user.documents?.driverLicenseImages?.front?.imageUrl ||
        'https://tailwindflex.com/storage/thumbnails/skeleton-loader/thumb_u.min.webp?v=1',
      backImage:
        user.documents?.driverLicenseImages?.back?.imageUrl ||
        'https://tailwindflex.com/storage/thumbnails/skeleton-loader/thumb_u.min.webp?v=1',
      frontStatus: user.documents?.driverLicenseImages?.front?.status || 'PENDING',
      backStatus: user.documents?.driverLicenseImages?.back?.status || 'PENDING',
      frontId: user.documents?.driverLicenseImages?.front?.documentId,
      backId: user.documents?.driverLicenseImages?.back?.documentId
    }
  }
}

export default function CheckLicense() {
  const [members, setMembers] = useState<Member[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    staffApi
      .getUsersPendingLicense()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const mappedMembers = res.data.map(mapUserToMember)
          setMembers(mappedMembers)
          console.log(res.data)
        }
      })
      .catch(console.error)
  }, [])

  const updateStatus = (id: string, type: DocType, side: Side, status: Status) => {
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, [type]: { ...x[type], [`${side}Status`]: status } } : x)))
  }

  const DocumentSection = ({ member, docType }: { member: Member; docType: DocType }) => {
    const doc = member[docType]
    const { title, color, icon } = DOC_CONFIG[docType]
    return (
      <div className={`p-4 bg-${color}-50 rounded-2xl border-2 border-${color}-200`}>
        <div className='flex gap-2 mb-4 items-center'>
          <div className={`w-10 h-10 bg-${color}-500 rounded-xl flex items-center justify-center`}>
            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' strokeWidth={2} viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
            </svg>
          </div>
          <h4 className='text-lg font-bold text-gray-900'>{title}</h4>
        </div>
        <ImageCard
          image={doc.frontImage}
          alt='Mặt trước'
          status={doc.frontStatus}
          documentId={doc.frontId}
          setSelected={setSelected}
          onApprove={() => updateStatus(member.id, docType, 'front', 'APPROVED')}
          onReject={() => updateStatus(member.id, docType, 'front', 'REJECTED')}
        />
        <ImageCard
          image={doc.backImage}
          alt='Mặt sau'
          status={doc.backStatus}
          documentId={doc.backId}
          setSelected={setSelected}
          onApprove={() => updateStatus(member.id, docType, 'back', 'APPROVED')}
          onReject={() => updateStatus(member.id, docType, 'back', 'REJECTED')}
        />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
      {members.map((member, i) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className='bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden mb-6'
        >
          <div className='p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <div className='w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold border border-white/30'>
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className='text-xl font-bold'>{member.name}</h3>
                <p className='text-sm opacity-90'>
                  {member.email} • {member.phone}
                </p>
              </div>
            </div>
            <div className='bg-white/20 px-3 py-1.5 rounded-lg font-semibold text-sm'>{member.submittedAt}</div>
          </div>
          <div className='p-5 grid gap-5 lg:grid-cols-2'>
            <DocumentSection member={member} docType='cccd' />
            <DocumentSection member={member} docType='gplx' />
          </div>
        </motion.div>
      ))}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4'
          >
            <motion.img
              src={selected}
              alt='Preview'
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className='max-w-4xl w-full rounded-2xl'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
