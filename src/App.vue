<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  flex: 1;
}
</style>
