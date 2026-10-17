<script setup lang="ts">
import bannerImage from "@/UI/art/banner1.png"
</script>

<template>
  <section
    class="band-hero relative isolate overflow-hidden
           min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]"
  >
    <!-- Background -->
    <div
      class="band-hero__image absolute inset-0 -z-20"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    ></div>

    <!-- Dark toner overlay -->
    <div class="absolute inset-0 -z-10 bg-black/55"></div>

    <!-- Content -->
    <div
      class="relative flex min-h-[260px] flex-col
             justify-between gap-8 p-5 sm:min-h-[320px]
             sm:p-8 lg:min-h-[420px] lg:p-10"
    >
      <!-- Top label -->
      <div
        class="flex flex-wrap items-center justify-between
               gap-3 border-b-2 border-base-100/70 pb-3
               font-mono text-[10px] font-bold uppercase
               tracking-[0.18em] text-base-100 sm:text-xs"
      >
        <span>Thunder Road Revue</span>

        <span class="bg-secondary px-2 py-1 text-secondary-content">
          TKNTT // 001
        </span>
      </div>

      <!-- Main identity -->
      <div class="relative max-w-4xl py-3">
        <span
          class="absolute -top-5 right-0 rotate-3
                 bg-primary px-3 py-2
                 font-mono text-xs font-black
                 uppercase tracking-widest text-primary-content
                 sm:right-8"
        >
          all songs is love song.
        </span>
<div class="masthead-main">
  <div class="masthead-stamp" aria-label="Music archive">
    <span>EST.</span>
    <strong>1972</strong>
    <span>JAPAN / VOCALIST / GUITARIST</span>
  </div>
</div>
        <h1
          class="band-hero__title text-7xl font-black
                 uppercase leading-[0.8] tracking-[-0.07em]
                 text-base-100 sm:text-8xl
                 lg:text-[10rem]"
        >
          高野 哲<span class="text-primary">!</span>
        </h1>

        <div class="mt-6 max-w-lg">
          <p
            class="inline box-decoration-clone bg-secondary
                   px-2 py-1 font-mono text-sm
                   font-bold uppercase leading-loose
                   text-secondary-content sm:text-base"
          >
            Music. Live shows. Updates.
          </p>
        </div>

        <p
          class="mt-5 max-w-md border-l-4 border-primary
                 pl-3 font-mono text-xs leading-relaxed
                 text-base-100 sm:text-sm"
        >
          Tetsu Takano is a Japanese Vocalist, Guitarist. nil, THE JUNEJULYAUGUST, Indies Denryoku, ZIGZO, THE BLACK COMET CLUB BAND and acting as a Vocal & Guitar.
        </p>
      </div>

      <!-- Bottom metadata -->
      <div
        class="flex flex-wrap items-end justify-between
               gap-4 border-t-4 border-primary pt-3
               font-mono text-[10px] font-bold
               uppercase tracking-wider text-base-100 sm:text-xs"
      >
        <span>nil / THEJUNEJULYAUGUST / DISCO VOLANTE / TETSU TAKANO TRIO</span>

        <span class="text-secondary">
          A Longest Day. ↗
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band-hero {
  background-color: #171717;
}

.band-hero__image {
  background-position: center center;
  background-size: 100% auto;
  background-repeat: no-repeat;
  filter: grayscale(1) contrast(1.35);
  transform: none;
}

.band-hero__title {
  font-family: "Fjalla One", sans-serif;
  width: fit-content;
  max-width: 100%;
  text-shadow: 4px 4px 0 #171717;
  -webkit-text-stroke: 1px currentColor;
}
.masthead-main {
  position: absolute;
  top: 5.5rem;
  right: 2rem;
  z-index: 2;
}

@media (max-width: 640px) {
  .masthead-main {
    top: 5rem;
    right: 1rem;
  }

  .masthead-stamp {
    width: 5.5rem;
    border-width: 2px;
    padding: 0.4rem;
  }

  .masthead-stamp span {
    font-size: 0.4rem;
  }

  .masthead-stamp strong {
    font-size: 1.1rem;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .band-hero__title {
    animation: poster-reveal 300ms steps(5, end) both;
  }

  @keyframes poster-reveal {
    from {
      opacity: 0;
      transform: translateX(-12px);
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
