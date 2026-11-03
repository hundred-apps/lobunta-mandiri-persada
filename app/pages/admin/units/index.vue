<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'images', label: 'Gambar', kind: 'image', width: 'w-20' },
  { key: 'name', label: 'Nama unit', width: 'w-64' },
  { key: 'status', label: 'Status', width: 'w-32' }
]
</script>

<template>
  <AdminResourceList
    resource="units"
    label="Unit"
    singular="Unit"
    help="Daftar unit/armada yang tampil di halaman publik /units."
    base-path="/admin/units"
    :columns="columns"
  />
</template>
