import '@mdi/font/css/materialdesignicons.css'
import '@fontsource/roboto'

import { mdi } from 'vuetify/iconsets/mdi'
import { createApp } from 'vue'
import { VTextField } from 'vuetify/components/VTextField'
import { VSelect } from 'vuetify/components/VSelect'
import { VCheckbox } from 'vuetify/components/VCheckbox'
import { VTextarea } from 'vuetify/components/VTextarea'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    VTextField,
    VSelect,
    VCheckbox,
    VTextarea,
  },
  icons: {
    defaultSet: 'mdi',
    sets: { mdi },
  },
})

createApp(App).use(vuetify).use(router).mount('#app')
