/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Voting.tsx
import { useState } from 'react'

interface Vote {
  id: number
  title: string
  description: string
  options: { id: number; text: string; votes: number }[]
  createdBy: string
  endTime: string
  totalVotes: number
  totalMembers: number
  hasVoted: boolean
  votedOption?: number
}

const MOCK_VOTES: Vote[] = [
  {
    id: 1,
    title: 'Lịch bảo dưỡng xe',
    description: 'Chọn thời gian phù hợp',
    options: [
      { id: 1, text: 'Tuần đầu tháng', votes: 8 },
      { id: 2, text: 'Tuần thứ 2', votes: 12 },
      { id: 3, text: 'Cuối tháng', votes: 5 }
    ],
    createdBy: 'Minh Anh',
    endTime: '2025-11-10T23:59:59',
    totalVotes: 25,
    totalMembers: 30,
    hasVoted: false
  },
  {
    id: 2,
    title: 'Phân chia chi phí',
    description: 'Chọn phương án chia chi phí',
    options: [
      { id: 4, text: 'Chia đều', votes: 6 },
      { id: 5, text: 'Theo km', votes: 15 },
      { id: 6, text: 'Theo thời gian', votes: 3 }
    ],
    createdBy: 'Tuấn Anh',
    endTime: '2025-11-08T18:00:00',
    totalVotes: 24,
    totalMembers: 30,
    hasVoted: true,
    votedOption: 5
  },
  {
    id: 3,
    title: 'Nâng cấp trạm sạc',
    description: 'Đầu tư thêm sạc nhanh',
    options: [
      { id: 7, text: 'Đồng ý', votes: 18 },
      { id: 8, text: 'Chờ 6 tháng', votes: 7 }
    ],
    createdBy: 'Hương Giang',
    endTime: '2025-11-15T23:59:59',
    totalVotes: 25,
    totalMembers: 30,
    hasVoted: false
  }
]

