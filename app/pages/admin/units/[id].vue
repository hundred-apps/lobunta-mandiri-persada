<script setup lang="ts">
import type { FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'name', label: t('admin.unitsName'), kind: 'text', required: true, placeholder: { id: 'Contoh: Dump Truck DT-001', en: 'e.g. Dump Truck DT-001' } },
  {
    name: 'status',
    label: t('admin.unitsStatus'),
    kind: 'select',
    required: true,
    options: [
      { value: 'available', label: t('admin.unitsStatusAvailable') },
      { value: 'maintenance', label: t('admin.unitsStatusMaintenance') },
      { value: 'inactive', label: t('admin.unitsStatusInactive') }
    ]
  },
  { name: 'images', label: t('admin.unitsImages'), kind: 'image', help: t('admin.unitsImagesHelp') }
])
</script>

<template>
  <AdminResourceForm
    resource="units"
    :label="t('admin.unitsTitle')"
    :singular="t('admin.unitsSingular')"
    base-path="/admin/units"
    :fields="fields"
  />
</template>
