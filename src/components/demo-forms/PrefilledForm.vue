<template>
  <form-generator v-model="formData" :fields="fields" @save="handleSave" @cancel="handleCancel" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useFormHandlers } from '@/composables/useFormHandlers'
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
  name: 'Innokentiy',
  email: '123@spam.com',
  department: 'sales',
  subscribe: true,
  bio: '-',
})

const { handleSave, handleCancel } = useFormHandlers(formData)
</script>
