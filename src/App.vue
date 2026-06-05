<template>
  <v-app>
    <v-main style="height: 100vh">
      <router-view />
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>

<script lang="ts" setup>
  import GlobalSnackbar from './components/global/Snackbar.vue'
</script>
<style scoped>
  :deep(.v-main) {
    display: flex !important;
    align-items: stretch;
  }
</style>
