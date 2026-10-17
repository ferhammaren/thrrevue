
<template>
  <nav
    class="zine-nav relative z-50 border-b-4 border-primary
           bg-neutral text-neutral-content"
    aria-label="Main navigation"
  >
    <div
      class="navbar min-h-16 gap-3 px-3 sm:px-5 lg:px-8"
    >
      <!-- START: Brand + mobile menu -->
      <div class="navbar-start w-auto flex-1 gap-3 lg:flex-none">
        <!-- Mobile dropdown -->
        <div class="dropdown dropdown-start lg:hidden">
          <button
            type="button"
            tabindex="0"
            class="zine-menu-toggle"
            aria-label="Open navigation menu"
          >
            <span aria-hidden="true" class="text-xl leading-none">
              ☰
            </span>
            <span class="hidden sm:inline">MENU</span>
          </button>

          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content z-[60]
                   mt-3 w-[min(18rem,calc(100vw-1.5rem))]
                   border-2 border-neutral-content
                   bg-neutral p-2 text-neutral-content
                   shadow-[5px_5px_0_#e00016]"
          >
            <li
              class="menu-label border-b border-neutral-content/30
                     font-mono text-[10px] uppercase tracking-widest"
            >
              Navigation / Index
            </li>

            <MenuItems :items="items ?? []" />
          </ul>
        </div>

        <!-- Brand -->
        <RouterLink
          to="/"
          class="zine-brand"
          aria-label="TKNTT home"
        >
          {{ brand || "TKNTT" }}<span>!</span>
        </RouterLink>
      </div>

      <!-- CENTER: Desktop navigation -->
      <div class="navbar-center hidden flex-1 lg:flex">
        <ul class="menu menu-horizontal zine-menu px-1">
          <MenuItems :items="items ?? []" />
        </ul>
      </div>

      <!-- END: Optional action -->
      <div v-if="actionLabel" class="navbar-end w-auto">
        <RouterLink
          to="/releases"
          class="zine-nav-action"
        >
          {{ actionLabel }} <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </div>

    <!-- Printed index strip -->
    <div
      class="flex items-center justify-between gap-3
             border-t border-neutral-content/25
             px-4 py-1.5 font-mono text-[9px]
             font-bold uppercase tracking-[0.16em]
             text-neutral-content/70 sm:px-6"
    >
      <span>Vocal / guitar</span>
      <span class="text-secondary">No. 001 — Est. 1972</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import MenuItems from "./MenuItems.vue"

type MenuItem = {
  label: string
  to?: string
  children?: MenuItem[]
}

withDefaults(
  defineProps<{
    brand?: string
    actionLabel?: string
    items?: MenuItem[]
  }>(),
  {
    brand: "TKNTT",
    actionLabel: "",
    items: () => [],
  },
)
</script>

<style scoped>
.zine-nav {
  font-family: "IBM Plex Mono", monospace;
}

/* Brand block */
.zine-brand {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  background: #e00016;
  color: #fff;
  padding: 0.4rem 0.65rem;
  font-family: "Fjalla One", sans-serif;
  font-size: 1.65rem;
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 1;
  text-transform: uppercase;
  border: 2px solid #f5f3e9;
  box-shadow: 3px 3px 0 #f5f3e9;
  transition: transform 100ms steps(2, end);
}

.zine-brand span {
  color: #c4b583;
}

.zine-brand:hover {
  transform: translate(-1px, -1px) rotate(-1deg);
}

/* Mobile menu trigger */
.zine-menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0.45rem 0.6rem;
  border: 2px solid #f5f3e9;
  background: transparent;
  color: #f5f3e9;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
}

.zine-menu-toggle:hover,
.zine-menu-toggle:focus-visible {
  background: #c4b583;
  color: #171717;
}

.zine-menu-toggle:focus-visible,
.zine-brand:focus-visible,
.zine-nav-action:focus-visible {
  outline: 3px solid #c4b583;
  outline-offset: 4px;
}

/* Desktop menu: MenuItems renders the individual links */
.zine-menu :deep(a),
.zine-menu :deep(.menu-item) {
  border-radius: 0;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.zine-menu :deep(a:hover),
.zine-menu :deep(a:focus-visible) {
  background: #c4b583;
  color: #171717;
}

/* Optional CTA */
.zine-nav-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.7rem;
  border: 2px solid #c4b583;
  background: #c4b583;
  color: #171717;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  transition: background 100ms steps(2, end),
              color 100ms steps(2, end);
}

.zine-nav-action:hover {
  background: #e00016;
  border-color: #e00016;
  color: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .zine-brand,
  .zine-nav-action {
    transition: none;
  }
}
</style>
