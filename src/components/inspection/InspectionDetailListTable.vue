<template>
  <v-data-table
    :headers="inspectionDetailHeaders"
    :items="items ?? []"
    item-value="itemId"
    hide-default-footer
    height="300px"
    show-expand
  >
    <template #headers>
      <tr>
        <th
          v-for="header in inspectionDetailHeaders"
          :key="header.key"
          :style="header.width ? `width: ${header.width}` : ''"
        >
          {{ header.title }}
        </th>
      </tr>
    </template>

    <template #item.index="{ index }">
      {{ index + 1 }}
    </template>

    <template #item.status="{ item }">
      <div :style="{ color: item.status === 'pass' ? 'green' : 'red' }">
        {{ item.status === 'pass' ? '合格' : '不合格' }}
      </div>
    </template>

    <template #expanded-row="{ item, columns }">
      <tr>
        <td :colspan="columns.length + 1" class="pa-4">
          <div class="d-flex flex-column ga-3">
            <v-text-field
              v-model="item.remarks"
              variant="outlined"
              density="compact"
              hide-details
            />
            <div v-if="item.files?.length" class="d-flex flex-wrap ga-2 mt-2">
              <div
                v-for="file in item.files"
                :key="file.id"
                style="cursor: pointer"
                @click="downloadFile(file)"
              >
                <v-img
                  v-if="file.mimetype?.startsWith('image/')"
                  :src="`/api/inspections/files/${file.filename}`"
                  width="80"
                  height="80"
                  cover
                  style="border-radius: 4px; border: 1px solid #ddd"
                >
                  <template #error>
                    <v-icon icon="mdi-image-broken" size="40" />
                  </template>
                </v-img>

                <v-chip
                  v-else
                  size="small"
                  :prepend-icon="getFileIcon(file.mimetype)"
                >
                  {{ file.originalname }}
                </v-chip>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  //stores
  import { useInspectionsStore } from '@/stores/modules/inspections'

  // data
  import { inspectionDetailHeaders } from '@/data/tables/inspectionsDetail'

  defineProps({
    items: {
      type: Array,
      default: () => [],
    },
  })

  const inspectionsStore = useInspectionsStore()

  const getFileIcon = (mimetype: string) => {
    if (mimetype?.includes('word')) return 'mdi-file-word'
    if (mimetype?.includes('excel') || mimetype?.includes('spreadsheet'))
      return 'mdi-file-excel'
    if (mimetype?.includes('pdf')) return 'mdi-file-pdf'
    return 'mdi-file-document'
  }

  const downloadFile = (file: any) => {
    inspectionsStore.getUploadFileByFilename(file.filename, file.originalname)
  }
</script>

<style lang="scss" scoped></style>
