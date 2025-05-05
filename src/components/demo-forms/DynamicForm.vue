<template>
  <form-generator v-model="formData" :fields="fields" @save="handleSave" @cancel="handleCancel" />
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useFormHandlers } from '@/composables/useFormHandlers'
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

const filteredData = reactive<Partial<typeof formData>>({ ...formData })

const { handleSave: handleFormSave, handleCancel } = useFormHandlers(filteredData)

const handleSave = () => {
  Object.assign(filteredData, formData)

  const currentKeys = new Set(fields.value.map((field) => field.key))
  for (const key in filteredData) {
    if (!currentKeys.has(key)) {
      delete filteredData[key as keyof typeof filteredData]
    }
  }

  handleFormSave()
}
</script>
