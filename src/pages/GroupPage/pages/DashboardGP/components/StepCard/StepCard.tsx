export default function StepCard({
  num,
  title,
  desc,
  color
}: {
  num: string
  title: string
  desc: string
  color: string
}) {
  return (
    <div className='group/item flex items-start gap-5 rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/30 hover:from-emerald-900/60 hover:to-teal-900/50 border border-emerald-400/20 shadow-xl shadow-emerald-950/60 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20'>
      <div
        className={`flex-shrink-0 size-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover/item:scale-110 group-hover/item:shadow-2xl transition-all`}
      >
        <span className='text-white font-bold text-2xl'>{num}</span>
      </div>
      <div className='flex-1 pt-1'>
        <h3 className='text-white font-bold text-lg leading-snug mb-1.5'>{title}</h3>
        <p className='text-slate-300 text-sm leading-relaxed'>{desc}</p>
      </div>
    </div>
  )
}
