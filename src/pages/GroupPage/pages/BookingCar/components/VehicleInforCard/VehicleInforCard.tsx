import { CalendarOutlined, CarOutlined } from '@ant-design/icons'
import Card from 'antd/es/card/Card'

interface VehicleInforCardProps {
  brand: string
  model: string
  licensePlate: string
  weekStart: string
  weekEnd: string
}

export default function VehicleInforCard({ brand, licensePlate, weekStart, weekEnd, model }: VehicleInforCardProps) {
  return (
    <>
      <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/20'>
        <div className='bg-gradient-to-br from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE] -m-6 p-7 h-full relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
          <div className='relative z-10 flex flex-col h-full justify-between min-h-[300px]'>
            <div className='flex items-center gap-4 mb-5'>
              <div className='bg-white/30 backdrop-blur-xl p-4 rounded-2xl shadow-xl ring-2 ring-white/20'>
                <CarOutlined style={{ fontSize: '36px', color: 'white' }} />
              </div>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-2'>
                  <CalendarOutlined style={{ fontSize: '20px', color: 'white' }} />
                  <h2 className='text-xl font-black text-white uppercase tracking-wide'>Calendar booking car</h2>
                </div>
              </div>
            </div>
            <div className='flex-1 flex flex-col justify-center space-y-3'>
              <div className='text-white text-3xl font-black tracking-tight'>
                {brand} {''}
                {model}
              </div>
              <div className='text-white/95 text-2xl font-bold'>{licensePlate}</div>
              <div className='bg-white/25 backdrop-blur-md rounded-2xl py-3 px-5 inline-block shadow-lg ring-1 ring-white/30'>
                <span className='text-white text-2xl font-bold text-center'>
                  {weekStart} - {weekEnd}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
