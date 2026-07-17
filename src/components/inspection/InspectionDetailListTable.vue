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
                  :src="blobUrls[file.filename]"
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
  import { ref, watch  } from 'vue'
  import axios from '@/plugins/axios'

  //stores
  import { useInspectionsStore } from '@/stores/modules/inspections'

  // data
  import { inspectionDetailHeaders } from '@/data/tables/inspectionsDetail'

  const props = defineProps({
    items: {
      type: Array,
      default: () => [],
    },
  })

  const inspectionsStore = useInspectionsStore()
  const blobUrls = ref<Record<string, string>>({})

  // 當 items 有資料時，預先載入所有圖片
  watch(() => props.items, async (newItems) => {
    for (const item of newItems as any[]) {
      for (const file of item.files ?? []) {
        if (file.mimetype?.startsWith('image/') && !blobUrls.value[file.filename]) {
          try {
            const res = await axios.get(`/inspections/files/${file.filename}`, { responseType: 'blob' })
            blobUrls.value[file.filename] = window.URL.createObjectURL(res.data)
          } catch (error) {
            console.log('error loading image', error)
          }
        }
      }
    }
  }, { immediate: true })

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
