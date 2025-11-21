import { motion } from 'framer-motion'
import type { Member } from '../../OwnershipRatio'

const generateColors = (count: number): string[] => {
  const baseColors = ['#22d3ee', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef']

  if (count <= baseColors.length) {
    return baseColors.slice(0, count)
  }

  const colors: string[] = []
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length])
  }
  return colors
}

export default function Chart({ memberList }: { memberList: Member[] }) {
  const colors = generateColors(memberList.length)
  const legendCols = memberList.length <= 4 ? 2 : memberList.length <= 9 ? 3 : 4

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='bg-white/10 backdrop-blur-xl rounded-xl p-6 border-[2px] border-white/30 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2),inset_0_1px_10px_rgba(255,255,255,0.08)]'
    >
      <h3 className='text-lg font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-6 text-center'>
        Ownership Allocation Chart
      </h3>

      <div className='flex justify-center mb-6'>
        <svg width='240' height='240' viewBox='0 0 240 240'>
          {/* Chart segments */}
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
                  stroke='rgba(255,255,255,0.3)'
                  strokeWidth='2'
                  className='hover:opacity-80 transition-opacity cursor-pointer'
                  style={{ filter: `drop-shadow(0 0 8px ${colors[i]})` }}
                />
              )
            })}
          </g>

          {/* Center circle */}
          <circle
            cx='120'
            cy='120'
            r='55'
            fill='rgba(255,255,255,0.15)'
            stroke='rgba(255,255,255,0.5)'
            strokeWidth='3'
          />

          {/* Center text */}
          <text
            x='120'
            y='115'
            textAnchor='middle'
            fill='white'
            fontSize='24'
            fontWeight='bold'
            style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))' }}
          >
            100%
          </text>
          <text x='120' y='135' textAnchor='middle' fill='rgba(255,255,255,0.8)' fontSize='12' fontWeight='600'>
            Total Ownership
          </text>

          {/* Percentage labels */}
          {memberList.map((member, i) => {
            if (member.percentage < 5) return null

            const prevTotal = memberList.slice(0, i).reduce((sum, m) => sum + m.percentage, 0)
            const midAngle = ((prevTotal + member.percentage / 2) / 100) * 360 - 90
            const radius = 65
            const x = 120 + radius * Math.cos((midAngle * Math.PI) / 180)
            const y = 120 + radius * Math.sin((midAngle * Math.PI) / 180)

            return (
              <g key={`label-${member.id}-${i}`}>
                <circle
                  cx={x}
                  cy={y}
                  r='18'
                  fill={colors[i]}
                  opacity='0.95'
                  stroke='rgba(255,255,255,0.4)'
                  strokeWidth='2'
                  style={{ filter: `drop-shadow(0 0 8px ${colors[i]})` }}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor='middle'
                  fill='white'
                  fontSize='14'
                  fontWeight='bold'
                  style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }}
                >
                  {member.percentage}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className='grid gap-3' style={{ gridTemplateColumns: `repeat(${legendCols}, minmax(0, 1fr))` }}>
        {memberList.map((member, i) => (
          <motion.div
            key={`${member.id}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className='flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20'
          >
            <div className='flex items-center gap-2 min-w-0'>
              <div
                className='w-4 h-4 rounded-full flex-shrink-0 border border-white/30'
                style={{ backgroundColor: colors[i], boxShadow: `0 0 8px ${colors[i]}` }}
              />
              <span className='text-white text-sm font-medium truncate'>{member.name}</span>
            </div>
            <span className='text-cyan-100 font-bold text-sm ml-2 flex-shrink-0'>{member.percentage}%</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
