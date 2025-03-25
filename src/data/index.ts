import { defineAsyncComponent } from 'vue'
import type { DemoForm } from '@/types'

export const forms: DemoForm[] = [
  {
    id: 'basic-form',
    title: 'Basic Form',
    description:
      'A simple form demonstrating all supported field types with default Vuetify components.',
    component: defineAsyncComponent(() => import('@/components/demo-forms/BasicForm.vue')),
  },
  {
    id: 'custom-slots-form',
    title: 'Custom Slots Form',
    description: 'This form demonstrates how to customize field appearance using slots.',
    component: defineAsyncComponent(() => import('@/components/demo-forms/CustomSlotsForm.vue')),
  },
  {
    id: 'prefilled-form',
    title: 'Prefilled Form',
    description: 'A basic form with initial values set, demonstrating prefilled input fields.',
    component: defineAsyncComponent(() => import('@/components/demo-forms/PrefilledForm.vue')),
  },
  {
    id: 'validation-form',
    title: 'Validation Form',
    description:
      'This form includes various validation rules, such as required fields, email format, and password confirmation.',
    component: defineAsyncComponent(() => import('@/components/demo-forms/ValidationForm.vue')),
  },
  {
    id: 'dynamic-form',
    title: 'Dynamic Form',
    description: 'Demonstrates how to conditionally show or hide fields based on user selections.',
    component: defineAsyncComponent(() => import('@/components/demo-forms/DynamicForm.vue')),
  },
  {
    id: 'api-integration-form',
    title: 'API Integration Form',
    description: 'This form simulates an API request on save, displaying loading states.',
    component: defineAsyncComponent(() => import('@/components/demo-forms/ApiIntegrationForm.vue')),
  },
]
