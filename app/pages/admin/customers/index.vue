<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'image', label: t('admin.productCategoriesImage'), kind: 'image', width: 'w-20' },
  { key: 'name', label: t('admin.customersName'), kind: 'text' },
  { key: 'type', label: t('admin.projectsType'), kind: 'status', width: 'w-32' },
  { key: 'show', label: t('admin.showOnHome'), kind: 'toggle', width: 'w-28' }
])
</script>

<template>
  <AdminResourceList
    resource="customers"
    :label="t('admin.customersTitle')"
    :singular="t('admin.customersSingular')"
    :help="t('admin.customersHelp')"
    base-path="/admin/customers"
    :columns="columns"
  />
</template>