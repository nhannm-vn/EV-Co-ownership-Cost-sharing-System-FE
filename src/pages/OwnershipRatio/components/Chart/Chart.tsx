import { motion } from 'framer-motion'
import type { Member } from '../../OwnershipRatio'

// Hàm tạo màu động dựa trên số lượng thành viên
const generateColors = (count: number): string[] => {
  const baseColors = ['#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0e7490', '#06b6d4', '#22d3ee', '#67e8f9']

  // Nếu số lượng member <= 8, dùng màu có sẵn
  if (count <= baseColors.length) {
    return baseColors.slice(0, count)
  }

  // Nếu nhiều hơn 8, tạo thêm màu bằng cách lặp lại và điều chỉnh
  const colors: string[] = []
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length])
  }
  return colors
}

export default function Chart({ memberList }: { memberList: Member[] }) {
  const colors = generateColors(memberList.length)

  // Tính số cột cho legend dựa trên số lượng members
  const legendCols = memberList.length <= 4 ? 2 : memberList.length <= 9 ? 3 : 4

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border-2 border-teal-400/30 mb-6'
    >
      <h3 className='text-lg font-bold text-teal-300 mb-6 text-center'>Biểu Đồ Phân Bổ Sở Hữu</h3>

      <div className='flex justify-center mb-6'>
        <svg width='240' height='240' viewBox='0 0 240 240'>
          {/* Vẽ biểu đồ tròn */}
          <g transform='rotate(-90 120 120)'>
            {memberList.map((member, i) => {
              const prevTotal = memberList.slice(0, i).reduce((sum, m) => sum + m.percentage, 0)
              const start = (prevTotal / 100) * 360
              const end = ((prevTotal + member.percentage) / 100) * 360
              const x1 = 120 + 90 * Math.cos((start * Math.PI) / 180)
              const y1 = 120 + 90 * Math.sin((start * Math.PI) / 180)
              const x2 = 120 + 90 * Math.cos((end * Math.PI) / 180)
              const y2 = 120 + 90 * Math.sin((end * Math.PI) / 180)
              const large = member.percentage > 50 ? 1 : 0

              return (
                <motion.path
                  key={`${member.id}-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
                  d={`M 120 120 L ${x1} ${y1} A 90 90 0 ${large} 1 ${x2} ${y2} Z`}
                  fill={colors[i]}
                  stroke='#0f172a'
                  strokeWidth='2'
                  className='hover:opacity-80 transition-opacity cursor-pointer'
                />
              )
            })}
          </g>

          {/* Vòng tròn giữa */}
          <circle cx='120' cy='120' r='55' fill='#1e293b' stroke='#14b8a6' strokeWidth='3' />

          {/* Text ở giữa */}
          <text x='120' y='115' textAnchor='middle' fill='#5eead4' fontSize='24' fontWeight='bold'>
            100%
          </text>
          <text x='120' y='135' textAnchor='middle' fill='#94a3b8' fontSize='12'>
            Total Ownership
          </text>

          {/* Hiển thị % trên mỗi phần - chỉ hiển thị nếu >= 5% */}
          {memberList.map((member, i) => {
            // Không hiển thị label nếu phần trăm quá nhỏ (< 5%)
            if (member.percentage < 5) return null

            const prevTotal = memberList.slice(0, i).reduce((sum, m) => sum + m.percentage, 0)
            const midAngle = ((prevTotal + member.percentage / 2) / 100) * 360 - 90
            const radius = 65
            const x = 120 + radius * Math.cos((midAngle * Math.PI) / 180)
            const y = 120 + radius * Math.sin((midAngle * Math.PI) / 180)

            return (
              <g key={`label-${member.id}-${i}`}>
                <circle cx={x} cy={y} r='18' fill={colors[i]} opacity='0.9' />
                <text x={x} y={y + 5} textAnchor='middle' fill='white' fontSize='14' fontWeight='bold'>
                  {member.percentage}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend với phần trăm - responsive grid */}
      <div className='grid gap-3' style={{ gridTemplateColumns: `repeat(${legendCols}, minmax(0, 1fr))` }}>
        {memberList.map((member, i) => (
          <motion.div
            key={`${member.id}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className='flex items-center justify-between bg-slate-900/30 rounded-lg p-3 border border-teal-400/20'
          >
            <div className='flex items-center gap-2 min-w-0'>
              <div className='w-4 h-4 rounded-full flex-shrink-0' style={{ backgroundColor: colors[i] }} />
              <span className='text-gray-300 text-sm font-medium truncate'>{member.name}</span>
            </div>
            <span className='text-teal-300 font-bold text-sm ml-2 flex-shrink-0'>{member.percentage}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
