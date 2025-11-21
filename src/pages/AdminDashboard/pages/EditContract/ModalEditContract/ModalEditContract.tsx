import { ClockCircleOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, DatePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import adminApi from '../../../../../apis/admin.api'
import groupApi from '../../../../../apis/group.api'
import Skeleton from '../../../../../components/Skeleton'
type Term = {
  title: string
  content: string
}

export default function ModalEditContract() {
  const { groupId, contractId } = useParams()
  const navigate = useNavigate()
  const showContractData = useQuery({
    queryKey: ['contract-detail-for-edit', groupId],
    queryFn: () => groupApi.generateContract(groupId as string),
    enabled: !!groupId
  })

  console.log(showContractData?.data)
  const parseTerms = (termsText: string) => {
    // Tách theo số thứ tự 1. 2. 3. ...
    const parts = termsText.split(/(?=\d+\.\s*[A-Z])/)
    const validParts = parts.filter((p) => p.trim())
    // Kiểm tra và loại bỏ phần tử đầu tiên nếu nó KHÔNG bắt đầu bằng số thứ tự (ví dụ: Term: 1 year...)

    if (validParts.length > 0 && !/^\s*\d+\.\s*[A-Z]/.test(validParts[0])) {
      validParts.shift()
    }

    return validParts
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(true)
  const [openTerm, setOpenTerm] = useState<number | null>(null)
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [editingTerms, setEditingTerms] = useState<Term[]>([])

  useEffect(() => {
    const contract = showContractData.data?.data?.contract
    if (contract) {
      setStartDate(dayjs(contract.effectiveDate, 'DD/MM/YYYY'))
      setEndDate(dayjs(contract.endDate, 'DD/MM/YYYY'))
    }
  }, [showContractData.data?.data?.contract])
  const updateContractMutation = useMutation({
    mutationFn: ({
      contractId,
      startDate,
      endDate,
      terms
    }: {
      contractId: string
      startDate: string
      endDate: string
      terms: string
    }) => adminApi.updateContract({ contractId, startDate, endDate, terms }),
    onSuccess: () => {
      toast.success('UPDATE CONTRACT SUCCESS')
      navigate(-1)
      setIsEditModalOpen(false)
      setEditingTerms([])
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const reindexTerms = (terms: Term[]) => {
    return terms.map((t, i) => ({
      ...t,
      title: `${i + 1}. ${t.title.replace(/^\d+\.\s*/, '')}`
    }))
  }

  const handleAddTerm = () => {
    const updated = [...editingTerms, { title: `Điều khoản mới`, content: 'Nội dung điều khoản...' }]
    setEditingTerms(reindexTerms(updated))
  }

  const handleDeleteTerm = (idx: number) => {
    const updated = editingTerms.filter((_, i) => i !== idx)
    setEditingTerms(reindexTerms(updated))
  }

  const handleSave = () => {
    const formattedTerms = editingTerms
      .map((t, i) => `${i + 1}. ${t.title.replace(/^\d+\.\s*/, '')}\n${t.content}`)
      .join('\n\n')
      .toUpperCase()
    console.log('Lưu thay đổi:', {
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: endDate?.format('YYYY-MM-DD'),
      terms: formattedTerms
    })
    updateContractMutation.mutate({
      contractId: contractId as string,
      startDate: startDate?.format('YYYY-MM-DD') as string,
      endDate: endDate?.format('YYYY-MM-DD') as string,
      terms: formattedTerms
    })
  }

  useEffect(() => {
    const ContractTerms = showContractData.data?.data?.terms
    if (ContractTerms && typeof ContractTerms === 'string') {
      const parsed = parseTerms(ContractTerms).map((t) => {
        const lines = t.split('\n')
        return {
          title: lines[0],
          content: lines.slice(1).join('\n')
        }
      })
      setEditingTerms(parsed)
    }
  }, [showContractData.data?.data?.terms])

  if (showContractData.isLoading) {
    return <Skeleton />
  }

  if (!isEditModalOpen) return null

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className='fixed inset-0 bg-black/45 flex items-center justify-center z-[1000]'
        // onClick={() => setIsEditModalOpen(false)}
      >
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className='w-[900px] max-w-[90vw] max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden'
        >
          {/* Modal Header */}
          <div className='flex items-center gap-3 p-4 border-b border-gray-200'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <EditOutlined className='text-blue-500 text-lg' />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-bold text-gray-800 m-0'>Chỉnh sửa hợp đồng</h3>
              <p className='text-sm text-gray-500 m-0'>
                {`Hợp đồng #${showContractData.data?.data.contractId} - Nhóm: ${showContractData.data?.data.group?.name}`}
              </p>
            </div>
            <span className='bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-lg font-semibold'>
              {showContractData?.data?.data?.contract?.status}
            </span>
          </div>

          {/* Modal Body */}
          <div className='flex-1 overflow-y-auto p-4'>
            {/* THÔNG TIN HỢP ĐỒNG - CHỈ XEM */}
            <div className='mb-6 p-4 bg-gray-50 rounded-xl'>
              <h4 className='font-bold mb-3 text-gray-700 flex items-center gap-2'>
                Thông tin hợp đồng <span className='text-xs font-normal text-gray-500'>(Chỉ xem)</span>
              </h4>

              {/* Vehicle Info Grid */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Phương tiện</div>
                  {showContractData?.data?.data?.vehicle?.model}
                </div>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Biển số</div>
                  {showContractData?.data?.data?.vehicle?.plate}
                </div>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Số VIN</div>
                  {showContractData?.data?.data?.vehicle?.vin}
                </div>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Giá trị xe</div>
                  <div className='font-bold text-emerald-600'>
                    {showContractData?.data?.data?.finance?.vehiclePrice?.toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className='bg-gradient-to-r from-emerald-50 to-cyan-50 p-3 rounded-lg mb-4 border border-emerald-200'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-gray-600'>Tiền cọc:</span>
                    <span className='font-bold text-emerald-700 ml-2'>
                      {showContractData?.data?.data?.finance?.depositAmount?.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Owners List */}
              <div className='mt-4'>
                <div className='text-sm text-gray-600 mb-2 font-semibold'>Các bên đồng sở hữu</div>
                {showContractData?.data?.data?.owners?.map((owner) => (
                  <div
                    key={owner?.userId}
                    className='flex justify-between items-center p-3 bg-white rounded-lg mb-2 border border-gray-200 hover:border-blue-300 transition-colors'
                  >
                    <div className='flex-1'>
                      <div className='font-semibold text-gray-800'>{owner.name}</div>
                      <div className='text-xs text-gray-500 mt-1'>
                        <span className='bg-blue-100 text-blue-700 px-2 py-0.5 rounded mr-2'>
                          {owner.userRole} GROUP
                        </span>
                        <span>{owner.phone}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-bold text-blue-600 text-lg'>{owner.share}%</div>
                      <div className='text-xs text-gray-500'>
                        {(
                          ((showContractData?.data?.data?.finance?.vehiclePrice ?? 0) * (owner?.share ?? 0)) /
                          100
                        ).toLocaleString('vi-VN')}{' '}
                        đ
                      </div>
                    </div>
                  </div>
                ))}
                <div className='text-right text-sm mt-2 font-semibold text-gray-700'>
                  Tổng tỷ lệ: <span className='text-blue-600'>100%</span>
                </div>
              </div>
            </div>

            {/* THỜI HẠN HỢP ĐỒNG - CÓ THỂ EDIT */}
            <div className='mb-6 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-500'>
              <h4 className='font-bold mb-3 text-emerald-700 flex items-center gap-2'>
                <ClockCircleOutlined /> Duration{' '}
                <span className='text-xs font-normal text-emerald-600'>(can edit)</span>
              </h4>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Start Date</label>
                  <DatePicker
                    value={startDate}
                    onChange={(date) => setStartDate(date!)}
                    format='DD/MM/YYYY'
                    className='w-full h-10 rounded-lg'
                    placeholder='Select start date'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>End Date</label>
                  <DatePicker
                    value={endDate}
                    onChange={(date) => setEndDate(date!)}
                    format='DD/MM/YYYY'
                    className='w-full h-10 rounded-lg'
                    placeholder='Select end date'
                  />
                </div>
              </div>
            </div>

            {/* ĐIỀU KHOẢN HỢP ĐỒNG - CÓ THỂ EDIT */}
            <div className='mb-4 p-4 bg-amber-50 rounded-xl border-2 border-amber-500'>
              <div className='flex justify-between items-center mb-3'>
                <h4 className='font-bold text-amber-700 m-0 flex items-center gap-2'>
                  <FileTextOutlined /> Contract Terms{' '}
                  <span className='text-xs font-normal text-amber-600'>(Can edit)</span>
                </h4>
                <Button type='primary' size='small' onClick={handleAddTerm} className='rounded-lg'>
                  + Add Term
                </Button>
              </div>

              <div className='flex flex-col gap-3'>
                {editingTerms.map((term, index) => {
                  return (
                    <div
                      key={index}
                      className='border-2 border-amber-600 rounded-lg overflow-hidden bg-white shadow-sm'
                    >
                      <div
                        onClick={() => setOpenTerm(openTerm === index ? null : index)}
                        className='w-full flex justify-between items-center p-3 bg-amber-50 cursor-pointer font-semibold hover:bg-amber-100 transition-colors'
                      >
                        <span className='text-amber-900'>{term.title}</span>
                        <div className='flex gap-2 items-center'>
                          <Button
                            danger
                            size='small'
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteTerm(index)
                            }}
                          >
                            Delete
                          </Button>
                          <span
                            className='transition-transform duration-200 text-amber-700'
                            style={{
                              transform: openTerm === index ? 'rotate(180deg)' : 'rotate(0)'
                            }}
                          >
                            ▼
                          </span>
                        </div>
                      </div>

                      {openTerm === index && (
                        <div className='flex flex-col gap-2'>
                          <input
                            className='border p-2 rounded'
                            value={term.title}
                            onChange={(e) => {
                              const newTerms = [...editingTerms]
                              newTerms[index].title = e.target.value
                              setEditingTerms(newTerms)
                            }}
                          />

                          <TextArea
                            rows={6}
                            value={term.content}
                            onChange={(e) => {
                              const newTerms = [...editingTerms]
                              newTerms[index].content = e.target.value
                              setEditingTerms(newTerms)
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className='flex justify-between items-center gap-3 p-4 border-t border-gray-200 bg-gray-50'>
            {/* <div className='text-xs text-gray-500'>📝 Đã chỉnh sửa: {editingTerms.length} điều khoản</div> */}
            <div className='flex gap-2'>
              <Button
                size='large'
                onClick={() => {
                  setIsEditModalOpen(false)
                  setOpenTerm(null)
                  navigate(-1)
                }}
                className='px-6'
              >
                Cancel
              </Button>
              <Button type='primary' size='large' onClick={handleSave} className='px-6 font-semibold'>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
