<template>
  <v-row align="start" justify="center" class="flex-nowrap ga-3">
    <template v-if="form">
      <div v-if="lgAndUp" class="page__form">
        <v-fade-transition mode="out-in">
          <component :is="form.component" />
        </v-fade-transition>
      </div>

      <div class="page__tabs">
        <v-tabs v-model="tab">
          <v-tab :value="1">Info</v-tab>
          <v-tab v-if="!lgAndUp" :value="2">Form</v-tab>
          <v-tab :value="3">Source</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <v-fade-transition mode="out-in">
              <div :key="$route.params.id as string" class="d-flex flex-column ga-4 mt-2">
                <h2>{{ form.title }}</h2>
                <p>{{ form.description }}</p>
              </div>
            </v-fade-transition>
          </v-tabs-window-item>

          <v-tabs-window-item :value="2">
            <v-fade-transition mode="out-in">
              <component :is="form.component" />
            </v-fade-transition>
          </v-tabs-window-item>

          <v-tabs-window-item :value="3">
            <v-fade-transition mode="out-in">
              <code-view
                :key="$route.params.id as string"
                :code="sourceCode"
                :loading="codeLoading"
              />
            </v-fade-transition>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </template>

    <template v-else>
      <v-empty-state
        class="ma-auto"
        icon="mdi-alert-circle-outline"
        headline="Form not found"
        :text="`No form with id = ${$route.params.id} found.`"
      />
    </template>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import { computedAsync } from '@vueuse/core'
import { useDisplay } from 'vuetify'
import { useCodeHighlighter } from '@/composables/useCodeHighlighter'
import CodeView from '@/components/CodeView.vue'
import type { DemoForm } from '@/types'

interface Props {
  form?: DemoForm
}

const props = defineProps<Props>()

const tab = ref(3)
const codeLoading = ref(true)

const { lgAndUp } = useDisplay()
const { initialize, dispose } = useCodeHighlighter()

const sourceCode = computedAsync(
  async () => {
    if (!props.form?.importSource) return

    const res = await props.form.importSource()
    return res.default
  },
  undefined,
  { evaluating: codeLoading },
)

onBeforeMount(initialize)

onBeforeUnmount(dispose)

watch(lgAndUp, (newValue) => {
  tab.value = newValue ? 3 : 2
})
</script>

<style lang="scss" scoped>
.page {
  &__form {
    min-width: 300px;
    min-height: 200px;
    position: sticky;
    top: 134px;
  }

  &__tabs {
    width: 100%;

    :deep(.v-slide-group) {
      position: sticky;
      top: 68px;
      background-color: rgba(var(--v-theme-surface), 1);
      z-index: 1;

      @media (min-height: 700px) {
        top: 134px;
      }
    }
  }
}
</style>
