<template>
  <div class="bg-base-100 w-full rounded-md shadow-sm">
    <!-- HEADER -->
    <div class="bg-accent-content p-4 space-y-1">
      <h2 v-if="title" class="title text-xl font-bold">
        {{ title }}
      </h2>
      <div class="flex items-center gap-2 text-sm opacity-80">
        <span v-if="date" class="date">{{ date }}</span>
        <span v-if="chip" class="badge badge-primary badge-sm">
          {{ chip }}
        </span>
      </div>
    </div>

    <!-- BODY -->
    <div class="post-body p-4">

      <!-- main flexible content -->
      <slot />
      <!-- optional footer / metadata -->
      <div class="post-content mt-4 text-sm flex justify-end">
        <slot name="post-content" />
      </div>
    </div>

  </div>
</template>
<style scoped>
.title, .subtitle {
  font-family: 'Fjalla One', sans-serif;
}

</style>
<script setup lang="ts">
defineProps<{
  title?: string
  date?: string
  chip?: string
}>()
</script>