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
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background: #3b9fc5;
  color: white;
}

.primary:hover:not(:disabled) {
  background: #2d8ab0;
}

.secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.secondary:hover:not(:disabled) {
  background: #cbd5e0;
}
</style>