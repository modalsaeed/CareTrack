<template>
  <div v-if="patients.length === 0" class="empty-state">
    <span class="material-icons">person_off</span>
    <p>No patients found</p>
  </div>

  <div v-else class="patients-grid">
    <PatientCard 
      v-for="patient in patients" 
      :key="patient.id" 
      :patient="patient" 
    />
  </div>
</template>

<script setup lang="ts">
import type { Patient } from '@/types/patient'
import PatientCard from './PatientCard.vue'

defineProps<{
  patients: Patient[]
}>()
</script>

<style scoped>
.patients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-state .material-icons {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.3;
}

.empty-state p {
  margin: 0;
  font-size: var(--font-size-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .patients-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
}
</style>