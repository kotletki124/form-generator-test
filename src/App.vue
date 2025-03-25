<script setup lang="ts">
import { RouterView } from 'vue-router'

import DefaultLayout from './layouts/default.vue'
</script>

<template>
  <v-app>
    <default-layout>
      <router-view />
    </default-layout>
  </v-app>
</template>
