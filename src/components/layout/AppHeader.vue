<template>
  <header class="app-header">
    <div class="logo-area">
      <img :src="logo" alt="CareTrack logo" class="logo-icon" />
      <span class="brand-name">CareTrack</span>
    </div>
    <div class="header-actions">
      <!-- Theme Toggle -->
      <ThemeToggle />
      
      <div class="user-menu" @click="toggleDropdown">
        <img :src="avatar" alt="User avatar" class="user-avatar" />
        <div v-if="showDropdown" class="dropdown-menu">
          <button @click="handleLogout" class="dropdown-item logout">
            <span class="material-icons">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import logo from '@/assets/logo.svg'
import avatar from '@/assets/avatar.jpg'

const router = useRouter()
const { logout } = useAuth()
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = () => {
  logout()
  showDropdown.value = false
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--spacing-2xl);
  background: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-lg);
  object-fit: cover;
  display: block;
}

.brand-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  object-fit: cover;
  display: block;
  transition: transform var(--transition-base);
}

.user-avatar:hover {
  transform: scale(1.05);
}

.dropdown-menu {
  position: absolute;
  top: 3.25rem;
  right: 0;
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 10rem;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  background: none;
  text-align: left;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background var(--transition-base);
}

.dropdown-item:hover {
  background: var(--color-bg-secondary);
}

.dropdown-item.logout {
  color: var(--color-error);
}

.dropdown-item.logout:hover {
  background: var(--color-error-bg);
}
</style>