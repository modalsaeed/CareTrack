<template>
  <!-- Overlay for mobile -->
  <div 
    v-if="isOpen" 
    class="sidebar-overlay"
    @click="$emit('close')"
  ></div>
  
  <aside class="app-sidebar" :class="{ 'is-open': isOpen }">
    <nav class="nav-menu">
      <router-link to="/dashboard" class="nav-item" active-class="active">
        <span class="material-icons">dashboard</span>
        <span>Dashboard</span>
      </router-link>
      
      <router-link to="/patients" class="nav-item" active-class="active">
        <span class="material-icons">person</span>
        <span>Patients</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.app-sidebar {
  width: var(--sidebar-width);
  background: var(--color-bg-primary);
  border-right: 1px solid var(--color-border);
  padding: 0;
}

.nav-menu {
  padding: var(--spacing-xl) var(--spacing-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  transition: all var(--transition-base);
}

.nav-item:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.nav-item.active {
  background: var(--color-primary);
  color: var(--color-text-white);
}

/* Mobile styles */
.sidebar-overlay {
  display: none;
}

@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    top: var(--header-height);
    left: 0;
    bottom: 0;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .app-sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
}
</style>