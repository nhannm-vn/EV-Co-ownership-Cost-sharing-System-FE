import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import {
  CarOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  HomeOutlined,
  ScanOutlined,
  ThunderboltOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import { checkoutSchema } from '../../../../utils/rule'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'
import path from '../../../../constants/path'
import { Button } from 'antd'

export interface CheckoutForm {
  odometer: string
  batteryLevel: string
  notes: string
  issues: string
}

export default function CoOwnerCheckoutForm() {
  const { status, bookingId } = useParams()
  console.log(typeof bookingId)

  const navigate = useNavigate()

  const handleRetry = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate(path.dashBoard)
  }
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
      {status === 'fail' ? (
        <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center'>
          {/* Error Icon */}
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
              <CloseCircleOutlined className='text-6xl text-red-500' />
            </div>
          </div>

          {/* Error Title */}
          <h1 className='text-2xl font-bold text-gray-800 mb-3'>Check-in Thất Bại</h1>

          {/* Error Message */}
          <p className='text-gray-600 mb-2'>Invalid QR code format</p>

          {/* Error Status */}
          <div className='inline-block bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-6'>
            <span className='text-sm text-red-700'>
              Mã lỗi: <span className='font-semibold'>FAIL</span>
            </span>
          </div>

          {/* Suggested Solutions */}
          <div className='bg-gray-50 rounded-lg p-4 mb-6 text-left'>
            <h3 className='font-semibold text-gray-800 mb-3 text-sm'>Vui lòng thử:</h3>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Đảm bảo mã QR không bị mờ hoặc hư hỏng</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Kiểm tra lại mã QR có đúng định dạng và không</span>
              </li>
              <li className='flex items-start'>
                <span className='mr-2'>•</span>
                <span>Yêu cầu mã QR mới từ quản trị viên</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-3'>
            <Button
              type='primary'
              size='large'
              icon={<ScanOutlined />}
              onClick={handleRetry}
              className='w-full bg-blue-600 hover:bg-blue-700'
            >
              Quét Lại Mã QR
            </Button>

            <Button size='large' icon={<HomeOutlined />} onClick={handleGoHome} className='w-full'>
              Về Trang Chủ
            </Button>
          </div>
        </div>
      ) : (
        <div className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white'>
            <h2 className='text-2xl font-bold text-center'>Xác nhận Checkout</h2>
            <p className='text-center text-blue-100 mt-1'>Vui lòng điền đầy đủ thông tin trước khi trả xe</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='p-8 space-y-6'>
            {/* Grid cho 2 trường ngắn */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Số km */}
              <div>
                <label className=' text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                  <CarOutlined className='text-blue-600' />
                  Số km hiện tại
                </label>
                <input
                  type='text'
                  {...register('odometer')}
                  placeholder='Nhập số km đã đi'
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
                  Mức pin hiện tại (%)
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
                Ghi chú
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

            {/* Vấn đề - Textarea lớn */}
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <WarningOutlined className='text-orange-600' />
                Vấn đề (nếu có)
              </label>
              <textarea
                {...register('issues')}
                placeholder='Mô tả chi tiết các vấn đề gặp phải (hỏng hóc, trầy xước, thiếu phụ kiện...)'
                rows={5}
                className='w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none'
              />
              {errors.issues && (
                <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
                  <WarningOutlined className='text-xs' />
                  {errors.issues.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02]'
            >
              Gửi xác nhận Checkout
            </button>
          </form>
        </div>
      )}
    </>
  )
}
