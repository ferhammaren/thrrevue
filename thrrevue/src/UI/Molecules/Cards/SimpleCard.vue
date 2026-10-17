```vue
<template>
  <article class="zine-card">
    <figure class="zine-card-image">
      <slot name="image" />
      <span class="zine-card-image-mark" aria-hidden="true">TKNTT / FILE</span>
    </figure>

    <div class="zine-card-body">
      <header v-if="$slots.title" class="zine-card-heading">
        <span class="zine-card-label" aria-hidden="true">/// FEATURE</span>
        <div class="zine-card-title title">
          <slot name="title" />
        </div>
      </header>

      <div class="zine-card-content content">
        <slot />
      </div>

      <footer v-if="$slots.actions" class="zine-card-actions">
        <slot name="actions" />
      </footer>
    </div>
  </article>
</template>

<style scoped>
.zine-card {
  --card-ink: var(--color-neutral, #171717);
  --card-paper: var(--color-base-100, #f5f3e9);
  --card-muted: var(--color-base-200, #deddd4);
  --card-red: var(--color-primary, #e00016);
  --card-ochre: var(--color-secondary, #c4b583);

  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: visible;
  border: 2px solid var(--card-ink);
  background: var(--card-paper);
  color: var(--card-ink);
  box-shadow: 5px 5px 0 var(--card-muted);
  transition:
    transform 120ms steps(2, end),
    box-shadow 120ms steps(2, end);
}

.zine-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--card-red);
}

.zine-card-image {
  position: relative;
  display: block;
  margin: 0;
  overflow: hidden;
  border-bottom: 2px solid var(--card-ink);
  background: var(--card-muted);
}

/* Make slotted images fill the image area */
.zine-card-image :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.08);
  transition: filter 180ms steps(3, end);
}

.zine-card:hover .zine-card-image :deep(img) {
  filter: grayscale(35%) contrast(1.1);
}

.zine-card-image-mark {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0.3rem 0.45rem;
  border: 1px solid var(--card-paper);
  background: var(--card-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.2;
}

.zine-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  gap: 0.9rem;
  padding: 1rem;
}

.zine-card-heading {
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--card-ink);
}

.zine-card-label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--card-red);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.zine-card-title {
  color: var(--card-ink);
  font-family: "Fjalla One", sans-serif;
  font-size: 1.4rem;
  line-height: 1.15;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.zine-card-content {
  flex: 1;
  min-width: 0;
  color: var(--card-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.8rem;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.zine-card-content :deep(p:first-child) {
  margin-top: 0;
}

.zine-card-content :deep(p:last-child) {
  margin-bottom: 0;
}

.zine-card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--card-ink);
}

/* Keep buttons consistent with the card's square-edged visual language */
.zine-card-actions :deep(.btn) {
  min-height: 2.4rem;
  border-radius: 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.zine-card :deep(a:focus-visible),
.zine-card :deep(button:focus-visible) {
  outline: 3px solid var(--card-red);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .zine-card,
  .zine-card-image :deep(img) {
    transition: none;
  }
}
</style>
```