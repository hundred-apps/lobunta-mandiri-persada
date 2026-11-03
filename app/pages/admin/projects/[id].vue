<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama proyek', kind: 'text', bilingual: true, required: true },
  {
    name: 'slug',
    label: 'Slug URL',
    kind: 'slug',
    required: true,
    help: 'Dipakai di alamat /projects/<slug>. Otomatis dari nama proyek, bisa diubah.'
  },
  { name: 'clientName', label: 'Pemilik proyek / pemberi kerja', kind: 'text', required: true },
  { name: 'siteAddress', label: 'Lokasi proyek', kind: 'text', required: true, placeholder: { id: 'Contoh: Nagan Raya, Provinsi Aceh' } },
  { name: 'year', label: 'Tahun', kind: 'number', min: 1970, max: 2100, required: true },
  {
    name: 'contractValue',
    label: 'Nilai kontrak (Rp)',
    kind: 'text',
    help: 'Tulis angka saja tanpa titik atau Rp, contoh: 4300000000.'
  },
  { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, rows: 5 },
  { name: 'images', label: 'Foto proyek', kind: 'image', help: 'Opsional. Foto utama yang tampil di kartu dan halaman detail.' }
]
</script>

<template>
  <AdminResourceForm
    resource="projects"
    label="Proyek"
    singular="Proyek"
    base-path="/admin/projects"
    :fields="fields"
  />
</template>
