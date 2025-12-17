<template>
  <BaseCard class="appointment-card">
    <div class="appointment-header">
      <div class="patient-info">
        <h3 class="patient-name">{{ appointment.patientName }}</h3>
        <span class="appointment-time">{{ appointment.time }}</span>
      </div>
      <StatusBadge :status="appointment.status" />
    </div>

    <p class="appointment-reason">{{ appointment.reason }}</p>

    <div class="appointment-actions">
      <label for="status-select" class="status-label">Change Status:</label>
      <select 
        id="status-select"
        :value="appointment.status" 
        @change="handleStatusChange"
        class="status-select"
      >
        <option value="scheduled">Scheduled</option>
        <option value="checked-in">Checked In</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { Appointment, AppointmentStatus } from '@/types/appointment'
import BaseCard from '@/components/common/BaseCard.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const props = defineProps<{
  appointment: Appointment
}>()

const emit = defineEmits<{
  'update-status': [appointmentId: string, newStatus: AppointmentStatus]
}>()

const handleStatusChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newStatus = target.value as AppointmentStatus
  emit('update-status', props.appointment.id, newStatus)
}
</script>

<style scoped>
.appointment-card {
  transition: transform var(--transition-base);
}

.appointment-card:hover {
  transform: translateY(-2px);
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.patient-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.patient-name {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.appointment-time {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.appointment-reason {
  margin: 0 0 var(--spacing-lg) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.appointment-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.status-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.status-select {
  padding: 0.5rem var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  cursor: pointer;
  transition: border-color var(--transition-base);
}

.status-select:hover {
  border-color: var(--color-primary);
}

.status-select:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
