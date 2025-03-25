<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
    @click="$router.push({ name: 'forms' })"
    style="cursor: pointer"
  >
    <template v-slot:image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <v-app-bar-title>Form generator app</v-app-bar-title>
  </v-app-bar>

  <v-main>
    <v-container height="calc(100% - 88px)">
      <slot />
    </v-container>
  </v-main>
</template>
