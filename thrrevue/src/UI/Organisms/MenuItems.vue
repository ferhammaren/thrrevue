<template>
  <li v-for="item in items" :key="item.label" class="title text-primary">

    <!-- If it has children -> dropdown -->
    <details v-if="item.children?.length">

      <summary class="flex items-center gap-2">
        <!-- Parent link inside dropdown -->
        <RouterLink
          v-if="item.to"
          :to="item.to"
          class="font-medium text-lg"
          @click.stop
        >
          {{ item.label }}
        </RouterLink>

        <span v-else>
          {{ item.label }}
        </span>
      </summary>

      <ul class="p-2">
        <MenuItems :items="item.children" />
      </ul>

    </details>

    <!-- Normal item (no children) -->
 <RouterLink v-else-if="item.to" :to="item.to" class="text-lg hover:bg-base-content/40">
  {{ item.label }}
</RouterLink>

  </li>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"

defineProps<{
  items: {
    label: string
    to?: string
    children?: any[]
  }[]
}>()
</script>