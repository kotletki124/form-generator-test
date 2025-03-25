<template>
  <v-container max-width="450px" height="100%">
    <component :is="form?.component" />
  </v-container>
</template>

<script lang="ts" setup>
import { forms } from '@/data'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = computed(() => {
  return forms.find((form) => form.id === route.params.id)
})
</script>
