/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import { getGroupIdFromLS } from '../../../../utils/auth'
import type { Voting } from '../../../../types/api/user.type'
import Skeleton from '../../../../components/Skeleton'

export default function Voting() {
  const [showModal, setShowModal] = useState(false)
  const groupId = getGroupIdFromLS()

  const { data: votes = [], isLoading } = useQuery<Voting[]>({
    queryKey: ['votings', groupId],
    queryFn: async () => {
      const res = await userApi.getAllVoting(Number(groupId))
      return res.data
    }
  })

  if (isLoading) return <Skeleton />

  return (
    <div className='h-screen bg-gray-50 my-10 rounded-2xl p-6 flex flex-col'>
      <div className='max-w-6xl mx-auto w-full flex flex-col h-full'>
        {/* Header - Fixed */}
        <div className='flex items-center justify-between mb-6 flex-shrink-0'>
          <div>
            <h1 className='text-3xl font-bold'>Voting</h1>
            <p className='text-gray-500 mt-1'>{votes.length} cuộc bỏ phiếu</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700'
          >
            + Tạo mới
          </button>
        </div>

        {/* Voting Cards - Scrollable */}
        {votes.length === 0 ? (
          <div className='text-center py-20'>
            <div className='text-7xl mb-4'>🗳️</div>
            <h3 className='text-xl font-semibold mb-2'>Chưa có cuộc bỏ phiếu</h3>
            <p className='text-gray-500 mb-6'>Tạo cuộc bỏ phiếu đầu tiên</p>
            <button
              onClick={() => setShowModal(true)}
              className='px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700'
            >
              + Tạo ngay
            </button>
          </div>
        ) : (
          <div className='flex-1 overflow-y-auto pr-2'>
            <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3 pb-6'>
              {votes.map((vote) => (
                <VoteCard key={vote.votingId} vote={vote} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && <CreateModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function VoteCard({ vote }: { vote: Voting }) {
  const [selected, setSelected] = useState<string | null>(null)

  const isActive = vote.status === 'ACTIVE'

  const options = Object.entries(vote.options).map(([id, text]) => ({
    id,
    text,
    votes: Number(vote.results[id] || 0)
  }))

  const handleVote = () => {
    if (selected) alert('Chức năng sắp có!')
  }

  return (
    <div className='bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow h-fit'>
      {/* Title & Status */}
      <div className='p-5 border-b'>
        <div className='flex gap-3 mb-2'>
          <h3 className='font-semibold flex-1 line-clamp-2'>{vote.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-md h-fit ${
              isActive ? 'bg-teal-50 text-teal-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isActive ? vote.timeRemaining : 'Đã đóng'}
          </span>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>{vote.description}</p>
        <p className='text-xs text-gray-500 mt-2'>
          {vote.totalVotes}/{vote.totalMembers} đã bỏ phiếu
        </p>
      </div>

      {/* Options List */}
      <div className='p-5 space-y-2 max-h-64 overflow-y-auto'>
        {options.map((opt) => {
          const percent = vote.totalVotes > 0 ? Math.round((opt.votes / vote.totalVotes) * 100) : 0
          const isSelected = selected === opt.id || vote.userVote === opt.id

          return (
            <button
              key={opt.id}
              onClick={() => !vote.hasVoted && isActive && setSelected(opt.id)}
              disabled={vote.hasVoted || !isActive}
              className={`w-full p-3 rounded-lg text-sm text-left relative ${
                isSelected ? 'ring-2 ring-teal-500 bg-teal-50' : 'bg-gray-50 hover:bg-gray-100'
              } ${!vote.hasVoted && isActive ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {vote.hasVoted && (
                <div className='absolute inset-0 bg-teal-100/30 rounded-lg' style={{ width: `${percent}%` }} />
              )}
              <div className='relative flex justify-between'>
                <span className='font-medium'>{opt.text}</span>
                {vote.hasVoted && <span className='text-sm font-semibold text-teal-700'>{percent}%</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className='px-5 py-4 border-t flex justify-between items-center'>
        <span className='text-sm font-medium text-gray-600'>{vote.createdByName}</span>

        {!vote.hasVoted && isActive ? (
          <button
            onClick={handleVote}
            disabled={!selected}
            className='px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
          >
            Bỏ phiếu
          </button>
        ) : vote.hasVoted ? (
          <span className='px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-lg'>✓ Đã vote</span>
        ) : (
          <span className='px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg'>Kết thúc</span>
        )}
      </div>
    </div>
  )
}

function CreateModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [opts, setOpts] = useState(['', ''])

  const addOption = () => opts.length < 10 && setOpts([...opts, ''])
  const removeOption = (i: number) => setOpts(opts.filter((_, idx) => idx !== i))
  const updateOption = (i: number, val: string) => {
    const newOpts = [...opts]
    newOpts[i] = val
    setOpts(newOpts)
  }

  return (
    <div onClick={onClose} className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto'
      >
        <h2 className='text-xl font-bold mb-6'>Tạo cuộc bỏ phiếu</h2>

        <div className='space-y-4'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Tiêu đề'
            maxLength={100}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none'
          />

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder='Mô tả (không bắt buộc)'
            rows={2}
            maxLength={200}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none'
          />

          <div>
            <p className='text-sm font-medium mb-2'>Lựa chọn</p>
            <div className='space-y-2'>
              {opts.map((opt, i) => (
                <div key={i} className='flex gap-2'>
                  <input
                    type='text'
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Lựa chọn ${i + 1}`}
                    maxLength={50}
                    className='flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none'
                  />
                  {opts.length > 2 && (
                    <button onClick={() => removeOption(i)} className='px-3 text-red-600 hover:bg-red-50 rounded-lg'>
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addOption} className='mt-2 text-teal-600 text-sm font-medium hover:underline'>
              + Thêm lựa chọn
            </button>
          </div>

          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
            <p className='text-xs text-yellow-800'>Chức năng đang phát triển</p>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <button onClick={onClose} className='flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50'>
            Hủy
          </button>
          <button disabled className='flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed'>
            Tạo
          </button>
        </div>
      </div>
    </div>
  )
}
