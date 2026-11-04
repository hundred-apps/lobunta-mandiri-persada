<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama perusahaan', kind: 'text', required: true },
  { name: 'quote', label: 'Kutipan/keterangan', kind: 'textarea', bilingual: true, rows: 3, help: 'Teks singkat di bawah nama, mis. bidang usaha.' },
  { name: 'image', label: 'Logo (SVG atau PNG transparan)', kind: 'image' },
  {
    name: 'type',
    label: 'Jenis usaha / bidang',
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
    resource="customers"
    label="Klien"
    singular="Klien"
    base-path="/admin/customers"
    :fields="fields"
  />
</template>