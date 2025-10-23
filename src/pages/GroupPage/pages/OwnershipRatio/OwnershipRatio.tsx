import { motion } from 'framer-motion'
import VehicleInfo from './components/VehicleInfo'
import HeaderTitle from './components/HeaderTitle'
import Member from './components/Member'
import ProgressBar from './components/ProgressBar'
import Summary from './components/Summary'
import Chart from './components/Chart'

export interface Member {
  id: number
  name: string
  percentage: number
  investment: number
}

export default function OwnershipRatio() {
  const vehicle = { name: 'VinFast VF e34', value: 690000000, plate: '30A-12345' }
  const members: Member[] = [
    { id: 3, name: 'Lê Văn C', percentage: 20, investment: 138000000 },
    { id: 4, name: 'Phạm Thị D', percentage: 10, investment: 69000000 },
    { id: 1, name: 'Nguyễn Văn A', percentage: 40, investment: 276000000 },
    { id: 2, name: 'Trần Thị B', percentage: 30, investment: 207000000 }
  ]

  return (
    <div className='min-h-screen backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 px-20 rounded-[2.5rem] border-[4px] border-white/60 shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] m-20 p-6 relative overflow-hidden'>
      {/* Top Gradient Bar */}
      <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

      <div className='max-w-7xl mt-10 mx-auto'>
        {/* Header */}
        <HeaderTitle />

        {/* Vehicle Info */}
        <VehicleInfo name={vehicle.name} plate={vehicle.plate} value={vehicle.value} />

        {/* Layout: Chart + Members List */}
        <div className='grid lg:grid-cols-3 gap-6 mb-6'>
          {/* Left Column - Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='lg:col-span-1'
          >
            <Chart memberList={members} />
          </motion.div>

          {/* Right Column - Members List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='lg:col-span-2 space-y-3'
          >
            <h3 className='text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-4'>
              Danh Sách Thành Viên
            </h3>
            {members.map((member, i) => (
              <motion.div
                key={`${member.id}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className='bg-white/10 backdrop-blur-xl rounded-xl p-4 border-[2px] border-white/30 hover:border-cyan-200/50 transition-all duration-400 shadow-[0_0_20px_rgba(6,182,212,0.2),inset_0_1px_10px_rgba(255,255,255,0.08)]'
              >
                <Member investment={member.investment} name={member.name} percentage={member.percentage} />
                <ProgressBar percentage={member.percentage} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Summary */}
        <Summary members={members.length} value={vehicle.value} />
      </div>

      {/* Bottom Gradient Bar */}
      <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
    </div>
  )
}
