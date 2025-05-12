<template>
  <div class="code">
    <code v-html="codeHtmlString" />
    <div v-if="loading" class="code__loading-overlay">
      <v-progress-circular indeterminate class="code__spinner" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useCodeHighlighter } from '@/composables/useCodeHighlighter'

interface Props {
  code?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
})

const { codeToHtml, initializing } = useCodeHighlighter()

const codeHtmlString = computed(() => codeToHtml(props.code) || '')

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
