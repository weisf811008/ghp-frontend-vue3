<template>
  <div class="d-flex align-center ga-2">
    <v-menu
      v-model="startMenu"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="startDate"
          label="開始日期"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          density="compact"
          hide-details
          readonly
          v-bind="props"
          style="min-width: 160px"
        />
      </template>
      <v-date-picker
        :model-value="startDate"
        :max="new Date().toISOString().substring(0, 10)"
        @update:modelValue="
          (val) => {
            startDate = formatDate(val)
            startMenu = false
          }
        "
      />
    </v-menu>

    <span class="text-medium-emphasis">～</span>

    <v-menu
      v-model="endMenu"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="endDate"
          label="結束日期"
          prepend-inner-icon="mdi-calendar"
          variant="outlined"
          density="compact"
          hide-details
          readonly
          v-bind="props"
          style="min-width: 160px"
        />
      </template>
      <v-date-picker
        :model-value="endDate"
        :min="startDate || undefined"
        :max="new Date().toISOString().substring(0, 10)"
        @update:modelValue="
          (val) => {
            endDate = formatDate(val)
            endMenu = false
          }
        "
      />
    </v-menu>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'

  const emit = defineEmits(['update:dateRange'])

  const today = new Date()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(today.getDate() - 7)

  const startMenu = ref(false)
  const endMenu = ref(false)
  const startDate = ref(oneWeekAgo.toISOString().substring(0, 10))
  const endDate = ref(today.toISOString().substring(0, 10))

  const formatDate = (val) => {
    const date = val instanceof Date ? val : new Date(val)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const toUTCStart = (date: string) =>
    new Date(`${date}T00:00:00+08:00`).toISOString()

  const toUTCEnd = (date: string) =>
    new Date(`${date}T23:59:59.999+08:00`).toISOString()

  onMounted(() => {
    emit('update:dateRange', {
      start: startDate.value,
      end: endDate.value,
      startUtc: toUTCStart(startDate.value),
      endUtc: toUTCEnd(endDate.value),
    })
  })

  watch([startDate, endDate], ([start, end]) => {
    emit('update:dateRange', {
      start,
      end,
      startUtc: toUTCStart(start),
      endUtc: toUTCEnd(end),
    })
  })
</script>