export default function Voting() {
  const [votes, setVotes] = useState<Vote[]>(MOCK_VOTES)
  const [showModal, setShowModal] = useState(false)

  const handleVote = (voteId: number, optionId: number) => {
    setVotes(
      votes.map((v) =>
        v.id === voteId && !v.hasVoted
          ? {
              ...v,
              hasVoted: true,
              votedOption: optionId,
              totalVotes: v.totalVotes + 1,
              options: v.options.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o))
            }
          : v
      )
    )
  }

  const handleCreate = (data: { title: string; description: string; options: string[] }) => {
    setVotes([
      {
        id: Math.max(...votes.map((v) => v.id), 0) + 1,
        title: data.title,
        description: data.description,
        options: data.options.map((text, i) => ({ id: Date.now() + i, text, votes: 0 })),
        createdBy: 'Bạn',
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        totalVotes: 0,
        totalMembers: 30,
        hasVoted: false
      },
      ...votes
    ])
    setShowModal(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br rounded-3xl from-slate-50 my-8 to-blue-50'>
      <header className='bg-white border-b sticky top-0 z-10 rounded-3xl shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 py-5 flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Voting</h1>
            <p className='text-sm text-gray-600 mt-1'>{votes.length} cuộc voting</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className='px-6 py-2.5 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 active:scale-95 transition-all'
          >
            Tạo mới
          </button>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {votes.map((vote) => (
            <VoteCard key={vote.id} vote={vote} onVote={handleVote} />
          ))}
        </div>
      </main>

      {showModal && <CreateModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
    </div>
  )
}

function VoteCard({ vote, onVote }: { vote: Vote; onVote: (voteId: number, optionId: number) => void }) {
  const [sel, setSel] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const hours = Math.max(0, Math.floor((new Date(vote.endTime).getTime() - Date.now()) / (1000 * 60 * 60)))
  const pct = Math.round((vote.totalVotes / vote.totalMembers) * 100)

  const handleSubmit = () => {
    if (!sel || vote.hasVoted || loading) return
    setLoading(true)
    setTimeout(() => {
      onVote(vote.id, sel)
      setLoading(false)
    }, 400)
  }

  return (
    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg overflow-hidden flex flex-col h-96'>
      <div className='px-6 py-4 border-b'>
        <div className='flex justify-between items-start gap-3 mb-2'>
          <h3 className='text-lg font-bold text-gray-900 line-clamp-2'>{vote.title}</h3>
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap flex-shrink-0 ${hours > 0 ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}
          >
            {hours > 0 ? `${hours}h` : 'Kết thúc'}
          </span>
        </div>
        <p className='text-sm text-gray-600 line-clamp-1'>{vote.description}</p>
      </div>

      <div className='px-6 py-3 border-b bg-gray-50'>
        <div className='flex items-center gap-2'>
          <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all'
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className='text-xs font-bold text-teal-600'>{pct}%</span>
        </div>
        <p className='text-xs text-gray-500 mt-1'>
          {vote.totalVotes}/{vote.totalMembers}
        </p>
      </div>

      <div className='flex-1 px-6 py-3 overflow-y-auto space-y-2'>
        {vote.options.map((opt) => {
          const p = vote.totalVotes > 0 ? Math.round((opt.votes / vote.totalVotes) * 100) : 0
          return (
            <button
              key={opt.id}
              onClick={() => !vote.hasVoted && setSel(opt.id)}
              disabled={vote.hasVoted}
              className={`w-full p-2.5 rounded-lg text-left text-sm font-medium transition-all relative overflow-hidden ${sel === opt.id || vote.votedOption === opt.id ? 'ring-2 ring-teal-500 bg-teal-50' : vote.hasVoted ? 'bg-gray-50 cursor-default' : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'}`}
            >
              {vote.hasVoted && (
                <div className='absolute inset-0 bg-teal-300/20 transition-all' style={{ width: `${p}%` }} />
              )}
              <div className='relative flex justify-between items-center'>
                <span className='text-gray-900 truncate'>{opt.text}</span>
                {vote.hasVoted && (
                  <div className='text-right ml-2 flex-shrink-0'>
                    <div className='text-sm font-bold text-teal-700'>{p}%</div>
                    <div className='text-xs text-gray-500'>{opt.votes}</div>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className='px-6 py-4 border-t bg-gray-50 flex justify-between items-center'>
        <span className='text-xs text-gray-600'>{vote.createdBy}</span>
        {!vote.hasVoted ? (
          <button
            onClick={handleSubmit}
            disabled={!sel || loading}
            className='px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-all'
          >
            {loading ? 'Gửi...' : 'Bỏ phiếu'}
          </button>
        ) : (
          <span className='px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg'>Đã vote</span>
        )}
      </div>
    </div>
  )
}

function CreateModal({ onClose, onCreate }: { onClose: () => void; onCreate: (data: any) => void }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [opts, setOpts] = useState(['', ''])

  const handleCreate = () => {
    const valid = opts.filter((o) => o.trim())
    if (title.trim() && valid.length >= 2) onCreate({ title, description: desc, options: valid })
  }

  return (
    <div onClick={onClose} className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl'>
        <h2 className='text-2xl font-bold text-gray-900 mb-5'>Tạo Vote Mới</h2>

        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Tiêu đề'
          maxLength={100}
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none mb-4'
        />

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Mô tả'
          rows={2}
          maxLength={200}
          className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none mb-4'
        />

        <div className='mb-6'>
          <label className='block text-sm font-bold text-gray-900 mb-2'>Lựa chọn</label>
          <div className='space-y-2 max-h-48 overflow-y-auto'>
            {opts.map((opt, i) => (
              <div key={i} className='flex gap-2'>
                <input
                  type='text'
                  value={opt}
                  onChange={(e) => {
                    const n = [...opts]
                    n[i] = e.target.value
                    setOpts(n)
                  }}
                  placeholder={`Lựa chọn ${i + 1}`}
                  maxLength={50}
                  className='flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none'
                />
                {opts.length > 2 && (
                  <button
                    onClick={() => setOpts(opts.filter((_, idx) => idx !== i))}
                    className='px-3 text-red-600 hover:bg-red-50 rounded-lg font-bold'
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setOpts([...opts, ''])}
            className='mt-2 text-teal-600 font-bold text-sm hover:underline'
          >
            + Thêm
          </button>
        </div>

        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2.5 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300'
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            className='flex-1 px-4 py-2.5 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700'
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  )
}
