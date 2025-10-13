import { UploadOutlined } from '@ant-design/icons'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface IFileUpload {
  label: string
  file: FileList | null
  //hàm xử lí khi chọn file
  register: UseFormRegisterReturn
  // hàm xử lí khi xóa file
  onRemove: (file: File) => void
  // màu teal (xanh ngọc bích)
  color: 'teal'
  error?: string
}

export default function FileUpload({ label, file, register, onRemove, error }: IFileUpload) {
  // console.log(file)

  return (
    <div>
      <label className='block text-xs font-medium text-gray-300 mb-1.5'>
        {label} <span className='text-teal-400'>*</span>
      </label>
      {/* Upload button */}
      {/* nếu chưa có file thì hiển thị */}

      {!file || file.length === 0 ? (
        // group là để hover vào icon nó phóng to lên thằng cha thay đổi thì con thay đổi theo
        // khi cha đổi màu viền thì con phóng to theo
        // phải bọc vào label vì input type file nó ẩn nên phải bọc vào label để khi click vào label là click vào input file
        <label
          className={`cursor-pointer rounded-lg p-3 text-center bg-slate-800/30 h-20 flex flex-col items-center justify-center group ${
            error
              ? 'border-2 border-dashed border-red-500 hover:border-red-400'
              : 'border-2 border-dashed border-teal-500/50 hover:border-teal-400'
          }`}
        >
          <div className='w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-500 rounded-lg flex items-center justify-center mb-1 group-hover:scale-110 transition'>
            {/* text-base là font-size mặc định 16px */}
            <UploadOutlined className='text-white text-base' />
          </div>
          <p className='text-xs text-gray-300'>Chọn {label.toLowerCase()}</p>
          <input
            type='file'
            accept='image/*'
            multiple
            {...register}
            onChange={(e) => {
              register.onChange(e) // gọi onChange của react-hook-form
            }}
            className='hidden'
          />
        </label>
      ) : (
        // File info display
        <div className='bg-slate-800/50 border border-slate-700 rounded-lg p-3'>
          {file &&
            file.length > 0 &&
            Array.from(file).map((f, index) => (
              <div key={index} className='flex items-center gap-2 flex-1 min-w-0 mb-4 '>
                <UploadOutlined
                  // flex-shrink-0 để icon không bị co lại khi tên file dài
                  className='text-base text-teal-400 flex-shrink-0'
                />
                {/* truncate là cắt ngắn văn bản nếu quá dài */}
                <p className='text-xs text-gray-300 truncate'>
                  {f.name}{' '}
                  <button
                    type='button'
                    onClick={() => onRemove(f)}
                    className='text-red-400 hover:text-red-300 text-xs ml-2 flex-shrink-0'
                  >
                    Xóa
                  </button>
                </p>
              </div>
            ))}
        </div>
      )}
      {error && <p className='text-xs text-red-400 mt-1'>{error}</p>}
    </div>
  )
}
