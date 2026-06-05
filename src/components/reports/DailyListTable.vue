<template>
  <v-data-table
    :headers="computedHeaders"
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
          v-for="header in computedHeaders"
          :key="header.key"
          :style="header.minWidth ? `width: ${header.minWidth}` : ''"
        >
          {{ header.title }}
        </th>
      </tr>
    </template>

    <template #item.index="{ index }">
      {{ (page - 1) * itemsPerPage + index + 1 }}
    </template>

    <template v-for="date in dates" #[`item.${date}`]="{ item }" :key="date">
      <span v-if="item[date] === 'pass'" class="text-green">✓</span>
      <span v-else-if="item[date] === 'fail'" class="text-red">不合格 </span>
      <span v-else-if="item[date] === 'other'" class="text-orange">其他</span>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { ref } from 'vue'
  import { dailyHeaders } from '@/data/tables/reports'

  interface DailyRow {
    itemId: number
    no: string
    item: string
    category: string
    [key: string]: string | number // 動態日期欄
  }

  const props = defineProps({
    items: { type: Array as () => DailyRow[], default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const page = ref(1)
  const itemsPerPage = ref(10)

  // 固定欄位的 key
  const fixedKeys = new Set(['itemId', 'no', 'item', 'category'])

  // 從 items 裡動態抓出所有日期欄，排序新→舊
  const dates = computed<string[]>(() => {
    const allKeys = new Set<string>()
    props.items.forEach((row) => {
      Object.keys(row).forEach((k) => {
        if (!fixedKeys.has(k)) allKeys.add(k)
      })
    })
    return [...allKeys].sort((a, b) => b.localeCompare(a))
  })

  const formatDateLabel = (date) => {
    const [, m, d] = date.split('-')
    return `${parseInt(m)}/${parseInt(d)}`
  }

  const computedHeaders = computed(() => [
    ...dailyHeaders,
    ...dates.value.map((date) => ({
      title: formatDateLabel(date),
      key: date,
      minWidth: '80px',
      width: '80px',
      sortable: false,
    })),
  ])
</script>
