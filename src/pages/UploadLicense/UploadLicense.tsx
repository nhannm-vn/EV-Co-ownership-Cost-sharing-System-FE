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

  const [docs, setDocs] = useState<Record<DocType, DocFiles>>({
    gplx: { front: null, back: null },
    cccd: { front: null, back: null }
  })

  // Mutation cho upload GPLX
  const uploadLicenseMutation = useMutation({
    mutationFn: ({ frontFile, backFile }: { frontFile: File; backFile: File }) =>
      userApi.uploadLicense(frontFile, backFile),
    onSuccess: (data) => {
      console.log('Upload GPLX thành công:', data)
      setUploadSuccess((prev) => ({ ...prev, gplx: true }))
      toast.success('Upload GPLX successfully!', {
        autoClose: 3000
      })
    },
    onError: (error) => {
      console.error('Lỗi upload GPLX:', error)
      toast.error('Upload GPLX thất bại, vui lòng thử lại!')
    }
  })

  // Mutation cho upload CCCD
  const uploadCitizenIdMutation = useMutation({
    mutationFn: ({ frontFile, backFile }: { frontFile: File; backFile: File }) =>
      userApi.uploadCitizenId(frontFile, backFile),
    onSuccess: (data) => {
      console.log('Upload CCCD thành công:', data)
      setUploadSuccess((prev) => ({ ...prev, cccd: true }))
      toast.success('Upload CCCD successfully!', {
        autoClose: 3000
      })
    },
    onError: (error) => {
      console.error('Lỗi upload CCCD:', error)
      toast.error('Upload CCCD thất bại, vui lòng thử lại!')
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

  // Kiểm tra trạng thái loading
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
      // Upload GPLX
      if (!docs.gplx.front || !docs.gplx.back) {
        toast.warning('Vui lòng upload đủ 2 mặt GPLX!')
        return
      }

      uploadLicenseMutation.mutate({
        frontFile: docs.gplx.front,
        backFile: docs.gplx.back
      })
    } else {
      // Upload CCCD
      if (!docs.cccd.front || !docs.cccd.back) {
        toast.warning('Vui lòng upload đủ 2 mặt CCCD!')
        return
      }

      uploadCitizenIdMutation.mutate({
        frontFile: docs.cccd.front,
        backFile: docs.cccd.back
      })
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688] p-6'>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='bg-slate-800/60 backdrop-blur-xl border-2 border-teal-400/40 rounded-2xl shadow-[0_0_40px_rgba(20,184,166,0.4)] p-8 w-full max-w-4xl space-y-6'
      >
        {/* Header */}
        <div className='text-center space-y-3'>
          <h1 className='text-3xl font-bold text-teal-300'>Upload Giấy tờ</h1>
          <p className='text-teal-400/70 text-sm'>Tải lên GPLX và CCCD theo thứ tự bất kỳ</p>
        </div>

        {/* Tabs Navigation */}
        <div className='flex gap-2 p-1.5 bg-slate-900/60 rounded-xl border border-teal-400/30'>
          <button
            type='button'
            onClick={() => setActiveTab('gplx')}
            className={`flex-1 relative px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'gplx'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                : 'text-teal-400/70 hover:text-teal-300 hover:bg-slate-800/50'
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
              <span>GPLX</span>
              {uploadSuccess.gplx && (
                <span className='ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs'>
                  ✓
                </span>
              )}
            </div>
          </button>

          <button
            type='button'
            onClick={() => setActiveTab('cccd')}
            className={`flex-1 relative px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'cccd'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                : 'text-teal-400/70 hover:text-teal-300 hover:bg-slate-800/50'
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
              <span>CCCD</span>
              {uploadSuccess.cccd && (
                <span className='ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs'>
                  ✓
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Progress Bar */}
        <ProgressBar uploadedCount={currentUploadedCount} maxCount={2} />

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className='space-y-6'
        >
          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-teal-300 flex items-center gap-2'>
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
              {activeTab === 'gplx' ? 'Giấy phép lái xe (GPLX)' : 'Căn cước công dân (CCCD)'}
            </h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <Field
                type={activeTab}
                side='front'
                label='Mặt trước'
                handleFileChange={handleFileChange}
                docs={docs}
                disabled={isUploading}
              />
              <Field
                type={activeTab}
                side='back'
                label='Mặt sau'
                handleFileChange={handleFileChange}
                docs={docs}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Hiển thị trạng thái upload */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center justify-center gap-3 bg-teal-500/20 border border-teal-400/40 rounded-lg p-4'
            >
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-teal-400' />
              <span className='text-teal-300 font-medium'>Đang upload...</span>
            </motion.div>
          )}

          {/* Hiển thị lỗi */}
          {(uploadLicenseMutation.isError || uploadCitizenIdMutation.isError) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-red-500/20 border border-red-400/40 rounded-lg p-4'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5 text-red-400'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                />
              </svg>
              <span className='text-red-300 font-medium'>Upload thất bại, vui lòng thử lại!</span>
            </motion.div>
          )}

          {/* Success message cho tab hiện tại */}
          {uploadSuccess[activeTab] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 bg-green-500/20 border border-green-400/40 rounded-lg p-4'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5 text-green-400'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
              </svg>
              <span className='text-green-300 font-medium'>
                Upload {activeTab === 'gplx' ? 'GPLX' : 'CCCD'} thành công!
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <Button
          isReady={isCurrentTabReady && !isUploading && !uploadSuccess[activeTab]}
          uploadedCount={currentUploadedCount}
          currentStep={activeTab === 'gplx' ? 1 : 2}
          isUploading={isUploading}
        />

        {/* Upload Status Summary */}
        <div className='flex items-center justify-center gap-4 pt-4 border-t border-teal-400/30'>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              uploadSuccess.gplx ? 'bg-green-500/20 border border-green-400/40' : 'bg-slate-700/50'
            }`}
          >
            <span className='text-sm text-teal-300'>GPLX:</span>
            <span className={`text-sm font-semibold ${uploadSuccess.gplx ? 'text-green-400' : 'text-gray-400'}`}>
              {uploadSuccess.gplx ? '✓ Hoàn thành' : 'Chưa upload'}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              uploadSuccess.cccd ? 'bg-green-500/20 border border-green-400/40' : 'bg-slate-700/50'
            }`}
          >
            <span className='text-sm text-teal-300'>CCCD:</span>
            <span className={`text-sm font-semibold ${uploadSuccess.cccd ? 'text-green-400' : 'text-gray-400'}`}>
              {uploadSuccess.cccd ? '✓ Hoàn thành' : 'Chưa upload'}
            </span>
          </div>
        </div>
      </motion.form>
    </div>
  )
}
