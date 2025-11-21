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
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'FUNDED' | string
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
  userId: number | null
  description: string
  cost: string
  estimatedDurationDays: string
}

type CreateFormErrors = {
  description?: string
  cost?: string
  estimatedDurationDays?: string
}

// TYPE cho mutation input
type CreateMaintenanceInput = {
  userId: number
  vehicleId: number
  description: string
  cost: number
  estimatedDurationDays: number
}

const validateForm = (values: CreateForm): CreateFormErrors => {
  const errors: CreateFormErrors = {}
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

// Modal dùng Tailwind hiệu ứng chuyển đổi
function Modal({ show, onClose, children }: { show: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!show) return null
  return (
    <div
      className={`fixed inset-0 z-30 bg-black/40 flex justify-center items-center transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div
        className={`bg-white p-6 rounded-2xl shadow-2xl border-2 border-teal-500/20 max-w-md w-full relative transition-transform transition-opacity duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          className='absolute top-2 right-2 text-teal-700 text-xl rounded-full hover:bg-teal-50 p-1'
          onClick={onClose}
          aria-label='Đóng'
          tabIndex={0}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

function MaintenanceList() {
  const queryClient = useQueryClient()

  // Query danh sách xe/người dùng
  const {
    data: userVehicleList = [],
    isLoading: loadingUser,
    isError: errorUser,
    error: errorUserMsg
  } = useQuery<MaintenanceReport[], Error>({
    queryKey: ['technician', 'rejectedUsers'],
    queryFn: () => technicianApi.getAllUserReport().then((res) => res.data)
  })

  // Query maintenance đã tạo
  const {
    data: maintenances = [],
    isLoading: loadingMaint,
    isError: errorMaint,
    error: errorMaintMsg
  } = useQuery<MaintenanceRequest[], Error>({
    queryKey: ['technician', 'myMaintenances'],
    queryFn: () => technicianApi.getAllMaintance().then((res) => res.data)
  })

  // State cho modal và form
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<CreateForm>({
    userId: null,
    vehicleId: null,
    description: '',
    cost: '',
    estimatedDurationDays: ''
  })
  const [formErrors, setFormErrors] = useState<CreateFormErrors>({})
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(null)

  // Mutation tạo yêu cầu bảo trì
  const createMutation = useMutation<unknown, unknown, CreateMaintenanceInput>({
    mutationFn: (data) => technicianApi.createMantainance(data, data.vehicleId),
    onSuccess: () => {
      toast.success('Tạo yêu cầu bảo trì thành công!')
      setShowModal(false)
      setFormErrors({})
      setCreateErrorMessage(null)
      setForm({
        userId: null,
        vehicleId: null,
        description: '',
        cost: '',
        estimatedDurationDays: ''
      })
      queryClient.invalidateQueries({ queryKey: ['technician', 'rejectedUsers'] })
      queryClient.invalidateQueries({ queryKey: ['technician', 'myMaintenances'] })
    },
    onError: () => {
      setCreateErrorMessage('Không thể tạo yêu cầu bảo trì. Vui lòng thử lại.')
    }
  })

  // Mutation đánh dấu hoàn thành, chỉ dùng khi status là FUNDED
  const completeMutation = useMutation<unknown, unknown, { id: number }>({
    mutationFn: (data) => technicianApi.completeMantainance(String(data.id)),
    onSuccess: () => {
      toast.success('Đã đánh dấu hoàn thành!')
      queryClient.invalidateQueries({ queryKey: ['technician', 'myMaintenances'] })
    },
    onError: () => {
      toast.error('Không thể cập nhật trạng thái. Thử lại sau.')
    }
  })

  const handleOpenCreate = (report: MaintenanceReport) => {
    setForm({
      userId: report.userId,
      vehicleId: report.vehicleId,
      description: '',
      cost: '',
      estimatedDurationDays: ''
    })
    setFormErrors({})
    setCreateErrorMessage(null)
    setShowModal(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
    setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    setCreateErrorMessage(null)
  }

  const handleCreate = (e: FormEvent) => {
    e.preventDefault()
    if (createMutation.isPending) return
    if (!form.userId || !form.vehicleId) {
      setCreateErrorMessage('Thiếu thông tin xe hoặc người dùng!')
      return
    }
    const errors = validateForm(form)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    createMutation.mutate({
      userId: form.userId,
      vehicleId: form.vehicleId,
      description: form.description.trim(),
      cost: Number(form.cost),
      estimatedDurationDays: Number(form.estimatedDurationDays)
    })
  }

  if (loadingUser || loadingMaint) return <Skeleton />
  if (errorUser) return <div className='text-rose-600 p-6'>{errorUserMsg?.message}</div>
  if (errorMaint) return <div className='text-rose-600 p-6'>{errorMaintMsg?.message}</div>

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-white flex flex-col px-2 md:px-10 py-8'>
      <div className='w-full max-w-4xl mx-auto space-y-10'>
        {/* Danh sách card xe/người */}
        <div>
          <h2 className='text-xl font-bold text-teal-700 mb-4'>Danh sách xe/người cần bảo trì</h2>
          <div className='flex flex-wrap gap-6'>
            {userVehicleList.length === 0 && <div className='text-slate-500'>Không có xe nào cần bảo trì.</div>}
            {userVehicleList.map((vehicle) => (
              <div
                key={vehicle.vehicleId}
                className='flex flex-col flex-1 min-w-[250px] max-w-[310px] bg-white border border-teal-200 rounded-2xl shadow-md hover:shadow-lg transition p-4 group'
              >
                <div>
                  <span className='block font-bold text-slate-900 text-base'>{vehicle.vehicleModel}</span>
                  <span className='block text-teal-600 text-sm mb-1'>{vehicle.licensePlate}</span>
                  <span className='text-slate-700 text-sm'>
                    Chủ xe: <span className='font-medium'>{vehicle.userName}</span>
                  </span>
                </div>
                <button
                  className='w-full mt-4 rounded-xl bg-teal-600 text-white font-semibold py-2 shadow hover:bg-teal-700 transition'
                  onClick={() => handleOpenCreate(vehicle)}
                >
                  Tạo yêu cầu bảo trì
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Danh sách maintenance */}
        <div>
          <h2 className='text-xl font-bold text-teal-700 mb-4'>Yêu cầu bảo trì đã gửi</h2>
          <div className='bg-white border border-teal-200 rounded-2xl shadow px-2 py-4 max-h-[400px] overflow-y-auto'>
            {maintenances.length === 0 && <div className='text-slate-500 px-4'>Chưa có yêu cầu nào.</div>}
            <ul className='space-y-2'>
              {maintenances.map((item) => (
                <li
                  key={item.id}
                  className='flex flex-col md:flex-row md:items-center md:justify-between bg-teal-50 border border-teal-100 rounded-xl px-3 py-2'
                >
                  <div className='flex flex-col md:flex-row md:items-center gap-2 flex-1'>
                    <span className='font-medium text-teal-800'>{item.vehicleModel}</span>
                    <span className='text-teal-700'>{item.liableUserName}</span>
                    <span className='italic text-slate-700'>({item.description})</span>
                  </div>
                  <div className='flex flex-row md:flex-col md:items-end gap-2 mt-2 md:mt-0'>
                    <span className='text-xs px-2 py-1 rounded bg-white border border-teal-200 text-teal-700 font-medium uppercase'>
                      {item.status}
                    </span>
                    {item.status === 'FUNDED' && (
                      <button
                        type='button'
                        className='text-xs px-3 py-1 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-50 transition'
                        disabled={completeMutation.isPending}
                        onClick={() => completeMutation.mutate({ id: item.id })}
                      >
                        {completeMutation.isPending ? 'Đang lưu...' : 'Đánh dấu hoàn thành'}
                      </button>
                    )}
                    {item.status === 'COMPLETED' && (
                      <span className='text-xs px-3 py-1 rounded-xl bg-emerald-200 text-emerald-800 font-medium'>
                        Hoàn thành
                      </span>
                    )}
                    <span className='text-xs text-slate-400'>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Modal tạo mới */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <h3 className='text-lg font-bold text-teal-700 mb-2'>Tạo yêu cầu bảo trì</h3>
          {form.vehicleId && form.userId && (
            <div className='mb-3 text-slate-600 text-sm'>
              Xe:{' '}
              <span className='font-semibold text-black'>
                {userVehicleList.find((u) => u.vehicleId === form.vehicleId && u.userId === form.userId)?.vehicleModel}
              </span>
              <span className='ml-2 text-teal-700'>
                {userVehicleList.find((u) => u.vehicleId === form.vehicleId && u.userId === form.userId)?.licensePlate}
              </span>
              <br />
              Chủ xe:{' '}
              <span className='font-semibold text-black'>
                {userVehicleList.find((u) => u.vehicleId === form.vehicleId && u.userId === form.userId)?.userName}
              </span>
            </div>
          )}
          {createErrorMessage && (
            <div className='rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 mb-2 text-xs md:text-sm text-rose-700'>
              {createErrorMessage}
            </div>
          )}
          <form onSubmit={handleCreate} className='space-y-3' autoComplete='off'>
            <div>
              <label className='block text-xs font-medium text-teal-700 mb-1.5'>Mô tả bảo trì</label>
              <textarea
                name='description'
                rows={2}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  formErrors.description
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600'
                }`}
                placeholder='VD: Thay nhớt, kiểm tra phanh...'
                value={form.description}
                onChange={handleChange}
              />
              {formErrors.description && <div className='mt-1 text-[12px] text-rose-600'>{formErrors.description}</div>}
            </div>
            <div>
              <label className='block text-xs font-medium text-teal-700 mb-1.5'>Chi phí ước tính</label>
              <input
                type='number'
                name='cost'
                className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  formErrors.cost
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600'
                }`}
                placeholder='VD: 500000'
                value={form.cost}
                onChange={handleChange}
              />
              {formErrors.cost && <div className='mt-1 text-[12px] text-rose-600'>{formErrors.cost}</div>}
            </div>
            <div>
              <label className='block text-xs font-medium text-teal-700 mb-1.5'>Thời gian dự kiến (ngày)</label>
              <input
                type='number'
                name='estimatedDurationDays'
                className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  formErrors.estimatedDurationDays
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                    : 'border-slate-200 focus:border-teal-600 focus:ring-teal-600'
                }`}
                placeholder='VD: 3'
                value={form.estimatedDurationDays}
                onChange={handleChange}
              />
              {formErrors.estimatedDurationDays && (
                <div className='mt-1 text-[12px] text-rose-600'>{formErrors.estimatedDurationDays}</div>
              )}
            </div>
            <div className='flex justify-end gap-3 pt-2'>
              <button
                type='button'
                onClick={() => setShowModal(false)}
                className='rounded-xl border border-teal-200 bg-white px-4 py-2 text-xs md:text-sm font-medium text-teal-700 hover:bg-teal-50'
                disabled={createMutation.isPending}
              >
                Hủy
              </button>
              <button
                type='submit'
                disabled={createMutation.isPending || !form.userId || !form.vehicleId}
                className='rounded-xl bg-teal-600 px-5 py-2 text-xs md:text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1 focus:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {createMutation.isPending ? 'Đang tạo...' : 'Tạo yêu cầu'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default MaintenanceList
