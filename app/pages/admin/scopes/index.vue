<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const columns = computed<ColumnDef[]>(() => [
  { key: 'title', label: t('admin.scopesName'), kind: 'text' },
  { key: 'description', label: t('admin.scopesDescription'), kind: 'text' },
  { key: 'type', label: t('admin.projectsType'), kind: 'status', width: 'w-32' },
  { key: 'icon', label: t('admin.scopesIcon'), width: 'w-40' }
])
</script>

<template>
  <AdminResourceList
    resource="scopes"
    :label="t('admin.scopesTitle')"
    :singular="t('admin.scopesSingular')"
    :help="t('admin.scopesHelp')"
    base-path="/admin/scopes"
    :columns="columns"
  />
</template>
