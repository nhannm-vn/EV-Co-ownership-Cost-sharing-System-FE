import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Field from './components/Field'

// Định nghĩa type cho 2 loại giấy tờ: GPLX & CCCD
export type DocType = 'gplx' | 'cccd'

export default function UploadLicense() {
  // State lưu file cho 2 loại giấy tờ
  const [docs, setDocs] = useState<Record<DocType, File | null>>({
    gplx: null,
    cccd: null
  })

  // Kiểm tra xem đã upload đủ 2 loại chưa
  const isReady = useMemo(() => Boolean(docs.gplx && docs.cccd), [docs])

  // Hàm thay đổi file cho từng loại giấy tờ
  const handleFileChange = (type: DocType, file: File | null) => {
    setDocs((prev) => ({ ...prev, [type]: file }))
  }

  // Hàm submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    return !isReady ? alert('Vui lòng upload đủ GPLX và CCCD!') : alert('Upload thành công!')
  }

  return (
    <div
      //Nền gradient tím lung linh huyền ảo
      className='min-h-screen flex items-center justify-center 
                 bg-gradient-to-br from-[#2a0e37] via-[#5b239d] to-[#8b5cf6]
                 p-6'
    >
      {/* Form chính */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='bg-white/5 backdrop-blur-lg 
                   border border-violet-400/40 
                   rounded-2xl 
                   shadow-[0_0_40px_rgba(139,92,246,0.7)] 
                   p-6 w-full max-w-md space-y-6'
      >
        {/* Title nổi bật với chữ trắng + glow tím */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='text-3xl font-extrabold text-center 
                     text-white drop-shadow-[0_0_15px_rgba(192,132,252,0.6)] 
                     font-sans'
        >
          Upload License
        </motion.h1>

        {/* Sub text hướng dẫn */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='text-center font-serif text-white/80 text-sm'
        >
          Vui lòng tải lên GPLX và CCCD
        </motion.p>

        {/* Component upload file cho từng loại giấy tờ */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
          className='space-y-4'
        >
          {/* Map qua object chứa hai loại giấy tờ để bỏ vào trong component custom để hiện ra */}
          {[
            { type: 'gplx' as DocType, label: 'Giấy phép lái xe (GPLX)' },
            { type: 'cccd' as DocType, label: 'Căn cước công dân (CCCD)' }
          ].map((field, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <Field type={field.type} label={field.label} handleFileChange={handleFileChange} docs={docs} />
            </motion.div>
          ))}
        </motion.div>

        {/* Button submit */}
        <motion.button
          whileHover={{ scale: isReady ? 1.05 : 1 }}
          whileTap={{ scale: isReady ? 0.95 : 1 }}
          type='submit'
          disabled={!isReady}
          className='w-full py-3 rounded-lg text-sm font-semibold
                     bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 
                     text-white 
                     shadow-[0_0_25px_rgba(167,139,250,0.8)] 
                     hover:shadow-[0_0_35px_rgba(216,180,254,0.9)]
                     hover:scale-[1.03] active:scale-95 transition
                     disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Xác nhận Upload
        </motion.button>
      </motion.form>
    </div>
  )
}
