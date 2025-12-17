import { defineStore } from 'pinia'
import type { AuthState, LoginCredentials } from '@/types/auth'
import { isValidEmail, isRequired, VALIDATION_MESSAGES } from '@/utils/validators'
import { STORAGE_KEYS } from '@/utils/constants'

const AUTH_STORAGE_KEY = STORAGE_KEYS.AUTH

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return { loggedIn: false, userEmail: null }
    }
  }
  return { loggedIn: false, userEmail: null }
}

// Save state to localStorage
const saveAuthState = (state: AuthState) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => loadAuthState(),
  
  actions: {
    async login(credentials: LoginCredentials) {
      const email = credentials.email.trim()
      const password = credentials.password.trim()

      if (!isRequired(email) || !isRequired(password)) {
        throw new Error(VALIDATION_MESSAGES.REQUIRED)
      }

      if (!isValidEmail(email)) {
        throw new Error(VALIDATION_MESSAGES.INVALID_EMAIL)
      }

      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 500))

      this.loggedIn = true
      this.userEmail = email
      
      // Persist to localStorage
      saveAuthState(this.$state)
    },
    
    logout() {
      this.loggedIn = false
      this.userEmail = null
      
      // Clear from localStorage
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }
})
