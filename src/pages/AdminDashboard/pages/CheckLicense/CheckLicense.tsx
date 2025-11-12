import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import staffApi from '../../../../apis/staff.api'
import Skeleton from '../../../../components/Skeleton'
import ImageCard from './components/ImageCard'
import EmptyState from '../EmptyState'

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
    shortTitle: 'CCCD',
    accent: '#3B82F6'
  },
  gplx: {
    title: 'Giấy phép lái xe',
    shortTitle: 'GPLX',
    accent: '#10B981'
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
  const [loading, setLoading] = useState(false)
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set())
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    setLoading(true)
    staffApi
      .getUsersPendingLicense()
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          const mappedMembers = res.data.map(mapUserToMember)
          setMembers(mappedMembers)
          // Auto-expand first member
          if (mappedMembers.length > 0) {
            setExpandedMembers(new Set([mappedMembers[0].id]))
          }
          setLoading(false)
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0
      setScrollProgress(progress)
      setShowBackToTop(scrollTop > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  const expandAll = () => {
    setExpandedMembers(new Set(members.map((m) => m.id)))
  }

  const collapseAll = () => {
    setExpandedMembers(new Set())
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateStatus = (id: string, type: DocType, side: Side, status: Status) => {
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, [type]: { ...x[type], [`${side}Status`]: status } } : x)))
  }

  const DocumentSection = ({ member, docType }: { member: Member; docType: DocType }) => {
    const doc = member[docType]
    const { title, shortTitle, accent } = DOC_CONFIG[docType]

    return (
      <div className='bg-gray-50 rounded-lg border border-gray-200 overflow-hidden'>
        <div className='px-4 py-2.5 border-b border-gray-200 bg-white'>
          <div className='flex items-center gap-2'>
            <span
              className='text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded text-white'
              style={{ backgroundColor: accent }}
            >
              {shortTitle}
            </span>
            <span className='text-sm font-medium text-gray-700'>{title}</span>
          </div>
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

  if (members.length === 0) {
    return <EmptyState />
  }

  return loading ? (
    <Skeleton />
  ) : (
    <div className='min-h-screen bg-gray-50'>
      {/* Progress Bar */}
      <div className='fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50'>
        <div className='h-full bg-blue-600 transition-all duration-150' style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Compact Sticky Header */}
      <div className='sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm mt-1'>
        <div className='max-w-6xl mx-auto px-4 py-3'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <h1 className='text-xl font-bold text-gray-900'>Xác minh giấy tờ</h1>
              <span className='text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium'>
                {members.length} yêu cầu
              </span>
            </div>

            {/* Expand/Collapse All */}
            <div className='flex gap-2'>
              <button
                onClick={expandAll}
                className='text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors'
              >
                Mở tất cả
              </button>
              <button
                onClick={collapseAll}
                className='text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors'
              >
                Thu gọn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Member List */}
      <div className='max-w-6xl mx-auto px-4 py-6'>
        <div className='space-y-3'>
          {members.map((member, i) => {
            const isExpanded = expandedMembers.has(member.id)

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200'
              >
                {/* Compact Header - Always Visible */}
                <button
                  onClick={() => toggleMember(member.id)}
                  className='w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center gap-3 flex-1'>
                    {/* Avatar */}
                    <div
                      className='w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0'
                      style={{ backgroundColor: '#3B82F6' }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className='flex-1 text-left min-w-0'>
                      <div className='flex items-center gap-2 mb-0.5'>
                        <h3 className='text-base font-bold text-gray-900 truncate'>{member.name}</h3>
                        <span className='text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0'>
                          #{i + 1}
                        </span>
                      </div>
                      <div className='flex items-center gap-4 text-xs text-gray-600'>
                        <span className='truncate'>{member.email}</span>
                        <span className='flex-shrink-0'>{member.phone}</span>
                        <span className='flex-shrink-0 text-gray-500'>{member.submittedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='ml-3 flex-shrink-0'
                  >
                    <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                  </motion.div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='overflow-hidden'
                    >
                      <div className='px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50'>
                        <div className='grid gap-4 md:grid-cols-2'>
                          <DocumentSection member={member} docType='cccd' />
                          <DocumentSection member={member} docType='gplx' />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* End Indicator */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>Đã hiển thị {members.length} yêu cầu</p>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className='fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 10l7-7m0 0l7 7m-7-7v18' />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Image Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 cursor-zoom-out'
          >
            <motion.img
              src={selected}
              alt='Preview'
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className='max-w-5xl w-full rounded-lg shadow-2xl'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
