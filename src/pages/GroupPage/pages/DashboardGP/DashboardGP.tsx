import { BarChartOutlined, CalendarOutlined, WalletOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import groupApi from '../../../../apis/group.api'
import type { GroupItem } from '../../../../types/api/group.type'
import Banner from './components/Banner'
import BenefitCard from './components/BenefitCard'
import StepCard from './components/StepCard/StepCard'

export default function DashboardGP() {
  const { groupId } = useParams<{ groupId: string }>()
  const idGroupQuery = useQuery({
    queryKey: ['id-groups', groupId],
    queryFn: () => groupApi.getGroupById(groupId as string),
    enabled: !!groupId
  })

  const group: GroupItem = idGroupQuery?.data?.data as GroupItem

  return (
    <div className='w-full max-w-5xl rounded-[2rem] backdrop-blur-[60px] bg-gradient-to-br from-white/22 via-white/16 to-white/20 shadow-[0_15px_70px_rgba(6,182,212,0.5),0_30px_100px_rgba(14,165,233,0.4),0_0_150px_rgba(79,70,229,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] border-[4px] border-white/60 p-10 space-y-8 m-12 relative overflow-hidden'>
      {/* Top Gradient Bar */}
      <div className='absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 shadow-[0_0_20px_rgba(6,182,212,0.6)]' />

      {/* Group Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.7)] mb-2'>
          {group?.groupName?.toUpperCase()}
        </h1>
      </div>

      {/* Top banner */}
      <Banner />

      {/* Main content grid */}
      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Left card - Steps */}
        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-400' />
          <div className='relative rounded-3xl bg-white/15 backdrop-blur-xl border-[3px] border-white/40 p-8 shadow-[0_0_30px_rgba(16,185,129,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-400'>
            <h2 className='text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.7)] mb-8'>
              Cần hoàn tất 3 bước
            </h2>
            <div className='space-y-5'>
              <StepCard
                num='1'
                title='Upload bằng lái (GPLX)'
                desc='Ảnh rõ nét, ≤ 2MB'
                color='from-green-400 to-emerald-500'
              />
              <StepCard num='2' title='Upload CCCD' desc='Ảnh rõ nét, ≤ 2MB' color='from-emerald-400 to-teal-500' />
              <StepCard
                num='3'
                title='Nhập tỉ lệ sở hữu'
                desc='Tổng = 100% cho tất cả thành viên'
                color='from-teal-400 to-cyan-500'
              />
            </div>
          </div>
        </div>

        {/* Right card - Benefits */}
        <div className='group relative'>
          <div className='absolute -inset-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-400' />
          <div className='relative rounded-3xl bg-white/15 backdrop-blur-xl border-[3px] border-white/40 p-8 shadow-[0_0_30px_rgba(6,182,212,0.3),inset_0_1px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-400'>
            <h2 className='text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.7)] mb-8'>
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
      <p className='text-center text-white/75 text-base font-medium'>
        Hợp đồng cần được duyệt trước khi sử dụng các tính năng trên
      </p>

      {/* Bottom Gradient Bar */}
      <div className='absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-200 via-sky-100 to-cyan-200 shadow-[0_0_20px_rgba(14,165,233,0.6)]' />
    </div>
  )
}
