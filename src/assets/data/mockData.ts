import type { Patient } from "@/types/patient";
import type { Appointment } from "@/types/appointment";
import type { VisitNote } from "@/types/visitNote";

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'male',
    medicalId: 'MID-001',
    contactNumber: '555-0101',
    email: 'john@example.com',
    address: '123 Main St'
  },
  {
    id: '2',
    name: 'Jane Doe',
    age: 32,
    gender: 'female',
    medicalId: 'MID-002',
    contactNumber: '555-0102',
    email: 'jane@example.com',
    address: '456 Oak Ave'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    age: 58,
    gender: 'male',
    medicalId: 'MID-003',
    contactNumber: '555-0103',
    email: 'bob@example.com',
    address: '789 Pine Rd'
  }
]

export const mockAppointments: Appointment[] = [
  // Today's appointments
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    time: '09:00 AM',
    reason: 'Regular checkup',
    status: 'scheduled'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Jane Doe',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    time: '10:30 AM',
    reason: 'Follow-up visit',
    status: 'checked-in'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Bob Johnson',
    date: new Date(new Date().setHours(0, 0, 0, 0)),
    time: '02:00 PM',
    reason: 'Lab results review',
    status: 'scheduled'
  },
  // Yesterday's appointments
  {
    id: '4',
    patientId: '1',
    patientName: 'John Smith',
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      d.setHours(0, 0, 0, 0)
      return d
    })(),
    time: '11:00 AM',
    reason: 'Blood pressure check',
    status: 'completed'
  },
  {
    id: '5',
    patientId: '2',
    patientName: 'Jane Doe',
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() - 1)
      d.setHours(0, 0, 0, 0)
      return d
    })(),
    time: '03:30 PM',
    reason: 'Prescription refill',
    status: 'completed'
  },
  // Tomorrow's appointments
  {
    id: '6',
    patientId: '3',
    patientName: 'Bob Johnson',
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(0, 0, 0, 0)
      return d
    })(),
    time: '09:30 AM',
    reason: 'Physical examination',
    status: 'scheduled'
  },
  {
    id: '7',
    patientId: '1',
    patientName: 'John Smith',
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      d.setHours(0, 0, 0, 0)
      return d
    })(),
    time: '01:00 PM',
    reason: 'Consultation',
    status: 'scheduled'
  },
  // Next week appointments
  {
    id: '8',
    patientId: '2',
    patientName: 'Jane Doe',
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      d.setHours(0, 0, 0, 0)
      return d
    })(),
    time: '10:00 AM',
    reason: 'Follow-up checkup',
    status: 'scheduled'
  },
  {
    id: '9',
    patientId: '3',
    patientName: 'Bob Johnson',
    date: (() => {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      d.setHours(0, 0, 0, 0)
      return d
    })(),
    time: '02:30 PM',
    reason: 'Lab work',
    status: 'scheduled'
  }
]

export const mockVisitNotes: VisitNote[] = [
  {
    id: '1',
    patientId: '1',
    date: new Date('2025-12-10'),
    visitType: 'checkup',
    note: 'Patient in good health. Blood pressure normal.'
  },
  {
    id: '2',
    patientId: '2',
    date: new Date('2025-12-05'),
    visitType: 'follow-up',
    note: 'Medication adjusted. Patient to return in 2 weeks.'
  }
]