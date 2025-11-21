import { Card } from 'antd'

import { DashboardOutlined, ThunderboltOutlined } from '@ant-design/icons'
import getConditionConfig from '../BookingSlotCell/utils/getConditionconfig'

interface statusCardProps {
  vehicleStatus: 'Good' | 'Under Maintenance' | 'Has Issues' | ''
  batteryPercent: number | null
  odometer: number | null
}
export default function StatusCard({ vehicleStatus, batteryPercent, odometer }: statusCardProps) {
  return (
    <>
      <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/20'>
        <div
          className={`bg-gradient-to-br ${
            getConditionConfig({
              vehicleStatus: vehicleStatus || 'Good'
            }).bgColor
          } -m-6 p-7 h-full relative overflow-hidden`}
        >
          <div className='absolute inset-0 bg-white/5'></div>
          <div className='absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl'></div>
          <div className='relative z-10 flex flex-col justify-between h-full min-h-[300px]'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-white/30 backdrop-blur-xl p-3 rounded-xl shadow-lg ring-1 ring-white/30'>
                  {
                    getConditionConfig({
                      vehicleStatus: vehicleStatus
                    }).icon
                  }
                </div>
                <div>
                  <div className='text-white/95 text-xl font-bold uppercase tracking-wide'>status of the vehicle</div>
                  <div className='text-white text-2xl font-black'>
                    {
                      getConditionConfig({
                        vehicleStatus: vehicleStatus
                      }).text
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className='flex-1 flex flex-col justify-center space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <ThunderboltOutlined style={{ fontSize: '26px', color: 'white' }} />
                  <span className='text-white text-sm font-bold'>Battery</span>
                </div>
                <div className='text-white text-3xl font-black'>{batteryPercent}%</div>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                <DashboardOutlined style={{ fontSize: '22px', color: 'white' }} />
                <div className='text-white text-lg font-black mt-1'>{odometer}</div>
                <div className='text-white/90 text-xs font-bold uppercase'>km</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
