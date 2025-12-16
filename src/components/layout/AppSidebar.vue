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
  width: 240px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
  padding: 0;
}

.nav-menu {
  padding: 24px 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #f7fafc;
  color: #2d3748;
}

.nav-item.active {
  background: #3b9fc5;
  color: #fff;
}

.nav-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
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