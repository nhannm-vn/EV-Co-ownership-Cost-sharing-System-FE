export default function Banner() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-sky-500/30 blur-xl' />
      <div className='relative rounded-2xl bg-white/15 backdrop-blur-xl border-[2px] border-white/40 px-8 py-5 text-center shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_1px_15px_rgba(255,255,255,0.1)]'>
        <p className='text-white text-xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>
          Complete driver license, citizen ID and ownership ratio to generate the contract
        </p>
      </div>
    </div>
  )
}
