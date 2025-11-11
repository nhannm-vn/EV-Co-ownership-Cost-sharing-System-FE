/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import userApi from '../../../../apis/user.api'
import { getGroupIdFromLS } from '../../../../utils/auth'
import type { Voting, CreateVotingPayload, VotingSubmitPayload } from '../../../../types/api/user.type'
import Skeleton from '../../../../components/Skeleton'
import EmptyVoting from './components/EmptyVoting'

export default function Voting() {
  //state đóng mở modal create voting
  const [showModal, setShowModal] = useState(false)
  //lấy groupId từ localstorage
  const groupId = getGroupIdFromLS()
  const queryClient = useQueryClient()

  //useQuery dùng để call api lấy all voting
  const { data: votes = [], isLoading } = useQuery<Voting[]>({
    queryKey: ['votings', groupId],
    queryFn: async () => (await userApi.getAllVoting(Number(groupId))).data
  })

  //dùng thằng này để thực hiện call api tạo các voting
  const createMutation = useMutation({
    mutationFn: (payload: CreateVotingPayload) => userApi.createVoting(payload),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['votings', groupId] })
      setShowModal(false)
      toast.success('Tạo cuộc bỏ phiếu thành công!')
    },
    onError: (error: any) => toast.error(error.response?.data?.message || 'Không thể tạo voting')
  })

  if (isLoading) return <Skeleton />

  return (
    <div className='h-screen bg-gradient-to-br from-gray-50 to-gray-100 my-10 rounded-2xl p-8 flex flex-col'>
      <div className='max-w-7xl mx-auto w-full flex flex-col h-full'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8 flex-shrink-0'>
          <div>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'>
              Voting
            </h1>
            <p className='text-gray-500 mt-2'>{votes.length} cuộc bỏ phiếu</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className='px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium'
          >
            + Tạo mới
          </button>
        </div>

        {/* Content */}
        {/* nếu là chưa có vote nào thì hiển thị thằng này ra */}
        {votes.length === 0 ? (
          <EmptyVoting setShowModal={setShowModal} />
        ) : (
          <div className='flex-1 overflow-y-auto pr-2'>
            <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pb-6'>
              {votes.map((vote) => (
                <VoteCard key={vote.votingId} vote={vote} groupId={Number(groupId)} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Nếu mà modal true thì mở thằng này ra  */}
      {showModal && (
        <CreateModal
          // thằng này tiến hành đóng mở modal
          onClose={() => setShowModal(false)}
          // thằng này cho phép tạo voting
          onCreate={(data) => createMutation.mutate(data)}
          // thằng này coi trạng thái tạo đang là gì
          isLoading={createMutation.isPending}
          groupId={Number(groupId)}
        />
      )}
    </div>
  )
}

function VoteCard({ vote, groupId }: { vote: Voting; groupId: number }) {
  const [selected, setSelected] = useState<string | null>(null)
  const isActive = vote.status === 'ACTIVE'

  const options = Object.entries(vote.options).map(([id, text]) => ({
    id,
    text,
    votes: Number(vote.results[id] || 0)
  }))

  const voteMutation = useMutation({
    mutationFn: (payload: VotingSubmitPayload) => userApi.voting(payload),
    onSuccess: () => {
      toast.success('Bỏ phiếu thành công!')
      setTimeout(() => window.location.reload(), 500)
    },
    onError: (error: any) => toast.error(error.response?.data?.message || 'Không thể bỏ phiếu')
  })

  const handleVote = () => {
    if (selected) {
      voteMutation.mutate({ groupId, votingId: vote.votingId, selectedOption: selected })
    }
  }

  return (
    <div className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full'>
      {/* Header */}
      <div className='p-5 bg-gradient-to-r from-gray-50 to-white border-b flex-shrink-0'>
        <div className='flex items-start gap-3 mb-3'>
          <h3 className='font-bold text-gray-900 flex-1 line-clamp-2 leading-snug'>{vote.title}</h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
              isActive ? 'bg-teal-100 text-teal-700' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isActive ? vote.timeRemaining : 'Đã đóng'}
          </span>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2 mb-3'>{vote.description}</p>
        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <span className='font-medium'>
            {vote.totalVotes}/{vote.totalMembers} đã bỏ phiếu
          </span>
          <span>•</span>
          <span>{vote.createdByName}</span>
        </div>
      </div>

      {/* Options */}
      <div className='p-5 space-y-2.5 bg-gray-50 flex-1 overflow-y-auto'>
        {options.map((opt) => {
          const percent = vote.totalVotes > 0 ? Math.round((opt.votes / vote.totalVotes) * 100) : 0
          const isSelected = selected === opt.id || vote.userVote === opt.id
          const canClick = !vote.hasVoted && isActive && !voteMutation.isPending

          return (
            <button
              key={opt.id}
              onClick={() => canClick && setSelected(opt.id)}
              disabled={!canClick}
              className={`w-full min-h-[52px] p-3.5 rounded-xl text-sm text-left relative transition-all flex items-center ${
                isSelected ? 'ring-2 ring-teal-500 bg-white shadow-md' : 'bg-white hover:bg-gray-50 hover:shadow-sm'
              } ${canClick ? 'cursor-pointer' : 'cursor-default'} ${voteMutation.isPending ? 'opacity-50' : ''}`}
            >
              {vote.hasVoted && (
                <div
                  className='absolute inset-0 bg-gradient-to-r from-teal-100/40 to-transparent rounded-xl transition-all duration-500'
                  style={{ width: `${percent}%` }}
                />
              )}
              <div className='relative flex items-center justify-between gap-2 w-full'>
                <span className='font-medium text-gray-900 flex-1'>{opt.text}</span>
                {vote.hasVoted && <span className='text-sm font-bold text-teal-600'>{opt.votes} phiếu</span>}
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className='p-5 bg-white border-t flex-shrink-0'>
        {vote.estimatedAmount && vote.estimatedAmount > 0 && (
          <div className='mb-3'>
            <span className='text-xs text-gray-600'>
              Dự kiến:{' '}
              <span className='font-semibold text-teal-600'>{vote.estimatedAmount.toLocaleString('vi-VN')}đ</span>
            </span>
          </div>
        )}

        {!vote.hasVoted && isActive ? (
          <button
            onClick={handleVote}
            disabled={!selected || voteMutation.isPending}
            className='w-full px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:shadow-md disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all'
          >
            {voteMutation.isPending ? 'Đang bỏ phiếu...' : 'Bỏ phiếu'}
          </button>
        ) : vote.hasVoted ? (
          <div className='w-full px-4 py-2.5 bg-green-50 text-green-700 text-sm font-semibold rounded-lg text-center'>
            ✓ Đã bỏ phiếu
          </div>
        ) : (
          <div className='w-full px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg text-center'>
            Đã kết thúc
          </div>
        )}
      </div>
    </div>
  )
}

function CreateModal({
  onClose,
  onCreate,
  isLoading,
  groupId
}: {
  onClose: () => void
  onCreate: (data: CreateVotingPayload) => void
  isLoading: boolean
  groupId: number
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleSubmit = () => {
    if (!title.trim()) return toast.warning('Vui lòng nhập tiêu đề')

    const validOptions = options.filter((o) => o.trim())
    if (validOptions.length < 2) return toast.warning('Vui lòng nhập ít nhất 2 lựa chọn')
    if (!deadline) return toast.warning('Vui lòng chọn thời gian kết thúc')

    onCreate({
      groupId,
      title: title.trim(),
      description: description.trim(),
      votingType: 'SINGLE_CHOICE',
      options: validOptions.map((opt, idx) => ({ key: `option${idx + 1}`, label: opt.trim() })),
      deadline: new Date(deadline).toISOString()
    })
  }

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl'
      >
        <h2 className='text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent'>
          Tạo cuộc bỏ phiếu mới
        </h2>

        <div className='space-y-4'>
          {/* Title */}
          <div>
            <label className='block text-sm font-semibold mb-2'>Tiêu đề *</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Nhập tiêu đề'
              maxLength={100}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none transition-colors'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-semibold mb-2'>Mô tả</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Thêm mô tả...'
              rows={2}
              maxLength={200}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none resize-none transition-colors'
            />
          </div>

          {/* Deadline */}
          <div>
            <label className='block text-sm font-semibold mb-2'>Thời gian kết thúc *</label>
            <input
              type='datetime-local'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none transition-colors'
            />
          </div>

          {/* Options */}
          <div>
            <label className='block text-sm font-semibold mb-2'>Lựa chọn * (tối thiểu 2)</label>
            <div className='space-y-2'>
              {options.map((opt, i) => (
                <div key={i} className='flex gap-2'>
                  <input
                    type='text'
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...options]
                      newOpts[i] = e.target.value
                      setOptions(newOpts)
                    }}
                    placeholder={`Lựa chọn ${i + 1}`}
                    maxLength={50}
                    className='flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 outline-none transition-colors'
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
                      className='w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-xl transition-colors'
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {options.length < 10 && (
              <button
                onClick={() => setOptions([...options, ''])}
                className='mt-3 text-teal-600 text-sm font-semibold hover:underline'
              >
                + Thêm lựa chọn
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className='flex gap-3 mt-8'>
          <button
            onClick={onClose}
            disabled={isLoading}
            className='flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors'
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className='flex-1 px-5 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:from-gray-300 disabled:to-gray-300 transition-all'
          >
            {isLoading ? 'Đang tạo...' : 'Tạo'}
          </button>
        </div>
      </div>
    </div>
  )
}
