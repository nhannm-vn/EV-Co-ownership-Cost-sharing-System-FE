import React from 'react'
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
      <label className='block text-xs font-medium text-gray-300 mb-1.5'>
        {label} <span className='text-purple-400'>*</span>
      </label>
      <input
        type='number'
        {...register}
        placeholder={placeholder}
        className='w-full px-3 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      />
      {error && <p className='text-xs text-red-400'>{error}</p>}
    </div>
  )
}
