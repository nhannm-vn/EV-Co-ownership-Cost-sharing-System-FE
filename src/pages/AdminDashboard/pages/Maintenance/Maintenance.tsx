/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

type MaintenanceItem = {
  description: string
  cost: number
  estimated: string
  category: 'engine' | 'brake' | 'other'
}

type MaintenanceForm = {
  description: string
  cost: string
  estimated: string
  category: 'engine' | 'brake' | 'other'
}

function Maintenance() {
  const [items, setItems] = useState<MaintenanceItem[]>([
    { description: 'Thay dầu máy', cost: 500000, estimated: '2 giờ', category: 'engine' },
    { description: 'Sửa phanh', cost: 700000, estimated: '3 giờ', category: 'brake' }
  ])

  const [form, setForm] = useState<MaintenanceForm>({
    description: '',
    cost: '',
    estimated: '',
    category: 'engine'
  })

  const [filterCategory, setFilterCategory] = useState<'all' | 'engine' | 'brake' | 'other'>('all')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value as any }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.description || !form.cost || !form.estimated) return

    const newItem: MaintenanceItem = {
      description: form.description,
      cost: Number(form.cost),
      estimated: form.estimated,
      category: form.category
    }

    setItems((prev) => [...prev, newItem])
    setForm({ description: '', cost: '', estimated: '', category: 'engine' })
  }

  const filteredItems = filterCategory === 'all' ? items : items.filter((item) => item.category === filterCategory)

  const totalCost = filteredItems.reduce((sum, item) => sum + item.cost, 0)

  const getCategoryBadge = (category: MaintenanceItem['category']) => {
    if (category === 'engine') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    if (category === 'brake') return 'bg-amber-50 text-amber-700 border-amber-100'
    return 'bg-sky-50 text-sky-700 border-sky-100'
  }

  const getCategoryLabel = (category: MaintenanceItem['category']) => {
    if (category === 'engine') return 'Động cơ'
    if (category === 'brake') return 'Phanh'
    return 'Khác'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/40 to-slate-50 flex items-center justify-center px-6 py-10'>
      <div className='w-full max-w-6xl'>
        <div className='relative rounded-[28px] border border-slate-200 bg-white/95 shadow-[0_24px_70px_rgba(15,163,107,0.18)] overflow-hidden'>
          {/* HEADER */}
          <div className='border-b border-emerald-100 bg-[#0FA36B] px-8 py-6 flex flex-wrap gap-4 items-center justify-between'>
            <div>
              <h1 className='text-2xl md:text-3xl font-semibold tracking-tight text-white drop-shadow-sm'>
                Maintenance Schedule
              </h1>
              <p className='mt-1 text-sm md:text-base text-emerald-50/90'>Tạo và quản lý hạng mục bảo dưỡng xe</p>
            </div>
            <div className='flex flex-col items-end gap-1 text-right'>
              <span className='text-xs text-emerald-50/80'>
                Tổng hạng mục: <span className='font-semibold'>{items.length}</span>
              </span>
              <span className='inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-800 border border-emerald-100 shadow-sm'>
                Active
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className='grid gap-8 p-8 lg:grid-cols-[1.5fr,1.1fr] bg-slate-50/70'>
            {/* LIST + FILTER */}
            <div className='space-y-5'>
              {/* Filter bar */}
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <h2 className='text-base md:text-lg font-semibold text-slate-900'>Danh sách hạng mục bảo dưỡng</h2>
                  <p className='text-xs md:text-sm text-slate-500'>
                    Dùng filter để lọc theo nhóm hạng mục khi danh sách quá dài
                  </p>
                </div>
                <div className='flex items-center gap-2 rounded-full bg-white border border-slate-200 px-2 py-1.5'>
                  <button
                    type='button'
                    onClick={() => setFilterCategory('all')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filterCategory === 'all' ? 'bg-[#0FA36B] text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    type='button'
                    onClick={() => setFilterCategory('engine')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filterCategory === 'engine'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Động cơ
                  </button>
                  <button
                    type='button'
                    onClick={() => setFilterCategory('brake')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filterCategory === 'brake' ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Phanh
                  </button>
                  <button
                    type='button'
                    onClick={() => setFilterCategory('other')}
                    className={`px-3 py-1 text-xs rounded-full ${
                      filterCategory === 'other' ? 'bg-sky-100 text-sky-800' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Khác
                  </button>
                </div>
              </div>

              {/* Summary nhỏ của list đang lọc */}
              <div className='rounded-2xl bg-white border border-slate-200 px-4 py-3 flex items-center justify-between text-xs md:text-sm'>
                <span className='text-slate-600'>
                  Đang hiển thị <span className='font-semibold'>{filteredItems.length}</span> hạng mục (
                  {filterCategory === 'all' ? 'tất cả' : getCategoryLabel(filterCategory as any)})
                </span>
                <span className='text-emerald-700 font-semibold'>{totalCost.toLocaleString()} VND</span>
              </div>

              {/* LIST: fixed height + scroll */}
              <div className='rounded-3xl border border-slate-200 bg-white'>
                {/* header sticky khi scroll nhiều */}
                <div className='sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-5 py-3 flex text-[11px] md:text-xs font-semibold uppercase tracking-wide text-slate-500'>
                  <div className='flex-1'>Hạng mục</div>
                  <div className='w-32 text-right'>Chi phí</div>
                  <div className='w-28 text-center'>Thời gian</div>
                  <div className='w-24 text-center'>Nhóm</div>
                </div>

                {/* vùng scroll */}
                <div className='max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent'>
                  {filteredItems.length === 0 ? (
                    <div className='px-5 py-6 text-sm text-slate-500'>Không có hạng mục nào trong nhóm này.</div>
                  ) : (
                    <ul className='divide-y divide-slate-100'>
                      {filteredItems.map((item, index) => (
                        <li
                          key={index}
                          className='px-5 py-3.5 flex items-center gap-3 hover:bg-emerald-50/40 transition-colors'
                        >
                          <div className='flex-1'>
                            <p className='text-sm md:text-base text-slate-900'>{item.description}</p>
                            <p className='text-xs text-slate-500'>Ước tính: {item.estimated}</p>
                          </div>
                          <div className='w-32 text-right text-sm md:text-base font-semibold text-emerald-700'>
                            {item.cost.toLocaleString()} VND
                          </div>
                          <div className='w-28 text-center text-xs text-slate-600'>{item.estimated}</div>
                          <div className='w-24 flex justify-center'>
                            <span
                              className={
                                'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ' +
                                getCategoryBadge(item.category)
                              }
                            >
                              {getCategoryLabel(item.category)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* FORM TẠO HẠNG MỤC */}
            <div className='rounded-3xl border border-emerald-100 bg-white p-6 lg:p-7 shadow-[0_16px_40px_rgba(15,163,107,0.16)]'>
              <h2 className='mb-4 text-lg md:text-xl font-semibold text-slate-900 tracking-wide flex items-center gap-3'>
                <span className='h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base'>
                  +
                </span>
                Thêm hạng mục bảo dưỡng
              </h2>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label
                    className='mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600'
                    htmlFor='description'
                  >
                    Description
                  </label>
                  <input
                    type='text'
                    id='description'
                    name='description'
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0FA36B] focus:outline-none focus:ring-2 focus:ring-[#0FA36B]/30 transition'
                    placeholder='VD: Thay dầu máy, cân bằng lốp...'
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      className='mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600'
                      htmlFor='cost'
                    >
                      Cost (VND)
                    </label>
                    <input
                      type='number'
                      id='cost'
                      name='cost'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0FA36B] focus:outline-none focus:ring-2 focus:ring-[#0FA36B]/30 transition'
                      placeholder='VD: 500000'
                      value={form.cost}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      className='mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600'
                      htmlFor='estimated'
                    >
                      Estimated time
                    </label>
                    <input
                      type='text'
                      id='estimated'
                      name='estimated'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#0FA36B] focus:outline-none focus:ring-2 focus:ring-[#0FA36B]/30 transition'
                      placeholder='VD: 2 giờ, 1.5 giờ...'
                      value={form.estimated}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className='mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-600'
                    htmlFor='category'
                  >
                    Category
                  </label>
                  <select
                    id='category'
                    name='category'
                    value={form.category}
                    onChange={handleChange}
                    className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm md:text-base text-slate-900 shadow-sm focus:border-[#0FA36B] focus:outline-none focus:ring-2 focus:ring-[#0FA36B]/30 transition'
                  >
                    <option value='engine'>Động cơ</option>
                    <option value='brake'>Phanh</option>
                    <option value='other'>Khác</option>
                  </select>
                </div>

                <button
                  type='submit'
                  className='mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0FA36B] px-5 py-3.5 text-sm md:text-base font-semibold text-white shadow-lg shadow-emerald-300/70 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-[#0FA36B]/80 focus:ring-offset-2 focus:ring-offset-slate-50 transition'
                >
                  + Thêm hạng mục
                </button>
              </form>

              <p className='mt-4 text-xs md:text-sm text-slate-500'>
                Khi số lượng hạng mục nhiều, dùng filter + khung list có scroll để vẫn dễ nhìn và không làm vỡ layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maintenance
