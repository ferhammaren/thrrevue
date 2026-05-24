<template>
  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
    <li v-for="(item, index) in items" :key="item.year">

      <!-- Top connector -->
      <hr v-if="index !== 0" />

      <!-- Timeline icon -->
      <div class="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clip-rule="evenodd" />
        </svg>
      </div>

      <!-- Left side -->
      <div v-if="index % 2 === 0" class="timeline-start mb-10 md:text-end">
        <time class="font-mono italic title">
          {{ item.year }}
        </time>

        <div class="text-lg font-black title text-primary">
          {{ item.title }}
        </div>
        <div class="content">
          {{ item.description }}
        </div>

      </div>

      <!-- Right side -->
      <div v-else class="timeline-end mb-10 md:mb-10">
        <time class="font-mono italic title">
          {{ item.year }}
        </time>

        <div class="text-lg font-black title text-primary">
          {{ item.title }}
        </div>
        <div class="content">
          {{ item.description }}
        </div>

      </div>

      <!-- Bottom connector -->
      <hr v-if="index !== items.length - 1" />

    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  items: {
    year: string
    title: string
    description: string
  }[]
}>()
</script>