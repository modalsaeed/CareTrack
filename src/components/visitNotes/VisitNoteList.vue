<template>
  <div v-if="notes.length === 0" class="empty-state">
    <span class="material-icons">note_add</span>
    <p>No visit notes yet</p>
    <p class="empty-hint">Add a note using the form above</p>
  </div>

  <div v-else class="notes-list">
    <VisitNoteCard 
      v-for="note in notes" 
      :key="note.id" 
      :note="note"
      :show-delete="true"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { VisitNote } from '@/types/visitNote'
import VisitNoteCard from './VisitNoteCard.vue'

defineProps<{
  notes: VisitNote[]
}>()

const emit = defineEmits<{
  delete: [noteId: string]
}>()

const handleDelete = (noteId: string) => {
  emit('delete', noteId)
}
</script>

<style scoped>
.notes-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-state .material-icons {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.3;
}

.empty-state p {
  margin: 0;
  font-size: var(--font-size-md);
}

.empty-hint {
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
}
</style>