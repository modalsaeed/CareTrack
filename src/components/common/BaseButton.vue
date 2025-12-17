<template>
  <button 
    :type="type" 
    :class="['base-button', variant]" 
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.base-button {
  padding: 0.625rem var(--spacing-xl);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-base);
  border: none;
  font-family: inherit;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background: var(--color-primary);
  color: var(--color-text-white);
}

.primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.secondary {
  background: var(--color-gray-200);
  color: var(--color-text-primary);
}

.secondary:hover:not(:disabled) {
  background: var(--color-gray-300);
}
</style>