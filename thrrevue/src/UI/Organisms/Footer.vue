<template>
  <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p>
        Copyright © {{ year }} - {{ owner }}
      </p>
    </aside>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  owner?: string
  year?: number
}>()

// fallback defaults if props are not provided
const year = new Date().getFullYear()
const owner = "ferhammaren"
</script>