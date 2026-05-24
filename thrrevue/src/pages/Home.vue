<template>
  <HomeLayout>
    <section class="p-2 md:p-4 space-y-4">
      <div class=" bg-neutral-content/50 grid md:grid-cols-4 text-lg text-center">
        <!-- Calendar -->
        <div class="p-4 min-w-0 order-last md:order-first">
          <div className="divider divider-primary place-items-center title font-black">Tour Dates</div>
          <calendar-date class="cally bg-base-100 border border-base-300 md:shadow-lg rounded-box md:w-full">
            <template #previous>
              <svg aria-label="Previous" class="fill-current size-4" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </template>
            <template #next>
              <svg aria-label="Next" class="fill-current size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </template>
            <calendar-month />
          </calendar-date>
        </div>
        <!-- News -->
        <div class="md:col-span-2 p-4 order-first md:order-2">
          <div className="divider divider-primary title font-black">News</div>
          <Newspost title="New Release" date="May 22, 2026" chip="nil">
            <template #default>
              <div class="post-content">Lorem ipsum</div>
              
            </template>
          </Newspost>
        </div>
        <!-- Latest Release -->
        <div class="p-4 order-2 md:order-last">
          <div className="divider divider-primary title font-black">Latest Release</div>
          <h3 class="text-center text-sm pb-4">nil - Wildflower</h3>
          <RouterLink :key="wildflower" :title="wildflower" :cover="wildflower" :to="`/nil/wildflower`">
            <img class="rounded-sm shadow-sm  transition delay-150 duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/50 ..." :src="wildflower"/>
          </RouterLink>
          <div class="join w-full justify-center">
            <a href="https://music.youtube.com/playlist?list=OLAK5uy_m-zrN9q5td6unGXVD0d781ZiUvZmstPAw" class="p-5 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-120 ...">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-neutral">
                <path :d="icons['youtube'].path" />
              </svg>
            </a>
            <a href="https://open.spotify.com/album/03cehJZg2MnNk3RrCPFwgm" class="p-5 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-120 ...">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-neutral">
                <path :d="icons['spotify'].path" />
              </svg>
            </a>
            <a href="https://music.apple.com/mx/album/wildflower-ep/1893895654" class="p-5 transition delay-150 duration-300 ease-in-out hover:-translate-y-2 hover:scale-120 ...">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-neutral">
                <path :d="icons['apple'].path" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </HomeLayout>
</template>
<script setup lang="ts">
import "cally";
import HomeLayout from "@/layouts/HomeLayout.vue"
import Newspost from "@/UI/Molecules/Newspost.vue";
import wildflower from "@/UI/images/nil/wildflower.jpg"
import {siYoutubemusic,siSpotify,siApplemusic} from 'simple-icons';

const icons = {
  youtube: siYoutubemusic,
  spotify: siSpotify,
  apple: siApplemusic
};


</script>