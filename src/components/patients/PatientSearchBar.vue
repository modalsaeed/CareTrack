<template>
  <div class="search-bar">
    <span class="material-icons search-icon">search</span>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Search by name or medical ID..."
      class="search-input"
    />
    <button 
      v-if="modelValue" 
      @click="$emit('update:modelValue', '')"
      class="clear-button"
      aria-label="Clear search"
    >
      <span class="material-icons">close</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  color: var(--text-secondary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  background: var(--surface-color);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.clear-button {
  position: absolute;
  right: var(--spacing-sm);
  background: none;
  border: none;
  padding: var(--spacing-xs);
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.2s ease;
}

.clear-button:hover {
  background-color: var(--color-gray-100);
}

.clear-button .material-icons {
  font-size: 1.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .search-bar {
    max-width: 100%;
  }
}
</style>