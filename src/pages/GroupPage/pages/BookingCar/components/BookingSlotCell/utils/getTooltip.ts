const getTooltip = ({ type, bookedBy }: { type: string; bookedBy: string | null }) => {
  switch (type) {
    case 'AVAILABLE':
      return 'you can booked'
    case 'BOOKED_SELF':
      return 'you have been booked, click to cancel'
    case 'BOOKED_OTHER':
      return bookedBy ? ` have been booked by ${bookedBy}` : 'booked'
    case 'MAINTENANCE':
      return 'maintenance can not booking'
    default:
      return ''
  }
}

export default getTooltip
