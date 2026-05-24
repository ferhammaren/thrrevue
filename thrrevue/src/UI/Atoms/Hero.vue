<script setup lang="ts">
import bannerImage from "@/UI/art/banner1.png"
</script>
<template>
  <section
    class="hero min-h-[10vh] lg:min-h-[30vh] bg-cover bg-top"
    :style="{
      backgroundImage: `url(${bannerImage})`
    }"
  >
    <div class="hero-overlay bg-base-200/30"></div>

    <div class="hero-content text-left text-primary">
      <div class="max-w-xl">

        <!-- Title -->
        <h1 class="title mb-5 text-5xl md:text-5xl font-black tracking-tight">
          TKNTT
        </h1>

        <!-- Subtitle -->
        <p class="subtitle mb-5 text-lg md:text-xl opacity-90">
          Music, live shows, merch, and updates.
        </p>

        <!-- CTA buttons 
        <div class="flex flex-col sm:flex-row gap-4 justify-left">
          <button class="btn btn-secondary btn-lg">
            Latest Release
          </button>

          <button class="btn btn-outline btn-lg text-base-content border-base-content hover:bg-base-200 hover:text-secondary">
            Tour Dates
          </button>
        </div>-->

      </div>
    </div>
  </section>
</template>
<style scoped>
.title, .subtitle {
  font-family: 'Fjalla One', sans-serif;
}
</style>
