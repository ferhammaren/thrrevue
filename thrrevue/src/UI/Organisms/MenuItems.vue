<template>
  <li
    v-for="item in items"
    :key="item.label"
    class="zine-menu-item"
  >
    <!-- Parent item with children -->
    <details v-if="item.children?.length">
      <summary class="zine-menu-link zine-menu-parent">
        <span>{{ item.label }}</span>
        <span class="zine-menu-indicator" aria-hidden="true">+</span>
      </summary>

      <!-- Optional parent destination -->
      <RouterLink
        v-if="item.to"
        :to="item.to"
        class="zine-menu-sublink zine-menu-parent-route"
        @click.stop
      >
        INDEX: {{ item.label }}
        <span aria-hidden="true">↗</span>
      </RouterLink>

      <!-- Nested items -->
      <ul class="zine-submenu">
        <MenuItems :items="item.children" />
      </ul>
    </details>

  <!-- Normal item -->
    <RouterLink
      v-else-if="item.to"
      :to="item.to"
      class="zine-menu-link"
      active-class="zine-menu-active"
    >
      <span>{{ item.label }}</span>
      <span class="zine-menu-arrow" aria-hidden="true">↗</span>
    </RouterLink>

    <!-- Label without a destination -->
    <span v-else class="zine-menu-link zine-menu-label">
      {{ item.label }}
    </span>
  </li>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router"

type MenuItem = {
  label: string
  to?: string
  children?: MenuItem[]
}

defineProps<{
  items: MenuItem[]
}>()
</script>
<style scoped>
.zine-menu-item {
  position: relative;
  color: inherit;
  font-family: "IBM Plex Mono", monospace;
  list-style: none;
}
.zine-menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 0;
  color: inherit;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.4;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 100ms steps(2, end),
    color 100ms steps(2, end),
    border-color 100ms steps(2, end);
}
.zine-menu-parent {
  list-style: none;
}
.zine-menu-parent::-webkit-details-marker {
  display: none;
}

.zine-menu-parent::marker {
  content: "";
}
.zine-menu-parent:hover,
.zine-menu-link:hover,
.zine-menu-link:focus-visible {
  background: #c4b583;
  border-color: #171717;
  color: #171717;
}
.zine-menu-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid currentColor;
  font-size: 1rem;
  line-height: 1;
}
details[open] > .zine-menu-parent {
  background: #e00016;
  border-color: #171717;
  color: #ffffff;
}
details[open] > .zine-menu-parent .zine-menu-indicator {
  color: #ffffff;
}
details[open] > .zine-menu-parent .zine-menu-indicator::before {
  content: "";
}
.zine-menu-arrow {
  color: #e00016;
  font-size: 0.8rem;
  opacity: 0;
  transform: translateX(-3px);
  transition: opacity 100ms steps(2, end),
              transform 100ms steps(2, end);
}
.zine-menu-link:hover .zine-menu-arrow,
.zine-menu-link:focus-visible .zine-menu-arrow {
  opacity: 1;
  transform: translateX(0);
}
.zine-menu-link.zine-menu-active {
  border-left: 4px solid #e00016;
  background: #deddd4;
  color: #171717;
}
.zine-submenu {
  margin: 0.2rem 0 0.45rem 0.75rem;
  padding: 0 0 0 0.5rem;
  border-left: 2px solid #c4b583;
}
.zine-submenu :deep(.zine-menu-link) {
  padding: 0.55rem 0.65rem;
  font-size: 0.7rem;
}

.zine-submenu :deep(.zine-menu-active) {
  border-left-color: #e00016;
}
.zine-menu-sublink {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0.25rem 0 0 0.75rem;
  padding: 0.45rem 0.65rem;
  border-left: 2px solid #e00016;
  color: inherit;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.65rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
}
.zine-menu-sublink:hover,
.zine-menu-sublink:focus-visible {
  background: #c4b583;
  color: #171717;
}
.zine-menu-label {
  cursor: default;
  opacity: 0.7;
}

.zine-menu-link:focus-visible,
.zine-menu-sublink:focus-visible {
  outline: 2px solid #c4b583;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .zine-menu-link,
  .zine-menu-arrow {
    transition: none;
  }
}
</style>