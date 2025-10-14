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
  // thông tin chiếc xe demo
  const vehicle = { name: 'VinFast VF e34', value: 690000000, plate: '30A-12345' }
  // thông tin các thành viên đồng thời % sở hữu demo
  const members: Member[] = [
    { id: 3, name: 'Lê Văn C', percentage: 20, investment: 138000000 },
    { id: 4, name: 'Phạm Thị D', percentage: 10, investment: 69000000 },
    { id: 1, name: 'Nguyễn Văn A', percentage: 40, investment: 276000000 },
    { id: 2, name: 'Trần Thị B', percentage: 30, investment: 207000000 }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br border rounded-md border-gray-900 shadow-sm from-slate-900 m-20 via-teal-950 to-slate-900 p-6'>
      <div className='max-w-7xl mt-10 mx-auto'>
        {/* Header */}
        <HeaderTitle />

        {/* Vehicle Info: hiển thị thông tin liên quan đến chiếc xe */}
        <VehicleInfo name={vehicle.name} plate={vehicle.plate} value={vehicle.value} />

        {/* Layout ngang: Chart bên trái + Members List bên phải */}
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
            <h3 className='text-xl font-bold text-teal-300 mb-4'>Danh Sách Thành Viên</h3>
            {members.map((member, i) => (
              <motion.div
                key={`${member.id}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className='bg-slate-800/50 backdrop-blur-lg rounded-xl p-4 border-2 border-teal-400/30 hover:border-teal-400/60 transition-all'
              >
                <Member investment={member.investment} name={member.name} percentage={member.percentage} />
                {/* Progress Bar - Thanh hiển thị phần trăm nó chạy */}
                <ProgressBar percentage={member.percentage} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SummaryTotal */}
        <Summary members={members.length} value={vehicle.value} />
      </div>
    </div>
  )
}
