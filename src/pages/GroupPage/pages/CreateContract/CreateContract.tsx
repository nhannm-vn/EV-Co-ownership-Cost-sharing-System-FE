// CreateContract.tsx
import React, { useState } from 'react'
import { Modal } from 'antd'

const CreateContract: React.FC = () => {
  const [open, setOpen] = useState(false)

  const data = {
    vehicle: {
      id: 'EVS-2025-001',
      brand: 'VinFast VF 8 Plus',
      plate: '30A-123.45',
      vin: 'RLVZZZIEZ8W000001',
      start: '2025-10-20',
      end: '2026-10-19',
      term: '12 tháng'
    },
    shareholders: [
      { id: 1, name: 'Nguyễn Văn A', contact: '0901 234 567 · a@evshare.vn', cccd: 'CCCD 012345678901', percent: 40 },
      { id: 2, name: 'Trần Thị B', contact: '0902 234 567 · b@evshare.vn', cccd: 'CCCD 012345678902', percent: 35 },
      { id: 3, name: 'Lê Văn C', contact: '0903 234 567 · c@evshare.vn', cccd: 'CCCD 012345678903', percent: 25 }
    ],
    fund: { price: '950.000.000 đ', deposit: '30.000.000 đ', reserve: '50.000.000 đ', rule: 'Theo tỷ lệ sở hữu' }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2'
      >
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
        Xem Hợp Đồng
      </button>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null} width={750} centered>
        <div className='p-6'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6 pb-4 border-b'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md'>
                <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                  <path
                    fillRule='evenodd'
                    d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-bold text-gray-900'>EVShare</h2>
                <p className='text-sm text-gray-600'>Hệ thống đồng sở hữu xe điện</p>
              </div>
            </div>
            <div className='text-right'>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md'>DRAFT</span>
              <p className='text-xs text-gray-500 mt-1'>Số: {data.vehicle.id}</p>
            </div>
          </div>

          {/* Title */}
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>HỢP ĐỒNG SỞ HỮU XE CHUNG</h1>
            <p className='text-sm text-gray-600'>
              Căn cứ theo thỏa thuận giữa các Bên thuộc Nhóm sở hữu{' '}
              <span className='font-semibold'>EVShare – Nhóm A</span>
            </p>
          </div>

          {/* Info Grid */}
          <div className='grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg'>
            <div>
              <h3 className='text-sm font-semibold text-gray-900 mb-3'>Thông tin phương tiện</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Hãng / Model</span>
                  <span className='font-medium'>{data.vehicle.brand}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Biển số</span>
                  <span className='font-medium'>{data.vehicle.plate}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Số VIN</span>
                  <span className='font-medium text-xs'>{data.vehicle.vin}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-sm font-semibold text-gray-900 mb-3'>Hiệu lực hợp đồng</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Ngày hiệu lực</span>
                  <span className='font-medium'>{data.vehicle.start}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Ngày kết thúc</span>
                  <span className='font-medium'>{data.vehicle.end}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Kỳ hạn</span>
                  <span className='font-medium'>{data.vehicle.term}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className='max-h-[450px] overflow-y-auto'>
            {/* Table */}
            <div className='mb-6'>
              <h3 className='text-base font-semibold mb-3'>1. Các Bên đồng sở hữu</h3>
              <table className='w-full text-sm border border-gray-200 rounded-lg overflow-hidden'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='border-b px-3 py-2 text-left font-semibold'>#</th>
                    <th className='border-b px-3 py-2 text-left font-semibold'>Họ tên</th>
                    <th className='border-b px-3 py-2 text-left font-semibold'>Liên hệ</th>
                    <th className='border-b px-3 py-2 text-left font-semibold'>Giấy tờ</th>
                    <th className='border-b px-3 py-2 text-left font-semibold'>Tỷ lệ (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.shareholders.map((s, i) => (
                    <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className='border-b px-3 py-2'>{s.id}</td>
                      <td className='border-b px-3 py-2 font-medium'>{s.name}</td>
                      <td className='border-b px-3 py-2 text-xs'>{s.contact}</td>
                      <td className='border-b px-3 py-2'>{s.cccd}</td>
                      <td className='border-b px-3 py-2 font-semibold'>{s.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className='text-sm mt-2'>
                Tổng tỷ lệ: <span className='font-semibold'>100%</span>
              </p>
            </div>

            {/* Fund */}
            <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
              <h3 className='text-base font-semibold mb-3'>2. Góp vốn & Quỹ vận hành</h3>
              <div className='space-y-2 text-sm mb-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Giá trị xe</span>
                  <span className='font-semibold'>{data.fund.price}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Tiền cọc</span>
                  <span className='font-semibold'>{data.fund.deposit}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Mục tiêu quỹ</span>
                  <span className='font-semibold'>{data.fund.reserve}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Nguyên tắc góp</span>
                  <span className='font-medium'>{data.fund.rule}</span>
                </div>
              </div>
              <p className='text-xs text-gray-600 leading-relaxed'>
                Các khoản chi bảo dưỡng, sạc, vé sinh... được thanh toán từ Quỹ chung; khoản cá nhân (nếu có) do cá nhân
                chi trả theo bút toán bù trừ.
              </p>
            </div>

            {/* Other Sections */}
            <div className='space-y-4'>
              <div>
                <h3 className='text-base font-semibold mb-2'>3. Quyền sử dụng & Lịch đặt</h3>
                <p className='text-sm text-gray-700'>
                  Việc sử dụng xe được thực hiện thông qua hệ thống đặt lịch. Quy tắc ưu tiên: Điểm tín dụng lịch sử &
                  phiên bốc thăm tuần.
                </p>
              </div>
              <div>
                <h3 className='text-base font-semibold mb-2'>4. Bảo dưỡng, Sửa chữa & Bảo hiểm</h3>
                <p className='text-sm text-gray-700'>
                  Xe được bảo dưỡng định kỳ theo khuyến nghị của hãng. Biểu quyết &gt; 50% theo tỷ lệ sở hữu cho chi
                  &gt; 5 triệu. Bảo hiểm: PVI – Gói vật chất toàn diện.
                </p>
              </div>
              <div>
                <h3 className='text-base font-semibold mb-2'>5. Giải quyết tranh chấp</h3>
                <p className='text-sm text-gray-700'>
                  Tranh chấp phát sinh được giải quyết trên hệ thống và ưu tiên hòa giải trong Nhóm. Cơ chế biểu quyết:
                  Đa số theo tỷ lệ sở hữu.
                </p>
              </div>

              <div>
                <h3 className='text-base font-semibold mb-2'>6. Điều khoản chung</h3>
                <ul className='text-sm text-gray-700 space-y-1.5'>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Hợp đồng có hiệu lực khi tất cả Bên đồng sở hữu đồng ý và ký.</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Kích hoạt sau khi đóng đủ tiền cọc theo quy định.</span>
                  </li>
                  <li className='flex gap-2'>
                    <span>•</span>
                    <span>Hệ thống lưu vết phiên bản, thời điểm ký và danh tính người ký.</span>
                  </li>
                </ul>
              </div>

              <div className='p-4 bg-gray-50 rounded-lg'>
                <h3 className='text-base font-semibold mb-3'>7. Chữ ký các Bên</h3>
                <p className='text-sm font-semibold'>Nguyễn Văn A</p>
                <p className='text-xs text-gray-600 mb-2'>Đại diện Nhóm (Admin)</p>
                <div className='border-t pt-3'>
                  <p className='text-xs text-gray-500'>
                    Địa điểm ký: <span className='font-medium'>Hà Nội</span> · Ngày:{' '}
                    <span className='font-medium'>2025-10-20</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CreateContract
