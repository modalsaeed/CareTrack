import { ref, watch, type Ref } from 'vue'

/**
 * Generic composable for localStorage persistence
 * Automatically syncs a ref with localStorage
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // Try to load from localStorage
  const storedValue = localStorage.getItem(key)
  const data = ref<T>(
    storedValue ? JSON.parse(storedValue) : defaultValue
  ) as Ref<T>

  // Watch for changes and save to localStorage
  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )

  return data
}

/**
 * Remove item from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key)
}

/**
 * Clear all localStorage
 */
export function clearLocalStorage(): void {
  localStorage.clear()
}