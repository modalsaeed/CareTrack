<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="input-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      v-if="type !== 'textarea'"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="input-field"
    />
    <textarea
      v-else
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      class="input-field textarea"
      rows="4"
    ></textarea>
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'date' | 'time' | 'number' | 'textarea'
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.required {
  color: var(--color-error);
}

.input-field {
  padding: 0.625rem var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-family: inherit;
  transition: border-color var(--transition-base);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input-field:disabled {
  background: var(--color-bg-secondary);
  cursor: not-allowed;
}

.textarea {
  resize: vertical;
  min-height: 5rem;
}

.input-error {
  font-size: var(--font-size-sm);
  color: var(--color-error);
}
</style>