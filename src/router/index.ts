import { defineAsyncComponentWithLoader } from '@/utils'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/forms',
    },
    {
      path: '/forms',
      name: 'forms',
      component: defineAsyncComponentWithLoader(() => import('../views/FormsView.vue')),
      children: [
        {
          path: ':id',
          name: 'form-detail',
          component: defineAsyncComponentWithLoader(() => import('../views/FormDetailView.vue')),
        },
      ],
    },
  ],
})

export default router
