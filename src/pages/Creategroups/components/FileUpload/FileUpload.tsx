import { UploadOutlined } from '@ant-design/icons'
import React, { type ChangeEvent } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
interface IFileUpload {
  label: string
  file: File | null
  //hàm xư lí khi chọn file
  register: UseFormRegisterReturn
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  // hàm xứ lí khi xóa file
  onRemove: () => void
  // tím đậm và tím nhạt
  color: 'purple' | 'violet'
  error?: string
}
export default function FileUpload({ label, file, onChange, onRemove, color, error }: IFileUpload) {
  // kiểm tra có phải màu tím không
  const isPurple = color === 'purple'
  return (
    <div>
      <label className='block text-xs font-medium text-gray-300 mb-1.5'>
        {label} <span className='text-purple-400'>*</span>
      </label>

      {/* Upload button */}
      {/* nếu chưa có file thì hiển thị */}
      {!file ? (
        // group là để hover vào icon nó phóng to lên thằng cha thay đổi thì con thay đổi theo
        // khi cha đổi màu viền thì con phóng to theo
        // phải bọc vào label vì input type file nó ẩn nên phải bọc vào label để khi click vào label là click vào input file
        <label
          className={`cursor-pointer border-2 border-dashed ${isPurple ? 'border-purple-500/50 hover:border-purple-400' : 'border-violet-500/50 hover:border-violet-400'} rounded-lg p-3 text-center bg-slate-800/30 h-20 flex flex-col items-center justify-center group`}
        >
          <div
            className={`w-8 h-8 bg-gradient-to-br ${isPurple ? 'from-purple-600 to-violet-600' : 'from-violet-600 to-purple-600'} rounded-lg flex items-center justify-center mb-1 group-hover:scale-110 transition`}
          >
            {/* text-base là font-sizre mặc định 16px */}
            <UploadOutlined className='text-white text-base' />
          </div>
          <p className='text-xs text-gray-300'>Chọn {label.toLowerCase()}</p>
          <input type='file' accept='image/*' onChange={onChange} className='hidden' />
        </label>
      ) : (
        // File info display
        <div className='bg-slate-800/50 border border-slate-700 rounded-lg p-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <UploadOutlined
                // flex-shrink-0 để icon không bị co lại khi tên file dài
                className={`text-base ${isPurple ? 'text-purple-400' : 'text-violet-400'} flex-shrink-0`}
              />
              {/* truncate là cắt ngắn văn bản nếu quá dài */}
              <p className='text-xs text-white truncate'>{file.name}</p>
            </div>
            <button
              type='button'
              onClick={onRemove}
              className='text-red-400 hover:text-red-300 text-xs ml-2 flex-shrink-0'
            >
              Xóa
            </button>
          </div>
        </div>
      )}
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  )
}
