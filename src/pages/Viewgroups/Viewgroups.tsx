import DataTable from './components/DataTable'
import EmptyGroup from './components/EmptyGroup'
import HeroSection from './components/HeroSection'
import { groupListData } from './data/test-data'

export default function Viewgroups() {
  // ===== MAIN RENDER - Render chính của component =====
  return groupListData.length < 0 ? (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden'>
      <div className='relative z-10 p-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Phần tiêu đề và thống kê */}
          <HeroSection />
          {/* Bảng hiển thị danh sách groups */}
          <DataTable />
        </div>
      </div>
    </div>
  ) : (
    <EmptyGroup />
  )
}
