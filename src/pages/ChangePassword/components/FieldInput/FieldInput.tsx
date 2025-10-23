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
    oldPassword: boolean
    newPassword: boolean
    confirmPassword: boolean
  }
  toggleShow: (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => void
  register: UseFormRegister<{
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }>
}

function FieldInput({ label, name, type, error, show, toggleShow, register }: IFieldInput) {
  return (
    <motion.div className='space-y-2'>
      <label className='text-sm font-semibold text-white/80'>{label}</label>
      <div className='relative'>
        <input
          type={show[type] ? 'text' : 'password'}
          {...register(name)}
          placeholder={label}
          className={`w-full px-4 py-3 rounded-xl 
                 bg-white/10 backdrop-blur-lg
                 border-[2px] ${error ? 'border-red-300/60' : 'border-white/30'} 
                 text-white placeholder-white/50
                 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]
                 focus:outline-none focus:ring-[3px] ${
                   error
                     ? 'focus:ring-red-300/50 focus:border-red-300'
                     : 'focus:ring-cyan-300/50 focus:border-cyan-200/60'
                 }
                 hover:border-white/50 hover:bg-white/15
                 transition-all duration-400`}
        />
        <button
          type='button'
          onClick={() => toggleShow(type)}
          className='absolute right-3 top-1/2 -translate-y-1/2 
                     text-white/60 hover:text-cyan-200
                     transition-colors duration-300'
        >
          <EyeIcon open={show[type]} />
        </button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-xs text-red-200 font-medium'
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

export default FieldInput
