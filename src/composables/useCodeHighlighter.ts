import { computed } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { useTheme } from 'vuetify'
import type { CodeToHastOptions, HighlighterCore } from 'shiki'

const {
  state: highlighter,
  isLoading: initializing,
  execute,
} = useAsyncState<HighlighterCore | null>(async () => {
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
}, null)

export function useCodeHighlighter() {
  const theme = useTheme()

  const shikiTheme = computed(() =>
    theme.global.name.value === 'dark' ? 'vitesse-dark' : 'vitesse-light',
  )

  const initialize = () => {
    if (!highlighter.value) execute(0)
  }

  const dispose = () => {
    highlighter.value?.dispose()
    highlighter.value = null
  }

  const codeToHtml = (code: string, options?: CodeToHastOptions<string, string>) =>
    highlighter.value?.codeToHtml(code, {
      lang: 'vue',
      theme: shikiTheme.value,
      ...options,
    }) || null

  return {
    initialize,
    dispose,
    codeToHtml,
    initializing,
  }
}
