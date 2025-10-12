import type { UseFormRegisterReturn } from 'react-hook-form'

interface ITextAreaInput {
  label: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: string
}

export default function TextAreaInput({ label, placeholder, register, error }: ITextAreaInput) {
  return (
    <div>
      <label className='block text-xs font-medium text-gray-300 mb-1.5'>{label}</label>
      <textarea
        {...register}
        // mặc định 2 dòng
        rows={2}
        placeholder={placeholder}
        //resize-none khóa không cho thay đổi kích thước
        className={`w-full px-3 py-2 text-sm bg-slate-800/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 outline-none resize-none ${
          error ? 'border-2 border-red-500 focus:ring-red-400' : 'border border-slate-700 focus:ring-teal-500'
        }`}
      />
      {error && <p className='text-xs text-red-400 mt-1'>{error}</p>}
    </div>
  )
}
