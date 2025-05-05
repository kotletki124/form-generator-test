<template>
  <form-generator v-model="formData" :fields="fields" @save="handleSave" @cancel="handleCancel">
    <template #field-name="{ value, update }">
      <input
        :value="value"
        @change="(e) => update((e.target as HTMLInputElement).value ?? '')"
        placeholder="Custom name input"
        style="border: 1px solid green; padding: 16px"
      />
    </template>
    <template #field-email="{ value, update }">
      <input
        :value="value"
        @change="(e) => update((e.target as HTMLInputElement).value ?? '')"
        placeholder="Custom email input"
        style="border: 1px solid blue; padding: 16px"
      />
    </template>
    <template #actions="{ cancel }">
      <div style="margin: auto">
        <p>Custom actions slot</p>
        <v-btn @click="handleReset">Reset</v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn type="submit">Save</v-btn>
      </div>
    </template>
  </form-generator>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useFormHandlers } from '@/composables/useFormHandlers'
import { useAppSnackbar } from '@/composables/useAppSnackbar'
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

const initialFormData = {
  name: '',
  email: '',
  department: '',
  subscribe: false,
  bio: '',
}

const formData = reactive({ ...initialFormData })

const { handleSave, handleCancel } = useFormHandlers(formData)
const { showMessage } = useAppSnackbar()

const handleReset = () => {
  Object.assign(formData, initialFormData)
  showMessage('Form reset')
}
</script>
