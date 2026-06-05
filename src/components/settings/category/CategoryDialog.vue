<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="title">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3">
              <v-text-field
                v-model="form.category"
                placeholder="請輸入大項"
                type="text"
                :rules="[(v) => !!v || '大項為必填']"
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
            :disabled="!isFormValid"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useCategoriesStore } from '@/stores/modules/categories'
  import { useSnackbarStore } from '@/stores/snackbar'

  const categoriesStore = useCategoriesStore()
  const snackbarStore = useSnackbarStore()

  const dialog = ref(false)
  const title = ref('新增大項')
  const isEdit = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
  const isFormValid = ref(false)

  const form = reactive({
    category: '',
  })

  const resetForm = () => {
    form.category = ''
    isEdit.value = false
    editId.value = null
    isFormValid.value = false
  }

  const open = (item = null) => {
    resetForm()
    if (item) {
      title.value = '編輯大項'
      isEdit.value = true
      editId.value = item.id
      form.category = item.category
      isFormValid.value = true
    } else {
      title.value = '新增大項'
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      if (isEdit.value) {
        await categoriesStore.editCategory(editId.value, form)
        snackbarStore.showMessage('修改成功', 'success')
      } else {
        await categoriesStore.addCategory(form)
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
