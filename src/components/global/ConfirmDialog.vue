<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text="取消" variant="flat" @click="cancel"></v-btn>
        <v-btn
          :color="confirmColor"
          :text="confirmText"
          variant="flat"
          @click="confirm"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)
  const message = ref('')
  const confirmText = ref('確認')
  const confirmColor = ref('error')

  let resolveFn = null

  const open = ({
    message: m = '確定要刪除嗎？',
    confirmText: ct = '確認',
    confirmColor: cc = 'error',
  } = {}) => {
    message.value = m
    confirmText.value = ct
    confirmColor.value = cc
    dialog.value = true

    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }

  const confirm = () => {
    dialog.value = false
    resolveFn(true)
  }

  const cancel = () => {
    dialog.value = false
    resolveFn(false)
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped></style>
