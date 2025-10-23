import { UploadOutlined } from '@ant-design/icons'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface IFileUpload {
  label: string
  file: FileList | null
  register: UseFormRegisterReturn
  onRemove: (file: File) => void
  color: 'teal'
  error?: string
}

export default function FileUpload({ label, file, register, onRemove, error }: IFileUpload) {
  return (
    <div>
      <label className='block text-xs font-semibold text-white/80 mb-2'>
        {label} <span className='text-cyan-300'>*</span>
      </label>

      {!file || file.length === 0 ? (
        <label
          className={`cursor-pointer rounded-xl p-4 text-center bg-white/10 backdrop-blur-lg h-24 flex flex-col items-center justify-center group transition-all duration-400 ${
            error
              ? 'border-[2px] border-dashed border-red-300/60 hover:border-red-300 hover:bg-red-400/10'
              : 'border-[2px] border-dashed border-cyan-300/50 hover:border-cyan-200 hover:bg-white/15'
          }`}
        >
          <div className='w-10 h-10 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] border-[2px] border-white/40'>
            <UploadOutlined className='text-white text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' />
          </div>
          <p className='text-xs text-white/70 font-medium'>Chọn {label.toLowerCase()}</p>
          <input
            type='file'
            accept='image/*'
            multiple
            {...register}
            onChange={(e) => {
              register.onChange(e)
            }}
            className='hidden'
          />
        </label>
      ) : (
        <div className='bg-white/10 backdrop-blur-lg border-[2px] border-white/30 rounded-xl p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]'>
          {file &&
            file.length > 0 &&
            Array.from(file).map((f, index) => (
              <div
                key={index}
                className='flex items-center gap-2 flex-1 min-w-0 mb-2 last:mb-0 bg-white/5 rounded-lg p-2 border border-white/20'
              >
                <UploadOutlined className='text-base text-cyan-200 flex-shrink-0 drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]' />
                <div className='flex items-center flex-1 min-w-0'>
                  <p className='text-xs text-white/80 truncate flex-1 font-medium'>{f.name}</p>
                  <button
                    type='button'
                    onClick={() => onRemove(f)}
                    className='text-red-300 hover:text-red-200 text-xs ml-2 flex-shrink-0 font-semibold px-2 py-1 rounded bg-red-400/20 hover:bg-red-400/30 transition-colors duration-300'
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {error && <p className='text-xs text-red-200 mt-1.5 font-medium'>{error}</p>}
    </div>
  )
}
