<script setup lang="ts">
import type { FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'name', label: t('admin.customersName'), kind: 'text', required: true },
  { name: 'quote', label: t('admin.customersQuote'), kind: 'textarea', bilingual: true, rows: 3, help: t('admin.customersQuoteHelp') },
  { name: 'image', label: t('admin.customersLogo'), kind: 'image' },
  {
    name: 'type',
    label: t('admin.customersType'),
    kind: 'select',
    required: false,
    options: [
      { value: 'civil', label: { id: 'Earthworks & Konstruksi Teknik', en: 'EARTHWORK & CIVIL CONSTRUCTION' } },
      { value: 'mining', label: { id: 'Kontraktor Pertambangan & Konstruksi Teknik Penunjang Pertambangan', en: 'Mining Contractor & Mine-Supporting Civil Works' } }
    ]
  }
])
</script>

<template>
  <AdminResourceForm
    resource="customers"
    :label="t('admin.customersTitle')"
    :singular="t('admin.customersSingular')"
    base-path="/admin/customers"
    :fields="fields"
  />
</template>