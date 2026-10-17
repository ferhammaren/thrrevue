<script setup lang="ts">
import { computed, useId } from "vue";

type Tab = {
  label: string;
  value: string;
};

const props = defineProps<{
  tabs: Tab[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const activeTab = computed({
  get: () => props.modelValue,
  set: (val: string) => emit("update:modelValue", val),
});

const instanceId = useId();

function tabId(value: string) {
  return `${instanceId}-tab-${encodeURIComponent(value)}`;
}

function panelId(value: string) {
  return `${instanceId}-panel-${encodeURIComponent(value)}`;
}

function selectTab(value: string) {
  activeTab.value = value;
}

function handleKeydown(event: KeyboardEvent, currentIndex: number) {
  const { key } = event;
  let nextIndex: number;

  if (key === "ArrowRight" || key === "ArrowDown") {
    nextIndex = (currentIndex + 1) % props.tabs.length;
  } else if (key === "ArrowLeft" || key === "ArrowUp") {
    nextIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length;
  } else if (key === "Home") {
    nextIndex = 0;
  } else if (key === "End") {
    nextIndex = props.tabs.length - 1;
  } else {
    return;
  }

  event.preventDefault();

  const nextTab = props.tabs[nextIndex];
  if (!nextTab) return;

  selectTab(nextTab.value);

  document.getElementById(tabId(nextTab.value))?.focus();
}
</script>

<template>
  <section class="zine-tabs">
    <div class="zine-tabs-header">
      <span class="zine-tabs-label">/// INDEX</span>
      <span class="zine-tabs-count">
        {{ String(tabs.length).padStart(2, "0") }} SECTIONS
      </span>
    </div>

    <div
      class="zine-tabs-list"
      role="tablist"
      aria-label="Content sections"
    >
      <button
        v-for="(tab, index) in tabs"
        :id="tabId(tab.value)"
        :key="tab.value"
        type="button"
        role="tab"
        class="zine-tab"
        :class="{ 'zine-tab-active': activeTab === tab.value }"
        :aria-selected="activeTab === tab.value"
        :aria-controls="panelId(tab.value)"
        :tabindex="activeTab === tab.value ? 0 : -1"
        @click="selectTab(tab.value)"
        @keydown="handleKeydown($event, index)"
      >
        <span class="zine-tab-number">
          {{ String(index + 1).padStart(2, "0") }}
        </span>
        <span class="zine-tab-label">{{ tab.label }}</span>
        <span class="zine-tab-mark" aria-hidden="true">↗</span>
      </button>
    </div>

    <div
      v-for="tab in tabs"
      v-show="activeTab === tab.value"
      :id="panelId(tab.value)"
      :key="tab.value"
      class="zine-tab-panel"
      role="tabpanel"
      :aria-labelledby="tabId(tab.value)"
      tabindex="0"
    >
      <slot :activeTab="activeTab" />
    </div>
  </section>
</template>

<style scoped>
.zine-tabs {
  --tabs-ink: var(--color-neutral, #171717);
  --tabs-paper: var(--color-base-100, #f5f3e9);
  --tabs-muted: var(--color-base-200, #deddd4);
  --tabs-red: var(--color-primary, #e00016);
  --tabs-ochre: var(--color-secondary, #c4b583);

  width: 100%;
  min-width: 0;
  color: var(--tabs-ink);
}

/* Small editorial strip above the tabs */
.zine-tabs-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.zine-tabs-label {
  color: var(--tabs-red);
}

.zine-tabs-count {
  color: var(--tabs-ink);
  opacity: 0.7;
}

/* Horizontal scrolling keeps tabs usable on narrow screens */
.zine-tabs-list {
  display: flex;
  width: 100%;
  min-width: 0;
  gap: 0.35rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  border: 2px solid var(--tabs-ink);
  padding: 0.4rem;
  background: var(--tabs-muted);
  scrollbar-width: thin;
  scrollbar-color: var(--tabs-red) var(--tabs-muted);
}

.zine-tab {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
  min-height: 2.9rem;
  max-width: 100%;
  padding: 0.65rem 0.8rem;
  border: 1px solid transparent;
  border-radius: 0;
  background: transparent;
  color: var(--tabs-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 100ms steps(2, end),
    color 100ms steps(2, end),
    border-color 100ms steps(2, end);
}

.zine-tab:hover {
  border-color: var(--tabs-ink);
  background: var(--tabs-ochre);
  color: var(--tabs-ink);
}

.zine-tab-active,
.zine-tab-active:hover {
  border-color: var(--tabs-ink);
  background: var(--tabs-red);
  color: #fff;
}

.zine-tab-number {
  flex: 0 0 auto;
  font-size: 0.6rem;
  opacity: 0.75;
}

.zine-tab-label {
  overflow-wrap: anywhere;
}

.zine-tab-mark {
  flex: 0 0 auto;
  margin-left: 0.25rem;
  opacity: 0;
  transform: translateX(-3px);
  transition:
    opacity 100ms steps(2, end),
    transform 100ms steps(2, end);
}

.zine-tab:hover .zine-tab-mark,
.zine-tab-active .zine-tab-mark {
  opacity: 1;
  transform: translateX(0);
}

.zine-tab:focus-visible {
  z-index: 1;
  outline: 3px solid var(--tabs-red);
  outline-offset: -4px;
}

/* Content panel */
.zine-tab-panel {
  min-width: 0;
  margin-top: 1rem;
  padding: 1rem;
  border: 2px solid var(--tabs-ink);
  background: var(--tabs-paper);
  box-shadow: 4px 4px 0 var(--tabs-muted);
  overflow-wrap: anywhere;
}

.zine-tab-panel:focus-visible {
  outline: 3px solid var(--tabs-red);
  outline-offset: 3px;
}

/* Mobile adjustments */
@media (max-width: 480px) {
  .zine-tabs-header {
    font-size: 0.55rem;
  }

  .zine-tabs-list {
    gap: 0.25rem;
    padding: 0.3rem;
  }

  .zine-tab {
    min-height: 2.75rem;
    gap: 0.45rem;
    padding: 0.6rem 0.65rem;
    font-size: 0.68rem;
  }

  .zine-tab-panel {
    margin-top: 0.75rem;
    padding: 0.75rem;
    box-shadow: 3px 3px 0 var(--tabs-muted);
  }
}

@media (prefers-reduced-motion: reduce) {
  .zine-tab,
  .zine-tab-mark {
    transition: none;
  }
}
</style>