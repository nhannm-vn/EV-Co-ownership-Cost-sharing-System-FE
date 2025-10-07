export default function TableHeader() {
  return (
    <thead>
      <tr className='bg-slate-700/50 border-b border-slate-600/30'>
        <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Group ID</th>
        <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Group Name</th>
        <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Status</th>
        <th className='px-4 py-3 text-left font-semibold text-slate-200 text-sm'>Description</th>
      </tr>
    </thead>
  )
}
