import DataTable from './components/DataTable'
import HeroSection from './components/HeroSection'

export default function Viewgroups() {
  // ===== MAIN RENDER - Render chính của component =====
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden'>
      {/* Simple starfield effect with Tailwind only */}
      <div className='absolute inset-0 opacity-40'>
        <div className='w-1 h-1 bg-white rounded-full absolute top-20 left-20 animate-pulse'></div>
        <div className='w-2 h-2 bg-white/80 rounded-full absolute top-32 left-40'></div>
        <div className='w-1 h-1 bg-white/60 rounded-full absolute top-16 left-80 animate-pulse'></div>
        <div className='w-1 h-1 bg-white rounded-full absolute top-40 left-96'></div>
        <div className='w-2 h-2 bg-white/70 rounded-full absolute top-24 left-1/2 animate-pulse'></div>
        <div className='w-1 h-1 bg-white/80 rounded-full absolute top-48 left-3/4'></div>
        <div className='w-1 h-1 bg-white rounded-full absolute top-12 right-32 animate-pulse'></div>
        <div className='w-2 h-2 bg-white/60 rounded-full absolute top-36 right-20'></div>
        <div className='w-1 h-1 bg-white/90 rounded-full absolute top-28 right-1/2'></div>
        <div className='w-1 h-1 bg-white/70 rounded-full absolute bottom-32 left-32 animate-pulse'></div>
        <div className='w-2 h-2 bg-white rounded-full absolute bottom-20 left-1/3'></div>
        <div className='w-1 h-1 bg-white/80 rounded-full absolute bottom-40 right-40'></div>
      </div>

      {/* Subtle gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10'></div>

      <div className='relative z-10 p-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Phần tiêu đề và thống kê */}
          <HeroSection />
          {/* Bảng hiển thị danh sách groups */}
          <DataTable />
        </div>
      </div>
    </div>
  )
}
