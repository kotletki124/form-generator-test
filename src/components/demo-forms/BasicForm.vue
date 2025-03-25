<template>
  <form-generator v-model="formData" :fields="fields" @save="handleSave" @cancel="handleCancel" />
  <v-snackbar v-model="showSnackbar" timeout="3000">
    <pre>{{ snackbarMsg }}</pre>
  </v-snackbar>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormGenerator from '@/components/FormGenerator.vue'
import type { FieldSchema } from '@/types'

const fields: FieldSchema[] = [
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
    key: 'department',
    type: 'select',
    attrs: {
      label: 'Department',
      itemTitle: 'label',
      itemValue: 'value',
      items: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'support', label: 'Customer Support' },
      ],
    },
  },
  {
    key: 'subscribe',
    type: 'checkbox',
    attrs: { label: 'Subscribe to our spam' },
  },
  {
    key: 'bio',
    type: 'textarea',
    attrs: { label: 'Bio', rows: 4 },
  },
]

const formData = reactive({
  name: '',
  email: '',
  department: '',
  subscribe: false,
  bio: '',
})

const showSnackbar = ref(false)
const snackbarMsg = ref('')

const handleSave = () => {
  console.log('Form saved:', formData)
  snackbarMsg.value = `Form saved:\n${JSON.stringify(formData, null, 2)}`
  showSnackbar.value = true
}

const handleCancel = () => {
  console.log('Form cancelled')
  snackbarMsg.value = 'Form cancelled'
  showSnackbar.value = true
}
</script>
