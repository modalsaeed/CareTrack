export type VisitType = 'checkup' | 'follow-up' | 'lab-result' | 'consultation'

export interface VisitNote {
  id: string
  patientId: string
  date: Date
  visitType: VisitType
  note: string
}