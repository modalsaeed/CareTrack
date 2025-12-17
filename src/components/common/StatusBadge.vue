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
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.scheduled {
  background: #e6f4ff;
  color: #1890ff;
}

.checked-in {
  background: #fff4e6;
  color: #fa8c16;
}

.completed {
  background: #e6f7e6;
  color: #52c41a;
}
</style>