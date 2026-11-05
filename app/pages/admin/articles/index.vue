<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'coverMedia', label: t('admin.articlesCover'), kind: 'image', width: 'w-20' },
  { key: 'title', label: t('admin.articlesName'), kind: 'bilingual' },
  { key: 'category', label: t('admin.articlesCategory'), kind: 'bilingual', width: 'w-36' },
  { key: 'publishedAt', label: t('admin.articlesPublishedAt'), kind: 'date', width: 'w-40' },
  { key: 'status', label: t('admin.productsStatus'), kind: 'toggle', width: 'w-28' }
])
</script>

<template>
  <AdminResourceList
    resource="articles"
    :label="t('admin.articlesTitle')"
    :singular="t('admin.articlesSingular')"
    :help="t('admin.articlesHelp')"
    base-path="/admin/articles"
    default-sort="publishedAt"
    :columns="columns"
  />
</template>