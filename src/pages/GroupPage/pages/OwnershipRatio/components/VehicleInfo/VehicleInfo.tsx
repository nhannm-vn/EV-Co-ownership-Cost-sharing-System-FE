import { formatToVND } from '../../../../../../utils/formatPrice'

interface IVehicleInfo {
  name: string
  plate: string
  brand: string
  value: number
  chassis: string
}

export default function VehicleInfo({ name, plate, value, chassis, brand }: IVehicleInfo) {
  return (
    <div className='bg-white/12 backdrop-blur-xl rounded-xl p-6 border-[2px] border-white/35 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.25),inset_0_1px_12px_rgba(255,255,255,0.1)]'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='text-white/65 text-sm font-semibold uppercase mb-1'>Vehicle</div>
          <div className='text-white font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>
            {name + ' ' + brand}
          </div>
        </div>
        <div>
          <div className='text-white/65 text-sm font-semibold uppercase mb-1'>Chassis number</div>
          <div className='text-white font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>{chassis}</div>
        </div>
        <div>
          <div className='text-white/65 text-sm font-semibold uppercase mb-1'>License plate</div>
          <div className='text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>{plate}</div>
        </div>
        <div>
          <div className='text-white/65 text-sm font-semibold uppercase mb-1'>Value</div>
          <div className='text-cyan-100 font-bold text-lg drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]'>
            {formatToVND(value)}
          </div>
        </div>
      </div>
    </div>
  )
}
