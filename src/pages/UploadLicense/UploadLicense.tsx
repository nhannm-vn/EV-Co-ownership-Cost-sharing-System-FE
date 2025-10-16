import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Field from './components/Field'
import ProgressBar from './components/ProgressBar'
import Button from './components/Button'

// Định nghĩa type cho 2 loại giấy tờ: GPLX & CCCD
export type DocType = 'gplx' | 'cccd'
export type DocSide = 'front' | 'back'

// Type cho document với 2 mặt
export interface DocFiles {
  front: File | null
  back: File | null
}

export default function UploadLicense() {
  // State lưu file cho 2 loại giấy tờ với 2 mặt mỗi loại
  const [docs, setDocs] = useState<Record<DocType, DocFiles>>({
    gplx: { front: null, back: null },
    cccd: { front: null, back: null }
  })

  // Kiểm tra xem đã upload đủ tất cả mặt chưa
  const isReady = useMemo(() => Boolean(docs.gplx.front && docs.gplx.back && docs.cccd.front && docs.cccd.back), [docs])

  // Đếm số file đã upload để hiển thị lên thanh tiến độ
  //nghĩa là nó sẽ đếm lại số lượng file nếu như có thay đổi
  const uploadedCount = useMemo(() => {
    let count = 0
    Object.values(docs).forEach((doc) => {
      if (doc.front) count++
      if (doc.back) count++
    })
    return count
  }, [docs])

  // Hàm thay đổi file cho từng loại giấy tờ và mặt
  //nghĩa là khi có file hình ảnh thay đổi thì hãy setState lại
  const handleFileChange = (type: DocType, side: DocSide, file: File | null) => {
    setDocs((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [side]: file
      }
    }))
  }

  // Hàm submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(docs)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688] p-6'>
      {/* Form chính */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='bg-slate-800/60 backdrop-blur-xl border-2 border-teal-400/40 rounded-2xl shadow-[0_0_40px_rgba(20,184,166,0.4)] p-8 w-full max-w-4xl space-y-6'
      >
        {/* Header */}
        <div className='text-center space-y-3'>
          <h1 className='text-3xl font-bold text-teal-300'>Upload License Documents</h1>
          <p className='text-teal-400/70 text-sm'>Vui lòng tải lên đầy đủ 2 mặt của GPLX và CCCD</p>
          {/* Progress Bar */}
          <ProgressBar uploadedCount={uploadedCount} />
        </div>

        {/* Upload Fields */}
        <div className='space-y-6'>
          {/* GPLX Section */}
          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-teal-300 flex items-center gap-2'>Giấy phép lái xe (GPLX)</h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <Field type='gplx' side='front' label='Mặt trước' handleFileChange={handleFileChange} docs={docs} />
              <Field type='gplx' side='back' label='Mặt sau' handleFileChange={handleFileChange} docs={docs} />
            </div>
          </div>

          {/* CCCD Section */}
          <div className='space-y-3'>
            <h3 className='text-lg font-bold text-teal-300 flex items-center gap-2'>Căn cước công dân (CCCD)</h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <Field type='cccd' side='front' label='Mặt trước' handleFileChange={handleFileChange} docs={docs} />
              <Field type='cccd' side='back' label='Mặt sau' handleFileChange={handleFileChange} docs={docs} />
            </div>
          </div>
        </div>

        {/* Button submit */}
        <Button isReady={isReady} uploadedCount={uploadedCount} />
      </motion.form>
    </div>
  )
}
