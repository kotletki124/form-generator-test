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
            <v-card-text v-if="!$route.params.id">{{ form.description }}</v-card-text>
            <v-card-subtitle v-else>{{ form.description }}</v-card-subtitle>
          </v-scroll-y-transition>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <router-view v-if="$route.params.id" v-slot="{ Component }">
      <v-fade-transition>
        <component :is="Component" :key="$route.params.id as string" />
      </v-fade-transition>
    </router-view>
  </v-container>
</template>

<script lang="ts" setup>
import { forms } from '@/data'
</script>

<style lang="scss" scoped>
.card {
  max-width: 250px;

  &--selected {
    filter: brightness(0.9);
  }
}
</style>
