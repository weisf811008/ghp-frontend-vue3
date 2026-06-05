<template>
  <v-text-field
    v-model="searchText"
    :loading="isLoading"
    append-inner-icon="mdi-magnify"
    density="compact"
    label="Search"
    variant="solo"
    hide-details
    single-line
    @click:append-inner="onClick"
  ></v-text-field>
</template>

<script setup>
  import { ref, watch } from 'vue'
  const props = defineProps({
    isLoading: {
      type: Boolean,
      default: false,
    },
  })

  const searchText = ref('')
  const emit = defineEmits(['search'])

  let timer = null

  watch(searchText, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      emit('search', value)
    }, 500)
  })

  const onClick = () => {
    emit('search', searchText.value)
  }
</script>

<style lang="scss" scoped></style>
