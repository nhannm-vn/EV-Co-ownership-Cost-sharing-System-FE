/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import technicianApi from '../../../../apis/technician.api'
import type { Maintenance } from '../../../../types/api/technician.type'
import Skeleton from '../../../../components/Skeleton'
import { toast } from 'react-toastify'

// ================== STATUS TYPES ==================

type MaintenanceStatus = Maintenance['status']

// ================== CONSTANTS & HELPERS ==================

const STATUS_LABEL: Record<MaintenanceStatus, string> = {
  PENDING: 'Pending',
  FUNDED: 'Funded',
  COMPLETED: 'Completed'
}

const STATUS_COLOR_CLASS: Record<MaintenanceStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  FUNDED: 'bg-sky-50 text-sky-700',
  COMPLETED: 'bg-emerald-50 text-emerald-700'
}

const STATUS_BASE_CLASS =
  'inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold whitespace-nowrap min-w-[120px] text-center'

const getStatusConfig = (status: MaintenanceStatus) => ({
  label: STATUS_LABEL[status],
  className: `${STATUS_BASE_CLASS} ${STATUS_COLOR_CLASS[status]}`
})

const formatCurrency = (value: number | null | undefined) => {
  const safeValue = value ?? 0
  return safeValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD' // change to 'VND' if needed
  })
}

const formatDateTime = (value: string | null | undefined) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString('en-GB')
}

// Calculate due date from requestDate + estimatedDurationDays
const calcDueDate = (requestDate: string | null | undefined, estimatedDurationDays: number | null | undefined) => {
  if (!requestDate || !estimatedDurationDays) return null
  const base = new Date(requestDate)
  if (Number.isNaN(base.getTime())) return null
  const result = new Date(base)
  result.setDate(result.getDate() + estimatedDurationDays)
  return result.toISOString()
}

// ================== FORM TYPES ==================

type CreateForm = {
  description: string
  cost: string
  estimatedDurationDays: string
}

type CreateFormErrors = {
  description?: string
  cost?: string
  estimatedDurationDays?: string
}

// Validate function
const validateForm = (values: CreateForm): CreateFormErrors => {
  const errors: CreateFormErrors = {}

  const description = values.description.trim()
  const costNumber = Number(values.cost)
  const durationNumber = Number(values.estimatedDurationDays)

  if (!description) {
    errors.description = 'Description is required.'
  } else if (description.length < 5) {
    errors.description = 'Description must be at least 5 characters.'
  }

  if (!values.cost) {
    errors.cost = 'Estimated cost is required.'
  } else if (!Number.isFinite(costNumber) || costNumber <= 0) {
    errors.cost = 'Estimated cost must be a positive number.'
  }

  if (!values.estimatedDurationDays) {
    errors.estimatedDurationDays = 'Estimated duration is required.'
  } else if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
    errors.estimatedDurationDays = 'Estimated duration must be a positive number.'
  } else if (!Number.isInteger(durationNumber)) {
    errors.estimatedDurationDays = 'Estimated duration must be an integer (days).'
  }

  return errors
}

// Helper: pick error message from API error
const getErrorMessage = (error: unknown): string => {
  const e = error as any
  // axios error shape
  const apiMessage = e?.response?.data?.message || e?.response?.data?.error || e?.message

  return apiMessage || 'Failed to create maintenance. Please try again.'
}

// ================== COMPONENT ==================

