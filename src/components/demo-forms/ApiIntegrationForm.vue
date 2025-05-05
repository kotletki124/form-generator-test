<template>
  <form-generator
    v-model="formData"
    :fields="fields"
    :loading="pending"
    @save="handleSave"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
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
  name: '',
  email: '',
  department: '',
  subscribe: false,
  bio: '',
})

const pending = ref(false)

const { handleSave: handleFormSave, handleCancel } = useFormHandlers(formData)

const handleSave = async () => {
  pending.value = true
  await new Promise((r) => setTimeout(r, 2000)).finally(() => {
    pending.value = false
  })
  handleFormSave()
}
</script>
