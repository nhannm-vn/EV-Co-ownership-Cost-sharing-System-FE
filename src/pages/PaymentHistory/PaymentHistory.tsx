/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'

type Tx = {
  id: string
  date: string
  code: string
  desc: string
  type: 'In' | 'Out'
  amount: number
  status: 'Success' | 'Pending' | 'Failed'
}

const demo: Tx[] = [
  { id: '1', date: '2025-11-01', code: 'TX-9A2F', desc: 'Nạp ví', type: 'In', amount: 500000, status: 'Success' },
  {
    id: '2',
    date: '2025-11-03',
    code: 'TX-1BC4',
    desc: 'Thanh toán đơn #1234',
    type: 'Out',
    amount: 230000,
    status: 'Success'
  },
  { id: '3', date: '2025-11-05', code: 'TX-7ZQK', desc: 'Hoàn tiền', type: 'In', amount: 120000, status: 'Pending' },
  {
    id: '4',
    date: '2025-11-08',
    code: 'TX-5LMN',
    desc: 'Chuyển khoản',
    type: 'Out',
    amount: 1000000,
    status: 'Failed'
  },
  {
    id: '5',
    date: '2025-11-10',
    code: 'TX-8R20',
    desc: 'Thanh toán đơn #1280',
    type: 'Out',
    amount: 750000,
    status: 'Success'
  }
]

