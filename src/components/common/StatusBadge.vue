<template>
  <span :class="['status-badge', status]">
    {{ displayText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AppointmentStatus } from '@/types/appointment'

const props = defineProps<{
  status: AppointmentStatus
}>()

const displayText = computed(() => {
  const labels: Record<AppointmentStatus, string> = {
    'scheduled': 'Scheduled',
    'checked-in': 'Checked-in',
    'completed': 'Completed'
  }
  return labels[props.status]
})
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 0.25rem var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.scheduled {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.checked-in {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.completed {
  background: var(--color-success-bg);
  color: var(--color-success);
}
</style>