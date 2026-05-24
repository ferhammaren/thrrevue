<template>
    <MainLayout>
        <div class="card w-full p-2 bg-neutral-content/30 md:shadow-sm md:p-8 ">
            <h1 class="text-3xl text-center pb-2 md:pb-8 font-bold title text-primary">
                {{ album?.title }}
            </h1>
            <div class="md:grid md:grid-cols-2">
                <div class="join w-full flex justify-around pb-4 md:hidden md:">
                    <a v-for="(link, service) in album?.streaming" :key="service" :href="link" target="_blank"
                        rel="noopener noreferrer" class="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                            class="fill-primary">
                            <path :d="icons[service as StreamingService].path" />
                        </svg>
                    </a>
                </div>
                <img class="w-sm shadow-md rounded-md" :src="album?.cover" />
                <div class="md:content-center">
                    <ZebraList class="rounded-md shadow-sm " :rows="album?.raw.release.info.rows"
                        :columnHeader="album?.raw.release.info.columnHeader" />
                    <div class="hidden h-0 join md:flex md:h-auto md:w-full md:justify-around md:pt-4">
                        <a v-for="(link, service) in album?.streaming" :key="service" :href="link" target="_blank"
                            rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                                class="fill-primary">
                                <path :d="icons[service as StreamingService].path" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="w-full md:block md:justify-center">
                <div class="divider divider-primary title text-xl md:text-2xl">Track List</div>
                <ZebraList class="rounded-md shadow-sm" :headers="album?.tracklist.headers"
                    :rows="album?.tracklist.tracks" :columnHeader="album?.tracklist.columnHeader"
                    :columnRow="album?.tracklist.rowHeader">
                    <template #cell="{ value, columnIndex, row, rowIndex }">
                        <!-- Video column -->
                        <template v-if="columnIndex === 3">
                            <a v-if="typeof value === 'string' && value" :href="value" target="_blank"
                                rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                    class="fill-primary">
                                    <path :d="icons['youtube'].path" />
                                </svg>
                            </a>
                        </template>
                        <!-- Lyrics column -->
                        <template v-if="columnIndex === 4">
                            <button class="btn btn-ghost" @click="openModal(rowIndex, row, album?.lyrics)"
                                v-if="typeof value === 'string' && value === 'y'">
                                <span class="material-symbols-outlined">
                                    lyrics
                                </span>
                            </button>
                            <button v-else class="btn btn-ghost">
                                <span class="material-symbols-outlined">playlist_remove</span>
                            </button>
                        </template>
                        <!-- Default rendering -->
                        <template v-else>
                            <div class="content md:text-lg md:font-medium">{{ value }}</div>
                        </template>
                    </template>
                </ZebraList>
            </div>
            <dialog ref="modal" class="modal">
                <Lyrics :songInfo="selectedSong" :trackInfo="selectedTrack" />
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    </MainLayout>
</template>

<script setup lang="ts">
/* =========================
   Imports
========================= */
import { computed, ref } from "vue";
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
</script>