function formatVND(n: number) {
  return n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export default function PaymentHistory() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'All' | Tx['status']>('All')
  const [page, setPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return demo
      .filter((tx) => {
        const matchQuery = !q || tx.code.toLowerCase().includes(q) || tx.desc.toLowerCase().includes(q)
        const matchStatus = status === 'All' || tx.status === status
        return matchQuery && matchStatus
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => setPage(1), [query, status])

  const totalIn = filtered.filter((f) => f.type === 'In').reduce((s, x) => s + x.amount, 0)
  const totalOut = filtered.filter((f) => f.type === 'Out').reduce((s, x) => s + x.amount, 0)

  const resetFilters = () => {
    setQuery('')
    setStatus('All')
  }

  return (
    <div
      className='min-h-screen flex items-start justify-center p-8 md:p-12 font-sans
      bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600'
    >
      <div className='mx-auto w-full max-w-4xl'>
        <div className='rounded-3xl bg-white/95 shadow-2xl ring-1 ring-blue-900/10 backdrop-blur'>
          {/* Header + Tổng quan */}
          <div className='px-8 pt-8 pb-6 border-b border-blue-100'>
            <h1 className='text-3xl font-bold text-blue-950 tracking-tight'>Lịch sử giao dịch</h1>
            <p className='mt-2 text-base text-blue-800'>Theo dõi chi tiết mọi giao dịch của bạn.</p>

            <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-5'>
                <div className='text-xs font-medium text-blue-700 uppercase tracking-wide'>Tổng giao dịch</div>
                <div className='mt-2 text-3xl font-bold text-blue-950'>{filtered.length}</div>
              </div>
              <div className='rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-5'>
                <div className='text-xs font-medium text-blue-700 uppercase tracking-wide'>Tiền vào</div>
                <div className='mt-2 text-3xl font-bold text-blue-950'>{formatVND(totalIn)}</div>
              </div>
              <div className='rounded-2xl border border-blue-100 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-5'>
                <div className='text-xs font-medium text-indigo-700 uppercase tracking-wide'>Tiền ra</div>
                <div className='mt-2 text-3xl font-bold text-indigo-950'>{formatVND(totalOut)}</div>
              </div>
            </div>
          </div>

          {/* Bộ lọc */}
          <div className='px-8 pt-6 pb-4'>
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='flex-1'>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Tìm theo mã hoặc mô tả…'
                  className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-base
                    text-blue-950 placeholder-blue-400 shadow-sm focus:outline-none
                    focus:ring-2 focus:ring-blue-600 focus:border-transparent transition'
                />
              </div>

              {/* Segmented control cho trạng thái */}
              <div className='flex rounded-xl border border-blue-200 bg-white p-1 shadow-sm'>
                {(['All', 'Success', 'Pending', 'Failed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s as any)}
                    className={
                      'px-4 py-2 text-sm font-medium rounded-lg transition-all ' +
                      (status === s ? 'bg-blue-600 text-white shadow-md' : 'text-blue-900 hover:bg-blue-50')
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={resetFilters}
                className='rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium
                  text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2
                  focus:ring-blue-600 transition shadow-sm'
              >
                Xóa
              </button>
            </div>
          </div>

          {/* Danh sách giao dịch */}
          <ul className='divide-y divide-blue-100'>
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className='px-8 py-6'>
                  <div className='flex items-center gap-4'>
                    <div className='h-12 w-12 animate-pulse rounded-full bg-blue-100' />
                    <div className='flex-1'>
                      <div className='h-5 w-64 animate-pulse rounded bg-blue-100 mb-2' />
                      <div className='h-4 w-32 animate-pulse rounded bg-blue-100' />
                    </div>
                  </div>
                </li>
              ))}

            {!loading && pageData.length === 0 && (
              <li className='px-8 py-16'>
                <EmptyState onClear={resetFilters} />
              </li>
            )}

            {!loading &&
              pageData.map((tx) => (
                <li key={tx.id} className='px-8 py-6 hover:bg-blue-50/60 transition-colors'>
                  <div className='flex items-center justify-between gap-6'>
                    {/* Icon + Thông tin */}
                    <div className='flex items-center gap-4 min-w-0 flex-1'>
                      <IconCircle type={tx.type} />

                      <div className='min-w-0 flex-1'>
                        <div className='flex items-center gap-2'>
                          <span className='truncate text-base font-medium text-blue-950'>{tx.desc}</span>
                          <span className='shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200'>
                            {tx.code}
                          </span>
                        </div>

                        <div className='mt-1.5 flex items-center gap-3'>
                          <span className='text-xs text-blue-700'>
                            {new Date(tx.date).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </span>
                          <StatusPill status={tx.status} />
                        </div>
                      </div>
                    </div>

                    {/* Số tiền */}
                    <div className='text-right shrink-0'>
                      <div className={'text-xl font-bold ' + (tx.type === 'In' ? 'text-blue-700' : 'text-indigo-700')}>
                        {tx.type === 'In' ? '+' : '-'} {formatVND(tx.amount)}
                      </div>
                      <div className='mt-1'>
                        <span
                          className={
                            'inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ' +
                            (tx.type === 'In'
                              ? 'bg-blue-50 text-blue-700 ring-blue-200'
                              : 'bg-indigo-50 text-indigo-700 ring-indigo-200')
                          }
                        >
                          {tx.type === 'In' ? 'Tiền vào' : 'Tiền ra'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nút hành động */}
                  <div className='mt-4 flex gap-2'>
                    <button
                      type='button'
                      className='rounded-lg border border-blue-200 bg-white px-4 py-2 text-xs font-medium
                      text-blue-900 hover:bg-blue-50 hover:border-blue-300 focus:outline-none 
                      focus:ring-2 focus:ring-blue-600 transition shadow-sm'
                    >
                      Xem chi tiết
                    </button>
                    <button
                      type='button'
                      className='rounded-lg border border-blue-200 bg-white px-4 py-2 text-xs font-medium
                      text-blue-900 hover:bg-blue-50 hover:border-blue-300 focus:outline-none 
                      focus:ring-2 focus:ring-blue-600 transition shadow-sm'
                    >
                      Tải hóa đơn
                    </button>
                  </div>
                </li>
              ))}
          </ul>

          {/* Phân trang */}
          {!loading && filtered.length > 0 && (
            <div className='flex items-center justify-between border-t border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100/50 px-8 py-4'>
              <p className='text-sm font-medium text-blue-900'>
                Trang <span className='font-bold'>{page}</span> / {Math.max(1, Math.ceil(filtered.length / pageSize))}
                <span className='ml-2 text-blue-700'>— {filtered.length} giao dịch</span>
              </p>
              <div className='flex gap-2'>
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className='rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-900 
                    enabled:hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 
                    disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm'
                >
                  ← Trước
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className='rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-900 
                    enabled:hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 
                    disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm'
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </div>

        <p className='mt-6 text-center text-sm text-white/95'>
          Thiết kế tập trung vào trải nghiệm người dùng, dễ đọc trên mọi thiết bị.
        </p>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: Tx['status'] }) {
  const map = {
    Success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 ring-amber-200',
    Failed: 'bg-rose-50 text-rose-700 ring-rose-200'
  }
  const label = {
    Success: 'Thành công',
    Pending: 'Đang xử lý',
    Failed: 'Thất bại'
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${map[status]}`}
    >
      {label[status]}
    </span>
  )
}

function IconCircle({ type }: { type: 'In' | 'Out' }) {
  const base = 'inline-flex h-12 w-12 items-center justify-center rounded-full ring-2 font-bold text-lg'
  const cls =
    type === 'In' ? 'bg-blue-100 text-blue-700 ring-blue-300' : 'bg-indigo-100 text-indigo-700 ring-indigo-300'
  return (
    <span className={`${base} ${cls}`} aria-hidden='true'>
      {type === 'In' ? '↓' : '↑'}
    </span>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/60 p-12 text-center'>
      <div className='text-4xl mb-3'>🔍</div>
      <div className='text-lg font-semibold text-blue-950'>Không tìm thấy giao dịch</div>
      <p className='mt-2 text-sm text-blue-700 max-w-sm'>
        Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái để xem kết quả.
      </p>
      <button
        onClick={onClear}
        className='mt-6 rounded-lg border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium 
          text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 
          transition shadow-sm'
      >
        Xóa bộ lọc
      </button>
    </div>
  )
}
