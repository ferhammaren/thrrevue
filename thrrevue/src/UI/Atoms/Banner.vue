<script setup lang="ts">
import bannerImage from "@/UI/art/banner1.png"
</script>

<template>
  <header
    class="zine-masthead relative isolate overflow-hidden
           min-h-[180px] lg:min-h-[320px]"
  >
    <!-- Background photograph -->
    <div
      class="masthead-image absolute inset-0 -z-20"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    ></div>

    <!-- Toner / photocopy overlay -->
    <div class="absolute inset-0 -z-10 bg-black/45"></div>

    <!-- Masthead content -->
    <div class="relative flex min-h-[180px] flex-col
                justify-between p-4 sm:p-6 lg:min-h-[320px] lg:p-8">

      <!-- Top metadata strip -->
      <div
        class="flex flex-wrap items-start justify-between
               gap-3 border-b-2 border-white/80 pb-3
               font-mono text-[10px] font-bold uppercase
               tracking-[0.18em] text-white sm:text-xs"
      >
        <span>Thunder Road Revue</span>
        <span>TKNTT / ARCHIVE NO. 001</span>
      </div>

      <!-- Main title -->
      <div class="relative py-8 sm:py-10">
        <span
          class="absolute -top-1 right-2 rotate-3
                 bg-primary px-3 py-1 font-mono text-xs
                 font-black uppercase tracking-widest
                 text-primary-content sm:right-8"
        >
          all songs is love song.
        </span>

        <h1
          class="masthead-title text-7xl font-black
                 uppercase leading-[0.8] tracking-[-0.08em]
                 text-base-100 sm:text-8xl
                 lg:text-[11rem]"
        >
          TKNTT<span class="text-primary">.</span>
        </h1>

        <div
          class="mt-5 inline-block -rotate-1
                 bg-secondary px-3 py-1
                 font-mono text-xs font-black
                 uppercase tracking-widest text-secondary-content
                 sm:text-sm"
        >
          Music // Live Shows // Updates
        </div>
      </div>

      <!-- Bottom strip -->
      <div
        class="flex flex-wrap items-end justify-between
               gap-3 border-t-4 border-primary pt-3
               font-mono text-[10px] font-bold
               uppercase tracking-wider text-white sm:text-xs"
      >
        <span>Est. 1972.</span>
        <span class="text-secondary">A Longest Day. ↗</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.zine-masthead {
  background-color: #171717;
}

.masthead-image {
  background-position: center 35%;
  background-size: cover;
  filter: grayscale(1) contrast(1.3);
  transform: scale(1.02);
}

.masthead-title {
  font-family: "Fjalla One", sans-serif;
  width: fit-content;
  max-width: 100%;
  text-shadow: 3px 3px 0 #171717;
  -webkit-text-stroke: 1px currentColor;
}

@media (prefers-reduced-motion: no-preference) {
  .masthead-title {
    animation: masthead-in 350ms steps(5, end) both;
  }

  @keyframes masthead-in {
    from {
      opacity: 0;
      transform: translateX(-14px);
      clip-path: inset(0 100% 0 0);
    }

    to {
      opacity: 1;
      transform: translateX(0);
      clip-path: inset(0);
    }
  }
}
</style>
