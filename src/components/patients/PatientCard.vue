<template>
  <BaseCard class="patient-card" @click="navigateToDetail">
    <div class="patient-header">
      <div class="patient-avatar">
        <span class="material-icons">person</span>
      </div>
      <div class="patient-info">
        <h3 class="patient-name">{{ patient.name }}</h3>
        <p class="medical-id">{{ patient.medicalId }}</p>
      </div>
    </div>
    
    <div class="patient-details">
      <div class="detail-item">
        <span class="material-icons">cake</span>
        <span>{{ patient.age }} years</span>
      </div>
      <div class="detail-item">
        <span class="material-icons">{{ genderIcon }}</span>
        <span>{{ genderLabel }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Patient } from '@/types/patient'
import BaseCard from '@/components/common/BaseCard.vue'
import { GENDER_OPTIONS } from '@/utils/constants'

const props = defineProps<{
  patient: Patient
}>()

const router = useRouter()

const genderLabel = computed(() => {
  const gender = GENDER_OPTIONS.find(g => g.value === props.patient.gender)
  return gender ? gender.label : props.patient.gender
})

const genderIcon = computed(() => {
  const icons = {
    male: 'male',
    female: 'female',
    other: 'person'
  }
  return icons[props.patient.gender] || 'person'
})

const navigateToDetail = () => {
  router.push(`/patients/${props.patient.id}`)
}
</script>

<style scoped>
.patient-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.patient-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.patient-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.patient-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: var(--border-radius-full);
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.patient-avatar .material-icons {
  font-size: 1.5rem;
}

.patient-info {
  flex: 1;
}

.patient-name {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
}

.medical-id {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-family: monospace;
}

.patient-details {
  display: flex;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.detail-item .material-icons {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .patient-avatar {
    width: 2.5rem;
    height: 2.5rem;
  }

  .patient-avatar .material-icons {
    font-size: 1.25rem;
  }

  .patient-details {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>