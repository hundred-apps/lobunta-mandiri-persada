<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama proyek', kind: 'text', required: true },
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
  { name: 'images', label: 'Foto proyek', kind: 'image', help: 'Opsional. Foto utama yang tampil di kartu dan halaman detail.' },
  {
    name: 'type',
    label: 'Jenis pekerjaan',
    kind: 'select',
    required: false,
    options: [
      { value: 'civil', label: { id: 'Earthworks & Konstruksi Teknik', en: 'EARTHWORK & CIVIL CONSTRUCTION' } },
      { value: 'mining', label: { id: 'Kontraktor Pertambangan & Konstruksi Teknik Penunjang Pertambangan', en: 'Mining Contractor & Mine-Supporting Civil Works' } }
    ]
  }
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
