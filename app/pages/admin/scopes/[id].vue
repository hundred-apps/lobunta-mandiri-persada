<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'title', label: t('admin.scopesName'), kind: 'text', required: true },
  { name: 'description', label: t('admin.scopesDescription'), kind: 'textarea', rows: 4 },
  {
    name: 'icon',
    label: t('admin.scopesIcon'),
    kind: 'icon',
    help: t('admin.scopesIconHelp')
  },
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
    resource="scopes"
    :label="t('admin.scopesTitle')"
    :singular="t('admin.scopesSingular')"
    :help="t('admin.scopesHelp')"
    base-path="/admin/scopes"
    :fields="fields"
  />
</template>
