import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import groupApi from '../../apis/group.api'
import Skeleton from '../../components/Skeleton'
import path from '../../constants/path'
import { createGroupSchema, type CreateGroupSchema } from '../../utils/rule'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
import NumberInput from './components/NumberInput'
import TextAreaInput from './components/TextAreaInput'
import TextInput from './components/TextInput'
import PriceInput from './components/PriceInput/PriceInput'

export default function CreateGroups() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(createGroupSchema),
    mode: 'onSubmit',
    defaultValues: {
      vehicleImage: null,
      registrationImage: null
    }
  })

  const vehicleImage = watch('vehicleImage')
  const registrationImage = watch('registrationImage')
  const navigate = useNavigate()

  const groupMutation = useMutation({
    mutationFn: (body: FormData) => groupApi.CreateGroup(body),
    onSuccess: (response) => {
      console.log('Create group successful:', response?.data)
      toast.success('Group registration successful!')
      const fullPath = `${path.dashBoard}/${path.viewGroups}`
      navigate(fullPath)
    },
    onError: (error) => {
      toast.error('Group creation failed. Please try again!')
      console.error('Create group failed:', error)
    }
  })

  const onSubmit: SubmitHandler<CreateGroupSchema> = (data) => {
    const formData = new FormData()
    formData.append('groupName', data.groupName)
    formData.append('description', data.description || '')
    formData.append('memberCapacity', data.maxMembers.toString())
    formData.append('vehicleValue', data.assetValue.toString())
    formData.append('licensePlate', data.licensePlate)
    formData.append('chassisNumber', data.chassisNumber)

    if (data.vehicleImage && data.vehicleImage.length > 0) {
      Array.from(data.vehicleImage).forEach((file) => {
        formData.append('vehicleImages', file)
        formData.append('imageTypes', 'VEHICLE')
      })
    }

    if (data.registrationImage && data.registrationImage.length > 0) {
      Array.from(data.registrationImage).forEach((file) => {
        formData.append('vehicleImages', file)
        formData.append('imageTypes', 'REGISTRATION')
      })
    }
    groupMutation.mutate(formData)
  }

  return (
    <Fragment>
      {groupMutation.isPending && <Skeleton />}

      <div className='min-h-screen bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 flex items-center justify-center p-6 relative overflow-hidden'>
        {/* Holographic Background Effects */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className='absolute top-20 right-20 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[120px]'
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className='absolute bottom-20 left-20 w-[500px] h-[500px] bg-indigo-400/40 rounded-full blur-[120px]'
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, delay: 1 }}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-300/35 rounded-full blur-[100px]'
          />
        </div>

        <motion.div
          className='max-w-2xl w-full relative z-10'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Premium Liquid Glass Card */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className='backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2rem] shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 p-8 overflow-hidden'
          >
            {/* Top Gradient Bar */}
            <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

            {/* Header */}
            <Header />

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-5 mt-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Group Info */}
              <div className='grid grid-cols-2 gap-4'>
                <TextInput
                  label='Group name'
                  placeholder='Enter group name'
                  register={register('groupName')}
                  error={errors.groupName?.message}
                />
                <PriceInput
                  label='Enter asset value'
                  placeholder='Enter price (VND)'
                  register={register('assetValue')}
                  error={errors.assetValue?.message}
                  formatNumber={true}
                />
              </div>

              {/* License Info */}
              <div className='grid grid-cols-2 gap-4'>
                <TextInput
                  label='License plate number'
                  placeholder='29A-123.45'
                  register={register('licensePlate')}
                  error={errors.licensePlate?.message}
                />
                <TextInput
                  label='Chassis number'
                  placeholder='RLHRE7EXXXXXXXX'
                  register={register('chassisNumber')}
                  error={errors.chassisNumber?.message}
                />
              </div>

              {/* Image Uploads */}
              <div className='grid grid-cols-2 gap-4'>
                <FileUpload
                  label='Vehicle image'
                  file={vehicleImage || null}
                  register={register('vehicleImage')}
                  onRemove={(file) => {
                    if (vehicleImage) {
                      const dt = new DataTransfer()
                      Array.from(vehicleImage)
                        .filter((f) => f !== file)
                        .forEach((f) => dt.items.add(f))
                      setValue('vehicleImage', dt.files.length ? dt.files : null)
                    }
                  }}
                  color='teal'
                  error={errors.vehicleImage?.message}
                />
                <FileUpload
                  label='Car parrot shape'
                  file={registrationImage || null}
                  register={register('registrationImage')}
                  onRemove={(file) => {
                    if (registrationImage) {
                      const dt = new DataTransfer()
                      Array.from(registrationImage)
                        .filter((f) => f !== file)
                        .forEach((f) => dt.items.add(f))
                      setValue('registrationImage', dt.files.length ? dt.files : null)
                    }
                  }}
                  color='teal'
                  error={errors.registrationImage?.message}
                />
              </div>

              {/* Member Count */}
              <NumberInput
                label='Number of members'
                placeholder='Enter member number'
                register={register('maxMembers')}
                error={errors.maxMembers?.message}
              />

              {/* Description */}
              <TextAreaInput
                label='Describe'
                placeholder='Enter a description of the group (optional)'
                register={register('description')}
                error={errors.description?.message}
              />

              {/* Submit Button */}
              <motion.button
                type='submit'
                disabled={groupMutation.isPending}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 40px rgba(6,182,212,0.8), 0 0 60px rgba(14,165,233,0.5)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className='w-full bg-gradient-to-r from-cyan-400 to-sky-500 text-white py-3.5 rounded-xl font-bold text-lg tracking-wide shadow-[0_8px_32px_rgba(6,182,212,0.6),0_0_20px_rgba(6,182,212,0.4)] border-[2px] border-white/40 hover:border-white/60 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {groupMutation.isPending ? 'Pending...' : 'Create Group'}
              </motion.button>
            </motion.form>

            {/* Bottom Gradient Bar */}
            <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
          </motion.div>
        </motion.div>
      </div>
    </Fragment>
  )
}
