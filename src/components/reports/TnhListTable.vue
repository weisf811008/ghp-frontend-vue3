<template>
  <v-data-table
    :headers="tnhHeaders"
    :items="sortedItems"
    :loading="loading"
    item-value="itemId"
    fixed-header
    height="calc(100vh - 200px)"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
  >
    <template #headers>
      <tr>
        <th
          v-for="header in tnhHeaders"
          :key="header.key"
          :style="header.width ? `width: ${header.width}` : ''"
        >
          {{ header.title }}
        </th>
      </tr>
    </template>

    <template #item.index="{ index }">
      {{ (page - 1) * itemsPerPage + index + 1 }}
    </template>

    <template #item.date="{ item }">
      {{ new Date(item.date).toLocaleDateString('zh-TW') }}
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  // datas
  import { tnhHeaders } from '@/data/tables/reports'

  interface TnhRow {
    date: string
    warehouseTemp: boolean
    warehouseHum: string
    fridgeCold: string
    fridgeFreeze: string
    specimenFridge: string
  }

  const props = defineProps({
    items: { type: Array as () => TnhRow[], default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const sortedItems = computed(() =>
    [...props.items].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  )

  const page = ref(1)
  const itemsPerPage = ref(10)
</script>
