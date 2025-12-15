import { defineStore } from 'pinia'
import type { AuthState, LoginCredentials } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        loggedIn: false,
        userEmail: null
    }),
    actions: {
        login(credentials: LoginCredentials) {
            const email = credentials.email.trim()
            const password = credentials.password.trim()

            if (!email || !password) {
                throw new Error('Email and password are required.')
            }

            this.loggedIn = true
            this.userEmail = email
        },
        logout() {
            this.loggedIn = false
            this.userEmail = null
        }
    }
})
