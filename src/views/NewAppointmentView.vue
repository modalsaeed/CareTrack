<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments'
import AppointmentForm from '@/components/appointments/AppointmentForm.vue'
import { usePatientsStore } from '@/stores/patients'

const router = useRouter()
const appointmentsStore = useAppointmentsStore()
const patientsStore = usePatientsStore()

interface AppointmentFormData {
  patientId: string
  date: Date
  time: string
  reason: string
}

const handleSubmit = (data: AppointmentFormData) => {
  const patient = patientsStore.getById(data.patientId)
  
  if (!patient) {
    console.error('Patient not found')
    return
  }

  const newAppointment = {
    id: Date.now().toString(),
    patientId: data.patientId,
    patientName: patient.name,
    date: data.date,
    time: data.time,
    reason: data.reason,
    status: 'scheduled' as const
  }

  appointmentsStore.addAppointment(newAppointment)
  router.push('/')
}

const handleCancel = () => {
  router.push('/')
}
</script>

<template>
  <div class="new-appointment">
    <AppointmentForm 
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
.new-appointment {
  max-width: 600px;
  margin: 0 auto;
}
</style>