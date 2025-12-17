import { defineStore } from 'pinia'
import type { Patient } from '@/types/patient'

export const usePatientsStore = defineStore('patients', {
  state: () => ({
    patients: [] as Patient[]
  }),

  getters: {
    // Get all patients sorted by name
    allPatients: (state) => {
      return [...state.patients].sort((a, b) => a.name.localeCompare(b.name))
    },

    // Get patient by ID
    getById: (state) => (id: string) => {
      return state.patients.find(p => p.id === id)
    },

    // Search patients by name or medical ID
    searchPatients: (state) => (query: string) => {
      if (!query.trim()) {
        return state.patients
      }
      
      const lowerQuery = query.toLowerCase()
      return state.patients.filter(patient => 
        patient.name.toLowerCase().includes(lowerQuery) ||
        patient.medicalId.toLowerCase().includes(lowerQuery)
      )
    },

    // Get patients by gender
    getByGender: (state) => (gender: 'male' | 'female' | 'other') => {
      return state.patients.filter(p => p.gender === gender)
    }
  },

  actions: {
    // Set patients from API
    setPatients(patients: Patient[]) {
      this.patients = patients
    },

    // Add new patient
    addPatient(patient: Patient) {
      this.patients.push(patient)
    }
  }
})