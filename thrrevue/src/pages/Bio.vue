<template>
  <MainLayout>
    <section class="md:p-2 md:space-y-2">
      <section class="shadow-md rounded-lg hero bg-base-200 min-h-[30vh]">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img :src="BioImage" alt="TakanoTetsu" class="shadow-xl rounded-lg shadow-2xl" />
          <div>
            <h1 class="text-5xl text-primary font-bold japanese pb-4">
              <ruby> 高<rp>(</rp>
                <rt class="text-sm">たか</rt>
                <rp>)</rp>野<rp>(</rp>
                <rt class="text-sm">の</rt>
                <rp>)</rp> 哲<rp>(</rp>
                <rt class="text-sm">てつ</rt>
                <rp>)</rp>
              </ruby>
            </h1>
            <div>
              <p class="text-sm title">Name</p>
              <p class="text-lg content">
                Takano Tetsu
              </p>
            </div>
            <div class="py-2">
              <p class="text-sm title">Birthdate</p>
              <p class="text-lg content">
                December 12, 1972
              </p>
            </div>
            <div class="py-2">
              <p class="text-sm title">Place of Origin</p>
              <p class="text-lg content">
                Obihiro, Hokkaido
              </p>
            </div>
            <div class="py-2">
              <p class="text-sm title">Instruments</p>
              <p class="text-lg content">
                Vocal, guitar
              </p>
            </div>
          </div>

        </div>
      </section>

      <!-- Timeline -->
       <section class="shadow-md rounded-lg hero bg-base-200 min-h-[30vh]">
        <div class="hero-content flex-col lg:flex-row-reverse">
             <Timeline :items="timelineData" />
        </div>
      </section>
      <!-- End timeline -->
    </section>

  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import BioImage from "@/UI/images/bio.jpg"
import Timeline from "@/UI/Organisms/Timeline.vue"
import timelineData from "@/data/Bio/timeline.json"
</script>