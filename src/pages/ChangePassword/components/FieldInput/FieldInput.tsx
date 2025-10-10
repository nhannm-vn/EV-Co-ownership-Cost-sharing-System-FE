import { motion } from 'framer-motion'
import type { UseFormRegister } from 'react-hook-form'
import type { ChangePasswordSchema } from '../../../../utils/rule'
import EyeIcon from '../EyeIcon'

interface IFieldInput {
  label: string
  name: keyof ChangePasswordSchema
  type: keyof ChangePasswordSchema
  error?: string
  show: {
    currentPassword: boolean
    newPassword: boolean
    confirmPassword: boolean
  }
  toggleShow: (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => void
  register: UseFormRegister<{
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }>
}

function FieldInput({ label, name, type, error, show, toggleShow, register }: IFieldInput) {
  return (
    <motion.div className='space-y-1'>
      <label className='text-sm text-gray-300'>{label}</label>
      <div className='relative'>
        <input
          type={show[type] ? 'text' : 'password'}
          {...register(name)}
          placeholder={label}
          className={`w-full px-4 py-3 rounded-xl 
                 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950
                 border ${error ? 'border-red-500' : 'border-indigo-600/50'} 
                 text-white placeholder-gray-500
                 focus:outline-none focus:ring-2 ${
                   error ? 'focus:ring-red-400' : 'focus:ring-indigo-400'
                 } focus:border-transparent`}
        />
        <button
          type='button'
          onClick={() => toggleShow(type)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-300'
        >
          <EyeIcon open={show[type]} />
        </button>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className='text-xs text-red-400'>
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default FieldInput
