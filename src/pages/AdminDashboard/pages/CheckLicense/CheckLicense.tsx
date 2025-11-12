/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import Skeleton from '../../../../components/Skeleton'
import ImageCard from './components/ImageCard'
import EmptyState from '../EmptyState'
import type { DocumentInfo, UserDetails } from '../../../../types/api/staff.type'

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
}

const DOC_CONFIG = {
  cccd: { title: 'Căn cước công dân', shortTitle: 'CCCD', accent: '#3B82F6' },
  gplx: { title: 'Giấy phép lái xe', shortTitle: 'GPLX', accent: '#10B981' }
}

function mapUserToMember(user: any): Member {
  const defaultImage = 'https://tailwindflex.com/storage/thumbnails/skeleton-loader/thumb_u.min.webp?v=1'

  return {
    id: String(user.userId || ''),
    name: user.fullName || '',
    email: user.email || '',
    phone: user.phoneNumber || '',
    cccd: {
      frontImage: user.documents?.citizenIdImages?.front?.imageUrl || defaultImage,
      backImage: user.documents?.citizenIdImages?.back?.imageUrl || defaultImage,
      frontStatus: user.documents?.citizenIdImages?.front?.status || 'PENDING',
      backStatus: user.documents?.citizenIdImages?.back?.status || 'PENDING',
      frontId: user.documents?.citizenIdImages?.front?.documentId,
      backId: user.documents?.citizenIdImages?.back?.documentId
    },
    gplx: {
      frontImage: user.documents?.driverLicenseImages?.front?.imageUrl || defaultImage,
      backImage: user.documents?.driverLicenseImages?.back?.imageUrl || defaultImage,
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
  const [loading, setLoading] = useState(false)
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set())
  const [detailData, setDetailData] = useState<UserDetails | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    setLoading(true)
    staffApi
      .getUsersPendingLicense()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setMembers(res.data.map(mapUserToMember))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const toggleMember = (id: string) => {
    setExpandedMembers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleViewDetail = async (userId: string) => {
    setLoadingDetail(true)
    try {
      const response = await staffApi.getUserDetailInStaffById(userId)
      setDetailData(response.data)
    } catch (error) {
      console.error('Error fetching user details:', error)
    } finally {
      setLoadingDetail(false)
    }
  }

  const updateStatus = (id: string, type: DocType, side: Side, status: Status) => {
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, [type]: { ...x[type], [`${side}Status`]: status } } : x)))
  }

  const DocumentSection = ({ member, docType }: { member: Member; docType: DocType }) => {
    const doc = member[docType]
    const { title, shortTitle, accent } = DOC_CONFIG[docType]

    return (
      <div className='bg-gray-50 rounded-lg border border-gray-200'>
        <div className='px-4 py-2 bg-white border-b'>
          <span
            className='text-xs font-bold uppercase px-2 py-0.5 rounded text-white'
            style={{ backgroundColor: accent }}
          >
            {shortTitle}
          </span>
          <span className='text-sm font-medium text-gray-700 ml-2'>{title}</span>
        </div>
        <div className='p-3 space-y-3'>
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
      </div>
    )
  }

  const DocumentDetailCard = ({ doc, title }: { doc: DocumentInfo | null; title: string }) => {
    if (!doc) {
      return (
        <div className='bg-gray-50 rounded-lg p-4 text-center'>
          <p className='text-sm text-gray-500'>Không có dữ liệu {title}</p>
        </div>
      )
    }

    return (
      <div className='bg-white rounded-lg border border-gray-200'>
        <div className='bg-blue-50 px-4 py-3 border-b'>
          <h4 className='text-sm font-bold'>{title}</h4>
        </div>
        <div className='p-4 space-y-3'>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <span className='text-gray-600 font-medium'>Document ID:</span>
              <p className='text-gray-900 mt-1'>{doc.documentId}</p>
            </div>
            <div>
              <span className='text-gray-600 font-medium'>Status:</span>
              <p className='mt-1'>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    doc.status === 'APPROVED'
                      ? 'bg-green-100 text-green-700'
                      : doc.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {doc.status}
                </span>
              </p>
            </div>
            {doc.documentNumber && (
              <div>
                <span className='text-red-600 background-color: #ffe5e5; font-medium'>Document Number:</span>
                <p className='text-gray-900 mt-1'>{doc.documentNumber}</p>
              </div>
            )}
            {doc.dateOfBirth && (
              <div>
                <span className='text-gray-600 font-medium'>Date of Birth:</span>
                <p className='text-gray-900 mt-1'>{doc.dateOfBirth}</p>
              </div>
            )}
            {doc.reviewedBy && (
              <div>
                <span className='text-gray-600 font-medium'>Reviewed By:</span>
                <p className='text-gray-900 mt-1'>{doc.reviewedBy}</p>
              </div>
            )}
          </div>
          {doc.reviewNote && (
            <div className='pt-3 border-t'>
              <span className='text-gray-600 font-medium text-sm'>Review Note:</span>
              <p className='text-gray-900 mt-1 text-sm bg-gray-50 p-3 rounded'>{doc.reviewNote}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) return <Skeleton />
  if (members.length === 0) return <EmptyState />

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b shadow-sm p-4'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <h1 className='text-xl font-bold'>Xác minh giấy tờ ({members.length})</h1>
          <div className='flex gap-2'>
            <button
              onClick={() => setExpandedMembers(new Set(members.map((m) => m.id)))}
              className='px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-xs font-medium'
            >
              Mở tất cả
            </button>
            <button
              onClick={() => setExpandedMembers(new Set())}
              className='px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium'
            >
              Thu gọn
            </button>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-4 space-y-3'>
        {members.map((member) => (
          <div key={member.id} className='bg-white rounded-lg border shadow-sm'>
            <div className='p-4 flex items-center justify-between'>
              <div className='flex items-center gap-3 flex-1'>
                <div className='w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold'>
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className='font-bold'>{member.name}</h3>
                  <p className='text-xs text-gray-600'>
                    {member.email} • {member.phone}
                  </p>
                </div>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleViewDetail(member.id)}
                  className='px-4 py-2 bg-blue-600 text-white text-sm rounded'
                >
                  Chi tiết
                </button>
                <button onClick={() => toggleMember(member.id)} className='p-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedMembers.has(member.id) && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className='overflow-hidden'
                >
                  <div className='p-4 border-t bg-gray-50 grid md:grid-cols-2 gap-4'>
                    <DocumentSection member={member} docType='cccd' />
                    <DocumentSection member={member} docType='gplx' />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {(detailData || loadingDetail) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6'
            onClick={() => setDetailData(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className='bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto'
            >
              {loadingDetail ? (
                <div className='p-12 text-center'>
                  <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto'></div>
                  <p className='mt-4 text-gray-600'>Đang tải...</p>
                </div>
              ) : (
                detailData && (
                  <>
                    <div className='p-6 border-b flex justify-between items-center'>
                      <h2 className='text-2xl font-bold'>{detailData.fullName}</h2>
                      <button onClick={() => setDetailData(null)} className='p-2 hover:bg-gray-100 rounded'>
                        ✕
                      </button>
                    </div>
                    <div className='p-6 space-y-6'>
                      <div>
                        <h3 className='text-lg font-bold mb-3'>CCCD</h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                          <DocumentDetailCard doc={detailData.documents.citizenIdImages.front} title='Mặt trước' />
                          <DocumentDetailCard doc={detailData.documents.citizenIdImages.back} title='Mặt sau' />
                        </div>
                      </div>
                      <div>
                        <h3 className='text-lg font-bold mb-3'>GPLX</h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                          <DocumentDetailCard doc={detailData.documents.driverLicenseImages.front} title='Mặt trước' />
                          <DocumentDetailCard doc={detailData.documents.driverLicenseImages.back} title='Mặt sau' />
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6'
          >
            <img src={selected} alt='Preview' className='max-w-5xl w-full rounded-lg' />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
