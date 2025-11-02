export const formatDate = (date: Date): string => {
  try {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${day}/${month}`
  } catch {
    return 'N/A'
  }
}
