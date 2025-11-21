import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { CarOutlined, FileTextOutlined, ThunderboltOutlined, WarningOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import userApi from '../../../../apis/user.api'
import Skeleton from '../../../../components/Skeleton'
import { checkoutSchema } from '../../../../utils/rule'

export interface CheckoutForm {
  odometer: string
  batteryLevel: string
  notes: string
}

export default function CheckOutResult() {
  const { bookingId, groupId } = useParams()
  console.log(typeof bookingId)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutForm>({
    resolver: yupResolver(checkoutSchema)
  })

  const sendReport = useMutation({
    mutationFn: (data: CheckoutForm) => {
      return userApi.sendCheckoutReport(data)
    },
    onSuccess: (response) => {
      console.log('Checkout report sent successfully:', response)
      toast.success('Checkout report sent successfully!')
      navigate(`/dashboard/viewGroups/${groupId}/pending-checkout/${bookingId}`)
    }
  })

  const onSubmit = (data: CheckoutForm) => {
    const payload = {
      ...data,
      bookingId: Number(bookingId)
    }

    console.log('Checkout data:', payload)
    sendReport.mutate(payload)
  }

  return (
    <>
      <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white'>
          <h2 className='text-2xl font-bold text-center'>Confirm Checkout</h2>
          <p className='text-center text-blue-100 mt-1'>
            Please fill in all the information before returning the vehicle
          </p>
        </div>

        {/* Form */}
        {sendReport?.isPending && <Skeleton />}
        <form onSubmit={handleSubmit(onSubmit)} className='p-8 space-y-6'>
          {/* Grid cho 2 trường ngắn */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Số km */}
            <div>
              <label className=' text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <CarOutlined className='text-blue-600' />
                Current odometer reading
              </label>
              <input
                type='text'
                {...register('odometer')}
                placeholder='Enter the distance traveled'
                className='w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
              />
              {errors.odometer && (
                <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                  <WarningOutlined className='text-xs' />
                  {errors.odometer.message}
                </p>
              )}
            </div>

            {/* Mức pin */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <ThunderboltOutlined className='text-green-600' />
                Current battery level (%)
              </label>
              <input
                type='text'
                {...register('batteryLevel')}
                placeholder='0-100%'
                className='w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none'
              />
              {errors.batteryLevel && (
                <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                  <WarningOutlined className='text-xs' />
                  {errors.batteryLevel.message}
                </p>
              )}
            </div>
          </div>

          {/* Ghi chú - Textarea lớn */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
              <FileTextOutlined className='text-indigo-600' />
              note
            </label>
            <textarea
              {...register('notes')}
              placeholder='Nhập ghi chú về tình trạng xe, trải nghiệm sử dụng...'
              rows={4}
              className='w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none'
            />
            {errors.notes && (
              <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                <WarningOutlined className='text-xs' />
                {errors.notes.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]'
          >
            Send report checkout
          </button>
        </form>
      </div>
    </>
  )
}
