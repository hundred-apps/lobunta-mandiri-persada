<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'images', label: t('admin.productCategoriesImage'), kind: 'image', width: 'w-20' },
  { key: 'name', label: t('admin.projectsName'), kind: 'text' },
  { key: 'clientName', label: t('admin.projectsClientName'), width: 'w-56' },
  { key: 'siteAddress', label: t('admin.projectsSiteAddress'), width: 'w-48' },
  { key: 'year', label: t('admin.projectsYear'), kind: 'number', width: 'w-20' },
  { key: 'contractValue', label: t('admin.projectsContractValue'), width: 'w-40' },
  { key: 'type', label: t('admin.projectsType'), kind: 'status', width: 'w-32' },
  { key: 'show', label: t('admin.showOnHome'), kind: 'toggle', width: 'w-28' }
])
</script>

<template>
  <AdminResourceList
    resource="projects"
    :label="t('admin.projectsTitle')"
    :singular="t('admin.projectsSingular')"
    :help="t('admin.projectsHelp')"
    base-path="/admin/projects"
    :columns="columns"
  />
</template>
