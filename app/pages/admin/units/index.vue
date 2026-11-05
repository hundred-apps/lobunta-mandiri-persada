<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'images', label: t('admin.productCategoriesImage'), kind: 'image', width: 'w-20' },
  { key: 'name', label: t('admin.unitsName'), width: 'w-64' },
  { key: 'status', label: t('admin.unitsStatus'), width: 'w-32' }
])
</script>

<template>
  <AdminResourceList
    resource="units"
    :label="t('admin.unitsTitle')"
    :singular="t('admin.unitsSingular')"
    :help="t('admin.unitsHelp')"
    base-path="/admin/units"
    :columns="columns"
  />
</template>
