import { BarChartOutlined, CalendarOutlined, WalletOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import groupApi from '../../../../apis/group.api'
import type { GroupItem } from '../../../../types/api/group.type'
import Banner from './components/Banner'
import BenefitCard from './components/BenefitCard'
import StepCard from './components/StepCard/StepCard'

// --- Component chính DashboardGP ---
export default function DashboardGP() {
  const { groupId } = useParams<{ groupId: string }>()
  const idGroupQuery = useQuery({
    queryKey: ['id-groups', groupId],
    queryFn: () => groupApi.getGroupById(groupId as string),
    enabled: !!groupId
  })

  const group: GroupItem = idGroupQuery?.data?.data as GroupItem

  return (
    <div className='w-full max-w-5xl rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl p-10 space-y-8 m-12'>
      {/* Group Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white mb-2'>{group?.groupName.toUpperCase()}</h1>
      </div>
      {/* ---------------------------------- */}

      {/* Top banner  mô tả  */}
      <Banner />

      {/* Main content grid */}
      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Left card - Steps */}
        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition' />
          <div className='relative rounded-3xl bg-slate-800/90 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl'>
            <h2 className='text-3xl font-bold text-white mb-8 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              Cần hoàn tất 3 bước
            </h2>
            <div className='space-y-5'>
              <StepCard
                num='1'
                title='Upload bằng lái (GPLX)'
                desc='Ảnh rõ nét, ≤ 2MB'
                color='from-emerald-400 to-emerald-500'
              />
              <StepCard num='2' title='Upload CCCD' desc='Ảnh rõ nét, ≤ 2MB' color='from-teal-400 to-teal-500' />
              <StepCard
                num='3'
                title='Nhập tỉ lệ sở hữu'
                desc='Tổng = 100% cho tất cả thành viên'
                color='from-cyan-400 to-cyan-500'
              />
            </div>
          </div>
        </div>

        {/* Right card - Benefits */}
        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition' />
          <div className='relative rounded-3xl bg-slate-800/90 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl'>
            <h2 className='text-3xl font-bold text-white mb-8 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent'>
              Có hợp đồng làm gì?
            </h2>
            <div className='space-y-5'>
              <BenefitCard icon={<CalendarOutlined />} title='Đặt lịch sử dụng xe' desc='Booking' />
              <BenefitCard icon={<WalletOutlined />} title='Quản lý quỹ chung' desc='Nạp/Rút' />
              <BenefitCard icon={<BarChartOutlined />} title='Chia chi phí theo tỉ lệ sở hữu' desc='Tự động tính' />
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className='text-center text-slate-400 text-base'>
        Hợp đồng cần được duyệt trước khi sử dụng các tính năng trên
      </p>
    </div>
  )
}
