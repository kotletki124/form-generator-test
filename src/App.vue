<template>
  <v-app class="app">
    <default-layout>
      <router-view />
    </default-layout>
  </v-app>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import { useTheme } from 'vuetify'

import DefaultLayout from './layouts/default.vue'

const isPreferredDark = usePreferredDark()
const theme = useTheme()

watch(
  isPreferredDark,
  (isDark) => {
    theme.global.name.value = isDark ? 'dark' : 'light'
  },
  { immediate: true },
)
</script>

<style scoped>
.app {
  min-width: 320px;
}
</style>
