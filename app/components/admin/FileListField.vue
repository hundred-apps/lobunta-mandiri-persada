<script setup lang="ts">
/**
 * Daftar dokumen berberkas (field kind `list`).
 *
 * Dipakai untuk company profile: tiap baris punya satu berkas PDF,
 * judul dua bahasa, dan divisi. Berkas baru disimpan sebagai File dan
 * dikirim multipart oleh AdminResourceForm; dokumen lama dikirim lewat
 * `mediaId` supaya backend tidak membuat salinan baru.
 */

import type { ListRowField } from '~/admin/types'

interface ListRow {
  mediaId?: number | null
  url?: string
  title?: { id?: string; en?: string }
  [key: string]: unknown
}

/** Pemeriksaan File yang tidak tertimpa prop `file` di template. */
const FileCtor = File

const props = withDefaults(defineProps<{
  modelValue?: unknown[] | ListRow[]
  label?: string
  disabled?: boolean
  columns?: ListRowField[]
  max?: number
}>(), { max: 20 })

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>()

const previewBase = computed(() => {
  const config = useRuntimeConfig()
  return String(config.public.apiBase || '').replace(/\/+$/, '').replace(/\/api$/, '')
})

const current = computed<ListRow[]>(() => (Array.isArray(props.modelValue) ? (props.modelValue as ListRow[]) : []))
const columns = computed<ListRowField[]>(() => props.columns ?? [])
const isFull = computed(() => current.value.length >= props.max)

function abs(url: string): string {
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  return `${previewBase.value}${url.startsWith('/') ? '' : '/'}${url}`
}

function set(rows: ListRow[]) {
  emit('update:modelValue', rows)
}

function update(index: number, patch: Record<string, unknown>) {
  set(current.value.map((row, i) => (i === index ? { ...row, ...patch } : row)))
}

function setTitle(index: number, side: 'id' | 'en', value: string) {
  const row = current.value[index]
  update(index, { title: { ...(row?.title ?? {}), [side]: value } })
}

function onFile(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  update(index, { file, url: URL.createObjectURL(file) })
}

function fileNameOf(row: ListRow): string {
  const file = row.file
  if (file instanceof File) return file.name
  const url = String(row.url || '')
  return url ? decodeURIComponent(url.split('/').pop() || url) : ''
}

function addRow() {
  if (isFull.value) return
  const row: ListRow = { title: { id: '', en: '' } }
  for (const column of columns.value) {
    if (column.kind !== 'file' && column.kind !== 'bilingual') row[column.name] = column.options?.[0]?.value ?? ''
  }
  set([...current.value, row])
}

function removeRow(index: number) {
  set(current.value.filter((_, i) => i !== index))
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="!current.length" class="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-white/10">
      <UiIcon name="document" :size="32" class="mx-auto text-slate-400" />
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Belum ada dokumen.
      </p>
    </div>

    <div
      v-for="(row, index) in current"
      :key="index"
      class="rounded-xl border border-slate-200 p-4 dark:border-white/10"
    >
      <div class="flex items-start justify-between gap-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Dokumen {{ index + 1 }}
        </span>
        <button
          type="button"
          class="btn-ghost !px-2 !py-1 text-xs text-red-600"
          :disabled="disabled"
          @click="removeRow(index)"
        >
          Hapus
        </button>
      </div>

      <div class="mt-3 grid gap-3 lg:grid-cols-2">
        <template v-for="column in columns" :key="column.name">
          <label v-if="column.kind === 'file'" class="lg:col-span-2 flex flex-wrap items-center gap-3">
            <span class="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 dark:border-white/10 dark:bg-white/5">
              <UiIcon name="document" :size="22" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                {{ fileNameOf(row) || 'Belum ada berkas' }}
              </span>
              <span class="block text-xs text-slate-500">
                {{ column.label }}
              </span>
            </span>
            <span class="flex flex-wrap gap-2">
              <a
                v-if="row.url"
                :href="abs(String(row.url))"
                target="_blank"
                rel="noopener"
                class="btn-outline !py-2"
              >
                Lihat
              </a>
              <label class="btn-outline !py-2 cursor-pointer">
                {{ row.file instanceof FileCtor || row.url ? 'Ganti berkas' : 'Pilih berkas' }}
                <input
                  type="file"
                  class="hidden"
                  :accept="column.accept || 'application/pdf,.pdf'"
                  :disabled="disabled"
                  @change="onFile(index, $event)"
                >
              </label>
            </span>
          </label>

          <label v-else-if="column.kind === 'bilingual'" class="grid gap-2 sm:grid-cols-2 lg:col-span-2">
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400 sm:col-span-2">{{ column.label }}</span>
            <input
              :value="row.title?.id ?? ''"
              type="text"
              class="field"
              :placeholder="column.placeholder?.id || 'Indonesia'"
              :disabled="disabled"
              @input="setTitle(index, 'id', ($event.target as HTMLInputElement).value)"
            >
            <input
              :value="row.title?.en ?? ''"
              type="text"
              class="field"
              :placeholder="column.placeholder?.en || 'English'"
              :disabled="disabled"
              @input="setTitle(index, 'en', ($event.target as HTMLInputElement).value)"
            >
          </label>

          <label v-else-if="column.kind === 'select'" class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400">{{ column.label }}</span>
            <select
              :value="String(row[column.name] ?? '')"
              class="field"
              :disabled="disabled"
              @change="update(index, { [column.name]: ($event.target as HTMLSelectElement).value })"
            >
              <option v-for="option in column.options || []" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <label v-else class="flex flex-col gap-1.5">
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400">{{ column.label }}</span>
            <input
              :value="String(row[column.name] ?? '')"
              type="text"
              class="field"
              :disabled="disabled"
              @input="update(index, { [column.name]: ($event.target as HTMLInputElement).value })"
            >
          </label>
        </template>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3">
      <button type="button" class="btn-outline !py-2" :disabled="disabled || isFull" @click="addRow">
        Tambah dokumen
      </button>
      <span class="text-xs text-slate-500">{{ current.length }} dokumen</span>
    </div>
  </div>
</template>
