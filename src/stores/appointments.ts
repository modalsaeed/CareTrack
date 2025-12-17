import { defineStore } from 'pinia'
import type { Appointment, AppointmentStatus } from '@/types/appointment'

export const useAppointmentsStore = defineStore('appointments', {
  state: () => ({
    appointments: [] as Appointment[]
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
    },

    // Update appointment status
    updateStatus(appointmentId: string, newStatus: AppointmentStatus) {
      const appointment = this.appointments.find(apt => apt.id === appointmentId)
      if (appointment) {
        appointment.status = newStatus
      }
    },

    // Add new appointment
    addAppointment(appointment: Appointment) {
      this.appointments.push(appointment)
    }
  }
})
