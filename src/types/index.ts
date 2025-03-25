import type { DefineComponent } from 'vue'
import type { VTextField, VSelect, VCheckbox, VTextarea } from 'vuetify/components'

export type FieldType = 'text' | 'select' | 'checkbox' | 'textarea'

type FieldAttrsMap = {
  text: Partial<VTextField>
  select: Partial<VSelect>
  checkbox: Partial<VCheckbox>
  textarea: Partial<VTextarea>
}

export interface FieldSchema<T extends FieldType = FieldType> {
  key: string
  type: T
  attrs?: FieldAttrsMap[T]
}

export interface DemoForm {
  id: string
  title: string
  description: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  component: DefineComponent<{}, {}, any>
}
