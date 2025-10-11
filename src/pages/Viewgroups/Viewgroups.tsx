'use client'
import { motion } from 'framer-motion'
import DataTable from './components/DataTable'
import EmptyGroup from './components/EmptyGroup'
import HeroSection from './components/HeroSection'
import { groupListData } from './data/test-data'

export default function Viewgroups() {
  if (groupListData.length === 0) return <EmptyGroup />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='min-h-screen flex items-center justify-center relative overflow-hidden 
                 bg-gradient-to-br from-[#1A0033] via-[#3B0086] to-[#8C1EFF]'
    >
      {/* ánh sáng tím mờ trung tâm */}
      <div className='absolute inset-0'>
        <div
          className='absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 
                        bg-purple-500/30 blur-[120px] rounded-full'
        ></div>
        <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-500/20 blur-[100px] rounded-full'></div>
      </div>

      {/* nội dung */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-6xl mx-auto p-8 
                   bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.4)]'
      >
        <HeroSection />
        <div className='mt-6'>
          <DataTable />
        </div>
      </motion.div>
    </motion.div>
  )
}
