export type AppointmentStatus = 'scheduled' | 'checked-in' | 'completed'

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  date: Date
  time: string
  reason: string
  status: AppointmentStatus
}