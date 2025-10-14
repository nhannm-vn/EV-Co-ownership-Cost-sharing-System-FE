import { CalendarOutlined, WalletOutlined, BarChartOutlined } from '@ant-design/icons'

export default function DashboardGP() {
  function StepCard({ num, title, desc, color }: { num: string; title: string; desc: string; color: string }) {
    return (
      <div className='group/item flex items-start gap-5 rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/30 hover:from-emerald-900/60 hover:to-teal-900/50 border border-emerald-400/20 shadow-xl shadow-emerald-950/60 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20'>
        <div
          className={`flex-shrink-0 size-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover/item:scale-110 group-hover/item:shadow-2xl transition-all`}
        >
          <span className='text-white font-bold text-2xl'>{num}</span>
        </div>
        <div className='flex-1 pt-1'>
          <h3 className='text-white font-bold text-lg leading-snug mb-1.5'>{title}</h3>
          <p className='text-slate-300 text-sm leading-relaxed'>{desc}</p>
        </div>
      </div>
    )
  }

  function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
      <div className='group/item flex items-start gap-5 rounded-3xl bg-gradient-to-br from-teal-900/40 to-cyan-900/30 hover:from-teal-900/60 hover:to-cyan-900/50 border border-teal-400/20 shadow-xl shadow-teal-950/60 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20'>
        <div className='flex-shrink-0 size-14 rounded-2xl bg-gradient-to-br from-teal-500/40 to-cyan-500/40 border border-teal-400/40 flex items-center justify-center shadow-md group-hover/item:scale-110 group-hover/item:shadow-xl transition-all'>
          <span className='text-white text-3xl'>{icon}</span>
        </div>
        <div className='flex-1 pt-1'>
          <h3 className='text-white font-bold text-lg leading-snug mb-1.5'>{title}</h3>
          <p className='text-slate-300 text-sm leading-relaxed'>{desc}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-5xl rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl p-10 space-y-8'>
      {/* Top banner with glow */}
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl' />
        <div className='relative rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-400/30 backdrop-blur-xl px-8 py-5 text-center shadow-xl'>
          <p className='text-white text-xl font-semibold tracking-wide'>
            Hoàn tất GPLX, CCCD và tỉ lệ sở hữu để tạo hợp đồng
          </p>
        </div>
      </div>

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
