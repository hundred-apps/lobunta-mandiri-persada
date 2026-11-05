<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'name', label: t('admin.productCategoriesName'), kind: 'bilingual' },
  { key: 'slug', label: t('admin.productCategoriesSlug') }
])
</script>

<template>
  <AdminResourceList
    resource="product-categories"
    :label="t('admin.productCategoriesTitle')"
    :singular="t('admin.productCategoriesSingular')"
    :help="t('admin.productCategoriesBody')"
    base-path="/admin/product-categories"
    :columns="columns"
    cascade-resource="products"
    cascade-param="categoryId"
  />
</template>