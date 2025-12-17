<template>
  <BaseCard class="visit-note-form">
    <h3>Add Visit Note</h3>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <BaseInput
          id="visit-date"
          v-model="formData.date"
          label="Visit Date"
          type="date"
          required
        />
        
        <div class="form-field">
          <label for="visit-type">Visit Type</label>
          <select 
            id="visit-type" 
            v-model="formData.visitType"
            required
            class="visit-type-select"
          >
            <option value="">Select type...</option>
            <option 
              v-for="type in VISIT_TYPES" 
              :key="type.value" 
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-field">
        <label for="note">Note</label>
        <textarea
          id="note"
          v-model="formData.note"
          placeholder="Enter visit notes..."
          rows="4"
          required
          class="note-textarea"
        />
      </div>

      <div class="form-actions">
        <BaseButton type="submit" variant="primary">
          Add Note
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { VISIT_TYPES } from '@/utils/constants'
import { formatDateForInput } from '@/utils/formatters'
import type { VisitType } from '@/types/visitNote'

defineProps<{
  patientId: string
}>()

const emit = defineEmits<{
  submit: [data: { date: Date; visitType: VisitType; note: string }]
}>()

const formData = ref({
  date: formatDateForInput(new Date()),
  visitType: '' as VisitType | '',
  note: ''
})

const handleSubmit = () => {
  if (!formData.value.visitType) return

  emit('submit', {
    date: new Date(formData.value.date),
    visitType: formData.value.visitType as VisitType,
    note: formData.value.note
  })

  // Reset form
  formData.value = {
    date: formatDateForInput(new Date()),
    visitType: '',
    note: ''
  }
}
</script>

<style scoped>
.visit-note-form h3 {
  margin: 0 0 var(--spacing-lg) 0;
  color: var(--color-text-primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.form-field label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

.visit-type-select,
.note-textarea {
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.visit-type-select:focus,
.note-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 159, 197, 0.1);
}

.note-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>