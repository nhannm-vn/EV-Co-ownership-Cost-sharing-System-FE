import { formatPrice } from '../../../../../../utils/formatPrice'

function Summary({ members, value }: { members: number; value: number }) {
  return (
    <div className='mt-6 bg-teal-600/20 rounded-xl p-4 border-2 border-teal-400/50 text-center'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <div className='text-teal-300 text-xs'>Thành viên</div>
          <div className='text-white font-bold text-xl'>{members}</div>
        </div>
        <div>
          <div className='text-teal-300 text-xs'>Tổng %</div>
          <div className='text-white font-bold text-xl'>100%</div>
        </div>
        <div>
          <div className='text-teal-300 text-xs'>Giá trị</div>
          <div className='text-teal-300 font-bold text-xl'>{formatPrice(value)}M ₫</div>
        </div>
      </div>
    </div>
  )
}

export default Summary
