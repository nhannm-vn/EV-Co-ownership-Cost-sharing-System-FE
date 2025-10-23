interface IIcon {
  children?: React.ReactNode
  title: string
}

export default function Icon({ children, title }: IIcon) {
  return (
    <div className='flex items-center gap-3 mb-5'>
      <div
        className='w-11 h-11 bg-white/20 backdrop-blur-lg rounded-xl 
                   flex items-center justify-center 
                   border-[2px] border-white/40
                   shadow-[0_0_20px_rgba(6,182,212,0.4),inset_0_1px_10px_rgba(255,255,255,0.12)]
                   hover:bg-white/30 hover:border-white/60 hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]
                   transition-all duration-400'
      >
        {children}
      </div>
      <h3 className='text-2xl font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]'>{title}</h3>
    </div>
  )
}
