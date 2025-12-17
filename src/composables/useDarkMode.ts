// src/composables/useDarkMode.ts
import { ref, watch, onMounted } from 'vue'
import { STORAGE_KEYS } from '@/utils/constants'

export function useDarkMode() {
  const isDark = ref(false)

  const loadPreference = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE)
    if (saved !== null) {
      return saved === 'true'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const applyTheme = (dark: boolean, skipTransition = false) => {
    // Temporarily disable transitions for initial load
    if (skipTransition) {
      document.documentElement.classList.add('no-transitions')
    }

    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Re-enable transitions after a brief delay
    if (skipTransition) {
      setTimeout(() => {
        document.documentElement.classList.remove('no-transitions')
      }, 50)
    }
  }

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (newValue) => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(newValue))
    applyTheme(newValue, false) // Enable transition for user toggles
  })

  onMounted(() => {
    isDark.value = loadPreference()
    applyTheme(isDark.value, true) // Skip transition on initial load
  })

  return {
    isDark,
    toggleDarkMode
  }
}