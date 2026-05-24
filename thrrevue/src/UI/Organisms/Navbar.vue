<template>
  <div class="navbar bg-base-100 shadow-sm relative z-50">

    <!-- START -->
    <div class="navbar-start">

      <!-- MOBILE DROPDOWN -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost text-xl lg:hidden">
          ☰
        </div>

        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box w-3xl shadow">
          <MenuItems :items="items ?? []" />
        </ul>
      </div>

    </div>

    <!-- CENTER (DESKTOP) -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <MenuItems :items="items ?? []" />
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import MenuItems from "./MenuItems.vue"

type MenuItem = {
  label: string
  to?: string
  children?: MenuItem[]
}

defineProps<{
  brand?: string
  actionLabel?: string
  items?: MenuItem[]
}>()
</script>