<template>
  <section class="lyrics-sheet">
    <header class="lyrics-header">
      <div class="lyrics-eyebrow">
        <span>LYRIC ARCHIVE</span>
        <span>FILE /// {{ songInfo?.trackNumber ?? "—" }}</span>
      </div>

      <div class="lyrics-title-wrap">
        <h1
          class="lyrics-title title"
          :class="{ japanese: activeTab === 'tab1' }"
        >
          {{
            activeTab === "tab3"
              ? "Translation"
              : activeTab === "tab2"
                ? (songInfo?.titleRom ?? songInfo?.titleOriginal ?? "")
                : (songInfo?.titleOriginal ?? "")
          }}
        </h1>

        <span class="lyrics-title-stamp">
          {{
            activeTab === "tab1"
              ? "ORIGINAL"
              : activeTab === "tab2"
                ? "ROMAJI"
                : "ENGLISH"
          }}
        </span>
      </div>

      <div class="lyrics-credits" :class="{ japanese: activeTab === 'tab1' }">
        <template v-if="activeTab === 'tab1'">
          <p>作詞: {{ trackInfo?.credits?.words ?? "—" }}</p>
          <p>作曲: {{ trackInfo?.credits?.music ?? "—" }}</p>
        </template>

        <template v-else>
          <p>LYRICS: {{ trackInfo?.credits?.words ?? "—" }}</p>
          <p>MUSIC: {{ trackInfo?.credits?.music ?? "—" }}</p>
        </template>
      </div>
    </header>

    <div class="lyrics-tabs">
      <Tabs v-model="activeTab" :tabs="tabs">
        <template #default="{ activeTab: currentTab }">
          <article class="lyrics-content">
            <div class="lyrics-content-label">
              <span>/// TEXT TRANSCRIPTION</span>
              <span>
                {{
                  currentTab === "tab1"
                    ? "日本語"
                    : currentTab === "tab2"
                      ? "ROMANIZED"
                      : "TRANSLATED"
                }}
              </span>
            </div>

            <div
              v-if="currentTab === 'tab1'"
              class="lyrics-lines"
              :class="{ 'lyrics-lines-japanese': hasJapaneseLyrics }"
            >
              <p
                v-for="(line, index) in trackInfo?.original ?? []"
                :key="`${index}-${line}`"
                :class="{
                  japanese: containsJapanese(String(line)),
                  'lyrics-line-spacer': !String(line).trim(),
                }"
              >
                {{ line || "\u00A0" }}
              </p>
            </div>

            <div v-else-if="currentTab === 'tab2'" class="lyrics-lines">
              <p
                v-for="(line, index) in trackInfo?.romaji ?? []"
                :key="`${index}-${line}`"
                :class="{ 'lyrics-line-spacer': !String(line).trim() }"
              >
                {{ line || "\u00A0" }}
              </p>
            </div>

            <div v-else class="lyrics-lines">
              <p
                v-for="(line, index) in trackInfo?.translation ?? []"
                :key="`${index}-${line}`"
                :class="{ 'lyrics-line-spacer': !String(line).trim() }"
              >
                {{ line || "\u00A0" }}
              </p>
            </div>
          </article>
        </template>
      </Tabs>
    </div>

    <footer class="lyrics-footer">
      <span>END OF LYRIC FILE</span>
      <span>/// {{ songInfo?.trackNumber ?? "—" }}</span>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Tabs from "@/UI/Molecules/Tabs.vue";

type SongInfo = {
  trackNumber: number;
  titleOriginal: string;
  titleRom: string;
  video: string;
};

type Credits = {
  words?: string;
  music?: string;
};

type TrackInfo = {
  credits?: Credits;
  original?: string[];
  romaji?: string[];
  translation?: string[];
};

const props = defineProps<{
  songInfo: SongInfo | null;
  trackInfo: TrackInfo | null;
}>();

const activeTab = ref("tab2");

