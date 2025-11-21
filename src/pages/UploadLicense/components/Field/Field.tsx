import type { DocType, DocSide, DocFiles } from '../../UploadLicense'

interface IField {
  type: DocType
  side: DocSide
  label: string
  handleFileChange: (type: DocType, side: DocSide, file: File | null) => void
  docs: Record<DocType, DocFiles>
  disabled?: boolean
}

function Field({ type, side, label, handleFileChange, docs, disabled = false }: IField) {
  const file = docs[type][side]
  const hasFile = Boolean(file)

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-teal-300'>{label}</span>
        {hasFile && (
          <span className='text-xs text-green-400 flex items-center gap-1'>
            <span className='w-2 h-2 bg-green-500 rounded-full' />
            Selected
          </span>
        )}
      </div>

      <label
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all
                    ${
                      disabled
                        ? 'border-gray-600 bg-gray-800/20 cursor-not-allowed opacity-50'
                        : hasFile
                          ? 'border-green-500/60 bg-green-950/30 hover:bg-green-950/40 cursor-pointer'
                          : 'border-teal-500/40 bg-teal-950/20 hover:bg-teal-950/30 cursor-pointer'
                    }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={`h-10 w-10 mb-2 ${disabled ? 'text-gray-500' : hasFile ? 'text-green-300' : 'text-teal-300'}`}
        >
          {hasFile ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
            />
          )}
        </svg>

        <span
          className={`text-sm font-medium ${disabled ? 'text-gray-400' : hasFile ? 'text-green-200' : 'text-teal-200'}`}
        >
          {hasFile ? file?.name : 'Choose or drag-and-drop image'}
        </span>
        <span className='text-xs text-gray-400 mt-1'>PNG, JPG (Max 5MB)</span>

        <input
          type='file'
          accept='image/*'
          onChange={(e) => handleFileChange(type, side, e.target.files?.[0] ?? null)}
          disabled={disabled}
          className='sr-only'
        />
      </label>
    </div>
  )
}

export default Field
