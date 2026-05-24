<template>
  <MainLayout>
    <div class="text-2xl md:text-3xl text-center md:text-left md:flex font-bold title text-primary">
      Discography
      <div class="join p-1 gap-x-4 md:grow md:justify-end">
        <button v-for="(bandAlbums, band) in albumsByBand" :key="band" class="btn btn-primary btn-soft rounded-md md:btn-lg subtitle" @click="scrollToSection(band)">
          {{ band }}
        </button>
      </div>
    </div>
    <section class="p-2 space-y-2">
      <section v-for="(bandAlbums, band) in albumsByBand" :key="band" :id="band">
        <div class="divider divider-primary title text-xl md:text-2xl">{{ band }}</div>
        <div class="grid grid-cols-3 gap-2">
          <RouterLink v-for="album in bandAlbums" :key="album.slug" :title="album.title" :cover="album.cover" :to="`/${album.band}/${album.slug}`">
            <img :src="album.cover" :alt="album.title" class="rounded-md shadow-lg w-lg md:hidden" />
            <SimpleCard
              class="none md:block md:p-4 w-3/4 transition delay-150 duration-300 ease-in-out hover:shadow-md hover:shadow-primary/50 hover:-translate-y-1 hover:scale-110 ...">
              <template #image>
                <img :src="album.cover" :alt="album.title" class="rounded-md" />
              </template>
              <template #title>
                <div class="text-center text-xl">{{ album.title }}</div>                
              </template>
            </SimpleCard>
          </RouterLink>
        </div>
      </section>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import SimpleCard from "@/UI/Molecules/Cards/SimpleCard.vue"
import { useRoute } from "vue-router"
import { computed } from "vue"

type Album = {
  band: string
  slug: string
  title: string
  cover?: string
  tracklist?: any
  raw: any
}

const route = useRoute()

const modules = import.meta.glob(
  "@/data/*/discography/*.ts",
  { eager: true }
) as Record<string, { default: any }>

const albums: Album[] = Object.entries(modules).map(([path, mod]) => {
  const slug = path.split("/").pop()!.replace(".ts", "")

  const relative = path.split("/data/")[1]
  if (!relative) throw new Error(`Invalid path: ${path}`)

  const parts = relative.split("/")
  const band = parts[0]
  if (!band) throw new Error(`Invalid band in path: ${path}`)

  const data = mod.default

  return {
    band,
    slug,
    title: data.release.title,
    cover: data.release.info.coverImage,
    tracklist: data.release.tracklist,
    raw: data,
  }
})
const albumsByBand = computed(() => {
  return albums.reduce((acc, album) => {
    if (!acc[album.band]) {
      acc[album.band] = []
    }
    acc[album.band]?.push(album)
    return acc
  }, {} as Record<string, typeof albums>)
})
const scrollToSection = (id: string) => {
  console.log(id);
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
</script>