<template>
  <v-data-table
    :headers="historyHeaders"
    :items="items"
    :loading="loading"
    item-value="id"
    fixed-header
    height="calc(100vh - 200px)"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
  >
    <template #headers>
      <tr>
        <th
          v-for="header in historyHeaders"
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

    <template #item.timestamp="{ item }">
      {{ formatIsoString('datetime', item.timestamp) }}
    </template>
  </v-data-table>
</template>

<script setup>
  import { ref } from 'vue'
  import { formatIsoString } from '@/utils/date'
  import { historyHeaders } from '@/data/tables/histories'

  defineProps({
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })

  const page = ref(1)
  const itemsPerPage = ref(10)
</script>

<style lang="scss" scoped></style>
