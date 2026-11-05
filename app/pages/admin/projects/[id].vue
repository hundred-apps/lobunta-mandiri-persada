<script setup lang="ts">
import type { FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'name', label: t('admin.projectsName'), kind: 'text', required: true },
  {
    name: 'clientName',
    label: t('admin.projectsClientName'),
    kind: 'select',
    required: true,
    optionsFrom: { resource: 'customers', labelKey: 'name', valueKey: 'name' },
    help: t('admin.projectsClientHelp')
  },
  { name: 'siteAddress', label: t('admin.projectsSiteAddress'), kind: 'text', required: true, placeholder: { id: 'Contoh: Nagan Raya, Provinsi Aceh', en: 'e.g. Nagan Raya, Aceh' } },
  { name: 'year', label: t('admin.projectsYear'), kind: 'number', min: 1970, max: 2100, required: true },
  {
    name: 'contractValue',
    label: t('admin.projectsContractValue'),
    kind: 'text',
    help: t('admin.projectsContractValueHelp')
  },
  { name: 'description', label: t('admin.productCategoriesDescription'), kind: 'textarea', bilingual: true, rows: 5, help: t('admin.projectsDescriptionHelp') },
  { name: 'images', label: t('admin.projectsImages'), kind: 'image', help: t('admin.projectsImagesHelp') },
  {
    name: 'type',
    label: t('admin.projectsType'),
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
    resource="projects"
    :label="t('admin.projectsTitle')"
    :singular="t('admin.projectsSingular')"
    base-path="/admin/projects"
    :fields="fields"
  />
</template>
