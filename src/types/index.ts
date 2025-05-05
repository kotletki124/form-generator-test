import type { Component } from 'vue'
import type { VTextField, VSelect, VCheckbox, VTextarea } from 'vuetify/components'

type FieldType = 'text' | 'select' | 'checkbox' | 'textarea'

type FieldAttrsMap = {
  text: Partial<VTextField>
  select: Partial<VSelect>
  checkbox: Partial<VCheckbox>
  textarea: Partial<VTextarea>
}

export type FormData = Record<string, string | boolean>

export interface FieldSchema<T extends FieldType = FieldType> {
  key: string
  type: T
  attrs?: FieldAttrsMap[T]
}

export interface DemoForm {
  id: string
  title: string
  description: string
  component: Component
  importSource: () => Promise<{ default: string }>
}
