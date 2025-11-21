import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import technicianApi from '../../../../apis/technician.api'
import Skeleton from '../../../../components/Skeleton'
import { toast } from 'react-toastify'

// TYPES
export interface MaintenanceReport {
  userId: number
  userName: string
  vehicleId: number
  vehicleModel: string
  licensePlate: string
}

export interface MaintenanceRequest {
  id: number
  vehicleId: number
  vehicleModel: string
  requestedByName: string
  approvedByName: string | null
  liableUserName: string
  coverageType: 'PERSONAL' | 'COMMERCIAL' | string
  description: string
  actualCost: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string
  requestDate: string
  approvalDate: string | null
  nextDueDate: string | null
  estimatedDurationDays: number
  maintenanceStartAt: string | null
  expectedFinishAt: string | null
  maintenanceCompletedAt: string | null
  createdAt: string
  updatedAt: string
  payerShares: number | null
}

type CreateForm = {
  vehicleId: number | null
  description: string
  cost: string
  estimatedDurationDays: string
}

type CreateFormErrors = {
  vehicleId?: string
  description?: string
  cost?: string
  estimatedDurationDays?: string
}

// Validate dữ liệu form
const validateForm = (values: CreateForm): CreateFormErrors => {
  const errors: CreateFormErrors = {}
  if (!values.vehicleId) {
    errors.vehicleId = 'Vui lòng chọn xe cần bảo trì.'
  }
  const description = values.description.trim()
  const costNumber = Number(values.cost)
  const durationNumber = Number(values.estimatedDurationDays)

  if (!description) {
    errors.description = 'Mô tả không được để trống.'
  } else if (description.length < 5) {
    errors.description = 'Mô tả phải ít nhất 5 ký tự.'
  }

  if (!values.cost) {
    errors.cost = 'Chi phí ước tính bắt buộc.'
  } else if (!Number.isFinite(costNumber) || costNumber <= 0) {
    errors.cost = 'Chi phí phải là số dương.'
  }

  if (!values.estimatedDurationDays) {
    errors.estimatedDurationDays = 'Thời gian dự kiến bắt buộc.'
  } else if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
    errors.estimatedDurationDays = 'Thời gian phải là số nguyên dương.'
  } else if (!Number.isInteger(durationNumber)) {
    errors.estimatedDurationDays = 'Thời gian phải là số nguyên (ngày).'
  }

  return errors
}

