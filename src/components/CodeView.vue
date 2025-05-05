<template>
  <div class="code">
    <code v-html="codeHtmlString" />
    <div v-if="loading" class="code__loading-overlay">
      <v-progress-circular indeterminate class="code__spinner" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { computedAsync } from '@vueuse/core'
import { useTheme } from 'vuetify'

interface Props {
  code?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
})

const theme = useTheme()
const initializing = ref(true)

const shikiTheme = computed(() =>
  theme.global.name.value === 'dark' ? 'vitesse-dark' : 'vitesse-light',
)

const highlighter = computedAsync(
  async () => {
    const [
      { createHighlighterCore },
      { default: vueLang },
      { default: vitesseLight },
      { default: vitesseDark },
      { createJavaScriptRegexEngine },
    ] = await Promise.all([
      import('shiki/core'),
      import('@shikijs/langs/vue'),
      import('@shikijs/themes/vitesse-light'),
      import('@shikijs/themes/vitesse-dark'),
      import('shiki/engine/javascript'),
    ])

    const engine = createJavaScriptRegexEngine()

    return createHighlighterCore({
      langs: [vueLang],
      themes: [vitesseLight, vitesseDark],
      engine,
    })
  },
  null,
  initializing,
)

const codeHtmlString = computed(() =>
  highlighter.value?.codeToHtml(props.code, {
    lang: 'vue',
    theme: shikiTheme.value,
  }),
)

const loading = computed(() => initializing.value || props.loading)
</script>

<style lang="scss" scoped>
.code {
  position: relative;
  min-height: 200px;
  border-radius: 4px;
  overflow-x: auto;

  &__loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(1px);
  }

  &__spinner {
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

:deep(.shiki) {
  font-size: 0.8rem;
  padding: 12px;
}
</style>
