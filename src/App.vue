<template>
  <!-- Login page (no layout) -->
  <div v-if="isLoginPage" class="login-layout">
    <router-view />
  </div>

  <!-- 404 page (no layout) -->
  <div v-else-if="isNotFoundPage" class="not-found-layout">
    <router-view />
  </div>

  <!-- App layout (header + sidebar + main content) -->
  <div v-else class="app-layout">
    <AppHeader />
    <div class="app-body">
      <AppSidebar />
      <main class="main-content">
        <!-- Show loading screen while fetching data -->
        <div v-if="appLoading" class="content-loading">
          <LoadingSpinner />
          <p>{{ loadingMessage }}</p>
        </div>

        <!-- Show error with retry button if initialization fails -->
        <div v-else-if="appError" class="content-error">
          <h2>Failed to Load Data</h2>
          <p>{{ appError }}</p>
          <BaseButton @click="retryInit" variant="primary">Retry</BaseButton>
        </div>

        <!-- Normal content once loaded -->
        <router-view v-else />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import LoadingSpinner from '@/components/layout/LoadingSpinner.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useApi } from '@/composables/useApi'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
const isNotFoundPage = computed(() => route.name === 'not-found')

// API loading/error states
const { loading: appLoading, error: appError, fetchAppData } = useApi()
const { isLoggedIn } = useAuth()

// Dynamic loading message based on current route
const loadingMessage = computed(() => {
  if (route.path.startsWith('/patients')) {
    return 'Loading patients...'
  }
  return 'Loading appointments...'
})

// Fetch data when user logs in
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    fetchAppData()
  }
})

// Also fetch on mount if already logged in (page refresh)
onMounted(() => {
  if (isLoggedIn.value) {
    fetchAppData()
  }
})

const retryInit = () => {
  fetchAppData()
}
</script>

<style scoped>
/* Login layout */
.login-layout {
  min-height: 100vh;
}

/* 404 layout */
.not-found-layout {
  min-height: 100vh;
}

/* App layout */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.app-body {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: var(--spacing-2xl);
  background: var(--color-bg-secondary);
}

/* Loading/Error states in main content */
.content-loading,
.content-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--spacing-lg);
}

.content-loading p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.content-error {
  text-align: center;
}

.content-error h2 {
  color: var(--color-error);
}

.content-error p {
  color: var(--color-text-secondary);
}
</style>
