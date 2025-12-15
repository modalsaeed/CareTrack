import { ref } from 'vue'

export function useApi<T>(apiCall: () => Promise<T>, delayMs = 500) {
    const data = ref<T | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetch = async () => {
        loading.value = true
        error.value = null
        try {
            // Simulating network delay using setTimeout
            await new Promise(resolve => setTimeout(resolve, delayMs))
            data.value = await apiCall()
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred'
        } finally {
            loading.value = false
        }
    }

    return { data, loading, error, fetch }
}