
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import "cally";

import currentLiveDates from "@/data/currentLiveDates";
import type { TourDate } from "@/types/tour-date";
import { getBandColor } from "@/data/band-colors";

const tourDates = currentLiveDates as TourDate[];

const eventsByDate = computed(() => {
  const grouped: Record<string, TourDate[]> = {};

  for (const event of tourDates) {
    (grouped[event.date] ??= []).push(event);
  }

  return grouped;
});

const calendarRef = ref<HTMLElement | null>(null);

const selectedDate = ref(
  [...tourDates].sort((a, b) => a.date.localeCompare(b.date))[0]?.date ?? "",
);

const selectedEvents = computed(
  () => eventsByDate.value[selectedDate.value] ?? [],
);

const bandPartNames: Record<string, string> = {
  nil: "band-nil",
  "THE JUNEJULYAUGUST": "band-junejulyaugust",
  "DISCO VOLANTE": "band-disco-volante",
  "Tetsu Takano": "band-tetsu-takano",
  "Tetsu Takano Trio": "band-tetsu-takano-trio",
};

function getDayParts(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const calendarDate = `${year}-${month}-${day}`;

  const events = eventsByDate.value[calendarDate];

  if (!events?.length) return "";

  const band = events[0].band;
  return `has-event ${bandPartNames[band] ?? "band-other"}`;
}

function onCalendarChange(event: Event) {
  const target = event.target as HTMLElement & { value: string };
  selectedDate.value = target.value;
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

onMounted(() => {
  if (calendarRef.value) {
    // getDayParts is a JavaScript property, not an HTML attribute.
    (calendarRef.value as HTMLElement & {
      getDayParts: (date: Date) => string;
    }).getDayParts = getDayParts;
  }
});
</script>

<template>
  <div class="tour-calendar">
    <calendar-date
      ref="calendarRef"
      class="home-calendar"
      :value="selectedDate"
      @change="onCalendarChange"
    >
      <template #previous>
        <svg
          aria-label="Previous month"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="calendar-arrow"
        >
          <path
            fill="currentColor"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </template>

      <template #next>
        <svg
          aria-label="Next month"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="calendar-arrow"
        >
          <path
            fill="currentColor"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </template>

      <calendar-month />
    </calendar-date>

    <section class="event-details" aria-live="polite">
      <div class="event-details-heading">
        <span>SELECTED DATE</span>
        <span>{{ selectedDate ? formatDate(selectedDate) : "—" }}</span>
      </div>

      <p v-if="!selectedEvents.length" class="no-events">
        No scheduled events for this date.
      </p>

      <article
        v-for="event in selectedEvents"
        :key="event.id"
        class="tour-event"
        :style="{ '--band-color': getBandColor(event.band) }"
      >
        <div class="event-band">
          <span class="event-band-marker" aria-hidden="true"></span>
          {{ event.band }}
        </div>

        <h3>{{ event.show }}</h3>

        <p class="event-venue">
          {{ event.venue }} /// {{ event.city }}
        </p>

        <p v-if="event.price" class="event-price">
          {{ event.price }}
        </p>

        <a
          v-if="event.ticketUrl"
          :href="event.ticketUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="event-ticket-link"
        >
          EVENT / TICKETS ↗
        </a>
      </article>
    </section>

<div class="band-legend" aria-label="Band color legend">
  <span>KEY ///</span>

  <span
    v-for="band in [
      'nil',
      'THE JUNEJULYAUGUST',
      'DISCO VOLANTE',
      'Tetsu Takano',
      'Tetsu Takano Trio',
    ]"
    :key="band"
    class="legend-item"
    :style="{ '--band-color': getBandColor(band) }"
  >
    <span class="legend-marker"></span>
    {{ band }}
  </span>
</div>
  </div>
</template>

<style scoped>
.tour-calendar {
  min-width: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.home-calendar {
  display: block;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  margin-top: 0.5rem;
  padding: 0.07rem;
  box-sizing: border-box;
  overflow: hidden;

  border: 1px solid var(--color-base-300, #b5b4ac);
  border-radius: 0;
  background: var(--color-base-100, #f5f3e9);
  box-shadow: none;
  font-family: "IBM Plex Mono", monospace;
}

.home-calendar calendar-month {
  display: block;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

calendar-month::part(heading) {
  font-family: "Fjalla One", sans-serif;
  text-transform: uppercase;
}

calendar-month::part(button) {
  border-radius: 0;
  font-family: "IBM Plex Mono", monospace;
}

calendar-month::part(has-event) {
  outline: 2px solid currentColor;
  outline-offset: -3px;
  font-weight: 800;
}

calendar-month::part(band-nil) {
  background: #e00016;
  color: #fff;
}

calendar-month::part(band-junejulyaugust) {
  background: #5d7b70;
  color: #fff;
}

calendar-month::part(band-disco-volante) {
  background: #3977a3;
  color: #fff;
}

calendar-month::part(band-tetsu-takano) {
  background: #39a354;
  color: #fff;
}

calendar-month::part(band-tetsu-takano-trio) {
  background: #7c39a3;
  color: #fff;
}

calendar-month::part(band-other) {
  background: #777;
  color: #fff;
}

calendar-month::part(has-event) {
  outline: 2px solid currentColor;
  outline-offset: -3px;
  font-weight: 800;
}

.event-details {
  margin-top: 1rem;
  border-top: 3px solid var(--color-base-content, #171717);
}

.event-details-heading {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-block: 0.65rem;
  border-bottom: 1px dashed var(--color-base-300, #b5b4ac);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
}

.tour-event {
  margin-top: 0.75rem;
  padding: 0.8rem;
  border: 1px solid var(--color-base-300, #b5b4ac);
  border-left: 5px solid var(--band-color);
  background: var(--color-base-100, #f5f3e9);
}

.event-band {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--band-color);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

.event-band-marker,
.legend-marker {
  display: inline-block;
  flex: 0 0 0.6rem;
  width: 0.6rem;
  height: 0.6rem;
  background: var(--band-color);
}

.tour-event h3 {
  margin: 0.5rem 0;
  font-family: "Fjalla One", sans-serif;
  font-size: 1.25rem;
  line-height: 1.2;
}

.event-venue,
.event-price,
.no-events {
  margin: 0.35rem 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  line-height: 1.6;
}

.event-ticket-link {
  display: inline-block;
  margin-top: 0.65rem;
  padding: 0.55rem 0.65rem;
  background: var(--color-base-content, #171717);
  color: var(--color-base-100, #f5f3e9);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  text-decoration: none;
}

.event-ticket-link:hover,
.event-ticket-link:focus-visible {
  background: var(--color-primary, #e00016);
  color: #fff;
}

.band-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--color-base-300, #b5b4ac);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
}

.band-legend > span:first-child {
  font-weight: 800;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.legend-marker {
  flex-basis: 0.6rem;
  width: 0.6rem;
  height: 0.6rem;
}
</style>
