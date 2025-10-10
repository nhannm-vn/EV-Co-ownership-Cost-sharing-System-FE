import type { DocType } from '../../UploadLicense'

interface IField {
  type: DocType
  label: string
  handleFileChange: (type: DocType, file: File | null) => void
  docs: Record<DocType, File | null>
}

function Field({ type, label, handleFileChange, docs }: IField) {
  {
    const colors =
      type === 'gplx'
        ? { border: 'border-violet-500/60', text: 'text-violet-200', icon: 'text-violet-300' }
        : { border: 'border-purple-500/60', text: 'text-purple-200', icon: 'text-purple-300' }

    return (
      <div className='space-y-2'>
        <span className='block text-sm font-medium text-violet-200'>{label}</span>
        <label
          className={`flex flex-col items-center justify-center border-2 border-dashed ${colors.border}
                      rounded-lg p-4 bg-violet-950/40 hover:bg-violet-900/50
                      hover:shadow-[0_0_18px_rgba(109,40,217,0.6)] transition cursor-pointer`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.6}
            stroke='currentColor'
            className={`h-8 w-8 ${colors.icon}`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2'
            />
          </svg>
          <span className={`mt-1 text-xs ${colors.text}`}>
            {docs[type] ? `Đã chọn: ${docs[type]?.name}` : `Chọn hoặc kéo thả ảnh ${type.toUpperCase()}`}
          </span>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => handleFileChange(type, e.target.files?.[0] ?? null)}
            className='sr-only'
          />
        </label>
      </div>
    )
  }
}

export default Field
