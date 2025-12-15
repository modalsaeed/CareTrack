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