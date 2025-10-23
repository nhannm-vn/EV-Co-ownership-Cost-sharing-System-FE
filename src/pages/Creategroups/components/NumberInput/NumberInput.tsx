import type { UseFormRegisterReturn } from 'react-hook-form'

interface INumberInput {
  label: string
  placeholder: string
  register: UseFormRegisterReturn
  error?: string
}

export default function NumberInput({ label, placeholder, register, error }: INumberInput) {
  return (
    <div>
      <label className='block text-xs font-semibold text-white/80 mb-2'>
        {label} <span className='text-indigo-300'>*</span>
      </label>
      <input
        type='number'
        {...register}
        placeholder={placeholder}
        className='w-full px-4 py-3 text-sm bg-white/10 backdrop-blur-lg border-[2px] border-white/30 rounded-xl text-white placeholder-white/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-[3px] focus:ring-indigo-300/50 focus:border-indigo-200/60 hover:border-white/50 hover:bg-white/15 transition-all duration-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      />
      {error && <p className='text-xs text-red-200 mt-1.5 font-medium'>{error}</p>}
    </div>
  )
}