function MaintenanceList() {
  const queryClient = useQueryClient()

  // GET list with React Query
  const { data, isLoading, isError, error } = useQuery<Maintenance[], Error>({
    queryKey: ['technician', 'maintenances'],
    queryFn: async () => {
      const res = await technicianApi.getAllMantainance()
      return res.data
    }
  })

  // local state for create API error
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(null)

  // MUTATION: complete maintenance
  const completeMutation = useMutation({
    mutationFn: (maintenanceId: string) => technicianApi.completeMantainance(maintenanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technician', 'maintenances'] })
      toast.success('Maintenance status updated successfully!')
    },
    onError: () => {
      toast.error('Failed to update maintenance status. Please try again.')
    }
  })

  // MUTATION: create maintenance with new API (needs vehicleId)
  const createMutation = useMutation({
    mutationFn: (params: {
      vehicleId: number
      data: { description: string; cost: number; estimatedDurationDays: number }
    }) => technicianApi.createMantainance(params.data, params.vehicleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['technician', 'maintenances'] })
      toast.success('Maintenance request created successfully!', {
        position: 'top-right'
      })
      setForm({
        description: '',
        cost: '',
        estimatedDurationDays: ''
      })
      setFormErrors({})
      setCreateErrorMessage(null)
      setShowForm(false)
    },
    onError: (err) => {
      const msg = getErrorMessage(err)
      setCreateErrorMessage(msg)
      toast.error(msg)
    }
  })

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<CreateForm>({
    description: '',
    cost: '',
    estimatedDurationDays: ''
  })
  const [formErrors, setFormErrors] = useState<CreateFormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    setCreateErrorMessage(null)
  }

  const list = data ?? []

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (createMutation.isPending) return

    const errors = validateForm(form)
    setFormErrors(errors)

    const hasError = Object.keys(errors).length > 0
    if (hasError) {
      toast.warn('Please fix the validation errors.')
      return
    }

    const firstItem = list[0]
    if (!firstItem) {
      const msg = 'No vehicle available to attach maintenance.'
      setCreateErrorMessage(msg)
      toast.error(msg)
      return
    }

    const vehicleId = Number(firstItem.vehicleId)
    if (!Number.isFinite(vehicleId)) {
      const msg = 'Invalid vehicle ID.'
      setCreateErrorMessage(msg)
      toast.error(msg)
      return
    }

    createMutation.mutate({
      vehicleId,
      data: {
        description: form.description.trim(),
        cost: Number(form.cost),
        estimatedDurationDays: Number(form.estimatedDurationDays)
      }
    })
  }

  const handleMarkCompleted = (maintenanceId: string) => {
    if (completeMutation.isPending) return
    completeMutation.mutate(maintenanceId)
  }

  const errorMessage = isError ? error?.message : null

  if (isLoading) return <Skeleton />

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center px-4 md:px-8 py-10'>
      <div className='w-full max-w-6xl'>
        <div className='rounded-[24px] border border-emerald-100 bg-white/95 overflow-hidden'>
          {/* HEADER */}
          <div className='px-8 py-5 border-b border-emerald-100 bg-gradient-to-r from-teal-600 to-emerald-500 flex flex-wrap items-center justify-between gap-4'>
            <div>
              <h1 className='text-2xl md:text-3xl font-semibold text-white'>Maintenance Requests</h1>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='text-xs md:text-sm text-emerald-50/90'>
                Total: <span className='font-semibold'>{list.length}</span> requests
              </div>
              <button
                type='button'
                onClick={() => {
                  setShowForm((prev) => !prev)
                  setCreateErrorMessage(null)
                  setFormErrors({})
                }}
                className='inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/95 px-4 py-2 text-xs md:text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition'
              >
                <span className='text-base leading-none'>+</span>
                <span>{showForm ? 'Close create form' : 'Create maintenance request'}</span>
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className='p-6 md:p-8 bg-slate-50/40 space-y-6'>
            {/* CREATE FORM (with validation + API) */}
            {showForm && (
              <form
                onSubmit={handleCreate}
                className='rounded-2xl border border-emerald-100 bg-white px-5 md:px-6 py-5 md:py-6 space-y-4'
              >
                <h2 className='text-base md:text-lg font-semibold text-slate-900'>New maintenance request</h2>

                {/* Global error for create API */}
                {createErrorMessage && (
                  <div className='rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs md:text-sm text-rose-700'>
                    {createErrorMessage}
                  </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {/* DESCRIPTION */}
                  <div className='md:col-span-3'>
                    <label className='block text-xs font-medium text-slate-600 mb-1.5'>Description</label>
                    <textarea
                      name='description'
                      rows={2}
                      className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                        formErrors.description
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                      }`}
                      placeholder='E.g. Engine oil change, brake check...'
                      value={form.description}
                      onChange={handleChange}
                    />
                    {formErrors.description && (
                      <p className='mt-1 text-[11px] text-rose-600'>{formErrors.description}</p>
                    )}
                  </div>

                  {/* COST */}
                  <div>
                    <label className='block text-xs font-medium text-slate-600 mb-1.5'>Estimated cost</label>
                    <input
                      type='number'
                      name='cost'
                      className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                        formErrors.cost
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                      }`}
                      placeholder='E.g. 500000'
                      value={form.cost}
                      onChange={handleChange}
                    />
                    {formErrors.cost && <p className='mt-1 text-[11px] text-rose-600'>{formErrors.cost}</p>}
                  </div>

                  {/* DURATION */}
                  <div>
                    <label className='block text-xs font-medium text-slate-600 mb-1.5'>Estimated duration (days)</label>
                    <input
                      type='number'
                      name='estimatedDurationDays'
                      className={`w-full rounded-xl border px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 ${
                        formErrors.estimatedDurationDays
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500'
                      }`}
                      placeholder='E.g. 3'
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
                      setShowForm(false)
                      setCreateErrorMessage(null)
                      setFormErrors({})
                    }}
                    className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs md:text-sm font-medium text-slate-600 hover:bg-slate-50'
                    disabled={createMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={createMutation.isPending}
                    className='rounded-xl bg-teal-600 px-5 py-2 text-xs md:text-sm font-semibold text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 focus:ring-offset-slate-50 disabled:opacity-60 disabled:cursor-not-allowed'
                  >
                    {createMutation.isPending ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            )}

            {/* LIST */}
            {errorMessage && <div className='py-12 text-center text-sm md:text-base text-rose-600'>{errorMessage}</div>}

            {!errorMessage && list.length === 0 && (
              <div className='py-12 text-center text-sm md:text-base text-slate-500'>No maintenance requests yet.</div>
            )}

            {!errorMessage && list.length > 0 && (
              <div className='rounded-2xl border border-emerald-100 bg-white/95 overflow-hidden'>
                <div className='overflow-x-auto'>
                  <table className='min-w-full table-auto text-sm md:text-base'>
                    <thead className='bg-teal-50/80 border-b border-emerald-100'>
                      <tr className='text-[11px] md:text-xs font-medium text-slate-500 tracking-wide'>
                        <th className='px-4 py-3 text-left w-[18%]'>Vehicle</th>
                        <th className='px-4 py-3 text-left w-[30%]'>Description</th>
                        <th className='px-4 py-3 text-left w-[15%]'>Requested by</th>
                        <th className='px-4 py-3 text-right w-[10%]'>Cost</th>
                        <th className='px-4 py-3 text-center'>Status</th>
                        <th className='px-4 py-3 text-left w-[8%]'>Requested at</th>
                        <th className='px-4 py-3 text-left w-[8%]'>Due date</th>
                        <th className='px-4 py-3 text-center w-[8%]'>Actions</th>
                      </tr>
                    </thead>

                    <tbody className='divide-y divide-slate-100'>
                      {list.map((m) => {
                        const { label: statusLabel, className: statusClass } = getStatusConfig(m.status)

                        const calculatedDue = calcDueDate(m.requestDate, m.estimatedDurationDays)
                        const dueToShow = calculatedDue ?? m.nextDueDate ?? null

                        return (
                          <tr key={m.id} className='hover:bg-teal-50/40 transition-colors'>
                            {/* VEHICLE */}
                            <td className='px-4 py-4 align-top'>
                              <div className='text-sm md:text-base font-semibold text-slate-900'>{m.vehicleModel}</div>
                              <div className='mt-1 text-[11px] text-slate-500'>Vehicle ID: {m.vehicleId}</div>
                            </td>

                            {/* DESCRIPTION */}
                            <td className='px-4 py-4 align-top'>
                              <div className='text-slate-900 text-sm md:text-base line-clamp-2'>{m.description}</div>
                              <div className='mt-2 text-xs text-slate-500'>
                                Estimated:{' '}
                                <span className='font-medium text-teal-700'>{m.estimatedDurationDays || 0} days</span>
                              </div>
                            </td>

                            {/* REQUESTED BY */}
                            <td className='px-4 py-4 align-top text-xs text-slate-600'>
                              <div className='text-sm text-slate-900'>{m.requestedByName}</div>
                              {m.approvedByName && (
                                <div className='mt-1 text-[11px] text-slate-500'>Approved by: {m.approvedByName}</div>
                              )}
                            </td>

                            {/* COST */}
                            <td className='px-4 py-4 align-top text-right'>
                              <div className='text-emerald-700 text-sm md:text-base font-semibold'>
                                {formatCurrency(m.actualCost)}
                              </div>
                            </td>

                            {/* STATUS */}
                            <td className='px-4 py-4 align-top text-center'>
                              <span className={statusClass}>{statusLabel}</span>
                            </td>

                            {/* REQUEST DATE */}
                            <td className='px-4 py-4 align-top text-xs text-slate-600'>
                              {formatDateTime(m.requestDate)}
                            </td>

                            {/* DUE DATE */}
                            <td className='px-4 py-4 align-top text-xs text-slate-600'>{formatDateTime(dueToShow)}</td>

                            {/* ACTIONS */}
                            <td className='px-4 py-4 align-top text-center'>
                              {m.status !== 'COMPLETED' && (
                                <button
                                  type='button'
                                  onClick={() => handleMarkCompleted(String(m.id))}
                                  disabled={completeMutation.isPending}
                                  className='inline-flex border-[2px] border-black items-center justify-center rounded-full bg-emerald-600 px-3.5 py-1 text-[11px] md:text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 focus:ring-offset-slate-50 disabled:opacity-60 disabled:cursor-not-allowed'
                                >
                                  {completeMutation.isPending ? 'Processing...' : 'Mark as completed'}
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceList
