
<template>
  <MainLayout>
    <main class="discography-page">
      <!-- Page masthead -->
      <header class="discography-header">
        <div class="discography-kicker">
          <span>TKNTT / RELEASE ARCHIVE</span>
          <span>CATALOGUE NO. 001 ///</span>
        </div>

        <h1 class="discography-title title">Discography<span>!</span></h1>

        <div class="discography-intro">
          <p>Records, releases &amp; other recordings.</p>
          <span class="discography-total">
            {{ albums.length }} RELEASES
          </span>
        </div>
      </header>

      <!-- Band index -->
      <nav
        v-if="Object.keys(albumsByBand).length"
        class="discography-index"
        aria-label="Jump to artist discography"
      >
        <div class="discography-index-label">
          <span>INDEX</span>
          <span>SELECT ARTIST ↓</span>
        </div>

        <div class="discography-index-links">
          <button
            v-for="(bandAlbums, band) in albumsByBand"
            :key="band"
            type="button"
            class="discography-index-link"
            @click="scrollToSection(band)"
          >
            <span class="index-count">
              {{ String(bandAlbums.length).padStart(2, "0") }}
            </span>
            <span>{{ band }}</span>
            <span class="index-arrow" aria-hidden="true">↘</span>
          </button>
        </div>
      </nav>

      <!-- Discography sections -->
      <div class="discography-sections">
        <section
          v-for="(bandAlbums, band) in albumsByBand"
          :id="sectionId(band)"
          :key="band"
          class="discography-band"
          :aria-labelledby="`${sectionId(band)}-heading`"
        >
          <header class="band-heading">
            <div class="band-heading-main">
              <span class="band-eyebrow">ARTIST / RELEASES</span>
              <h2 :id="`${sectionId(band)}-heading`" class="band-title title">
                {{ band }}
              </h2>
            </div>

            <span class="band-release-count">
              {{ String(bandAlbums.length).padStart(2, "0") }}
              <span>ITEMS</span>
            </span>
          </header>

          <div class="album-grid">
            <RouterLink
              v-for="(album, index) in bandAlbums"
              :key="album.slug"
              :to="`/${album.band}/${album.slug}`"
              :title="album.title"
              class="album-link"
            >
              <article class="album-entry">
                <div class="album-artwork">
                  <img
                    v-if="album.cover"
                    :src="album.cover"
                    :alt="`${album.title} cover`"
                    loading="lazy"
                    decoding="async"
                  />

                  <div v-else class="album-no-cover">
                    <span>TKNTT</span>
                    <span>NO IMAGE</span>
                  </div>

                  <span class="album-artwork-number">
                    {{ String(index + 1).padStart(2, "0") }}
                  </span>

                  <span class="album-open-mark" aria-hidden="true">↗</span>
                </div>

                <div class="album-caption">
                  <h3 class="album-title title">
                    {{ album.title }}
                  </h3>
                  <span class="album-caption-label">VIEW RELEASE</span>
                </div>
              </article>
            </RouterLink>
          </div>
        </section>
      </div>
    </main>
  </MainLayout>
</template>


<script setup lang="ts">
import { computed } from "vue"
import { RouterLink } from "vue-router"
import MainLayout from "@/layouts/MainLayout.vue"

type Album = {
  band: string
  slug: string
  title: string
  cover?: string
  tracklist?: unknown
  date?: string
  raw: unknown
}

const modules = import.meta.glob(
  "@/data/*/discography/*.ts",
  { eager: true }
) as Record<string, { default: any }>

const albums: Album[] = Object.entries(modules).map(([path, mod]) => {
  const slug = path.split("/").pop()!.replace(/\.ts$/, "")

  const relative = path.split("/data/")[1]
  if (!relative) throw new Error(`Invalid path: ${path}`)

  const parts = relative.split("/")
  const band = parts[0]
  if (!band) throw new Error(`Invalid band in path: ${path}`)

  const data = mod.default

  const dateRow = data.release.info.rows?.find(
    ([label]: [string, string]) => label === "Date of Release"
  )

  return {
    band,
    slug,
    title: data.release.title,
    cover: data.release.info.coverImage,
    tracklist: data.release.tracklist,
    date: dateRow?.[1],
    raw: data,
  }
})

// Return a timestamp, placing missing or invalid dates last.
function getReleaseTimestamp(album: Album): number {
  const timestamp = Date.parse(album.date ?? "")
  return Number.isNaN(timestamp)
    ? Number.MAX_SAFE_INTEGER
    : timestamp
}

const albumsByBand = computed(() => {
  const grouped = albums.reduce((acc, album) => {
    if (!acc[album.band]) {
      acc[album.band] = []
    }

    acc[album.band]!.push(album)
    return acc
  }, {} as Record<string, Album[]>)

  // Sort releases within each band: oldest to newest.
  Object.values(grouped).forEach((bandAlbums) => {
    bandAlbums.sort(
      (a, b) => getReleaseTimestamp(a) - getReleaseTimestamp(b)
    )
  })

  // Sort bands by the date of their earliest release.
  return Object.fromEntries(
    Object.entries(grouped).sort(([, albumsA], [, albumsB]) => {
      const earliestA = Math.min(
        ...albumsA.map(getReleaseTimestamp)
      )
      const earliestB = Math.min(
        ...albumsB.map(getReleaseTimestamp)
      )

      return earliestA - earliestB
    })
  ) as Record<string, Album[]>
})

const sectionId = (band: string) => `band-${band}`

const scrollToSection = (band: string) => {
  document.getElementById(sectionId(band))?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  })
}
</script>



<style scoped>
.discography-page {
  --disc-ink: var(--color-neutral, #171717);
  --disc-paper: var(--color-base-100, #f5f3e9);
  --disc-muted: var(--color-base-200, #deddd4);
  --disc-red: var(--color-primary, #e00016);
  --disc-ochre: var(--color-secondary, #c4b583);

  width: 100%;
  min-width: 0;
  padding: clamp(0.75rem, 3vw, 2rem);
  color: var(--disc-ink);
}

/* Masthead */
.discography-header {
  padding-bottom: 1.25rem;
  border-bottom: 4px solid var(--disc-ink);
}

.discography-kicker,
.discography-intro,
.discography-index-label {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.discography-kicker {
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--disc-ink);
}

.discography-kicker span:last-child {
  color: var(--disc-red);
}

.discography-title {
  margin: 1rem 0 0.75rem;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(3rem, 10vw, 6.5rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.discography-title span {
  color: var(--disc-red);
}

.discography-intro {
  align-items: baseline;
  letter-spacing: normal;
}

.discography-intro p {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.6;
  text-transform: none;
}

.discography-total {
  flex-shrink: 0;
  padding: 0.3rem 0.45rem;
  background: var(--disc-ochre);
  color: var(--disc-ink);
}

/* Artist index */
.discography-index {
  margin: 1.25rem 0 2.5rem;
  border: 2px solid var(--disc-ink);
  background: var(--disc-paper);
  box-shadow: 4px 4px 0 var(--disc-muted);
}

.discography-index-label {
  padding: 0.65rem 0.8rem;
  border-bottom: 2px solid var(--disc-ink);
  background: var(--disc-ink);
  color: var(--disc-paper);
  font-size: 0.6rem;
}

.discography-index-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.6rem;
}

.discography-index-link {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  min-height: 2.75rem;
  max-width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--disc-ink);
  background: var(--disc-paper);
  color: var(--disc-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
  overflow-wrap: anywhere;
  cursor: pointer;
  transition:
    background-color 100ms steps(2, end),
    color 100ms steps(2, end);
}

.discography-index-link:hover,
.discography-index-link:focus-visible {
  background: var(--disc-red);
  color: #fff;
}

.index-count {
  color: var(--disc-red);
  font-size: 0.6rem;
}

.discography-index-link:hover .index-count,
.discography-index-link:focus-visible .index-count {
  color: #fff;
}

.index-arrow {
  margin-left: auto;
  opacity: 0;
}

.discography-index-link:hover .index-arrow,
.discography-index-link:focus-visible .index-arrow {
  opacity: 1;
}

/* Artist sections */
.discography-sections {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.discography-band {
  min-width: 0;
  scroll-margin-top: 1.5rem;
}

.band-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid var(--disc-ink);
}

.band-heading-main {
  min-width: 0;
}

.band-eyebrow {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--disc-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.band-title {
  margin: 0;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.band-release-count {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--disc-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.85rem;
  font-weight: 700;
}

.band-release-count span {
  font-size: 0.55rem;
  letter-spacing: 0.05em;
}

/* Album grid */
.album-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 0.75rem;
}

.album-link {
  display: block;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.album-entry {
  height: 100%;
  min-width: 0;
  border: 2px solid var(--disc-ink);
  background: var(--disc-paper);
  box-shadow: 3px 3px 0 var(--disc-muted);
  transition:
    transform 120ms steps(2, end),
    box-shadow 120ms steps(2, end);
}

.album-link:hover .album-entry {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--disc-red);
}

.album-link:focus-visible {
  outline: 3px solid var(--disc-red);
  outline-offset: 4px;
}

.album-artwork {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-bottom: 2px solid var(--disc-ink);
  background: var(--disc-muted);
}

.album-artwork img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.08);
  transition: filter 160ms steps(3, end);
}

.album-link:hover .album-artwork img,
.album-link:focus-visible .album-artwork img {
  filter: grayscale(25%) contrast(1.08);
}

.album-no-cover {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--disc-ink);
  color: var(--disc-paper);
  text-align: center;
}

.album-no-cover span:first-child {
  color: var(--disc-red);
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.5rem, 5vw, 3rem);
}

.album-no-cover span:last-child {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.album-artwork-number {
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.65rem;
  min-height: 1.65rem;
  padding: 0.2rem;
  border: 1px solid var(--disc-paper);
  background: var(--disc-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
}

.album-open-mark {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border: 1px solid var(--disc-paper);
  background: var(--disc-ink);
  color: var(--disc-paper);
  font-size: 1rem;
  opacity: 0;
  transform: translateY(3px);
  transition:
    opacity 100ms steps(2, end),
    transform 100ms steps(2, end);
}

.album-link:hover .album-open-mark,
.album-link:focus-visible .album-open-mark {
  opacity: 1;
  transform: translateY(0);
}

.album-caption {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.7rem;
}

.album-title {
  margin: 0;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 400;
  line-height: 1.25;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.album-caption-label {
  padding-top: 0.45rem;
  border-top: 1px dashed var(--disc-ink);
  color: var(--disc-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

/* Wider screens */
@media (min-width: 640px) {
  .album-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }

  .album-caption {
    padding: 0.85rem;
  }
}

@media (min-width: 1024px) {
  .album-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .discography-sections {
    gap: 4rem;
  }
}

/* Small phones */
@media (max-width: 380px) {
  .discography-kicker {
    font-size: 0.55rem;
  }

  .discography-index-links {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .album-grid {
    gap: 0.75rem 0.5rem;
  }

  .album-caption {
    padding: 0.55rem;
  }

  .album-title {
    font-size: 0.85rem;
  }

  .album-caption-label {
    font-size: 0.48rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .discography-index-link,
  .album-entry,
  .album-artwork img,
  .album-open-mark {
    transition: none;
  }
}
</style>
