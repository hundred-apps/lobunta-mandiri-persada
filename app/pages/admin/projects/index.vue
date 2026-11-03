<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'images', label: 'Gambar', kind: 'image', width: 'w-20' },
  { key: 'name', label: 'Nama proyek', kind: 'bilingual' },
  { key: 'clientName', label: 'Pemilik proyek', width: 'w-56' },
  { key: 'siteAddress', label: 'Lokasi', width: 'w-48' },
  { key: 'year', label: 'Tahun', kind: 'number', width: 'w-20' },
  { key: 'contractValue', label: 'Nilai kontrak', width: 'w-40' }
]
</script>

<template>
  <AdminResourceList
    resource="projects"
    label="Proyek"
    singular="Proyek"
    help="Pengalaman proyek yang tampil di halaman publik /projects beserta halaman detailnya."
    base-path="/admin/projects"
    :columns="columns"
  />
</template>
