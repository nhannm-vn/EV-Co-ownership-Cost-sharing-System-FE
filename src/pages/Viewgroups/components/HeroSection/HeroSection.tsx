import { Card } from 'antd'
import { useContext } from 'react'
import { GroupContext } from '../../../../hooks/useGroupList'

export default function HeroSection() {
  const groupListData = useContext(GroupContext)

  const getTotalGroups = () => groupListData.length

  const getStatusGroup = (status: string) => () =>
    groupListData.filter((group) => group.status?.toLowerCase() === status.toLowerCase()).length

  const stats = [
    {
      value: getTotalGroups(),
      label: 'Total Groups',
      bg: 'bg-white/15',
      border: 'border-cyan-200/50',
      textColor: 'text-white',
      labelColor: 'text-white/80',
      hover: 'hover:bg-white/25'
    },
    {
      value: getStatusGroup('active')(),
      label: 'Active',
      bg: 'bg-green-400/20',
      border: 'border-green-300/50',
      textColor: 'text-green-100',
      labelColor: 'text-green-200',
      hover: 'hover:bg-green-400/30'
    },
    {
      value: getStatusGroup('pending')(),
      label: 'Pending',
      bg: 'bg-yellow-400/20',
      border: 'border-yellow-300/50',
      textColor: 'text-yellow-100',
      labelColor: 'text-yellow-200',
      hover: 'hover:bg-yellow-400/30'
    },
    {
      value: getStatusGroup('inactive')(),
      label: 'Rejected',
      bg: 'bg-red-400/20',
      border: 'border-red-300/50',
      textColor: 'text-red-100',
      labelColor: 'text-red-200',
      hover: 'hover:bg-red-400/30'
    }
  ]

  return (
    <Card className='mb-8 backdrop-blur-xl bg-white/10 border-[3px] border-white/40 shadow-[0_0_35px_rgba(6,182,212,0.4),inset_0_1px_20px_rgba(255,255,255,0.1)] rounded-xl overflow-hidden'>
      {/* Top gradient bar */}
      <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200' />

      <div className='text-center py-8'>
        <h1 className='text-4xl font-bold mb-3 text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]'>
          EV Groups Management
        </h1>
        <p className='text-white/80 mb-8 text-lg font-medium'>View all electric vehicle sharing groups</p>

        {/* Stats Cards */}
        <div className='flex justify-center items-center gap-6 flex-wrap'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`backdrop-blur-lg px-6 py-4 rounded-xl border-[2px] w-32 text-center transition-all duration-400 shadow-[0_0_20px_rgba(6,182,212,0.2),inset_0_1px_10px_rgba(255,255,255,0.08)] ${stat.bg} ${stat.border} ${stat.hover}`}
            >
              <div className={`text-3xl font-black ${stat.textColor} drop-shadow-[0_0_10px_currentColor]`}>
                {stat.value}
              </div>
              <div className={`text-sm ${stat.labelColor} font-bold mt-1`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div className='absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200' />
    </Card>
  )
}
