<script setup lang="ts">
import { computed } from "vue";

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
  set: (val: string) => emit("update:modelValue", val)
});
</script>

<template>
  <div class="tabs tabs-boxed">
    <input
      v-for="tab in tabs"
      :key="tab.value"
      type="radio"
      name="tabs"
      class="tab"
      :aria-label="tab.label"
      :value="tab.value"
      v-model="activeTab"
    />
  </div>

  <div class="mt-4">
    <slot :activeTab="activeTab" />
  </div>
</template>