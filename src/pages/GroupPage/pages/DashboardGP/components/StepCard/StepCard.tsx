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
    <div className='group/item flex items-start gap-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-lg border-[2px] border-white/30 hover:border-green-300/50 shadow-[0_0_20px_rgba(16,185,129,0.2),inset_0_1px_10px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] p-6 transition-all duration-400'>
      <div
        className={`flex-shrink-0 size-14 rounded-xl bg-gradient-to-br ${color} border-[2px] border-white/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover/item:scale-110 group-hover/item:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-400`}
      >
        <span className='text-white font-black text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]'>{num}</span>
      </div>
      <div className='flex-1 pt-1'>
        <h3 className='text-white font-bold text-lg leading-snug mb-1.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>
          {title}
        </h3>
        <p className='text-white/75 text-sm leading-relaxed font-medium'>{desc}</p>
      </div>
    </div>
  )
}
