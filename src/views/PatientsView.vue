<template>
  <div class="patients-view">
    <div class="patients-header">
      <h1>Patients</h1>
      <p class="subtitle">{{ patientCount }} patient{{ patientCount !== 1 ? 's' : '' }} total</p>
    </div>

    <div class="search-section">
      <PatientSearchBar v-model="searchQuery" />
    </div>

    <PatientList :patients="filteredPatients" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePatientsStore } from '@/stores/patients'
import PatientSearchBar from '@/components/patients/PatientSearchBar.vue'
import PatientList from '@/components/patients/PatientList.vue'

const patientsStore = usePatientsStore()
const searchQuery = ref('')

// Get filtered patients based on search query
const filteredPatients = computed(() => {
  return patientsStore.searchPatients(searchQuery.value)
})

// Total patient count
const patientCount = computed(() => patientsStore.patients.length)
</script>

<style scoped>
.patients-view {
  padding: var(--spacing-lg);
}

.patients-header {
  margin-bottom: var(--spacing-lg);
}

.patients-header h1 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
}

.subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.search-section {
  margin-bottom: var(--spacing-xl);
}

/* Responsive */
@media (max-width: 768px) {
  .patients-view {
    padding: var(--spacing-md);
  }

  .patients-header h1 {
    font-size: var(--font-size-xl);
  }
}
</style>