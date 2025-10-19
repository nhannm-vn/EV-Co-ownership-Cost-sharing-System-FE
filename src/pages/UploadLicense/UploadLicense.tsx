import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Field from './components/Field'
import ProgressBar from './components/ProgressBar'
import Button from './components/Button'

export type DocType = 'gplx' | 'cccd'
export type DocSide = 'front' | 'back'

export interface DocFiles {
  front: File | null
  back: File | null
}

export default function UploadLicense() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState<Record<DocType, boolean>>({
    gplx: false,
    cccd: false
  })

  const [docs, setDocs] = useState<Record<DocType, DocFiles>>({
    gplx: { front: null, back: null },
    cccd: { front: null, back: null }
  })

  // Đếm file của form hiện tại
  const currentUploadedCount = useMemo(() => {
    const currentDoc = currentStep === 1 ? docs.gplx : docs.cccd
    let count = 0
    if (currentDoc.front) count++
    if (currentDoc.back) count++
    return count
  }, [docs, currentStep])

  // Kiểm tra form hiện tại đã đủ 2 file chưa
  const isCurrentStepReady = useMemo(() => currentUploadedCount === 2, [currentUploadedCount])

  const handleFileChange = (type: DocType, side: DocSide, file: File | null) => {
    setDocs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [side]: file
      }
    }))
  }

  // Upload function cho từng bước
  const handleUploadStep = async (type: DocType) => {
    setIsUploading(true)

    const formData = new FormData()
    const currentDoc = docs[type]

    if (currentDoc.front) {
      formData.append('front', currentDoc.front)
    }
    if (currentDoc.back) {
      formData.append('back', currentDoc.back)
    }
    formData.append('type', type)

    try {
      // Giả lập API call - thay bằng endpoint thực tế của bạn
      const response = await fetch('YOUR_API_ENDPOINT/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        console.log(`Upload ${type} thành công:`, result)

        // Đánh dấu đã upload thành công
        setUploadSuccess((prev) => ({ ...prev, [type]: true }))

        // Chuyển sang bước tiếp theo nếu là GPLX
        if (type === 'gplx') {
          setTimeout(() => {
            setCurrentStep(2)
            setIsUploading(false)
          }, 500)
        } else {
          // Hoàn thành tất cả
          setIsUploading(false)
          alert('Tất cả giấy tờ đã được upload thành công!')
        }
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Lỗi upload:', error)
      alert('Upload thất bại, vui lòng thử lại!')
      setIsUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const currentType = currentStep === 1 ? 'gplx' : 'cccd'
    handleUploadStep(currentType)
  }

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
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
        {/* Header với step indicator */}
        <div className='text-center space-y-3'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                uploadSuccess.gplx
                  ? 'border-green-500 bg-green-500 text-white'
                  : currentStep === 1
                    ? 'border-teal-400 bg-teal-500 text-white'
                    : 'border-slate-600 bg-slate-800 text-slate-500'
              }`}
            >
              {uploadSuccess.gplx ? '✓' : '1'}
            </div>
            <div className='h-1 w-16 bg-slate-600 rounded-full overflow-hidden'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: currentStep === 2 || uploadSuccess.gplx ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
                className='h-full bg-gradient-to-r from-teal-400 to-cyan-400'
              />
            </div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold ${
                uploadSuccess.cccd
                  ? 'border-green-500 bg-green-500 text-white'
                  : currentStep === 2
                    ? 'border-teal-400 bg-teal-500 text-white'
                    : 'border-slate-600 bg-slate-800 text-slate-500'
              }`}
            >
              {uploadSuccess.cccd ? '✓' : '2'}
            </div>
          </div>

          <h1 className='text-3xl font-bold text-teal-300'>{currentStep === 1 ? 'Upload GPLX' : 'Upload CCCD'}</h1>
          <p className='text-teal-400/70 text-sm'>
            {currentStep === 1 ? 'Bước 1: Tải lên 2 mặt Giấy phép lái xe' : 'Bước 2: Tải lên 2 mặt Căn cước công dân'}
          </p>

          <ProgressBar uploadedCount={currentUploadedCount} maxCount={2} />
        </div>

        {/* Form hiện tại */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className='space-y-6'
        >
          {currentStep === 1 ? (
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
                Giấy phép lái xe (GPLX)
              </h3>
              <div className='grid md:grid-cols-2 gap-4'>
                <Field
                  type='gplx'
                  side='front'
                  label='Mặt trước'
                  handleFileChange={handleFileChange}
                  docs={docs}
                  disabled={isUploading}
                />
                <Field
                  type='gplx'
                  side='back'
                  label='Mặt sau'
                  handleFileChange={handleFileChange}
                  docs={docs}
                  disabled={isUploading}
                />
              </div>
            </div>
          ) : (
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
                Căn cước công dân (CCCD)
              </h3>
              <div className='grid md:grid-cols-2 gap-4'>
                <Field
                  type='cccd'
                  side='front'
                  label='Mặt trước'
                  handleFileChange={handleFileChange}
                  docs={docs}
                  disabled={isUploading}
                />
                <Field
                  type='cccd'
                  side='back'
                  label='Mặt sau'
                  handleFileChange={handleFileChange}
                  docs={docs}
                  disabled={isUploading}
                />
              </div>
            </div>
          )}

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
        </motion.div>

        {/* Navigation buttons */}
        <div className='flex gap-3'>
          {currentStep === 2 && !isUploading && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='button'
              onClick={handleBack}
              className='flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
              Quay lại
            </motion.button>
          )}

          <Button
            isReady={isCurrentStepReady && !isUploading}
            uploadedCount={currentUploadedCount}
            currentStep={currentStep}
            isUploading={isUploading}
          />
        </div>
      </motion.form>
    </div>
  )
}
