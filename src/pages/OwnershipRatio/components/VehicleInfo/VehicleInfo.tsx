import { formatPrice } from '../../../../utils/formatPrice'

interface IVehicleInfo {
  name: string
  plate: string
  value: number
}

export default function VehicleInfo({ name, plate, value }: IVehicleInfo) {
  return (
    <div className='bg-slate-800/50 backdrop-blur-lg rounded-xl p-5 border-2 border-teal-400/40 mb-6'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='text-gray-400 text-sm'>Xe</div>
          <div className='text-white font-bold text-lg'>{name}</div>
        </div>
        <div>
          <div className='text-gray-400 text-sm'>Biển số</div>
          <div className='text-white font-bold'>{plate}</div>
        </div>
        <div>
          <div className='text-gray-400 text-sm'>Giá trị</div>
          <div className='text-teal-300 font-bold text-lg'>{formatPrice(value)}M ₫</div>
        </div>
      </div>
    </div>
  )
}
