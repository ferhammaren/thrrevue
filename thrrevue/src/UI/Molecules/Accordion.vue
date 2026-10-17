
<template>
  <details class="zine-collapse">
    <summary class="zine-collapse-title">
      <span class="zine-collapse-marker" aria-hidden="true">+</span>

      <span class="zine-collapse-heading title">
        <slot name="title" />
      </span>

      <span class="zine-collapse-index" aria-hidden="true">OPEN FILE</span>
    </summary>

    <div class="zine-collapse-content">
      <div class="zine-collapse-content-inner content">
        <slot />
      </div>

      <div class="zine-collapse-footer" aria-hidden="true">
        <span>TKNTT / ARCHIVE</span>
        <span>END OF FILE ///</span>
      </div>
    </div>
  </details>
</template>

<style scoped>
.zine-collapse {
  --collapse-ink: var(--color-neutral, #171717);
  --collapse-paper: var(--color-base-100, #f5f3e9);
  --collapse-muted: var(--color-base-200, #deddd4);
  --collapse-red: var(--color-primary, #e00016);
  --collapse-ochre: var(--color-secondary, #c4b583);

  min-width: 0;
  border: 2px solid var(--collapse-ink);
  background: var(--collapse-paper);
  color: var(--collapse-ink);
  box-shadow: 4px 4px 0 var(--collapse-muted);
  transition:
    box-shadow 120ms steps(2, end),
    transform 120ms steps(2, end);
}

.zine-collapse:hover {
  box-shadow: 6px 6px 0 var(--collapse-red);
  transform: translate(-1px, -1px);
}

/* Clickable heading */
.zine-collapse-title {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 4rem;
  padding: 0.9rem 1rem;
  cursor: pointer;
  list-style: none;
}

.zine-collapse-title::-webkit-details-marker {
  display: none;
}

.zine-collapse-title::marker {
  content: "";
}

/* Plus / minus toggle */
.zine-collapse-marker {
  display: inline-flex;
  flex: 0 0 2rem;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--collapse-ink);
  background: var(--collapse-red);
  color: #fff;
  font-family: "IBM Plex Mono", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.zine-collapse-marker::before {
  content: "+";
}

.zine-collapse-marker {
  font-size: 0;
}

.zine-collapse-marker::before {
  font-size: 1.25rem;
}

.zine-collapse[open] .zine-collapse-marker::before {
  content: "−";
}

.zine-collapse-heading {
  flex: 1;
  min-width: 0;
  color: var(--collapse-ink);
  font-family: "Fjalla One", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.25;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.zine-collapse-index {
  flex: 0 0 auto;
  padding: 0.25rem 0.4rem;
  background: var(--collapse-ochre);
  color: var(--collapse-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.zine-collapse-title:hover .zine-collapse-heading {
  color: var(--collapse-red);
}

.zine-collapse-title:hover .zine-collapse-marker {
  background: var(--collapse-ink);
  color: var(--collapse-paper);
}

.zine-collapse-title:focus-visible {
  outline: 3px solid var(--collapse-red);
  outline-offset: -4px;
}

/* Expanded content */
.zine-collapse-content {
  padding: 0 1rem 1rem;
  border-top: 2px dashed var(--collapse-ink);
}

.zine-collapse-content-inner {
  padding-top: 1rem;
  color: var(--collapse-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.82rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.zine-collapse-content-inner :deep(p:first-child) {
  margin-top: 0;
}

.zine-collapse-content-inner :deep(p:last-child) {
  margin-bottom: 0;
}

.zine-collapse-content-inner :deep(img),
.zine-collapse-content-inner :deep(video),
.zine-collapse-content-inner :deep(iframe) {
  max-width: 100%;
}

.zine-collapse-content-inner :deep(pre) {
  max-width: 100%;
  overflow-x: auto;
}

.zine-collapse-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--collapse-muted);
  color: var(--collapse-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

/* Mobile adjustments */
@media (max-width: 480px) {
  .zine-collapse {
    box-shadow: 3px 3px 0 var(--collapse-muted);
  }

  .zine-collapse-title {
    gap: 0.6rem;
    min-height: 3.5rem;
    padding: 0.7rem;
  }

  .zine-collapse-marker {
    flex-basis: 1.8rem;
    width: 1.8rem;
    height: 1.8rem;
  }

  .zine-collapse-heading {
    font-size: 1rem;
  }

  .zine-collapse-index {
    display: none;
  }

  .zine-collapse-content {
    padding: 0 0.75rem 0.75rem;
  }

  .zine-collapse-content-inner {
    padding-top: 0.75rem;
    font-size: 0.75rem;
    line-height: 1.75;
  }

  .zine-collapse-footer {
    font-size: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .zine-collapse {
    transition: none;
  }
}
</style>
