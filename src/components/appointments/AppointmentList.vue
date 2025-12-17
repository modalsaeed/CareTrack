<template>
  <div class="appointment-list">
    <!-- Empty state -->
    <div v-if="appointments.length === 0" class="empty-state">
      <span class="material-icons empty-icon">event_busy</span>
      <p class="empty-message">{{ emptyMessage }}</p>
    </div>

    <!-- Appointments grid -->
    <div v-else class="appointments-grid">
      <AppointmentCard
        v-for="appointment in appointments"
        :key="appointment.id"
        :appointment="appointment"
        @update-status="handleStatusUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Appointment, AppointmentStatus } from '@/types/appointment'
import AppointmentCard from './AppointmentCard.vue'
import { useAppointmentsStore } from '@/stores/appointments'

defineProps<{
  appointments: Appointment[]
  emptyMessage?: string
}>()

const appointmentsStore = useAppointmentsStore()

const handleStatusUpdate = (appointmentId: string, newStatus: AppointmentStatus) => {
  appointmentsStore.updateStatus(appointmentId, newStatus)
}
</script>

<style scoped>
.appointment-list {
  width: 100%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  color: var(--color-gray-300);
  margin-bottom: var(--spacing-lg);
}

.empty-message {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

.appointments-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
}

/* Responsive: single column on mobile */
@media (max-width: 48rem) {
  .appointments-grid {
    grid-template-columns: 1fr;
  }
}
</style>
