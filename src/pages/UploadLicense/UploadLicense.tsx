import { useMemo, useState } from 'react'
import Field from './components/Field'

//Định nghĩa type cho hai loại giấy tờ
export type DocType = 'gplx' | 'cccd'

export default function UploadLicense() {
  //Tạo state lưu hai loại giấy tờ
  const [docs, setDocs] = useState<Record<DocType, File | null>>({
    gplx: null,
    cccd: null
  })

  //Check xem có đầy đủ cả 2 loại giấy tờ không
  const isReady = useMemo(() => Boolean(docs.gplx && docs.cccd), [docs])

  //hàm nhận vào loại thấy tờ và set state lại
  const handleFileChange = (type: DocType, file: File | null) => {
    setDocs((prev) => ({ ...prev, [type]: file }))
  }

  //hàm hiển thị khi submit thành công
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    return !isReady ? alert('Vui lòng upload đủ GPLX và CCCD!') : alert('Upload thành công!')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e093d] via-[#2b0f57] to-[#3a0e72] p-4'>
      {/* Form dùng để quản lí và có thể submit lên server */}
      <form
        onSubmit={handleSubmit}
        className='bg-white/5 backdrop-blur-lg border border-violet-600/40 
                   rounded-xl shadow-[0_0_30px_rgba(109,40,217,0.6)] 
                   p-6 w-full max-w-md space-y-6'
      >
        <h1
          className='text-2xl font-bold text-center bg-clip-text text-transparent 
                       bg-gradient-to-r from-fuchsia-200 via-violet-300 to-purple-400
                       drop-shadow-[0_0_10px_rgba(147,51,234,0.6)]'
        >
          Upload Giấy Tờ
        </h1>
        <p className='text-center text-violet-300/70 text-xs'>Vui lòng tải lên GPLX và CCCD</p>

        {/* Hai component đã tách ra nhận vào lần lượt các state và hàm setState để up load cái hình và lưu lại được*/}
        <Field type='gplx' label='Giấy phép lái xe (GPLX)' handleFileChange={handleFileChange} docs={docs} />
        <Field type='cccd' label='Căn cước công dân (CCCD)' handleFileChange={handleFileChange} docs={docs} />

        <button
          type='submit'
          // Mình sẽ cho con chuột cấm nếu như chưa tải đủ thì không cho chọn
          disabled={!isReady}
          className='w-full py-2.5 rounded-lg text-sm font-semibold
                     bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 
                     text-white shadow-[0_0_25px_rgba(109,40,217,0.7)] 
                     hover:shadow-[0_0_35px_rgba(147,51,234,0.8)]
                     hover:scale-[1.02] active:scale-95 transition
                     disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Xác nhận Upload
        </button>
      </form>
    </div>
  )
}
