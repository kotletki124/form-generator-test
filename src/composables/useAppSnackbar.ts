import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const isVisible = ref(false)
const message = ref('')

const hideSnackbar = useDebounceFn(() => {
  isVisible.value = false
  message.value = ''
}, 3000)

const showMessage = (msg: string) => {
  message.value = msg
  isVisible.value = true
  hideSnackbar()
}

export const useAppSnackbar = () => {
  return {
    isVisible,
    message,
    showMessage,
  }
}
