<template>
  <form-generator v-model="formData" :fields="fields" @save="handleSave" @cancel="handleCancel" />
  <v-snackbar v-model="showSnackbar" timeout="3000">
    <pre>{{ snackbarMsg }}</pre>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import FormGenerator from '@/components/FormGenerator.vue'
import type { FieldSchema } from '@/types'

const fields = computed((): FieldSchema[] => {
  const baseFields: FieldSchema[] = [
    {
      key: 'name',
      type: 'text',
      attrs: { label: 'Full Name', placeholder: 'Enter your name' },
    },
    {
      key: 'email',
      type: 'text',
      attrs: { label: 'Email', placeholder: 'Enter your email' },
    },
    {
      key: 'subscribe',
      type: 'checkbox',
      attrs: { label: 'Subscribe to our spam' },
    },
  ]

  if (formData.subscribe) {
    baseFields.push({
      key: 'feedback',
      type: 'textarea',
      attrs: { label: 'Why did you subscribe?', rows: 3 },
    })
  }

  return baseFields
})

const formData = reactive({
  name: '',
  email: '',
  subscribe: false,
  feedback: '',
})

const showSnackbar = ref(false)
const snackbarMsg = ref('')

const handleSave = () => {
  const filteredData = { ...formData, feedback: formData.subscribe ? formData.feedback : undefined }
  console.log('Form saved:', formData)
  snackbarMsg.value = `Form saved:\n${JSON.stringify(filteredData, null, 2)}`
  showSnackbar.value = true
}

const handleCancel = () => {
  console.log('Form cancelled')
  snackbarMsg.value = 'Form cancelled'
  showSnackbar.value = true
}
</script>
