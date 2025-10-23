'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Skeleton from '../../components/Skeleton'
import groupApi from '../../apis/group.api'
import { GroupContext } from '../../hooks/useGroupList'
import DataTable from './components/DataTable'
import HeroSection from './components/HeroSection'
import EmptyGroup from './components/EmptyGroup'
import type { GroupItem } from '../../types/api/group.type'
import { Outlet } from 'react-router'

export default function Viewgroups() {
  const groupListQuery = useQuery({
    queryKey: ['all-groups'],
    queryFn: groupApi.viewGroup
  })

  console.log(groupListQuery.data?.data)

  const allGroupList: GroupItem[] = groupListQuery?.data?.data || []
  console.log(allGroupList)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600'
    >
      {/* Holographic Background Effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className='absolute top-20 right-20 w-[500px] h-[500px] bg-cyan-300/40 rounded-full blur-[120px]'
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className='absolute bottom-20 left-20 w-[500px] h-[500px] bg-indigo-400/40 rounded-full blur-[120px]'
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-sky-300/35 rounded-full blur-[100px]'
        />
      </div>

      {groupListQuery.isLoading ? (
        <Skeleton />
      ) : (
        <GroupContext.Provider value={allGroupList || []}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='relative z-10 w-full max-w-6xl mx-auto p-8 mt-16 mb-16 backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 rounded-[2rem] shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 overflow-hidden'
          >
            {/* Top Gradient Bar */}
            <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

            <HeroSection />
            <div className='mt-8'>{allGroupList.length > 0 ? <DataTable /> : <EmptyGroup />}</div>

            {/* Bottom Gradient Bar */}
            <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
          </motion.div>
          <Outlet />
        </GroupContext.Provider>
      )}
    </motion.div>
  )
}
