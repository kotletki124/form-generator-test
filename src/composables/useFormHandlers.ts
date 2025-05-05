import { useAppSnackbar } from '@/composables/useAppSnackbar'
import type { FormData } from '@/types'

export const useFormHandlers = (formData: FormData) => {
  const { showMessage } = useAppSnackbar()

  const handleSave = async () => {
    showMessage(`Form saved:\n${JSON.stringify(formData, null, 2)}`)
    console.log('Form saved:', formData)
  }

  const handleCancel = () => {
    showMessage('Form cancelled')
    console.log('Form cancelled')
  }

  return {
    handleSave,
    handleCancel,
  }
}