// COMPONENT
function MaintenanceList() {
  const queryClient = useQueryClient()

  // Lấy danh sách xe/người dùng rejected-users
  const {
    data: userVehicleList = [],
    isLoading: loadingUser,
    isError: errorUser,
    error: errorUserMsg
  } = useQuery<MaintenanceReport[], Error>({
    queryKey: ['technician', 'rejectedUsers'],
    queryFn: () => technicianApi.getAllUserReport().then((res) => res.data)
  })

  // Lấy danh sách maintenance đã tạo
  const {
    data: maintenances = [],
    isLoading: loadingMaint,
    isError: errorMaint,
    error: errorMaintMsg
  } = useQuery<MaintenanceRequest[], Error>({
    queryKey: ['technician', 'myMaintenances'],
    queryFn: () => technicianApi.getAllMaintance().then((res) => res.data)
  })

  // State cho form tạo mới
  const [form, setForm] = useState<CreateForm>({
    vehicleId: null,
    description: '',
    cost: '',
    estimatedDurationDays: ''
  })
  const [formErrors, setFormErrors] = useState<CreateFormErrors>({})
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(null)

  // Mutation tạo Maintenance
  const createMutation = useMutation({
    mutationFn: ({
      userId,
      vehicleId,
      description,
      cost,
      estimatedDurationDays
    }: {
      userId: number
      vehicleId: number
      description: string
      cost: number
      estimatedDurationDays: number
    }) => technicianApi.createMantainance({ userId, description, cost, estimatedDurationDays }, vehicleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technician', 'myMaintenances'] })
      toast.success('Tạo yêu cầu bảo trì thành công!')
      setForm({
        vehicleId: null,
        description: '',
        cost: '',
        estimatedDurationDays: ''
      })
      setFormErrors({})
      setCreateErrorMessage(null)
    },
    onError: () => {
      setCreateErrorMessage('Không thể tạo yêu cầu bảo trì. Vui lòng thử lại.')
    }
  })

  // Change event handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'vehicleId' ? Number(value) : value
    }))
    setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    setCreateErrorMessage(null)
  }

  // Submit event handler
  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    if (createMutation.isPending) return
    const errors = validateForm(form)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      toast.warn('Vui lòng sửa lỗi nhập liệu.')
      return
    }
    if (!form.vehicleId) {
      setCreateErrorMessage('Chưa chọn xe để gửi yêu cầu.')
      return
    }
    const chosen = userVehicleList.find((v) => v.vehicleId === form.vehicleId)
    if (!chosen) {
      setCreateErrorMessage('Không có thông tin người dùng cho xe này!')
      return
    }
    createMutation.mutate({
      userId: chosen.userId,
      vehicleId: form.vehicleId,
      description: form.description.trim(),
      cost: Number(form.cost),
      estimatedDurationDays: Number(form.estimatedDurationDays)
    })
  }

  // UI
  if (loadingUser || loadingMaint) return <Skeleton />
  if (errorUser) return <div className='text-rose-600 p-6'>Lỗi: {errorUserMsg?.message}</div>
  if (errorMaint) return <div className='text-rose-600 p-6'>Lỗi: {errorMaintMsg?.message}</div>

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center px-4 md:px-8 py-10'>
      <div className='w-full max-w-4xl space-y-10'>
        {/* Form tạo yêu cầu bảo trì */}
        <div className='rounded-[24px] border border-emerald-100 bg-white/95 overflow-hidden'>
          <div className='px-8 py-5 border-b border-emerald-100 bg-gradient-to-r from-teal-600 to-emerald-500 flex flex-wrap items-center justify-between gap-4'>
            <h1 className='text-2xl md:text-3xl font-semibold text-white'>Tạo yêu cầu bảo trì</h1>
          </div>
          <div className='p-6 md:p-8 bg-slate-50/40 space-y-6'>
            <form
              onSubmit={handleCreate}
              className='rounded-2xl border border-emerald-100 bg-white px-5 md:px-6 py-5 md:py-6 space-y-4'
            >
              <h2 className='text-base md:text-lg font-semibold text-slate-900 mb-2'>
                Chọn xe và nhập thông tin bảo trì
              </h2>
              {createErrorMessage && (
                <div className='rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs md:text-sm text-rose-700'>
                  {createErrorMessage}
                </div>
              )}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-xs font-medium text-slate-600 mb-1.5'>Chọn xe</label>
                  <select
                    name='vehicleId'
                    value={form.vehicleId ?? ''}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
                      formErrors.vehicleId
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                    }`}
                  >
                    <option value=''>-- Chọn xe bảo trì --</option>
                    {userVehicleList.map((vehicle) => (
                      <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                        {vehicle.userName} - {vehicle.vehicleModel} ({vehicle.licensePlate})
                      </option>
                    ))}
                  </select>
                  {formErrors.vehicleId && <p className='mt-1 text-[11px] text-rose-600'>{formErrors.vehicleId}</p>}
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-xs font-medium text-slate-600 mb-1.5'>Mô tả bảo trì</label>
                  <textarea
                    name='description'
                    rows={2}
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                      formErrors.description
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                    }`}
                    placeholder='VD: Thay nhớt động cơ, kiểm tra phanh...'
                    value={form.description}
                    onChange={handleChange}
                  />
                  {formErrors.description && <p className='mt-1 text-[11px] text-rose-600'>{formErrors.description}</p>}
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-600 mb-1.5'>Chi phí ước tính</label>
                  <input
                    type='number'
                    name='cost'
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                      formErrors.cost
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                    }`}
                    placeholder='VD: 500000'
                    value={form.cost}
                    onChange={handleChange}
                  />
                  {formErrors.cost && <p className='mt-1 text-[11px] text-rose-600'>{formErrors.cost}</p>}
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-600 mb-1.5'>Thời gian dự kiến (ngày)</label>
                  <input
                    type='number'
                    name='estimatedDurationDays'
                    className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                      formErrors.estimatedDurationDays
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                    }`}
                    placeholder='VD: 3'
                    value={form.estimatedDurationDays}
                    onChange={handleChange}
                  />
                  {formErrors.estimatedDurationDays && (
                    <p className='mt-1 text-[11px] text-rose-600'>{formErrors.estimatedDurationDays}</p>
                  )}
                </div>
              </div>
              <div className='flex justify-end gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => {
                    setForm({
                      vehicleId: null,
                      description: '',
                      cost: '',
                      estimatedDurationDays: ''
                    })
                    setFormErrors({})
                    setCreateErrorMessage(null)
                  }}
                  className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-50'
                  disabled={createMutation.isPending}
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  disabled={createMutation.isPending}
                  className='rounded-xl bg-teal-600 px-5 py-2 text-xs md:text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:ring-offset-slate-50 disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {createMutation.isPending ? 'Đang tạo...' : 'Tạo yêu cầu'}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Danh sách yêu cầu bảo trì đã gửi */}
        <div className='rounded-[24px] border border-gray-200 bg-white/95 overflow-hidden'>
          <div className='px-8 py-5 border-b border-gray-200'>
            <h2 className='text-lg md:text-xl font-semibold'>Danh sách yêu cầu bảo trì đã gửi</h2>
          </div>
          <div className='p-6 space-y-4'>
            {maintenances.length === 0 && <div className='text-slate-500'>Chưa có yêu cầu nào.</div>}
            {maintenances.map((item) => (
              <div
                key={item.id}
                className='border rounded px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between'
              >
                <div>
                  {item.vehicleModel} - {item.liableUserName} <br />
                  Mô tả: {item.description}
                </div>
                <div>
                  <span className='text-xs px-2 py-1 rounded bg-gray-100 text-slate-600'>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceList
