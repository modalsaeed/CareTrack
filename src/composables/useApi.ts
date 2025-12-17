import { ref } from 'vue'
import { useAppointmentsStore } from '@/stores/appointments'
import { usePatientsStore } from '@/stores/patients'
import { useVisitNotesStore } from '@/stores/visitNotes'
import { mockAppointments, mockPatients, mockVisitNotes } from '@/assets/data/mockData'

/**
 * Composable for initializing app data after login.
 * Simulates fetching data from API with setTimeout delay.
 * Randomly simulates failures to demonstrate error handling.
 */
export function useApi() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAppData = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate network delay (fake API call)
      await new Promise(resolve => setTimeout(resolve, 800))

      // Randomly simulate API failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Failed to fetch data from server')
      }

      // Populate stores with mock data
      const appointmentsStore = useAppointmentsStore()
      const patientsStore = usePatientsStore()
      const visitNotesStore = useVisitNotesStore()
      
      // Always load mock appointments, will merge with localStorage
      appointmentsStore.setAppointments(mockAppointments)
      
      patientsStore.setPatients(mockPatients)
      
      // Always load visit notes, will merge with localStorage
      visitNotesStore.setVisitNotes(mockVisitNotes)

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load data'
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchAppData
  }
}
