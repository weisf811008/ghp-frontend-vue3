<template>
  <v-data-table
    :headers="prodTempHeaders"
    :items="items"
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
          v-for="header in prodTempHeaders"
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

    <template #item.wasCovered="{ item }">
      <span :class="item.wasCovered ? 'text-green' : 'text-red'">
        {{ item.wasCovered ? '✓' : '✗' }}
      </span>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // datas
  import { prodTempHeaders } from '@/data/tables/reports'

  interface ProdTempRow {
    date: string
    wasCovered: boolean
    starter: string
    mainCourse: string
    sideDish: string
    vegetable: string
  }

  const props = defineProps({
    items: { type: Array as () => ProdTempRow[], default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const page = ref(1)
  const itemsPerPage = ref(10)
</script>
