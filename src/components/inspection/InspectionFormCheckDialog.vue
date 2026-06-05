<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1000">
      <v-card title="巡檢紀錄填報">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3 d-flex justify-space-between ga-4">
              <div class="text-h6">{{ formTitle }}</div>
              <div>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="date"
                      label="請選擇日期"
                      prepend-inner-icon="mdi-calendar"
                      variant="outlined"
                      density="compact"
                      hide-details
                      readonly
                      v-bind="props"
                      style="min-width: 180px"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :max="new Date().toISOString().substring(0, 10)"
                    @update:modelValue="
                      (val) => {
                        date = new Date(val).toISOString().substring(0, 10)
                        menu = false
                      }
                    "
                  ></v-date-picker>
                </v-menu>
              </div>
              <div>
                <v-btn variant="outlined" @click="handleCheckAll"
                  >一鍵檢核</v-btn
                >
              </div>
            </div>

            <v-data-table
              :key="renderKey"
              :headers="inspectionFormCheckHeaders"
              :items="details"
              item-value="itemId"
              fixed-header
              hide-default-footer
              height="calc(100vh - 340px)"
            >
              <template #headers>
                <tr>
                  <th
                    v-for="header in inspectionFormCheckHeaders"
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

              <template #item.checkValue="{ index }">
                <v-text-field
                  v-if="details[index].needCheckValue === true"
                  v-model="details[index].checkValue"
                  placeholder="測量值"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </template>

              <template #item.status="{ item }">
                <div class="d-flex align-center ga-2">
                  <div class="d-flex ga-1">
                    <v-btn
                      v-for="label in statusOptions"
                      :key="label.value"
                      :variant="
                        item.status === label.value ? 'outlined' : 'flat'
                      "
                      :color="label.color"
                      size="small"
                      @click="item.status = label.value"
                      >{{ label.label }}</v-btn
                    >
                  </div>

                  <v-btn
                    :icon="
                      item.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                    variant="text"
                    density="compact"
                    @click="item.expanded = !item.expanded"
                  />
                </div>

                <v-expand-transition>
                  <div
                    v-if="item.expanded"
                    class="mt-2 d-flex flex-column ga-2"
                  >
                    <v-textarea
                      v-model="item.remarks"
                      label="請輸入備註"
                      rows="2"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                    <v-file-input
                      label="上傳圖片或檔案"
                      variant="outlined"
                      density="compact"
                      hide-details
                      prepend-icon=""
                      prepend-inner-icon="mdi-paperclip"
                      @update:modelValue="(files) => addFiles(item, files)"
                    />
                  </div>
                </v-expand-transition>
              </template>
            </v-data-table>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="取消" variant="flat" @click="dialog = false"></v-btn>
          <v-btn
            color="primary"
            text="送出"
            variant="flat"
            :disabled="!isFormValid"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  // stores
  import { useFormsStore } from '@/stores/modules/forms'
  import { useInspectionsStore } from '@/stores/modules/inspections'
  import { useSnackbarStore } from '@/stores/snackbar'

  // data
  import {
    inspectionFormCheckHeaders,
    statusOptions,
  } from '@/data/tables/inspectionsDetail'

  const formsStore = useFormsStore()
  const { form: formStoreData } = storeToRefs(formsStore)
  const inspectionsStore = useInspectionsStore()
  const snackbarStore = useSnackbarStore()

  const dialog = ref(false)
  const formRef = ref(null)
  const isFormValid = ref(null)
  const menu = ref(false)
  const date = ref(new Date().toISOString().substring(0, 10))
  const formTitle = ref('')
  const details = ref([])
  const renderKey = ref(0)

  const open = async (item) => {
    await formsStore.fetchFormById(item)
    const fetchedForm = formStoreData.value ?? {}
    formTitle.value = fetchedForm.title ?? ''
    details.value = (fetchedForm.details ?? []).map((detail) => ({
      ...detail,
      status: '',
      checkValue: '',
      remarks: '',
      expanded: false,
      uploadFiles: [],
    }))
    dialog.value = true
  }

  const setStatus = (index, value) => {
    const updated = [...details.value]
    updated[index] = { ...updated[index], status: value }
    details.value = updated
    renderKey.value++
  }

  const handleCheckAll = () => {
    details.value.forEach((d) => {
      d.status = 'pass'
    })
  }

  const addFiles = (item, files) => {
    if (!files) return
    const fileArray = Array.isArray(files) ? files : [files]
    item.uploadFiles = [...(item.uploadFiles ?? []), ...fileArray]
  }

  const handleSubmit = async () => {
    const addFiles = (item, files) => {
      if (!files) return
      const fileArray = Array.isArray(files) ? files : [files]
      item.uploadFiles = [...(item.uploadFiles ?? []), ...fileArray]
    }
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      // 先上傳每筆 detail 的檔案
      const detailsWithFiles = await Promise.all(
        details.value.map(async (detail) => {
          const uploadedFiles = []

          if (detail.uploadFiles?.length) {
            for (const file of detail.uploadFiles) {
              const formData = new FormData()
              formData.append('file', file)
              const res = await inspectionsStore.uploadFileInspection(formData)
              if (res) uploadedFiles.push(res)
            }
          }

          return {
            itemId: detail.itemId,
            status: detail.status,
            checkValue: detail.checkValue ?? '',
            remarks: detail.remarks ?? '',
            files: uploadedFiles,
          }
        }),
      )

      await inspectionsStore.addInspection({
        date: new Date(date.value).toISOString(),
        formId: formStoreData.value.id,
        details: detailsWithFiles,
      })

      snackbarStore.showMessage('新增成功', 'success')
      dialog.value = false
    } catch (e) {
      snackbarStore.showMessage('新增失敗', 'error')
    }
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
