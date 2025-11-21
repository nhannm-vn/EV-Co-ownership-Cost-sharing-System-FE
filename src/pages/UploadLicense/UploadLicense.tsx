import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import Field from './components/Field'
import ProgressBar from './components/ProgressBar'
import Button from './components/Button'
import userApi from '../../apis/user.api'
import { toast } from 'react-toastify'

export type DocType = 'gplx' | 'cccd'
export type DocSide = 'front' | 'back'

export interface DocFiles {
  front: File | null
  back: File | null
}

export default function UploadLicense() {
  const [activeTab, setActiveTab] = useState<DocType>('gplx')
  const [uploadSuccess, setUploadSuccess] = useState<Record<DocType, boolean>>({
    gplx: false,
    cccd: false
  })

  // State to hold uploaded document files
  const [docs, setDocs] = useState<Record<DocType, DocFiles>>({
    gplx: { front: null, back: null },
    cccd: { front: null, back: null }
  })

  const uploadLicenseMutation = useMutation({
    mutationFn: ({ frontFile, backFile }: { frontFile: File; backFile: File }) =>
      userApi.uploadLicense(frontFile, backFile),
    onSuccess: (data) => {
      console.log('Upload driver license successfully:', data)
      setUploadSuccess((prev) => ({ ...prev, gplx: true }))
      toast.success('Upload driver license successfully!', { autoClose: 1500 })
    },
    onError: (error) => {
      console.error('Failed to upload driver license:', error)
      toast.error('Upload driver license failed, please try again!')
    }
  })

  const uploadCitizenIdMutation = useMutation({
    mutationFn: ({ frontFile, backFile }: { frontFile: File; backFile: File }) =>
      userApi.uploadCitizenId(frontFile, backFile),
    onSuccess: (data) => {
      console.log('Upload citizen ID successfully:', data)
      setUploadSuccess((prev) => ({ ...prev, cccd: true }))
      toast.success('Upload citizen ID successfully!', { autoClose: 1500 })
    },
    onError: (error) => {
      console.error('Failed to upload citizen ID:', error)
      toast.error('Upload citizen ID failed, please try again!')
    }
  })

  const currentUploadedCount = useMemo(() => {
    const currentDoc = docs[activeTab]
    let count = 0
    if (currentDoc.front) count++
    if (currentDoc.back) count++
    return count
  }, [docs, activeTab])

  const isCurrentTabReady = useMemo(() => currentUploadedCount === 2, [currentUploadedCount])

  const isUploading = uploadLicenseMutation.isPending || uploadCitizenIdMutation.isPending

  const handleFileChange = (type: DocType, side: DocSide, file: File | null) => {
    setDocs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [side]: file
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (activeTab === 'gplx') {
      if (!docs.gplx.front || !docs.gplx.back) {
        toast.warning('Please upload both front and back of your driver license!')
        return
      }
      uploadLicenseMutation.mutate({
        frontFile: docs.gplx.front,
        backFile: docs.gplx.back
      })
    } else {
      if (!docs.cccd.front || !docs.cccd.back) {
        toast.warning('Please upload both front and back of your citizen ID!')
        return
      }
      uploadCitizenIdMutation.mutate({
        frontFile: docs.cccd.front,
        backFile: docs.cccd.back
      })
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 relative overflow-hidden'>
      {/* Holographic Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className='absolute top-20 right-20 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[120px]'
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className='absolute bottom-20 left-20 w-[500px] h-[500px] bg-indigo-400/40 rounded-full blur-[120px]'
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-300/35 rounded-full blur-[100px]'
        />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-4xl backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2.5rem] shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 p-8 space-y-6 overflow-hidden'
      >
        {/* Top Bar */}
        <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

        {/* Header */}
        <div className='text-center space-y-3'>
          <h1 className='text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]'>Upload Documents</h1>
          <p className='text-white/75 text-sm font-medium'>Upload your driver license and citizen ID in any order</p>
        </div>

        {/* Tabs */}
        <div className='flex gap-2 p-2 bg-white/10 backdrop-blur-lg rounded-xl border-[2px] border-white/30'>
          {(['gplx', 'cccd'] as const).map((tab) => (
            <button
              key={tab}
              type='button'
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-400 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.6)] border-[2px] border-white/40'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className='flex items-center justify-center gap-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                  />
                </svg>
                <span>{tab === 'gplx' ? 'Driver License' : 'Citizen ID'}</span>
                {uploadSuccess[tab] && (
                  <span className='ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-green-400 text-white text-xs font-bold shadow-[0_0_15px_rgba(74,222,128,0.8)]'>
                    ✓
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <ProgressBar uploadedCount={currentUploadedCount} maxCount={2} />

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <h3 className='text-lg font-bold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                />
              </svg>
              {activeTab === 'gplx' ? 'Driver License (GPLX)' : 'Citizen ID (CCCD)'}
            </h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <Field
                type={activeTab}
                side='front'
                label='Front side'
                handleFileChange={handleFileChange}
                docs={docs}
                disabled={isUploading}
              />
              <Field
                type={activeTab}
                side='back'
                label='Back side'
                handleFileChange={handleFileChange}
                docs={docs}
                disabled={isUploading}
              />
            </div>
          </div>

          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center justify-center gap-3 bg-cyan-400/20 backdrop-blur-lg border-[2px] border-cyan-300/40 rounded-xl p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            >
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-200' />
              <span className='text-white font-semibold'>Uploading...</span>
            </motion.div>
          )}

          {(uploadLicenseMutation.isError || uploadCitizenIdMutation.isError) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-red-400/20 backdrop-blur-lg border-[2px] border-red-300/40 rounded-xl p-4 shadow-[0_0_20px_rgba(248,113,113,0.3)]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5 text-red-200'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                />
              </svg>
              <span className='text-red-200 font-semibold'>Upload failed, please try again!</span>
            </motion.div>
          )}

          {uploadSuccess[activeTab] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-green-400/20 backdrop-blur-lg border-[2px] border-green-300/40 rounded-xl p-4 shadow-[0_0_20px_rgba(74,222,128,0.3)]'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5 text-green-200'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
              </svg>
              <span className='text-green-200 font-semibold'>
                Upload {activeTab === 'gplx' ? 'driver license' : 'citizen ID'} successfully!
              </span>
            </motion.div>
          )}
        </motion.div>

        <Button
          isReady={isCurrentTabReady && !isUploading && !uploadSuccess[activeTab]}
          uploadedCount={currentUploadedCount}
          currentStep={activeTab === 'gplx' ? 1 : 2}
          isUploading={isUploading}
        />

        <div className='flex items-center justify-center gap-4 pt-4 border-t-[2px] border-white/20'>
          {(['gplx', 'cccd'] as const).map((type) => (
            <div
              key={type}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-lg transition-all duration-400 ${
                uploadSuccess[type]
                  ? 'bg-green-400/20 border-[2px] border-green-300/40 shadow-[0_0_20px_rgba(74,222,128,0.3)]'
                  : 'bg-white/10 border-[2px] border-white/20'
              }`}
            >
              <span className='text-sm text-white font-medium'>
                {type === 'gplx' ? 'Driver License' : 'Citizen ID'}:
              </span>
              <span className={`text-sm font-bold ${uploadSuccess[type] ? 'text-green-200' : 'text-white/60'}`}>
                {uploadSuccess[type] ? '✓ Completed' : 'Not uploaded'}
              </span>
            </div>
          ))}
        </div>

        <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
      </motion.form>
    </div>
  )
}
