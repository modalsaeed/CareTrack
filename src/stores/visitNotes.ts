import { defineStore } from 'pinia'
import type { VisitNote } from '@/types/visitNote'
import { STORAGE_KEYS } from '@/utils/constants'

// Load visit notes from localStorage
const loadVisitNotesFromStorage = (): VisitNote[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.VISIT_NOTES)
  if (stored) {
    try {
      const notes = JSON.parse(stored)
      // Convert date strings back to Date objects
      return notes.map((note: any) => ({
        ...note,
        date: new Date(note.date)
      }))
    } catch {
      return []
    }
  }
  return []
}

// Save visit notes to localStorage
const saveVisitNotes = (notes: VisitNote[]) => {
  localStorage.setItem(STORAGE_KEYS.VISIT_NOTES, JSON.stringify(notes))
}

export const useVisitNotesStore = defineStore('visitNotes', {
  state: () => ({
    visitNotes: [] as VisitNote[]
  }),

  getters: {
    // Get visit notes for a specific patient (sorted by date, newest first)
    getByPatientId: (state) => (patientId: string) => {
      return state.visitNotes
        .filter(note => note.patientId === patientId)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
    },

    // Get all notes sorted by date (newest first)
    allNotes: (state) => {
      return [...state.visitNotes].sort((a, b) => b.date.getTime() - a.date.getTime())
    }
  },

  actions: {
    // Set visit notes from API (merges with localStorage)
    setVisitNotes(notes: VisitNote[]) {
      const stored = loadVisitNotesFromStorage()
      
      // Merge mock notes with stored ones, avoiding duplicates
      const existingIds = new Set(stored.map(note => note.id))
      const newNotes = notes.filter(note => !existingIds.has(note.id))
      
      this.visitNotes = [...stored, ...newNotes]
      saveVisitNotes(this.visitNotes)
    },

    // Add new visit note
    addNote(note: VisitNote) {
      this.visitNotes.push(note)
      saveVisitNotes(this.visitNotes)
    },

    // Delete visit note
    deleteNote(noteId: string) {
      const index = this.visitNotes.findIndex(n => n.id === noteId)
      if (index !== -1) {
        this.visitNotes.splice(index, 1)
        saveVisitNotes(this.visitNotes)
      }
    }
  }
})