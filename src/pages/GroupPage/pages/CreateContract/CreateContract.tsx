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
      { id: 1, name: 'Nguyễn Văn A', contact: '0901 234 567 · a@evshare.vn', percent: 40 },
      { id: 2, name: 'Trần Thị B', contact: '0902 234 567 · b@evshare.vn', percent: 35 },
      { id: 3, name: 'Lê Văn C', contact: '0903 234 567 · c@evshare.vn', percent: 25 }
    ],
    fund: { price: '950.000.000 đ', deposit: '30.000.000 đ', reserve: '50.000.000 đ', rule: 'Theo tỷ lệ sở hữu' }
  }

  return (
    <>
      <style>{`
        .holographic-modal .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(224, 242, 254);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(34, 211, 238), rgb(14, 165, 233));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(6, 182, 212), rgb(3, 105, 161));
        }
      `}</style>

      <button
        onClick={() => setOpen(true)}
        className='px-6 py-3 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-500 hover:to-sky-600 text-white font-bold rounded-xl shadow-[0_8px_25px_rgba(6,182,212,0.5)] hover:shadow-[0_10px_35px_rgba(6,182,212,0.7)] border-[2px] border-white/40 transition-all duration-400 flex items-center gap-2'
      >
        <svg
          className='w-5 h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
        Xem Hợp Đồng
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        centered
        className='holographic-modal'
      >
        <div className='p-8 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-2xl'>
          <div className='flex items-center justify-between mb-6 pb-6 border-b-[2px] border-gradient-to-r from-cyan-200/50 via-sky-200/50 to-indigo-200/50'>
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 bg-gradient-to-br from-cyan-400 to-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.5)] border-[2px] border-white/50'>
                <svg
                  className='w-7 h-7 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                  <path
                    fillRule='evenodd'
                    d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div>
                <h2 className='text-xl font-black text-gray-800'>EVShare</h2>
                <p className='text-sm text-gray-600 font-medium'>Hệ thống đồng sở hữu xe điện</p>
              </div>
            </div>
            <div className='text-right'>
              <span className='px-3 py-1.5 bg-cyan-100 text-cyan-700 text-xs font-bold rounded-lg border border-cyan-200'>
                DRAFT
              </span>
              <p className='text-xs text-gray-500 mt-1 font-medium'>Số: {data.vehicle.id}</p>
            </div>
          </div>

          <div className='mb-6'>
            <h1 className='text-2xl font-black text-gray-900 mb-2'>HỢP ĐỒNG SỞ HỮU XE CHUNG</h1>
            <p className='text-sm text-gray-600 font-medium'>
              Căn cứ theo thỏa thuận giữa các Bên thuộc Nhóm sở hữu{' '}
              <span className='font-bold text-cyan-700'>EVShare – Nhóm A</span>
            </p>
          </div>

          <div className='grid grid-cols-2 gap-6 mb-6 p-5 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 rounded-xl border-[2px] border-cyan-100'>
            <div>
              <h3 className='text-sm font-bold text-gray-900 mb-3'>Thông tin phương tiện</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Hãng / Model</span>
                  <span className='font-bold text-gray-800'>{data.vehicle.brand}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Biển số</span>
                  <span className='font-bold text-gray-800'>{data.vehicle.plate}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Số VIN</span>
                  <span className='font-bold text-gray-800 text-xs'>{data.vehicle.vin}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-sm font-bold text-gray-900 mb-3'>Hiệu lực hợp đồng</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Ngày hiệu lực</span>
                  <span className='font-bold text-gray-800'>{data.vehicle.start}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Ngày kết thúc</span>
                  <span className='font-bold text-gray-800'>{data.vehicle.end}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Kỳ hạn</span>
                  <span className='font-bold text-gray-800'>{data.vehicle.term}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='max-h-[450px] overflow-y-auto pr-2 custom-scrollbar'>
            <div className='mb-6'>
              <h3 className='text-base font-bold mb-3 text-gray-900'>1. Các Bên đồng sở hữu</h3>
              <table className='w-full text-sm border-[2px] border-cyan-100 rounded-xl overflow-hidden'>
                <thead className='bg-gradient-to-r from-cyan-100 to-sky-100'>
                  <tr>
                    <th className='border-b-[2px] border-cyan-200 px-3 py-2.5 text-left font-bold text-gray-800'>#</th>
                    <th className='border-b-[2px] border-cyan-200 px-3 py-2.5 text-left font-bold text-gray-800'>
                      Họ tên
                    </th>
                    <th className='border-b-[2px] border-cyan-200 px-3 py-2.5 text-left font-bold text-gray-800'>
                      Liên hệ
                    </th>
                    <th className='border-b-[2px] border-cyan-200 px-3 py-2.5 text-left font-bold text-gray-800'>
                      Tỷ lệ (%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.shareholders.map((s, i) => (
                    <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-cyan-50/50'}>
                      <td className='border-b border-cyan-100 px-3 py-2.5 font-medium text-gray-700'>{s.id}</td>
                      <td className='border-b border-cyan-100 px-3 py-2.5 font-bold text-gray-800'>{s.name}</td>
                      <td className='border-b border-cyan-100 px-3 py-2.5 text-xs text-gray-600'>{s.contact}</td>
                      <td className='border-b border-cyan-100 px-3 py-2.5 font-black text-cyan-700'>{s.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className='text-sm mt-3 font-medium text-gray-700'>
                Tổng tỷ lệ: <span className='font-black text-cyan-700'>100%</span>
              </p>
            </div>

            <div className='mb-6 p-5 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 rounded-xl border-[2px] border-cyan-100'>
              <h3 className='text-base font-bold mb-3 text-gray-900'>2. Góp vốn & Quỹ vận hành</h3>
              <div className='space-y-2 text-sm mb-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Giá trị xe</span>
                  <span className='font-black text-gray-800'>{data.fund.price}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Tiền cọc</span>
                  <span className='font-black text-gray-800'>{data.fund.deposit}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Mục tiêu quỹ</span>
                  <span className='font-black text-gray-800'>{data.fund.reserve}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600 font-medium'>Nguyên tắc góp</span>
                  <span className='font-bold text-gray-800'>{data.fund.rule}</span>
                </div>
              </div>
              <p className='text-xs text-gray-600 leading-relaxed font-medium'>
                Các khoản chi bảo dưỡng, sạc, vé sinh... được thanh toán từ Quỹ chung; khoản cá nhân (nếu có) do cá nhân
                chi trả theo bút toán bù trừ.
              </p>
            </div>

            <div className='space-y-5'>
              <div>
                <h3 className='text-base font-bold mb-2 text-gray-900'>3. Quyền sử dụng & Lịch đặt</h3>
                <p className='text-sm text-gray-700 leading-relaxed font-medium'>
                  Việc sử dụng xe được thực hiện thông qua hệ thống đặt lịch. Quy tắc ưu tiên: Điểm tín dụng lịch sử &
                  phiên bốc thăm tuần.
                </p>
              </div>
              <div>
                <h3 className='text-base font-bold mb-2 text-gray-900'>4. Bảo dưỡng, Sửa chữa & Bảo hiểm</h3>
                <p className='text-sm text-gray-700 leading-relaxed font-medium'>
                  Xe được bảo dưỡng định kỳ theo khuyến nghị của hãng. Biểu quyết &gt; 50% theo tỷ lệ sở hữu cho chi
                  &gt; 5 triệu. Bảo hiểm: PVI – Gói vật chất toàn diện.
                </p>
              </div>
              <div>
                <h3 className='text-base font-bold mb-2 text-gray-900'>5. Giải quyết tranh chấp</h3>
                <p className='text-sm text-gray-700 leading-relaxed font-medium'>
                  Tranh chấp phát sinh được giải quyết trên hệ thống và ưu tiên hòa giải trong Nhóm. Cơ chế biểu quyết:
                  Đa số theo tỷ lệ sở hữu.
                </p>
              </div>
              <div>
                <h3 className='text-base font-bold mb-2 text-gray-900'>6. Điều khoản chung</h3>
                <ul className='text-sm text-gray-700 space-y-2 font-medium'>
                  <li className='flex gap-2'>
                    <span className='text-cyan-600 font-bold'>•</span>
                    <span>Hợp đồng có hiệu lực khi tất cả Bên đồng sở hữu đồng ý và ký.</span>
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-cyan-600 font-bold'>•</span>
                    <span>Kích hoạt sau khi đóng đủ tiền cọc theo quy định.</span>
                  </li>
                  <li className='flex gap-2'>
                    <span className='text-cyan-600 font-bold'>•</span>
                    <span>Hệ thống lưu vết phiên bản, thời điểm ký và danh tính người ký.</span>
                  </li>
                </ul>
              </div>
              <div className='p-5 bg-gradient-to-br from-cyan-50/80 to-sky-50/80 rounded-xl border-[2px] border-cyan-100'>
                <h3 className='text-base font-bold mb-3 text-gray-900'>7. Chữ ký các Bên</h3>
                <p className='text-sm font-bold text-gray-800'>Nguyễn Văn A</p>
                <p className='text-xs text-gray-600 mb-3 font-medium'>Đại diện Nhóm (Admin)</p>
                <div className='border-t-[2px] border-cyan-100 pt-3'>
                  <p className='text-xs text-gray-600 font-medium'>
                    Địa điểm ký: <span className='font-bold text-gray-800'>Hà Nội</span> · Ngày:{' '}
                    <span className='font-bold text-gray-800'>2025-10-20</span>
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
