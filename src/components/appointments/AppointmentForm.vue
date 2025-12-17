<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePatientsStore } from '@/stores/patients'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { formatDateForInput } from '@/utils/formatters'
import { isRequired, VALIDATION_MESSAGES } from '@/utils/validators'

interface AppointmentFormData {
  patientId: string
  date: Date
  time: string
  reason: string
}

const emit = defineEmits<{
  submit: [data: AppointmentFormData]
  cancel: []
}>()

const patientsStore = usePatientsStore()

const formData = ref({
  patientId: '',
  date: formatDateForInput(new Date()),
  time: '',
  reason: ''
})

const errors = ref({
  patientId: '',
  date: '',
  time: '',
  reason: ''
})

const patients = computed(() => patientsStore.allPatients)

const validateForm = (): boolean => {
  let isValid = true
  
  // Reset errors
  errors.value = {
    patientId: '',
    date: '',
    time: '',
    reason: ''
  }

  // Validate patient
  if (!isRequired(formData.value.patientId)) {
    errors.value.patientId = VALIDATION_MESSAGES.REQUIRED
    isValid = false
  }

  // Validate date
  if (!isRequired(formData.value.date)) {
    errors.value.date = VALIDATION_MESSAGES.REQUIRED
    isValid = false
  }

  // Validate time
  if (!isRequired(formData.value.time)) {
    errors.value.time = VALIDATION_MESSAGES.REQUIRED
    isValid = false
  } else {
    // Check time format (HH:MM)
    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timePattern.test(formData.value.time)) {
      errors.value.time = 'Invalid time format (use HH:MM)'
      isValid = false
    }
  }

  // Validate reason
  if (!isRequired(formData.value.reason)) {
    errors.value.reason = VALIDATION_MESSAGES.REQUIRED
    isValid = false
  } else if (formData.value.reason.trim().length < 3) {
    errors.value.reason = 'Reason must be at least 3 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  const appointmentData: AppointmentFormData = {
    patientId: formData.value.patientId,
    date: new Date(formData.value.date),
    time: formData.value.time,
    reason: formData.value.reason.trim()
  }

  emit('submit', appointmentData)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <BaseCard>
    <form @submit.prevent="handleSubmit" class="appointment-form">
      <h3>Schedule Appointment</h3>

      <!-- Patient Selection -->
      <div class="form-group">
        <label for="patient">
          Patient <span class="required">*</span>
        </label>
        <select
          id="patient"
          v-model="formData.patientId"
          :class="{ error: errors.patientId }"
        >
          <option value="">Select a patient</option>
          <option
            v-for="patient in patients"
            :key="patient.id"
            :value="patient.id"
          >
            {{ patient.name }} ({{ patient.medicalId }})
          </option>
        </select>
        <span v-if="errors.patientId" class="error-message">
          {{ errors.patientId }}
        </span>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label for="date">
          Date <span class="required">*</span>
        </label>
        <BaseInput
          id="date"
          v-model="formData.date"
          type="date"
          :error="errors.date"
        />
      </div>

      <!-- Time -->
      <div class="form-group">
        <label for="time">
          Time <span class="required">*</span>
        </label>
        <BaseInput
          id="time"
          v-model="formData.time"
          type="time"
          placeholder="HH:MM"
          :error="errors.time"
        />
      </div>

      <!-- Reason -->
      <div class="form-group">
        <label for="reason">
          Reason <span class="required">*</span>
        </label>
        <textarea
          id="reason"
          v-model="formData.reason"
          :class="{ error: errors.reason }"
          placeholder="Enter appointment reason..."
          rows="4"
        ></textarea>
        <span v-if="errors.reason" class="error-message">
          {{ errors.reason }}
        </span>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <BaseButton type="button" variant="secondary" @click="handleCancel">
          Cancel
        </BaseButton>
        <BaseButton type="submit" variant="primary">
          Schedule Appointment
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<style scoped>
.appointment-form h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: var(--color-text);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.required {
  color: var(--color-danger);
}

select,
textarea {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  background: var(--color-background);
  color: var(--color-text);
  transition: border-color 0.2s;
}

select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

select.error,
textarea.error {
  border-color: var(--color-danger);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-danger);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.form-actions button {
  flex: 1;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column-reverse;
  }
}
</style>