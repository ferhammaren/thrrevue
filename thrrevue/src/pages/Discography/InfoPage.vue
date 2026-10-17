<template>
  <MainLayout>
    <main class="album-page">
      <!-- Loading state -->
      <section v-if="loading" class="album-loading">
        <div class="skeleton h-10 w-2/3 mb-6"></div>
        <div class="skeleton aspect-square w-full max-w-sm"></div>
        <div class="skeleton h-5 w-full mt-6"></div>
        <div class="skeleton h-5 w-5/6 mt-3"></div>
      </section>

      <template v-else-if="album">
        <!-- Editorial album heading -->
        <header class="album-header">
          <div class="album-eyebrow">
            <span>RELEASE ARCHIVE</span>
            <span>/// {{ album.band }}</span>
          </div>

          <h1 class="album-title title">
            {{ album.title }}
          </h1>

          <div class="album-header-bottom">
            <span>ALBUM FILE / {{ album.slug }}</span>
            <span>{{ album.tracklist?.tracks?.length ?? 0 }} TRACKS</span>
          </div>
        </header>

        <!-- Album information -->
        <section class="album-overview">
          <div class="album-artwork-frame">
            <div class="album-artwork-stamp">RELEASE FILE</div>

            <img
              v-if="album.cover"
              :src="album.cover"
              :alt="`${album.title} album cover`"
              class="album-artwork"
            />

            <div v-else class="album-artwork-placeholder">
              <span>NO IMAGE</span>
              <span>/// COVER MISSING</span>
            </div>
          </div>

          <div class="album-details">
            <!-- Mobile streaming links -->
            <nav
              v-if="album.streaming && Object.keys(album.streaming).length"
              class="streaming-links streaming-links-mobile"
              aria-label="Listen to this release"
            >
              <a
                v-for="(link, service) in album.streaming"
                :key="service"
                :href="link"
                :aria-label="`Listen on ${service}`"
                target="_blank"
                rel="noopener noreferrer"
                class="streaming-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path :d="icons[service as StreamingService].path" />
                </svg>
              </a>
            </nav>

            <div class="section-kicker">
              <span>01</span>
              <span>RELEASE INFORMATION</span>
            </div>

            <ZebraList
              class="album-info-table"
              :rows="album.raw.release.info.rows"
              :columnHeader="album.raw.release.info.columnHeader"
            />

            <!-- Desktop streaming links -->
            <nav
              v-if="album.streaming && Object.keys(album.streaming).length"
              class="streaming-links streaming-links-desktop"
              aria-label="Listen to this release"
            >
              <a
                v-for="(link, service) in album.streaming"
                :key="service"
                :href="link"
                :aria-label="`Listen on ${service}`"
                target="_blank"
                rel="noopener noreferrer"
                class="streaming-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path :d="icons[service as StreamingService].path" />
                </svg>
              </a>
            </nav>
          </div>
        </section>

        <!-- Track list -->
        <section class="tracklist-section">
          <div class="section-heading">
            <div class="section-kicker">
              <span>02</span>
              <span>CONTENTS</span>
            </div>

            <h2 class="tracklist-title title">Track List</h2>

            <p class="tracklist-note">
              FULL TRACK INDEX /// LYRICS &amp; VIDEO LINKS
            </p>
          </div>

          <div class="tracklist-table">
            <ZebraList
              class="album-track-table"
              :headers="album.tracklist?.headers"
              :rows="album.tracklist?.tracks"
              :columnHeader="album.tracklist?.columnHeader"
              :columnRow="album.tracklist?.rowHeader"
            >
              <template #cell="{ value, columnIndex, row, rowIndex }">
                <!-- Video column -->
                <a
                  v-if="columnIndex === 3 && typeof value === 'string' && value"
                  :href="value"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Watch this song on YouTube"
                  class="track-action"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path :d="icons.youtube.path" />
                  </svg>
                </a>

                <!-- Lyrics column -->
                <button
                  v-else-if="columnIndex === 4"
                  type="button"
                  class="track-action"
                  :disabled="!(typeof value === 'string' && value === 'y')"
                  :aria-label="
                    typeof value === 'string' && value === 'y'
                      ? 'Open lyrics'
                      : 'Lyrics unavailable'
                  "
                  @click="openModal(rowIndex, row, album.lyrics)"
                >
                  <span class="material-symbols-outlined">
                    {{
                      typeof value === 'string' && value === 'y'
                        ? 'lyrics'
                        : 'playlist_remove'
                    }}
                  </span>
                </button>

                <!-- Other columns -->
                <span v-else class="track-cell-content">
                  {{ value }}
                </span>
              </template>
            </ZebraList>
          </div>

          <footer class="album-footer">
            <span>END OF FILE</span>
            <span>/// {{ album.band }} ARCHIVE</span>
          </footer>
        </section>
      </template>

      <section v-else class="album-not-found">
        <span class="album-eyebrow">ERROR /// 404</span>
        <h1 class="title">Release not found.</h1>
        <p>The requested album could not be located in the archive.</p>
      </section>

      <!-- Lyrics modal -->
      <dialog ref="modal" class="modal lyrics-modal">
        <div class="lyrics-modal-box">
          <div class="lyrics-modal-header">
            <span class="album-eyebrow">LYRICS FILE /// OPEN</span>

            <form method="dialog">
              <button class="modal-close" aria-label="Close lyrics">
                ×
              </button>
            </form>
          </div>

          <Lyrics
            :songInfo="selectedSong"
            :trackInfo="selectedTrack"
          />
        </div>

        <form method="dialog" class="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </main>
  </MainLayout>
