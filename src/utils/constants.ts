// App constants

export const APP_NAME = 'CareTrack'

// Visit types
export const VISIT_TYPES = [
  { value: 'checkup', label: 'Checkup' },
  { value: 'follow-up', label: 'Follow-up' },
  { value: 'lab-result', label: 'Lab Result Review' },
  { value: 'consultation', label: 'Consultation' }
] as const

// Appointment statuses
export const APPOINTMENT_STATUSES = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'checked-in', label: 'Checked In' },
  { value: 'completed', label: 'Completed' }
] as const

// Gender options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
] as const

// LocalStorage keys
export const STORAGE_KEYS = {
  AUTH: 'caretrack_auth',
  VISIT_NOTES: 'caretrack_visit_notes',
  DARK_MODE: 'caretrack_dark_mode',
  APPOINTMENTS: 'caretrack_appointments'
} as const