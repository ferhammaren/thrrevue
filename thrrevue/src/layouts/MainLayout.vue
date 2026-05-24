<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-base-100 to-base-200">
    <Banner />
    <!-- NAVBAR -->
    <Navbar brand="TKNTT" :items="navItems" />

    <!-- PAGE CONTENT -->
    <main class="flex-1">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <slot />
      </div>
    </main>

    <!-- FOOTER -->
    <Footer />

  </div>
</template>

<script setup lang="ts">
import Navbar from "@/UI/Organisms/Navbar.vue"
import Footer from "@/UI/Organisms/Footer.vue"
import Banner from "@/UI/Atoms/Banner.vue";
const navItems = [
  { label: "Home", to: "/" },
  { label: "Bio", to: "/Bio" },
  {
    label: "Projects", to: "/Projects",
    children: [
      { label: "Malice Mizer", to: "/Projects/MALICEMIZER/About" },
      { label: "Mega 8 Ball", to: "/Projects/Mega 8 Ball/About" },
      { label: "nil", to: "/Projects/nil/About" },
      { label: "zigzo", to: "/Projects/zigzo/About" },
      { label: "The Black Comet Club Band", to: "/Projects/The Black Comet Club Band/About" },
      { label: "TetsuJin", to: "/Projects/TetsuJin/About" },
      { label: "Indies Denryoku", to: "/Projects/Indies Denryoku/About" },
      { label: "THEJUNEJULYAUGUST", to: "/Projects/THEJUNEJULYAUGUST/About" },
      { label: "DISCO VOLANTE", to: "/Projects/DISCO VOLANTE/About" },
      { label: "Sillys", to: "/Projects/Sillys/About" },
    ]
  },
  { label: "Discography", to: "/Discography" },
  { label: "Tour Dates", to: "/TourDates" },
  { label: "Media", to: "/Media" },
  { label: "News", to: "/News" },
  { label: "About", to: "/About" }
]
</script>