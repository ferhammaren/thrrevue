<script setup lang="ts">
import type { Component } from "vue"

type Column = {
  key: string
  primary?: boolean
  type?: "text" | "image"
}

type Action = {
  icon: Component
  onClick: (item: any) => void
}

const props = defineProps<{
  title: string
  items: Record<string, any>[]
  columns: Column[]
  actions?: Action[]
}>()
</script>