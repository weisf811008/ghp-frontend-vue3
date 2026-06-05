<template>
  <v-data-table
    :headers="tablewareHeaders"
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
          v-for="header in tablewareHeaders"
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

    <template v-for="key in booleanKeys" #[`item.${key}`]="{ item }" :key="key">
      <span :class="item[key] ? 'text-green' : 'text-red'">
        {{ item[key] ? '✓' : 'x' }}
      </span>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  // datas
  import { tablewareHeaders } from '@/data/tables/reports'

  interface TablewareRow {
    date: string
    diningBucketLook: boolean
    diningBucketStarch: boolean
    diningBucketFat: boolean
    soupBucketLook: boolean
    soupBucketStarch: boolean
    soupBucketFat: boolean
    tablewareLook: boolean
    tablewareStarch: boolean
    tablewareFat: boolean
  }

  const props = defineProps({
    items: { type: Array as () => TablewareRow[], default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const sortedItems = computed(() =>
    [...props.items].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  )

  const booleanKeys = [
    'diningBucketLook',
    'diningBucketStarch',
    'diningBucketFat',
    'soupBucketLook',
    'soupBucketStarch',
    'soupBucketFat',
    'tablewareLook',
    'tablewareStarch',
    'tablewareFat',
  ]
  const page = ref(1)
  const itemsPerPage = ref(10)
</script>
