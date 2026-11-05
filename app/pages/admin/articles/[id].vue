<script setup lang="ts">
import type { FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'title', label: t('admin.articlesName'), kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: t('admin.articlesSlug'), kind: 'slug', required: true },
  { name: 'excerpt', label: t('admin.articlesExcerpt'), kind: 'textarea', bilingual: true, required: true, rows: 3, help: t('admin.articlesExcerptHelp') },
  { name: 'body', label: t('admin.articlesBody'), kind: 'html', rows: 16, help: t('admin.articlesBodyHelp') },
  { name: 'coverMedia', label: t('admin.articlesCover'), kind: 'image' },
  { name: 'author', label: t('admin.articlesAuthor'), kind: 'text', help: t('admin.articlesAuthorHelp') },
  { name: 'category', label: t('admin.articlesCategory'), kind: 'text', bilingual: true, help: t('admin.articlesCategoryHelp') },
  { name: 'tags', label: t('admin.articlesTags'), kind: 'tags', help: t('admin.articlesTagsHelp') },
  { name: 'publishedAt', label: t('admin.articlesPublishedAt'), kind: 'date' },
  { name: 'status', label: t('admin.articlesStatus'), kind: 'toggle', help: t('admin.articlesStatusHelp') }
])
</script>

<template>
  <AdminResourceForm
    resource="articles"
    :label="t('admin.articlesTitle')"
    :singular="t('admin.articlesSingular')"
    base-path="/admin/articles"
    :fields="fields"
  />
</template>