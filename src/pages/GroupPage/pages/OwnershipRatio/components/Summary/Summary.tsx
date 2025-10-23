import { formatToVND } from '../../../../../../utils/formatPrice'

function Summary({ members, value }: { members: number; value: number }) {
  return (
    <div className='mt-6 bg-white/15 backdrop-blur-xl rounded-xl p-5 border-[2px] border-white/40 text-center shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)]'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <div className='text-white/70 text-xs font-semibold uppercase mb-1'>Thành viên</div>
          <div className='text-white font-black text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>{members}</div>
        </div>
        <div>
          <div className='text-white/70 text-xs font-semibold uppercase mb-1'>Tổng %</div>
          <div className='text-white font-black text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>100%</div>
        </div>
        <div>
          <div className='text-white/70 text-xs font-semibold uppercase mb-1'>Giá trị</div>
          <div className='text-cyan-100 font-black text-2xl drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]'>
            {formatToVND(value)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
