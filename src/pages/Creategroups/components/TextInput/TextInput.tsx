import type { UseFormRegisterReturn } from 'react-hook-form'

interface ITextInput {
  label: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: string
}

export default function TextInput({ label, placeholder, register, error }: ITextInput) {
  return (
    <div>
      <label className='block text-xs font-semibold text-white/80 mb-2'>
        {label} <span className='text-cyan-300'>*</span>
      </label>
      <input
        type='text'
        {...register}
        placeholder={placeholder}
        className={`w-full px-4 py-3 text-sm bg-white/10 backdrop-blur-lg rounded-xl text-white placeholder-white/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-[3px] hover:bg-white/15 transition-all duration-400 ${
          error
            ? 'border-[2px] border-red-300/60 focus:ring-red-300/50 focus:border-red-300 hover:border-red-300/80'
            : 'border-[2px] border-white/30 focus:ring-cyan-300/50 focus:border-cyan-200/60 hover:border-white/50'
        }`}
      />
      {error && <p className='text-xs text-red-200 mt-1.5 font-medium'>{error}</p>}
    </div>
  )
}
