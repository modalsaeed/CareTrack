<template>
  <BaseCard class="visit-note-card">
    <div class="note-header">
      <div class="note-date">
        <span class="material-icons">event</span>
        <span>{{ formattedDate }}</span>
      </div>
      <span class="visit-type-badge">{{ visitTypeLabel }}</span>
    </div>
    
    <p class="note-text">{{ note.note }}</p>
    
    <button 
      v-if="showDelete"
      @click="handleDelete" 
      class="delete-button"
      aria-label="Delete note"
    >
      <span class="material-icons">delete</span>
    </button>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { VisitNote } from '@/types/visitNote'
import BaseCard from '@/components/common/BaseCard.vue'
import { formatDate } from '@/utils/formatters'
import { VISIT_TYPES } from '@/utils/constants'

const props = defineProps<{
  note: VisitNote
  showDelete?: boolean
}>()

const emit = defineEmits<{
  delete: [noteId: string]
}>()

const formattedDate = computed(() => formatDate(props.note.date))

const visitTypeLabel = computed(() => {
  const type = VISIT_TYPES.find(t => t.value === props.note.visitType)
  return type ? type.label : props.note.visitType
})

const handleDelete = () => {
  emit('delete', props.note.id)
}
</script>

<style scoped>
.visit-note-card {
  position: relative;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.note-date {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.note-date .material-icons {
  font-size: 1rem;
}

.visit-type-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--primary-color);
  color: white;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.note-text {
  margin: 0;
  color: var(--text-primary);
  line-height: 1.6;
  white-space: pre-wrap;
}

.delete-button {
  position: absolute;
  top: var(--spacing-sm);
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
  transition: background-color 0.2s ease, color 0.2s ease;
}

.delete-button:hover {
  background-color: var(--color-error-bg);
  color: var(--color-error);
}

.delete-button .material-icons {
  font-size: 1.25rem;
}
</style>