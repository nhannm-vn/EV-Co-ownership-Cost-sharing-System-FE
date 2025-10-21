import React from 'react'

export default function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className='group/item flex items-start gap-5 rounded-3xl bg-gradient-to-br from-teal-900/40 to-cyan-900/30 hover:from-teal-900/60 hover:to-cyan-900/50 border border-teal-400/20 shadow-xl shadow-teal-950/60 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20'>
      <div className='flex-shrink-0 size-14 rounded-2xl bg-gradient-to-br from-teal-500/40 to-cyan-500/40 border border-teal-400/40 flex items-center justify-center shadow-md group-hover/item:scale-110 group-hover/item:shadow-xl transition-all'>
        <span className='text-white text-3xl'>{icon}</span>
      </div>
      <div className='flex-1 pt-1'>
        <h3 className='text-white font-bold text-lg leading-snug mb-1.5'>{title}</h3>
        <p className='text-slate-300 text-sm leading-relaxed'>{desc}</p>
      </div>
    </div>
  )
}
