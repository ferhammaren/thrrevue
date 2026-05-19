<template>
  <span :class="['badge', props.variant]">
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: string
}>()
</script>