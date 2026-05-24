<template>
    <div class="modal-box w-11/12 max-w-5xl bg-base-200/80 md:rounded-md">
        <Tabs v-model="activeTab" :tabs="tabs">
            <template #default="{ activeTab }">
                <div v-if="activeTab === 'tab1'">
                    <div>
                        <h1 class="title text-2xl text-bold text-center japanese text-primary">
                         <div class="divider divider-primary title text-xl md:text-2xl">{{ songInfo?.titleOriginal ?? '' }}</div>
                        </h1>
                        <div class="text-center text-xs japanese pb-3"><p>作詞: {{ trackInfo?.credits.words }}</p><p>作曲: {{ trackInfo?.credits.music }}</p></div>
                        <div class="space-y-3 text-center text-sm md:text-base leading-loose">
                            <p v-for="line in trackInfo?.original" :key="line" :class="[containsJapanese(String(line))? 'japanese': 'content']">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else-if="activeTab === 'tab2'">
                    <div class="content">
                        <h1 class="title text-xl text-center text-primary">
                            <div class="divider divider-primary title text-xl md:text-2xl">{{ songInfo?.titleRom ?? songInfo?.titleOriginal }}</div>
                        </h1>
                        <div class="text-center text-xs"><p>Lyrics: {{ trackInfo?.credits.words }}</p><p>Music: {{ trackInfo?.credits.music }}</p></div>
                        <div class="space-y-3 text-center text-sm md:text-base leading-loose">
                            <p v-for="line in trackInfo?.romaji" :key="line">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else-if="activeTab === 'tab3'">
                    <div class="content">
                        <h1 class="title text-xl text-center text-primary">
                            <div class="divider divider-primary title text-xl md:text-2xl">Translation</div>
                        </h1>
                        <div class="text-center text-xs"><p>Lyrics: {{ trackInfo?.credits.words }}</p><p>Music: {{ trackInfo?.credits.music }}</p></div>
                        <div class="space-y-3 text-center text-sm md:text-base leading-loose">
                            <p v-for="line in trackInfo?.translation" :key="line">
                                {{ line }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </Tabs>
    </div>    
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import Tabs from "@/UI/Molecules/Tabs.vue";
const containsJapanese = (text: string) => {
  return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text);
};
const activeTab = ref("tab2");
const tabs = [
    { label: "Original", value: "tab1" },
    { label: "Romaji", value: "tab2" },
    { label: "Translation", value: "tab3" }
];
type SongInfo = {
    trackNumber: number;
    titleOriginal: string;
    titleRom: string
    video: string;
};
type TrackInfo = {
    credits: Credits;
    original: string;
    romaji: string;
    translation: string;
};
type Credits = {
  words?: string;
  music?: string;
};
const props = defineProps<{
    songInfo: SongInfo | null;
    trackInfo: TrackInfo | null;
}>();
const formattedLyrics = computed(() => {
    if (!props.trackInfo?.original) return [];

    return props.trackInfo.original
        .split(/(?<=\.)\s+|(?<=\?)\s+|(?<=!)\s+/g)
        .map(l => l.trim())
        .filter(Boolean);
});
const containsJapaneseTable = (rows: string[][]) => {
  return rows.some(row =>
    row.some(cell =>
      containsJapanese(String(cell))
    )
  );
};
</script>