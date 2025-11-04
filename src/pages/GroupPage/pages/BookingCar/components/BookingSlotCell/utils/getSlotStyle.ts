const getSlotStyle = (type: string) => {
  switch (type) {
    case 'AVAILABLE':
      return 'bg-gradient-to-br from-white to-cyan-50/30 border-2 border-[#22D3EE] hover:from-cyan-50 hover:to-cyan-100/50 hover:shadow-xl hover:border-[#06B6D4] cursor-pointer transform hover:scale-105 transition-all duration-300'
    case 'BOOKED_SELF':
      return 'bg-gradient-to-br from-[#06B6D4] via-[#0EA5E9] to-[#22D3EE] text-white cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg ring-2 ring-white/20'
    case 'BOOKED_OTHER':
      return 'bg-gradient-to-br from-slate-400 to-slate-500 text-white opacity-75 shadow-md'
    case 'MAINTENANCE':
      return 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 cursor-not-allowed opacity-50'
    case 'AWAITING_REVIEW':
      return 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-2 border-green-300 shadow-lg ring-2 ring-green-200/50'
    default:
      return 'bg-white'
  }
}

export default getSlotStyle
