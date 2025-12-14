// Date and time formatting utilities

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export const formatTime = (time: string): string => {
  if (!time || typeof time !== 'string') return ''
  const parts = time.split(':')
  if (parts.length !== 2) return time
  const [hoursStr, minutesStr] = parts
  const hours = Number(hoursStr)
  const minutes = Number(minutesStr)
  if (isNaN(hours) || isNaN(minutes)) return time
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export const isTodayDate = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate.getTime() === today.getTime()
}

export const formatDateForInput = (date: Date): string => {
  // Format: YYYY-MM-DD for input[type="date"]
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}