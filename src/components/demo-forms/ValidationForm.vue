<template>
  <form-generator
    ref="formRef"
    v-model="formData"
    :fields="fields"
    @save="handleSave"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useFormHandlers } from '@/composables/useFormHandlers'
import { useAppSnackbar } from '@/composables/useAppSnackbar'
import FormGenerator from '@/components/FormGenerator.vue'
import type { FieldSchema } from '@/types'

const fields: FieldSchema[] = [
  {
    key: 'name',
    type: 'text',
    attrs: {
      label: 'Full Name',
      placeholder: 'Enter your name',
      rules: [(value: string) => !!value || 'Full Name is required'],
    },
  },
  {
    key: 'email',
    type: 'text',
    attrs: {
      label: 'Email',
      placeholder: 'Enter your email',
      rules: [
        (value: string) => !!value || 'Email is required',
        (value: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address',
      ],
    },
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
      rules: [(value: string) => !!value || 'Please select a department'],
    },
  },
  {
    key: 'subscribe',
    type: 'checkbox',
    attrs: {
      label: 'Subscribe to our spam',
      rules: [(value: boolean) => value === true || 'You must agree to subscribe!'],
    },
  },
  {
    key: 'bio',
    type: 'textarea',
    attrs: {
      label: 'Bio',
      rows: 4,
      rules: [
        (value: string) => !!value || 'Bio is required',
        (value: string) => value.length >= 10 || 'Bio must be at least 10 characters long',
      ],
    },
  },
]

const formData = reactive({
  name: '',
  email: '',
  department: '',
  subscribe: false,
  bio: '',
})

const formRef = ref<InstanceType<typeof FormGenerator> | null>(null)

const { handleSave: handleFormSave, handleCancel } = useFormHandlers(formData)
const { showMessage } = useAppSnackbar()

const handleSave = async () => {
  const { valid } = await formRef.value?.validate()

  if (valid) {
    handleFormSave()
  } else {
    showMessage('Form validation failed')
  }
}
</script>
