<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments'
import AppointmentList from '@/components/appointments/AppointmentList.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const appointmentsStore = useAppointmentsStore()

// Selected date state (defaults to today)
const selectedDate = ref(new Date())

// Get appointments for selected date using store getter
const selectedDateAppointments = computed(() => {
  return appointmentsStore.getByDate(selectedDate.value)
})

// Calculate summary statistics
const stats = computed(() => {
  const appointments = selectedDateAppointments.value
  return {
    total: appointments.length,
    scheduled: appointments.filter(a => a.status === 'scheduled').length,
    checkedIn: appointments.filter(a => a.status === 'checked-in').length,
    completed: appointments.filter(a => a.status === 'completed').length
  }
})

// Format selected date
const formattedDate = computed(() => {
  return selectedDate.value.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Check if selected date is today
const isToday = computed(() => {
  const today = new Date()
  return (
    selectedDate.value.getDate() === today.getDate() &&
    selectedDate.value.getMonth() === today.getMonth() &&
    selectedDate.value.getFullYear() === today.getFullYear()
  )
})

// Date navigation
const goToPreviousDay = () => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() - 1)
  selectedDate.value = newDate
}

const goToNextDay = () => {
  const newDate = new Date(selectedDate.value)
  newDate.setDate(newDate.getDate() + 1)
  selectedDate.value = newDate
}

const goToToday = () => {
  selectedDate.value = new Date()
}

const openNewAppointment = () => {
  router.push('/appointments/new')
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p class="date">{{ formattedDate }}</p>
      </div>
      <BaseButton @click="openNewAppointment" class="new-appointment-btn">
        <span class="material-icons">add</span>
        New Appointment
      </BaseButton>
    </div>

    <!-- Date Navigation -->
    <div class="date-navigation">
      <BaseButton @click="goToPreviousDay" variant="secondary" size="small">
        <span class="material-icons">chevron_left</span>
        Previous
      </BaseButton>
      <BaseButton 
        @click="goToToday" 
        variant="secondary" 
        size="small"
        :disabled="isToday"
      >
        Today
      </BaseButton>
      <BaseButton @click="goToNextDay" variant="secondary" size="small">
        Next
        <span class="material-icons">chevron_right</span>
      </BaseButton>
    </div>

    <!-- Summary Stats -->
    <div class="stats-grid">
      <BaseCard class="stat-card">
        <span class="material-icons">event</span>
        <div class="stat-content">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">Total Appointments</div>
        </div>
      </BaseCard>

      <BaseCard class="stat-card">
        <span class="material-icons">schedule</span>
        <div class="stat-content">
          <div class="stat-value">{{ stats.scheduled }}</div>
          <div class="stat-label">Scheduled</div>
        </div>
      </BaseCard>

      <BaseCard class="stat-card">
        <span class="material-icons">check_circle</span>
        <div class="stat-content">
          <div class="stat-value">{{ stats.checkedIn }}</div>
          <div class="stat-label">Checked In</div>
        </div>
      </BaseCard>

      <BaseCard class="stat-card">
        <span class="material-icons">done_all</span>
        <div class="stat-content">
          <div class="stat-value">{{ stats.completed }}</div>
          <div class="stat-label">Completed</div>
        </div>
      </BaseCard>
    </div>

    <!-- Appointments Section -->
    <div class="appointments-section">
      <h2>{{ isToday ? "Today's" : "Day's" }} Appointments</h2>
      <AppointmentList :appointments="selectedDateAppointments" />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: var(--spacing-lg);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.dashboard-header h1 {
  margin: 0 0 var(--spacing-xs) 0;
  color: var(--text-primary);
}

.date {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-md);
}

.new-appointment-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.new-appointment-btn .material-icons {
  font-size: 1.25rem;
}

/* Date Navigation */
.date-navigation {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.date-navigation button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.date-navigation .material-icons {
  font-size: 1.25rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-card .material-icons {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Appointments Section */
.appointments-section {
  margin-top: var(--spacing-xl);
}

.appointments-section h2 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard {
    padding: var(--spacing-md);
  }

  .dashboard-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .new-appointment-btn {
    width: 100%;
    justify-content: center;
  }

  .date-navigation {
    flex-wrap: wrap;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .stat-card .material-icons {
    font-size: 2rem;
  }

  .stat-value {
    font-size: var(--font-size-lg);
  }
}
</style>