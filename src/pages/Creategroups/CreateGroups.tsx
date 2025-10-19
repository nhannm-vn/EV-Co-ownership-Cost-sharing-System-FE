import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import userApi from '../../apis/user.api'
import Skeleton from '../../components/Skeleton'
import path from '../../constants/path'
import { createGroupSchema, type CreateGroupSchema } from '../../utils/rule'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
import NumberInput from './components/NumberInput'
import TextAreaInput from './components/TextAreaInput'
import TextInput from './components/TextInput'

// ==================== MAIN COMPONENT ====================
export default function CreateGroups() {
  // //  trạng thái cho các file hình ảnh của xe  để lưu trữ
  // const [vehicleImage, setVehicleImage] = useState<File | null>(null)
  // // trạng thái cho các file hình ảnh cà vẹt xe
  // const [registrationImage, setRegistrationImage] = useState<File | null>(null)

  // Form hook
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
      // phải set mặc định là null  để hiển thị đúng trong file upload
      // nếu khong set null thì nó sẽ fileList mà mảng trả ra true sai logic
      vehicleImage: null,
      registrationImage: null
    }
  })
  // không dùng useState mà dùng watch tránh hiện tượng render lại nhiều lần
  const vehicleImage = watch('vehicleImage')
  const registrationImage = watch('registrationImage')
  const navigate = useNavigate()
  // xử lí call API
  const groupMutation = useMutation({
    mutationFn: (body: FormData) => userApi.CreateGroup(body),
    onSuccess: (response) => {
      console.log('Create group successful:', response?.data)
      toast.success('đăng kí tạo group thành công!')
      const fullPath = `${path.dashBoard}/${path.viewGroups}`

      navigate(fullPath, {
        state: {
          newGroup: response?.data
        }
      })
    },
    onError: (error) => {
      toast.error('đăng kí tạo group thất bại. Vui lòng thử lại!')
      console.error('Create group failed:', error)
    }
  })

  // Submit form data
  const onSubmit: SubmitHandler<CreateGroupSchema> = (data) => {
    // tạo form data
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

  // ==================== RENDER ====================
  return (
    <Fragment>
      {groupMutation.isPending && <Skeleton />}

      <div className='min-h-screen bg-gradient-to-br from-[#002b36] via-[#014d4d] to-[#009688] flex items-center justify-center p-6'>
        <motion.div
          className='max-w-2xl w-full'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Card viền ánh sáng xanh ngọc bích điện tử */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className='bg-gradient-to-br from-[#0d9488] via-[#14b8a6] to-[#5eead4] p-[2px] rounded-2xl shadow-[0_0_35px_rgba(20,184,166,0.6)]'
          >
            <div className='bg-gradient-to-br from-[#011f26] via-[#013a3a] to-[#025959] rounded-2xl p-7'>
              {/* Header */}
              <Header />

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Group name */}
                <div className='grid grid-cols-2 gap-3'>
                  <TextInput
                    label='Tên Group'
                    placeholder='Nhập tên group'
                    register={register('groupName')}
                    error={errors.groupName?.message}
                  />
                  <TextInput
                    label='Nhập giá trị tài sản'
                    placeholder='Nhập giá tiền (VNĐ)'
                    register={register('assetValue')}
                    error={errors.assetValue?.message}
                  />
                </div>

                {/* License plate and chassis number */}
                <div className='grid grid-cols-2 gap-3'>
                  <TextInput
                    label='Biển số xe'
                    placeholder='29A-123.45'
                    register={register('licensePlate')}
                    error={errors.licensePlate?.message}
                  />
                  <TextInput
                    label='Số khung xe'
                    placeholder='RLHRE7EXXXXXXXX'
                    register={register('chassisNumber')}
                    error={errors.chassisNumber?.message}
                  />
                </div>

                {/* Image uploads */}
                {/* phải  dùng kiểu File[] mới có thể dùng map với filter , fileList không dùng được */}

                <div className='grid grid-cols-2 gap-3'>
                  <FileUpload
                    label='Hình ảnh xe'
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
                    label='Hình cà vẹt xe'
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
                <NumberInput
                  label='Số thành viên'
                  placeholder='Nhập số thành viên'
                  register={register('maxMembers')}
                  error={errors.maxMembers?.message}
                />

                {/* Description */}
                <TextAreaInput
                  label='Mô tả'
                  placeholder='Nhập mô tả về group (tùy chọn)'
                  register={register('description')}
                  error={errors.description?.message}
                />

                {/* Submit button */}
                <motion.button
                  type='submit'
                  disabled={groupMutation.isPending}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 35px rgba(45, 212, 191, 0.7)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className='w-full bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#5eead4] text-white py-3 rounded-xl font-bold text-lg tracking-wide hover:opacity-95 transition-all duration-300'
                >
                  {groupMutation.isPending ? 'Đang xử lý...' : 'Tạo Group'}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Fragment>
  )
}
