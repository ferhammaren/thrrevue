<template>
  <div class="overflow-x-auto border border-base-300">
    <table class="table table-zebra">

      <!-- OPTIONAL HEAD -->
      <thead v-if="headers?.length">
        <tr>
          <th v-for="header in headers" :key="header" class="title">
            {{ header }}
          </th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(value, columnIndex) in row" :key="columnIndex" :class="['text-base',
            {
              'font-bold': columnHeader && columnIndex === 0,
              'title': columnHeader && columnIndex === 0
            },
            containsJapanese(String(value))
              ? 'japanese'
              : 'content'
          ]">
            <slot name="cell" :value="value" :row="row" :rowIndex="rowIndex" :columnIndex="columnIndex">
              {{ value }}
            </slot>
          </td>

        </tr>
      </tbody>

    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  headers?: string[]
  rows: (string | number)[][]
  columnHeader?: boolean
  columnRow?: boolean
}>()
const containsJapanese = (text: string) => {
  return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text);
};

const containsJapaneseTable = (rows: string[][]) => {
  return rows.some(row =>
    row.some(cell =>
      containsJapanese(String(cell))
    )
  );
};
</script>