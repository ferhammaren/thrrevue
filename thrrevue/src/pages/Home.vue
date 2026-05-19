<template>
  <HomeLayout>
    <section class="p-6 space-y-6">
      <h1 class="text-3xl font-bold">
        Welcome
      </h1>


    <div class="columns-3 text-lg text-center font-bold">
      <div>
        <SimpleCard>
            <template #title>
              Calendar
            </template>
            
          </SimpleCard>
      </div>
       <div>
          <SimpleCard>
            <template #title>
              Latest Release
            </template>
            <template #image>
              <img :src="wildflower" />
            </template>
          </SimpleCard>
       </div>
        <div><SimpleCard>
            <template #title>
              News
            </template>
         
          </SimpleCard>
        </div>
    </div>



    </section>

  </HomeLayout>
</template>

<script setup lang="ts">
import HomeLayout from "@/layouts/HomeLayout.vue"
import SimpleCard from "@/UI/Molecules/Cards/SimpleCard.vue";
import wildflower from "@/UI/images/nil/wildflower.jpg"




</script>