<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="title">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div class="mb-3">
              <label class="text-body-1 text-medium-emphasis">類別</label>
              <v-select
                v-model="form.class"
                :items="classItems"
                :rules="[(v) => !!v || '類別為必填']"
                variant="outlined"
              ></v-select>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis">類別序號</label>
              <v-text-field
                v-model="form.code"
                placeholder="請輸入類別序號"
                type="text"
                :rules="[(v) => !!v || '類別序號為必填']"
                variant="outlined"
              ></v-text-field>
            </div>
            <div>
              <label class="text-body-1 text-medium-emphasis"
                >食品良好衛生規範法規GHP檢查
              </label>
              <v-textarea
                v-model="form.description"
                variant="outlined"
                :rules="[(v) => !!v || '食品良好衛生規範法規GHP檢查內容為必填']"
                placeholder="請輸入食品良好衛生規範法規GHP檢查內容"
              ></v-textarea>
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
  import { useRegulationsStore } from '@/stores/modules/regulations'
  import { useSnackbarStore } from '@/stores/snackbar'

  const regulationsStore = useRegulationsStore()
  const snackbarStore = useSnackbarStore()

  const dialog = ref(false)
  const title = ref('新增GHP條文')
  const isEdit = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
    const isFormValid = ref(false)

  const classItems = ['食品業者一般性規定', '餐飲與即時熟食業者專業性規定']

  const form = reactive({
    class: '',
    code: '',
    description: '',
  })

  const resetForm = () => {
    form.class = '食品業者一般性規定'
    form.code = ''
    form.description = ''
    isEdit.value = false
    editId.value = null
    isFormValid.value = false
  }

  const open = (item = null) => {
    resetForm()
    if (item) {
      title.value = '編輯GHP條文'
      isEdit.value = true
      editId.value = item.id
      form.class = item.class
      form.code = item.code
      form.description = item.description
      isFormValid.value = true
    } else {
      title.value = '新增GHP條文'
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      if (isEdit.value) {
        await regulationsStore.editRegulation(editId.value, form)
        snackbarStore.showMessage('修改成功', 'success')
      } else {
        await regulationsStore.addRegulation(form)
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
