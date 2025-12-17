<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePatientsStore } from '@/stores/patients'
import { useVisitNotesStore } from '@/stores/visitNotes'
import VisitNoteList from '@/components/visitNotes/VisitNoteList.vue'
import VisitNoteForm from '@/components/visitNotes/VisitNoteForm.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import type { VisitNote, VisitType } from '@/types/visitNote'
import { GENDER_OPTIONS } from '@/utils/constants'

const route = useRoute()
const router = useRouter()
const patientsStore = usePatientsStore()
const visitNotesStore = useVisitNotesStore()

const patientId = computed(() => route.params.id as string)
const patient = computed(() => patientsStore.getById(patientId.value))
const visitNotes = computed(() => visitNotesStore.getByPatientId(patientId.value))

const showForm = ref(false)

const genderLabel = computed(() => {
  if (!patient.value) return ''
  return GENDER_OPTIONS.find(opt => opt.value === patient.value!.gender)?.label || ''
})

const handleAddNote = (data: { date: Date; visitType: VisitType; note: string }) => {
  const newNote: VisitNote = {
    id: Date.now().toString(),
    patientId: patientId.value,
    ...data
  }
  visitNotesStore.addNote(newNote)
  showForm.value = false
}

const handleDeleteNote = (noteId: string) => {
  visitNotesStore.deleteNote(noteId)
}

const goBack = () => {
  router.push('/patients')
}
</script>

<template>
  <div class="patient-detail">
    <!-- Back Button -->
    <button class="back-btn" @click="goBack">
      <span class="material-icons">arrow_back</span>
      Back to Patients
    </button>

    <!-- Patient Not Found -->
    <BaseCard v-if="!patient">
      <p class="not-found">Patient not found</p>
    </BaseCard>

    <!-- Patient Details -->
    <template v-else>
      <!-- Patient Info Card -->
      <BaseCard class="patient-info">
        <div class="patient-header">
          <div class="avatar">
            {{ patient.name.charAt(0) }}
          </div>
          <div class="patient-main">
            <h1>{{ patient.name }}</h1>
            <p class="medical-id">{{ patient.medicalId }}</p>
          </div>
        </div>

        <div class="patient-details">
          <div class="detail-item">
            <span class="material-icons">cake</span>
            <span>{{ patient.age }} years old</span>
          </div>
          <div class="detail-item">
            <span class="material-icons">{{ patient.gender === 'male' ? 'male' : patient.gender === 'female' ? 'female' : 'transgender' }}</span>
            <span>{{ genderLabel }}</span>
          </div>
          <div class="detail-item">
            <span class="material-icons">phone</span>
            <span>{{ patient.contactNumber }}</span>
          </div>
          <div class="detail-item">
            <span class="material-icons">email</span>
            <span>{{ patient.email }}</span>
          </div>
          <div class="detail-item">
            <span class="material-icons">home</span>
            <span>{{ patient.address }}</span>
          </div>
        </div>
      </BaseCard>

      <!-- Visit Notes Section -->
      <div class="visit-notes-section">
        <div class="section-header">
          <h2>Visit Notes</h2>
          <button 
            class="add-note-btn"
            @click="showForm = !showForm"
          >
            <span class="material-icons">{{ showForm ? 'close' : 'add' }}</span>
            {{ showForm ? 'Cancel' : 'Add Note' }}
          </button>
        </div>

        <!-- Add Note Form -->
        <VisitNoteForm 
          v-if="showForm"
          :patient-id="patientId"
          @submit="handleAddNote"
        />

        <!-- Notes List -->
        <VisitNoteList 
          :notes="visitNotes"
          @delete="handleDeleteNote"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.patient-detail {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--color-background-soft);
  border-color: var(--color-primary);
}

.back-btn .material-icons {
  font-size: 1.125rem;
}

.not-found {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem;
}

.patient-info {
  margin-bottom: 2rem;
}

.patient-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.patient-main h1 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  color: var(--color-text);
}

.medical-id {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  font-family: 'Courier New', monospace;
}

.patient-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-secondary);
}

.detail-item .material-icons {
  font-size: 1.25rem;
  color: var(--color-text-muted);
}

.visit-notes-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text);
}

.add-note-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-note-btn:hover {
  background: var(--color-primary-dark);
}

.add-note-btn .material-icons {
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .patient-header {
    flex-direction: column;
    text-align: center;
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .add-note-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>