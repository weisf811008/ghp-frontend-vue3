<template>
  <v-snackbar
    v-model="snackbarStore.isVisible"
    :color="snackbarStore.color"
    :timeout="snackbarStore.timeout"
    variant="tonal"
  >
    {{ snackbarStore.text }}
    <template #actions>
      <v-btn
        icon="mdi-close"
        variant="text"
        @click="snackbarStore.closeMessage"
      />
    </template>
  </v-snackbar>
</template>

<script setup>
  import { useSnackbarStore } from '/src/stores/snackbar.ts'

  const snackbarStore = useSnackbarStore()
</script>

<style lang="scss" scoped></style>
