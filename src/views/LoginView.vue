<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <img :src="logo" alt="CareTrack logo" class="logo-icon" />
      </div>
      
      <h1 class="brand-name">CareTrack</h1>
      <h2 class="welcome-title">Welcome Back</h2>
      <p class="subtitle">Sign in to manage your clinic</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <BaseInput
          id="email"
          v-model="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <BaseInput
          id="password"
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <BaseButton type="submit" variant="primary" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </BaseButton>

        <p class="demo-note">Demo: Enter any email and password to continue</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import logo from '@/assets/logo.svg'

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const result = await login(email.value, password.value)

    if (result.success) {
      router.push('/dashboard')
    } else {
      errorMessage.value = result.error || 'Login failed'
    }
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-lg);
}

.login-card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 27.5rem;
  box-shadow: var(--shadow-lg);
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.logo-circle {
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-white);
}

.brand-name {
  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.welcome-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-700);
  margin: 0 0 var(--spacing-sm) 0;
}

.subtitle {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-2xl) 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.error-message {
  padding: var(--spacing-md);
  background-color: var(--color-error-bg);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-lg);
  color: var(--color-error);
  font-size: var(--font-size-sm);
  text-align: center;
}

.demo-note {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-warning);
  margin: var(--spacing-sm) 0 0 0;
}

/* Responsive */
@media (max-width: 48rem) {
  .login-card {
    padding: var(--spacing-2xl) var(--spacing-xl);
  }
  
  .welcome-title {
    font-size: var(--font-size-xl);
  }
}
</style>