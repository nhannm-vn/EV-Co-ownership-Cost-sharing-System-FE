import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Issue {
  id: string
  reporter: string
  target: string
  category: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  status: 'pending' | 'resolved'
  date: string
}

export default function IssueReport() {
  const [showForm, setShowForm] = useState(false)
  const [selectedMember, setSelectedMember] = useState('')
  const [category, setCategory] = useState('0')
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const members = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D']
  const categories = ['Hư hỏng xe', 'Trả xe muộn', 'Vệ sinh kém', 'Hành vi xấu']

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      reporter: 'Nguyễn Văn A',
      target: 'Trần Thị B',
      category: 'Trả xe muộn',
      title: 'Trả xe muộn 2 giờ',
      description: 'Hẹn trả xe lúc 18:00 nhưng đến 20:00 mới trả',
      severity: 'medium',
      status: 'pending',
      date: '2025-10-13'
    },
    {
      id: '2',
      reporter: 'Lê Văn C',
      target: 'Nguyễn Văn A',
      category: 'Hư hỏng xe',
      title: 'Gương chiếu hậu bị vỡ',
      description: 'Gương bên phải bị nứt sau khi sử dụng xe',
      severity: 'high',
      status: 'pending',
      date: '2025-10-12'
    },
    {
      id: '3',
      reporter: 'Phạm Thị D',
      target: 'Lê Văn C',
      category: 'Vệ sinh kém',
      title: 'Xe không được vệ sinh',
      description: 'Nội thất xe còn rác và bụi bẩn',
      severity: 'low',
      status: 'resolved',
      date: '2025-10-10'
    }
  ])

  const handleSubmit = () => {
    if (!selectedMember || !title || !description) return alert('Vui lòng điền đầy đủ thông tin!')

    setIssues([
      {
        id: Date.now().toString(),
        reporter: 'Bạn',
        target: selectedMember,
        category: categories[parseInt(category)],
        title,
        description,
        severity,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
      },
      ...issues
    ])

    setShowForm(false)
    setSelectedMember('')
    setTitle('')
    setDescription('')
  }

  const handleResolve = (id: string) => {
    setIssues(issues.map((i) => (i.id === id ? { ...i, status: 'resolved' as const } : i)))
  }

  const getSeverityStyle = (sev: string) => {
    if (sev === 'high') return 'bg-rose-500/15 text-rose-300 border border-rose-400/40'
    if (sev === 'medium') return 'bg-amber-500/15 text-amber-300 border border-amber-400/40'
    return 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/40'
  }

  return (
    <div className='min-h-screen bg-[#0a3d3d] p-6 relative overflow-hidden'>
      {/* Decorative Elements */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl' />

      <div className='max-w-5xl mx-auto mt-10 relative z-10'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='mb-10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl blur-xl opacity-40' />
                <div className='relative w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl'>
                  <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='text-[#0a3d3d]'>
                    <path
                      d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01'
                      stroke='currentColor'
                      strokeWidth='2.5'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className='text-4xl font-black bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-1'>
                  Issue Report
                </h1>
                <p className='text-cyan-400/70'>Quản lý và giải quyết vấn đề trong nhóm</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowForm(!showForm)}
              className='relative group'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity' />
              <div className='relative px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-[#0a3d3d] rounded-xl font-bold shadow-xl flex items-center gap-2'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                  <path d='M12 5v14M5 12h14' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                </svg>
                Báo cáo mới
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='mb-8'
            >
              <div className='bg-gradient-to-br from-[#1a4d4d]/70 to-[#0f4545]/70 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 p-6 shadow-2xl'>
                <div className='flex items-center justify-between mb-5'>
                  <h2 className='text-xl font-bold text-cyan-300'>Tạo báo cáo mới</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className='w-8 h-8 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-all group'
                  >
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      className='text-cyan-400 group-hover:text-cyan-300'
                    >
                      <path d='M18 6L6 18M6 6l12 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                  </button>
                </div>

                <div className='space-y-4'>
                  <div className='grid grid-cols-3 gap-3'>
                    <select
                      value={selectedMember}
                      onChange={(e) => setSelectedMember(e.target.value)}
                      className='px-4 py-3 bg-[#0a3d3d]/80 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm font-medium focus:border-cyan-400 focus:bg-[#0a3d3d] focus:outline-none transition-all'
                    >
                      <option value=''>Chọn thành viên</option>
                      {members.map((m, i) => (
                        <option key={i} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>

                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className='px-4 py-3 bg-[#0a3d3d]/80 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm font-medium focus:border-cyan-400 focus:bg-[#0a3d3d] focus:outline-none transition-all'
                    >
                      {categories.map((cat, i) => (
                        <option key={i} value={i}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <select
                      value={severity}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(e) => setSeverity(e.target.value as any)}
                      className='px-4 py-3 bg-[#0a3d3d]/80 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm font-medium focus:border-cyan-400 focus:bg-[#0a3d3d] focus:outline-none transition-all'
                    >
                      <option value='low'>Nhẹ</option>
                      <option value='medium'>Trung bình</option>
                      <option value='high'>Nghiêm trọng</option>
                    </select>
                  </div>

                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Tiêu đề vấn đề...'
                    className='w-full px-4 py-3 bg-[#0a3d3d]/80 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm font-medium placeholder-cyan-600 focus:border-cyan-400 focus:bg-[#0a3d3d] focus:outline-none transition-all'
                  />

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Mô tả chi tiết vấn đề...'
                    rows={4}
                    className='w-full px-4 py-3 bg-[#0a3d3d]/80 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm font-medium placeholder-cyan-600 focus:border-cyan-400 focus:bg-[#0a3d3d] focus:outline-none resize-none transition-all'
                  />

                  <div className='flex gap-3 pt-2'>
                    <button
                      onClick={() => setShowForm(false)}
                      className='px-5 py-3 bg-cyan-500/10 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-500/20 transition-all border border-cyan-500/30'
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSubmit}
                      className='flex-1 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 text-[#0a3d3d] rounded-xl font-bold hover:from-teal-500 hover:to-cyan-500 transition-all shadow-lg'
                    >
                      Gửi báo cáo
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Issues List */}
        <div className='space-y-4'>
          {issues.length === 0 ? (
            <div className='text-center py-20 bg-gradient-to-br from-[#1a4d4d]/50 to-[#0f4545]/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20'>
              <div className='w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='text-cyan-500/50'>
                  <rect x='3' y='6' width='18' height='15' rx='2' stroke='currentColor' strokeWidth='2' />
                  <path d='M3 10h18' stroke='currentColor' strokeWidth='2' />
                </svg>
              </div>
              <p className='text-cyan-400/60 font-medium'>Chưa có báo cáo nào</p>
            </div>
          ) : (
            issues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className='group bg-gradient-to-br from-[#1a4d4d]/60 to-[#0f4545]/60 backdrop-blur-xl rounded-2xl p-5 border border-cyan-500/20 hover:border-cyan-400/40 transition-all shadow-lg hover:shadow-cyan-500/10'
              >
                <div className='flex items-start gap-4'>
                  {/* Icon */}
                  <div className='w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-cyan-400/30 flex-shrink-0'>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-cyan-400'>
                      <path
                        d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                  </div>

                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-3'>
                      <span className='px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 text-xs font-bold rounded-full border border-cyan-400/40'>
                        {issue.category}
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${getSeverityStyle(issue.severity)}`}>
                        {issue.severity === 'high'
                          ? 'Nghiêm trọng'
                          : issue.severity === 'medium'
                            ? 'Trung bình'
                            : 'Nhẹ'}
                      </span>
                      {issue.status === 'resolved' && (
                        <span className='px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-400/40 flex items-center gap-1'>
                          <svg width='12' height='12' viewBox='0 0 24 24' fill='none'>
                            <path d='M5 13l4 4L19 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                          </svg>
                          Đã giải quyết
                        </span>
                      )}
                    </div>

                    <h3 className='text-lg font-bold text-cyan-200 mb-2 group-hover:text-cyan-100 transition-colors'>
                      {issue.title}
                    </h3>

                    <div className='flex items-center gap-2 text-xs text-cyan-400/80 mb-3 font-medium'>
                      <span className='text-cyan-300'>{issue.reporter}</span>
                      <svg width='14' height='14' viewBox='0 0 24 24' fill='none' className='text-cyan-500'>
                        <path
                          d='M5 12h14M12 5l7 7-7 7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span className='text-cyan-300'>{issue.target}</span>
                      <span className='text-cyan-700'>•</span>
                      <span>{new Date(issue.date).toLocaleDateString('vi-VN')}</span>
                    </div>

                    <p className='text-cyan-300/70 text-sm leading-relaxed mb-4'>{issue.description}</p>

                    {issue.status === 'pending' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleResolve(issue.id)}
                        className='px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-400/40 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all flex items-center gap-2'
                      >
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                          <path d='M5 13l4 4L19 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
                        </svg>
                        Đánh dấu đã giải quyết
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
