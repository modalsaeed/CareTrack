import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
    const authStore = useAuthStore()
    const { loggedIn, userEmail } = storeToRefs(authStore)

    const isLoggedIn = computed(() => loggedIn.value)

    const login = async (email: string, password: string) => {
        try {
            authStore.login({ email, password })
            return { success: true, error: null as string | null }
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Login failed'
            }
        }
    }

    const logout = () => {
        authStore.logout()
    }

    return {
        loggedIn,
        userEmail,
        isLoggedIn,
        login,
        logout
    }
}
