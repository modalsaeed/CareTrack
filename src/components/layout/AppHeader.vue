<template>
  <header class="app-header">
    <div class="logo-area">
      <img :src="logo" alt="CareTrack logo" class="logo-icon" />
      <span class="brand-name">CareTrack</span>
    </div>
    <div class="header-actions">
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
import { ref} from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import logo from '@/assets/logo.svg'
import avatar from '@/assets/avatar.jpg'

const router = useRouter()
const { logout} = useAuth()
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
  height: 70px;
  padding: 0 32px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
  background: none;
  display: block;
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  transition: transform 0.2s;
}
.user-avatar:hover {
  transform: scale(1.05);
}

.dropdown-menu {
  position: absolute;
  top: 52px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  color: #2d3748;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f7fafc;
}

.dropdown-item.logout {
  color: #c53030;
}

.dropdown-item.logout:hover {
  background: #fed7d7;
}

.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
}
</style>