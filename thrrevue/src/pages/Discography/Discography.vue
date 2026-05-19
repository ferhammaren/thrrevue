<template>
  <MainLayout>
      <h1 class="text-3xl font-bold">
        Discography
      </h1>
    <section class="p-2 space-y-2">
      <Accordion>
        <template #title>
          <img :src="logo" class="max-h-8" />
        </template>
        <div>
          <Card />
        </div>
      </Accordion>
    </section>

  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import Accordion from "@/UI/Molecules/Accordion.vue";
import logo from "@/UI/images/MaliceMizer/logo.png"
import Card from "@/UI/Molecules/Cards/SimpleCard.vue"
</script>