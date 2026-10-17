<template>
  <ul class="zine-timeline">
    <li
      v-for="(item, index) in items"
      :key="`${item.year}-${item.title}`"
      class="zine-timeline-item"
    >
      <!-- Timeline rule -->
      <div
        v-if="index !== 0"
        class="zine-timeline-rule zine-timeline-rule-top"
        aria-hidden="true"
      />

      <!-- Milestone marker -->
      <div class="zine-timeline-marker" aria-hidden="true">
        <span>{{ String(index + 1).padStart(2, "0") }}</span>
      </div>

      <!-- Timeline entry -->
      <article
        class="zine-timeline-entry"
        :class="index % 2 === 0 ? 'zine-timeline-left' : 'zine-timeline-right'"
      >
        <div class="zine-timeline-meta">
          <span class="zine-timeline-index">
            FILE / {{ String(index + 1).padStart(2, "0") }}
          </span>
          <time class="zine-timeline-year">{{ item.year }}</time>
        </div>

        <h3 class="zine-timeline-title">
          {{ item.title }}
        </h3>

        <p class="zine-timeline-description">
          {{ item.description }}
        </p>

        <div class="zine-timeline-footer" aria-hidden="true">
          <span>TKNTT ARCHIVE</span>
          <span>///</span>
        </div>
      </article>

      <!-- Timeline rule -->
      <div
        v-if="index !== items.length - 1"
        class="zine-timeline-rule zine-timeline-rule-bottom"
        aria-hidden="true"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  items: {
    year: string
    title: string
    description: string
  }[]
}>()
</script>

<style scoped>
.zine-timeline {
  --timeline-red: var(--color-primary, #e00016);
  --timeline-ink: var(--color-neutral, #171717);
  --timeline-paper: var(--color-base-100, #f5f3e9);
  --timeline-muted: var(--color-base-200, #deddd4);
  --timeline-ochre: var(--color-secondary, #c4b583);

  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
}

.zine-timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr);
  column-gap: 1rem;
  padding: 0 0 2.5rem;
  list-style: none;
}

.zine-timeline-item:last-child {
  padding-bottom: 0;
}

/* Vertical photocopied spine */
.zine-timeline-item::before {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 1.25rem;
  width: 3px;
  background: var(--timeline-ink);
  content: "";
}

.zine-timeline-item:first-child::before {
  top: 1rem;
}

.zine-timeline-item:last-child::before {
  bottom: auto;
  height: 1rem;
}

/* Numbered square markers */
.zine-timeline-marker {
  position: relative;
  z-index: 1;
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.65rem;
  height: 2.65rem;
  border: 3px solid var(--timeline-paper);
  outline: 2px solid var(--timeline-ink);
  background: var(--timeline-red);
  color: #fff;
  font-family: "Fjalla One", sans-serif;
  font-size: 0.8rem;
  line-height: 1;
  transform: rotate(-3deg);
  transition: transform 120ms steps(2, end);
}

.zine-timeline-item:hover .zine-timeline-marker {
  transform: rotate(0deg) scale(1.06);
}

/* Hide the old connector elements; the spine is drawn by the item */
.zine-timeline-rule {
  display: none;
}

.zine-timeline-entry {
  grid-column: 2;
  min-width: 0;
  padding: 1rem;
  border: 2px solid var(--timeline-ink);
  background: var(--timeline-paper);
  box-shadow: 5px 5px 0 var(--timeline-muted);
  transition:
    box-shadow 120ms steps(2, end),
    transform 120ms steps(2, end);
}

.zine-timeline-entry:hover {
  box-shadow: 2px 2px 0 var(--timeline-red);
  transform: translate(2px, 2px);
}

.zine-timeline-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px dashed var(--timeline-ink);
}

.zine-timeline-index {
  color: var(--timeline-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.zine-timeline-year {
  display: inline-block;
  padding: 0.25rem 0.45rem;
  background: var(--timeline-ochre);
  color: var(--timeline-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.zine-timeline-title {
  margin: 0.85rem 0 0.55rem;
  color: var(--timeline-red);
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 400;
  line-height: 1.1;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.zine-timeline-description {
  margin: 0;
  color: var(--timeline-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.zine-timeline-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 2px solid var(--timeline-ink);
  color: var(--timeline-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* Wider screens: alternate entries on either side of the spine */
@media (min-width: 768px) {
  .zine-timeline-item {
    grid-template-columns: minmax(0, 1fr) 3rem minmax(0, 1fr);
    column-gap: 1.25rem;
    padding-bottom: 3rem;
  }

  .zine-timeline-item::before {
    left: calc(50% - 1.5px);
  }

  .zine-timeline-marker {
    grid-column: 2;
    grid-row: 1;
    justify-self: center;
    width: 2.75rem;
    height: 2.75rem;
  }

  .zine-timeline-entry {
    grid-row: 1;
  }

  .zine-timeline-left {
    grid-column: 1;
    text-align: right;
  }

  .zine-timeline-right {
    grid-column: 3;
    text-align: left;
  }

  .zine-timeline-left .zine-timeline-meta,
  .zine-timeline-left .zine-timeline-footer {
    justify-content: space-between;
  }

  .zine-timeline-left .zine-timeline-description {
    text-align: right;
  }

  .zine-timeline-right .zine-timeline-description {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .zine-timeline-marker,
  .zine-timeline-entry {
    transition: none;
  }
}
</style>