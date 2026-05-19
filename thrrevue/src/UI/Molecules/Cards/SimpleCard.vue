<template>
  <div class="card bg-base-100 w-96 shadow-sm">
    <figure>
      <slot name="image" />
    </figure>

    <div class="card-body">
      <slot name="title" />
      <slot />
      <div class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>