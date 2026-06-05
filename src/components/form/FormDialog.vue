<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="title">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3">
              <label class="text-body-1 text-medium-emphasis"
                >巡檢表單名稱</label
              >
              <v-text-field
                v-model="form.title"
                placeholder="請輸入巡檢表單名稱"
                type="text"
                :rules="[(v) => !!v || '編號為必填']"
                variant="outlined"
              ></v-text-field>
            </div>

            <div>
              <label class="text-body-1 text-medium-emphasis"
                >檢核細項總清單</label
              >
              <v-sheet border rounded max-height="200" style="overflow-y: auto">
                <v-checkbox
                  v-for="item in items"
                  :key="item.id"
                  v-model="form.itemIds"
                  :label="`[${item.category}]-${item.no}-${item.item}`"
                  :value="item.id"
                  density="compact"
                  hide-details
                />
              </v-sheet>
              <div v-if="form.itemIds.length === 0" class="text-error text-caption mt-1">
                請至少勾選一項
              </div>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">備註</label>
              <v-text-field
                v-model="form.remarks"
                placeholder="請輸入備註"
                type="text"
                variant="outlined"
              ></v-text-field>
            </div>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="取消" variant="flat" @click="dialog = false"></v-btn>

          <v-btn
            color="primary"
            text="存擋"
            variant="flat"
            :disabled="!isFormValid || form.itemIds.length === 0"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useFormsStore } from '@/stores/modules/forms'
  import { useItemsStore } from '@/stores/modules/items'
  import { useSnackbarStore } from '@/stores/snackbar'

  const formsStore = useFormsStore()
  const itemsStore = useItemsStore()
  const snackbarStore = useSnackbarStore()
  const { items } = storeToRefs(itemsStore)

  const dialog = ref(false)
  const title = ref('巡檢表單建置')
  const isEdit = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
  const isFormValid = ref(false)

  const form = reactive({
    title: '',
    remarks: '',
    itemIds: [],
  })

  const resetForm = () => {
    form.title = form.remarks = ''
    form.itemIds = []
    isEdit.value = false
    editId.value = null
    isFormValid.value = false
  }

  const open = async (item = null) => {
    await Promise.all([itemsStore.fetchItems()])

    resetForm()
    if (item) {
      console.log('item', item)
      title.value = '編輯巡檢表單'
      isEdit.value = true
      editId.value = item.id

      await formsStore.fetchFormById(item.id)
      const fullItem = formsStore.form
      form.title = fullItem.title
      form.remarks = fullItem.remarks
      form.itemIds = fullItem.details.map((d) => d.itemId)
      isFormValid.value = true
    } else {
      title.value = '巡檢表單建置'
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid || form.itemIds.length === 0) return

    try {
      if (isEdit.value) {
        await formsStore.editForm(editId.value, form)
        snackbarStore.showMessage('修改成功', 'success')
      } else {
        await formsStore.addForm(form)
        snackbarStore.showMessage('新增成功', 'success')
      }
      dialog.value = false
    } catch (error) {
      snackbarStore.showMessage(isEdit.value ? '修改失敗' : '新增失敗', 'error')
    }
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
