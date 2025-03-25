<template>
  <v-form ref="formRef" class="form" @submit.prevent="$emit('save')">
    <v-expand-transition group>
      <template v-for="field in fields" :key="field.key">
        <slot
          :value="model[field.key]"
          :update="(val: string | boolean) => (model[field.key] = val)"
          :name="`field-${field.key}`"
          :field="field"
          :loading="loading"
        >
          <component
            :is="getComponent(field.type)"
            v-model="model[field.key]"
            v-bind="field.attrs"
            :disabled="loading"
          />
        </slot>
      </template>
    </v-expand-transition>

    <slot
      name="actions"
      :loading="loading"
      :save="() => $emit('save')"
      :cancel="() => $emit('cancel')"
    >
      <div class="form__actions">
        <v-btn type="button" :disabled="loading" @click="$emit('cancel')">Cancel</v-btn>
        <v-btn type="submit" :loading="loading" color="primary">Save</v-btn>
      </div>
    </slot>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FieldSchema } from '@/types'

interface Props {
  fields: FieldSchema[]
  loading?: boolean
}

defineEmits(['cancel', 'save'])

defineProps<Props>()

defineExpose({
  validate: () => formRef.value?.validate(),
})

const model = defineModel<Record<string, string | boolean>>({ required: true })
const formRef = ref()

const getComponent = (type: string) => {
  switch (type) {
    case 'text':
      return 'v-text-field'
    case 'select':
      return 'v-select'
    case 'checkbox':
      return 'v-checkbox'
    case 'textarea':
      return 'v-textarea'
    default:
      return 'div'
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
}
</style>