const tabs = [
  { label: "Original", value: "tab1" },
  { label: "Romaji", value: "tab2" },
  { label: "Translation", value: "tab3" },
];

const containsJapanese = (text: string) =>
  /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text);

const hasJapaneseLyrics = computed(() =>
  (props.trackInfo?.original ?? []).some((line) =>
    containsJapanese(String(line)),
  ),
);

// Reset to Romaji when a different song is opened.
watch(
  () => props.songInfo?.trackNumber,
  () => {
    activeTab.value = "tab2";
  },
);
</script>

<style scoped>
.lyrics-sheet {
  --lyrics-paper: var(--color-base-100, #f5f3e9);
  --lyrics-ink: var(--color-base-content, #171717);
  --lyrics-red: var(--color-primary, #e00016);
  --lyrics-muted: var(--color-base-300, #deddd4);

  width: 100%;
  padding: 1rem;
  border: 2px solid var(--lyrics-ink);
  background: var(--lyrics-paper);
  color: var(--lyrics-ink);
  box-shadow: 5px 5px 0 var(--lyrics-red);
}

.lyrics-header {
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--lyrics-ink);
}

.lyrics-eyebrow,
.lyrics-title-stamp,
.lyrics-content-label,
.lyrics-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.lyrics-eyebrow {
  color: var(--lyrics-red);
}

.lyrics-title-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin: 1rem 0;
}

.lyrics-title {
  min-width: 0;
  margin: 0;
  color: var(--lyrics-red);
  font-size: clamp(1.6rem, 5vw, 2.5rem);
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.lyrics-title-stamp {
  flex-shrink: 0;
  padding: 0.3rem 0.45rem;
  border: 1px solid var(--lyrics-red);
  color: var(--lyrics-red);
  transform: rotate(-3deg);
}

.lyrics-credits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  line-height: 1.6;
}

.lyrics-credits p {
  margin: 0;
}

.lyrics-tabs {
  padding-top: 1rem;
}

/* Keep the existing Tabs component, but give its tab buttons the zine treatment. */
.lyrics-tabs :deep([role="tablist"]) {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  overflow-x: auto;
  border-bottom: 1px dashed var(--lyrics-ink);
}

.lyrics-tabs :deep([role="tab"]) {
  flex: 0 0 auto;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--lyrics-ink);
  border-radius: 0;
  background: transparent;
  color: var(--lyrics-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.lyrics-tabs :deep([role="tab"][aria-selected="true"]) {
  border-color: var(--lyrics-red);
  background: var(--lyrics-red);
  color: #fff;
}

.lyrics-tabs :deep([role="tab"]:focus-visible) {
  outline: 2px solid var(--lyrics-red);
  outline-offset: 3px;
}

.lyrics-content {
  min-width: 0;
}

.lyrics-content-label {
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--lyrics-muted);
  color: var(--lyrics-red);
}

.lyrics-lines {
  padding: 0.25rem 0 1.25rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.lyrics-lines p {
  margin: 0 0 0.7rem;
  white-space: pre-wrap;
}

.lyrics-lines p:last-child {
  margin-bottom: 0;
}

.lyrics-lines .japanese {
  font-size: 1.15em;
  line-height: 2;
}

.lyrics-line-spacer {
  min-height: 1rem;
  margin-bottom: 0.75rem !important;
}

.lyrics-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 2px solid var(--lyrics-ink);
  color: var(--lyrics-ink);
}

@media (min-width: 768px) {
  .lyrics-sheet {
    padding: 1.75rem 2rem;
  }

  .lyrics-header {
    padding-bottom: 1.25rem;
  }

  .lyrics-lines {
    padding: 0.75rem 1rem 1.5rem;
    font-size: 1.1rem;
    line-height: 2;
  }

  .lyrics-lines .japanese {
    font-size: 1.2em;
  }

  .lyrics-credits {
    gap: 0.5rem 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
  }
}
</style>