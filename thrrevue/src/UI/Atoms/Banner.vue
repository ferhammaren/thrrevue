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
      <div class="max-w-2xl">
        <!-- Title -->
        <h1 class="title mb-4 text-5xl md:text-7xl font-black tracking-tight">
          TKNTT
        </h1>

      </div>
    </div>
  </section>
</template>
<style scoped>
.title, .subtitle {
  font-family: 'Fjalla One', sans-serif;
}
</style>