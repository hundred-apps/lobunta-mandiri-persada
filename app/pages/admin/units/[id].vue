<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama unit', kind: 'text', required: true, placeholder: { id: 'Contoh: Dump Truck DT-001' } },
  {
    name: 'status',
    label: 'Status',
    kind: 'select',
    required: true,
    options: [
      { value: 'available', label: 'Tersedia' },
      { value: 'maintenance', label: 'Perawatan' },
      { value: 'inactive', label: 'Tidak aktif' }
    ]
  },
  { name: 'images', label: 'Foto unit', kind: 'image', help: 'Opsional. Foto yang tampil di kartu unit.' }
]
</script>

<template>
  <AdminResourceForm
    resource="units"
    label="Unit"
    singular="Unit"
    base-path="/admin/units"
    :fields="fields"
  />
</template>
