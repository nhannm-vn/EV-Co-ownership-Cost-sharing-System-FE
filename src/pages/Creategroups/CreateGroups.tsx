import { yupResolver } from '@hookform/resolvers/yup'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { createGroupSchema, type CreateGroupSchema } from '../../utils/rule'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
import NumberInput from './components/NumberInput'
import TextAreaInput from './components/TextAreaInput'
import TextInput from './components/TextInput'

// ==================== TYPES ====================
// định nghĩa kiểu dữ liệu form

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
  } = useForm<CreateGroupSchema>({ resolver: yupResolver(createGroupSchema), mode: 'onSubmit' })

  const vehicleImage = watch('vehicleImage')
  const registrationImage = watch('registrationImage')

  // Submit form data
  const onSubmit: SubmitHandler<CreateGroupSchema> = (data) => {
    console.log(data, vehicleImage, registrationImage)
    alert('Form submitted! Check console for data.')
  }

  // ==================== RENDER ====================
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4'>
      <div className='max-w-2xl w-full'>
        {/* Card with gradient border */}
        <div className='bg-gradient-to-br from-purple-600 via-purple-500 to-violet-500 p-[2px] rounded-xl shadow-2xl'>
          <div className='bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6'>
            {/* Header */}
            <Header />

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3.5'>
              {/* Group name */}
              <TextInput
                label='Tên Group'
                placeholder='Nhập tên group'
                register={register('groupName')}
                error={errors.groupName?.message}
              />

              {/* License plate and chassis number */}
              <div className='grid grid-cols-2 gap-3'>
                <TextInput
                  label='Biển số xe'
                  placeholder='29A-12345'
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
              <div className='grid grid-cols-2 gap-3'>
                <FileUpload
                  label='Hình ảnh xe'
                  file={vehicleImage || null}
                  register={register('vehicleImage')}
                  onChange={(e) => setValue('vehicleImage', e.target.files?.[0] || null)}
                  onRemove={() => setValue('vehicleImage', null)}
                  color='purple'
                  error={errors.vehicleImage?.message}
                />
                <FileUpload
                  label='Hình cà vẹt xe'
                  file={registrationImage || null}
                  register={register('registrationImage')}
                  onChange={(e) => setValue('registrationImage', e.target.files?.[0] || null)}
                  onRemove={() => setValue('registrationImage', null)}
                  color='violet'
                  error={errors.registrationImage?.message}
                />
              </div>

              {/* Max members - without arrows */}
              <NumberInput
                label='Số thành viên tối đa'
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
              <button
                type='submit'
                className='w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-2.5 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition'
              >
                Tạo Group
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
