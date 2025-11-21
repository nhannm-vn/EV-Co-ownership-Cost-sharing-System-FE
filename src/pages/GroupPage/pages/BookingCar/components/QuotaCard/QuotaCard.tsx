import { Card, Progress } from 'antd'
interface QuotaInfo {
  remainingSlots: number
  totalSlots: number
  usedSlots: number
}

export default function QuotaCard({ quotaUser }: { quotaUser: QuotaInfo }) {
  return (
    <>
      <Card className='shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.3)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-sky-50/20'>
        <div className='bg-gradient-to-br from-[#0EA5E9] via-[#3B82F6] to-[#06B6D4] -m-6 p-7 h-full relative overflow-hidden'>
          <div className='absolute inset-0 bg-white/5'></div>
          <div className='absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
          <div className='relative z-10 flex flex-col justify-between h-full min-h-[300px]'>
            <div className='text-white text-3xl font-black uppercase tracking-widest text-center mb-4'>Quota</div>
            <div className='flex-1 flex items-center justify-center'>
              <div className='relative'>
                <Progress
                  type='circle'
                  percent={(quotaUser.usedSlots / quotaUser.totalSlots) * 100}
                  format={() => (
                    <div className='text-white font-black text-3xl'>
                      {quotaUser.usedSlots}/{quotaUser.totalSlots}
                    </div>
                  )}
                  size={110}
                  strokeColor='#ffffff'
                  trailColor='rgba(255,255,255,0.15)'
                  strokeWidth={12}
                />
                <div className='absolute inset-0 rounded-full blur-xl bg-white/20'></div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                <div className='text-white font-black text-2xl'>{quotaUser.usedSlots}</div>
                <div className='text-white/90 text-xs font-bold uppercase tracking-wide'>booked</div>
              </div>
              <div className='bg-white/25 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg ring-1 ring-white/30 hover:bg-white/30 transition-all'>
                <div className='text-white font-black text-2xl'>{quotaUser.remainingSlots} slot/week</div>
                <div className='text-white/90 text-xs font-bold uppercase tracking-wide'>remaining car booking</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
