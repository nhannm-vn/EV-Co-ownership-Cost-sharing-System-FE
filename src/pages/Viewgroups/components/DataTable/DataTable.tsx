import { Card } from 'antd'
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'

// ===== MAIN COMPONENT =====
export default function DataTable() {
  return (
    <Card className='min-h-96 border-2 border-teal-400 shadow-[0_0_25px_rgba(20,184,166,0.6)] bg-slate-800/80 backdrop-blur-lg rounded-xl overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <TableHeader />
          <TableBody />
        </table>
      </div>
    </Card>
  )
}
