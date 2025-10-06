import DataTable from './components/DataTable'
import HeroSection from './components/HeroSection'

export default function Viewgroups() {
  // ===== MAIN RENDER - Render chính của component =====
  return (
    <div className='p-6 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Phần tiêu đề và thống kê */}
        <HeroSection />
        {/* Bảng hiển thị danh sách groups */}
        <DataTable />
      </div>
    </div>
  )
}
