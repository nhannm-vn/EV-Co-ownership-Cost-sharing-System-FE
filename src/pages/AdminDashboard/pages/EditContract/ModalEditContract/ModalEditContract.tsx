import { ClockCircleOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import { Button, DatePicker } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useState } from 'react'

// Mock data đầy đủ
const mockContractData = {
  contractNumber: 'HĐ-2025-0156',
  group: { name: 'Nhóm EV Sài Gòn' },
  vehicle: {
    name: 'VinFast VF 8 Plus',
    plate: '51G-98765',
    vin: 'VF8XYZABC9876543210'
  },
  finance: {
    vehiclePrice: 1200000000,
    depositAmount: 240000000
  },
  owners: [
    { name: 'Nguyễn Văn An', userRole: 'ADMIN', phone: '0901234567', share: 50 },
    { name: 'Trần Thị Bình', userRole: 'MEMBER', phone: '0912345678', share: 30 },
    { name: 'Lê Hoàng Cường', userRole: 'MEMBER', phone: '0923456789', share: 20 }
  ],
  contract: {
    effectiveDate: '2025-01-15',
    endDate: '2027-01-15',
    termLabel: '24 tháng',
    status: 'PENDING'
  }
}

export default function ModalEditContract() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(true)
  const [openTerm, setOpenTerm] = useState<number | null>(null)
  const [startDate, setStartDate] = useState(dayjs(mockContractData.contract.effectiveDate))
  const [endDate, setEndDate] = useState(dayjs(mockContractData.contract.endDate))
  const [editingTerms, setEditingTerms] = useState([
    `1. Quyền và nghĩa vụ của các bên\n- Các bên cam kết sử dụng xe theo lịch đã thỏa thuận trong ứng dụng.\n- Mỗi bên có trách nhiệm bảo dưỡng xe định kỳ theo quy định của nhà sản xuất.\n- Không được chuyển nhượng quyền sử dụng cho bên thứ ba khi chưa có sự đồng ý của các thành viên khác.`,

    `2. Phí và chi phí vận hành\n- Chi phí nhiên liệu/sạc pin do người sử dụng trực tiếp thanh toán.\n- Chi phí bảo hiểm, bảo dưỡng định kỳ được chia theo tỷ lệ sở hữu.\n- Quỹ dự phòng: Mỗi thành viên đóng góp 2,000,000 đ/tháng vào quỹ chung để chi trả các khoản phát sinh.`,

    `3. Lịch sử dụng xe\n- Mỗi thành viên được sử dụng xe theo tỷ lệ sở hữu (tính theo ngày/tuần).\n- Đặt lịch trước tối thiểu 24 giờ qua ứng dụng EVShare.\n- Trường hợp khẩn cấp cần thông báo và được sự đồng ý của các thành viên khác.`,

    `4. Xử lý vi phạm và tranh chấp\n- Vi phạm lịch sử dụng không có lý do chính đáng: Phạt 500,000 đ/lần.\n- Gây hư hại xe do lỗi cá nhân: Người gây ra chịu toàn bộ chi phí sửa chữa.\n- Tranh chấp sẽ được giải quyết thông qua hòa giải nội bộ hoặc cơ quan pháp luật có thẩm quyền.`,

    `5. Điều khoản chấm dứt hợp đồng\n- Hợp đồng có thể chấm dứt khi có sự đồng ý của 100% các bên.\n- Trường hợp một bên muốn rút khỏi nhóm, cần thông báo trước 3 tháng và tìm người thay thế.\n- Khi chấm dứt hợp đồng, tài sản được thanh lý và chia theo tỷ lệ sở hữu.`
  ])

  const handleAddTerm = () => {
    setEditingTerms([...editingTerms, `${editingTerms.length + 1}. Điều khoản mới\nNội dung điều khoản...`])
  }

  const handleDeleteTerm = (idx: number) => {
    setEditingTerms(editingTerms.filter((_, i) => i !== idx))
  }

  const handleUpdateTerm = (idx: number, value: string) => {
    const newTerms = [...editingTerms]
    newTerms[idx] = value
    setEditingTerms(newTerms)
  }

  const handleSave = () => {
    console.log('Lưu thay đổi:', {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      terms: editingTerms
    })
    // Logic lưu của bạn ở đây
  }

  if (!isEditModalOpen) return null

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className='fixed inset-0 bg-black/45 flex items-center justify-center z-[1000]'
        onClick={() => setIsEditModalOpen(false)}
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
                {mockContractData.contractNumber} - {mockContractData.group.name}
              </p>
            </div>
            <span className='bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-lg font-semibold'>
              {mockContractData.contract.status}
            </span>
          </div>

          {/* Modal Body */}
          <div className='flex-1 overflow-y-auto p-4'>
            {/* THÔNG TIN HỢP ĐỒNG - CHỈ XEM */}
            <div className='mb-6 p-4 bg-gray-50 rounded-xl'>
              <h4 className='font-bold mb-3 text-gray-700 flex items-center gap-2'>
                📋 Thông tin hợp đồng <span className='text-xs font-normal text-gray-500'>(Chỉ xem)</span>
              </h4>

              {/* Vehicle Info Grid */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Phương tiện</div>
                  <div className='font-bold text-blue-600'>{mockContractData.vehicle.name}</div>
                </div>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Biển số</div>
                  <div className='font-semibold'>{mockContractData.vehicle.plate}</div>
                </div>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Số VIN</div>
                  <div className='font-semibold text-xs'>{mockContractData.vehicle.vin}</div>
                </div>
                <div className='bg-white p-3 rounded-lg border border-gray-200'>
                  <div className='text-xs text-gray-500 mb-1'>Giá trị xe</div>
                  <div className='font-bold text-emerald-600'>
                    {mockContractData.finance.vehiclePrice.toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              {/* Financial Info */}
              <div className='bg-gradient-to-r from-emerald-50 to-cyan-50 p-3 rounded-lg mb-4 border border-emerald-200'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <span className='text-gray-600'>Tiền cọc:</span>
                    <span className='font-bold text-emerald-700 ml-2'>
                      {mockContractData.finance.depositAmount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                  <div>
                    <span className='text-gray-600'>Kỳ hạn:</span>
                    <span className='font-bold text-cyan-700 ml-2'>{mockContractData.contract.termLabel}</span>
                  </div>
                </div>
              </div>

              {/* Owners List */}
              <div className='mt-4'>
                <div className='text-sm text-gray-600 mb-2 font-semibold'>Các bên đồng sở hữu</div>
                {mockContractData.owners.map((owner, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-center p-3 bg-white rounded-lg mb-2 border border-gray-200 hover:border-blue-300 transition-colors'
                  >
                    <div className='flex-1'>
                      <div className='font-semibold text-gray-800'>{owner.name}</div>
                      <div className='text-xs text-gray-500 mt-1'>
                        <span className='bg-blue-100 text-blue-700 px-2 py-0.5 rounded mr-2'>{owner.userRole}</span>
                        <span>{owner.phone}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-bold text-blue-600 text-lg'>{owner.share}%</div>
                      <div className='text-xs text-gray-500'>
                        {((mockContractData.finance.vehiclePrice * owner.share) / 100).toLocaleString('vi-VN')} đ
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
                <ClockCircleOutlined /> Thời hạn hợp đồng{' '}
                <span className='text-xs font-normal text-emerald-600'>(Có thể chỉnh sửa)</span>
              </h4>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Ngày bắt đầu</label>
                  <DatePicker
                    value={startDate}
                    onChange={(date) => setStartDate(date!)}
                    format='DD/MM/YYYY'
                    className='w-full h-10 rounded-lg'
                    placeholder='Chọn ngày bắt đầu'
                  />
                </div>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Ngày kết thúc</label>
                  <DatePicker
                    value={endDate}
                    onChange={(date) => setEndDate(date!)}
                    format='DD/MM/YYYY'
                    className='w-full h-10 rounded-lg'
                    placeholder='Chọn ngày kết thúc'
                  />
                </div>
              </div>
              <div className='mt-3 p-2 bg-white rounded-lg text-sm text-gray-600'>
                💡 Thời gian hiệu lực:{' '}
                <span className='font-semibold text-emerald-700'>
                  {endDate.diff(startDate, 'month')} tháng ({endDate.diff(startDate, 'day')} ngày)
                </span>
              </div>
            </div>

            {/* ĐIỀU KHOẢN HỢP ĐỒNG - CÓ THỂ EDIT */}
            <div className='mb-4 p-4 bg-amber-50 rounded-xl border-2 border-amber-500'>
              <div className='flex justify-between items-center mb-3'>
                <h4 className='font-bold text-amber-700 m-0 flex items-center gap-2'>
                  <FileTextOutlined /> Điều khoản hợp đồng{' '}
                  <span className='text-xs font-normal text-amber-600'>(Có thể chỉnh sửa)</span>
                </h4>
                <Button type='primary' size='small' onClick={handleAddTerm} className='rounded-lg'>
                  + Thêm điều khoản
                </Button>
              </div>

              <div className='flex flex-col gap-3'>
                {editingTerms.map((term, idx) => {
                  const lines = term.split('\n')
                  const title = lines[0]
                  // const content = lines.slice(1).join('\n')

                  return (
                    <div key={idx} className='border-2 border-amber-600 rounded-lg overflow-hidden bg-white shadow-sm'>
                      <div
                        onClick={() => setOpenTerm(openTerm === idx ? null : idx)}
                        className='w-full flex justify-between items-center p-3 bg-amber-50 cursor-pointer font-semibold hover:bg-amber-100 transition-colors'
                      >
                        <span className='text-amber-900'>{title || `Điều khoản ${idx + 1}`}</span>
                        <div className='flex gap-2 items-center'>
                          <Button
                            danger
                            size='small'
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteTerm(idx)
                            }}
                          >
                            🗑️ Xóa
                          </Button>
                          <span
                            className='transition-transform duration-200 text-amber-700'
                            style={{
                              transform: openTerm === idx ? 'rotate(180deg)' : 'rotate(0)'
                            }}
                          >
                            ▼
                          </span>
                        </div>
                      </div>
                      {openTerm === idx && (
                        <div className='p-4 bg-white'>
                          <TextArea
                            value={term}
                            onChange={(e) => handleUpdateTerm(idx, e.target.value)}
                            rows={8}
                            placeholder='Tiêu đề điều khoản (dòng đầu)&#10;Nội dung chi tiết...'
                            className='rounded-lg border-2 border-amber-200 focus:border-amber-500'
                          />
                          <div className='mt-3 p-2 bg-amber-50 rounded-lg text-xs text-amber-800 flex items-start gap-2'>
                            <span>💡</span>
                            <div>
                              <strong>Hướng dẫn:</strong> Dòng đầu tiên là tiêu đề điều khoản (ví dụ: "1. Quyền và nghĩa
                              vụ"). Các dòng tiếp theo là nội dung chi tiết.
                            </div>
                          </div>
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
            <div className='text-xs text-gray-500'>📝 Đã chỉnh sửa: {editingTerms.length} điều khoản</div>
            <div className='flex gap-2'>
              <Button
                size='large'
                onClick={() => {
                  setIsEditModalOpen(false)
                  setOpenTerm(null)
                }}
                className='px-6'
              >
                Hủy
              </Button>
              <Button type='primary' size='large' onClick={handleSave} className='px-6 font-semibold'>
                💾 Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
