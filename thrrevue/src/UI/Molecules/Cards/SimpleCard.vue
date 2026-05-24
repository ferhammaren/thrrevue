<template>
  <div class="card bg-base-100">
    <figure>
      <slot name="image" />
    </figure>
    <div class="card-body title">
      <slot name="title" />
      <slot />
      <div class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

