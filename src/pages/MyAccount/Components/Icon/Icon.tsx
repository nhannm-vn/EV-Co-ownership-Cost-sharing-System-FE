interface IIcon {
  children?: React.ReactNode
  title: string
}

export default function Icon({ children, title }: IIcon) {
  return (
    <div className='flex items-center gap-3 mb-4'>
      <div
        className='w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl 
                 flex items-center justify-center shadow-lg'
      >
        {/* User Icon SVG */}
        {children}
      </div>
      <h3 className='text-2xl font-bold text-teal-300'>{title}</h3>
    </div>
  )
}
