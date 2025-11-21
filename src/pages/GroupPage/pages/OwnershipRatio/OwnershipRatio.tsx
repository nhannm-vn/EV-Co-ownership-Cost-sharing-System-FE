import { motion } from 'framer-motion'
import VehicleInfo from './components/VehicleInfo'
import HeaderTitle from './components/HeaderTitle'
import Member from './components/Member'
import ProgressBar from './components/ProgressBar'
import Summary from './components/Summary'
import Chart from './components/Chart'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import groupApi from '../../../../apis/group.api'
import Skeleton from '../../../../components/Skeleton'
import type { OwnershipResponse } from '../../../../types/api/group.type'

export interface Member {
  id: number
  name: string
  percentage: number
  investment: number
}

export default function OwnershipRatio() {
  const { groupId } = useParams<{ groupId: string }>()
  const navigate = useNavigate()

  const handleViewContract = () => {
    navigate(`/dashboard/viewGroups/${groupId}/createContract`)
  }

  // Fetch group data
  const { data: ownershipData, isPending } = useQuery({
    queryKey: ['group-ownership', groupId],
    queryFn: () => groupApi.getAllPercentageInGroup(groupId as string),
    enabled: !!groupId
  })

  // Extract data from API response
  const responseData: OwnershipResponse | undefined = ownershipData?.data
  console.log('Ownership Data:', responseData)

  // Members from API
  const members: Member[] =
    responseData?.groupSummary?.members?.map((member) => ({
      id: member.userId,
      name: member.userName,
      percentage: member.ownershipPercentage,
      investment: member.investmentAmount
    })) || []

  return isPending ? (
    <Skeleton />
  ) : (
    <div className='min-h-screen backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 px-20 rounded-[2.5rem] border-[4px] border-white/60 shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] m-20 p-6 relative overflow-hidden'>
      {/* Top Gradient Bar */}
      <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

      <div className='max-w-7xl mt-10 mx-auto'>
        {/* Header with centered button */}
        <div className='flex items-center justify-center gap-4 mb-8 ml-72'>
          <HeaderTitle />

          {/* Glassmorphism Button */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className='group relative px-6 py-3 backdrop-blur-xl bg-white/20 border-2 border-white/40 rounded-xl
                     shadow-[0_8px_32px_rgba(6,182,212,0.3),inset_0_1px_0_rgba(255,255,255,0.4)]
                     hover:bg-white/30 hover:shadow-[0_12px_40px_rgba(6,182,212,0.5),inset_0_1px_0_rgba(255,255,255,0.6)]
                     transition-all duration-300 overflow-hidden ml-36'
          >
            {/* Gradient Overlay on Hover */}
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

            {/* Button Content */}
            <div className='relative flex items-center gap-2' onClick={handleViewContract}>
              <span className='font-semibold text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]'>
                View contract
              </span>
            </div>
          </motion.button>
        </div>

        {/* Vehicle Info */}
        <VehicleInfo
          name={responseData?.vehicleInfo?.model as string}
          plate={responseData?.vehicleInfo?.licensePlate as string}
          brand={responseData?.vehicleInfo?.brand as string}
          value={responseData?.vehicleInfo?.vehicleValue as number}
          chassis={responseData?.vehicleInfo.chassisNumber as string}
        />

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
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'>Members</h3>
              {/* Allocation Status Badge */}
              {responseData?.groupSummary?.fullyAllocated ? (
                <span className='px-3 py-1 bg-green-400/20 text-green-100 text-xs font-bold rounded-full border border-green-300/40'>
                  ✓ Fully allocated 100%
                </span>
              ) : (
                <span className='px-3 py-1 bg-yellow-400/20 text-yellow-100 text-xs font-bold rounded-full border border-yellow-300/40'>
                  Remaining {responseData?.groupSummary?.remainingPercentage || 0}%
                </span>
              )}
            </div>

            {members.length > 0 ? (
              members.map((member, i) => {
                return (
                  <motion.div
                    key={`${member.id}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className='backdrop-blur-xl rounded-xl p-4 border-[2px] transition-all duration-400 shadow-[0_0_20px_rgba(6,182,212,0.2),inset_0_1px_10px_rgba(255,255,255,0.08)] bg-cyan-400/15 border-cyan-300/60'
                  >
                    <div className='flex items-start justify-between mb-2'>
                      <div className='flex-1'>
                        <Member investment={member.investment} name={member.name} percentage={member.percentage} />
                      </div>
                    </div>
                    <ProgressBar percentage={member.percentage} index={i} />
                  </motion.div>
                )
              })
            ) : (
              // Empty state
              <div className='bg-white/10 backdrop-blur-xl rounded-xl p-12 border-[2px] border-white/30 text-center'>
                <div className='w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-400/50'>
                  <svg className='w-8 h-8 text-yellow-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                </div>
                <p className='text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-2'>
                  No members yet
                </p>
                <p className='text-white/70 text-sm'>Invite members to start allocating ownership</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Summary */}
        <Summary
          members={responseData?.groupSummary?.totalMembers || members.length}
          value={responseData?.vehicleInfo?.vehicleValue as number}
        />
      </div>

      {/* Bottom Gradient Bar */}
      <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
    </div>
  )
}
