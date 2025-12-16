<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <div class="logo-circle">CT</div>
      </div>
      
      <h1 class="brand-name">CareTrack</h1>
      <h2 class="welcome-title">Welcome Back</h2>
      <p class="subtitle">Sign in to manage your clinic</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>

        <p class="demo-note">Demo: Enter any email and password to continue</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

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
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 48px 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.logo-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b9fc5 0%, #2d8ab0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.brand-name {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
}

.welcome-title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
}

.subtitle {
  text-align: center;
  font-size: 14px;
  color: #718096;
  margin: 0 0 32px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #3b9fc5;
  box-shadow: 0 0 0 3px rgba(59, 159, 197, 0.1);
}

.form-group input::placeholder {
  color: #a0aec0;
}

.error-message {
  padding: 12px;
  background-color: #fed7d7;
  border: 1px solid #fc8181;
  border-radius: 8px;
  color: #c53030;
  font-size: 14px;
  text-align: center;
}

.submit-btn {
  padding: 14px;
  background-color: #3b9fc5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2d8ab0;
}

.submit-btn:disabled {
  background-color: #90cdf4;
  cursor: not-allowed;
}

.demo-note {
  text-align: center;
  font-size: 13px;
  color: #e07c0e;
  margin: 8px 0 0 0;
}
</style>