</template>
<style scoped>
.album-page {
  --album-paper: var(--color-base-100, #f5f3e9);
  --album-ink: var(--color-base-content, #171717);
  --album-red: var(--color-primary, #e00016);
  --album-ochre: var(--color-secondary, #c4b583);
  --album-muted: var(--color-base-300, #deddd4);

  max-width: 1440px;
  margin-inline: auto;
  padding: 1rem;
  color: var(--album-ink);
}

.album-header {
  border-top: 5px solid var(--album-red);
  border-bottom: 2px solid var(--album-ink);
  padding: 1rem 0 0.75rem;
  margin-bottom: 1.5rem;
}

.album-eyebrow,
.album-header-bottom,
.section-kicker,
.tracklist-note,
.album-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.album-eyebrow {
  color: var(--album-red);
}

.album-title {
  margin: 1rem 0;
  font-size: clamp(2.4rem, 8vw, 5.5rem);
  line-height: 0.95;
  overflow-wrap: anywhere;
  text-transform: uppercase;
}

.album-header-bottom {
  border-top: 1px dashed var(--album-ink);
  padding-top: 0.65rem;
  color: var(--album-ink);
}

.album-overview {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.album-artwork-frame {
  position: relative;
  width: 100%;
  max-width: 540px;
  margin-inline: auto;
  padding: 0.45rem;
  border: 2px solid var(--album-ink);
  background: var(--album-paper);
  box-shadow: 6px 6px 0 var(--album-ink);
}

.album-artwork {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  filter: grayscale(25%);
}

.album-artwork-stamp {
  position: absolute;
  z-index: 1;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.5rem;
  background: var(--album-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  transform: rotate(-4deg);
}

.album-artwork-placeholder {
  display: flex;
  aspect-ratio: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--album-muted);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
  font-weight: 700;
}

.album-details {
  min-width: 0;
}

.section-kicker {
  justify-content: flex-start;
  margin-bottom: 0.75rem;
}

.section-kicker span:first-child {
  display: inline-flex;
  width: 1.8rem;
  height: 1.8rem;
  align-items: center;
  justify-content: center;
  background: var(--album-red);
  color: #fff;
}

.section-kicker span:last-child {
  letter-spacing: 0.08em;
}

.streaming-links {
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  padding: 1rem 0;
}

.streaming-links-mobile {
  display: flex;
  margin-bottom: 1.25rem;
  border-bottom: 1px dashed var(--album-ink);
}

.streaming-links-desktop {
  display: none;
  border-top: 1px dashed var(--album-ink);
}

.streaming-link {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--album-ink);
  color: var(--album-red);
  transition:
    background-color 150ms ease,
    color 150ms ease,
    transform 150ms ease;
}

.streaming-link svg {
  width: 1.35rem;
  height: 1.35rem;
  fill: currentColor;
}

.streaming-link:hover {
  background: var(--album-red);
  color: #fff;
  transform: translateY(-2px);
}

.tracklist-section {
  border-top: 3px solid var(--album-ink);
}

.section-heading {
  padding: 1rem 0;
}

.tracklist-title {
  margin: 0.5rem 0;
  color: var(--album-red);
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1;
  text-transform: uppercase;
}

.tracklist-note {
  justify-content: flex-start;
  color: var(--album-ink);
  font-size: 0.65rem;
}

.tracklist-table {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--album-ink);
  background: var(--album-paper);
}


.tracklist-table :deep(th:first-child),
.tracklist-table :deep(td:first-child) {
  width: 3rem;
  min-width: 3rem;
  max-width: 3rem;
  padding-inline: 0.3rem;
  text-align: center;
  white-space: nowrap;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
}

/* Keep the track table compact without squeezing other columns. */
.tracklist-table :deep(table) {
  width: 100%;
  border-collapse: collapse;
}

.tracklist-table :deep(th),
.tracklist-table :deep(td) {
  padding: 0.75rem;
  border-bottom: 1px dashed var(--album-muted);
  vertical-align: middle;
}

.tracklist-table :deep(th) {
  background: var(--album-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  text-align: left;
  text-transform: uppercase;
}

.track-cell-content {
  display: block;
  overflow-wrap: anywhere;
  font-size: 1rem;
  line-height: 1.6;
}

.track-action {
  display: inline-flex;
  min-width: 2rem;
  min-height: 2rem;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  color: var(--album-red);
  cursor: pointer;
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.track-action svg {
  width: 1.4rem;
  height: 1.4rem;
  fill: currentColor;
}

.track-action:hover:not(:disabled) {
  border-color: var(--album-red);
  background: var(--album-red);
  color: #fff;
}

.track-action:disabled {
  color: var(--album-muted);
  cursor: not-allowed;
}

.album-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 2px solid var(--album-ink);
}

.album-not-found {
  padding: 3rem 1rem;
  border: 2px solid var(--album-ink);
  box-shadow: 5px 5px 0 var(--album-red);
}

.album-not-found h1 {
  margin: 1rem 0;
  font-size: 2rem;
}

.album-loading {
  display: grid;
  gap: 1rem;
}

.lyrics-modal {
  padding: 1rem;
}

.lyrics-modal-box {
  width: min(100%, 52rem);
  max-height: 90vh;
  overflow-y: auto;
  padding: 1rem;
  border: 2px solid var(--album-ink);
  border-radius: 0;
  background: var(--album-paper);
  color: var(--album-ink);
  box-shadow: 7px 7px 0 var(--album-red);
}

.lyrics-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed var(--album-ink);
}

.modal-close {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--album-ink);
  font-size: 1.5rem;
  line-height: 1;
}

.modal-close:hover {
  background: var(--album-red);
  color: #fff;
}

@media (min-width: 768px) {
  .album-page {
    padding: 2rem;
  }

  .album-header {
    margin-bottom: 2rem;
  }

  .album-overview {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .album-artwork-frame {
    max-width: none;
  }

  .album-details {
    align-self: center;
  }

  .streaming-links-mobile {
    display: none;
  }

  .streaming-links-desktop {
    display: flex;
  }
 .track-cell-content {
    font-size: 1.125rem;
  }
  .tracklist-table :deep(th),
    .tracklist-table :deep(td) {
    padding: 0.85rem 1rem;
  }

  .tracklist-table :deep(th:first-child),
  .tracklist-table :deep(td:first-child) {
    width: 3.25rem;
    min-width: 3.25rem;
    max-width: 3.25rem;
    padding-inline: 0.35rem;
  }

  .lyrics-modal-box {
    padding: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .streaming-link,
  .track-action {
    transition: none;
  }
}
</style>
<script setup lang="ts">
/* =========================
   Imports
========================= */
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import ZebraList from "@/UI/Molecules/ZebraList.vue";
import Lyrics from "./Lyrics.vue";

import {
    siYoutubemusic,
    siSpotify,
    siApplemusic,
    siYoutube
} from "simple-icons";


/* =========================
   Types
========================= */
type StreamingService =
    | "youtubeMusic"
    | "spotify"
    | "appleMusic"
    | "youtube";

type Album = {
    band: string;
    slug: string;
    title: string;
    streaming?: Partial<Record<StreamingService, string>>;
    cover?: string;
    tracklist?: any;
    lyrics?: any;
    raw: any;
};


/* =========================
   Static Data
========================= */
const icons = {
    youtubeMusic: siYoutubemusic,
    spotify: siSpotify,
    appleMusic: siApplemusic,
    youtube: siYoutube
};

const modules = import.meta.glob(
    "@/data/*/discography/*.ts",
    { eager: true }
) as Record<string, { default: any }>;

const loading = ref(true);
/* =========================
   Reactive State
========================= */
const route = useRoute();

const modal = ref<HTMLDialogElement | null>(null);

const selectedSong = ref<any>(null);
const selectedTrack = ref<any>(null);
const selectedRowIndex = ref<number | null>(null);


/* =========================
   Data Processing
========================= */
const albums: Album[] = Object.entries(modules).map(([path, mod]) => {
    const relative = path.split("/data/")[1];

    if (!relative) {
        throw new Error(`Invalid path: ${path}`);
    }

    const [band = "", , file = ""] = relative.split("/");

    return {
        band,
        slug: file?.replace(".ts", ""),
        title: mod.default.release.title,
        streaming: mod.default.release.streaming,
        cover: mod.default.release.info.coverImage,
        tracklist: mod.default.release.tracklist,
        lyrics: mod.default.release.lyrics,
        raw: mod.default
    };
});


/* =========================
   Computed
========================= */
const album = computed(() =>
    albums.find(
        a =>
            a.band === route.params.band &&
            a.slug === route.params.slug
    )
);


/* =========================
   Methods
========================= */
const openModal = (
    index: number,
    song: any,
    lyrics: any
) => {
    selectedSong.value = {
        trackNumber: song[0],
        titleOriginal: song[1],
        titleRom: song[2],
        video: song[3]
    };
    selectedRowIndex.value = index;

    const lyricArray = Object.values(lyrics);

    selectedTrack.value = lyricArray[index];

    console.log(selectedSong.value);

    modal.value?.showModal();
};

onMounted(async () => {
    // simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));

    loading.value = false;
});
</script>