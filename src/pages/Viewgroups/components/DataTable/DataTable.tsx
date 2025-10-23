import { Card } from 'antd'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'

export default function DataTable() {
  return (
    <Card className='min-h-96 border-[3px] border-white/40 shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_1px_15px_rgba(255,255,255,0.1)] bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <TableHeader />
          <TableBody />
        </table>
      </div>
    </Card>
  )
}
