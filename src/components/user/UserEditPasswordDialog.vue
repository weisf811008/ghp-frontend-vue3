<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card title="修改密碼">
        <v-card-text>
          <v-form ref="formRef" v-model="isFormValid">
            <div>
              <label class="text-body-1 text-medium-emphasis">修改密碼</label>
              <v-text-field
                v-model="form.password"
                placeholder="請輸入密碼"
                :type="showPassword ? 'text' : 'password'"
                density="compact"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="handlePasswordIconClick"
                :rules="[(v) => !!v || `密碼為必填`]"
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

  // stores
  import { useUsersStore } from '@/stores/modules/users'
  import { useSnackbarStore } from '@/stores/snackbar'

  const usersStore = useUsersStore()
  const snackbarStore = useSnackbarStore()

  const dialog = ref(false)
  const editId = ref(null)
  const formRef = ref(null)
  const isFormValid = ref(false)
  const showPassword = ref(false)

  const form = reactive({
    password: '',
  })

  const handlePasswordIconClick = () => {
    showPassword.value = !showPassword.value
  }

  const open = (item = null) => {
    if (item) {
      editId.value = item.id
      form.password = ''
    }
    dialog.value = true
  }

  const handleSubmit = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    try {
      console.log(editId.value, form.password)
      await usersStore.editUserPassword(editId.value, {
        password: form.password,
      })
      snackbarStore.showMessage('修改成功', 'success')
      dialog.value = false
    } catch (error) {
      console.log('error', error)
      snackbarStore.showMessage('修改失敗', 'error')
    }
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
