<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'image', label: t('admin.productCategoriesImage'), kind: 'image', width: 'w-20' },
  { key: 'name', label: t('admin.productsSingular'), kind: 'bilingual' },
  { key: 'sku', label: t('admin.productCategoriesSku'), width: 'w-32' },
  { key: 'packaging', label: t('admin.productsPackaging'), width: 'w-32' },
  { key: 'weight', label: t('admin.productsWeight'), width: 'w-36' },
  { key: 'status', label: t('admin.productCategoriesStatus'), kind: 'toggle', width: 'w-28' }
])
</script>

<template>
  <AdminResourceList
    resource="products"
    :label="t('admin.productsTitle')"
    :singular="t('admin.productsSingular')"
    :help="t('admin.productsBody')"
    base-path="/admin/products"
    default-sort="sortOrder"
    :columns="columns"
    :filter="{
      resource: 'product-categories',
      param: 'categoryId',
      labelKey: 'name',
      label: t('admin.productsCategory'),
      placeholder: t('admin.productsAllCategories')
    }"
  />
</template>