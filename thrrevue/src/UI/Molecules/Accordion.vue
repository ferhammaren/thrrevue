<template>
  <div
    tabindex="0"
    class="collapse collapse-arrow bg-base-100 border border-base-300"
  >

    <!-- TITLE -->
    <div
      class="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12"
    >
      <slot name="title" />
    </div>

    <!-- CONTENT -->
    <div class="collapse-content text-sm">
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
</script>