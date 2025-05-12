import { useAppSnackbar } from '@/composables/useAppSnackbar'
import type { FormData } from '@/types'

export const useFormHandlers = (formData: FormData) => {
  const { showMessage } = useAppSnackbar()

  const handleSave = async () => {
    const msg = `Form saved:\n${JSON.stringify(formData, null, 2)}`

    showMessage(msg)
    console.log(msg)
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
