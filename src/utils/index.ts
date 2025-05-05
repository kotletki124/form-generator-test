import {
  defineAsyncComponent,
  h,
  type AsyncComponentLoader,
  type AsyncComponentOptions,
  type Component,
} from 'vue'
import { VProgressCircular } from 'vuetify/components'

export const defineAsyncComponentWithLoader = (
  arg: AsyncComponentLoader | AsyncComponentOptions,
): Component => {
  const options = {
    loadingComponent: {
      setup: () => () =>
        h(VProgressCircular, {
          indeterminate: true,
          class: 'ma-auto d-block mt-12',
        }),
    },
  }

  if (typeof arg === 'function') {
    return defineAsyncComponent({
      loader: arg,
      ...options,
    })
  }

  return defineAsyncComponent({
    ...options,
    ...arg,
  })
}
