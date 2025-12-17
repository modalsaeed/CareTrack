import { defineStore } from 'pinia'
import type { AuthState, LoginCredentials } from '@/types/auth'
import { isValidEmail, isRequired, VALIDATION_MESSAGES } from '@/utils/validators'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        loggedIn: false,
        userEmail: null
    }),
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
        },
        logout() {
            this.loggedIn = false
            this.userEmail = null
        }
    }
})
