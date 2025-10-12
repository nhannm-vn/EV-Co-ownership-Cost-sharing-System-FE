import type { UseFormRegisterReturn } from 'react-hook-form'

interface ITextInput {
  // hiển thị tên ô nhập
  label: string
  // hiển thị gợi ý trong ô nhập
  placeholder: string
  // kiểu dữ liệu của react-hook-form để kết nối input với form
  register: UseFormRegisterReturn
  error?: string
}

export default function TextInput({ label, placeholder, register, error }: ITextInput) {
  return (
    <div>
      <label className='block text-xs font-medium text-gray-300 mb-1.5'>
        {label} <span className='text-teal-400'>*</span>
      </label>
      <input
        type='text'
        {...register} // thêm các hàm onChange , onBlur , ref , name vào input
        placeholder={placeholder}
        className='w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 outline-none'
      />
      {error && <p className='text-xs text-red-400 mt-1'>{error}</p>}
    </div>
  )
}
