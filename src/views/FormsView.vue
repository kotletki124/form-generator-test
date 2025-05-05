<template>
  <v-container height="100%">
    <v-slide-group :model-value="$route.params.id" class="mb-4">
      <v-slide-group-item v-for="form in forms" :key="form.id" :value="form.id">
        <v-card
          class="card"
          :class="{ 'card--selected': form.id === $route.params.id }"
          @click="$router.push({ name: 'form-detail', params: { id: form.id } })"
        >
          <v-card-title>{{ form.title }}</v-card-title>

          <v-scroll-y-transition>
            <v-card-text v-if="!$route.params.id">
              {{ form.description }}
            </v-card-text>
            <v-card-subtitle v-else>
              {{ form.description }}
            </v-card-subtitle>
          </v-scroll-y-transition>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <v-fade-transition>
      <router-view v-if="showFormDetail" v-slot="{ Component }">
        <component :is="Component" :form="form" />
      </router-view>
    </v-fade-transition>

    <v-snackbar v-model="isVisible" :timeout="-1">
      <pre>{{ message }}</pre>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { computedAsync } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useAppSnackbar } from '@/composables/useAppSnackbar'
import { forms } from '@/data'

const route = useRoute()

const { isVisible, message } = useAppSnackbar()

const form = computed(() => {
  return forms.find((form) => form.id === route.params.id)
})

const showFormDetail = computedAsync(async () => {
  if (route.params.id) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return true
  }
  return false
}, false)
</script>

<style lang="scss" scoped>
.card {
  max-width: 250px;

  &--selected {
    filter: brightness(0.8);

    @media (prefers-color-scheme: dark) {
      filter: brightness(1.5);
    }
  }
}

:deep(.v-slide-group) {
  @media (min-height: 700px) {
    position: sticky;
    top: 64px;
    z-index: 1;
  }
}
</style>
