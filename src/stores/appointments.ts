import { defineStore } from 'pinia'
import type { Appointment, AppointmentStatus } from '@/types/appointment'
import { STORAGE_KEYS } from '@/utils/constants'

// Load appointments from localStorage
const loadAppointments = (): Appointment[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)
  if (!stored) return []
  
  const appointments = JSON.parse(stored)
  // Convert date strings back to Date objects
  return appointments.map((apt: any) => ({
    ...apt,
    date: new Date(apt.date)
  }))
}

// Save appointments to localStorage
const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments))
}

export const useAppointmentsStore = defineStore('appointments', {
  state: () => ({
    appointments: loadAppointments()
  }),

  getters: {
    // Get appointments for a specific date
    getByDate: (state) => (date: Date) => {
      const targetDate = new Date(date)
      targetDate.setHours(0, 0, 0, 0)
      
      return state.appointments.filter(apt => {
        const aptDate = new Date(apt.date)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate.getTime() === targetDate.getTime()
      })
    },

    // Get appointments by status
    getByStatus: (state) => (status: AppointmentStatus) => {
      return state.appointments.filter(apt => apt.status === status)
    },

    // Get appointments for a specific patient
    getByPatientId: (state) => (patientId: string) => {
      return state.appointments.filter(apt => apt.patientId === patientId)
    }
  },

  actions: {
    // Set appointments from API
    setAppointments(appointments: Appointment[]) {
      this.appointments = appointments
      saveAppointments(this.appointments)
    },

    // Update appointment status
    updateStatus(appointmentId: string, newStatus: AppointmentStatus) {
      const appointment = this.appointments.find(apt => apt.id === appointmentId)
      if (appointment) {
        appointment.status = newStatus
        saveAppointments(this.appointments)
      }
    },

    // Add new appointment
    addAppointment(appointment: Appointment) {
      this.appointments.push(appointment)
      saveAppointments(this.appointments)
    }
  }
})
