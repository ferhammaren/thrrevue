```vue
<template>
  <article class="zine-news-post">
    <!-- Editorial masthead -->
    <header class="zine-news-header">
      <div class="zine-news-kicker">
        <span class="zine-news-publication">THUNDER ROAD REVUE / NEWS DESK</span>
        <span class="zine-news-edition">LATEST REPORT ///</span>
      </div>

      <h2 v-if="title" class="zine-news-title title">
        {{ title }}
      </h2>

      <div v-if="date || chip" class="zine-news-meta">
        <time v-if="date" class="zine-news-date">
          {{ date }}
        </time>

        <span v-if="chip" class="zine-news-chip">
          {{ chip }}
        </span>
      </div>
    </header>

    <!-- Article body -->
    <div class="zine-news-body">
      <div class="zine-news-copy post-body">
        <slot />
      </div>

      <!-- Optional footer / metadata -->
      <footer v-if="$slots['post-content']" class="zine-news-footer">
        <span class="zine-news-footer-label" aria-hidden="true">
          END OF REPORT
        </span>

        <div class="zine-news-footer-content post-content">
          <slot name="post-content" />
        </div>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  date?: string
  chip?: string
}>()
</script>

<style scoped>
.zine-news-post {
  --news-ink: var(--color-neutral, #171717);
  --news-paper: var(--color-base-100, #f5f3e9);
  --news-muted: var(--color-base-200, #deddd4);
  --news-red: var(--color-primary, #e00016);
  --news-ochre: var(--color-secondary, #c4b583);

  width: 100%;
  min-width: 0;
  border: 2px solid var(--news-ink);
  background: var(--news-paper);
  color: var(--news-ink);
  box-shadow: 5px 5px 0 var(--news-muted);
}

/* Header / masthead */
.zine-news-header {
  position: relative;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 3px solid var(--news-ink);
  background: var(--news-red);
  color: #fff;
}

.zine-news-kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(255 255 255 / 55%);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.zine-news-edition {
  opacity: 0.8;
}

.zine-news-title {
  margin: 0;
  font-family: "Fjalla One", sans-serif;
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.zine-news-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
}

.zine-news-date {
  display: inline-flex;
  align-items: center;
  min-height: 1.8rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid rgb(255 255 255 / 65%);
  overflow-wrap: anywhere;
}

.zine-news-chip {
  display: inline-flex;
  align-items: center;
  min-height: 1.8rem;
  max-width: 100%;
  padding: 0.3rem 0.55rem;
  background: var(--news-ochre);
  color: var(--news-ink);
  font-size: 0.65rem;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

/* Article body */
.zine-news-body {
  padding: 1.5rem;
}

.zine-news-copy {
  min-width: 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.85rem;
  line-height: 1.85;
  overflow-wrap: anywhere;
}

.zine-news-copy :deep(p:first-child) {
  margin-top: 0;
}

.zine-news-copy :deep(p:last-child) {
  margin-bottom: 0;
}

.zine-news-copy :deep(h3),
.zine-news-copy :deep(h4) {
  margin: 1.5rem 0 0.65rem;
  color: var(--news-red);
  font-family: "Fjalla One", sans-serif;
  font-weight: 400;
  line-height: 1.2;
  text-transform: uppercase;
}

.zine-news-copy :deep(a) {
  color: var(--news-red);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

.zine-news-copy :deep(a:hover) {
  background: var(--news-ochre);
  color: var(--news-ink);
}

.zine-news-copy :deep(img),
.zine-news-copy :deep(video),
.zine-news-copy :deep(iframe) {
  max-width: 100%;
}

.zine-news-copy :deep(img) {
  height: auto;
  border: 2px solid var(--news-ink);
}

.zine-news-copy :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--news-red);
  background: var(--news-muted);
  font-style: italic;
}

.zine-news-copy :deep(pre) {
  max-width: 100%;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid var(--news-ink);
  background: var(--news-muted);
  font-size: 0.75rem;
}

/* Optional post metadata footer */
.zine-news-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 0.75rem;
  border-top: 2px dashed var(--news-ink);
}

.zine-news-footer-label {
  flex: 0 0 auto;
  padding: 0.3rem 0.45rem;
  background: var(--news-ink);
  color: var(--news-paper);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.zine-news-footer-content {
  min-width: 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  overflow-wrap: anywhere;
}

/* Tablet and mobile */
@media (max-width: 640px) {
  .zine-news-post {
    box-shadow: 3px 3px 0 var(--news-muted);
  }

  .zine-news-header {
    padding: 1rem;
  }

  .zine-news-kicker {
    margin-bottom: 0.75rem;
    font-size: 0.55rem;
    letter-spacing: 0.07em;
  }

  .zine-news-title {
    font-size: clamp(1.4rem, 7vw, 2rem);
    line-height: 1.12;
  }

  .zine-news-meta {
    margin-top: 0.75rem;
    font-size: 0.65rem;
  }

  .zine-news-body {
    padding: 1rem;
  }

  .zine-news-copy {
    font-size: 0.78rem;
    line-height: 1.8;
  }

  .zine-news-footer {
    flex-direction: column;
    gap: 0.6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .zine-news-post {
    transition: none;
  }
}
</style>
```