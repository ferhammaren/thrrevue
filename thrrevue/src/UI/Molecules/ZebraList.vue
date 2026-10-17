<template>
  <div class="zine-table-wrap" role="region" aria-label="Data table" tabindex="0">
    <table class="zine-table">
      <!-- Optional header -->
      <thead v-if="headers?.length">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="header"
            scope="col"
            :class="{
              'zine-table-first-column': index === 0 && columnRow,
            }"
          >
            <span class="zine-table-header-index">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <span>{{ header }}</span>
          </th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <template v-for="(value, columnIndex) in row" :key="columnIndex">
            <!-- First column as row header -->
            <th
              v-if="columnRow && columnIndex === 0"
              scope="row"
              class="zine-table-row-header title"
              :class="containsJapanese(String(value)) ? 'japanese' : ''"
            >
              <slot
                name="cell"
                :value="value"
                :row="row"
                :rowIndex="rowIndex"
                :columnIndex="columnIndex"
              >
                {{ value }}
              </slot>
            </th>

            <!-- Regular data cell -->
            <td
              v-else
              :class="[
                containsJapanese(String(value)) ? 'japanese' : 'content',
                {
                  'zine-table-emphasis':
                    columnHeader && columnIndex === 0 && !columnRow,
                },
              ]"
            >
              <slot
                name="cell"
                :value="value"
                :row="row"
                :rowIndex="rowIndex"
                :columnIndex="columnIndex"
              >
                {{ value }}
              </slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <div class="zine-table-footer" aria-hidden="true">
      <span>TKNTT / DATA SHEET</span>
      <span>{{ rows.length }} ENTRIES ///</span>
    </div>
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
  return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text)
}
</script>

<style scoped>
.zine-table-wrap {
  --table-ink: var(--color-neutral, #171717);
  --table-paper: var(--color-base-100, #f5f3e9);
  --table-muted: var(--color-base-200, #deddd4);
  --table-red: var(--color-primary, #e00016);
  --table-ochre: var(--color-secondary, #c4b583);

  width: 100%;
  min-width: 0;
  overflow-x: auto;
  border: 2px solid var(--table-ink);
  background: var(--table-paper);
  color: var(--table-ink);
  box-shadow: 4px 4px 0 var(--table-muted);
  scrollbar-width: thin;
  scrollbar-color: var(--table-red) var(--table-muted);
}

.zine-table-wrap:focus-visible {
  outline: 3px solid var(--table-red);
  outline-offset: 3px;
}

.zine-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 0.85rem;
  text-align: left;
}

/* Red editorial header */
.zine-table thead {
  background: var(--table-red);
  color: #fff;
}

.zine-table th,
.zine-table td {
  padding: 0.8rem 1rem;
  border-right: 1px solid var(--table-ink);
  border-bottom: 1px solid var(--table-ink);
  vertical-align: top;
  overflow-wrap: anywhere;
}

.zine-table tr > :last-child {
  border-right: 0;
}

.zine-table thead th {
  font-family: "Fjalla One", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.3;
  text-transform: uppercase;
}

.zine-table-header-index {
  display: block;
  margin-bottom: 0.25rem;
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  opacity: 0.8;
}

/* Alternating photocopied rows */
.zine-table tbody tr {
  background: var(--table-paper);
  transition: background-color 100ms steps(2, end);
}

.zine-table tbody tr:nth-child(even) {
  background: var(--table-muted);
}

.zine-table tbody tr:hover {
  background: var(--table-ochre);
}

/* Strong first-column treatment */
.zine-table .zine-table-row-header {
  min-width: 7rem;
  background: var(--table-ink);
  color: var(--table-paper);
  font-family: "Fjalla One", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  text-transform: uppercase;
}

.zine-table .zine-table-emphasis {
  font-weight: 700;
  font-family: "Fjalla One", sans-serif;
  font-size: 0.95rem;
}

/* Respect Japanese text styling */
.zine-table .japanese {
  font-family: "BIZ UDPMincho", serif;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

/* Keep global content typography readable in cells */
.zine-table td.content {
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.78rem;
  line-height: 1.7;
}

/* Footer strip */
.zine-table-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-top: 2px solid var(--table-ink);
  background: var(--table-paper);
  color: var(--table-ink);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

/* Mobile: tighter cells, horizontal scrolling when necessary */
@media (max-width: 640px) {
  .zine-table {
    font-size: 0.78rem;
  }

  .zine-table th,
  .zine-table td {
    padding: 0.65rem 0.7rem;
  }

  .zine-table thead th {
    font-size: 0.8rem;
  }

  .zine-table-header-index {
    font-size: 0.5rem;
  }

  .zine-table .zine-table-row-header,
  .zine-table .zine-table-emphasis {
    font-size: 0.85rem;
  }

  .zine-table td.content {
    font-size: 0.72rem;
  }

  .zine-table-footer {
    font-size: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .zine-table tbody tr {
    transition: none;
  }
}
</style>