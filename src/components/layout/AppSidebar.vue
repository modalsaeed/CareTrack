<template>
  <aside class="app-sidebar">
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

<script setup lang="ts"></script>

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
</style>