<template>
  <v-data-table
    :headers="visitingHeaders"
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
          v-for="header in visitingHeaders"
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

    <template #item.pass="{ item }">
      <span class="text-green">{{ item.pass?.length ?? 0 }}</span>
    </template>
    <template #item.fail="{ item }">
      <span class="text-red">{{ item.fail?.length ?? 0 }}</span>
    </template>
    <template #item.others="{ item }">
      <span class="text-orange">{{ item.others?.length ?? 0 }}</span>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // datas
  import { visitingHeaders } from '@/data/tables/reports'

  const props = defineProps({
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
  })

  const page = ref(1)
  const itemsPerPage = ref(10)
</script>
